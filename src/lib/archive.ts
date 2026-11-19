import type { CSSProperties } from "react";
import type { StoryArc, Volume } from "../types/archive";

export const colorStyle = (color: string): CSSProperties => ({ "--c": color } as CSSProperties);

export function arcsForVolume(arcs: StoryArc[], volume: Volume) {
  const region = volume.title ?? volume.region ?? "";
  return arcs.filter((arc) => arc.volumes === region);
}
