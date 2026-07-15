import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SLA = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const load = async () => {
    setLoading(true);
    const [i, s] = await Promise.all([
      supabase.from("sla_incidents").select("*, subscriptions(customers(business_name), plan_tier, monthly_price_kes)").order("started_at", { ascending: false }),
      supabase.from("subscriptions").select("id, customers(business_name), plan_tier, monthly_price_kes"),
    ]);
    setRows(i.data ?? []);
    setSubs(s.data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const computeCredit = (durationMin: number, monthlyPrice: number) => {
    // simple: pro-rated credit for downtime beyond 4 min/month (99.99% SLA)
    const excess = Math.max(0, durationMin - 4);
    return Number(((excess / (30 * 24 * 60)) * monthlyPrice).toFixed(2));
  };

  const save = async () => {
    if (!editing?.subscription_id || !editing?.started_at) {
      return toast({ title: "Missing fields", description: "Subscription and start time are required.", variant: "destructive" });
    }
    const started = new Date(editing.started_at);
    const ended = editing.ended_at ? new Date(editing.ended_at) : null;
    const duration = ended ? Math.max(0, Math.round((ended.getTime() - started.getTime()) / 60000)) : 0;
    const sub = subs.find((x) => x.id === editing.subscription_id);
    const credit = sub ? computeCredit(duration, Number(sub.monthly_price_kes)) : 0;
    const payload = {
      subscription_id: editing.subscription_id,
      started_at: started.toISOString(),
      ended_at: ended ? ended.toISOString() : null,
      duration_minutes: duration,
      impact: editing.impact || "partial",
      credit_kes: credit,
      notes: editing.notes || "",
    };
    const q = editing.id
      ? supabase.from("sla_incidents").update(payload).eq("id", editing.id)
      : supabase.from("sla_incidents").insert(payload);
    const { error } = await q;
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: editing.id ? "Incident updated" : "Incident logged" });
    setOpen(false); setEditing(null); load();
  };

  const resolve = async (r: any) => {
    const ended = new Date();
    const duration = Math.max(0, Math.round((ended.getTime() - new Date(r.started_at).getTime()) / 60000));
    const monthlyPrice = Number(r.subscriptions?.monthly_price_kes ?? 0);
    const credit = computeCredit(duration, monthlyPrice);
    const { error } = await supabase.from("sla_incidents").update({
      ended_at: ended.toISOString(),
      duration_minutes: duration,
      credit_kes: credit,
    }).eq("id", r.id);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete incident?")) return;
    await supabase.from("sla_incidents").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold">Uptime & SLA</h2>
          <p className="text-muted-foreground">Downtime log with auto-computed SLA credits (99.99% target).</p>
        </div>
        <Button onClick={() => { setEditing({ started_at: new Date().toISOString().slice(0, 16), impact: "partial" }); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Log incident
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Incidents ({rows.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-muted-foreground text-sm">Loading…</p>
          : rows.length === 0 ? <p className="text-muted-foreground text-sm">No incidents.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b border-border">
                  <tr>
                    <th className="py-2 pr-4">Customer</th>
                    <th className="py-2 pr-4">Started</th>
                    <th className="py-2 pr-4">Duration</th>
                    <th className="py-2 pr-4">Impact</th>
                    <th className="py-2 pr-4">Credit (KES)</th>
                    <th className="py-2 pr-4">State</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">{r.subscriptions?.customers?.business_name ?? "—"}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{new Date(r.started_at).toLocaleString()}</td>
                      <td className="py-2 pr-4">{r.duration_minutes} min</td>
                      <td className="py-2 pr-4 capitalize">{r.impact}</td>
                      <td className="py-2 pr-4">{Number(r.credit_kes).toLocaleString()}</td>
                      <td className="py-2 pr-4">
                        <Badge variant={r.ended_at ? "outline" : "destructive"}>
                          {r.ended_at ? "resolved" : "open"}
                        </Badge>
                      </td>
                      <td className="py-2 pr-4 text-right space-x-1">
                        {!r.ended_at && (
                          <Button size="sm" variant="outline" onClick={() => resolve(r)}>
                            <CheckCircle2 className="w-4 h-4 mr-1" /> Resolve
                          </Button>
                        )}
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
          <DialogHeader><DialogTitle>{editing?.id ? "Edit incident" : "Log incident"}</DialogTitle></DialogHeader>
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
                <div><Label>Started</Label><Input type="datetime-local" value={editing.started_at ?? ""} onChange={(e) => setEditing({ ...editing, started_at: e.target.value })} /></div>
                <div><Label>Ended (optional)</Label><Input type="datetime-local" value={editing.ended_at ?? ""} onChange={(e) => setEditing({ ...editing, ended_at: e.target.value })} /></div>
              </div>
              <div>
                <Label>Impact</Label>
                <Select value={editing.impact ?? "partial"} onValueChange={(v) => setEditing({ ...editing, impact: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="degraded">Degraded</SelectItem>
                    <SelectItem value="partial">Partial outage</SelectItem>
                    <SelectItem value="full">Full outage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Notes</Label><Textarea value={editing.notes ?? ""} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} rows={3} /></div>
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

export default SLA;
