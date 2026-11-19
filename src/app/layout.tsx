import type { Metadata } from "next";
import { ArchiveShell } from "@/components/ArchiveShell";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: "GENSHIN — Teyvat Archive", template: "%s — Teyvat Archive" },
  description: "An informative fan archive of Genshin Impact: characters, nations, story chapters, lore, entities and connections.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><body><ArchiveShell>{children}</ArchiveShell></body></html>;
}
