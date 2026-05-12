'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { bmwColors } from "../constants";
import { driverDoorImg, headLightImg, passengerDoorImg, tailLightImg } from "../utils";

/* ─── Small reusable sub-components ─────────────────────────── */


const IconToggle = ({
  id,
  active,
  onClick,
  icon,
  tooltip,
  'aria-label': ariaLabel,
}: {
  id?: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
  'aria-label'?: string;
}) => (
  <button
    id={id}
    type="button"
    onClick={onClick}
    title={tooltip}
    aria-label={ariaLabel ?? tooltip}
    aria-pressed={active}
    className={`
        peer relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 outline-none
        max-md:h-8 max-md:w-8 max-md:rounded-md
        md:h-10 md:w-10 md:rounded-xl
        focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]
        ${active
        ? 'bg-blue-600/15 border-blue-500/50 text-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.12)]'
        : 'bg-white/[0.03] border-white/8 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
      }
      `}
  >
    {icon}
  </button>
);

/** Between tool groups: hairline on one-line mobile, taller rule on large screens */
const GroupRule = () => (
  <>
    <span className="h-6 w-px shrink-0 self-center bg-white/10 md:hidden" aria-hidden />
    <span className="hidden h-7 w-px shrink-0 self-center bg-white/10 lg:block" aria-hidden />
  </>
);

/* ─── Main Model Component ───────────────────────────────────── */

const Model = () => {
  const [zoom, setZoom] = useState(5);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [tailLightsOn, setTailLightsOn] = useState(false);
  const [driverDoorOpen, setDriverDoorOpen] = useState(false);
  const [passengerDoorOpen, setPassengerDoorOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedColor, setSelectedColor] = useState(bmwColors[0]);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  const sectionRef = useRef(null);
  const cameraControlRef = useRef(null);
  const carRef = useRef(new THREE.Group());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEventSource(document.getElementById('root') || document.body);
    }
  }, []);

  useGSAP(() => {
    gsap.to('#model-heading', { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });
    gsap.to('#model-subtext', { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power2.out' });
    gsap.to('#model-canvas-wrap', { opacity: 1, duration: 1.2, delay: 0.1, ease: 'power2.out' });
    gsap.to('#model-controls', { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' });
    gsap.fromTo(
      '.model-stat',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.35, ease: 'power2.out', stagger: 0.08 }
    );
  }, { scope: sectionRef });

  const headerStats = [
    { label: '0–60 mph', value: '3.8', unit: 's' },
    { label: 'Top Speed', value: '180', unit: 'mph' },
    { label: 'Power', value: '503', unit: 'hp' },
    { label: 'Torque', value: '479', unit: 'lb-ft' },
    { label: 'Engine', value: '3.0', unit: 'L Twin-Turbo I6' },
  ];

  const toolbarAssetIcon = (on: boolean) =>
    `pointer-events-none block h-[18px] w-[18px] max-md:h-4 max-md:w-4 object-contain brightness-0 invert transition-opacity ${on ? 'opacity-100' : 'opacity-45'}`;

  const RotateIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );

  return (
    <section className="sm:py-28 py-16 sm:px-10 px-5 bg-black" id="model-section" ref={sectionRef}>
      <div className="max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="min-w-0">
            <p className="text-blue-500/90 text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] mb-3 sm:mb-4">
              ///M Configurator
            </p>
            <h1
              id="model-heading"
              className="text-white lg:text-7xl md:text-5xl text-4xl font-semibold tracking-tight opacity-0 translate-y-16 mb-3 sm:mb-4"
            >
              M4 Competition.
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed mb-4">
              Built on the G82 chassis with a hand-assembled S58 inline-six,
              M xDrive, and an 8-speed M Steptronic—shaped in the wind tunnel,
              tuned on the Nürburgring.
            </p>
            <p
              id="model-subtext"
              className="text-zinc-500 text-[11px] sm:text-xs font-bold uppercase tracking-widest opacity-0 translate-y-8 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                360° Interactive
              </span>
              <span className="text-white/10">|</span>
              <span>Real-time Configurator</span>
              <span className="text-white/10">|</span>
              <span>Live Color &amp; Lights</span>
            </p>
          </div>

          {/* Car Badge */}
          <div className="bg-zinc-900/50 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-white/5 flex items-center gap-3 sm:gap-4 shadow-2xl self-start md:self-auto">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white font-black text-lg italic tracking-tighter">M</span>
            </div>
            <div>
              <p className="text-white text-sm sm:text-base font-bold tracking-tight">G82 M4 COMPETITION</p>
              <p className="text-zinc-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mt-0.5">Performance Configurator</p>
            </div>
          </div>
        </div>

        {/* Performance Stats Strip */}
        <div className="relative mb-8 sm:mb-12 rounded-2xl border border-white/5 bg-gradient-to-r from-zinc-900/60 via-zinc-900/30 to-zinc-900/60 backdrop-blur-xl overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 via-blue-600 to-transparent" aria-hidden />
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-white/5">
            {headerStats.map((stat) => (
              <li
                key={stat.label}
                className="model-stat opacity-0 px-4 sm:px-5 py-4 sm:py-5 flex flex-col gap-1"
              >
                <span className="text-zinc-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
                <span className="text-white font-semibold tracking-tight leading-none flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl tabular-nums">{stat.value}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    {stat.unit}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main layout */}
        <div className="flex flex-col gap-10">

          {/* ── 3-D Canvas ───────────────────────────────────── */}
          <div
            id="model-canvas-wrap"
            className="relative z-0 w-full h-[60vh] md:h-[70vh] opacity-0 overflow-hidden rounded-[2.5rem] bg-[#050505] border border-white/[0.03] shadow-inner"
          >
            <ModelView
              groupRef={carRef}
              controlRef={cameraControlRef}
              zoom={zoom}
              headlightsOn={headlightsOn}
              tailLightsOn={tailLightsOn}
              driverDoorOpen={driverDoorOpen}
              passengerDoorOpen={passengerDoorOpen}
              autoRotate={autoRotate}
              color={selectedColor.hex}
            />

            <Canvas
              className="w-full h-full"
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden', pointerEvents: 'none' }}
              eventSource={eventSource as HTMLElement}
            >
              <View.Port />
            </Canvas>

            {/* Bottom bar hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5 pointer-events-none">
              <span className="text-[10px] text-zinc-400 tracking-[0.3em] font-bold uppercase">Explore in detail</span>
            </div>
          </div>

          {/* ── Control panel (responsive, overflow-visible for tooltips) ───────── */}
          <div
            id="model-controls"
            className="w-fit mx-auto max-w-full overflow-x-auto overflow-y-hidden opacity-0 translate-y-10 bg-zinc-900/40 rounded-2xl border border-white/5 px-2 py-2"
          >
            <div
              className={`
                flex items-center gap-3
              `}
            >
              {/* Colors */}
              <div className="flex items-center gap-3">
                <span className="sr-only">Exterior color</span>
                <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                  Color
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  {bmwColors.map((color) => (
                    <button
                      key={color.label}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      title={`${color.label} — Metallic`}
                      aria-label={`${color.label} — Metallic`}
                      className={`
                          peer relative h-6 w-6 shrink-0 rounded-md transition-all duration-300 outline-none
                          max-md:h-5 max-md:w-5
                          md:h-8 md:w-8 md:rounded-lg
                          focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]
                          ${selectedColor.label === color.label
                          ? 'ring-2 ring-blue-500 ring-offset-1 ring-offset-[#0c0c0c] md:ring-offset-2 md:scale-95'
                          : 'opacity-45 hover:opacity-100 hover:scale-105'
                        }
                        `}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor.label === color.label && (
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <span className="h-0.5 w-0.5 rounded-full bg-white shadow-sm md:h-1 md:w-1" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <GroupRule />

              {/* Focal distance */}
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-600" title="Macro (close)">
                  Macro
                </span>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  title={`Focal distance — ${zoom.toFixed(1)} m`}
                  aria-label={`Focal distance, ${zoom.toFixed(1)} meters`}
                  className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-800 accent-blue-500 hover:accent-blue-400"
                />
                <span className="text-[9px] font-black tabular-nums text-blue-500/90" title={`Focal distance — ${zoom.toFixed(1)} m`}>
                  {zoom.toFixed(1)}m
                </span>
                <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-600" title="Wide (far)">
                  Wide
                </span>
              </div>

              <GroupRule />

              {/* Lights */}
              <div className="flex items-center gap-2">
                <IconToggle
                  id="toggle-bmw-laserlight"
                  active={headlightsOn}
                  onClick={() => setHeadlightsOn((v) => !v)}
                  icon={<Image src={headLightImg} alt="" width={18} height={18} className={toolbarAssetIcon(headlightsOn)} />}
                  tooltip="BMW Laserlight — Adaptive front lighting"
                />
                <IconToggle
                  id="toggle-led-rear-lights"
                  active={tailLightsOn}
                  onClick={() => setTailLightsOn((v) => !v)}
                  icon={<Image src={tailLightImg} alt="" width={18} height={18} className={toolbarAssetIcon(tailLightsOn)} />}
                  tooltip="LED rear lights — OLED performance glow"
                />
              </div>

              <GroupRule />

              {/* Doors & rotate */}
              <div className="flex items-center gap-2">
                <IconToggle
                  active={driverDoorOpen}
                  onClick={() => setDriverDoorOpen((v) => !v)}
                  icon={<Image src={driverDoorImg} alt="" width={18} height={18} className={toolbarAssetIcon(driverDoorOpen)} />}
                  tooltip="Driver door"
                />
                <IconToggle
                  active={passengerDoorOpen}
                  onClick={() => setPassengerDoorOpen((v) => !v)}
                  icon={<Image src={passengerDoorImg} alt="" width={18} height={18} className={toolbarAssetIcon(passengerDoorOpen)} />}
                  tooltip="Passenger door"
                />
                <IconToggle
                  active={autoRotate}
                  onClick={() => setAutoRotate((v) => !v)}
                  icon={<span className={autoRotate ? 'inline-flex animate-spin-slow' : 'inline-flex'}>{RotateIcon}</span>}
                  tooltip={autoRotate ? 'Auto rotation — on' : 'Auto rotation — off'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;