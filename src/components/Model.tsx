'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { bmwColors } from "../constants";

/* ─── Small reusable sub-components ─────────────────────────── */

/* ─── Small reusable sub-components ─────────────────────────── */

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/50 mb-4 select-none">
    {children}
  </p>
);

const ToggleRow = ({ label, sublabel, active, onClick, icon }: { label: string, sublabel: string, active: boolean, onClick: () => void, icon: React.ReactNode }) => (
  <button
    id={`toggle-${label.toLowerCase().replace(/\s/g, '-')}`}
    onClick={onClick}
    className={`
      group w-full flex items-center justify-between px-4 py-3.5 rounded-xl
      border transition-all duration-500 cursor-pointer overflow-hidden relative
      ${active
        ? 'bg-blue-600/10 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
        : 'bg-white/[0.03] border-white/5 hover:border-white/15 hover:bg-white/[0.06]'
      }
    `}
  >
    {active && <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent pointer-events-none" />}
    <span className="flex items-center gap-3.5 z-10">
      <span className={`transition-all duration-500 ${active ? 'text-blue-400 scale-110' : 'text-white/30 group-hover:text-white/50'}`}>
        {icon}
      </span>
      <span className="text-left">
        <span className={`block text-xs font-semibold tracking-wide transition-colors ${active ? 'text-blue-100' : 'text-white/70 group-hover:text-white'}`}>
          {label}
        </span>
        {sublabel && (
          <span className="block text-[9px] text-white/20 mt-0.5 font-medium">{sublabel}</span>
        )}
      </span>
    </span>
    {/* pill toggle indicator */}
    <span className={`relative w-8 h-4 rounded-full transition-all duration-500 flex-shrink-0 ${active ? 'bg-blue-500' : 'bg-white/10'}`}>
      <span className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-500 ${active ? 'left-[17px] bg-white' : 'left-0.5 bg-white/40'}`} />
    </span>
  </button>
);

/* ─── Main Model Component ───────────────────────────────────── */

const Model = () => {
  const [zoom, setZoom] = useState(4.5);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [tailLightsOn, setTailLightsOn] = useState(false);
  const [driverDoorOpen, setDriverDoorOpen] = useState(false);
  const [passengerDoorOpen, setPassengerDoorOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedColor, setSelectedColor] = useState(bmwColors[0]);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

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
  }, []);

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(8, Math.max(2, parseFloat((prev + delta).toFixed(1)))));
  };

  // SVG Icons
  const Icons = {
    Headlights: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1 12.1l.7.7M18.4 5.6l-.7.7M5.6 18.4l-.7.7" /><circle cx="12" cy="12" r="3" /></svg>,
    TailLights: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>,
    Door: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" /><path d="M9 12h.01" /></svg>,
    Rotate: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
  };

  return (
    <section className="sm:py-28 py-16 sm:px-10 px-5 bg-black" id="model-section">
      <div className="max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1
              id="model-heading"
              className="text-white lg:text-7xl md:text-5xl text-4xl font-semibold tracking-tight opacity-0 translate-y-16 mb-4"
            >
              M4 Competition.
            </h1>
            <p
              id="model-subtext"
              className="text-zinc-500 text-sm font-medium opacity-0 translate-y-8 flex items-center gap-4"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                360° INTERACTIVE
              </span>
              <span className="w-[1px] h-3 bg-zinc-800" />
              <span>SCROLL TO ZOOM</span>
            </p>
          </div>

          {/* Car Badge */}
          <div className="bg-zinc-900/50 backdrop-blur-2xl rounded-2xl p-5 border border-white/5 flex items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white font-black text-lg italic tracking-tighter">M</span>
            </div>
            <div>
              <p className="text-white text-base font-bold tracking-tight">G82 M4 COMPETITION</p>
              <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mt-0.5">Performance Configurator</p>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col gap-10">

          {/* ── 3-D Canvas ───────────────────────────────────── */}
          <div
            id="model-canvas-wrap"
            className="w-full h-[60vh] md:h-[70vh] opacity-0 relative overflow-hidden rounded-[2.5rem] bg-[#050505] border border-white/[0.03] shadow-inner"
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
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden' }}
              eventSource={eventSource as HTMLElement}
            >
              <View.Port />
            </Canvas>

            {/* Bottom bar hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5 pointer-events-none">
              <span className="text-[10px] text-zinc-400 tracking-[0.3em] font-bold uppercase">Explore in detail</span>
            </div>
          </div>

          {/* ── Control Panel ────────────────────────── */}
          <div
            id="model-controls"
            className="w-full opacity-0 translate-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* ── Paint Finish ── */}
            <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/5 shadow-xl">
              <SectionLabel>Exterior Color</SectionLabel>
              <div className="grid grid-cols-6 gap-3 mb-5">
                {bmwColors.map((color) => (
                  <button
                    key={color.label}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative w-full aspect-square rounded-xl transition-all duration-500 ${selectedColor.label === color.label ? 'ring-2 ring-blue-500 ring-offset-4 ring-offset-[#080808] scale-95 shadow-2xl' : 'opacity-40 hover:opacity-100 hover:scale-105'
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  >
                    {selectedColor.label === color.label && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-100 text-xs font-bold tracking-wide">{selectedColor.label}</span>
                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Metallic</span>
              </div>
            </div>

            {/* ── Camera & Environment ── */}
            <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/5 flex flex-col gap-6 shadow-xl">
              <div>
                <SectionLabel>Focal Distance</SectionLabel>
                <div className="flex flex-col gap-3">
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Macro</span>
                    <span className="text-[10px] font-black text-blue-500/80 tracking-tighter">{zoom.toFixed(1)}m</span>
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Wide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Lighting Systems ── */}
            <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/5 shadow-xl">
              <SectionLabel>Lighting Systems</SectionLabel>
              <div className="flex flex-col gap-3">
                <ToggleRow
                  label="BMW Laserlight"
                  sublabel="Adaptive Front Lighting"
                  active={headlightsOn}
                  onClick={() => setHeadlightsOn(v => !v)}
                  icon={Icons.Headlights}
                />
                <ToggleRow
                  label="LED Rear Lights"
                  sublabel="OLED Performance Glow"
                  active={tailLightsOn}
                  onClick={() => setTailLightsOn(v => !v)}
                  icon={Icons.TailLights}
                />
              </div>
            </div>

            {/* ── Dynamic Parts ── */}
            <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/5 shadow-xl">
              <SectionLabel>Interactions</SectionLabel>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDriverDoorOpen(v => !v)}
                  className={`py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest flex flex-col items-center gap-3 transition-all duration-500 ${driverDoorOpen ? 'bg-zinc-800 border-white/20 text-white shadow-2xl' : 'bg-white/[0.02] border-white/5 text-zinc-600 hover:border-white/15'
                    }`}
                >
                  <span className={driverDoorOpen ? 'text-blue-400' : 'text-zinc-700'}>{Icons.Door}</span>
                  <span>Driver</span>
                </button>
                <button
                  onClick={() => setPassengerDoorOpen(v => !v)}
                  className={`py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest flex flex-col items-center gap-3 transition-all duration-500 ${passengerDoorOpen ? 'bg-zinc-800 border-white/20 text-white shadow-2xl' : 'bg-white/[0.02] border-white/5 text-zinc-600 hover:border-white/15'
                    }`}
                >
                  <span className={passengerDoorOpen ? 'text-blue-400' : 'text-zinc-700'}>{Icons.Door}</span>
                  <span>Passen.</span>
                </button>
                <button
                  onClick={() => setAutoRotate(v => !v)}
                  className={`col-span-2 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-500 ${autoRotate ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-xl' : 'bg-white/[0.02] border-white/5 text-zinc-600 hover:border-white/15'
                    }`}
                >
                  <span className={autoRotate ? 'animate-spin-slow' : ''}>{Icons.Rotate}</span>
                  <span>{autoRotate ? 'Auto Rotation On' : 'Auto Rotation Off'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;