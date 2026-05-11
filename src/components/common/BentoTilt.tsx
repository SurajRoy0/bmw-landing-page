"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";

type BentoTiltProps = {
  children: ReactNode;
  className?: string;
  /** Degrees — matches FeaturesSection defaults at 5 */
  tiltStrength?: number;
  /** Slight scale while hovered (matches bento look) */
  hoverScale?: number;
};

/**
 * Bento-style 3D tilt without React state on every mousemove (rAF + direct transform).
 */
export function BentoTilt({
  children,
  className = "",
  tiltStrength = 5,
  hoverScale = 0.95,
}: BentoTiltProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const lastRef = useRef({ rx: 0, ry: 0 });
  const finePointerRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const leaveTimerRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      finePointerRef.current = mq.matches && !rm.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
      window.clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const flush = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const { rx, ry } = lastRef.current;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${hoverScale}, ${hoverScale}, ${hoverScale})`;
    rafRef.current = 0;
  }, [hoverScale]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!finePointerRef.current) return;
    const el = rootRef.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    lastRef.current.rx = (relativeY - 0.5) * tiltStrength;
    lastRef.current.ry = (relativeX - 0.5) * -tiltStrength;

    el.style.transition = "none";
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(flush);
    }
  };

  const handleMouseLeave = () => {
    const el = rootRef.current;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    if (!el) return;
    window.clearTimeout(leaveTimerRef.current);
    el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform =
      "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    leaveTimerRef.current = window.setTimeout(() => {
      el.style.transition = "";
    }, 480);
  };

  const handleMouseEnter = () => {
    const el = rootRef.current;
    if (!el || !finePointerRef.current) return;
    el.style.transition = "none";
  };

  return (
    <div
      ref={rootRef}
      className={`pointer-events-auto isolate transform-gpu will-change-transform ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default BentoTilt;
