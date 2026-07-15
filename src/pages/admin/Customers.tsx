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
import { Plus, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Customer = {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  kyc_status: string;
  status: string;
  notes: string;
  created_at: string;
};

const empty: Partial<Customer> = {
  business_name: "",
  contact_name: "",
  email: "",
  phone: "",
  kyc_status: "pending",
  status: "active",
  notes: "",
};

const Customers = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Customer> | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    setRows((data as Customer[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.business_name || !editing.email) {
      toast({ title: "Missing fields", description: "Business name and email are required.", variant: "destructive" });
      return;
    }
    const payload = {
      business_name: editing.business_name,
      contact_name: editing.contact_name ?? "",
      email: editing.email,
      phone: editing.phone ?? "",
      kyc_status: editing.kyc_status ?? "pending",
      status: editing.status ?? "active",
      notes: editing.notes ?? "",
    };
    const q = editing.id
      ? supabase.from("customers").update(payload).eq("id", editing.id)
      : supabase.from("customers").insert(payload);
    const { error } = await q;
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: editing.id ? "Customer updated" : "Customer created" });
    setOpen(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this customer? Subscriptions and invoices will be deleted too.")) return;
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    toast({ title: "Customer deleted" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold">Customers</h2>
          <p className="text-muted-foreground">Business accounts subscribed to your IaaS product.</p>
        </div>
        <Button onClick={() => { setEditing({ ...empty }); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-1" /> New customer
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>All customers ({rows.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading…</p>
          ) : rows.length === 0 ? (
            <p className="text-muted-foreground text-sm">No customers yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b border-border">
                  <tr>
                    <th className="py-2 pr-4">Business</th>
                    <th className="py-2 pr-4">Contact</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">KYC</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">{r.business_name}</td>
                      <td className="py-2 pr-4">{r.contact_name || "—"}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{r.email}</td>
                      <td className="py-2 pr-4">
                        <Badge variant={r.kyc_status === "approved" ? "default" : r.kyc_status === "rejected" ? "destructive" : "outline"}>
                          {r.kyc_status}
                        </Badge>
                      </td>
                      <td className="py-2 pr-4">
                        <Badge variant={r.status === "active" ? "default" : "outline"}>{r.status}</Badge>
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
            <DialogTitle>{editing?.id ? "Edit customer" : "New customer"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div>
                <Label>Business name</Label>
                <Input value={editing.business_name ?? ""} onChange={(e) => setEditing({ ...editing, business_name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Contact name</Label>
                  <Input value={editing.contact_name ?? ""} onChange={(e) => setEditing({ ...editing, contact_name: e.target.value })} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={editing.phone ?? ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={editing.email ?? ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>KYC status</Label>
                  <Select value={editing.kyc_status ?? "pending"} onValueChange={(v) => setEditing({ ...editing, kyc_status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Account status</Label>
                  <Select value={editing.status ?? "active"} onValueChange={(v) => setEditing({ ...editing, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea value={editing.notes ?? ""} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} rows={3} />
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

export default Customers;
