import { PageMotion } from "@/animations/PageMotion";
import { PageHeading } from "@/components/PageHeading";
import { ProfileButton } from "@/components/CharacterLink";
import { connections } from "@/data/lore";
import { characters } from "@/data/characters";

export const metadata = { title: "Lore & Connections" };

type Section = {
  title: string;
  japanese: string;
  intro: string;
  keys: string[];
};

const sections: Section[] = [
  {
    title: "Archons & the Traveler",
    japanese: "七神と旅人",
    intro:
      "Every Archon quest begins with a meeting — the Traveler steps into a nation's deepest crisis and walks away with a god's trust. These are the foundational bonds that span all of Teyvat.",
    keys: [
      "lumine-aether",
      "lumine-paimon",
      "venti-lumine",
      "zhongli-lumine",
      "shogun-lumine",
      "nahida-lumine",
      "furina-lumine",
      "mavuika-lumine",
      "venti-zhongli",
      "xiao-venti",
    ],
  },
  {
    title: "Khaenri'ah Threads",
    japanese: "カーンルイア",
    intro:
      "Beneath every Archon quest runs a colder thread: the destroyed kingdom of Khaenri'ah, the twin who searches for answers, and the guardian who has waited for five hundred years.",
    keys: ["lumine-dainsleif", "dainsleif-aether"],
  },
  {
    title: "Rex Lapis & Liyue Bonds",
    japanese: "岩王帝君と璃月",
    intro:
      "Three thousand years of contracts, oaths and adeptal service radiate outward from Rex Lapis. The Geo Archon's relationships are measured in centuries, not seasons.",
    keys: [
      "zhongli-xiao",
      "zhongli-ganyu",
      "hutao-zhongli",
      "tartaglia-zhongli",
      "yelan-ningguang",
    ],
  },
  {
    title: "Inazuma Bonds",
    japanese: "稲妻の絆",
    intro:
      "In the nation of Eternity, loyalty and defiance are two edges of the same blade. Every bond formed under the Vision Hunt Decree carries the weight of what it cost.",
    keys: [
      "shogun-yae-miko",
      "shogun-sara",
      "kazuha-shogun",
      "wanderer-shogun",
    ],
  },
  {
    title: "Sumeru Bonds",
    japanese: "スメールの絆",
    intro:
      "Knowledge locked away, an Archon imprisoned in her own sanctuary, and a wanderer choosing a second life. Sumeru's bonds were forged in the shadow of the Akademiya's control.",
    keys: ["nahida-alhaitham", "wanderer-nahida", "tighnari-collei"],
  },
  {
    title: "Fontaine Bonds",
    japanese: "フォンテーヌの絆",
    intro:
      "Five centuries of performance, prophecy and legal theatre — Fontaine's bonds are built on trust concealed and trust finally revealed.",
    keys: [
      "furina-neuvillette",
      "furina-nahida",
      "navia-clorinde",
      "wriothesley-sigewinne",
    ],
  },
  {
    title: "Natlan Bonds",
    japanese: "ナタの絆",
    intro:
      "In the land of the Sacred Flame, bonds are forged in battle, ritual and the promise that the Night Kingdom will not be allowed to swallow the sun.",
    keys: ["mavuika-citlali", "mavuika-kinich"],
  },
  {
    title: "Fatui Hierarchy",
    japanese: "ファデュイの序列",
    intro:
      "The Fatui is not a family — it is a chain of missions, debts and obedience radiating from the Cryo Throne. Every Harbinger is a link in a plan whose full shape the Traveler is still uncovering.",
    keys: [
      "tsaritsa-tartaglia",
      "tsaritsa-arlecchino",
      "arlecchino-lyney",
      "arlecchino-lynette",
      "arlecchino-freminet",
      "tartaglia-arlecchino",
    ],
  },
  {
    title: "Nod-Krai & Moon Threads",
    japanese: "月と夜明け",
    intro:
      "On the frost frontier between Snezhnaya and the moon-touched wilderness of Nod-Krai, old lunar powers and new Harbinger schemes converge into something the archive is still tracing.",
    keys: ["lauma-flins", "lauma-columbina", "columbina-tsaritsa"],
  },
  {
    title: "Regional Allies & Bonds",
    japanese: "各地の絆",
    intro:
      "Not every bond is shaped by an Archon war or a Fatui mission. Some are built in a laboratory, a forest clearing or a haunted valley — and they endure just the same.",
    keys: ["albedo-sucrose", "fischl-razor"],
  },
];

function nameOf(id: string) {
  return characters.find((c) => c.id === id)?.name ?? id;
}

export default function LorePage() {
  const connectionMap = new Map(
    connections.map((conn) => [`${conn.from}-${conn.to}`, conn])
  );

  return (
    <PageMotion page="lore">
      <PageHeading title="Lore &" accent="Links" japanese="伝承">
        <p className="page-intro" data-heading-detail>
          <span>TEYVAT · SEVEN NATIONS · ALL ARCS</span>
          <span>
            Follow the bonds that connect Teyvat&apos;s people, Archons and powers
            — from the Traveler&apos;s first meeting in Mondstadt to the frost frontier
            of Nod-Krai.
          </span>
        </p>
      </PageHeading>

      <div className="lr" id="lr">
        {sections.map((section) => {
          const sectionConnections = section.keys
            .map((key) => connectionMap.get(key))
            .filter((c): c is NonNullable<typeof c> => c !== undefined);

          if (sectionConnections.length === 0) return null;

          return (
            <div key={section.title} className="lore-section">
              <div className="lr-head">
                <span>{section.title}</span>
                <span>{section.japanese}</span>
              </div>

              {sectionConnections.map((conn) => (
                <div
                  className="rv"
                  key={`${conn.from}-${conn.label}-${conn.to}`}
                >
                  <ProfileButton id={conn.from} className="a d">
                    {nameOf(conn.from)}
                  </ProfileButton>
                  <em>{conn.label}</em>
                  <ProfileButton id={conn.to} className="b d">
                    {nameOf(conn.to)}
                  </ProfileButton>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </PageMotion>
  );
}
