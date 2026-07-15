import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Sub = {
  id: string;
  customer_id: string;
  plan_tier: string;
  bandwidth_mbps: number;
  monthly_price_kes: number;
  billing_cycle: string;
  status: string;
  activated_at: string | null;
  next_billing_at: string | null;
};

const empty: Partial<Sub> = {
  plan_tier: "starter",
  bandwidth_mbps: 100,
  monthly_price_kes: 25000,
  billing_cycle: "monthly",
  status: "trial",
};

const Subscriptions = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Sub> | null>(null);

  const load = async () => {
    setLoading(true);
    const [subs, custs] = await Promise.all([
      supabase.from("subscriptions").select("*, customers(business_name)").order("created_at", { ascending: false }),
      supabase.from("customers").select("id,business_name").order("business_name"),
    ]);
    setRows(subs.data ?? []);
    setCustomers(custs.data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.customer_id) {
      toast({ title: "Pick a customer", variant: "destructive" });
      return;
    }
    const payload: any = {
      customer_id: editing.customer_id,
      plan_tier: editing.plan_tier ?? "starter",
      bandwidth_mbps: Number(editing.bandwidth_mbps ?? 0),
      monthly_price_kes: Number(editing.monthly_price_kes ?? 0),
      billing_cycle: editing.billing_cycle ?? "monthly",
      status: editing.status ?? "trial",
      activated_at: editing.activated_at || null,
      next_billing_at: editing.next_billing_at || null,
    };
    const q = editing.id
      ? supabase.from("subscriptions").update(payload).eq("id", editing.id)
      : supabase.from("subscriptions").insert(payload);
    const { error } = await q;
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: editing.id ? "Subscription updated" : "Subscription created" });
    setOpen(false); setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this subscription?")) return;
    const { error } = await supabase.from("subscriptions").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold">Subscriptions</h2>
          <p className="text-muted-foreground">IaaS plans assigned to customers.</p>
        </div>
        <Button onClick={() => { setEditing({ ...empty }); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-1" /> New subscription
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>All subscriptions ({rows.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-muted-foreground text-sm">Loading…</p>
          : rows.length === 0 ? <p className="text-muted-foreground text-sm">No subscriptions yet.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b border-border">
                  <tr>
                    <th className="py-2 pr-4">Customer</th>
                    <th className="py-2 pr-4">Tier</th>
                    <th className="py-2 pr-4">Bandwidth</th>
                    <th className="py-2 pr-4">Monthly (KES)</th>
                    <th className="py-2 pr-4">Cycle</th>
                    <th className="py-2 pr-4">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">{r.customers?.business_name ?? "—"}</td>
                      <td className="py-2 pr-4 capitalize">{r.plan_tier}</td>
                      <td className="py-2 pr-4">{r.bandwidth_mbps} Mbps</td>
                      <td className="py-2 pr-4">{Number(r.monthly_price_kes).toLocaleString()}</td>
                      <td className="py-2 pr-4">{r.billing_cycle}</td>
                      <td className="py-2 pr-4">
                        <Badge variant={r.status === "active" ? "default" : r.status === "past_due" ? "destructive" : "outline"}>
                          {r.status}
                        </Badge>
                      </td>
                      <td className="py-2 pr-4 text-right space-x-1">
                        <Button size="icon" variant="ghost" onClick={() => { setEditing(r); setOpen(true); }}>
                          <Pencil className="w-4 h-4" />
                        </Button>
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
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit subscription" : "New subscription"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div>
                <Label>Customer</Label>
                <Select value={editing.customer_id ?? ""} onValueChange={(v) => setEditing({ ...editing, customer_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select customer…" /></SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => <SelectItem key={c.id} value={c.id}>{c.business_name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Plan tier</Label>
                  <Select value={editing.plan_tier ?? "starter"} onValueChange={(v) => setEditing({ ...editing, plan_tier: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter IaaS</SelectItem>
                      <SelectItem value="growth">Growth IaaS</SelectItem>
                      <SelectItem value="enterprise">Enterprise IaaS</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Billing cycle</Label>
                  <Select value={editing.billing_cycle ?? "monthly"} onValueChange={(v) => setEditing({ ...editing, billing_cycle: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Bandwidth (Mbps)</Label>
                  <Input type="number" value={editing.bandwidth_mbps ?? 0} onChange={(e) => setEditing({ ...editing, bandwidth_mbps: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>Monthly price (KES)</Label>
                  <Input type="number" value={editing.monthly_price_kes ?? 0} onChange={(e) => setEditing({ ...editing, monthly_price_kes: Number(e.target.value) })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Status</Label>
                  <Select value={editing.status ?? "trial"} onValueChange={(v) => setEditing({ ...editing, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="past_due">Past due</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Next billing</Label>
                  <Input type="date" value={editing.next_billing_at?.slice(0, 10) ?? ""} onChange={(e) => setEditing({ ...editing, next_billing_at: e.target.value })} />
                </div>
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

export default Subscriptions;
