import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArcadeMachineProps } from "./types/ArcadeMachineProps";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import ArcadeMachine from "./ArcadeMachine";
import { useFrame } from "@react-three/fiber";

function Scene({
  onJoystickMove,
  onButtonPress,
  onDraw,
  screenLightModifier,
  isTransitioning,
}: ArcadeMachineProps) {
  const orbitControlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const isDraggingRef = useRef(false);
  const defaultAzimuth = useRef(0.4654245644654168);
  const defaultPolar = useRef(1.5707963267948966);
  const offsetDistance = useRef(0.2);

  const springConstant = 0.2;
  // useFrame(() => {
  //   if (orbitControlsRef.current) {
  //     if (isDraggingRef.current) return;
  //     const controls = orbitControlsRef.current;
  //     const azimuth = controls.getAzimuthalAngle();
  //     const polar = controls.getPolarAngle();
  //     const azDistance = defaultAzimuth.current - azimuth;
  //     const polarDistance = defaultPolar.current - polar;
  //     if (Math.abs(azDistance) > 0.01)
  //       controls.setAzimuthalAngle(azimuth + azDistance * springConstant);
  //     if (Math.abs(polarDistance) > 0.01)
  //       controls.setPolarAngle(polar + polarDistance * springConstant);

  //     controls.update();
  //   }
  // });

  useEffect(() => {
    setTimeout(() => {
      // cameraRef.current?.position.set(-6.4, -3.95, 0);
      cameraRef.current?.position.set(0.44, -0.1, 1.15);
      cameraRef.current?.rotation.set(0, 0.4, 0);
    }, 10);
  }, []);

  return (
    <>
      <ambientLight intensity={0.01} />
      <ambientLight intensity={1} position={[0, 10, 0]} />
      <spotLight
        position={[0, 2, 2.5]}
        intensity={4}
        angle={Math.PI}
        penumbra={0}
        target-position={[0, 0, 0]}
      />
      {/* Screen light */}
      <rectAreaLight
        position={[-0.1, 0.9, 0.93]}
        width={0.3}
        height={0.3}
        intensity={
          screenLightModifier == 1
            ? screenLightModifier * 10
            : (1 -
                screenLightModifier +
                Math.random() * (1 - screenLightModifier)) *
              10
        }
        color="#ffff00"
        rotation={[-Math.PI / 14, Math.PI, 0]}
      />

      {/* Floor */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -20]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#232b2b" />
      </mesh> */}

      <ArcadeMachine
        orbitControlsRef={orbitControlsRef}
        onJoystickMove={onJoystickMove}
        onButtonPress={onButtonPress}
        onDraw={onDraw}
        screenLightModifier={screenLightModifier}
        isTransitioning={isTransitioning}
      />
      {/* <PerspectiveCamera makeDefault ref={cameraRef} /> */}
      {/* 
      <OrbitControls
        ref={orbitControlsRef}
        makeDefault
        enabled={false}
        // enableZoom={false}
        // enablePan={false}
        // enableRotate={true}
        // minAzimuthAngle={defaultAzimuth.current - offsetDistance.current}
        // maxAzimuthAngle={defaultAzimuth.current + offsetDistance.current}
        // minPolarAngle={defaultPolar.current - offsetDistance.current}
        // maxPolarAngle={defaultPolar.current + offsetDistance.current}
        target={new THREE.Vector3(0, 0.8, 0)}
        // onStart={() => {
        //   isDraggingRef.current = true;
        //   console.log("start");
        // }}
        // onEnd={() => {
        //   isDraggingRef.current = false;
        //   console.log("end");
        // }}
      /> */}
    </>
  );
}

export default Scene;
