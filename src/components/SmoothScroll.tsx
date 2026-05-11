"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global smooth scroll with a slightly heavy, slow feel.
 * Driven on the GSAP ticker so ScrollTrigger (hero pin, etc.) stays in sync.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      // Slightly higher lerp = more responsive
      lerp: 0.12,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    const onGsapTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onGsapTick);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(onGsapTick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }, []);

  return null;
}
