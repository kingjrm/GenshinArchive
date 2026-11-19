import type { Character } from "../types/archive";

type RegionRoster = readonly [region: string, quest: string, names: readonly string[]];

const roster: readonly RegionRoster[] = [
  ["Mondstadt", "Song of the Dragon and Freedom", ["Albedo","Amber","Barbara","Bennett","Dahlia","Diluc","Diona","Durin","Eula","Fischl","Jean","Kaeya","Klee","Lisa","Lohen","Mika","Mona","Nicole","Noelle","Prune","Razor","Rosaria","Sucrose","Varka","Venti","Lumine","Aether","Paimon"]],
  ["Liyue", "Farewell, the Archaic Lord", ["Baizhu","Beidou","Chongyun","Gaming","Ganyu","Hu Tao","Keqing","Lan Yan","Ningguang","Qiqi","Shenhe","Xiangling","Xianyun","Xiao","Xingqiu","Xinyan","Yanfei","Yaoyao","Yelan","Yun Jin","Zhongli","Zibai"]],
  ["Inazuma", "Omnipresence Over Mortals", ["Arataki Itto","Gorou","Kaedehara Kazuha","Kamisato Ayaka","Kamisato Ayato","Kirara","Kujou Sara","Kuki Shinobu","Raiden Shogun","Sangonomiya Kokomi","Sayu","Shikanoin Heizou","Thoma","Yae Miko","Yoimiya","Yumemizuki Mizuki"]],
  ["Sumeru", "Akasha Pulses, the Kalpa Flame Rises", ["Alhaitham","Candace","Collei","Cyno","Dehya","Dori","Faruzan","Kaveh","Layla","Nahida","Nilou","Sethos","Tighnari","Wanderer"]],
  ["Fontaine", "Masquerade of the Guilty", ["Charlotte","Chevreuse","Chiori","Clorinde","Emilie","Escoffier","Freminet","Furina","Lynette","Lyney","Navia","Neuvillette","Sigewinne","Wriothesley"]],
  ["Natlan", "Flowers Resplendent on the Sun-Scorched Sojourn", ["Chasca","Citlali","Iansan","Ifa","Kachina","Kinich","Mavuika","Mualani","Ororon","Skirk","Varesa","Xilonen"]],
  ["Nod-Krai", "Song of the Welkin Moon", ["Aino","Flins","Ineffa","Jahoda","Lauma","Nefer","Illuga","Linnea","Columbina Hyposelenia"]],
  ["Snezhnaya", "The Tsaritsa and the Fatui", ["Tsaritsa","Danica","Alyosha","Arlecchino","Odette","Sandrone","Tartaglia","Vesna","Vodyanitsa"]],
  ["Khaenri'ah", "Requiem of the Echoing Depths", ["Dainsleif"]]
];

const svgFallbacks = new Set([
  "danica","heizou","jean","kirara","lan-yan","lohen","lynette","lyney","noelle","ororon","yae-miko","yun-jin"
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

const regionLore: Record<string, string> = {
  "Mondstadt": "Mondstadt is the City of Freedom, protected by the ideals of the Anemo Archon Barbatos and watched over from the Knights of Favonius.",
  "Liyue": "Liyue is the nation of contracts, where merchants, Adepti and the Geo Archon have shaped a harbor society founded on mutual obligation.",
  "Inazuma": "Inazuma is the nation of eternity, an archipelago of tradition, resistance and ambition governed by Raiden Ei's pursuit of a changeless future.",
  "Sumeru": "Sumeru is the nation of wisdom, spanning rainforest and desert, where the Akademiya and Lesser Lord Kusanali shape knowledge and dreams.",
  "Fontaine": "Fontaine is the nation of justice, where court trials, performance and prophecy expose the hidden cost of Iudex Neuvillette's rule.",
  "Natlan": "Natlan is the nation of Pyro, organized around tribal nations, the Sacred Flame and the Night Kingdom's long struggle against the Abyss.",
  "Nod-Krai": "Nod-Krai is a contested frontier south of Snezhnaya, where moon-linked factions, the Lightkeepers and the Fatui meet on Teyvat's northern edge.",
  "Snezhnaya": "Snezhnaya is the Cryo nation of the Tsaritsa, where the Fatui advance a national plan opposed to the present divine order.",
  "Khaenri'ah": "Khaenri'ah was a human kingdom destroyed during Teyvat's cataclysm, preserved today through forbidden knowledge, the Abyss and its surviving descendants."
};

const notableProfiles: Record<string, { role: string; biography: string; powers: string }> = {
  "Amber": { role:"Outrider · Knights of Favonius", biography:"The only remaining Outrider of the Knights of Favonius protects Mondstadt with optimism, gliding and sharp field awareness.", powers:"Pyro archery, Baron Bunny and swift reconnaissance." },
  "Albedo": { role:"Chief Alchemist · Kreideprinz", biography:"Albedo studies life, art and Khemia for the Knights of Favonius, while privately tracing the origin of his own artificial existence.", powers:"Geo swordsmanship and Solar Isotoma transmutation." },
  "Diluc": { role:"Dawn Winery · Unofficial Protector", biography:"Diluc returned from the darkness of the Fatui conflict to defend Mondstadt through his own intelligence network and winery wealth.", powers:"Claymore combat with Pyro energy." },
  "Jean": { role:"Acting Grand Master · Knights of Favonius", biography:"Jean carries the daily burden of Mondstadt's governance, missions and protection while balancing diplomacy with her rigorous sense of duty.", powers:"Sword combat and Anemo healing." },
  "Lisa": { role:"Knights Librarian · Witch", biography:"Lisa is a veteran mage who chose the Knights' library over the Akademiya's highest intellectual circles, watching Mondstadt from behind measured calm.", powers:"Electro spellcasting and chained rune attacks." },
  "Klee": { role:"Spark Knight · Knights of Favonius", biography:"Klee's explosive creations repeatedly cause chaos in Mondstadt, but her innocence and ability to protect others keep her close to the Knights.", powers:"Catalyst Pyro bombs and mining magic." },
  "Ganyu": { role:"Qixing Secretary · Half-Qilin Adeptus", biography:"Ganyu serves Liyue's Qixing across centuries, balancing her half-human, half-Adeptus identity with a deep wish to protect ordinary lives.", powers:"Cryo bow combat and adeptal charge attacks." },
  "Hu Tao": { role:"Director · Wangsheng Funeral Parlor", biography:"Hu Tao directs Liyue's funeral affairs with theatrical humor and a serious understanding of remembrance, balance and the boundary of life.", powers:"Polearm combat with Pyro vitality exchange." },
  "Keqing": { role:"Yuheng · Liyue Qixing", biography:"Keqing rejects blind dependence on the gods and leads Liyue through practical reform, decisive action and personal responsibility.", powers:"Electro sword teleportation and rapid slashes." },
  "Raiden Shogun": { role:"Electro Archon · Eternity", biography:"Raiden Ei pursues eternity while a puppet body carries out the Vision Hunt Decree. Her eventual choice to question stillness reshapes Inazuma.", powers:"Electro polearm authority and Musou Isshin." },
  "Yae Miko": { role:"Guuji · Grand Narukami Shrine", biography:"Yae Miko protects Narukami Island through wit, contracts and careful intervention while testing Ei's resolve and the nation of Inazuma.", powers:"Electro catalyst spells and kitsune familiars." },
  "Nahida": { role:"Dendro Archon · Lesser Lord Kusanali", biography:"Nahida governs Sumeru through knowledge and dreams. Limited by confinement and public neglect, she builds influence through empathy and perception.", powers:"Dendro dream entry, sacred cognition and elemental authority." },
  "Furina": { role:"Former Hydro Archon · Performer", biography:"Furina performed divinity for centuries while concealing her private humanity from Fontaine. Her sacrifice was essential to defeating the prophecy.", powers:"Hydro performance, summoning and dramatic control." },
  "Neuvillette": { role:"Iudex · Hydro Dragon Sovereign", biography:"Neuvillette administers Fontaine's justice while recovering the authority lost to the Dragon Sovereigns in Teyvat's ancient history.", powers:"Hydro sovereign attacks and courtroom authority." },
  "Mavuika": { role:"Pyro Archon · Sun Bearer", biography:"Mavuika leads Natlan's tribes through an inherited cycle of conflict, sacrifice and rebirth, carrying the Sacred Flame toward a protected future.", powers:"Pyro authority, Flamestrider combat and tribal coordination." },
  "Columbina Hyposelenia": { role:"Former Fatui Harbinger · Moon-linked figure", biography:"Columbina is known for an enigmatic presence and a mysterious connection to moon and Abyssal forces. Her role in Nod-Krai is tied to the region's wider lunar crisis.", powers:"Moon-related manipulation and elusive supernatural power." },
  "Arlecchino": { role:"Fourth Fatui Harbinger · The Knave", biography:"Arlecchino leads the House of the Hearth and raises its operatives under a strict code. Her goals separate her from the Fatui's conventional cruelty.", powers:"Pyro scythe combat and Blood-Debt Directive." },
  "Tartaglia": { role:"Eleventh Fatui Harbinger · Childe", biography:"Tartaglia is a combat-driven Snezhnayan Harbinger whose Foul Legacy training and desire to fight shape both his enemies and allies.", powers:"Hydro bow and melee transformations." },
  "Lauma": { role:"Frostmoon Scions · Moonchant leader", biography:"Lauma stands among Nod-Krai's moon-linked factions and defends the traditions of the Frostmoon Scions against political and supernatural pressure.", powers:"Dendro lunar ritual combat." },
  "Flins": { role:"Lightkeeper · Nod-Krai", biography:"Flins guards Nod-Krai's northern frontier. His work connects the Lightkeepers' defensive duties with the region's hidden supernatural dangers.", powers:"Electro polearm combat and Lightkeeper authority." },
  "Aino": { role:"Mechanic · Clink-Clank Krumkake", biography:"Aino is a young Nod-Krai inventor whose practical engineering combines with her direct understanding of local craft communities.", powers:"Hydro machinery and mechanical coordination." }
};

function detailedBackground(name: string, region: string, quest: string) {
  const notable = notableProfiles[name];
  if (notable) return `${notable.biography} ${regionLore[region] ?? `${region} is part of Teyvat's playable world.`} The profile is linked to ${quest}.`;
  return `${name} is a playable Teyvat character from ${region}. ${regionLore[region] ?? ""} Their history, combat talents and story appearances are explored through the region's quests and the wider Traveler journey. This archive record is tied to ${quest}.`;
}

const japaneseNames: Record<string, string> = {
  "Albedo":"アルベド","Amber":"アンバー","Barbara":"バーバラ","Bennett":"ベネット","Dahlia":"ダリア","Diluc":"ディルック","Diona":"ディオナ","Durin":"ドゥリン","Eula":"エウルア","Fischl":"フィッシュル","Jean":"ジン","Kaeya":"ガイア","Klee":"クレー","Lisa":"リサ","Lohen":"ローヒェン","Mika":"ミカ","Mona":"モナ","Nicole":"ニコ","Noelle":"ノエル","Prune":"プルーン","Razor":"レザー","Rosaria":"ロサリア","Sucrose":"スクロース","Varka":"ヴァルカ","Venti":"ウェンティ",
  "Baizhu":"白朮","Beidou":"北斗","Chongyun":"重雲","Gaming":"嘉明","Ganyu":"甘雨","Hu Tao":"胡桃","Keqing":"刻晴","Lan Yan":"藍硯","Ningguang":"凝光","Qiqi":"七七","Shenhe":"申鶴","Xiangling":"香菱","Xianyun":"閑雲","Xiao":"魈","Xingqiu":"行秋","Xinyan":"辛炎","Yanfei":"煙緋","Yaoyao":"瑶瑶","Yelan":"夜蘭","Yun Jin":"雲菫","Zhongli":"鍾離","Zibai":"兹白",
  "Arataki Itto":"荒瀧一斗","Gorou":"ゴロー","Kaedehara Kazuha":"楓原万葉","Kamisato Ayaka":"神里綾華","Kamisato Ayato":"神里綾人","Kirara":"綺良々","Kujou Sara":"九条裟羅","Kuki Shinobu":"久岐忍","Raiden Shogun":"雷電将軍","Sangonomiya Kokomi":"珊瑚宮心海","Sayu":"早柚","Shikanoin Heizou":"鹿野院平蔵","Thoma":"トーマ","Yae Miko":"八重神子","Yoimiya":"宵宮","Yumemizuki Mizuki":"夢見月瑞希",
  "Alhaitham":"アルハイゼン","Candace":"キャンディス","Collei":"コレイ","Cyno":"セノ","Dehya":"ディシア","Dori":"ドリー","Faruzan":"ファルザン","Kaveh":"カーヴェ","Layla":"レイラ","Nahida":"ナヒーダ","Nilou":"ニィロウ","Sethos":"セトス","Tighnari":"ティナリ","Wanderer":"放浪者",
  "Charlotte":"シャルロット","Chevreuse":"シュヴルーズ","Chiori":"千織","Clorinde":"クロリンデ","Emilie":"エミリエ","Escoffier":"エスコフィエ","Freminet":"フレミネ","Furina":"フリーナ","Lynette":"リネット","Lyney":"リネ","Navia":"ナヴィア","Neuvillette":"ヌヴィレット","Sigewinne":"シグウィン","Wriothesley":"リオセスリ",
  "Chasca":"チャスカ","Citlali":"シトラリ","Iansan":"イアンサン","Ifa":"イファ","Kachina":"カチーナ","Kinich":"キィニチ","Mavuika":"マーヴィカ","Mualani":"ムアラニ","Ororon":"オロロン","Skirk":"スカーク","Varesa":"ヴァレサ","Xilonen":"シロネン",
  "Aino":"アイノ","Flins":"フリンズ","Ineffa":"イネッファ","Jahoda":"ヤホダ","Lauma":"ラウマ","Nefer":"ネフェル","Illuga":"イルーガ","Linnea":"リンネア",
  "Tsaritsa":"ツァリツァ","Danica":"ダニカ","Alyosha":"アリョーシャ","Arlecchino":"アルレッキーノ","Columbina Hyposelenia":"コロンビーナ","Odette":"オデット","Sandrone":"サンドロネ","Tartaglia":"タルタリヤ","Vesna":"ヴェスナ","Vodyanitsa":"ヴォジャニツァ",
  "Lumine":"蛍","Aether":"空","Paimon":"パイモン","Dainsleif":"ダインスレイヴ"
};

function katakanaFallback(name: string) {
  const map: Record<string, string> = {
    a:"ア",b:"ブ",c:"ク",d:"ド",e:"エ",f:"フ",g:"グ",h:"ハ",i:"イ",j:"ジ",k:"ク",l:"ル",m:"ム",n:"ン",o:"オ",p:"プ",q:"ク",r:"ル",s:"ス",t:"ト",u:"ウ",v:"ヴ",w:"ワ",x:"クス",y:"イ",z:"ズ"," ":" "
  };
  return name.toLowerCase().split("").map((letter) => map[letter] ?? letter).join("").replace(/ /g,"・");
}

const regionalCharacters: Character[] = roster.flatMap(([region, quest, names], regionIndex) =>
  names.map((name): Character | null => {
    const id = slug(name);
    if (["lumine","aether","paimon","venti","zhongli","xiao","shogun","ayaka","nahida","cyno","furina","neuvillette","mavuika","kinich","lauma","flins","aino","tartaglia","arlecchino","dainsleif","columbina"].includes(id)) return null;
    const notable = notableProfiles[name];
    return {
      id,
      name,
      japanese: japaneseNames[name] ?? katakanaFallback(name),
      parts: regionIndex < 6 ? ["1" as const] : ["2" as const],
      role: notable?.role ?? `Playable character · ${region}`,
      color: palette[regionIndex],
      background: detailedBackground(name, region, quest),
      powers: notable?.powers ?? `Combat abilities, elemental skill and burst are defined by ${name}'s official in-game talent records. ${name}'s role in ${region} is reflected in the associated story, local factions and regional exploration records.`,
      relationships: ["lumine", "paimon"].filter((related) => related !== id),
      contracts: region,
      artwork: svgFallbacks.has(id)
        ? `/images/characters/${id}.jpg`
        : `/images/characters/${id}.png`,
      region,
      quest,
    };
  }).filter((item): item is Character => item !== null)
);

export const characters: Character[] = [
  { id:"columbina", name:"Columbina Hyposelenia", japanese:"コロンビーナ", parts:["2"], role:"Former Fatui Harbinger · Moon-linked figure", color:"#B7BDD8", background:"Columbina is known for an enigmatic presence and a mysterious connection to moon and Abyssal forces. Her role in Nod-Krai is tied to the region's wider lunar crisis.", powers:"Moon-related manipulation and elusive supernatural power.", relationships:["lumine","paimon","lauma","flins"], contracts:"Nod-Krai · Moon-linked factions", artwork:"/images/characters/columbina.png", region:"Nod-Krai", quest:"Song of the Welkin Moon" },
  { id:"lumine", name:"Lumine", japanese:"蛍", parts:["1","2"], role:"Traveler · Mondstadt-to-Snezhnaya journey", color:"#E6C77A", background:"A star-traveling Descender separated from her twin at Teyvat's border. Lumine explores every nation, forms alliances and uncovers the rules hiding behind Celestia.", powers:"Elemental resonance, sword combat and regional exploration.", relationships:["aether","paimon","dainsleif","zhongli"], contracts:"Teyvat elemental resonance", artwork:"/images/characters/lumine.png", region:"Mondstadt", quest:"Song of the Dragon and Freedom" },
  { id:"aether", name:"Aether", japanese:"空", parts:["1","2"], role:"Traveler · Mondstadt-to-Snezhnaya journey", color:"#E6C77A", background:"The twin of Lumine and the male Traveler selectable for the journey. Aether investigates Teyvat's wars while following clues about their lost shared path.", powers:"Sword combat and elemental resonance.", relationships:["lumine","paimon","dainsleif"], contracts:"Teyvat elemental resonance", artwork:"/images/characters/aether.png", region:"Mondstadt", quest:"Song of the Dragon and Freedom" },
  { id:"paimon", name:"Paimon", japanese:"パイモン", parts:["1","2"], role:"Guide · Constant companion", color:"#8CC8D8", background:"A floating guide rescued by the Traveler near Starfell Lake. Paimon translates, navigates and appears throughout Teyvat's major questlines.", powers:"Flight, navigation and translation.", relationships:["lumine","aether","dainsleif"], contracts:"Unknown", artwork:"/images/characters/paimon.png", region:"Mondstadt", quest:"Every Archon Quest" },
  { id:"venti", name:"Venti", japanese:"ウェンティ", parts:["1"], role:"Anemo Archon · Barbatos", color:"#56BFAA", background:"The bard of Mondstadt is Barbatos, the god who left its people free to choose their own rulers. He returns in times of danger despite living among mortals.", powers:"Anemo authority and wind manipulation.", relationships:["lumine","zhongli","shogun","nahida"], contracts:"Freedom", artwork:"/images/characters/venti.png", region:"Mondstadt", quest:"Song of the Dragon and Freedom" },
  { id:"zhongli", name:"Zhongli", japanese:"鍾離", parts:["1"], role:"Geo Archon · Consultant", color:"#C9A84C", background:"Rex Lapis founded Liyue and ended his public godhood to test humanity's contracts. He now serves as Wangsheng Funeral Parlor's consultant.", powers:"Geo constructs, petrification and polearm combat.", relationships:["lumine","venti","shogun","nahida"], contracts:"Liyue's contracts", artwork:"/images/characters/zhongli.png", region:"Liyue", quest:"Farewell, the Archaic Lord" },
  { id:"xiao", name:"Xiao", japanese:"魈", parts:["1"], role:"Vigilant Yaksha · Adeptus", color:"#79A86B", background:"The last surviving Vigilant Yaksha of Rex Lapis's five warriors. Xiao defends Liyue while enduring centuries of karmic pain.", powers:"Anemo Yaksha arts and the Bane of All Evil.", relationships:["lumine","zhongli"], contracts:"Protection of Liyue", artwork:"/images/characters/xiao.png", region:"Liyue", quest:"Farewell, the Archaic Lord" },
  { id:"shogun", name:"Raiden Shogun", japanese:"雷電将軍", parts:["1"], role:"Electro Archon · Eternity", color:"#9A78C7", background:"Raiden Ei governs Inazuma in pursuit of eternal stillness. Her puppet enacted the Vision Hunt Decree while Ei reconsidered what eternity should protect.", powers:"Electro authority, Musou Isshin and the Plane of Euthymia.", relationships:["lumine","nahida","furina","mavuika"], contracts:"Eternity and Inazuma", artwork:"/images/characters/raiden.jpg", region:"Inazuma", quest:"Omnipresence Over Mortals" },
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
  { id:"dainsleif", name:"Dainsleif", japanese:"ダインスレイヴ", parts:["1","2"], role:"Twilight Sword · Khaenri'ah", color:"#5077A8", background:"The surviving Twilight Sword witnessed Khaenri'ah's fall. Dainsleif carries records of Teyvat that reveal the world's hidden history.", powers:"Ancient sword arts and Abyssal knowledge.", relationships:["lumine","aether","paimon"], contracts:"The fate of Khaenri'ah", artwork:"/images/characters/dainsleif.jpg", region:"Khaenri'ah", quest:"Requiem of the Echoing Depths" },
  ...regionalCharacters
];
