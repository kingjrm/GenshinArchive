import type { Volume } from "../types/archive";

const nations = [
  ["Mondstadt", "Archon Quest prologue and Khaenri'ah interlude", "Mondstadt"],
  ["Liyue", "Rite of Parting and the Geo sovereign", "Liyue"],
  ["Inazuma", "Eternity, ambition and the Vision Hunt Decree", "Inazuma"],
  ["Sumeru", "Dreams, wisdom and the Gnosis", "Sumeru"],
  ["Fontaine", "Justice, prophecy and sovereign succession", "Fontaine"],
  ["Natlan", "The Sacred Flame and the tribes", "Natlan"],
  ["Nod-Krai", "Moonlit factions and the northern frontier", "nod-krai"],
  ["Snezhnaya", "The Tsaritsa, Fatui and the Gnosis campaign", "snezhnaya"],
  ["Khaenri'ah", "The fallen nation and the Traveler's twin", "khaenriah"]
] as const;

export const volumes: Volume[] = nations.map((nation, index) => ({
  number: index + 1,
  part: index < 5 ? "1" : "2",
  chapters: nation[1],
  color: ["#56BFAA", "#C9A84C", "#9A78C7", "#A3C85C", "#62BBD2", "#EE7B35", "#91B5C9", "#BBD4E5", "#5077A8"][index],
  cover: `/images/locations/${nation[2].toLowerCase()}.svg`,
  publishedInJapan: "Playable region",
  sourceUrl: "https://genshin.hoyoverse.com/"
}));
