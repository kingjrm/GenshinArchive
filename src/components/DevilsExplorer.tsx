"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ImageOff, Search } from "lucide-react";
import { devils } from "@/data/devils";
import { usePanelMotion } from "@/animations/usePanelMotion";
import type { Devil } from "@/types/archive";
import { useArchive } from "./ArchiveShell";
import { PageHeading } from "./PageHeading";
import styles from "./DevilsExplorer.module.css";

type Category = "all" | Devil["type"] | "shades";
const categories: { value: Category; label: string }[] = [
  { value: "all", label: "ALL FILES" },
  { value: "devil", label: "DRAGONS" },
  { value: "entity", label: "FORCES" },
  { value: "shades", label: "✦ SHADES" },
];

const SHADE_IDS = ["TE-005", "TE-006", "TE-007", "TE-008", "TE-008X"];

const shadeColors: Record<string, string> = {
  "TE-005": "#8b6be8",
  "TE-006": "#c084fc",
  "TE-007": "#60a5fa",
  "TE-008": "#34d399",
  "TE-008X": "#6b7280",
};

const shadeGlyphs: Record<string, string> = {
  "TE-005": "✦",
  "TE-006": "☽",
  "TE-007": "∞",
  "TE-008": "✿",
  "TE-008X": "?",
};

const shadeDetails: Record<string, { domain: string; era: string; status: string; lore: string }> = {
  "TE-005": {
    domain: "All Domains",
    era: "Pre-Archon War",
    status: "UNKNOWN",
    lore: "Before the Seven Archons rose to govern the nations of Teyvat, four ancient entities served the Heavenly Principles as direct agents of cosmic order. The Shades precede every god the Traveler has met — their authority is not granted but fundamental, woven into the structure of reality itself. They are not worshipped. They simply are.",
  },
  "TE-006": {
    domain: "Death · Fate · Mortality",
    era: "Pre-Archon War",
    status: "ACTIVE (PRESUMED)",
    lore: "Ronova governs the threshold between life and death — not as a ferryman but as the lawgiver who set the boundary in the first place. Every curse of immortality in Teyvat traces its authority back to this Shade: Qiqi's conditional undeath, Dainsleif's unending curse, the contracts underlying the Wangsheng Funeral Parlor's cosmology. To bypass death in Teyvat is to operate in Ronova's domain with or without her blessing.",
  },
  "TE-007": {
    domain: "Time · Wind · Memory",
    era: "Pre-Archon War",
    status: "ACTIVE (PRESUMED)",
    lore: "Known in Mondstadt as the Thousand Winds, Istaroth predates Barbatos and may be the reason wind remembers at all. Her domain spans not only the flow of time but the memory embedded within it — which is why ancient events in Mondstadt leave traces in the wind long after they should have faded. References to Istaroth appear in Enkanomiya's light-seal tablets and in the deepest strata of the Chasm, always associated with moments when time bent or broke.",
  },
  "TE-008": {
    domain: "Life · Creation · Breath",
    era: "Pre-Archon War",
    status: "ACTIVE (PRESUMED)",
    lore: "Naberius holds authority over the emergence of living things — the principle that something dead should not become alive, and that something alive cannot be unmade without consequence. Rhinedottir's Khemia, the technique that created Albedo and others from raw alchemy, operates directly within this domain. Whether Rhinedottir worked with Naberius's sanction, against it, or entirely unaware of it is one of the most consequential open questions in Khaenri'ah's historical record.",
  },
  "TE-008X": {
    domain: "[CLASSIFIED]",
    era: "Pre-Archon War",
    status: "UNKNOWN",
    lore: "Every surviving reference to the fourth Shade has been excised, overwritten or otherwise rendered inaccessible. The archive has confirmed its existence only by the negative space it leaves in other records — a name that every document avoids, a domain that no other Shade claims. What it governed, what it now governs, and whether it still acts within Teyvat's reality are questions this archive cannot answer.",
  },
};

function Redaction({ children }: { children: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <button
      className={"red " + (revealed ? "revealed" : "")}
      aria-label={revealed ? "Hide redaction: " + children : "Reveal redacted text"}
      aria-pressed={revealed}
      onClick={() => setRevealed(!revealed)}
    >
      {children}
    </button>
  );
}

function DossierArtwork({ file }: { file: Devil }) {
  const [failed, setFailed] = useState(false);
  const available = !!file.artwork && !failed;
  return (
    <figure className={styles.artwork} data-devil-art>
      {available ? (
        <Image
          src={file.artwork!}
          alt={file.name}
          fill
          sizes="(max-width: 760px) 90vw, (max-width: 1100px) 32vw, 360px"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={styles.artworkFallback} role="img" aria-label={"No image available for " + file.name}>
          <ImageOff size={36} strokeWidth={1.2} aria-hidden="true" />
          <strong>NO IMAGE AVAILABLE</strong>
          <span>
            {file.id} / {file.name.toUpperCase()}
          </span>
        </div>
      )}
      <figcaption>{file.id} / VISUAL RECORD</figcaption>
    </figure>
  );
}

// ── Shades Panel ────────────────────────────────────────────────────────────

function ShadeBand({ file, index, total }: { file: Devil; index: number; total: number }) {
  const color = shadeColors[file.id] ?? "#8b6be8";
  const glyph = shadeGlyphs[file.id] ?? "✦";
  const details = shadeDetails[file.id];
  const [revealed, setRevealed] = useState(false);
  const [artFailed, setArtFailed] = useState(false);
  const isEven = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={[styles.shadeBand, isEven ? styles.shadeBandEven : styles.shadeBandOdd].join(" ")}
      style={{ "--shade-color": color, "--shade-index": index, "--shade-delay": `${index * 0.18}s` } as React.CSSProperties}
    >
      {/* Domain watermark */}
      <div className={styles.shadeDomainWm} aria-hidden="true">
        {details?.domain ?? "UNKNOWN"}
      </div>

      {/* Number stamp */}
      <div className={styles.shadeNumStamp} aria-hidden="true">{num}</div>

      {/* Scan line */}
      <div className={styles.shadeScan} aria-hidden="true" />

      {/* Animated energy border */}
      <div className={styles.shadeEnergyBorder} aria-hidden="true" />

      {/* Orbital rings */}
      <div className={styles.shadeOrbitWrap} aria-hidden="true">
        <div className={styles.shadeOrbit1} />
        <div className={styles.shadeOrbit2} />
        <div className={styles.shadeOrbit3} />
        <div className={styles.shadeOrbitDot} />
      </div>

      {/* Noise overlay */}
      <div className={styles.shadeNoise} aria-hidden="true" />

      {/* Content */}
      <div className={[styles.shadeBandContent, isEven ? styles.shadeBandContentEven : styles.shadeBandContentOdd].join(" ")}>
        {/* LEFT: identity block */}
        <div className={styles.shadeIdentity}>
          <div className={styles.shadeFileTag}>{file.id} · {file.subcategory ?? "ENTITY"}</div>

          {/* Glyph or artwork */}
          <div className={styles.shadeSymbolBlock}>
            {!!file.artwork && !artFailed ? (
              <div className={styles.shadeArtWrap}>
                <Image src={file.artwork!} alt={file.name} fill sizes="260px" onError={() => setArtFailed(true)} style={{ objectFit: "contain" }} />
              </div>
            ) : (
              <div className={styles.shadeSymbolGlyph}>{glyph}</div>
            )}
            <div className={styles.shadeSymbolRing} />
          </div>

          <h3 className={styles.shadeBandName}>{file.name}</h3>
          <div className={styles.shadeBandJp}>{file.japanese}</div>
        </div>

        {/* RIGHT: data block */}
        <div className={styles.shadeData}>
          {/* Top meta strip */}
          <div className={styles.shadeMetaStrip}>
            <div className={styles.shadeMetaItem}>
              <span>DOMAIN</span>
              <strong>{details?.domain ?? "UNKNOWN"}</strong>
            </div>
            <div className={styles.shadeMetaDivider} />
            <div className={styles.shadeMetaItem}>
              <span>ERA</span>
              <strong>{details?.era ?? "UNKNOWN"}</strong>
            </div>
            <div className={styles.shadeMetaDivider} />
            <div className={styles.shadeMetaItem}>
              <span>STATUS</span>
              <strong className={details?.status.startsWith("ACTIVE") ? styles.statusActive : styles.statusUnknown}>
                {details?.status ?? "UNKNOWN"}
              </strong>
            </div>
            <div className={styles.shadeMetaDivider} />
            <div className={styles.shadeMetaItem}>
              <span>RECORD</span>
              <strong>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</strong>
            </div>
          </div>

          {/* Lore text */}
          {details && (
            <p className={styles.shadeBandLore}>{details.lore}</p>
          )}

          {/* Description */}
          <p className={styles.shadeBandDesc}>{file.description}</p>

          {/* Classified block */}
          {file.redacted && (
            <div className={styles.shadeClassified}>
              <div className={styles.shadeClassifiedHeader}>
                <span className={styles.shadeClassifiedDot} />
                <span>EYES ONLY — TAP TO {revealed ? "CONCEAL" : "DECRYPT"}</span>
                <span className={styles.shadeClassifiedDot} />
              </div>
              <button
                className={[styles.shadeClassifiedText, revealed ? styles.shadeClassifiedRevealed : ""].join(" ")}
                onClick={() => setRevealed(!revealed)}
                aria-pressed={revealed}
              >
                {file.redacted}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ShadesPanel() {
  const shades = SHADE_IDS.map((id) => devils.find((d) => d.id === id)).filter(Boolean) as Devil[];

  return (
    <div className={styles.shadesPanel}>
      {/* Deep space starfield background */}
      <div className={styles.starfield} aria-hidden="true">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              left: `${(i * 37.3 + 11) % 100}%`,
              top: `${(i * 61.8 + 7) % 100}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              animationDelay: `${(i * 0.23) % 5}s`,
              animationDuration: `${3 + (i % 4)}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Cinematic header */}
      <header className={styles.shadesHeader}>
        <div className={styles.shadesHeaderBg} aria-hidden="true" />
        <div className={styles.shadesEyebrow}>
          <span className={styles.shadesEyebrowLine} />
          CELESTIA / CLASS ABSOLUTE / EYES ONLY
          <span className={styles.shadesEyebrowLine} />
        </div>
        <h2 className={styles.shadesTitle}>
          <span className={styles.shadesTitleGhost} aria-hidden="true">SHADES</span>
          The Four Shades
        </h2>
        <div className={styles.shadesSubtitle}>四つの影の天理 — Heavenly Principles · Four Agents · Unknown Era</div>
        <p className={styles.shadesIntro}>
          Before the Archon War, before the Seven, before any nation raised a god to its throne — four entities
          governed the fundamental laws of Teyvat on behalf of the Heavenly Principles.
          <em className={styles.shadesIntroEm}> This record is incomplete. It may never be complete.</em>
        </p>
        <div className={styles.shadesHeaderRule}>
          <div className={styles.shadesHeaderRuleLine} />
          <div className={styles.shadesHeaderRuleDiamond}>✦</div>
          <div className={styles.shadesHeaderRuleLine} />
        </div>
      </header>

      {/* Shade bands */}
      <div className={styles.shadesList}>
        {shades.map((shade, i) => (
          <ShadeBand key={shade.id} file={shade} index={i} total={shades.length} />
        ))}
      </div>

      <div className={styles.shadesFootnote}>
        <span>ARCHIVE CLASSIFICATION: ABSOLUTE</span>
        <span>·</span>
        <span>SOURCE VERIFICATION: PARTIAL</span>
        <span>·</span>
        <span>COMPLETENESS: UNCONFIRMED</span>
      </div>
    </div>
  );
}

// ── Main Explorer ────────────────────────────────────────────────────────────

export function DevilsExplorer() {
  const { devil, setDevil } = useArchive();
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const isShades = category === "shades";

  const visible = devils
    .map((file, index) => ({ file, index }))
    .filter(({ file }) => {
      if (isShades) return false;
      return (
        (category === "all" || file.type === category) &&
        (!normalizedQuery ||
          [file.name, file.japanese, file.id].some((value) =>
            value.toLocaleLowerCase().includes(normalizedQuery)
          ))
      );
    });

  const selectedIndex = visible.some(({ index }) => index === devil) ? devil : visible[0]?.index ?? -1;
  const selected = selectedIndex < 0 ? null : devils[selectedIndex];

  useEffect(() => {
    if (!isShades && selectedIndex >= 0 && selectedIndex !== devil) setDevil(selectedIndex);
  }, [devil, isShades, selectedIndex, setDevil]);

  usePanelMotion(root, "devil", isShades ? null : (selected?.id ?? null));

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key) || !visible.length) return;
    event.preventDefault();
    const current = visible.findIndex(({ index }) => index === selectedIndex);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? visible.length - 1
          : Math.max(0, Math.min(visible.length - 1, current + (event.key === "ArrowDown" ? 1 : -1)));
    setDevil(visible[next].index);
    list.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };

  return (
    <>
      <PageHeading title="Classified" accent="Files" japanese="機密">
        <div className="devil-intro-copy" data-heading-detail>
          <span>TEYVAT / RESTRICTED ARCHIVE</span>
          <p>Archon, sovereign and entity dossiers. Threat notes are informal archive ratings. Focus or tap redactions to reveal.</p>
        </div>
      </PageHeading>

      {/* Category tabs — always visible */}
      <div className={styles.tabRow}>
        {categories.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={[styles.tabBtn, category === value ? styles.tabBtnActive : "", value === "shades" ? styles.tabBtnShades : ""].join(" ")}
            aria-pressed={category === value}
            onClick={() => setCategory(value)}
          >
            {label}
            {value !== "shades" && (
              <small>
                {value === "all" ? devils.length : devils.filter((f) => f.type === value).length}
              </small>
            )}
          </button>
        ))}
      </div>

      {isShades ? (
        <ShadesPanel />
      ) : (
        <div className={styles.explorer}>
          <aside className={styles.sidebar} aria-label="Classified file index">
            <div className={styles.sidebarHead}>
              <span>FILE INDEX</span>
              <span>
                {visible.length} / {devils.length}
              </span>
            </div>
            <div className={styles.tabs} aria-label="File category" style={{ display: "none" }}>
              {/* tabs moved to tabRow above */}
            </div>
            <label className={styles.search}>
              <Search size={16} aria-hidden="true" />
              <span className={styles.visuallyHidden}>Search files by name, Japanese name, or ID</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="SEARCH FILES / ID"
              />
            </label>
            <div className={styles.list} ref={list} onKeyDown={onListKeyDown} aria-label="Matching files">
              {visible.map(({ file, index }) => (
                <button
                  key={file.id}
                  type="button"
                  className={index === selectedIndex ? styles.selected : ""}
                  aria-current={index === selectedIndex ? "true" : undefined}
                  onClick={() => setDevil(index)}
                >
                  <b>{file.id}</b>
                  <span>{file.name}</span>
                  <small>{file.type.toUpperCase()}</small>
                </button>
              ))}
              {!visible.length && (
                <p className={styles.noResults}>
                  NO MATCHING FILES
                  <br />
                  <small>TRY ANOTHER NAME OR ID</small>
                </p>
              )}
            </div>
          </aside>
          {selected ? (
            <article className={"fl " + styles.dossier} id="df" ref={root} aria-live="polite" aria-atomic="true">
              <div className="no" data-devil-copy>
                FILE {selected.id} · {selected.type.toUpperCase()}
                {selected.subcategory ? " / " + selected.subcategory.toUpperCase() : ""}
              </div>
              <h3 className="d" data-devil-copy>
                {selected.name}
              </h3>
              <div className="jp j" data-devil-copy>
                {selected.japanese}
              </div>
              <div className={styles.dossierBody}>
                <div className={styles.dossierCopy}>
                  <dl data-devil-copy>
                    <dt>THREAT</dt>
                    <dd>
                      {selected.threat} <small>UNOFFICIAL RATING</small>
                    </dd>
                    <dt>IDENTITY / ASSOCIATION</dt>
                    <dd>{selected.contractor}</dd>
                    <dt>CLASSIFICATION</dt>
                    <dd>
                      {selected.type.toUpperCase()}
                      {selected.subcategory ? " · " + selected.subcategory : ""}
                    </dd>
                  </dl>
                  <p data-devil-copy>
                    {selected.description.split("[redacted]")[0]}
                    {selected.redacted && <Redaction key={selected.id}>{selected.redacted}</Redaction>}
                    {selected.description.split("[redacted]")[1]}
                  </p>
                </div>
                <DossierArtwork key={selected.id} file={selected} />
              </div>
            </article>
          ) : (
            <div className={"fl " + styles.emptyDossier} aria-live="polite">
              <span>NO FILE SELECTED</span>
              <p>Adjust your search or category to view a dossier.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
