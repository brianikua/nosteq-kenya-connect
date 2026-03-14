// Gallery images for each service
import fiber1 from "@/assets/services/gallery/fiber-1.jpg";
import fiber2 from "@/assets/services/gallery/fiber-2.jpg";
import fiber3 from "@/assets/services/gallery/fiber-3.jpg";
import fiber4 from "@/assets/services/gallery/fiber-4.jpg";

import cctv1 from "@/assets/services/gallery/cctv-1.jpg";
import cctv2 from "@/assets/services/gallery/cctv-2.jpg";
import cctv3 from "@/assets/services/gallery/cctv-3.jpg";
import cctv4 from "@/assets/services/gallery/cctv-4.jpg";

import cabling1 from "@/assets/services/gallery/cabling-1.jpg";
import cabling2 from "@/assets/services/gallery/cabling-2.jpg";
import cabling3 from "@/assets/services/gallery/cabling-3.jpg";
import cabling4 from "@/assets/services/gallery/cabling-4.jpg";

import datacenter1 from "@/assets/services/gallery/datacenter-1.jpg";
import datacenter2 from "@/assets/services/gallery/datacenter-2.jpg";
import datacenter3 from "@/assets/services/gallery/datacenter-3.jpg";
import datacenter4 from "@/assets/services/gallery/datacenter-4.jpg";

import software1 from "@/assets/services/gallery/software-1.jpg";
import software2 from "@/assets/services/gallery/software-2.jpg";
import software3 from "@/assets/services/gallery/software-3.jpg";
import software4 from "@/assets/services/gallery/software-4.jpg";

import consulting1 from "@/assets/services/gallery/consulting-1.jpg";
import consulting2 from "@/assets/services/gallery/consulting-2.jpg";
import consulting3 from "@/assets/services/gallery/consulting-3.jpg";
import consulting4 from "@/assets/services/gallery/consulting-4.jpg";

import smartbuilding1 from "@/assets/services/gallery/smartbuilding-1.jpg";
import smartbuilding2 from "@/assets/services/gallery/smartbuilding-2.jpg";
import smartbuilding3 from "@/assets/services/gallery/smartbuilding-3.jpg";
import smartbuilding4 from "@/assets/services/gallery/smartbuilding-4.jpg";

import voip1 from "@/assets/services/gallery/voip-1.jpg";
import voip2 from "@/assets/services/gallery/voip-2.jpg";
import voip3 from "@/assets/services/gallery/voip-3.jpg";
import voip4 from "@/assets/services/gallery/voip-4.jpg";

import cloud1 from "@/assets/services/gallery/cloud-1.jpg";
import cloud2 from "@/assets/services/gallery/cloud-2.jpg";
import cloud3 from "@/assets/services/gallery/cloud-3.jpg";
import cloud4 from "@/assets/services/gallery/cloud-4.jpg";

import serverroom1 from "@/assets/services/gallery/serverroom-1.jpg";
import serverroom2 from "@/assets/services/gallery/serverroom-2.jpg";
import serverroom3 from "@/assets/services/gallery/serverroom-3.jpg";
import serverroom4 from "@/assets/services/gallery/serverroom-4.jpg";

export interface GalleryImage {
  src: string;
  caption: string;
}

export const serviceGalleries: Record<string, GalleryImage[]> = {
  "fiber-internet": [
    { src: fiber1, caption: "Fiber cable installation on utility infrastructure" },
    { src: fiber2, caption: "Precision fiber optic splicing and termination" },
    { src: fiber3, caption: "24/7 network operations center monitoring" },
    { src: fiber4, caption: "Fiber patch panel with organized connections" },
  ],
  "cctv-security": [
    { src: cctv1, caption: "4K dome camera installed at building entrance" },
    { src: cctv2, caption: "Security monitoring room with live feeds" },
    { src: cctv3, caption: "Biometric access control installation" },
    { src: cctv4, caption: "Perimeter surveillance with bullet cameras" },
  ],
  "structured-cabling": [
    { src: cabling1, caption: "Technician dressing cables in server rack" },
    { src: cabling2, caption: "Ceiling trunking and cable tray installation" },
    { src: cabling3, caption: "Fluke cable certification and testing" },
    { src: cabling4, caption: "MDF room with patch panels and terminations" },
  ],
  "data-center": [
    { src: datacenter1, caption: "Server racks in enterprise data center" },
    { src: datacenter2, caption: "Precision cooling system deployment" },
    { src: datacenter3, caption: "UPS and power distribution setup" },
    { src: datacenter4, caption: "Environmental monitoring dashboard" },
  ],
  "software-development": [
    { src: software1, caption: "Developer coding custom web application" },
    { src: software2, caption: "Architecture planning and whiteboarding" },
    { src: software3, caption: "Cross-platform app on mobile and tablet" },
    { src: software4, caption: "QA testing across multiple devices" },
  ],
  "it-consulting": [
    { src: consulting1, caption: "Network architecture presentation to executives" },
    { src: consulting2, caption: "Cybersecurity vulnerability assessment" },
    { src: consulting3, caption: "Cloud migration strategy planning" },
    { src: consulting4, caption: "IT compliance audit and documentation" },
  ],
  "smart-building": [
    { src: smartbuilding1, caption: "Smart control panel for lighting and HVAC" },
    { src: smartbuilding2, caption: "IoT sensors deployed in office ceiling" },
    { src: smartbuilding3, caption: "Building management system dashboard" },
    { src: smartbuilding4, caption: "Automated smart lighting in modern office" },
  ],
  "voip-communications": [
    { src: voip1, caption: "IP desk phones deployed in corporate office" },
    { src: voip2, caption: "HD video conferencing room setup" },
    { src: voip3, caption: "Call center with unified communications" },
    { src: voip4, caption: "VoIP gateway and PBX rack equipment" },
  ],
  "cloud-hosting": [
    { src: cloud1, caption: "Secure colocation facility with server cages" },
    { src: cloud2, caption: "Cloud infrastructure monitoring dashboards" },
    { src: cloud3, caption: "Enterprise backup and storage arrays" },
    { src: cloud4, caption: "Technician installing server hardware" },
  ],
};
