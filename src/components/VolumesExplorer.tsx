"use client";

import { useRef, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { volumes } from "@/data/volumes";
import { arcs } from "@/data/arcs";
import { arcsForVolume, colorStyle } from "@/lib/archive";
import { usePanelMotion } from "@/animations/usePanelMotion";
import { motionQuery } from "@/animations/gsap";
import { useArchive } from "./ArchiveShell";
import { TransitionLink } from "./TransitionLink";
import styles from "./VolumesExplorer.module.css";

const NAMES = ["Mondstadt","Liyue","Inazuma","Sumeru","Fontaine","Natlan","Nod-Krai","Snezhnaya","Khaenri'ah"];

export function VolumesExplorer() {
  const { volume, setVolume, setArc } = useArchive();
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const selected = volumes[volume - 1];
  const relatedArcs = arcsForVolume(arcs, selected);
  usePanelMotion(root, "volume", volume);

  const choose = (number: number, fromGallery = false) => {
    if (number < 1 || number > volumes.length) return;
    setVolume(number);
    const container = rail.current;
    const thumb = container?.querySelector<HTMLButtonElement>(`[data-volume="${number}"]`);
    if (container && thumb) container.scrollBy({
      left: thumb.getBoundingClientRect().left - container.getBoundingClientRect().left - (container.clientWidth - thumb.clientWidth) / 2,
      behavior: matchMedia(motionQuery).matches ? "smooth" : "instant",
    });
    if (fromGallery) root.current?.scrollIntoView({ behavior: matchMedia(motionQuery).matches ? "smooth" : "instant", block: "start" });
  };

  const onGalleryKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    const current = Number(event.target.dataset.volume);
    const next = event.key === "ArrowRight" ? Math.min(volumes.length, current + 1)
      : event.key === "ArrowLeft" ? Math.max(1, current - 1)
        : event.key === "Home" ? 1 : event.key === "End" ? volumes.length : null;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    rail.current?.querySelector<HTMLButtonElement>(`[data-volume="${next}"]`)?.focus({ preventScroll: true });
  };

  const isKhaenriah = selected.status === "DESTROYED";

  return (
    <div className={styles.collection}>

      {/* ── Top bar ── */}
      <div className={styles.topbar}>
        <span className={styles.topbarLabel}>NATION DOSSIER</span>
        <span className={styles.topbarCount}>{String(volume).padStart(2,"0")} <b>/ {String(volumes.length).padStart(2,"0")}</b></span>
      </div>

      {/* ── Main dossier panel ── */}
      <div
        className={`${styles.dossier} ${isKhaenriah ? styles.khaenriah : ""}`}
        id="vf"
        ref={root}
        style={{ "--nation-color": selected.color, scrollMarginTop: "80px" } as React.CSSProperties}
      >
        {/* Background accent */}
        <div className={styles.bg} aria-hidden="true">
          <div className={styles.bgStripe} data-feature-cover />
          <div className={styles.bgNum} aria-hidden="true">{String(volume).padStart(2,"0")}</div>
        </div>

        {/* Left column — identifiers */}
        <div className={styles.left}>
          <div className={styles.elementBadge} data-volume-label>
            <span className={styles.elementDot} />
            <span>{selected.element ?? "UNKNOWN"}</span>
          </div>
          <div className={styles.bigNum} aria-hidden="true">{String(volume).padStart(2,"0")}</div>
          <dl className={styles.sidebar}>
            <div data-volume-label>
              <dt>ARCHON</dt>
              <dd>{selected.archon ?? "—"}</dd>
            </div>
            <div data-volume-label>
              <dt>STATUS</dt>
              <dd className={`${styles.status} ${selected.status === "DESTROYED" ? styles.statusDead : selected.status?.includes("ACTIVE") ? styles.statusActive : ""}`}>
                <span className={styles.statusDot} />{selected.status ?? "UNKNOWN"}
              </dd>
            </div>
            <div data-volume-label>
              <dt>PART</dt>
              <dd>{selected.part === "1" ? "I · Original Seven" : "II · Journey of the Absent"}</dd>
            </div>
          </dl>
        </div>

        {/* Right column — main copy */}
        <div className={`${styles.right} volume-copy`}>
          <p className={styles.chapterLabel} data-volume-label>{selected.chapters}</p>
          <h2 className={styles.nationName} aria-live="polite">{NAMES[volume - 1]}</h2>
          <p className={styles.tagline} data-volume-label>
            &ldquo;{selected.tagline}&rdquo;
          </p>
          <p className={styles.summary} data-volume-label>{selected.summary}</p>

          {relatedArcs.length > 0 && (
            <div className={styles.arcs} data-volume-label>
              <span className={styles.arcsLabel}>STORY CHAPTERS</span>
              <div className={styles.arcLinks}>
                {relatedArcs.map((arc) => (
                  <TransitionLink
                    key={arc.name}
                    href="/arcs"
                    className={styles.arcLink}
                    onClick={() => setArc(arcs.indexOf(arc))}
                  >
                    {arc.name}
                  </TransitionLink>
                ))}
              </div>
            </div>
          )}

          <div className={styles.controls}>
            <button disabled={volume === 1} onClick={() => choose(volume - 1)} aria-label="Previous nation">
              <ArrowLeft size={16} aria-hidden="true" /> PREV
            </button>
            <button disabled={volume === volumes.length} onClick={() => choose(volume + 1)} aria-label="Next nation">
              NEXT <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Nation selector rail ── */}
      <div className={styles.railHeader}>
        <h3>ALL NATIONS</h3>
        <span>SELECT TO EXPLORE</span>
      </div>
      <div
        className={styles.rail}
        id="vs"
        ref={rail}
        role="group"
        aria-label="Nation selector"
        onKeyDown={onGalleryKeyDown}
      >
        {volumes.map((item) => (
          <button
            key={item.number}
            className={`${styles.railItem} ${volume === item.number ? styles.railActive : ""}`}
            data-volume={item.number}
            aria-label={NAMES[item.number - 1]}
            aria-pressed={volume === item.number}
            aria-controls="vf"
            onClick={() => choose(item.number, true)}
            style={{ "--item-color": item.color } as React.CSSProperties}
          >
            <span className={styles.railNum}>{String(item.number).padStart(2,"0")}</span>
            <span className={styles.railName}>{NAMES[item.number - 1]}</span>
            <span className={styles.railElement}>{item.element}</span>
            <span className={styles.railBar} />
          </button>
        ))}
      </div>

    </div>
  );
}
