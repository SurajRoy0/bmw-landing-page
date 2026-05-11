"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { performanceImages } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "503", unit: "hp", label: "Peak Power" },
  { value: "3.8", unit: "s", label: "0–60 mph" },
  { value: "180", unit: "mph", label: "Top Speed" },
  { value: "479", unit: "lb·ft", label: "Torque" },
];

const DrivingDynamics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stats count-up on scroll
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Mosaic images staggered reveal
      gsap.fromTo(
        ".mosaic-img",
        { opacity: 0, scale: 0.85, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: mosaicRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Description slide-up
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Horizontal accent line draw
      gsap.fromTo(
        ".accent-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
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
      id="performance"
      className="relative bg-[#0a0a0a] w-screen overflow-hidden py-24 lg:py-36"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10">
        {/* Top label */}
        <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/70 font-semibold mb-6">
          Performance · Engineering · Legacy
        </p>

        {/* Heading */}
        <div className="mb-4">
          <h2
            ref={headingRef}
            className="text-white font-black text-4xl sm:text-5xl lg:text-7xl xl:text-8xl uppercase leading-[0.9] tracking-tight opacity-0"
          >
            Driving
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Dynamics.
            </span>
          </h2>
          {/* Accent line */}
          <div className="accent-line mt-6 h-[2px] w-24 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-12 lg:my-16"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-item group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 lg:p-6 overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:bg-blue-600/5"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
              <div className="flex items-end gap-1 mb-1">
                <span className="text-white font-black text-4xl lg:text-5xl leading-none">
                  {s.value}
                </span>
                <span className="text-blue-400 font-bold text-lg mb-1">
                  {s.unit}
                </span>
              </div>
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Image Mosaic + Description Row */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Mosaic grid */}
          <div
            ref={mosaicRef}
            className="w-full lg:flex-1 grid grid-cols-3 grid-rows-2 gap-3 h-[340px] sm:h-[420px] lg:h-[480px]"
          >
            {/* Large left card */}
            <div className="mosaic-img col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
              <Image
                src={performanceImages[4].src}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                alt="BMW M4 Performance"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-white/60 text-[10px] uppercase tracking-widest font-semibold">
                M4 Competition
              </span>
            </div>

            {/* Top right */}
            <div className="mosaic-img col-span-1 row-span-1 relative rounded-2xl overflow-hidden group">
              <Image
                src={performanceImages[1].src}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                alt="BMW Detail"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Bottom right */}
            <div className="mosaic-img col-span-1 row-span-1 relative rounded-2xl overflow-hidden group">
              <Image
                src={performanceImages[2].src}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                alt="BMW Engine"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Description panel */}
          <div
            ref={descRef}
            className="w-full lg:w-[380px] xl:w-[420px] flex flex-col justify-center opacity-0"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-blue-400/70 font-semibold mb-5">
              Precision Engineering
            </p>
            <p className="text-white/80 text-lg lg:text-xl font-light leading-relaxed mb-6">
              The BMW M4 Competition doesn&apos;t just move — it{" "}
              <span className="text-white font-semibold">commands</span>. With a
              twin-turbocharged inline-six S58 engine producing 503 hp and 479 lb·ft
              of torque, every drive is an event.
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              The M xDrive all-wheel-drive system channels power to all four corners
              with surgical precision, while the adaptive M Suspension keeps you
              glued to every apex — whether on track or open road.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "S58 Engine",
                "M xDrive AWD",
                "Carbon Fiber Roof",
                "Active M Differential",
                "Launch Control",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[11px] rounded-full border border-white/10 text-white/50 bg-white/[0.03] font-medium tracking-wide hover:border-blue-500/40 hover:text-blue-300 transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom extra images strip */}
        <div className="mt-6 grid grid-cols-4 gap-3 h-[120px] sm:h-[140px]">
          {[performanceImages[0], performanceImages[5], performanceImages[6], performanceImages[3]].map(
            (img, i) => (
              <div
                key={i}
                className="mosaic-img relative rounded-xl overflow-hidden group"
              >
                <Image
                  src={img.src}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  alt={`BMW detail ${i}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default DrivingDynamics;