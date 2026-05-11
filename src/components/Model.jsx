'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { lightPresets } from "../constants";

/* ─── Small reusable sub-components ─────────────────────────── */

const SectionLabel = ({ children }) => (
  <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/40 mb-3 select-none">
    {children}
  </p>
);

const ToggleRow = ({ label, sublabel, active, onClick, icon }) => (
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
  const [driverDoorOpen, setDriverDoorOpen] = useState(false);
  const [passengerDoorOpen, setPassengerDoorOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [eventSource, setEventSource] = useState(null);

  const cameraControlRef = useRef();
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
    gsap.to('#model-controls', { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' });
  }, []);

  const handleZoom = (delta) => {
    setZoom(prev => Math.min(8, Math.max(2, parseFloat((prev + delta).toFixed(1)))));
  };

  const zoomPercent = Math.round(((zoom - 2) / 6) * 100);

  return (
    <section className="sm:py-28 py-16 sm:px-10 px-5 bg-[#080808]" id="model-section">
      <div className="max-w-[1440px] mx-auto">

        {/* Heading */}
        <h1
          id="model-heading"
          className="text-white lg:text-6xl md:text-5xl text-3xl font-medium opacity-0 translate-y-16 mb-2"
        >
          Configure the M4.
        </h1>
        <p
          id="model-subtext"
          className="text-white/40 text-sm mb-10 opacity-0 translate-y-8"
        >
          Drag to rotate &nbsp;·&nbsp; Scroll to explore &nbsp;·&nbsp; Interact with controls below
        </p>

        {/* Main layout: canvas + controls */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* ── 3-D Canvas ───────────────────────────────────── */}
          <div
            id="model-canvas-wrap"
            className="w-full lg:flex-1 h-[55vh] md:h-[70vh] opacity-0 relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.06]"
          >
            <ModelView
              groupRef={carRef}
              controlRef={cameraControlRef}
              zoom={zoom}
              lightPreset={lightPreset}
              headlightsOn={headlightsOn}
              driverDoorOpen={driverDoorOpen}
              passengerDoorOpen={passengerDoorOpen}
              autoRotate={autoRotate}
            />

            {/* Canvas renders at fixed overlay — View.Port syncs it */}
            <Canvas
              className="w-full h-full"
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden' }}
              eventSource={eventSource}
            >
              <View.Port />
            </Canvas>

            {/* Headlight ground-glow overlay */}
            {headlightsOn && (
              <div className="absolute inset-x-0 bottom-0 pointer-events-none flex justify-center gap-16">
                <div className="w-32 h-10 bg-yellow-200/10 blur-2xl rounded-full" />
                <div className="w-32 h-10 bg-yellow-200/10 blur-2xl rounded-full" />
              </div>
            )}

            {/* Bottom bar hints */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
              <span className="block w-4 h-[2px] bg-white/20 rounded" />
              <span className="text-[10px] text-white/25 tracking-widest uppercase select-none">Drag to rotate</span>
              <span className="block w-4 h-[2px] bg-white/20 rounded" />
            </div>

            {/* Light preset badge */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="text-[10px] tracking-widest uppercase text-white/30 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                {lightPreset}
              </span>
            </div>
          </div>

          {/* ── Control Panel ────────────────────────────────── */}
          <div
            id="model-controls"
            className="w-full lg:w-72 xl:w-80 opacity-0 translate-x-8 flex flex-col gap-4"
          >

            {/* ── Zoom ── */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08]">
              <SectionLabel>Camera Zoom</SectionLabel>
              <div className="flex items-center gap-3 mb-3">
                <button
                  id="zoom-out-btn"
                  onClick={() => handleZoom(0.5)}
                  aria-label="Zoom out"
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/70 text-xl font-light flex items-center justify-center transition-all active:scale-90 flex-shrink-0"
                >
                  −
                </button>
                <div className="flex-1 relative">
                  <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-150"
                      style={{ width: `${zoomPercent}%` }}
                    />
                  </div>
                  <input
                    id="zoom-slider"
                    type="range"
                    min={2}
                    max={8}
                    step={0.1}
                    value={zoom}
                    onChange={e => setZoom(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    aria-label="Zoom level"
                  />
                </div>
                <button
                  id="zoom-in-btn"
                  onClick={() => handleZoom(-0.5)}
                  aria-label="Zoom in"
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/70 text-xl font-light flex items-center justify-center transition-all active:scale-90 flex-shrink-0"
                >
                  +
                </button>
              </div>
              <div className="flex justify-between text-[10px] text-white/25">
                <span>Wide</span>
                <span className="text-white/40 font-mono">{zoom.toFixed(1)}×</span>
                <span>Close</span>
              </div>
            </div>

            {/* ── Lighting ── */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08]">
              <SectionLabel>Lighting</SectionLabel>
              <div className="grid grid-cols-2 gap-2">
                {lightPresets.map(preset => {
                  const icons = { studio: '💡', showroom: '🏢', night: '🌙', outdoor: '☀️' };
                  const active = lightPreset === preset.value;
                  return (
                    <button
                      key={preset.value}
                      id={`light-preset-${preset.value}`}
                      onClick={() => setLightPreset(preset.value)}
                      className={`
                        flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium
                        transition-all duration-300 cursor-pointer
                        ${active
                          ? 'bg-blue-600/20 border-blue-500/50 text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                          : 'bg-white/[0.04] border-white/10 text-white/50 hover:border-white/20 hover:text-white/80'
                        }
                      `}
                    >
                      <span className="text-lg leading-none">{icons[preset.value]}</span>
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Animation Controls ── */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08]">
              <SectionLabel>Animations</SectionLabel>
              <div className="flex flex-col gap-2">
                <ToggleRow
                  label="Headlights"
                  sublabel={headlightsOn ? 'On — illuminating scene' : 'Off'}
                  active={headlightsOn}
                  onClick={() => setHeadlightsOn(v => !v)}
                  icon="💡"
                />
                <ToggleRow
                  label="Driver Door"
                  sublabel={driverDoorOpen ? 'Open' : 'Closed'}
                  active={driverDoorOpen}
                  onClick={() => setDriverDoorOpen(v => !v)}
                  icon="🚪"
                />
                <ToggleRow
                  label="Passenger Door"
                  sublabel={passengerDoorOpen ? 'Open' : 'Closed'}
                  active={passengerDoorOpen}
                  onClick={() => setPassengerDoorOpen(v => !v)}
                  icon="🚪"
                />
                <ToggleRow
                  label="Auto Rotate"
                  sublabel={autoRotate ? 'Rotating slowly' : 'Paused'}
                  active={autoRotate}
                  onClick={() => setAutoRotate(v => !v)}
                  icon="🔄"
                />
              </div>
            </div>

            {/* ── Car Badge ── */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">BMW M4 Competition</p>
                <p className="text-white/35 text-[11px] mt-0.5">503 hp · 3.8s 0–60 mph · xDrive</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;