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
import { Plus, CheckCircle2, XCircle, FileCheck2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KYC = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewing, setReviewing] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  const load = async () => {
    setLoading(true);
    const [k, c] = await Promise.all([
      supabase.from("kyc_applications").select("*, customers(business_name, email)").order("created_at", { ascending: false }),
      supabase.from("customers").select("id, business_name"),
    ]);
    setRows(k.data ?? []);
    setCustomers(c.data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.customer_id) return toast({ title: "Pick a customer", variant: "destructive" });
    const payload = {
      customer_id: editing.customer_id,
      id_doc_url: editing.id_doc_url || "",
      cert_url: editing.cert_url || "",
      kra_pin_url: editing.kra_pin_url || "",
      address_url: editing.address_url || "",
      status: "pending",
    };
    const { error } = await supabase.from("kyc_applications").insert(payload);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "KYC application submitted" });
    setOpen(false); setEditing(null); load();
  };

  const decide = async (status: "approved" | "rejected") => {
    if (!reviewing) return;
    const { data: authData } = await supabase.auth.getUser();
    const { error } = await supabase.from("kyc_applications").update({
      status,
      review_notes: reviewNotes,
      reviewed_at: new Date().toISOString(),
      reviewer_id: authData.user?.id ?? null,
    }).eq("id", reviewing.id);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    await supabase.from("customers").update({ kyc_status: status }).eq("id", reviewing.customer_id);
    toast({ title: `KYC ${status}` });
    setReviewOpen(false); setReviewing(null); setReviewNotes(""); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold">KYC Queue</h2>
          <p className="text-muted-foreground">Verify customer business documents before activation.</p>
        </div>
        <Button onClick={() => { setEditing({}); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-1" /> New application
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Applications ({rows.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-muted-foreground text-sm">Loading…</p>
          : rows.length === 0 ? <p className="text-muted-foreground text-sm">No applications.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b border-border">
                  <tr>
                    <th className="py-2 pr-4">Customer</th>
                    <th className="py-2 pr-4">Docs</th>
                    <th className="py-2 pr-4">Submitted</th>
                    <th className="py-2 pr-4">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const docs = [r.id_doc_url, r.cert_url, r.kra_pin_url, r.address_url].filter(Boolean).length;
                    return (
                      <tr key={r.id} className="border-b border-border/50">
                        <td className="py-2 pr-4">
                          <div className="font-medium">{r.customers?.business_name ?? "—"}</div>
                          <div className="text-xs text-muted-foreground">{r.customers?.email}</div>
                        </td>
                        <td className="py-2 pr-4">
                          <span className="text-muted-foreground text-xs">{docs}/4 provided</span>
                        </td>
                        <td className="py-2 pr-4 text-muted-foreground text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                        <td className="py-2 pr-4">
                          <Badge variant={r.status === "approved" ? "default" : r.status === "rejected" ? "destructive" : "secondary"}>
                            {r.status}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4 text-right">
                          {r.status === "pending" && (
                            <Button size="sm" variant="outline" onClick={() => { setReviewing(r); setReviewNotes(""); setReviewOpen(true); }}>
                              <FileCheck2 className="w-4 h-4 mr-1" /> Review
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New application */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New KYC application</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div>
                <Label>Customer</Label>
                <Select value={editing.customer_id ?? ""} onValueChange={(v) => setEditing({ ...editing, customer_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => <SelectItem key={c.id} value={c.id}>{c.business_name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>ID document URL</Label><Input value={editing.id_doc_url ?? ""} onChange={(e) => setEditing({ ...editing, id_doc_url: e.target.value })} /></div>
              <div><Label>Certificate of incorporation URL</Label><Input value={editing.cert_url ?? ""} onChange={(e) => setEditing({ ...editing, cert_url: e.target.value })} /></div>
              <div><Label>KRA PIN URL</Label><Input value={editing.kra_pin_url ?? ""} onChange={(e) => setEditing({ ...editing, kra_pin_url: e.target.value })} /></div>
              <div><Label>Proof of address URL</Label><Input value={editing.address_url ?? ""} onChange={(e) => setEditing({ ...editing, address_url: e.target.value })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Review application</DialogTitle></DialogHeader>
          {reviewing && (
            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">Customer:</span> <strong>{reviewing.customers?.business_name}</strong></div>
              <ul className="space-y-2">
                {[
                  ["ID document", reviewing.id_doc_url],
                  ["Cert. of incorporation", reviewing.cert_url],
                  ["KRA PIN", reviewing.kra_pin_url],
                  ["Proof of address", reviewing.address_url],
                ].map(([label, url]) => (
                  <li key={label as string} className="flex items-center justify-between">
                    <span>{label}</span>
                    {url ? (
                      <a href={url as string} target="_blank" rel="noreferrer" className="text-primary underline text-xs">View</a>
                    ) : (
                      <span className="text-muted-foreground text-xs">Missing</span>
                    )}
                  </li>
                ))}
              </ul>
              <div>
                <Label>Reviewer notes</Label>
                <Textarea value={reviewNotes} onChange={(e) => setReviewNotes(e.target.value)} rows={3} />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setReviewOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => decide("rejected")}>
              <XCircle className="w-4 h-4 mr-1" /> Reject
            </Button>
            <Button onClick={() => decide("approved")}>
              <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KYC;
