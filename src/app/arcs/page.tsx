import { PageMotion } from "@/animations/PageMotion";
import { ArcsExplorer } from "@/components/ArcsExplorer";

export const metadata = { title: "Story Chapters" };
export default function ArcsPage() {
  return <PageMotion page="arcs"><ArcsExplorer /><p className="note">Story summaries describe major Genshin Impact Archon Quest events. Official quest names and current chapter details are available through <a href="https://genshin.hoyoverse.com/" target="_blank" rel="noopener noreferrer">HoYoverse</a>.</p></PageMotion>;
}
