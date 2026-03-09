import { Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const ContactTab = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground">
      Reach us through any of these channels:
    </p>

    <a
      href="https://wa.me/254743101738"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all group"
    >
      <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
        <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
      </div>
      <div>
        <h5 className="font-semibold text-sm">WhatsApp</h5>
        <p className="text-xs text-muted-foreground">+254 743 101 738</p>
      </div>
    </a>

    <a
      href="tel:+254743101738"
      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
    >
      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
        <Phone className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h5 className="font-semibold text-sm">Phone</h5>
        <p className="text-xs text-muted-foreground">+254 743 101 738</p>
      </div>
    </a>

    <a
      href="mailto:info@nosteq.co.ke"
      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
    >
      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
        <Mail className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h5 className="font-semibold text-sm">Email</h5>
        <p className="text-xs text-muted-foreground">info@nosteq.co.ke</p>
      </div>
    </a>

    <div className="p-4 bg-accent rounded-xl">
      <h5 className="font-semibold text-sm mb-2">Business Hours</h5>
      <div className="text-xs text-muted-foreground space-y-1">
        <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
        <p>Saturday: 9:00 AM – 4:00 PM</p>
        <p>Sunday: Closed (Emergency support available)</p>
      </div>
    </div>
  </div>
);

export default ContactTab;
