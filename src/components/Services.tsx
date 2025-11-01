import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Shield, Network, Lightbulb, Phone, Server, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Gauge,
    title: "Fiber Internet Provision",
    swahili: "Haraka",
    description: "Unlimited high-speed fiber up to 1Gbps for seamless streaming, gaming, and remote work. 99.9% uptime, empowering Kenyan homes like the resilient Maasai warriors.",
    badge: "Up to 1Gbps"
  },
  {
    icon: Shield,
    title: "CCTV & Security Installation",
    swahili: "Usalama",
    description: "State-of-the-art 4K surveillance systems with AI motion detection, remote access, and 24/7 monitoring, safeguarding like traditional Kenyan village watchtowers.",
    badge: "4K Quality"
  },
  {
    icon: Network,
    title: "IT Systems & Solutions",
    swahili: "Teknolojia",
    description: "Custom network design, cloud integration, cybersecurity, and enterprise hardware setups, blending tech with Kenyan innovation.",
    badge: "Enterprise Grade"
  },
  {
    icon: Lightbulb,
    title: "Smart Home Automation",
    swahili: "Nyumba Smart",
    description: "IoT devices, voice control, energy-efficient smart systems for homes and offices, inspired by harmonious Kenyan communal living.",
    badge: "IoT Enabled"
  },
  {
    icon: Phone,
    title: "VoIP & Business Telephony",
    swahili: "Mawasiliano",
    description: "Crystal-clear cloud PBX, video conferencing, and unified communications, connecting like ancient Kenyan drum signals.",
    badge: "HD Quality"
  },
  {
    icon: Server,
    title: "Data Center Hosting",
    swahili: "Hifadhi Data",
    description: "Secure colocation, VPS, dedicated servers with redundant power and cooling, as reliable as Kenya's enduring landscapes.",
    badge: "99.9% Uptime"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 kitenge-pattern opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tech solutions for every Kenyan need
          </p>
          <div className="flag-divider w-32 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 cyber-glow maasai-border animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full font-semibold">
                    {service.badge}
                  </span>
                </div>
                <CardTitle className="font-heading text-xl mb-2">
                  {service.title}
                  <span className="block text-sm text-primary font-normal italic">"{service.swahili}"</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4">
                  {service.description}
                </CardDescription>
                <Button variant="ghost" size="sm" className="group/btn">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
};

export default Services;
