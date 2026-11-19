"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, motionQuery } from "./gsap";
import { magneticHover } from "./magnetic";

export function PageMotion({ page, children }: { page: string; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (page === "home") {
      document.documentElement.dataset.headerDark = "0";
      ScrollTrigger.create({
        trigger: ".p1",
        start: "top 50px",
        end: "bottom 50px",
        onToggle: (self) => { document.documentElement.dataset.headerDark = self.isActive ? "1" : "0"; },
      });
    }
    const media = gsap.matchMedia();
    media.add(motionQuery, () => {
      const select = gsap.utils.selector(root);
      let onReveal: (() => void) | undefined;
      select(".rv").forEach((element: HTMLElement) => gsap.fromTo(element,
        { y: 70, opacity: 0, clipPath: "inset(0 0 45% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: element, start: "top 90%", once: true } }));
      if (select(".ph h1").length) {
        const heading = gsap.timeline({ defaults: { ease: "expo.out" } })
          .fromTo(".ph h1", { clipPath: "inset(0 0 100% 0)", y: 35 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: .85, clearProps: "clipPath,transform" })
          .fromTo(".ph h1 span", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: .8, clearProps: "clipPath" }, .1)
          .fromTo(".ph .jp", { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: .65, clearProps: "transform,opacity" }, .15);
        if (select("[data-heading-detail]").length) heading.fromTo("[data-heading-detail]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7, clearProps: "transform,opacity" }, .25);
      }
      const list = select("#cl button,#at button,.tog button");
      if (list.length) gsap.from(list, { x: -50, opacity: 0, stagger: .05, duration: .8, ease: "expo.out", delay: .3, clearProps: "transform,opacity" });
      if (page === "volumes") gsap.from("[data-volume]", { x: 50, opacity: 0, stagger: .025, duration: .75, ease: "expo.out", delay: .3, clearProps: "transform,opacity" });
      if (page === "lore") {
        gsap.fromTo(".lr em", { scale: 0, rotation: -140 }, { scale: 1, rotation: -12, ease: "back.out(1.8)", duration: .9, stagger: .1, scrollTrigger: { trigger: select(".lr")[0], start: "top 80%" } });
        select(".lr>div").forEach((row: HTMLElement) => {
          for (const [selector, x] of [[".a", -12], [".b", 12]] as const) gsap.fromTo(row.querySelector(selector), { xPercent: x }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: row, start: "top 95%", end: "top 50%", scrub: true } });
        });
      }
      if (page === "home") {
        const throughSplash = document.documentElement.dataset.csmReveal !== "1";
        const offset = throughSplash ? .24 : 0;
        gsap.to(".mq-track", { xPercent: -50, duration: 45, ease: "none", repeat: -1 });
        gsap.fromTo(".mq", { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)",
          duration: .85,
          ease: "power4.out",
          scrollTrigger: { trigger: ".mq", start: "top 92%", once: true },
          clearProps: "clipPath",
        });
        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } })
          .fromTo(".hero .sun", { scale: .65, opacity: 0 }, { scale: 1, opacity: 1, duration: .85, clearProps: "opacity" }, 0)
          .fromTo(".hero .t1", { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: .78, clearProps: "transform,opacity" }, offset)
          .fromTo(".hero .t2", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: .78, clearProps: "transform,opacity" }, offset + .08)
          .fromTo(".hero-slash", { clipPath: "inset(0 100% 0 0)", opacity: 0 }, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: .75, clearProps: "clipPath,opacity" }, offset + .22)
          .fromTo(".hero-tagline-main .word span", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: .1, duration: .6, clearProps: "transform,opacity" }, offset + .48)
          .fromTo(".hero-tagline-sub", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .55, clearProps: "transform,opacity" }, offset + .85)
          .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: .45, clearProps: "opacity" }, offset + 1.05);
        if (!throughSplash) intro.timeScale(1.8);
        onReveal = () => intro.play();
        if (document.documentElement.dataset.csmReveal === "1") onReveal();
        else window.addEventListener("csm:reveal", onReveal, { once: true });
        const indicator = select(".hero-scroll")[0];
        if (indicator) ScrollTrigger.create({
          trigger: select(".hero")[0], start: "top top", end: "bottom top",
          onUpdate: (self) => indicator.classList.toggle("is-past", self.progress > .55),
        });
        select(".part,.end").forEach((section: HTMLElement) => {
          const lines = section.querySelectorAll("[data-home-line]");
          const reveal = section.querySelectorAll("[data-home-reveal]");
          const artwork = section.querySelector("[data-home-art]");
          const inner = section.querySelector<HTMLElement>(".part-inner,.end-inner");
          const split = section.classList.contains("p2") ? -24 : 24;

          gsap.set(inner, { y: 32, scale: .985, opacity: 0 });
          gsap.set(lines, {
            y: split,
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          });
          gsap.set(reveal, { y: 22, opacity: 0 });

          const revealTimeline = gsap.timeline({
            paused: true,
            defaults: { ease: "expo.out" },
          });
          revealTimeline
            .to(inner, { y: 0, scale: 1, opacity: 1, duration: .9, clearProps: "transform,opacity" }, 0)
            .to(lines, {
              y: 0,
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              stagger: .09,
              duration: .82,
              clearProps: "transform,opacity,clipPath",
            }, .08)
            .to(reveal, {
              y: 0,
              opacity: 1,
              stagger: .08,
              duration: .72,
              clearProps: "transform,opacity",
            }, .18);
          if (artwork) {
            gsap.set(artwork, {
              y: section.classList.contains("p2") ? 40 : 28,
              x: section.classList.contains("p2") ? 45 : -45,
              opacity: 0,
              clipPath: section.classList.contains("p2") ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
            });
            revealTimeline
              .to(artwork, {
                y: 0,
                x: 0,
                opacity: 1,
                clipPath: "inset(0 0 0 0)",
                duration: 1.15,
                clearProps: "transform,opacity,clipPath",
              }, .12)
              .to(section.querySelectorAll("[data-home-art] figcaption"), {
                y: 0,
                opacity: 1,
                stagger: .1,
                duration: .6,
                clearProps: "transform,opacity",
              }, .58);
          }
          gsap.set(section.querySelectorAll(".btn"), { scale: .94, y: 14, opacity: 0 });
          revealTimeline.to(section.querySelectorAll(".btn"), {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: .68,
            clearProps: "transform,opacity",
          }, .3);
          ScrollTrigger.create({
            trigger: section,
            start: "top 82%",
            end: "bottom 20%",
            once: true,
            toggleActions: "play none none none",
            onEnter: (self) => {
              if (Math.abs(self.getVelocity()) > 1500) revealTimeline.progress(1);
              else revealTimeline.play();
            },
          });
        });
        const endFooter = select(".end-footer")[0];
        if (endFooter) gsap.fromTo(endFooter, { y: 24, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .8,
          ease: "expo.out",
          scrollTrigger: { trigger: endFooter, start: "top 95%", once: true, toggleActions: "play none none none" },
          clearProps: "transform,opacity",
        });
      }
      ScrollTrigger.refresh();
      return () => { if (onReveal) window.removeEventListener("csm:reveal", onReveal); };
    });
    media.add(`${motionQuery} and (hover: hover) and (pointer: fine)`, () => {
      const hero = root.current?.querySelector<HTMLElement>(".hero");
      const buttons = [...root.current?.querySelectorAll<HTMLElement>(".btn") ?? []];
      const cleanup: (() => void)[] = [];
      if (hero) {
        const sun = gsap.quickTo(hero.querySelector(".sun"), "x", { duration: 1, ease: "power3" });
        const artwork = gsap.quickTo(hero.querySelector(".hero-artwork"), "x", { duration: 1.4, ease: "power3" });
        const move = (event: MouseEvent) => { const p = event.clientX / innerWidth - .5; sun(p * -18); artwork(p * 12); };
        hero.addEventListener("mousemove", move);
        cleanup.push(() => hero.removeEventListener("mousemove", move));
      }
      buttons.forEach((button) => cleanup.push(magneticHover(button)));
      return () => cleanup.forEach((fn) => fn());
    });
    media.add(motionQuery + " and (min-width: 761px)", () => {
      if (page !== "home") return;
      const hero = root.current?.querySelector(".hero");
      if (hero) {
        const scrollTrigger = { trigger: hero, start: "top top", end: "bottom top", scrub: .7 };
        gsap.to(".hero .sun", { yPercent: -9, ease: "none", scrollTrigger });
        gsap.to(".hero-artwork", { yPercent: 6, ease: "none", scrollTrigger });
      }
      root.current?.querySelectorAll<HTMLElement>(".part").forEach((section) => {
        const artwork = section.querySelector<HTMLElement>("[data-home-art]");
        if (artwork) gsap.to(artwork, {
          yPercent: section.classList.contains("p2") ? 5 : -5,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
      const endArtwork = root.current?.querySelector<HTMLElement>(".end-artwork");
      if (endArtwork) gsap.to(endArtwork, {
        yPercent: -7,
        ease: "none",
        scrollTrigger: { trigger: ".end", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, { scope: root, dependencies: [page], revertOnUpdate: true });
  return <section ref={root} className="view" id={`v-${page}`}>{children}</section>;
}
