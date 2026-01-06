import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "Installation",
    questions: [
      {
        question: "How long does fiber installation take?",
        answer: "Standard residential installation takes 2-4 hours once fiber reaches your building. For areas requiring new fiber laying, this may take 5-7 business days. Our team will survey your location and provide an accurate timeline."
      },
      {
        question: "Is there an installation fee?",
        answer: "We offer FREE standard installation for all new customers on 6-month contracts or longer. For month-to-month plans, a one-time installation fee of KES 3,000 applies. Business installations are quoted based on complexity."
      },
      {
        question: "What equipment do I receive?",
        answer: "All packages include a high-performance WiFi router (dual-band AC or WiFi 6 for premium plans), fiber ONT device, and all necessary cabling. Equipment remains Nosteq property during your subscription."
      },
      {
        question: "Do you provide service in my area?",
        answer: "We currently cover Nairobi, Kiambu, Thika, and surrounding areas. Check our coverage map or contact us with your location — we're rapidly expanding across Kenya!"
      }
    ]
  },
  {
    category: "Pricing & Billing",
    questions: [
      {
        question: "Can I upgrade or downgrade my package?",
        answer: "Yes! You can change your package anytime. Upgrades take effect immediately, while downgrades apply at your next billing cycle. No penalties for switching."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept M-Pesa (Paybill: 123456), bank transfers, card payments, and Airtel Money. Business accounts can arrange invoiced billing with net-30 terms."
      },
      {
        question: "Is there a contract or commitment period?",
        answer: "We offer flexible month-to-month plans. However, 6-month and 12-month contracts include free installation and up to 15% discount on monthly rates."
      },
      {
        question: "What happens if I'm late on payment?",
        answer: "We provide a 7-day grace period. After that, service is temporarily suspended but can be restored immediately upon payment. No reconnection fees for first-time late payments."
      }
    ]
  },
  {
    category: "Support & Service",
    questions: [
      {
        question: "What is your uptime guarantee?",
        answer: "We guarantee 99.9% uptime for all packages. If uptime falls below this in any month, you receive pro-rated credit. Business plans include SLA with even stronger guarantees."
      },
      {
        question: "How do I report a service issue?",
        answer: "Call our 24/7 hotline at +254 743 101 738, WhatsApp us, or email support@nosteq.co.ke. Most issues are resolved remotely within 2 hours. On-site visits are scheduled within 24 hours if needed."
      },
      {
        question: "Do you offer static IP addresses?",
        answer: "Yes! Static IPs are included free with Turbo, Ultra, and all Business packages. For Starter and Pro plans, add a static IP for KES 500/month."
      },
      {
        question: "Can I use my own router?",
        answer: "Absolutely. While we provide quality routers, you're welcome to use your own. Our technicians can help configure it during installation at no extra charge."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 kitenge-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Maswali <span className="gradient-text">Yanayoulizwa</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Frequently Asked Questions — Everything you need to know
          </p>
          <div className="flag-divider w-32 mx-auto mt-6" />
        </div>

        <div className="max-w-4xl mx-auto grid gap-8">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="animate-fade-in" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold">{section.category}</h3>
              </div>
              
              <Accordion type="single" collapsible className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-2">
                {section.questions.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${sectionIndex}-${index}`}
                    className="border-border/50 px-4"
                  >
                    <AccordionTrigger className="text-left hover:text-primary transition-colors py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-12 p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border max-w-2xl mx-auto">
          <h4 className="font-heading text-xl font-semibold mb-2">Still have questions?</h4>
          <p className="text-muted-foreground mb-4">
            Our team is ready to help — Tunasaidia kwa furaha!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/254743101738" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-colors"
            >
              WhatsApp Us
            </a>
            <a 
              href="tel:+254743101738"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
            >
              Call +254 743 101 738
            </a>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-40 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default FAQ;