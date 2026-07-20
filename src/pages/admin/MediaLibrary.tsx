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
  thumb_path: string | null;
  thumb_url: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

const BUCKET = "media-library";
const SIGN_TTL = 60 * 60 * 24 * 365 * 10; // ~10y
const THUMB_MAX = 480;
const PREVIEW_MAX = 1200;

async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

async function resizeToBlob(img: HTMLImageElement, maxSide: number, quality = 0.82): Promise<Blob | null> {
  const ratio = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * ratio);
  const h = Math.round(img.naturalHeight * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, w, h);
  return new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/webp", quality)
  );
}

export default function MediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
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

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setUploading(true);
    setProgress({ done: 0, total: list.length });
    const { data: { user } } = await supabase.auth.getUser();

    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      try {
        const ext = (file.name.split(".").pop() || "bin").toLowerCase();
        const safe = file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-").slice(0, 40);
        const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
        const path = `originals/${stamp}.${ext}`;

        // Upload original
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
          contentType: file.type,
          upsert: false,
        });
        if (upErr) throw upErr;

        // Generate thumbnail + preview for images
        let thumbPath: string | null = null;
        let thumbUrl: string | null = null;
        let width: number | null = null;
        let height: number | null = null;

        if (file.type.startsWith("image/") && file.type !== "image/svg+xml") {
          try {
            const img = await loadImage(file);
            width = img.naturalWidth;
            height = img.naturalHeight;
            const thumbBlob = await resizeToBlob(img, THUMB_MAX, 0.8);
            const previewBlob = await resizeToBlob(img, PREVIEW_MAX, 0.85);
            if (thumbBlob) {
              thumbPath = `thumbs/${stamp}.webp`;
              const { error: tErr } = await supabase.storage.from(BUCKET).upload(thumbPath, thumbBlob, {
                contentType: "image/webp",
                upsert: false,
              });
              if (tErr) throw tErr;
            }
            if (previewBlob) {
              const previewPath = `previews/${stamp}.webp`;
              await supabase.storage.from(BUCKET).upload(previewPath, previewBlob, {
                contentType: "image/webp",
                upsert: false,
              });
            }
          } catch (e) {
            console.warn("Thumbnail generation failed", e);
          }
        }

        // Sign long-lived URLs
        const paths = [path, ...(thumbPath ? [thumbPath] : [])];
        const { data: signed, error: signErr } = await supabase.storage
          .from(BUCKET)
          .createSignedUrls(paths, SIGN_TTL);
        if (signErr) throw signErr;
        const url = signed?.find((s) => s.path === path)?.signedUrl ?? "";
        if (thumbPath) thumbUrl = signed?.find((s) => s.path === thumbPath)?.signedUrl ?? null;

        const { error: insErr } = await supabase.from("media_assets").insert({
          name: file.name,
          path,
          url,
          thumb_path: thumbPath,
          thumb_url: thumbUrl,
          mime_type: file.type,
          size_bytes: file.size,
          width,
          height,
          created_by: user?.id ?? null,
        });
        if (insErr) throw insErr;
      } catch (e: any) {
        toast({ title: `Failed: ${file.name}`, description: e.message, variant: "destructive" });
      } finally {
        setProgress({ done: i + 1, total: list.length });
      }
    }

    setUploading(false);
    setProgress(null);
    if (fileInput.current) fileInput.current.value = "";
    toast({ title: "Upload complete" });
    void load();
  };

  const handleDelete = async (a: MediaAsset) => {
    if (!confirm(`Delete "${a.name}"? This cannot be undone.`)) return;
    const toRemove = [a.path];
    if (a.thumb_path) toRemove.push(a.thumb_path);
    // best-effort remove preview by convention
    const stamp = a.thumb_path?.replace(/^thumbs\//, "").replace(/\.webp$/, "");
    if (stamp) toRemove.push(`previews/${stamp}.webp`);
    const { error: sErr } = await supabase.storage.from(BUCKET).remove(toRemove);
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
            Uploads are automatically resized into WebP thumbnails and previews for instant loading.
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
            {uploading && progress ? `Uploading ${progress.done}/${progress.total}…` : "Upload images"}
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
          {filtered.map((a) => {
            const previewSrc = a.thumb_url ?? a.url;
            return (
              <div key={a.id} className="group rounded-xl border border-border overflow-hidden bg-card">
                <div className="aspect-square bg-muted overflow-hidden">
                  <img
                    src={previewSrc}
                    srcSet={a.thumb_url ? `${a.thumb_url} 480w, ${a.url} 1600w` : undefined}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    alt={a.name}
                    loading="lazy"
                    decoding="async"
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
            );
          })}
        </div>
      )}
    </div>
  );
}
