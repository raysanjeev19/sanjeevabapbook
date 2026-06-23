import type { MetadataRoute } from "next";

/**
 * Web App Manifest — makes CodeGurukul installable as a standalone app
 * and lets PWABuilder generate a signed Android APK from the deployed URL.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeGurukul — SAP ABAP Interview Prep",
    short_name: "CodeGurukul",
    description:
      "Learn • Practice • Prepare • Get Hired. 573+ curated SAP ABAP interview questions with Hinglish + English scripts, code walkthroughs, and AI mock interviews.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b0a1c",
    theme_color: "#4f46e5",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "All Questions", short_name: "Questions", url: "/questions" },
      { name: "AI Mock Interview", short_name: "Interview", url: "/interview" },
      { name: "Your Library", short_name: "Library", url: "/library" },
    ],
  };
}
