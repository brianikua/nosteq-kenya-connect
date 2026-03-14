import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { getContent } from "@/lib/contentStore";

const FAQ = () => {
  const content = getContent();
  const faqs = content.faqs;
  return (
    <section id="faq" className="py-24 section-dark relative">
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
