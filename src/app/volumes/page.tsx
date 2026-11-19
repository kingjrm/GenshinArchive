import { PageMotion } from "@/animations/PageMotion";
import { PageHeading } from "@/components/PageHeading";
import { VolumesExplorer } from "@/components/VolumesExplorer";

export const metadata = { title: "Nation Index" };
export default function VolumesPage() {
  return <PageMotion page="volumes"><PageHeading title="The" accent="Nations" japanese="国" /><VolumesExplorer /></PageMotion>;
}
