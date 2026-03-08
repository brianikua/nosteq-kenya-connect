// =============================================
// MEDIA LIBRARY — Central hub for all media
// =============================================
// To add new media, simply:
// 1. For images: Upload the image via chat, then add an entry below
// 2. For videos: Paste a YouTube/Vimeo URL and add an entry below
//
// Categories help organize and filter media on the site.

import cctvInstall from "@/assets/cctv-install.jpg";
import serverRoom from "@/assets/server-room.jpg";
import heroTechnicians from "@/assets/hero-technicians.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export type MediaType = "image" | "video";
export type MediaCategory = "Projects" | "Team" | "Events" | "Behind the Scenes" | "Testimonials";

export interface MediaItem {
  id: string;
  type: MediaType;
  /** For images: imported asset or URL. For videos: YouTube/Vimeo embed URL */
  src: string;
  /** Optional thumbnail for videos */
  thumbnail?: string;
  title: string;
  description?: string;
  category: MediaCategory;
  date?: string;
}

export const mediaCategories: MediaCategory[] = [
  "Projects",
  "Team",
  "Events",
  "Behind the Scenes",
  "Testimonials",
];

// =============================================
// ADD YOUR MEDIA ITEMS HERE
// =============================================
export const mediaItems: MediaItem[] = [
  {
    id: "media-001",
    type: "image",
    src: cctvInstall,
    title: "CCTV Installation at Client Site",
    description: "Our team deploying 4K surveillance cameras at a commercial facility.",
    category: "Projects",
    date: "2024-08",
  },
  {
    id: "media-002",
    type: "image",
    src: serverRoom,
    title: "Data Center Build-Out",
    description: "Server room infrastructure deployment for a fintech client.",
    category: "Projects",
    date: "2024-06",
  },
  {
    id: "media-003",
    type: "image",
    src: heroTechnicians,
    title: "Field Technicians On-Site",
    description: "Our engineers running fiber optic cables at a new campus.",
    category: "Team",
    date: "2024-07",
  },
  {
    id: "media-004",
    type: "image",
    src: heroBg,
    title: "Network Operations Center",
    description: "24/7 NOC monitoring critical client infrastructure.",
    category: "Behind the Scenes",
    date: "2024-05",
  },
  // ---- VIDEO EXAMPLES (replace with real URLs) ----
  {
    id: "media-005",
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Nosteq Company Overview",
    description: "Learn about what we do and how we help businesses get connected.",
    category: "Testimonials",
    date: "2024-09",
  },
];
