"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { characters } from "@/data/characters";
import { colorStyle } from "@/lib/archive";
import { usePanelMotion } from "@/animations/usePanelMotion";
import { motionQuery } from "@/animations/gsap";
import { useArchive } from "./ArchiveShell";
import { PageHeading } from "./PageHeading";
import { CharacterArtwork } from "./CharacterArtwork";
import styles from "./CharactersExplorer.module.css";

const archonPriority: Record<string, string[]> = {
  Mondstadt: ["venti"],
  Liyue: ["zhongli"],
  Inazuma: ["shogun"],
  Sumeru: ["nahida"],
  Fontaine: ["furina", "neuvillette"],
  Natlan: ["mavuika"],
  "Nod-Krai": ["columbina"],
  Snezhnaya: ["tsaritsa"],
};

function sortByPriority(list: typeof characters, region: string) {
  const priority = archonPriority[region] ?? [];
  return [...list].sort((a, b) => {
    const ai = priority.indexOf(a.id);
    const bi = priority.indexOf(b.id);
    if (ai >= 0 || bi >= 0) {
      if (ai < 0) return 1;
      if (bi < 0) return -1;
      return ai - bi;
    }
    return characters.indexOf(a) - characters.indexOf(b);
  });
}

function firstForRegion(region: string) {
  return sortByPriority(characters.filter((c) => c.region === region), region)[0];
}

export function CharactersExplorer() {
  const { character, selectCharacter, openProfile } = useArchive();
  const regions = ["Mondstadt","Liyue","Inazuma","Sumeru","Fontaine","Natlan","Nod-Krai","Snezhnaya","Khaenri'ah"];
  const [region, setRegion] = useState("Mondstadt");
  // Default to Venti (archon priority first) on initial render
  const [selectedId, setSelectedId] = useState(() => firstForRegion("Mondstadt")?.id ?? character);
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  const visible = sortByPriority(characters.filter((c) => c.region === region), region);

  const selected =
    characters.find((c) => c.id === selectedId && c.region === region)
    ?? firstForRegion(region)
    ?? characters[0];

  const [classification, affiliation] = selected.role.split(" · ");
  usePanelMotion(root, "character", character);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    const current = visible.findIndex((item) => item.id === character);
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? (current + 1) % visible.length
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? (current - 1 + visible.length) % visible.length
          : event.key === "Home" ? 0
          : event.key === "End" ? visible.length - 1
          : null;
    if (next === null) return;
    event.preventDefault();
    const id = visible[next].id;
    setSelectedId(id);
    selectCharacter(id);
    const button = rail.current?.querySelector<HTMLButtonElement>(`[data-character="${id}"]`);
    button?.focus({ preventScroll: true });
    button?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: matchMedia(motionQuery).matches ? "smooth" : "instant" });
  };

  const handleRegionClick = (value: string) => {
    setRegion(value);
    const first = firstForRegion(value);
    if (first) {
      setSelectedId(first.id);
      selectCharacter(first.id);
    }
  };

  return (
    <>
      <PageHeading title="Region" accent="Cast" japanese="人物">
        <div className={`${styles.parts} page-parts`} data-heading-detail role="group" aria-label="Region">
          {regions.map((value) => (
            <button
              key={value}
              type="button"
              className={region === value ? styles.activePart : ""}
              aria-pressed={region === value}
              onClick={() => handleRegionClick(value)}
            >
              {value}
              <small>{characters.find((c) => c.region === value)?.quest ?? "Regional figures"}</small>
            </button>
          ))}
        </div>
      </PageHeading>

      <div className={styles.explorer} style={colorStyle(selected.color === "#111111" ? "#F0EEE8" : selected.color)}>
        <div className={styles.selectorHead}>
          <span>PERSONNEL INDEX / {String(visible.length).padStart(2, "0")} FILES</span>
        </div>
        <div className={styles.layout}>
          <div id="cl" className={styles.selector} ref={rail} role="group" aria-label={`${region} characters`} onKeyDown={onKeyDown}>
            {visible.map((item, index) => (
              <button
                key={item.id}
                type="button"
                data-character={item.id}
                className={selectedId === item.id ? styles.selected : ""}
                aria-pressed={selectedId === item.id}
                onClick={() => { setSelectedId(item.id); selectCharacter(item.id); }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.name}</strong>
                <small>{item.japanese}</small>
              </button>
            ))}
          </div>
          <div id="cst" className={styles.spotlight} ref={root}>
            <div className={styles.spotlightHead}>
              <span>SELECTED FILE / {selected.id.toUpperCase()}</span>
              <span>{selected.region?.toUpperCase()} · {selected.quest}</span>
            </div>
            <div className={styles.spotlightBody}>
              <figure
                className={styles.artwork}
                data-character-art
                data-has-artwork={!!selected.artwork}
                data-artwork-right={selected.id === "kishibe" || undefined}
              >
                <CharacterArtwork
                  key={selected.id}
                  name={selected.name}
                  src={selected.artwork}
                  priority
                  sizes="(max-width: 760px) 90vw, 43vw"
                />
                <figcaption>PORTRAIT / {selected.name.toUpperCase()}</figcaption>
              </figure>
              <div className={styles.copy}>
                <span className={styles.japanese} data-character-copy>{selected.japanese}</span>
                <h3 data-character-title>{selected.name}</h3>
                <dl className={styles.facts} data-character-copy>
                  <div><dt>CLASSIFICATION</dt><dd>{classification}</dd></div>
                  {affiliation && <div><dt>AFFILIATION / IDENTITY</dt><dd>{affiliation}</dd></div>}
                  <div><dt>VISION</dt><dd>{selected.vision ?? "Traveler resonance"}</dd></div>
                </dl>
                <p data-character-copy>{selected.background}</p>
                <button type="button" className={styles.open} onClick={() => openProfile(selected.id)} data-character-copy>
                  OPEN FILE <ArrowUpRight size={19} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
