"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { performanceImages } from "@/utils";
import { timeline } from "./data";

gsap.registerPlugin(ScrollTrigger);

const ExperienceHistory = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".timeline-wrap",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".timeline-wrap",
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
      id="bmw-experience-history"
      className="relative bg-[#080808] w-screen overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="my-20 lg:my-28 h-px bg-white/[0.06]" />

        <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/70 font-semibold mb-3">
          M History
        </p>
        <h3 className="text-white font-black text-3xl sm:text-4xl uppercase leading-tight mb-5">
          A Legacy
          <span className="text-white/30"> of Speed</span>
        </h3>
        <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-4">
          What began as a skunkworks inside BMW Motorsport grew into a badge worn by
          legends: prototypes that conquered Le Mans, touring cars that dominated DTM,
          and road cars engineered with the same uncompromising brief—lap time first,
          everything else second.
        </p>
        <p className="text-white/40 text-sm max-w-2xl leading-relaxed mb-10">
          Below is a condensed arc of that story: the moments when M proved that
          precision chassis tuning, high-revving engines, and motorsport aerodynamics
          belong on the street as much as they do on the grid.
        </p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="timeline-wrap relative w-full lg:w-1/2">
            <div className="relative pl-8">
              <div className="timeline-line absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-blue-500/40 to-transparent rounded-full" />

              {timeline.map((item, i) => (
                <div key={i} className="timeline-item relative mb-8 last:mb-0">
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full border-2 border-blue-500 bg-[#080808]" />
                  <span className="text-[10px] text-blue-400/60 uppercase tracking-widest font-semibold">
                    {item.year}
                  </span>
                  <h4 className="text-white font-semibold text-base mt-0.5 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 h-[420px] sm:h-[500px]">
            <div className="col-span-2 relative rounded-2xl overflow-hidden group">
              <Image
                src={performanceImages[3].src}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                alt="BMW M4 side view"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                  BMW M4 Competition
                </p>
                <p className="text-white/25 text-[10px]">G82 · 2024</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src={performanceImages[5].src}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                alt="BMW front"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src={performanceImages[6].src}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                alt="BMW rear"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceHistory;
