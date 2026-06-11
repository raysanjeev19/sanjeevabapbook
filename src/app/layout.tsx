import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "ABAPPrep — Learn • Practice • Prepare • Get Hired", template: "%s | ABAPPrep" },
  description:
    "ABAPPrep — the SAP ABAP interview prep platform. 573+ curated questions, Hinglish + English interview scripts, code walkthroughs, mock interviews, and chapter-wise study paths.",
  openGraph: {
    title: "ABAPPrep — SAP ABAP Interview Mastery",
    description: "573+ curated SAP ABAP questions with Hinglish + English interview scripts, code examples, and AI mock interviews.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
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
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
