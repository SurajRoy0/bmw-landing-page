import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from 'three';
import Loader from './Loader';
import { Suspense } from "react";
import ModelBMW from "./BMW-M4";

// Lighting configurations — no external HDR needed, all local lights
const LIGHT_CONFIGS = {
  studio: {
    bg: '#0a0a0c',
    hemiSky: '#ffffff',
    hemiGround: '#222233',
    hemiIntensity: 1.2,
    ambientIntensity: 0.8,
    spot1: { pos: [-5, 12, 10], intensity: Math.PI * 2.5, color: '#ffffff' },
    spot2: { pos: [8, 10, -8], intensity: Math.PI * 1.8, color: '#dce8ff' },
    spot3: { pos: [0, -8, 5], intensity: Math.PI * 0.5, color: '#ffffff' },
  },
  showroom: {
    bg: '#050507',
    hemiSky: '#ffe8c0',
    hemiGround: '#1a1208',
    hemiIntensity: 1.0,
    ambientIntensity: 1.0,
    spot1: { pos: [0, 15, 0], intensity: Math.PI * 3.5, color: '#fff5d8' },
    spot2: { pos: [-8, 8, 5], intensity: Math.PI * 2.2, color: '#ffe0a0' },
    spot3: { pos: [8, 8, -5], intensity: Math.PI * 2.0, color: '#fff0c0' },
  },
  night: {
    bg: '#020204',
    hemiSky: '#0a1833',
    hemiGround: '#000005',
    hemiIntensity: 0.4,
    ambientIntensity: 0.15,
    spot1: { pos: [0, 8, 4], intensity: Math.PI * 0.8, color: '#5599ff' },
    spot2: { pos: [-6, 5, -4], intensity: Math.PI * 0.4, color: '#334477' },
    spot3: { pos: [6, 4, 4], intensity: Math.PI * 0.3, color: '#445588' },
  },
  outdoor: {
    bg: '#0a0e14',
    hemiSky: '#d0e8ff',
    hemiGround: '#2a3818',
    hemiIntensity: 2.0,
    ambientIntensity: 1.5,
    spot1: { pos: [10, 20, 10], intensity: Math.PI * 5.0, color: '#fff8e0' },
    spot2: { pos: [-8, 10, -8], intensity: Math.PI * 1.5, color: '#b0d0ff' },
    spot3: { pos: [0, -5, 10], intensity: Math.PI * 0.8, color: '#c8e0ff' },
  },
};

const ModelView = ({
  groupRef,
  controlRef,
  zoom = 4.5,
  lightPreset = 'studio',
  headlightsOn = false,
  tailLightsOn = false,
  driverDoorOpen = false,
  passengerDoorOpen = false,
  autoRotate = true,
  color = '#2D5A27'
}) => {
  const cfg = LIGHT_CONFIGS[lightPreset] || LIGHT_CONFIGS.studio;
  const isNight = lightPreset === 'night';

  return (
    <View className="w-full h-full">
      {/* Scene background colour */}
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

      {/* Headlights — front white beams */}
      {headlightsOn && (
        <>
          <pointLight position={[0.8, 0.2, 3.0]} intensity={isNight ? 60 : 15} color="#fffbe0" distance={15} decay={2} />
          <pointLight position={[-0.8, 0.2, 3.0]} intensity={isNight ? 60 : 15} color="#fffbe0" distance={15} decay={2} />
          <spotLight position={[0.6, 0.1, 3.2]} angle={0.25} penumbra={0.5} intensity={isNight ? 120 : 30} color="#fffbe0" distance={40} decay={1.5} />
          <spotLight position={[-0.6, 0.1, 3.2]} angle={0.25} penumbra={0.5} intensity={isNight ? 120 : 30} color="#fffbe0" distance={40} decay={1.5} />
          
          {/* Ground light streak when headlights on */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.49, 3.5]}>
            <planeGeometry args={[4, 10]} />
            <meshBasicMaterial color="#fffbe0" transparent opacity={isNight ? 0.08 : 0.02} />
          </mesh>
        </>
      )}

      {/* Tail lights — red rear glow */}
      {tailLightsOn && (
        <>
          <pointLight position={[0.7, 0.3, -3.0]} intensity={isNight ? 20 : 5} color="#ff1a1a" distance={8} decay={2} />
          <pointLight position={[-0.7, 0.3, -3.0]} intensity={isNight ? 20 : 5} color="#ff1a1a" distance={8} decay={2} />
        </>
      )}

      {/* Dynamic Camera — zoom value drives Z position */}
      <PerspectiveCamera makeDefault position={[0, 0.5, zoom]} fov={45} />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        target={new THREE.Vector3(0, 0, 0)}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate={autoRotate}
        autoRotateSpeed={0.6}
      />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color={isNight ? '#030308' : '#0a0a0c'}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <group ref={groupRef} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <ModelBMW
            scale={[0.7, 0.7, 0.7]}
            position={[0, -1, 0]}
            headlightsOn={headlightsOn}
            tailLightsOn={tailLightsOn}
            driverDoorOpen={driverDoorOpen}
            passengerDoorOpen={passengerDoorOpen}
            color={color}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;