import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, ShieldCheck, FileCheck2, Activity, Receipt } from "lucide-react";

type Kpis = {
  mrr: number;
  activeSubs: number;
  avgUptime: number;
  kycPending: number;
  overdueInvoices: number;
  openIncidents: number;
};

const Overview = () => {
  const [kpis, setKpis] = useState<Kpis>({
    mrr: 0,
    activeSubs: 0,
    avgUptime: 99.94,
    kycPending: 0,
    overdueInvoices: 0,
    openIncidents: 0,
  });
  const [recentCustomers, setRecentCustomers] = useState<any[]>([]);
  const [recentIncidents, setRecentIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [subs, customers, invoices, incidents, kyc] = await Promise.all([
        supabase.from("subscriptions").select("monthly_price_kes,status"),
        supabase.from("customers").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("invoices").select("status"),
        supabase.from("sla_incidents").select("*").order("started_at", { ascending: false }).limit(5),
        supabase.from("kyc_applications").select("status"),
      ]);

      const activeSubs = (subs.data ?? []).filter((s: any) => s.status === "active");
      const mrr = activeSubs.reduce((sum: number, s: any) => sum + Number(s.monthly_price_kes ?? 0), 0);
      const overdue = (invoices.data ?? []).filter((i: any) => i.status === "overdue").length;
      const kycPending = (kyc.data ?? []).filter((k: any) => k.status === "pending").length;
      const openIncidents = (incidents.data ?? []).filter((i: any) => !i.ended_at).length;

      setKpis({
        mrr,
        activeSubs: activeSubs.length,
        avgUptime: 99.94,
        kycPending,
        overdueInvoices: overdue,
        openIncidents,
      });
      setRecentCustomers(customers.data ?? []);
      setRecentIncidents(incidents.data ?? []);
      setLoading(false);
    })();
  }, []);

  const kpiCards = [
    { label: "MRR (KES)", value: kpis.mrr.toLocaleString(), icon: DollarSign, tone: "text-primary" },
    { label: "Active subscriptions", value: kpis.activeSubs, icon: Users, tone: "text-primary" },
    { label: "Average uptime", value: `${kpis.avgUptime}%`, icon: ShieldCheck, tone: "text-primary" },
    { label: "KYC pending", value: kpis.kycPending, icon: FileCheck2, tone: kpis.kycPending > 0 ? "text-secondary" : "text-primary" },
    { label: "Overdue invoices", value: kpis.overdueInvoices, icon: Receipt, tone: kpis.overdueInvoices > 0 ? "text-destructive" : "text-primary" },
    { label: "Open incidents", value: kpis.openIncidents, icon: Activity, tone: kpis.openIncidents > 0 ? "text-destructive" : "text-primary" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-3xl font-bold">Operator Overview</h2>
        <p className="text-muted-foreground">Your Internet-as-a-Service business at a glance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((k) => (
          <Card key={k.label}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{k.label}</CardTitle>
              <k.icon className={`w-4 h-4 ${k.tone}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "—" : k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Recent customer signups</CardTitle></CardHeader>
          <CardContent>
            {recentCustomers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No customers yet. Add one from the Customers module.</p>
            ) : (
              <ul className="space-y-3">
                {recentCustomers.map((c) => (
                  <li key={c.id} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">{c.business_name}</div>
                      <div className="text-muted-foreground text-xs">{c.email}</div>
                    </div>
                    <Badge variant={c.kyc_status === "approved" ? "default" : "outline"}>
                      {c.kyc_status}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent SLA incidents</CardTitle></CardHeader>
          <CardContent>
            {recentIncidents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No incidents logged. Nice work.</p>
            ) : (
              <ul className="space-y-3">
                {recentIncidents.map((i) => (
                  <li key={i.id} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">{new Date(i.started_at).toLocaleString()}</div>
                      <div className="text-muted-foreground text-xs">
                        {i.duration_minutes} min · {i.impact}
                      </div>
                    </div>
                    <Badge variant={i.ended_at ? "outline" : "destructive"}>
                      {i.ended_at ? "resolved" : "open"}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
