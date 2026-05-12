"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { IoIosPlayCircle } from "react-icons/io";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./common/Button";
import { BentoTilt } from "./common/BentoTilt";
import VideoPreview from "./common/VideoPreview";
import { bmw5, bmw6, bmw7, bmw9 } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

const MODEL_LINES = ["M4", "COMPETITION"] as const;

const lineClass =
  "uppercase font-black text-3xl sm:text-4xl md:text-6xl lg:text-[7rem] leading-[0.9] tracking-tight";

function HeroModelTitleStack({
  tone,
  scrollSync,
  entranceTargets,
}: {
  tone: "light" | "dark";
  scrollSync: boolean;
  entranceTargets: boolean;
}) {
  const text = tone === "light" ? "text-white" : "text-blue-600";
  const back = tone === "dark" ? "pointer-events-none select-none" : "";
  const z = tone === "light" ? "z-40" : "";
  const passThrough = tone === "light" ? "pointer-events-none" : "";
  return (
    <div
      {...(scrollSync ? { "data-hero-scroll-model": true } : {})}
      className={`absolute top-28 left-5 max-w-[min(92vw,56rem)] sm:left-10 sm:top-32 md:top-36 ${text} ${z} ${back} ${passThrough} will-change-transform`}
    >
      {MODEL_LINES.map((word) => (
        <div key={word} className="overflow-hidden">
          <p
            {...(entranceTargets ? { "data-hero-model-text": true } : {})}
            className={`hero-model-line ${lineClass}`}
          >
            {word}
          </p>
        </div>
      ))}
      <div
        className={`mt-3 h-0.5 w-48 bg-gradient-to-r ${tone === "light" ? "from-white to-transparent" : "from-blue-600 to-transparent"}`}
        aria-hidden
      />
      <p className={`text-sm mt-2 max-w-sm ${tone === "light" ? "text-white/80" : "text-blue-600/80"}`}>
        The most capable M4 ever built — now yours to explore. Precision engineering meets raw power.
      </p>
    </div>
  );
}


const HeroSection = ({
  isParentLoading,
  onLoaded,
}: {
  isParentLoading: boolean;
  onLoaded: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const totalVideos = 4;
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const expandVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const loaderDismissedRef = useRef(false);
  const loadStartTime = useRef(Date.now());

  const dismissLoader = () => {
    if (loaderDismissedRef.current) return;

    const elapsed = Date.now() - loadStartTime.current;
    const minTime = 1500;
    const remaining = Math.max(0, minTime - elapsed);

    setTimeout(() => {
      loaderDismissedRef.current = true;
      onLoaded();
    }, remaining);
  };

  useEffect(() => {
    const maxWaitMs = 15000;
    const t = window.setTimeout(() => dismissLoader(), maxWaitMs);
    return () => window.clearTimeout(t);
  }, []);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power2.inOut",
          onStart: () => {
            void expandVideoRef.current?.play();
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    if (isParentLoading) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(".hero-bar-top", { scaleX: 0, duration: 0.8, ease: "power3.out" }, 0);
    tl.from(".hero-bar-bottom", { scaleX: 0, duration: 0.8, ease: "power3.out" }, 0);

    tl.from("#video-frame .hero-bmw-char", {
      y: 120,
      opacity: 0,
      rotateX: -80,
      stagger: 0.08,
      duration: 0.9,
      ease: "back.out(1.4)",
    }, 0.2);

    tl.from("#video-frame [data-hero-model-text]", {
      x: -60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    }, 0.5);

    tl.from(".hero-cta", { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" }, 0.9);
    tl.from(".hero-scroll-hint", { opacity: 0, y: 10, duration: 0.6 }, 1.5);
  }, { dependencies: [isParentLoading] });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: true,
      },
    });

    tl.fromTo(
      "#video-frame",
      { clipPath: "inset(0% 0% 0% 0% round 0px)" },
      { clipPath: "inset(11% 10% 11% 10% round 24px)", ease: "power1.inOut" },
      0
    );

    tl.to(".top-hero-content", { left: "12%", bottom: "15%", ease: "power1.inOut" }, 0);
    tl.to("[data-hero-scroll-model]", { top: "10%", ease: "power1.inOut" }, 0);
    tl.to(".hero-overlay-gradient", { opacity: 0.85, ease: "power1.inOut" }, 0);
  });

  const getVideoSrc = (index: number) => {
    switch (index) {
      case 1: return bmw9;
      case 2: return bmw7;
      case 3: return bmw6;
      case 4: return bmw5;
      default: return bmw9;
    }
  };

  return (
    <div
      id="hero-section"
      ref={sectionRef}
      className="relative h-screen w-screen overflow-x-hidden"
    >
      <HeroModelTitleStack tone="dark" scrollSync entranceTargets={false} />

      <BentoTilt
        tiltStrength={4}
        hoverScale={0.97}
        className="absolute z-[60] max-md:left-1/2 max-md:right-auto max-md:h-[118px] max-md:w-[min(calc(100vw-2.5rem),240px)] max-md:-translate-x-1/2 max-md:bottom-[1.25rem] md:left-auto md:right-5 md:h-[140px] md:w-[250px] md:translate-x-0 md:bottom-7"
      >
        <div className="group relative size-full">
          <VideoPreview>
            <button
              type="button"
              onClick={handleMiniVdClick}
              className="relative z-[1] block size-full cursor-pointer overflow-hidden text-left outline-none touch-manipulation"
            >
              <video
                ref={previewVideoRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                id="current-video"
                className="pointer-events-none absolute inset-0 size-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2.5 sm:p-3.5">
                <div className="min-w-0 pr-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-white/55 sm:text-[10px] sm:tracking-[0.28em]">
                    Next reel
                  </p>
                  <p className="mt-0.5 truncate text-xs font-bold text-white sm:text-sm">
                    Tap to switch
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.65)] backdrop-blur-sm transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-105 sm:size-10">
                  <IoIosPlayCircle className="text-lg sm:text-xl" aria-hidden />
                </span>
              </div>
            </button>
          </VideoPreview>
        </div>
      </BentoTilt>


      <div
        id="video-frame"
        className="relative z-10 h-screen w-screen overflow-hidden bg-zinc-900 will-change-transform"
      >
        <div className="absolute w-[60vw] h-full left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-black/50 to-transparent" />

        <video
          ref={expandVideoRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          playsInline
          preload="auto"
          id="next-video"
          className="pointer-events-none absolute top-1/2 left-1/2 z-20 size-64 -translate-x-1/2 -translate-y-1/2 invisible overflow-hidden  object-cover object-center shadow-[0_0_0_1px_rgba(59,130,246,0.12),0_24px_80px_-20px_rgba(0,0,0,0.85),0_0_60px_-12px_rgba(41,151,255,0.35)]"
        />

        <video
          src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="pointer-events-none absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={dismissLoader}
          onCanPlayThrough={dismissLoader}
          onError={dismissLoader}
        />

        <HeroModelTitleStack tone="light" scrollSync entranceTargets />

        <div className="md:hidden hero-cta absolute flex flex-col items-center bottom-[8rem] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 max-w-[calc(100vw-2.5rem)] md:max-w-[min(42rem,calc(100vw-18rem))] lg:max-w-[800px]">
          <Button
            id="watch-trailer"
            title="Experience M4"
            leftIcon={<TiLocationArrow className="text-xl mb-[1px]" />}
            variant="primary"
            containerClass="mb-4"
          />
          <p className="text-sm text-white/60 max-w-sm max-md:w-md leading-relaxed max-md:text-center">
            503 hp. Twin-turbo S58. M xDrive. The most capable M4 ever built — now yours to explore.
          </p>
        </div>

        <div className="max-md:hidden top-hero-content hero-cta absolute bottom-5 left-5 z-40 max-w-[calc(100vw-2.5rem)] md:max-w-[min(42rem,calc(100vw-18rem))] lg:max-w-[800px]">
          <Button
            id="watch-trailer"
            title="Experience M4"
            leftIcon={<TiLocationArrow className="text-xl mb-[1px]" />}
            variant="primary"
            containerClass="mb-4"
          />
          <p className="text-sm text-white/60 max-w-sm max-md:w-md leading-relaxed max-md:text-center">
            503 hp. Twin-turbo S58. M xDrive. The most capable M4 ever built — now yours to explore.
          </p>
        </div>

        <div className="hero-scroll-hint absolute bottom-32 right-4 z-40 flex flex-col items-center gap-1 md:bottom-36 md:right-6">
          <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase rotate-90 mb-2">Scroll</span>
          <div className="w-[1px] mt-5 h-10 bg-gradient-to-b from-blue-400/60 to-transparent" />
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
