import type { Metadata } from "next";
import { PageMotion } from "@/animations/PageMotion";
import { DevilsExplorer } from "@/components/DevilsExplorer";

export const metadata: Metadata = {
  title: "Archon & Entity Files",
  description: "Browse Archons, sovereigns, entities and organizations in the Teyvat Archive.",
};

export default function ClassifiedFilesPage() {
  return <PageMotion page="classified-files"><DevilsExplorer /></PageMotion>;
}
