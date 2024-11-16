import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { ArcadeMachineProps } from "./types/ArcadeMachineProps";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import ArcadeMachine from "./ArcadeMachine";

function Scene({
  onJoystickMove,
  onButtonPress,
  onDraw,
  screenLightModifier,
  isTransitioning,
}: ArcadeMachineProps) {
  const orbitControlsRef = useRef<any>(null);
  const [directionalIntensity, setDirectionalIntensity] = useState(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const animating = useRef(false);

  useEffect(() => {
    // Fade in the lights over 2 seconds
    const fadeIn = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      gsap.to(
        { progress: 0 },
        {
          progress: 1,
          duration: 2,
          onUpdate: function () {
            setDirectionalIntensity(this.targets()[0].progress);
          },
          ease: "power2.out",
        }
      );
    };

    fadeIn();

    // Camera animation with GSAP
    setTimeout(() => {
      if (orbitControlsRef.current) {
        animating.current = true;
        const camera = orbitControlsRef.current;

        gsap
          .timeline()
          .to(camera.object.position, {
            x: 0,
            y: 0.92,
            z: -4.5,
            duration: 4,
            ease: "power2.inOut",
          })
          .to(
            camera.target,
            {
              x: 0,
              y: 0.9,
              z: -5,
              duration: 4,
              ease: "power2.inOut",
              onUpdate: () => camera.update(),
              onComplete: () => {
                animating.current = false;
              },
            },
            "<"
          );
      }
    }, 3);
  }, []);

  useEffect(() => {
    if (isTransitioning && orbitControlsRef.current) {
      setTimeout(() => {
        const camera = orbitControlsRef.current;

        // Disable controls during transition
        camera.enabled = false;

        // Create zoom animation
        gsap
          .timeline()
          .to(camera.object.position, {
            x: 0,
            y: 0.9,
            z: -4.8,
            duration: 2,
            ease: "power2.inOut",
          })
          .to(
            camera.target,
            {
              x: 0,
              y: 0.9,
              z: -4.93,
              duration: 2,
              ease: "power2.inOut",
              onUpdate: () => camera.update(),
            },
            "<"
          );

        // Increase screen light intensity
        gsap.to(
          { intensity: directionalIntensity },
          {
            intensity: 10,
            duration: 2,
            onUpdate: function () {
              setDirectionalIntensity(this.targets()[0].intensity);
            },
            ease: "power2.inOut",
          }
        );
      }, 500);
    }
  }, [isTransitioning]);

  return (
    <>
      <ambientLight intensity={0.01} />
      <color attach="background" args={["#000000"]} />
      <spotLight
        position={[0, 1, -4]}
        intensity={directionalIntensity * 4}
        angle={Math.PI}
        penumbra={0}
        // castShadow
        target-position={[0, 0, -5]}
      />
      {/* Screen light */}
      <rectAreaLight
        position={[-0.1, 0.9, -4.93]}
        width={0.3} // Width of the arcade screen
        height={0.3} // Small height to create a bar effect
        intensity={
          screenLightModifier == 1
            ? screenLightModifier * 10 // Increased from 2 to 10
            : (1 -
                screenLightModifier +
                Math.random() * (1 - screenLightModifier)) *
              10
        }
        color="#ffff00"
        rotation={[-Math.PI / 14, Math.PI, 0]} // Rotate to face forward
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -20]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#232b2b" />
      </mesh>

      <ArcadeMachine
        orbitControlsRef={orbitControlsRef}
        onJoystickMove={onJoystickMove}
        onButtonPress={onButtonPress}
        onDraw={onDraw}
      />
      <PerspectiveCamera makeDefault position={[0, 2, 5]} ref={cameraRef} />
      <OrbitControls
        ref={orbitControlsRef}
        makeDefault
        target={[0, 0, 0]}
        enabled={false}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
}

export default Scene;
