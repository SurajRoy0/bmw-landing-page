'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { bmwColors, lightPresets } from "../constants";

/* ─── Small reusable sub-components ─────────────────────────── */

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/40 mb-3 select-none">
    {children}
  </p>
);

const ToggleRow = ({ label, sublabel, active, onClick, icon }: { label: string, sublabel: string, active: boolean, onClick: () => void, icon: React.ReactNode }) => (
  <button
    id={`toggle-${label.toLowerCase().replace(/\s/g, '-')}`}
    onClick={onClick}
    className={`
      group w-full flex items-center justify-between px-4 py-3 rounded-xl
      border transition-all duration-300 cursor-pointer
      ${active
        ? 'bg-blue-600/15 border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
        : 'bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
      }
    `}
  >
    <span className="flex items-center gap-3">
      <span className={`text-base leading-none transition-colors ${active ? 'text-blue-300' : 'text-white/40 group-hover:text-white/60'}`}>
        {icon}
      </span>
      <span className="text-left">
        <span className={`block text-sm font-medium transition-colors ${active ? 'text-blue-200' : 'text-white/75 group-hover:text-white'}`}>
          {label}
        </span>
        {sublabel && (
          <span className="block text-[10px] text-white/30 mt-0.5">{sublabel}</span>
        )}
      </span>
    </span>
    {/* pill toggle indicator */}
    <span className={`relative w-9 h-5 rounded-full border transition-all duration-300 flex-shrink-0 ${active ? 'bg-blue-500/40 border-blue-400/50' : 'bg-white/8 border-white/15'}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${active ? 'left-[18px] bg-blue-300' : 'left-0.5 bg-white/30'}`} />
    </span>
  </button>
);

/* ─── Main Model Component ───────────────────────────────────── */

const Model = () => {
  const [zoom, setZoom] = useState(4.5);
  const [lightPreset, setLightPreset] = useState('studio');
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

  const zoomPercent = Math.round(((zoom - 2) / 6) * 100);

  return (
    <section className="sm:py-28 py-16 sm:px-10 px-5 bg-[#080808]" id="model-section">
      <div className="max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1
              id="model-heading"
              className="text-white lg:text-6xl md:text-5xl text-3xl font-medium opacity-0 translate-y-16 mb-2"
            >
              Configure the M4.
            </h1>
            <p
              id="model-subtext"
              className="text-white/40 text-sm opacity-0 translate-y-8"
            >
              Drag to rotate &nbsp;·&nbsp; Scroll to explore &nbsp;·&nbsp; Interact with controls below
            </p>
          </div>

          {/* Car Badge (moved to top right/side on desktop) */}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">BMW M4 Competition</p>
              <p className="text-white/35 text-[11px] mt-0.5">503 hp · 3.8s 0–60 mph · xDrive</p>
            </div>
          </div>
        </div>

        {/* Main layout: canvas + controls (CHANGED TO VERTICAL) */}
        <div className="flex flex-col gap-8">

          {/* ── 3-D Canvas ───────────────────────────────────── */}
          <div
            id="model-canvas-wrap"
            className="w-full h-[55vh] md:h-[65vh] opacity-0 relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900/40 to-black/20 border border-white/[0.06]"
          >
            <ModelView
              groupRef={carRef}
              controlRef={cameraControlRef}
              zoom={zoom}
              lightPreset={lightPreset}
              headlightsOn={headlightsOn}
              tailLightsOn={tailLightsOn}
              driverDoorOpen={driverDoorOpen}
              passengerDoorOpen={passengerDoorOpen}
              autoRotate={autoRotate}
              color={selectedColor.hex}
            />

            {/* Canvas renders at fixed overlay — View.Port syncs it */}
            <Canvas
              className="w-full h-full"
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden' }}
              eventSource={eventSource as HTMLElement}
            >
              <View.Port />
            </Canvas>

            {/* Headlight ground-glow overlay */}
            {headlightsOn && (
              <div className="absolute inset-x-0 bottom-0 pointer-events-none flex justify-center gap-16">
                <div className="w-32 h-10 bg-blue-200/5 blur-3xl rounded-full" />
                <div className="w-32 h-10 bg-blue-200/5 blur-3xl rounded-full" />
              </div>
            )}

            {/* Bottom bar hints */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
              <span className="block w-4 h-[2px] bg-white/20 rounded" />
              <span className="text-[10px] text-white/25 tracking-widest uppercase select-none">360° Interactive View</span>
              <span className="block w-4 h-[2px] bg-white/20 rounded" />
            </div>

            {/* Light preset badge */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="text-[10px] tracking-widest uppercase text-white/30 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                Mode: {lightPreset}
              </span>
            </div>
          </div>

          {/* ── Control Panel (BELOW CANVAS) ────────────────────────── */}
          <div
            id="model-controls"
            className="w-full opacity-0 translate-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* ── Paint Finish ── */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08]">
              <SectionLabel>Paint Finish</SectionLabel>
              <div className="grid grid-cols-6 gap-2 mb-4">
                {bmwColors.map((color) => (
                  <button
                    key={color.label}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full aspect-square rounded-full border-2 transition-all duration-300 ${selectedColor.label === color.label ? 'border-blue-500 scale-110 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
              <p className="text-white text-sm font-medium">{selectedColor.label}</p>
              <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1">Metallic Paint</p>
            </div>

            {/* ── Camera & Lighting ── */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] flex flex-col gap-4">
              <div>
                <SectionLabel>Camera Zoom</SectionLabel>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleZoom(0.5)}
                    className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/70 flex items-center justify-center transition-all"
                  >−</button>
                  <div className="flex-1 h-1 bg-white/10 rounded-full relative">
                    <div className="absolute h-full bg-blue-500 rounded-full" style={{ width: `${zoomPercent}%` }} />
                  </div>
                  <button
                    onClick={() => handleZoom(-0.5)}
                    className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/70 flex items-center justify-center transition-all"
                  >+</button>
                </div>
              </div>

              <div>
                <SectionLabel>Environment</SectionLabel>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {lightPresets.map(preset => (
                    <button
                      key={preset.value}
                      onClick={() => setLightPreset(preset.value)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-medium border transition-all whitespace-nowrap ${lightPreset === preset.value ? 'bg-blue-600/20 border-blue-500/50 text-blue-200' : 'bg-white/[0.04] border-white/10 text-white/40'
                        }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Lighting Controls ── */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08]">
              <SectionLabel>Light Systems</SectionLabel>
              <div className="flex flex-col gap-2">
                <ToggleRow
                  label="Headlights"
                  sublabel="BMW Laserlight"
                  active={headlightsOn}
                  onClick={() => setHeadlightsOn(v => !v)}
                  icon="✨"
                />
                <ToggleRow
                  label="Tail Lights"
                  sublabel="LED Technology"
                  active={tailLightsOn}
                  onClick={() => setTailLightsOn(v => !v)}
                  icon="🔴"
                />
              </div>
            </div>

            {/* ── Components ── */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08]">
              <SectionLabel>Interactive</SectionLabel>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDriverDoorOpen(v => !v)}
                  className={`p-2 rounded-xl border text-[11px] font-medium flex flex-col items-center gap-1 transition-all ${driverDoorOpen ? 'bg-white/10 border-white/30 text-white' : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-white/15'
                    }`}
                >
                  <span>🚪</span>
                  <span>Driver Door</span>
                </button>
                <button
                  onClick={() => setPassengerDoorOpen(v => !v)}
                  className={`p-2 rounded-xl border text-[11px] font-medium flex flex-col items-center gap-1 transition-all ${passengerDoorOpen ? 'bg-white/10 border-white/30 text-white' : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-white/15'
                    }`}
                >
                  <span>🚪</span>
                  <span>Passenger</span>
                </button>
                <button
                  onClick={() => setAutoRotate(v => !v)}
                  className={`col-span-2 p-2 rounded-xl border text-[11px] font-medium flex items-center justify-center gap-2 transition-all ${autoRotate ? 'bg-blue-600/20 border-blue-500/40 text-blue-300' : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-white/15'
                    }`}
                >
                  <span>🔄</span>
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