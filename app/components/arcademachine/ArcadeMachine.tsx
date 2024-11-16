import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { ArcadeMachineProps } from "./types/ArcadeMachineProps";
import { CRTMaterial } from "./CRTMaterial";
import { useFrame, ThreeEvent } from "@react-three/fiber";

function ArcadeMachine({
  orbitControlsRef,
  onJoystickMove,
  onButtonPress,
  onDraw,
  screenLightModifier,
}: ArcadeMachineProps) {
  const gltf = useGLTF("/arcademachine.glb");
  const [isPressed, setIsPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef<THREE.Object3D>();
  const joystickRef = useRef<THREE.Object3D>();
  const joystickParentRef = useRef<THREE.Object3D>();
  const targetY = useRef(0);
  const initialY = useRef(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const initialJoystickRotation = useRef<THREE.Euler | null>(null);
  const initialJoystickPosition = useRef<THREE.Vector3 | null>(null);
  const maxRotation = Math.PI / 4; // Maximum rotation of 90 degrees
  const canvasRef = useRef<HTMLCanvasElement>();
  const canvasTextureRef = useRef<THREE.CanvasTexture>();
  const lastJoystickPosition = useRef<number>(0);

  useEffect(() => {
    // Store initial button and joystick references
    const button = gltf.scene.getObjectByName("Mesh_3002");
    const joystick = gltf.scene.getObjectByName("Mesh_3003");
    if (button) {
      initialY.current = button.position.y;
      buttonRef.current = button;
    }
    if (joystick) {
      joystickRef.current = joystick;
      joystickParentRef.current = joystick.parent;
      initialJoystickRotation.current =
        joystickParentRef.current.rotation.clone();
      initialJoystickPosition.current =
        joystickParentRef.current.position.clone();
    }

    // Find Mesh_8 and apply the canvas texture
    const screenMesh = gltf.scene.getObjectByName("Mesh_8");
    if (screenMesh && screenMesh instanceof THREE.Mesh) {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 800;
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      const crtMaterial = new CRTMaterial({
        map: texture,
        time: 0,
        resolution: new THREE.Vector2(800, 800),
      });
      screenMesh.material = crtMaterial;
      canvasRef.current = canvas;
      canvasTextureRef.current = texture;
    }
  }, [gltf]);

  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = !isDragging;
    }
  }, [isDragging, orbitControlsRef]);

  useFrame((state, delta) => {
    // Smoothly interpolate button position
    if (buttonRef.current) {
      buttonRef.current.position.y +=
        (targetY.current - buttonRef.current.position.y) * 0.3;
    }

    // Handle smooth return to initial rotation when not dragging
    if (
      !isDragging &&
      joystickParentRef.current &&
      initialJoystickRotation.current
    ) {
      // Interpolate each rotation axis
      joystickParentRef.current.rotation.x +=
        (initialJoystickRotation.current.x -
          joystickParentRef.current.rotation.x) *
        0.1;
      joystickParentRef.current.rotation.y +=
        (initialJoystickRotation.current.y -
          joystickParentRef.current.rotation.y) *
        0.1;
      joystickParentRef.current.rotation.z +=
        (initialJoystickRotation.current.z -
          joystickParentRef.current.rotation.z) *
        0.1;

      //Interpolate y position
      joystickParentRef.current.position.y +=
        (initialJoystickPosition.current.y -
          joystickParentRef.current.position.y) *
        0.1;
    }

    // Update canvas texture
    if (canvasRef.current && canvasTextureRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx && onDraw) {
        onDraw(ctx, canvasRef.current);
        canvasTextureRef.current.needsUpdate = true;
      }
    }

    // Add callback for joystick position
    if (joystickParentRef.current) {
      const normalizedPosition =
        joystickParentRef.current.rotation.x / maxRotation;
      // Only call onJoystickMove when crossing the threshold
      if (
        Math.abs(normalizedPosition) === 1 &&
        Math.abs(lastJoystickPosition.current) !== 1
      ) {
        onJoystickMove?.(normalizedPosition);
      }
      lastJoystickPosition.current = normalizedPosition;
    }

    const screenMesh = gltf.scene.getObjectByName("Mesh_8");
    if (screenMesh && screenMesh instanceof THREE.Mesh) {
      screenMesh.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (
      isDragging &&
      dragStart.current &&
      joystickParentRef.current &&
      initialJoystickRotation.current
    ) {
      const deltaY = e.nativeEvent.clientY - dragStart.current.y;

      // Sensitivity factor to control rotation speed
      const sensitivity = 0.001;

      joystickParentRef.current.rotateX(deltaY * sensitivity);

      // Clamp rotations
      const rotation = joystickParentRef.current.rotation;
      rotation.x = THREE.MathUtils.clamp(rotation.x, -maxRotation, maxRotation);
      rotation.y = 0;

      if (rotation.x < 0) {
        joystickParentRef.current.position.y =
          initialJoystickPosition.current.y -
          Math.pow(rotation.x / maxRotation, 2) * 0.02;
      }
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.object.name === "Mesh_3002") {
      setIsPressed(false);
      targetY.current = initialY.current;
      onButtonPress?.(false);
    }
    if (isDragging) {
      setIsDragging(false);
      // Rotation will smoothly interpolate back in useFrame
    }
  };

  const handlePointerLeave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (isPressed && e.object.name === "Mesh_3002") {
      setIsPressed(false);
      targetY.current = initialY.current;
    }
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.object.name === "Mesh_3002") {
      setIsPressed(true);
      targetY.current = initialY.current - 0.01;
      onButtonPress?.(true);
    }
    if (e.object.name === "Mesh_3003") {
      setIsDragging(true);
      dragStart.current = {
        x: e.nativeEvent.clientX,
        y: e.nativeEvent.clientY,
      };
      if (joystickParentRef.current) {
        initialJoystickRotation.current =
          joystickParentRef.current.rotation.clone();
        initialJoystickPosition.current =
          joystickParentRef.current.position.clone();
      }
    }
  };

  return (
    <primitive
      object={gltf.scene}
      scale={0.5}
      position={[0, 0, -5]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    />
  );
}

export default ArcadeMachine;
