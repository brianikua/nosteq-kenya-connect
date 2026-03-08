import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      { question: "How quickly can you set up my fiber connection?", answer: "If fiber already reaches your building, we'll have you online in 2–4 hours. If we need to lay new fiber to your location, expect 5–7 business days. Either way, we'll survey your site first and give you an honest timeline — no surprises." },
      { question: "Will I need to pay for installation?", answer: "Nope — installation is completely free when you sign up for 6 months or longer. For month-to-month flexibility, there's a one-time KES 3,000 setup fee. Business installations depend on complexity, so we'll quote you upfront." },
      { question: "What equipment do I get?", answer: "Every package comes with a high-performance WiFi router (dual-band AC or WiFi 6 on premium plans), a fiber ONT device, and all the cabling needed. The equipment stays in great shape because we maintain it as part of your subscription." },
      { question: "Are you available in my area?", answer: "We currently cover Nairobi, Kiambu, Thika, and surrounding areas — and we're expanding fast. Drop us your location and we'll check coverage instantly. If we're not there yet, we'll let you know when we will be." },
    ]
  },
  {
    category: "Money Matters",
    questions: [
      { question: "Can I switch my plan anytime?", answer: "Absolutely. Upgrading takes effect immediately. If you're downgrading, it kicks in at your next billing cycle. No penalties, no awkward phone calls — just flexibility." },
      { question: "How can I pay?", answer: "However works best for you: M-Pesa, bank transfer, card, or Airtel Money. Businesses can set up invoiced billing with net-30 terms. We try to make the boring stuff easy." },
      { question: "Am I locked into a contract?", answer: "You can go month-to-month if you like. But if you commit to 6 or 12 months, you get free installation and up to 15% off your monthly rate. Your call — no pressure either way." },
      { question: "What if I forget to pay?", answer: "Life happens. We give you a 7-day grace period. If service gets paused, one payment restores it instantly. First-time late? No reconnection fee. We're not here to penalize you." },
    ]
  },
  {
    category: "Support & Reliability",
    questions: [
      { question: "What's your uptime guarantee?", answer: "99.9% across all packages — and we put our money where our mouth is. If we fall short in any month, you get pro-rated credit automatically. Business plans come with even stricter SLA-backed guarantees." },
      { question: "Something's wrong with my connection — who do I call?", answer: "Our 24/7 team at +254 743 101 738 — call or WhatsApp. You can also email support@nosteq.co.ke. Most issues get resolved remotely within 2 hours. If it needs a site visit, we'll be there within 24 hours." },
      { question: "Can I get a static IP?", answer: "It's included free with Turbo, Ultra, and all Business packages. On Starter or Pro plans, add one for just KES 500/month. Perfect for hosting, VPNs, or remote access." },
      { question: "Can I use my own router instead?", answer: "Of course. Use whatever hardware you prefer — our technicians will configure it during installation at no extra charge. We want you comfortable with your setup." },
    ]
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 subtle-pattern" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Got Questions? <span className="gradient-text">We've Got Answers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The stuff people ask us most — straight answers, no jargon.
            </p>
            <div className="brand-divider w-24 mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid gap-8">
          {faqs.map((section, sectionIndex) => (
            <ScrollReveal key={sectionIndex} delay={sectionIndex * 0.1}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold">{section.category}</h3>
              </div>
              
              <Accordion type="single" collapsible className="bg-card rounded-xl border border-border p-2 shadow-sm">
                {section.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`${sectionIndex}-${index}`} className="border-border/50 px-4">
                    <AccordionTrigger className="text-left hover:text-primary transition-colors py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12 p-8 bg-card rounded-2xl border border-border max-w-2xl mx-auto shadow-sm">
            <h4 className="font-heading text-xl font-semibold mb-2">Still curious about something?</h4>
            <p className="text-muted-foreground mb-6">We love questions — it means you're serious about getting the right solution.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/254743101738" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-colors">WhatsApp Us</a>
              <a href="tel:+254743101738" className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">Call +254 743 101 738</a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;
