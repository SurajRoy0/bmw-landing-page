"use client";

import Image from "next/image";
import { useEffect } from "react";

const Loader = () => {
  // Lock page scroll while the loader is mounted.
  useEffect(() => {
    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = documentElement.style.overflow;
    const prevBodyTouch = body.style.touchAction;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    body.style.touchAction = "none";

    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevHtmlOverflow;
      body.style.touchAction = prevBodyTouch;
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading BMW M4 experience"
      className="bmw-loader-root fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none touch-none"
    >
      {/* Soft radial backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(41,151,255,0.18) 0%, rgba(0,0,0,0) 65%)",
        }}
      />

      {/* Logo + ring */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing glow behind the logo */}
        <span
          aria-hidden
          className="bmw-loader-glow pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 sm:h-52 sm:w-52 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(41,151,255,0.55) 0%, rgba(41,151,255,0) 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Progress ring */}
        <svg
          aria-hidden
          viewBox="0 0 130 130"
          className="absolute h-40 w-40 sm:h-48 sm:w-48"
        >
          <circle
            cx="65"
            cy="65"
            r="60"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1.5"
          />
          <circle
            cx="65"
            cy="65"
            r="60"
            fill="none"
            stroke="#2997FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="bmw-loader-ring"
            pathLength={360}
          />
        </svg>

        {/* Rotating BMW logo */}
        <div className="bmw-loader-spin relative h-28 w-28 sm:h-32 sm:w-32 drop-shadow-[0_0_24px_rgba(41,151,255,0.35)]">
          <Image
            src="/bmw-logo-plain.svg"
            alt="BMW"
            fill
            priority
            sizes="128px"
            className="object-contain invert"
          />
        </div>
      </div>

      {/* Text */}
      <div className="relative mt-10 sm:mt-12 flex flex-col items-center gap-2">
        <p className="text-white text-xs sm:text-sm font-bold uppercase tracking-[0.45em]">
          M4 Competition
        </p>
        <p className="text-zinc-500 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em]">
          Preparing the drive
        </p>

        {/* Animated dots */}
        <div className="mt-3 flex items-center gap-1.5" aria-hidden>
          <span className="h-1 w-1 rounded-full bg-blue-500 animate-pulse [animation-delay:-0.3s]" />
          <span className="h-1 w-1 rounded-full bg-blue-500 animate-pulse [animation-delay:-0.15s]" />
          <span className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
};

export default Loader;
