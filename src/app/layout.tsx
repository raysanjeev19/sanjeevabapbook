import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import "./globals.css";

/* Body face — geometric, friendly, highly readable */
const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/* Display face for headings — bold, modern, confident */
const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "CodeGurukul — Learn • Practice • Prepare • Get Hired", template: "%s | CodeGurukul" },
  description:
    "CodeGurukul — the SAP ABAP interview prep platform. 573+ curated questions, Hinglish + English interview scripts, code walkthroughs, mock interviews, and chapter-wise study paths.",
  openGraph: {
    title: "CodeGurukul — SAP ABAP Interview Mastery",
    description: "573+ curated SAP ABAP questions with Hinglish + English interview scripts, code examples, and AI mock interviews.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F6FB" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0A1C" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* Runs before paint so the chosen theme is applied with no flash. */
const themeInit = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var c=document.documentElement.classList;c.remove("light","dark");c.add(d?"dark":"light");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <div className="top-ribbon" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
