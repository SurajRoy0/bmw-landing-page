import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from 'three';
import Loader from './Loader';
import { Suspense } from "react";
import ModelBMW from "./BMW-M4";

// Lighting configurations — no external HDR needed, all local lights
const LIGHT_CONFIGS = {
  studio: {
    bg: '#141416',
    hemiSky: '#c8d8ff',
    hemiGround: '#1a1a2a',
    hemiIntensity: 0.6,
    ambientIntensity: 0.4,
    spot1: { pos: [-3, 8, 5], intensity: Math.PI * 0.9, color: '#ffffff' },
    spot2: { pos: [3, 6, -5], intensity: Math.PI * 0.5, color: '#dce8ff' },
    spot3: { pos: [0, -6, 4], intensity: Math.PI * 0.2, color: '#ffffff' },
  },
  showroom: {
    bg: '#0d0d0f',
    hemiSky: '#ffe8c0',
    hemiGround: '#1a1208',
    hemiIntensity: 0.5,
    ambientIntensity: 0.5,
    spot1: { pos: [0, 10, 0], intensity: Math.PI * 1.2, color: '#fff5d8' },
    spot2: { pos: [-5, 5, 3], intensity: Math.PI * 0.6, color: '#ffe0a0' },
    spot3: { pos: [5, 5, -3], intensity: Math.PI * 0.5, color: '#fff0c0' },
  },
  night: {
    bg: '#04040a',
    hemiSky: '#0a1833',
    hemiGround: '#000005',
    hemiIntensity: 0.15,
    ambientIntensity: 0.04,
    spot1: { pos: [0, 6, 2], intensity: Math.PI * 0.25, color: '#5599ff' },
    spot2: { pos: [-4, 3, -2], intensity: Math.PI * 0.12, color: '#334477' },
    spot3: { pos: [4, 2, 2], intensity: Math.PI * 0.08, color: '#445588' },
  },
  outdoor: {
    bg: '#0a0e14',
    hemiSky: '#d0e8ff',
    hemiGround: '#1a2808',
    hemiIntensity: 1.0,
    ambientIntensity: 0.7,
    spot1: { pos: [5, 12, 5], intensity: Math.PI * 1.8, color: '#fff8e0' },
    spot2: { pos: [-3, 5, -3], intensity: Math.PI * 0.5, color: '#b0d0ff' },
    spot3: { pos: [0, -4, 5], intensity: Math.PI * 0.25, color: '#c8e0ff' },
  },
};

const ModelView = ({
  groupRef,
  controlRef,
  zoom = 4.5,
  lightPreset = 'studio',
  headlightsOn = false,
  driverDoorOpen = false,
  passengerDoorOpen = false,
  autoRotate = true,
}) => {
  const cfg = LIGHT_CONFIGS[lightPreset] || LIGHT_CONFIGS.studio;
  const isNight = lightPreset === 'night';

  return (
    <View className="w-full h-full">
      {/* Scene background colour — no HDR/network fetch needed */}
      <color attach="background" args={[cfg.bg]} />

      {/* Hemisphere light for natural sky/ground fill */}
      <hemisphereLight
        skyColor={cfg.hemiSky}
        groundColor={cfg.hemiGround}
        intensity={cfg.hemiIntensity}
      />

      {/* Ambient fill */}
      <ambientLight intensity={cfg.ambientIntensity} />

      {/* Main spotlights per preset */}
      <spotLight
        position={cfg.spot1.pos}
        angle={0.3}
        penumbra={0.8}
        decay={0}
        intensity={cfg.spot1.intensity}
        color={cfg.spot1.color}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={cfg.spot2.pos}
        angle={0.4}
        penumbra={1}
        decay={0}
        intensity={cfg.spot2.intensity}
        color={cfg.spot2.color}
      />
      <spotLight
        position={cfg.spot3.pos}
        angle={0.5}
        penumbra={1}
        decay={0}
        intensity={cfg.spot3.intensity}
        color={cfg.spot3.color}
      />

      {/* Headlights — front white beams + red tail lights */}
      {headlightsOn && (
        <>
          <pointLight position={[0.8, 0.2, 3.0]} intensity={isNight ? 40 : 8} color="#fffbe0" distance={12} decay={2} />
          <pointLight position={[-0.8, 0.2, 3.0]} intensity={isNight ? 40 : 8} color="#fffbe0" distance={12} decay={2} />
          <spotLight position={[0.6, 0.1, 3.2]} angle={0.18} penumbra={0.3} intensity={isNight ? 80 : 15} color="#fffbe0" distance={30} decay={1.5} />
          <spotLight position={[-0.6, 0.1, 3.2]} angle={0.18} penumbra={0.3} intensity={isNight ? 80 : 15} color="#fffbe0" distance={30} decay={1.5} />
          {/* Tail lights */}
          <pointLight position={[0.7, 0.3, -3.0]} intensity={isNight ? 12 : 3} color="#ff1a1a" distance={5} decay={2} />
          <pointLight position={[-0.7, 0.3, -3.0]} intensity={isNight ? 12 : 3} color="#ff1a1a" distance={5} decay={2} />
        </>
      )}

      {/* Dynamic Camera — zoom value drives Z position */}
      <PerspectiveCamera makeDefault position={[0, 0.5, zoom]} fov={45} />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.45}
        target={new THREE.Vector3(0, 0, 0)}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate={autoRotate}
        autoRotateSpeed={0.6}
      />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color={isNight ? '#06060e' : '#111114'}
          metalness={isNight ? 0.85 : 0.4}
          roughness={isNight ? 0.15 : 0.7}
        />
      </mesh>

      {/* Ground light streak when headlights on at night */}
      {headlightsOn && isNight && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.49, 2]}>
          <planeGeometry args={[3, 8]} />
          <meshBasicMaterial color="#fffbe0" transparent opacity={0.04} />
        </mesh>
      )}

      <group ref={groupRef} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <ModelBMW
            scale={[0.7, 0.7, 0.7]}
            position={[0, -1, 0]}
            headlightsOn={headlightsOn}
            driverDoorOpen={driverDoorOpen}
            passengerDoorOpen={passengerDoorOpen}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;