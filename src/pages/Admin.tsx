import { useState, useEffect, lazy, Suspense } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
const WebUsers = lazy(() => import("@/components/admin/WebUsers"));
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Home,
  Layers,
  Package,
  HelpCircle,
  Users,
  Phone,
  Image,
  Plus,
  Trash2,
  GripVertical,
  Gauge,
  Shield,
  Cable,
  Database,
  Code,
  Network,
  Lightbulb,
  Server,
  Wifi,
  Monitor,
  Cloud,
  Lock,
  Cpu,
  Radio,
  type LucideIcon,
} from "lucide-react";
import {
  getContent,
  saveContent,
  resetContent,
  type SiteContent,
  type PackageItem,
} from "@/lib/contentStore";
import type { MediaItem } from "@/data/media";

const availableIcons: { name: string; icon: LucideIcon }[] = [
  { name: "Gauge", icon: Gauge },
  { name: "Shield", icon: Shield },
  { name: "Cable", icon: Cable },
  { name: "Database", icon: Database },
  { name: "Code", icon: Code },
  { name: "Network", icon: Network },
  { name: "Lightbulb", icon: Lightbulb },
  { name: "Phone", icon: Phone },
  { name: "Server", icon: Server },
  { name: "Wifi", icon: Wifi },
  { name: "Monitor", icon: Monitor },
  { name: "Cloud", icon: Cloud },
  { name: "Lock", icon: Lock },
  { name: "Cpu", icon: Cpu },
  { name: "Radio", icon: Radio },
];

const Admin = () => {
  const { toast } = useToast();
  const { user, isAdmin, isSuperadmin, loading, signOut } = useAdminAuth();
  const [content, setContent] = useState<SiteContent>(getContent());
  const [activeTab, setActiveTab] = useState("hero");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setContent(getContent());
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Checking access...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const updateContent = (section: keyof SiteContent, value: any) => {
    setContent((prev) => ({ ...prev, [section]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    saveContent(content);
    setHasChanges(false);
    toast({ title: "Saved!", description: "Your changes have been saved. Refresh the site to see them." });
  };

  const handleReset = () => {
    const fresh = resetContent();
    setContent(fresh);
    setHasChanges(false);
    toast({ title: "Reset", description: "All content has been reset to defaults." });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
            <h1 className="font-heading text-xl font-bold">Admin Panel</h1>
            {hasChanges && (
              <Badge variant="destructive" className="animate-pulse">
                Unsaved changes
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden md:inline">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid ${isSuperadmin ? 'grid-cols-4 md:grid-cols-8' : 'grid-cols-4 md:grid-cols-7'} w-full mb-8`}>
            <TabsTrigger value="hero" className="gap-1.5"><Home className="w-4 h-4" /><span className="hidden md:inline">Hero</span></TabsTrigger>
            <TabsTrigger value="services" className="gap-1.5"><Layers className="w-4 h-4" /><span className="hidden md:inline">Services</span></TabsTrigger>
            <TabsTrigger value="packages" className="gap-1.5"><Package className="w-4 h-4" /><span className="hidden md:inline">Packages</span></TabsTrigger>
            <TabsTrigger value="faq" className="gap-1.5"><HelpCircle className="w-4 h-4" /><span className="hidden md:inline">FAQ</span></TabsTrigger>
            <TabsTrigger value="about" className="gap-1.5"><Users className="w-4 h-4" /><span className="hidden md:inline">About</span></TabsTrigger>
            <TabsTrigger value="contact" className="gap-1.5"><Phone className="w-4 h-4" /><span className="hidden md:inline">Contact</span></TabsTrigger>
            <TabsTrigger value="media" className="gap-1.5"><Image className="w-4 h-4" /><span className="hidden md:inline">Media</span></TabsTrigger>
            {isSuperadmin && (
              <TabsTrigger value="users" className="gap-1.5"><Shield className="w-4 h-4" /><span className="hidden md:inline">Users</span></TabsTrigger>
            )}
          </TabsList>

          {/* HERO TAB */}
          <TabsContent value="hero">
            <div className="grid gap-6 max-w-3xl">
              <Card>
                <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Badge Text</Label>
                    <Input value={content.hero.badge} onChange={(e) => updateContent("hero", { ...content.hero, badge: e.target.value })} className="mt-1" />
                  </div>
                  {content.hero.heading.map((line, i) => (
                    <div key={i}>
                      <Label>Heading Line {i + 1}</Label>
                      <Input
                        value={line}
                        onChange={(e) => {
                          const h = [...content.hero.heading];
                          h[i] = e.target.value;
                          updateContent("hero", { ...content.hero, heading: h });
                        }}
                        className="mt-1"
                      />
                    </div>
                  ))}
                  <div>
                    <Label>Subheading</Label>
                    <Textarea value={content.hero.subheading} onChange={(e) => updateContent("hero", { ...content.hero, subheading: e.target.value })} className="mt-1" rows={3} />
                  </div>
                  <div>
                    <Label className="mb-2 block">Stats</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {content.hero.stats.map((stat, i) => (
                        <div key={i} className="flex gap-2">
                          <Input placeholder="Value" value={stat.value} onChange={(e) => {
                            const s = [...content.hero.stats];
                            s[i] = { ...s[i], value: e.target.value };
                            updateContent("hero", { ...content.hero, stats: s });
                          }} />
                          <Input placeholder="Label" value={stat.label} onChange={(e) => {
                            const s = [...content.hero.stats];
                            s[i] = { ...s[i], label: e.target.value };
                            updateContent("hero", { ...content.hero, stats: s });
                          }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SERVICES TAB */}
          <TabsContent value="services">
            <div className="grid gap-4 max-w-4xl">
              {content.services.map((service, i) => (
                <Card key={service.slug}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Title</Label>
                        <Input value={service.title} onChange={(e) => {
                          const s = [...content.services];
                          s[i] = { ...s[i], title: e.target.value };
                          updateContent("services", s);
                        }} className="mt-1" />
                      </div>
                      <div>
                        <Label>Badge</Label>
                        <Input value={service.badge} onChange={(e) => {
                          const s = [...content.services];
                          s[i] = { ...s[i], badge: e.target.value };
                          updateContent("services", s);
                        }} className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Icon</Label>
                        <Select
                          value={service.iconName}
                          onValueChange={(v) => {
                            const s = [...content.services];
                            s[i] = { ...s[i], iconName: v };
                            updateContent("services", s);
                          }}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableIcons.map(({ name, icon: IconComp }) => (
                              <SelectItem key={name} value={name}>
                                <span className="flex items-center gap-2">
                                  <IconComp className="w-4 h-4" />
                                  {name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Slug</Label>
                        <Input value={service.slug} onChange={(e) => {
                          const s = [...content.services];
                          s[i] = { ...s[i], slug: e.target.value };
                          updateContent("services", s);
                        }} className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label>Tagline</Label>
                      <Textarea value={service.tagline} onChange={(e) => {
                        const s = [...content.services];
                        s[i] = { ...s[i], tagline: e.target.value };
                        updateContent("services", s);
                      }} className="mt-1" rows={2} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PACKAGES TAB */}
          <TabsContent value="packages">
            <div className="space-y-8 max-w-4xl">
              {(["homePackages", "businessPackages"] as const).map((type) => (
                <div key={type}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl font-bold">
                      {type === "homePackages" ? "Home Packages" : "Business Packages"}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newPkg: PackageItem = { name: "New Plan", speed: "0 Mbps", price: "0", description: "", features: [], popular: false };
                        updateContent(type, [...content[type], newPkg]);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Package
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {content[type].map((pkg, i) => (
                      <Card key={i}>
                        <CardContent className="pt-6 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="grid grid-cols-3 gap-3 flex-1 mr-4">
                              <div>
                                <Label>Name</Label>
                                <Input value={pkg.name} onChange={(e) => {
                                  const p = [...content[type]];
                                  p[i] = { ...p[i], name: e.target.value };
                                  updateContent(type, p);
                                }} className="mt-1" />
                              </div>
                              <div>
                                <Label>Speed</Label>
                                <Input value={pkg.speed} onChange={(e) => {
                                  const p = [...content[type]];
                                  p[i] = { ...p[i], speed: e.target.value };
                                  updateContent(type, p);
                                }} className="mt-1" />
                              </div>
                              <div>
                                <Label>Price (KES)</Label>
                                <Input value={pkg.price} onChange={(e) => {
                                  const p = [...content[type]];
                                  p[i] = { ...p[i], price: e.target.value };
                                  updateContent(type, p);
                                }} className="mt-1" />
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Label className="text-xs">Popular</Label>
                                <Switch
                                  checked={pkg.popular}
                                  onCheckedChange={(v) => {
                                    const p = [...content[type]];
                                    p[i] = { ...p[i], popular: v };
                                    updateContent(type, p);
                                  }}
                                />
                              </div>
                              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                                const p = content[type].filter((_, idx) => idx !== i);
                                updateContent(type, p);
                              }}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Input value={pkg.description} onChange={(e) => {
                              const p = [...content[type]];
                              p[i] = { ...p[i], description: e.target.value };
                              updateContent(type, p);
                            }} className="mt-1" />
                          </div>
                          <div>
                            <Label>Features (one per line)</Label>
                            <Textarea
                              value={pkg.features.join("\n")}
                              onChange={(e) => {
                                const p = [...content[type]];
                                p[i] = { ...p[i], features: e.target.value.split("\n") };
                                updateContent(type, p);
                              }}
                              className="mt-1"
                              rows={4}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* FAQ TAB */}
          <TabsContent value="faq">
            <div className="space-y-6 max-w-3xl">
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => {
                  updateContent("faqs", [...content.faqs, { category: "New Category", questions: [{ question: "", answer: "" }] }]);
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Add Category
                </Button>
              </div>
              {content.faqs.map((section, si) => (
                <Card key={si}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <Label>Category Name</Label>
                        <Input value={section.category} onChange={(e) => {
                          const f = [...content.faqs];
                          f[si] = { ...f[si], category: e.target.value };
                          updateContent("faqs", f);
                        }} className="mt-1" />
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                        updateContent("faqs", content.faqs.filter((_, idx) => idx !== si));
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.questions.map((q, qi) => (
                      <div key={qi} className="p-3 bg-muted/50 rounded-lg space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <Label>Question</Label>
                            <Input value={q.question} onChange={(e) => {
                              const f = [...content.faqs];
                              const qs = [...f[si].questions];
                              qs[qi] = { ...qs[qi], question: e.target.value };
                              f[si] = { ...f[si], questions: qs };
                              updateContent("faqs", f);
                            }} className="mt-1" />
                          </div>
                          <Button variant="ghost" size="icon" className="text-destructive mt-6" onClick={() => {
                            const f = [...content.faqs];
                            f[si] = { ...f[si], questions: f[si].questions.filter((_, idx) => idx !== qi) };
                            updateContent("faqs", f);
                          }}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <Label>Answer</Label>
                          <Textarea value={q.answer} onChange={(e) => {
                            const f = [...content.faqs];
                            const qs = [...f[si].questions];
                            qs[qi] = { ...qs[qi], answer: e.target.value };
                            f[si] = { ...f[si], questions: qs };
                            updateContent("faqs", f);
                          }} className="mt-1" rows={3} />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => {
                      const f = [...content.faqs];
                      f[si] = { ...f[si], questions: [...f[si].questions, { question: "", answer: "" }] };
                      updateContent("faqs", f);
                    }}>
                      <Plus className="w-4 h-4 mr-1" /> Add Question
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ABOUT TAB */}
          <TabsContent value="about">
            <div className="grid gap-6 max-w-3xl">
              <Card>
                <CardHeader><CardTitle>Company Story</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {content.about.story.map((p, i) => (
                    <div key={i}>
                      <Label>Paragraph {i + 1}</Label>
                      <Textarea value={p} onChange={(e) => {
                        const s = [...content.about.story];
                        s[i] = e.target.value;
                        updateContent("about", { ...content.about, story: s });
                      }} className="mt-1" rows={3} />
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {content.about.stats.map((stat, i) => (
                      <div key={i} className="space-y-2">
                        <Input placeholder="Value" value={stat.value} onChange={(e) => {
                          const s = [...content.about.stats];
                          s[i] = { ...s[i], value: e.target.value };
                          updateContent("about", { ...content.about, stats: s });
                        }} />
                        <Input placeholder="Label" value={stat.label} onChange={(e) => {
                          const s = [...content.about.stats];
                          s[i] = { ...s[i], label: e.target.value };
                          updateContent("about", { ...content.about, stats: s });
                        }} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Testimonials</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => {
                      updateContent("about", {
                        ...content.about,
                        testimonials: [...content.about.testimonials, { text: "", author: "", role: "", location: "", rating: 5 }],
                      });
                    }}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.about.testimonials.map((t, i) => (
                    <div key={i} className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-3 gap-2 flex-1 mr-2">
                          <Input placeholder="Author" value={t.author} onChange={(e) => {
                            const ts = [...content.about.testimonials];
                            ts[i] = { ...ts[i], author: e.target.value };
                            updateContent("about", { ...content.about, testimonials: ts });
                          }} />
                          <Input placeholder="Role" value={t.role} onChange={(e) => {
                            const ts = [...content.about.testimonials];
                            ts[i] = { ...ts[i], role: e.target.value };
                            updateContent("about", { ...content.about, testimonials: ts });
                          }} />
                          <Input placeholder="Location" value={t.location} onChange={(e) => {
                            const ts = [...content.about.testimonials];
                            ts[i] = { ...ts[i], location: e.target.value };
                            updateContent("about", { ...content.about, testimonials: ts });
                          }} />
                        </div>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                          updateContent("about", {
                            ...content.about,
                            testimonials: content.about.testimonials.filter((_, idx) => idx !== i),
                          });
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea placeholder="Testimonial text" value={t.text} onChange={(e) => {
                        const ts = [...content.about.testimonials];
                        ts[i] = { ...ts[i], text: e.target.value };
                        updateContent("about", { ...content.about, testimonials: ts });
                      }} rows={2} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CONTACT TAB */}
          <TabsContent value="contact">
            <div className="grid gap-6 max-w-3xl">
              <Card>
                <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Phone</Label>
                    <Input value={content.contact.phone} onChange={(e) => updateContent("contact", { ...content.contact, phone: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={content.contact.email} onChange={(e) => updateContent("contact", { ...content.contact, email: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Textarea value={content.contact.address} onChange={(e) => updateContent("contact", { ...content.contact, address: e.target.value })} className="mt-1" rows={2} />
                  </div>
                  <div>
                    <Label>Business Hours (one per line)</Label>
                    <Textarea
                      value={content.contact.hours.join("\n")}
                      onChange={(e) => updateContent("contact", { ...content.contact, hours: e.target.value.split("\n") })}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MEDIA TAB */}
          <TabsContent value="media">
            <div className="space-y-4 max-w-4xl">
              <div className="flex justify-between items-center">
                <h3 className="font-heading text-xl font-bold">Media Library</h3>
                <Button variant="outline" size="sm" onClick={() => {
                  const newItem: MediaItem = {
                    id: `media-${Date.now()}`,
                    type: "image",
                    src: "",
                    title: "New Media Item",
                    description: "",
                    category: "Projects",
                  };
                  updateContent("media", [...content.media, newItem]);
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Add Media
                </Button>
              </div>
              <div className="grid gap-4">
                {content.media.map((item, i) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        {item.src && item.type === "image" && (
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                            <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <Label>Title</Label>
                              <Input value={item.title} onChange={(e) => {
                                const m = [...content.media];
                                m[i] = { ...m[i], title: e.target.value };
                                updateContent("media", m);
                              }} className="mt-1" />
                            </div>
                            <div>
                              <Label>Category</Label>
                              <Input value={item.category} onChange={(e) => {
                                const m = [...content.media];
                                m[i] = { ...m[i], category: e.target.value as any };
                                updateContent("media", m);
                              }} className="mt-1" />
                            </div>
                            <div>
                              <Label>Type</Label>
                              <Input value={item.type} onChange={(e) => {
                                const m = [...content.media];
                                m[i] = { ...m[i], type: e.target.value as any };
                                updateContent("media", m);
                              }} className="mt-1" placeholder="image or video" />
                            </div>
                          </div>
                          <div>
                            <Label>Source URL</Label>
                            <Input value={item.src} onChange={(e) => {
                              const m = [...content.media];
                              m[i] = { ...m[i], src: e.target.value };
                              updateContent("media", m);
                            }} className="mt-1" placeholder="Image URL or YouTube embed URL" />
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="flex-1">
                              <Label>Description</Label>
                              <Input value={item.description || ""} onChange={(e) => {
                                const m = [...content.media];
                                m[i] = { ...m[i], description: e.target.value };
                                updateContent("media", m);
                              }} className="mt-1" />
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                              updateContent("media", content.media.filter((_, idx) => idx !== i));
                            }}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
