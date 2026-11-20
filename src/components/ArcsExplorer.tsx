"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { arcs } from "@/data/arcs";
import { characters } from "@/data/characters";
import { devils } from "@/data/devils";
import { locations } from "@/data/locations";
import { colorStyle } from "@/lib/archive";
import { usePanelMotion } from "@/animations/usePanelMotion";
import { motionQuery } from "@/animations/gsap";
import { useArchive } from "./ArchiveShell";
import { PageHeading } from "./PageHeading";
import { CharacterLink } from "./CharacterLink";
import { TransitionLink } from "./TransitionLink";
import styles from "./ArcsExplorer.module.css";

const characterAliases: Record<string, string> = {};
const locationAliases: Record<string, string> = {};
const knownLocations = locations.map((location) => location.name);

export function ArcsExplorer() {
  const regions = ["Mondstadt","Liyue","Inazuma","Sumeru","Fontaine","Natlan","Nod-Krai","Snezhnaya"];
  const { arc, setArc, setDevil, setVolume } = useArchive();
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const selected = arcs[arc] ?? arcs[0];
  const part = selected.part;
  const region = selected.volumes;
  const visible = arcs.map((item, index) => ({ item, index })).filter(({ item }) => item.volumes === region);
  const selectRegion = (next: string) => {
    const index = arcs.findIndex((item) => item.volumes === next);
    if (index >= 0) setArc(index);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    const current = visible.findIndex(({ index }) => index === arc);
    const next = event.key === "ArrowRight" ? (current + 1) % visible.length
      : event.key === "ArrowLeft" ? (current - 1 + visible.length) % visible.length
        : event.key === "Home" ? 0 : event.key === "End" ? visible.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    const index = visible[next].index;
    setArc(index);
    const button = rail.current?.querySelector<HTMLButtonElement>(`[data-arc="${index}"]`);
    button?.focus({ preventScroll: true });
    button?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: matchMedia(motionQuery).matches ? "smooth" : "instant" });
  };
  usePanelMotion(root, "arc", arc);

  const mainCharacters = selected.characters.split(", ");
  const keyLocations = selected.locations.split(", ");
  const numbers = selected.volumes.match(/\d+/g)?.map(Number) ?? [];
  const relatedVolumes = numbers.length === 2
    ? Array.from({ length: numbers[1] - numbers[0] + 1 }, (_, index) => numbers[0] + index)
    : numbers.slice(0, 1);
  const devilIndex = devils.findIndex((item) => item.name === selected.antagonist);

  return <>  <PageHeading title="Story" accent="Chapters" japanese="物語">
    <div className={`${styles.parts} page-parts`} data-heading-detail role="group" aria-label="Archon Quest region">
      {regions.map((value) => <button key={value} type="button" aria-pressed={region === value} className={region === value ? styles.activePart : ""} onClick={() => selectRegion(value)}>{value}<span>{arcs.find((item) => item.volumes === value)?.chapters ?? "Regional quest"}</span></button>)}
    </div>
  </PageHeading><div className={styles.explorer} style={colorStyle(selected.color === "#111111" ? "#F0EEE8" : selected.color)}>
    <div className={styles.selectorHead}>
      <span className={styles.eyebrow}>STORY INDEX / {String(arcs.length).padStart(2, "0")} FILES</span>
    </div>
    <div id="at" className={styles.rail} role="tablist" aria-label={`${region} Archon Quest acts`} ref={rail} onKeyDown={onKeyDown}>
      {visible.map(({ item, index }, position) => <button key={item.name} type="button" id={`arc-${index}`} data-arc={index} role="tab" aria-controls="arc-panel" aria-selected={arc === index} tabIndex={arc === index ? 0 : -1} className={arc === index ? styles.activeTab : ""} onClick={() => setArc(index)}>
        <span className={styles.tabNumber}>{String(position + 1).padStart(2, "0")}</span><span className={styles.tabTitle}>{item.name}</span>
      </button>)}
    </div>
    <div id="arc-panel" className={styles.feature} role="tabpanel" aria-labelledby={`arc-${arc}`} ref={root}>
      <div className={styles.featureHead}><span>ARCHON QUEST {String(arc + 1).padStart(2, "0")} / {String(arcs.length).padStart(2, "0")}</span><span>{selected.volumes.toUpperCase()}</span></div>
      <div className={styles.layout}>
        <figure className={styles.artwork} data-arc-art={selected.name}>
          <Image src={selected.artwork ?? "/images/placeholders/artwork.png"} alt={selected.artwork ? `${selected.name} arc artwork` : `${selected.name} arc artwork pending`} fill sizes="(max-width: 760px) 90vw, 48vw" priority loading="eager" className={`${styles.artworkImage} ${selected.artwork ? styles.artworkLoaded : ""}`} />
          <figcaption><span>{String(arc + 1).padStart(2, "0")}</span><small>{selected.artwork ? selected.name.toUpperCase() : "ARC ARTWORK PENDING"}</small></figcaption>
        </figure>
        <div className={styles.story}>
          <span className={styles.kicker} data-arc-copy>ARCHON QUEST / {selected.volumes.toUpperCase()}</span>
          <h2 className={styles.title} data-arc-title>{selected.name}</h2>
          <p className={styles.synopsis} data-arc-copy>{selected.description}</p>
          <a className={styles.source} data-arc-copy href={selected.sourceUrl} target="_blank" rel="noopener noreferrer">OFFICIAL STORY SOURCE <ArrowUpRight size={13} aria-hidden="true" /><span className="sr-only"> (opens in new tab)</span></a>
          <div className={styles.facts} data-arc-copy>
            <div><span>QUEST ACT</span><strong>{selected.chapters}</strong></div>
            <div><span>REGION</span><strong>{selected.volumes}</strong></div>
          </div>
          <div className={styles.related} data-arc-copy>
            <div><h3>MAIN CHARACTERS</h3><p>{mainCharacters.map((name, index) => {
              const id = characterAliases[name] ?? characters.find((item) => item.name === name)?.id;
              return <span key={name}>{index > 0 && <span className={styles.separator}> / </span>}{id ? <CharacterLink id={id}>{name}<ArrowUpRight size={13} aria-hidden="true" /></CharacterLink> : name}</span>;
            })}</p></div>
            <div><h3>KEY THREAT</h3><p>{devilIndex >= 0 ? <TransitionLink href="/classified-files" onClick={() => setDevil(devilIndex)}>{selected.antagonist}<ArrowUpRight size={13} aria-hidden="true" /></TransitionLink> : selected.antagonist}</p></div>
            <div><h3>KEY LOCATIONS</h3><p>{keyLocations.map((name, index) => <span key={name}>{index > 0 && <span className={styles.separator}> / </span>}{knownLocations.includes(locationAliases[name] ?? name) ? <TransitionLink href="/locations">{name}<ArrowUpRight size={13} aria-hidden="true" /></TransitionLink> : name}</span>)}</p></div>
            <div><h3>LORE COMPENDIUM</h3><p><TransitionLink href="/lore">{selected.volumes} · Regional Connections<ArrowUpRight size={13} aria-hidden="true" /></TransitionLink>{" "}<TransitionLink href="/volumes" onClick={() => setVolume(Math.max(1, locations.findIndex((location) => location.name === selected.locations.split(", ")[0]) + 1))}>Nation Chronicle<ArrowUpRight size={13} aria-hidden="true" /></TransitionLink></p></div>
          </div>
        </div>
      </div>
    </div>
  </div></>;
}
