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

const featureTags = [
  "S58 Engine",
  "M xDrive AWD",
  "Carbon Fiber Roof",
  "Active M Differential",
  "Launch Control",
];

// const stripImages = [
//   performanceImages[0],
//   performanceImages[5],
//   performanceImages[6],
//   performanceImages[3],
// ];

const DrivingDynamics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        ".perf-eyebrow",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 72,
          rotateX: 12,
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transformPerspective: 1200,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".accent-line",
        { scaleX: 0, transformOrigin: "left center", opacity: 0.4 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.25,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".accent-line-glow",
        { opacity: 0, scaleX: 0, transformOrigin: "left center" },
        {
          opacity: 1,
          scaleX: 1,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".stat-item",
        {
          opacity: 0,
          y: 56,
          scale: 0.9,
          rotateX: 8,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transformPerspective: 1000,
          duration: 0.88,
          ease: "power3.out",
          stagger: { each: 0.12, from: "start" },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".mosaic-cell",
        { opacity: 0, y: 48, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: "power3.out",
          stagger: { each: 0.14, from: "start" },
          scrollTrigger: {
            trigger: mosaicRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".strip-thumb",
        { opacity: 0, y: 36, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: { each: 0.1, from: "center" },
          scrollTrigger: {
            trigger: stripRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, x: 40, y: 24 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".feature-pill",
        { opacity: 0, y: 12, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.4)",
          stagger: 0.06,
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 82%",
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
      className="relative bg-[#080808] w-screen overflow-hidden py-24 lg:py-36"
    >
      {/* Animated mesh + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="absolute -top-1/4 left-1/2 h-[90%] w-[120%] -translate-x-1/2 rounded-full opacity-30 [animation:perf-drift_22s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.12), transparent 55%)",
          }}
        />
        <div className="absolute top-1/3 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.07] blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] translate-x-1/4 translate-y-1/4 rounded-full bg-blue-500/[0.05] blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 [perspective:1400px]">
        <p className="perf-eyebrow text-[10px] uppercase tracking-[0.3em] text-blue-400/70 font-semibold mb-6 opacity-0">
          Performance · Engineering · Legacy
        </p>

        <div className="mb-4">
          <h2
            ref={headingRef}
            className="text-white font-black text-4xl sm:text-5xl lg:text-7xl xl:text-8xl uppercase leading-[0.9] tracking-tight opacity-0 transform-gpu"
          >
            Driving
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-[length:120%_auto]">
              Dynamics.
            </span>
          </h2>
          <div className="relative mt-6 h-[3px] w-32 max-w-[40%]">
            <div className="accent-line-glow absolute inset-0 rounded-full bg-blue-500/40 blur-md" />
            <div className="accent-line relative h-[2px] w-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-transparent" />
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 my-12 lg:my-16 [perspective:1200px]"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-item group relative rounded-2xl p-[1px] transform-gpu transition-shadow duration-500 ease-out hover:shadow-[0_24px_50px_-16px_rgba(37,99,235,0.3)]"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/30 via-blue-600/5 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.06] via-[#0d0d0d] to-[#060606] p-5 lg:p-6 transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-blue-400/35">
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 10% 0%, rgba(59,130,246,0.2), transparent 42%)",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-y-0 -left-3/4 w-2/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[200%] group-hover:opacity-100" />
                </div>
                <div className="absolute left-3 right-3 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/45 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
                <div className="relative z-[1]">
                  <div className="mb-1 flex items-end gap-1 transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                    <span className="text-4xl font-black leading-none text-white tabular-nums lg:text-5xl transition-colors duration-300 group-hover:text-blue-50">
                      {s.value}
                    </span>
                    <span className="mb-1 text-lg font-bold text-blue-400 transition-colors duration-300 group-hover:text-blue-300">
                      {s.unit}
                    </span>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-widest text-white/40 transition-colors duration-300 group-hover:text-white/55">
                    {s.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
          <div
            ref={mosaicRef}
            className="grid h-[340px] w-full grid-cols-3 grid-rows-2 gap-3 sm:h-[420px] lg:h-[480px] lg:flex-1"
          >
            <div className="mosaic-cell group relative col-span-2 row-span-2 overflow-hidden rounded-2xl ring-1 ring-white/[0.06] transition-all duration-500 ease-out hover:ring-blue-400/30">
              <Image
                src={performanceImages[4].src}
                fill
                className="object-cover object-center transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                alt="BMW M4 Performance"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/60" />
              <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent" />
              </div>
              <span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-widest text-white/70 transition-colors duration-300 group-hover:text-blue-200/90">
                M4 Competition
              </span>
            </div>

            <div className="mosaic-cell group relative col-span-1 row-span-1 overflow-hidden rounded-2xl ring-1 ring-white/[0.06] transition-all duration-500 ease-out hover:ring-blue-400/30">
              <Image
                src={performanceImages[1].src}
                fill
                className="object-cover object-center transition-transform duration-[1.1s] ease-out group-hover:scale-[1.08]"
                alt="BMW Detail"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>

            <div className="mosaic-cell group relative col-span-1 row-span-1 overflow-hidden rounded-2xl ring-1 ring-white/[0.06] transition-all duration-500 ease-out hover:ring-blue-400/30">
              <Image
                src={performanceImages[2].src}
                fill
                className="object-cover object-center transition-transform duration-[1.1s] ease-out group-hover:scale-[1.08]"
                alt="BMW Engine"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
          </div>

          <div
            ref={descRef}
            className="flex w-full flex-col justify-center opacity-0 lg:w-[380px] xl:w-[420px]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_32px_64px_-24px_rgba(37,99,235,0.2)]">
              <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-400/75">
                Precision Engineering
              </p>
              <p className="mb-6 text-lg font-light leading-relaxed text-white/85 lg:text-xl">
                The BMW M4 Competition doesn&apos;t just move — it{" "}
                <span className="font-semibold text-white">commands</span>. With a
                twin-turbocharged inline-six S58 engine producing 503 hp and 479
                lb·ft of torque, every drive is an event.
              </p>
              <p className="mb-8 text-sm leading-relaxed text-white/45">
                The M xDrive all-wheel-drive system channels power to all four corners
                with surgical precision, while the adaptive M Suspension keeps you
                glued to every apex — whether on track or open road.
              </p>
              <div className="flex flex-wrap gap-2">
                {featureTags.map((tag) => (
                  <span
                    key={tag}
                    className="feature-pill cursor-default rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/45 hover:text-blue-200 hover:shadow-[0_8px_24px_-12px_rgba(37,99,235,0.35)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* <div
          ref={stripRef}
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4 h-[100px] sm:h-[130px] lg:h-[150px]"
        >
          {stripImages.map((img, i) => (
            <div
              key={i}
              className="strip-thumb group relative overflow-hidden rounded-xl ring-1 ring-white/[0.07] transition-all duration-500 ease-out hover:-translate-y-1 hover:ring-blue-400/35 hover:shadow-[0_20px_40px_-18px_rgba(37,99,235,0.25)]"
            >
              <Image
                src={img.src}
                fill
                className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-110"
                alt={`BMW detail ${i + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default DrivingDynamics;
