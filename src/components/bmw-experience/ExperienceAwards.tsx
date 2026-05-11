"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { awards } from "./data";

gsap.registerPlugin(ScrollTrigger);

const ExperienceAwards = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".exp-heading",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".award-card",
        {
          opacity: 0,
          y: 64,
          scale: 0.9,
          rotateX: 10,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transformPerspective: 1000,
          duration: 0.85,
          ease: "power3.out",
          stagger: { each: 0.11, from: "start" },
          scrollTrigger: {
            trigger: ".awards-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="bmw-experience-awards"
      className="relative bg-[#080808] w-screen overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 pt-20">
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/70 font-semibold mb-3">
            Recognition · Accolades
          </p>
          <h3 className="exp-heading text-white font-black text-3xl sm:text-4xl lg:text-6xl uppercase leading-tight mb-5 opacity-0">
            Award-Winning
            <span className="text-white/30"> Excellence</span>
          </h3>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-4">
            Year after year, M cars show up where verdicts are loud: comparison tests,
            design juries, and championships that reward repeatability—not one-lap
            heroics, but the confidence to push hard lap after lap.
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            The highlights below are shorthand for that streak: moments when critics,
            voters, or the clock agreed that precision engineering and motorsport DNA
            still belong in the conversation.
          </p>
        </div>

        <div className="awards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 lg:mt-12 [perspective:1200px]">
          {awards.map((award, i) => (
            <div
              key={i}
              className="award-card group relative rounded-2xl p-[1px] cursor-default transform-gpu transition-shadow duration-500 ease-out hover:shadow-[0_28px_60px_-18px_rgba(37,99,235,0.35)]"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/25 via-blue-600/5 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.07] via-[#0c0c0c] to-[#060606] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-blue-400/30 group-hover:from-white/[0.1]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 0%, rgba(59,130,246,0.15), transparent 45%), radial-gradient(circle at 100% 100%, rgba(59,130,246,0.08), transparent 40%)",
                  }}
                />

                <div className="absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-60 transition-all duration-500 group-hover:via-blue-400/80 group-hover:opacity-100" />

                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-y-0 -left-3/4 w-2/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent translate-x-0 opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[220%] group-hover:opacity-100" />
                </div>

                <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-blue-600/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative z-[1] p-6 sm:p-7">
                  <span className="mb-5 block text-4xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6">
                    {award.icon}
                  </span>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400/70 transition-colors duration-300 group-hover:text-blue-300/90">
                    {award.year}
                  </p>
                  <h4 className="mb-2 text-sm font-bold leading-snug text-white transition-colors duration-300 group-hover:text-blue-50">
                    {award.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/60">
                    {award.desc}
                  </p>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceAwards;
