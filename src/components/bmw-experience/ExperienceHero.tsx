"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceHero = () => {
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
        ".exp-video-wrap",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".exp-video-wrap",
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
      id="bmw-experience-hero"
      className="relative bg-[#080808] w-screen overflow-hidden"
    >
      <div className="exp-video-wrap relative w-full h-[55vh] sm:h-[70vh] opacity-0 overflow-hidden">
        <video
          src="/videos/bmw/bmw3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#080808]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[10px] uppercase tracking-[0.35em] text-blue-400/80 font-semibold mb-4">
            The Ultimate Driving Machine
          </p>
          <h2 className="exp-heading text-white font-black text-5xl sm:text-6xl lg:text-8xl uppercase leading-[0.9] tracking-tight opacity-0">
            Born for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
              the Track.
            </span>
          </h2>
          <p className="mt-6 text-white/50 text-sm sm:text-base max-w-xl leading-relaxed">
            Four decades of motorsport heritage distilled into a machine that thrills on
            every road, rain or shine.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceHero;
