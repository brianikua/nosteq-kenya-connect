import { ShieldCheck, Receipt, FileCheck2, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    icon: ShieldCheck,
    title: "99.99% SLA uptime",
    body: "Fintech-grade availability with automatic SLA credits when we miss it. Downtime is measured in seconds, not excuses.",
  },
  {
    icon: Receipt,
    title: "Transparent billing",
    body: "Invoice ledger, usage metering, and payment status you can audit like a bank statement. No mystery fees, ever.",
  },
  {
    icon: FileCheck2,
    title: "KYC-first onboarding",
    body: "Business docs, KRA PIN and proof of address reviewed inside 24 hours. Compliant from day one.",
  },
  {
    icon: Activity,
    title: "Real-time observability",
    body: "Live bandwidth, peak Mbps and incident history per subscription — surfaced the way modern fintechs surface transactions.",
  },
];

const UptimePromise = () => (
  <section id="uptime" className="py-24 section-dark relative overflow-hidden">
    <div className="absolute inset-0 subtle-pattern opacity-40" />
    <div className="container mx-auto px-4 relative z-10">
      <ScrollReveal>
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Uptime You Can Bank On</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Internet delivered with <span className="gradient-text">fintech discipline</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We run our IaaS platform the way top-tier fintechs run their payment rails — measurable SLAs, auditable billing, and compliance built into onboarding.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {pillars.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.08}>
            <Card className="h-full bg-card border-border card-hover">
              <CardContent className="pt-6 space-y-3">
                <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { v: "99.99%", l: "Monthly SLA target" },
              { v: "< 15 min", l: "Incident response" },
              { v: "T+1", l: "SLA credit cycle" },
              { v: "24 hrs", l: "KYC turnaround" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-heading text-3xl font-bold gradient-text">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Badge variant="outline">ISO-aligned processes</Badge>
            <Badge variant="outline">CA-licensed ISP</Badge>
            <Badge variant="outline">Redundant upstreams</Badge>
            <Badge variant="outline">Bank-grade change control</Badge>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default UptimePromise;
