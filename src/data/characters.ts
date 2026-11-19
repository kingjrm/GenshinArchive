import type { Character } from "../types/archive";

type RegionRoster = readonly [region: string, quest: string, names: readonly string[]];

const roster: readonly RegionRoster[] = [
  ["Mondstadt", "Song of the Dragon and Freedom", ["Albedo","Amber","Barbara","Bennett","Dahlia","Diluc","Diona","Durin","Eula","Fischl","Jean","Kaeya","Klee","Lisa","Lohen","Mika","Mona","Nicole","Noelle","Prune","Razor","Rosaria","Sucrose","Varka","Venti","Lumine","Aether","Paimon"]],
  ["Liyue", "Farewell, the Archaic Lord", ["Baizhu","Beidou","Chongyun","Gaming","Ganyu","Hu Tao","Keqing","Lan Yan","Ningguang","Qiqi","Shenhe","Xiangling","Xianyun","Xiao","Xingqiu","Xinyan","Yanfei","Yaoyao","Yelan","Yun Jin","Zhongli","Zibai"]],
  ["Inazuma", "Omnipresence Over Mortals", ["Arataki Itto","Gorou","Kaedehara Kazuha","Kamisato Ayaka","Kamisato Ayato","Kirara","Kujou Sara","Kuki Shinobu","Raiden Shogun","Sangonomiya Kokomi","Sayu","Shikanoin Heizou","Thoma","Yae Miko","Yoimiya","Yumemizuki Mizuki"]],
  ["Sumeru", "Akasha Pulses, the Kalpa Flame Rises", ["Alhaitham","Candace","Collei","Cyno","Dehya","Dori","Faruzan","Kaveh","Layla","Nahida","Nilou","Sethos","Tighnari","Wanderer"]],
  ["Fontaine", "Masquerade of the Guilty", ["Charlotte","Chevreuse","Chiori","Clorinde","Emilie","Escoffier","Freminet","Furina","Lynette","Lyney","Navia","Neuvillette","Sigewinne","Wriothesley"]],
  ["Natlan", "Flowers Resplendent on the Sun-Scorched Sojourn", ["Chasca","Citlali","Iansan","Ifa","Kachina","Kinich","Mavuika","Mualani","Ororon","Skirk","Varesa","Xilonen"]],
  ["Nod-Krai", "Song of the Welkin Moon", ["Aino","Flins","Ineffa","Jahoda","Lauma","Nefer","Illuga","Linnea"]],
  ["Snezhnaya", "The Tsaritsa and the Fatui", ["Tsaritsa","Danica","Alyosha","Arlecchino","Columbina Hyposelenia","Odette","Sandrone","Tartaglia","Vesna","Vodyanitsa"]],
  ["Khaenri'ah", "Requiem of the Echoing Depths", ["Dainsleif"]]
];

const svgFallbacks = new Set([
  "alhaitham","amber","chiorinde","cyano","danica","heizou","hu-tao","jean","kirara","kuva","lan-yan","lohe","lohen","lynette","lyney","noelle","ororon","raiden","sandrone","skirk","thoma","tsaritsa","varersa","vodka","vodoyanitsa","xianyun","yae-miko","yanfei","yun-jin"
]);

const specialIds: Record<string, string> = {
  "Arataki Itto": "itto",
  "Raiden Shogun": "shogun",
  "Kamisato Ayaka": "ayaka",
  "Hu Tao": "hutao",
  "Kaedehara Kazuha": "kazuha",
  "Kamisato Ayato": "ayato",
  "Kujou Sara": "sara",
  "Kuki Shinobu": "shinobu",
  "Sangonomiya Kokomi": "kokomi",
  "Shikanoin Heizou": "heizou",
  "Yae Miko": "yae-miko",
  "Yumemizuki Mizuki": "mizuki",
  "Lan Yan": "lan-yan",
  "Yun Jin": "yun-jin",
  "Columbina Hyposelenia": "columbina",
};

function slug(name: string) {
  return specialIds[name] ?? name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

const palette = ["#78A6A0","#C9A84C","#9A78C7","#A3C85C","#62BBD2","#EE7B35","#91B5C9","#BBD4E5","#5077A8"];

const regionalCharacters: Character[] = roster.flatMap(([region, quest, names], regionIndex) =>
  names.map((name): Character | null => {
    const id = slug(name);
    if (["lumine","aether","paimon","venti","zhongli","xiao","shogun","ayaka","nahida","cyno","furina","neuvillette","mavuika","kinich","lauma","flins","aino","tartaglia","arlecchino","dainsleif","columbina"].includes(id)) return null;
    return {
      id,
      name,
      japanese: "",
      parts: regionIndex < 6 ? ["1" as const] : ["2" as const],
      role: `Playable character · ${region}`,
      color: palette[regionIndex],
      background: `${name} is a playable character associated with ${region}. Their playable profile, elemental affinity, weapon and story appearances are represented by the Genshin Impact Character Archive.`,
      powers: "Combat abilities, elemental skill and burst are defined by the character's official in-game talent records.",
      relationships: ["lumine", "paimon"].filter((related) => related !== id),
      contracts: region,
      artwork: svgFallbacks.has(id)
        ? `/images/characters/${id}.svg`
        : `/images/characters/${id}.png`,
      region,
      quest,
    };
  }).filter((item): item is Character => item !== null)
);

export const characters: Character[] = [
  { id:"lumine", name:"Lumine", japanese:"蛍", parts:["1","2"], role:"Traveler · Mondstadt-to-Snezhnaya journey", color:"#E6C77A", background:"A star-traveling Descender separated from her twin at Teyvat's border. Lumine explores every nation, forms alliances and uncovers the rules hiding behind Celestia.", powers:"Elemental resonance, sword combat and regional exploration.", relationships:["aether","paimon","dainsleif","zhongli"], contracts:"Teyvat elemental resonance", artwork:"/images/characters/lumine.png", region:"Mondstadt", quest:"Song of the Dragon and Freedom" },
  { id:"aether", name:"Aether", japanese:"空", parts:["1","2"], role:"Traveler · Mondstadt-to-Snezhnaya journey", color:"#E6C77A", background:"The twin of Lumine and the male Traveler selectable for the journey. Aether investigates Teyvat's wars while following clues about their lost shared path.", powers:"Sword combat and elemental resonance.", relationships:["lumine","paimon","dainsleif"], contracts:"Teyvat elemental resonance", artwork:"/images/characters/aether.png", region:"Mondstadt", quest:"Song of the Dragon and Freedom" },
  { id:"paimon", name:"Paimon", japanese:"パイモン", parts:["1","2"], role:"Guide · Constant companion", color:"#8CC8D8", background:"A floating guide rescued by the Traveler near Starfell Lake. Paimon translates, navigates and appears throughout Teyvat's major questlines.", powers:"Flight, navigation and translation.", relationships:["lumine","aether","dainsleif"], contracts:"Unknown", artwork:"/images/characters/paimon.png", region:"Mondstadt", quest:"Every Archon Quest" },
  { id:"venti", name:"Venti", japanese:"ウェンティ", parts:["1"], role:"Anemo Archon · Barbatos", color:"#56BFAA", background:"The bard of Mondstadt is Barbatos, the god who left its people free to choose their own rulers. He returns in times of danger despite living among mortals.", powers:"Anemo authority and wind manipulation.", relationships:["lumine","zhongli","shogun","nahida"], contracts:"Freedom", artwork:"/images/characters/venti.png", region:"Mondstadt", quest:"Song of the Dragon and Freedom" },
  { id:"zhongli", name:"Zhongli", japanese:"鍾離", parts:["1"], role:"Geo Archon · Consultant", color:"#C9A84C", background:"Rex Lapis founded Liyue and ended his public godhood to test humanity's contracts. He now serves as Wangsheng Funeral Parlor's consultant.", powers:"Geo constructs, petrification and polearm combat.", relationships:["lumine","venti","shogun","nahida"], contracts:"Liyue's contracts", artwork:"/images/characters/zhongli.png", region:"Liyue", quest:"Farewell, the Archaic Lord" },
  { id:"xiao", name:"Xiao", japanese:"魈", parts:["1"], role:"Vigilant Yaksha · Adeptus", color:"#79A86B", background:"The last surviving Vigilant Yaksha of Rex Lapis's five warriors. Xiao defends Liyue while enduring centuries of karmic pain.", powers:"Anemo Yaksha arts and the Bane of All Evil.", relationships:["lumine","zhongli"], contracts:"Protection of Liyue", artwork:"/images/characters/xiao.png", region:"Liyue", quest:"Farewell, the Archaic Lord" },
  { id:"shogun", name:"Raiden Shogun", japanese:"雷電将軍", parts:["1"], role:"Electro Archon · Eternity", color:"#9A78C7", background:"Raiden Ei governs Inazuma in pursuit of eternal stillness. Her puppet enacted the Vision Hunt Decree while Ei reconsidered what eternity should protect.", powers:"Electro authority, Musou Isshin and the Plane of Euthymia.", relationships:["lumine","nahida","furina","mavuika"], contracts:"Eternity and Inazuma", artwork:"/images/characters/shogun.png", region:"Inazuma", quest:"Omnipresence Over Mortals" },
  { id:"ayaka", name:"Kamisato Ayaka", japanese:"神里綾華", parts:["1"], role:"Yashiro Commission · Shirasagi Himegimi", color:"#86B7D6", background:"Ayaka leads Kamisato's public affairs and supports the resistance against the Vision Hunt Decree while protecting Inazuma's citizens.", powers:"Cryo sword arts and the Kamisato school.", relationships:["lumine","shogun"], contracts:"Kamisato Commission", artwork:"/images/characters/ayaka.png", region:"Inazuma", quest:"Omnipresence Over Mortals" },
  { id:"nahida", name:"Nahida", japanese:"ナヒーダ", parts:["1","2"], role:"Dendro Archon · Lesser Lord Kusanali", color:"#A3C85C", background:"The Archon of Sumeru watches dreams and protects wisdom through a world where the Akademiya hides corruption behind knowledge.", powers:"Dendro authority, dream entry and shared perception.", relationships:["lumine","zhongli","shogun","furina"], contracts:"Wisdom and dreams", artwork:"/images/characters/nahida.png", region:"Sumeru", quest:"Akasha Pulses, the Kalpa Flame Rises" },
  { id:"cyno", name:"Cyno", japanese:"セノ", parts:["1"], role:"General Mahamatra · Akademiya enforcer", color:"#B09CD6", background:"Cyno investigates corruption in Sumeru as General Mahamatra and becomes an essential ally during the Sabzeruz crisis.", powers:"Electro polearm combat and his Hermanubis discipline.", relationships:["lumine","nahida"], contracts:"Sumeru judicial authority", artwork:"/images/characters/cyno.png", region:"Sumeru", quest:"Akasha Pulses, the Kalpa Flame Rises" },
  { id:"furina", name:"Furina", japanese:"フリーナ", parts:["1","2"], role:"Former Hydro Archon · Performer", color:"#60A8D8", background:"Furina performed the role of Fontaine's Archon for centuries to protect a nation, concealing a private sacrifice that defeated the prophecy.", powers:"Hydro performance and indomitable acting.", relationships:["lumine","neuvillette","nahida"], contracts:"The prophecy of Fontaine", artwork:"/images/characters/furina.png", region:"Fontaine", quest:"Masquerade of the Guilty" },
  { id:"neuvillette", name:"Neuvillette", japanese:"ヌヴィレット", parts:["1"], role:"Chief Justice · Hydro Dragon Sovereign", color:"#62BBD2", background:"Fontaine's Iudex administered justice while reclaiming the authority of the Hydro Dragon Sovereign lost during the Archon War.", powers:"Hydro authority and the dragon's sovereign form.", relationships:["furina","lumine"], contracts:"Fontaine's laws", artwork:"/images/characters/neuvillette.png", region:"Fontaine", quest:"Masquerade of the Guilty" },
  { id:"mavuika", name:"Mavuika", japanese:"マーヴィカ", parts:["2"], role:"Pyro Archon · The Burning One", color:"#EE7B35", background:"Natlan's Pyro Archon leads its tribes through the Night Kingdom war, carrying both the Sacred Flame and an ancient promise.", powers:"Pyro authority and the Flamestrider.", relationships:["lumine","shogun","nahida"], contracts:"Natlan's Sacred Flame", artwork:"/images/characters/mavuika.png", region:"Natlan", quest:"Flowers Resplendent on the Sun-Scorched Sojourn" },
  { id:"kinich", name:"Kinich", japanese:"キィニチ", parts:["2"], role:"Saurian Hunter · Huitztlan", color:"#68A866", background:"A pragmatic hunter from Huitztlan who works through contracts and accompanies the Traveler through Natlan's conflicts.", powers:"Dendro combat and Saurian hunting techniques.", relationships:["lumine","mavuika"], contracts:"Huitztlan contracts", artwork:"/images/characters/kinich.png", region:"Natlan", quest:"Flowers Resplendent on the Sun-Scorched Sojourn" },
  { id:"lauma", name:"Lauma", japanese:"ラウマ", parts:["2"], role:"Moonchant emissary · Nod-Krai", color:"#C7D4E4", background:"A Frostmoon Scions leader connected to Nod-Krai's moon and the old factions gathering on Teyvat's northern frontier.", powers:"Dendro lunar ritual magic.", relationships:["lumine","flins","aino"], contracts:"Frostmoon Scions", artwork:"/images/characters/lauma.png", region:"Nod-Krai", quest:"Song of the Welkin Moon" },
  { id:"flins", name:"Flins", japanese:"フリンズ", parts:["2"], role:"Lightkeeper · Nod-Krai", color:"#73A3C3", background:"A Lightkeeper of Nod-Krai who guards the frontier against supernatural dangers in the Song of the Welkin Moon.", powers:"Electro polearm arts and Lightkeeper knowledge.", relationships:["lumine","lauma","aino"], contracts:"Lightkeepers", artwork:"/images/characters/flins.png", region:"Nod-Krai", quest:"Song of the Welkin Moon" },
  { id:"aino", name:"Aino", japanese:"アイノ", parts:["2"], role:"Mechanic · Nod-Krai", color:"#89C4C4", background:"A young mechanic known for practical inventions and a direct view of Nod-Krai's local factions.", powers:"Hydro machinery and engineering.", relationships:["lumine","lauma","flins"], contracts:"Clink-Clank Krumkake Craftshop", artwork:"/images/characters/aino.png", region:"Nod-Krai", quest:"Song of the Welkin Moon" },
  { id:"tartaglia", name:"Tartaglia", japanese:"タルタリヤ", parts:["1","2"], role:"Fatui Harbinger · The Eleventh", color:"#4C91C9", background:"Known as Childe, Tartaglia is a combat-driven Harbinger whose campaigns connect the Fatui to each nation's unresolved crisis.", powers:"Hydro and Foul Legacy melee transformations.", relationships:["lumine","arlecchino"], contracts:"The Fatui", artwork:"/images/characters/tartaglia.png", region:"Snezhnaya", quest:"The Tsaritsa and the Fatui" },
  { id:"arlecchino", name:"Arlecchino", japanese:"アルレッキーノ", parts:["1","2"], role:"Fatui Harbinger · The Knave", color:"#B84D58", background:"The Fourth Harbinger leads the House of the Hearth and pursues the Fatui's larger objectives while raising a family of operatives.", powers:"Pyro scythe combat and Blood-Debt Directive.", relationships:["lumine","tartaglia"], contracts:"The Fatui", artwork:"/images/characters/arlecchino.png", region:"Snezhnaya", quest:"The Tsaritsa and the Fatui" },
  { id:"dainsleif", name:"Dainsleif", japanese:"ダインスレイヴ", parts:["1","2"], role:"Twilight Sword · Khaenri'ah", color:"#5077A8", background:"The surviving Twilight Sword witnessed Khaenri'ah's fall. Dainsleif carries records of Teyvat that reveal the world's hidden history.", powers:"Ancient sword arts and Abyssal knowledge.", relationships:["lumine","aether","paimon"], contracts:"The fate of Khaenri'ah", artwork:"/images/characters/dainsleif.svg", region:"Khaenri'ah", quest:"Requiem of the Echoing Depths" },
  ...regionalCharacters
];
