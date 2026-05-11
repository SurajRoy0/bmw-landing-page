"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { performanceImages } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    icon: "🏆",
    title: "Motor Trend Car of the Year",
    year: "2024",
    desc: "Best Sports Sedan",
  },
  {
    icon: "⭐",
    title: "Top Gear Performance Award",
    year: "2023",
    desc: "Driver's Car of the Year",
  },
  {
    icon: "🎯",
    title: "Road & Track Award",
    year: "2023",
    desc: "Best Driving Machine",
  },
  {
    icon: "🔥",
    title: "Evo Magazine",
    year: "2024",
    desc: "Car of the Year",
  },
];

const timeline = [
  {
    year: "1978",
    title: "The M Legend Begins",
    desc: "BMW M GmbH is founded — motorsport DNA enters the road car.",
  },
  {
    year: "1992",
    title: "M3 Takes the Track",
    desc: "The original M3 dominates touring car racing worldwide.",
  },
  {
    year: "2003",
    title: "M4 Era Launches",
    desc: "The M4 coupe debuts, redefining the sports coupe segment.",
  },
  {
    year: "2021",
    title: "G82 Generation",
    desc: "The controversial kidney grille, 503 hp S58 engine, and M xDrive AWD.",
  },
  {
    year: "2024",
    title: "Competition xDrive",
    desc: "Peak performance meets all-weather capability in the ultimate M4.",
  },
];

const BmwExperience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading
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

      // Award cards
      gsap.fromTo(
        ".award-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".awards-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Timeline items
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

      // Timeline line draw
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

      // Video overlay fade
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
      id="bmw-experience"
      className="relative bg-[#080808] w-screen overflow-hidden"
    >
      {/* ── Hero video band ──────────────────────────────── */}
      <div className="exp-video-wrap relative w-full h-[55vh] sm:h-[70vh] opacity-0 overflow-hidden">
        <video
          src="/videos/bmw/bmw3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay with text */}
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
            Four decades of motorsport heritage distilled into a machine that
            thrills on every road, rain or shine.
          </p>
        </div>
      </div>

      {/* ── Awards ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 py-20 lg:py-28">
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/70 font-semibold mb-3">
            Recognition · Accolades
          </p>
          <h3 className="exp-heading text-white font-black text-3xl sm:text-4xl lg:text-6xl uppercase leading-tight opacity-0">
            Award-Winning
            <br />
            <span className="text-white/30">Excellence</span>
          </h3>
        </div>

        <div className="awards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {awards.map((award, i) => (
            <div
              key={i}
              className="award-card group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:bg-blue-600/5 cursor-default"
            >
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span className="text-3xl mb-4 block">{award.icon}</span>
              <p className="text-[10px] uppercase tracking-widest text-blue-400/60 font-semibold mb-2">
                {award.year}
              </p>
              <h4 className="text-white font-bold text-sm leading-snug mb-1">
                {award.title}
              </h4>
              <p className="text-white/40 text-xs">{award.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Divider ───── */}
        <div className="my-20 lg:my-28 h-px bg-white/[0.06]" />

        {/* ── Timeline + Image ─────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Timeline */}
          <div className="timeline-wrap relative w-full lg:w-1/2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/70 font-semibold mb-3">
              M History
            </p>
            <h3 className="text-white font-black text-3xl sm:text-4xl uppercase leading-tight mb-10">
              A Legacy
              <br />
              <span className="text-white/30">of Speed</span>
            </h3>

            {/* Vertical line */}
            <div className="relative pl-8">
              <div className="timeline-line absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-blue-500/40 to-transparent rounded-full" />

              {timeline.map((item, i) => (
                <div key={i} className="timeline-item relative mb-8 last:mb-0">
                  {/* Dot */}
                  <div className="absolute -left-[35px] top-1 w-3 h-3 rounded-full border-2 border-blue-500 bg-[#080808]" />
                  <span className="text-[10px] text-blue-400/60 uppercase tracking-widest font-semibold">
                    {item.year}
                  </span>
                  <h4 className="text-white font-semibold text-base mt-0.5 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 h-[420px] sm:h-[500px]">
            <div className="col-span-2 relative rounded-2xl overflow-hidden group">
              <Image
                src={performanceImages[4].src}
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
                src={performanceImages[0].src}
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

        {/* ── CTA Banner ────────────────────────────────── */}
        <div className="mt-20 lg:mt-28 relative rounded-3xl overflow-hidden border border-white/[0.07]">
          <div className="relative h-[220px] sm:h-[260px]">
            <video
              src="/videos/bmw/bmw1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12 lg:px-16">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/80 font-semibold mb-3">
                  Configure Yours
                </p>
                <h3 className="text-white font-black text-2xl sm:text-3xl lg:text-5xl uppercase leading-tight mb-5">
                  Your Perfect M4
                  <br />
                  <span className="text-blue-400">Awaits.</span>
                </h3>
                <button
                  id="cta-configure"
                  className="group relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase font-bold tracking-widest px-7 py-3 rounded-xl transition-all duration-300 flex items-center gap-2"
                >
                  <span>Configure Now</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BmwExperience;
