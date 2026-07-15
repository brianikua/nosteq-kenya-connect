import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const Usage = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const load = async () => {
    setLoading(true);
    const [u, s] = await Promise.all([
      supabase.from("usage_records").select("*, subscriptions(customers(business_name), plan_tier)").order("period_end", { ascending: false }),
      supabase.from("subscriptions").select("id, customers(business_name), plan_tier"),
    ]);
    setRows(u.data ?? []);
    setSubs(s.data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.subscription_id) return toast({ title: "Pick a subscription", variant: "destructive" });
    const payload = {
      subscription_id: editing.subscription_id,
      period_start: editing.period_start,
      period_end: editing.period_end,
      gb_used: Number(editing.gb_used || 0),
      peak_mbps: Number(editing.peak_mbps || 0),
      cap_percent: Number(editing.cap_percent || 0),
    };
    const { error } = await supabase.from("usage_records").insert(payload);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "Usage record added" });
    setOpen(false); setEditing(null); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete record?")) return;
    await supabase.from("usage_records").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold">Usage Metering</h2>
          <p className="text-muted-foreground">Bandwidth used, peak speed and data-cap % per subscription.</p>
        </div>
        <Button onClick={() => { setEditing({}); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Log usage
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Usage records ({rows.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-muted-foreground text-sm">Loading…</p>
          : rows.length === 0 ? <p className="text-muted-foreground text-sm">No usage recorded yet.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b border-border">
                  <tr>
                    <th className="py-2 pr-4">Customer</th>
                    <th className="py-2 pr-4">Period</th>
                    <th className="py-2 pr-4">Data (GB)</th>
                    <th className="py-2 pr-4">Peak (Mbps)</th>
                    <th className="py-2 pr-4 w-56">Cap</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">{r.subscriptions?.customers?.business_name ?? "—"}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{r.period_start} → {r.period_end}</td>
                      <td className="py-2 pr-4">{Number(r.gb_used).toLocaleString()}</td>
                      <td className="py-2 pr-4">{r.peak_mbps}</td>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <Progress value={Math.min(100, Number(r.cap_percent))} className="flex-1" />
                          <span className="text-xs w-10 text-right">{r.cap_percent}%</span>
                        </div>
                      </td>
                      <td className="py-2 pr-4 text-right">
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => remove(r.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Log usage record</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div>
                <Label>Subscription</Label>
                <Select value={editing.subscription_id ?? ""} onValueChange={(v) => setEditing({ ...editing, subscription_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    {subs.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.customers?.business_name} — {s.plan_tier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Period start</Label><Input type="date" value={editing.period_start ?? ""} onChange={(e) => setEditing({ ...editing, period_start: e.target.value })} /></div>
                <div><Label>Period end</Label><Input type="date" value={editing.period_end ?? ""} onChange={(e) => setEditing({ ...editing, period_end: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><Label>GB used</Label><Input type="number" value={editing.gb_used ?? 0} onChange={(e) => setEditing({ ...editing, gb_used: Number(e.target.value) })} /></div>
                <div><Label>Peak Mbps</Label><Input type="number" value={editing.peak_mbps ?? 0} onChange={(e) => setEditing({ ...editing, peak_mbps: Number(e.target.value) })} /></div>
                <div><Label>Cap %</Label><Input type="number" value={editing.cap_percent ?? 0} onChange={(e) => setEditing({ ...editing, cap_percent: Number(e.target.value) })} /></div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Usage;
