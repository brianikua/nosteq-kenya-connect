import { useState } from "react";
import { mediaItems, mediaCategories, type MediaItem } from "@/data/media";
import { Play, X, Image as ImageIcon, Video } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScrollReveal from "@/components/ScrollReveal";

const MediaGallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? mediaItems
      : mediaItems.filter((m) => m.category === activeCategory);

  return (
    <section id="media" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-primary/10 text-primary">
              Media Gallery
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Work in Action
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse photos and videos from our projects, events, and behind the scenes.
            </p>
          </div>
        </ScrollReveal>

        {/* Category filters */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["All", ...mediaCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <div
                onClick={() => setSelectedItem(item)}
                className="group relative cursor-pointer rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-video overflow-hidden">
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative w-full h-full bg-muted flex items-center justify-center">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <Video className="w-12 h-12 text-primary/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {item.type === "image" ? (
                      <ImageIcon className="w-4 h-4 text-primary" />
                    ) : (
                      <Video className="w-4 h-4 text-secondary" />
                    )}
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No media in this category yet. Send us your photos and videos to add here!
          </p>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
          {selectedItem && (
            <div>
              <div className="aspect-video bg-black">
                {selectedItem.type === "image" ? (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={selectedItem.src}
                    title={selectedItem.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground">
                  {selectedItem.title}
                </h3>
                {selectedItem.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedItem.description}
                  </p>
                )}
                <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                  {selectedItem.category}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MediaGallery;
