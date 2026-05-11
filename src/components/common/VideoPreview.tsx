"use client";

import type { ReactNode } from "react";

export const VideoPreview = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative size-full p-[2px]">
      {/* Gradient rim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-white/[0.07] to-blue-500/35 opacity-75 transition-opacity duration-300 ease-out motion-reduce:transition-none group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[2px] rounded-[14px] bg-zinc-950/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      />

      {/* No transform hover here — BentoTilt on the parent owns motion for smooth tilt */}
      <div className="relative size-full overflow-hidden rounded-2xl bg-zinc-950/80 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-md transition-[box-shadow] duration-300 ease-out motion-reduce:transition-none group-hover:shadow-[0_28px_90px_-24px_rgba(0,0,0,0.9),0_0_0_1px_rgba(59,130,246,0.22),0_0_40px_-12px_rgba(41,151,255,0.28)]">
        {children}
      </div>
    </div>
  );
};

export default VideoPreview;
