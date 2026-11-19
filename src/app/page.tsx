import { PageMotion } from "@/animations/PageMotion";
import { CharacterArtwork } from "@/components/CharacterArtwork";
import { SagaLink } from "@/components/SagaLink";
import { TransitionLink } from "@/components/TransitionLink";
const tickerText = "SEVEN ELEMENTS ★ ARCHONS ★ ADEPTI ★ CELESTIA ★ ABYSS ★ TEYVAT ★  ".repeat(6);

export default function HomePage() {
  return <PageMotion page="home">
    <section className="hero" id="hero">
      <div className="sun" aria-hidden="true" />
      <h1 className="d"><span className="t1">GENSHIN</span><span className="t2">IMPACT</span></h1>
      <div className="hero-artwork" data-hero-art><CharacterArtwork name="Genshin Impact" src="/images/devils/ronova.png" priority fadeIn immediateFallback sizes="(max-width: 760px) 90vw, 58vw" /></div>
      <div className="hero-slash" aria-hidden="true" />
      <div className="hero-tagline">
        <p className="hero-tagline-main d">
          <span className="word"><span>ELEMENTS.{" "}</span></span>
          <span className="word"><span>ARCHONS.{" "}</span></span>
          <span className="word"><span>DESTINY.</span></span>
        </p>
        <p className="hero-tagline-sub">Every story leaves a mark.</p>
      </div>
      <span className="hero-scroll" aria-hidden="true">SCROLL TO EXPLORE<span /></span>
    </section>

    <div className="mq" aria-hidden="true"><div className="mq-track"><span>{tickerText}</span><span>{tickerText}</span></div></div>

    <section className="part p1">
      <div className="part-inner">
        <figure className="part-artwork" data-home-art>
          <CharacterArtwork name="Lumine" src="/images/characters/lumine.png" fadeIn immediateFallback sizes="(max-width: 760px) 90vw, 38vw" />
          <figcaption>FIG. 01 / LUMINE</figcaption>
        </figure>
        <div className="part-copy">
          <span className="part-kicker" data-home-reveal>01 / THE TRAVELER'S JOURNEY · MONDSTADT TO NATLAN</span>
          <h2 className="d"><span data-home-line>FIND THE</span><span data-home-line>TRUTH</span></h2>
          <p data-home-reveal>Separated by the Unknown God, the twins begin separate journeys through Teyvat to understand Celestia, the Abyss and the civilization beneath the nations.</p>
          <div data-home-reveal><SagaLink part="1" className="btn" href="/arcs">EXPLORE THE JOURNEY <span aria-hidden="true">↗</span></SagaLink></div>
          <span className="part-note" data-home-reveal>DESCENDER / SEVEN ELEMENTS / TEYVAT</span>
        </div>
      </div>
    </section>

    <section className="part p2">
      <div className="part-inner">
        <div className="part-copy">
          <span className="part-kicker" data-home-reveal>02 / LOST HISTORY · KHANRI'AH AND BEYOND</span>
          <h2 className="d"><span data-home-line>THE ABYSS</span><span data-home-line>REMEMBERS</span></h2>
          <p data-home-reveal>Khaenri'ah, the Dragon Sovereigns and the Heavenly Principles connect to a history hidden beneath Teyvat's nations.</p>
          <div data-home-reveal><SagaLink part="2" className="btn" href="/characters">MEET THE FIGURES <span aria-hidden="true">↗</span></SagaLink></div>
          <span className="part-note" data-home-reveal>KHANRI'AH / ABYSS / CELESTIA</span>
        </div>
        <figure className="part-artwork" data-home-art>
          <CharacterArtwork name="Aether" src="/images/characters/arlecchino.png" fadeIn immediateFallback sizes="(max-width: 760px) 90vw, 38vw" />
          <figcaption>FIG. 02 / AETHER</figcaption>
        </figure>
      </div>
    </section>

    <section className="end">
      <div className="end-inner">
        <div className="end-content">
          <span className="end-kicker" data-home-reveal>THE ARCHIVE / EVERY NATION HAS A MEMORY</span>
          <h2 className="d"><span data-home-line>TEYVAT</span><span data-home-line>AWAITS</span></h2>
          <div className="end-copy" data-home-reveal>
            <p>Explore nations, characters, Archons, creatures and the lore that binds Teyvat together.</p>
            <TransitionLink className="btn" href="/characters">ENTER THE ARCHIVE <span aria-hidden="true">↗</span></TransitionLink>
              <small>CHARACTERS · ENTITIES · STORY · NATIONS · LORE</small>
          </div>
        </div>
        <figure className="end-artwork" data-home-art>
          <CharacterArtwork name="Paimon" src="/images/characters/asmoday.jpg" fadeIn immediateFallback sizes="(max-width: 760px) 85vw, 33vw" />
          <figcaption>THE JOURNEY CONTINUES / 00</figcaption>
        </figure>
      </div>
      <div className="end-footer"><span>GENSHIN IMPACT / TEYVAT ARCHIVE</span><span>END OF FILE — BEGIN AGAIN</span></div>
    </section>
  </PageMotion>;
}
