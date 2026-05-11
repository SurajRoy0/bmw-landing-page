"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BsPauseFill, BsPlayFill, BsTelephone } from "react-icons/bs";

import { logo } from "@/utils";

const navItems = [
  { label: "Highlights", href: "#features" },
  { label: "Dynamics", href: "#performance" },
  { label: "Model", href: "#model-section" },
];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement>(null);



  useEffect(() => {
    if (isAudioPlaying) {
      void audioElementRef.current?.play().catch(() => setIsAudioPlaying(false));
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);




  return (
    <nav
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-1.5 md:px-6"
      aria-label="Primary"
    >
      <div
        className="pointer-events-auto relative flex w-full max-w-6xl flex-nowrap items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 px-3 py-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-[transform,box-shadow,background-color,border-color] duration-500 ease-out sm:gap-4 sm:px-4 sm:py-2.5"
      >
        <a
          href="#hero-section"
          className="group/logo relative flex h-10 shrink-0 items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/12 to-blue-500/0 opacity-0 blur-md transition-opacity duration-500 group-hover/logo:opacity-100" />
          <Image
            src={logo}
            alt="BMW"
            width={36}
            height={36}
            className="relative size-9 object-contain drop-shadow-[0_2px_10px_rgba(41,151,255,0.55)] transition-transform duration-300 group-hover/logo:scale-105 sm:size-10"
          />
        </a>

        <div className="flex min-h-10 min-w-0 flex-1 items-center justify-end gap-2 md:justify-between md:gap-4">
          <div className="hidden min-w-0 md:flex md:flex-1 md:justify-center">
            <div className="flex flex-nowrap items-center gap-0.5 lg:gap-1">
              {navItems.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="group/nav relative shrink-0 overflow-hidden rounded-lg px-2.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 outline-none transition-colors duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400/60 lg:px-3 lg:text-[11px] lg:tracking-[0.18em]"
                >
                  <span className="relative z-10">{label}</span>
                  <span
                    className="absolute bottom-1 left-2 right-2 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent transition-transform duration-300 ease-out group-hover/nav:scale-x-100 lg:left-3 lg:right-3"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-nowrap items-center gap-2">
            <button
              type="button"
              className="group/book relative hidden h-10 shrink-0 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] outline-none ring-1 ring-white/10 transition-[transform,box-shadow] duration-300 hover:shadow-[0_0_28px_-8px_rgba(59,130,246,0.35)] hover:ring-blue-500/30 sm:inline-flex"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 ease-out group-hover/book:translate-x-[100%]"
              />
              <BsTelephone className="relative shrink-0 text-sm text-blue-400/90" aria-hidden />
              <span className="relative whitespace-nowrap">Book</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAudioPlaying((p) => !p)}
              aria-pressed={isAudioPlaying}
              aria-label={isAudioPlaying ? "Pause ambient audio" : "Play ambient audio"}
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl outline-none ring-1 transition-[transform,box-shadow,background-color] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isAudioPlaying
                ? "bg-blue-600/90 text-white shadow-[0_0_24px_-6px_rgba(59,130,246,0.55)] ring-blue-400/40"
                : "bg-white/10 text-white ring-white/15 hover:bg-white/[0.14] hover:ring-white/25"
                }`}
            >
              {isAudioPlaying && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-xl bg-blue-400/15 motion-reduce:hidden"
                  aria-hidden
                />
              )}
              {isAudioPlaying ? (
                <BsPauseFill className="relative text-xl" aria-hidden />
              ) : (
                <BsPlayFill className="relative ml-0.5 text-xl" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <audio
          ref={audioElementRef}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          src="/audio/audio.mp3"
          loop
          preload="none"
        />
      </div>
    </nav>
  );
};

export default NavBar;
