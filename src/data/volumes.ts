import type { Volume } from "../types/archive";

const nations = [
  ["Mondstadt","Prologue: The Outlander and the Stormterror crisis","Mondstadt","Mondstadt is a western island nation shaped by wind, freedom and the legacy of Barbatos. Its story begins around Stormterror, the Four Winds and the Knights of Favonius."],
  ["Liyue","Chapter I: Contracts, Rex Lapis and the Adepti","Liyue","Liyue is a contract-driven nation of harbor trade, stone mountains and Adepti. Its Archon Quest follows Rex Lapis's test of humanity and Tartaglia's Osial scheme."],
  ["Inazuma","Chapter II: Eternity and the Vision Hunt Decree","Inazuma","Inazuma is an archipelago closed by the Sakoku Decree. The story follows its resistance, the Shogunate and Raiden Ei's decision to reconsider eternity."],
  ["Sumeru","Chapter III: Dreams, the Akademiya and forbidden wisdom","Sumeru","Sumeru stretches from rainforest to desert. Its story investigates the Akademiya, the Sabzeruz Festival, Lesser Lord Kusanali and the artificial god crisis."],
  ["Fontaine","Chapter IV: Justice, prophecy and sovereignty","Fontaine","Fontaine is a technologically developed nation beneath a public trial system. Its journey confronts the prophecy, Focalors's plan and the return of the Hydro Dragon."],
  ["Natlan","Chapter V: Tribes, the Sacred Flame and the Night Kingdom","Natlan","Natlan is a nation of tribes and Pyro traditions. Its story follows the pilgrimage, named heroes and the Abyss war that threatened the Night Kingdom."],
  ["Nod-Krai","Song of the Welkin Moon: frontier moon factions","nod-krai","Nod-Krai is a contested southern frontier outside Snezhnaya's direct authority. Moon-linked factions, Frostmoon Scions, Lightkeepers and Fatui interests shape its changing society."],
  ["Snezhnaya","Chapter VII: Everwinter and the Tsaritsa's plan","snezhnaya","Snezhnaya is a northern nation governed by the Cryo Archon and executed by the Fatui. Its Archon Quest advances the campaign for the Gnoses and the plan against heavenly order."],
  ["Khaenri'ah","Hidden history: the fallen human kingdom","khaenriah","Khaenri'ah was a human nation that rejected gods and survived through alchemy and technology. Its destruction is central to the Abyss, the Traveler's twin and Teyvat's cataclysm."]
] as const;

export const volumes: Volume[] = nations.map((nation, index) => ({
  number: index + 1,
  part: index < 5 ? "1" : "2",
  chapters: nation[1],
  color: ["#56BFAA", "#C9A84C", "#9A78C7", "#A3C85C", "#62BBD2", "#EE7B35", "#91B5C9", "#BBD4E5", "#5077A8"][index],
  cover: `/images/locations/${nation[2].toLowerCase()}.svg`,
  title: nation[0],
  region: nation[0],
  summary: nation[3],
  publishedInJapan: "Playable region",
  sourceUrl: "https://genshin.hoyoverse.com/"
}));
