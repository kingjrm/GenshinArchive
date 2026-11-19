import type { Metadata } from "next";
import Script from "next/script";
import { ArchiveShell } from "@/components/ArchiveShell";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: "GENSHIN — Teyvat Archive", template: "%s — Teyvat Archive" },
  description: "An informative fan archive of Genshin Impact: characters, nations, story chapters, lore, entities and connections.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><body>
    <Script id="archive-intro-session" strategy="beforeInteractive">{`try { if (sessionStorage.getItem("genshin") === "1") document.documentElement.dataset.csmSeen = "1"; if (matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.dataset.csmReduced = "1"; } catch {}`}</Script>
    <ArchiveShell>{children}</ArchiveShell>
  </body></html>;
}
