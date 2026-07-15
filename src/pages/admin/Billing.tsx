import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const nextInvoiceNumber = () => "INV-" + Date.now().toString().slice(-8);

const Billing = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const load = async () => {
    setLoading(true);
    const [inv, s] = await Promise.all([
      supabase.from("invoices").select("*, subscriptions(customers(business_name), plan_tier)").order("issued_at", { ascending: false }),
      supabase.from("subscriptions").select("id, customers(business_name), plan_tier, monthly_price_kes"),
    ]);
    setRows(inv.data ?? []);
    setSubs(s.data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.subscription_id) return toast({ title: "Pick a subscription", variant: "destructive" });
    const payload: any = {
      subscription_id: editing.subscription_id,
      invoice_number: editing.invoice_number || nextInvoiceNumber(),
      period_start: editing.period_start,
      period_end: editing.period_end,
      amount_kes: Number(editing.amount_kes || 0),
      status: editing.status || "unpaid",
    };
    const { error } = await supabase.from("invoices").insert(payload);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "Invoice created" });
    setOpen(false); setEditing(null); load();
  };

  const markPaid = async (id: string) => {
    const { error } = await supabase.from("invoices").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", id);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete invoice?")) return;
    await supabase.from("invoices").delete().eq("id", id);
    load();
  };

  const statusColor = (s: string) =>
    s === "paid" ? "default" : s === "overdue" ? "destructive" : s === "void" ? "outline" : "secondary";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold">Billing</h2>
          <p className="text-muted-foreground">Fintech-grade invoice ledger for every subscription.</p>
        </div>
        <Button onClick={() => { setEditing({ status: "unpaid" }); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-1" /> New invoice
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Invoices ({rows.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-muted-foreground text-sm">Loading…</p>
          : rows.length === 0 ? <p className="text-muted-foreground text-sm">No invoices yet.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b border-border">
                  <tr>
                    <th className="py-2 pr-4">Number</th>
                    <th className="py-2 pr-4">Customer</th>
                    <th className="py-2 pr-4">Period</th>
                    <th className="py-2 pr-4">Amount (KES)</th>
                    <th className="py-2 pr-4">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">{r.invoice_number}</td>
                      <td className="py-2 pr-4">{r.subscriptions?.customers?.business_name ?? "—"}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{r.period_start} → {r.period_end}</td>
                      <td className="py-2 pr-4 font-medium">{Number(r.amount_kes).toLocaleString()}</td>
                      <td className="py-2 pr-4"><Badge variant={statusColor(r.status) as any}>{r.status}</Badge></td>
                      <td className="py-2 pr-4 text-right space-x-1">
                        {r.status !== "paid" && (
                          <Button size="sm" variant="outline" onClick={() => markPaid(r.id)}>
                            <CheckCircle2 className="w-4 h-4 mr-1" /> Mark paid
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
          <DialogHeader><DialogTitle>New invoice</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div>
                <Label>Subscription</Label>
                <Select value={editing.subscription_id ?? ""} onValueChange={(v) => {
                  const s = subs.find((x) => x.id === v);
                  setEditing({ ...editing, subscription_id: v, amount_kes: s?.monthly_price_kes ?? 0 });
                }}>
                  <SelectTrigger><SelectValue placeholder="Select subscription…" /></SelectTrigger>
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
                <div>
                  <Label>Period start</Label>
                  <Input type="date" value={editing.period_start ?? ""} onChange={(e) => setEditing({ ...editing, period_start: e.target.value })} />
                </div>
                <div>
                  <Label>Period end</Label>
                  <Input type="date" value={editing.period_end ?? ""} onChange={(e) => setEditing({ ...editing, period_end: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Amount (KES)</Label>
                  <Input type="number" value={editing.amount_kes ?? 0} onChange={(e) => setEditing({ ...editing, amount_kes: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={editing.status ?? "unpaid"} onValueChange={(v) => setEditing({ ...editing, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="void">Void</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
