import { OrbitControls, PerspectiveCamera, View, ContactShadows } from "@react-three/drei";
import * as THREE from 'three';
import Loader from './Loader';
import { Suspense } from "react";
import ModelBMW from "./BMW-M4";

const ModelView = ({
  groupRef,
  controlRef,
  zoom = 4.5,
  headlightsOn = false,
  tailLightsOn = false,
  driverDoorOpen = false,
  passengerDoorOpen = false,
  autoRotate = true,
  color = '#2D5A27'
}) => {


  return (
    <View className="w-full h-full">
      {/* Scene background colour */}
      <color attach="background" args={['#0a0a0c']} />
      <fog attach="fog" args={['#0a0a0c', 10, 25]} />

      {/* Hemisphere light for natural sky/ground fill */}
      <hemisphereLight
        color={'#ffffff'}
        groundColor={'#222233'}
        intensity={1.2}
      />

      {/* Ambient fill */}
      <ambientLight intensity={0.8} />

      {/* Main spotlights per preset */}
      <spotLight
        position={[-5, 12, 10]}
        angle={0.3}
        penumbra={0.8}
        decay={0}
        intensity={Math.PI * 2.5}
        color={'#ffffff'}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

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

      {/* High-Performance Shadows & Floor */}
      <ContactShadows
        position={[0, -1.49, 0]}
        opacity={0.3}
        scale={20}
        blur={2.5}
        far={4}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color={'#0a0a0c'}
          metalness={0.4}
          roughness={0.2}
          envMapIntensity={0.5}
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