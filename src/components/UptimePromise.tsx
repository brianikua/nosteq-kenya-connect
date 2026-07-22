import { ShieldCheck, Receipt, FileCheck2, Activity } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  { icon: ShieldCheck, title: "99.99% SLA uptime", body: "Fintech-grade availability with automatic SLA credits when we miss it. Downtime measured in seconds, not excuses." },
  { icon: Receipt, title: "Transparent billing", body: "Invoice ledger, usage metering and payment status you can audit like a bank statement. No mystery fees." },
  { icon: FileCheck2, title: "KYC-first onboarding", body: "Business docs, KRA PIN and proof of address reviewed inside 24 hours. Compliant from day one." },
  { icon: Activity, title: "Real-time observability", body: "Live bandwidth, peak Mbps and incident history per subscription — surfaced the way fintechs surface transactions." },
];

const stats = [
  { v: "99.99%", l: "Monthly SLA target" },
  { v: "<15 min", l: "Incident response" },
  { v: "T+1", l: "SLA credit cycle" },
  { v: "24 hrs", l: "KYC turnaround" },
];

const UptimePromise = () => (
  <section id="uptime" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      {/* Editorial masthead */}
      <ScrollReveal>
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14 pb-8 border-b border-border">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Uptime you can bank on</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Internet delivered with <span className="italic text-primary">fintech discipline</span>.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We run our IaaS platform the way top-tier fintechs run their payment rails — measurable SLAs, auditable billing, and compliance built into onboarding.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Pillars — editorial 4-col with dividers, no busy cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border rounded-2xl border border-border bg-card overflow-hidden">
        {pillars.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.06}>
            <div className="p-8 h-full">
              <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-5">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-xl mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Deep navy stat bar — the fintech-grade moment */}
      <ScrollReveal delay={0.2}>
        <div className="mt-10 rounded-2xl bg-primary text-primary-foreground p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-heading text-3xl md:text-4xl font-bold">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-primary-foreground/70 mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default UptimePromise;
