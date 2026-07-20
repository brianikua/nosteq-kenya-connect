import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, Trash2, Copy, ImageIcon, Search } from "lucide-react";

interface MediaAsset {
  id: string;
  name: string;
  path: string;
  url: string;
  mime_type: string | null;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

const BUCKET = "media-library";

export default function MediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("media_assets")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Load failed", description: error.message, variant: "destructive" });
    setAssets((data as MediaAsset[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const getDims = (file: File) =>
    new Promise<{ w: number; h: number } | null>((resolve) => {
      if (!file.type.startsWith("image/")) return resolve(null);
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve(null);
      img.src = URL.createObjectURL(file);
    });

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    for (const file of Array.from(files)) {
      try {
        const ext = file.name.split(".").pop() || "bin";
        const safe = file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-").slice(0, 40);
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}.${ext}`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
          contentType: file.type,
          upsert: false,
        });
        if (upErr) throw upErr;
        const { data: signed, error: signErr } = await supabase.storage
          .from(BUCKET)
          .createSignedUrl(path, 60 * 60 * 24 * 365 * 10); // ~10y
        if (signErr) throw signErr;
        const dims = await getDims(file);
        const { error: insErr } = await supabase.from("media_assets").insert({
          name: file.name,
          path,
          url: signed.signedUrl,
          mime_type: file.type,
          size_bytes: file.size,
          width: dims?.w ?? null,
          height: dims?.h ?? null,
          created_by: user?.id ?? null,
        });
        if (insErr) throw insErr;
      } catch (e: any) {
        toast({ title: `Failed: ${file.name}`, description: e.message, variant: "destructive" });
      }
    }
    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
    toast({ title: "Upload complete" });
    void load();
  };

  const handleDelete = async (a: MediaAsset) => {
    if (!confirm(`Delete "${a.name}"? This cannot be undone.`)) return;
    const { error: sErr } = await supabase.storage.from(BUCKET).remove([a.path]);
    if (sErr) toast({ title: "Storage delete failed", description: sErr.message, variant: "destructive" });
    const { error: dErr } = await supabase.from("media_assets").delete().eq("id", a.id);
    if (dErr) {
      toast({ title: "Delete failed", description: dErr.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted" });
    setAssets((prev) => prev.filter((x) => x.id !== a.id));
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast({ title: "URL copied", description: "Paste it into any image field in Content CMS." });
  };

  const filtered = assets.filter((a) =>
    !query || a.name.toLowerCase().includes(query.toLowerCase())
  );

  const fmt = (n: number | null) => {
    if (!n) return "";
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-between items-start">
        <div>
          <h1 className="text-2xl font-heading font-bold">Media Library</h1>
          <p className="text-sm text-muted-foreground">
            Upload, reuse, and delete images for the hero collage, portfolio, and testimonials.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
          <Button onClick={() => fileInput.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
            Upload images
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by filename…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-dashed border-border rounded-xl py-16 text-center text-muted-foreground">
          <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
          No media yet. Upload your first image to get started.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((a) => (
            <div key={a.id} className="group rounded-xl border border-border overflow-hidden bg-card">
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src={a.url}
                  alt={a.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3 space-y-2">
                <div className="text-xs font-medium truncate" title={a.name}>{a.name}</div>
                <div className="text-[10px] text-muted-foreground">
                  {a.width && a.height ? `${a.width}×${a.height} · ` : ""}{fmt(a.size_bytes)}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => copyUrl(a.url)}>
                    <Copy className="w-3 h-3 mr-1" /> Copy URL
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(a)}>
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
