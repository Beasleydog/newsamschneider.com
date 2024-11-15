"use client";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame, ThreeEvent, extend } from "@react-three/fiber";
import {
  CameraControls,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  shaderMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { games } from "@/app/constants/games";

const CRTMaterial = shaderMaterial(
  {
    map: null,
    time: 0,
    resolution: new THREE.Vector2(800, 800),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D map;
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      vec2 curved_uv = uv * 2.0 - 1.0;
      vec2 offset = curved_uv.yx / 6.0;
      curved_uv += curved_uv * offset * offset;
      curved_uv = curved_uv * 0.5 + 0.5;
      
      vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
      
      if (curved_uv.x >= 0.0 && curved_uv.x <= 1.0 && curved_uv.y >= 0.0 && curved_uv.y <= 1.0) {
        float scanline = sin(curved_uv.y * resolution.y * 2.0) * 0.02;
        
        float r = texture2D(map, curved_uv + vec2(0.001, 0.0)).r;
        float g = texture2D(map, curved_uv).g;
        float b = texture2D(map, curved_uv - vec2(0.001, 0.0)).b;

        vec2 vigUV = curved_uv * (1.0 - curved_uv.yx);
        float vig = vigUV.x * vigUV.y * 15.0;
        vig = pow(vig, 0.25);

        float flicker = 0.95 + 0.05 * sin(time * 8.0);

        vec3 col = vec3(r, g, b);
        col *= (1.0 + scanline);
        col *= vig;
        col *= flicker;
        
        color = vec4(col, 1.0);
      }
      
      gl_FragColor = color;
    }
  `
);

extend({ CRTMaterial });

interface ArcadeMachineProps {
  onJoystickMove?: (position: number) => void; // -1 to 1, representing up/down
  onButtonPress?: (isPressed: boolean) => void;
  onDraw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  orbitControlsRef: React.RefObject<any>;
}
function ArcadeMachine({
  orbitControlsRef,
  onJoystickMove,
  onButtonPress,
  onDraw,
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
function Scene({
  onJoystickMove,
  onButtonPress,
  onDraw,
  screenLightModifier,
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
    }, 3000);
  }, []);

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
      <pointLight
        position={[0, 0.9, -5]}
        intensity={1 * screenLightModifier}
        color="#ffff00"
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
        // enabled={false}
        // enableZoom={false}
        // enablePan={false}
        // enableRotate={false}
      />
    </>
  );
}
export default function ArcadeMachineViewer() {
  const [currentImage, setCurrentImage] = useState(0);
  const loadedImages = useRef<{ [key: string]: HTMLImageElement }>({});
  const backgroundImage = useRef<HTMLImageElement>();
  const fontLoaded = useRef(false);
  const [glitchAmount, setGlitchAmount] = useState(0);
  const [screenLightModifier, setScreenLightModifier] = useState(1);

  useEffect(() => {
    // Load font first
    const loadFont = async () => {
      try {
        await document.fonts.load("24px 'Press Start 2P'");
        fontLoaded.current = true;
      } catch (err) {
        console.error("Failed to load font:", err);
      }
    };
    loadFont();

    // Existing image loading code...
    const img = new Image();
    const imageUrl = new URL(location.href + "/background.png", import.meta.url)
      .href;
    img.src = imageUrl;
    backgroundImage.current = img;
    games.forEach((game) => {
      const img = new Image();
      const imageUrl = new URL(location.href + game.imageUrl, import.meta.url)
        .href;
      img.src = imageUrl;
      loadedImages.current[game.imageUrl] = img;
    });
  }, []);

  const handleJoystickMove = (position: number) => {
    // Start glitch effect
    setGlitchAmount(20);

    // After a short delay, change image and remove glitch
    setTimeout(() => {
      const newIndex = (currentImage + position + games.length) % games.length;
      setCurrentImage(newIndex);

      // Fade out glitch effect
      setTimeout(() => {
        setGlitchAmount(10);
        setTimeout(() => {
          setGlitchAmount(0);
        }, 100);
      }, 100);
    }, 200);
  };

  const handleButtonPress = (isPressed: boolean) => {
    console.log("Button pressed:", isPressed);
  };

  const handleDraw = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    // Clear and draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStaticBackground(ctx, canvas);

    const OUTER_PADDING = 40;
    const INNER_PADDING = 20;
    const boxWidth = canvas.width - OUTER_PADDING * 2;
    const boxHeight = canvas.height - OUTER_PADDING * 2;
    const x = (canvas.width - boxWidth) / 2;
    const y = (canvas.height - boxHeight) / 2;
    const contentX = x + INNER_PADDING;
    let currentY = y + INNER_PADDING + 40;
    const contentWidth = boxWidth - INNER_PADDING * 2;

    if (fontLoaded.current) {
      // Title Section
      ctx.font = "40px 'Press Start 2P'";
      ctx.fillStyle = "#ffff00";
      ctx.textAlign = "left";

      const titleLineHeight = 45;
      const words = games[currentImage].title.split(" ");
      let line = "";

      words.forEach((word) => {
        const testLine = line + word + " ";
        if (ctx.measureText(testLine).width > contentWidth) {
          ctx.fillText(line, contentX, currentY);
          line = word + " ";
          currentY += titleLineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, contentX, currentY);

      // Description Section with balanced gap after title
      currentY += titleLineHeight * 0.8;
      ctx.font = "20px 'Press Start 2P'";
      const description =
        games[currentImage].oneLiner || "No description available";
      const descWords = description.split(" ");
      line = "";
      const descLineHeight = 30;

      descWords.forEach((word) => {
        const testLine = line + word + " ";
        if (ctx.measureText(testLine).width > contentWidth) {
          ctx.fillText(line, contentX, currentY);
          line = word + " ";
          currentY += descLineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, contentX, currentY);

      // Larger gap between description and achievements
      currentY += descLineHeight * 3;

      // Achievements Section (removed title, just showing achievements)
      ctx.font = "16px 'Press Start 2P'";
      let achievementY = currentY;

      const achievements = games[currentImage].achievements || [
        "High Score Champion",
        "Speed Runner",
        "Perfect Game",
      ];

      achievements.forEach((achievement) => {
        if (achievementY + 35 > y + boxHeight - INNER_PADDING * 6) return;

        // Medal
        const medalSize = 20;
        const medalX = contentX;
        const medalY = achievementY - medalSize + 5;

        // Medal circle
        ctx.beginPath();
        ctx.arc(
          medalX + medalSize / 2,
          medalY + medalSize / 2,
          medalSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "#FFD700";
        ctx.fill();
        ctx.strokeStyle = "#DAA520";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Medal ribbon
        ctx.beginPath();
        ctx.moveTo(medalX + medalSize / 2, medalY + medalSize);
        ctx.lineTo(medalX + medalSize / 2 - 6, medalY + medalSize + 10);
        ctx.lineTo(medalX + medalSize / 2 + 6, medalY + medalSize + 10);
        ctx.closePath();
        ctx.fillStyle = "#FF0000";
        ctx.fill();

        // Star
        const starPoints = 5;
        const starRadius = medalSize / 4;
        ctx.beginPath();
        for (let i = 0; i < starPoints * 2; i++) {
          const radius = i % 2 === 0 ? starRadius : starRadius / 2;
          const angle = (i * Math.PI) / starPoints;
          const starX =
            medalX + medalSize / 2 + radius * Math.cos(angle - Math.PI / 2);
          const starY =
            medalY + medalSize / 2 + radius * Math.sin(angle - Math.PI / 2);
          i === 0 ? ctx.moveTo(starX, starY) : ctx.lineTo(starX, starY);
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        // Achievement text with proper wrapping
        ctx.fillStyle = "#ffff00";
        const medalPadding = medalSize + 10;
        const maxAchievementWidth = contentWidth - medalPadding - INNER_PADDING;
        let currentAchievementX = medalX + medalPadding;

        const achievementWords = achievement.split(" ");
        let achievementLine = "";

        achievementWords.forEach((word) => {
          const testLine = achievementLine + word + " ";
          if (ctx.measureText(testLine).width > maxAchievementWidth) {
            ctx.fillText(achievementLine, currentAchievementX, achievementY);
            achievementLine = word + " ";
            achievementY += 25;
          } else {
            achievementLine = testLine;
          }
        });
        ctx.fillText(achievementLine, currentAchievementX, achievementY);
        achievementY += 35;
      });

      currentY = achievementY + INNER_PADDING;

      // Image Section (now full width at bottom)
      const currentSrc = games[currentImage].imageUrl;
      const img = loadedImages.current[currentSrc];
      if (img) {
        // Calculate maximum available space for image
        const maxImageWidth = contentWidth;
        const maxImageHeight = y + boxHeight - currentY - INNER_PADDING;

        // Calculate scale while maintaining aspect ratio
        const scale = Math.min(
          maxImageWidth / img.width,
          maxImageHeight / img.height
        );

        const finalWidth = img.width * scale;
        const finalHeight = img.height * scale;

        // Center the image horizontally
        const centerX = contentX + (contentWidth - finalWidth) / 2;
        const centerY = currentY;

        const offscreen = document.createElement("canvas");
        offscreen.width = finalWidth;
        offscreen.height = finalHeight;
        const offCtx = offscreen.getContext("2d");

        if (offCtx) {
          offCtx.drawImage(img, 0, 0, finalWidth, finalHeight);
          const imageData = offCtx.getImageData(0, 0, finalWidth, finalHeight);
          const data = imageData.data;

          // Yellow tint
          for (let i = 0; i < data.length; i += 4) {
            const brightness =
              data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = brightness; // R
            data[i + 1] = brightness; // G
            data[i + 2] = 0; // B
            data[i + 3] = 255; // A
          }

          offCtx.putImageData(imageData, 0, 0);
          ctx.drawImage(offscreen, centerX, centerY, finalWidth, finalHeight);
        }
      }

      // Progress bar at the bottom
      const progressBarHeight = 40;
      const progressBarY = canvas.height - progressBarHeight;
      const progressWidth = (canvas.width * (currentImage + 1)) / games.length;

      ctx.fillStyle = "#ffff00";
      ctx.fillRect(0, progressBarY, progressWidth, progressBarHeight);
    }

    // Apply glitch effect if needed (moved after progress bar)
    if (glitchAmount > 0) {
      applyGlitchEffect(ctx, canvas, glitchAmount);
    }

    ctx.restore();
  };

  const applyGlitchEffect = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    amount: number
  ) => {
    setScreenLightModifier(Math.random() * 0.2 + 0.8);

    // Create an off-screen canvas for the glitch effect
    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const offCtx = offscreen.getContext("2d");

    if (!offCtx) return;

    // Copy the original content
    offCtx.drawImage(canvas, 0, 0);

    // Create 3-5 random slices
    const numSlices = Math.floor(Math.random() * 8) + 10;

    for (let i = 0; i < numSlices; i++) {
      // Random slice parameters
      const sliceY = Math.random() * canvas.height;
      const sliceHeight = Math.random() * 50 + 10; // Height between 10-60px
      const offsetX = (Math.random() - 0.5) * amount * 2; // Horizontal offset based on amount

      // Draw slice with offset
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, sliceY, canvas.width, sliceHeight);
      ctx.clip();
      ctx.drawImage(offscreen, offsetX, 0);
      ctx.restore();

      // Occasionally add a color shift
      if (Math.random() < 0.3) {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(255, 255, 0, ${Math.random() * 0.1})`;
        ctx.fillRect(0, sliceY, canvas.width, sliceHeight);
        ctx.restore();
      }
    }
  };

  const drawStaticBackground = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    // Fill background with black
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create static noise effect
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 5; // Random noise intensity
      data[i] = noise; // R
      data[i + 1] = noise; // G
      data[i + 2] = noise; // B
      data[i + 3] = 255; // Alpha
    }

    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className="w-full h-screen">
      <Canvas gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene
            onJoystickMove={handleJoystickMove}
            onButtonPress={handleButtonPress}
            onDraw={handleDraw}
            screenLightModifier={screenLightModifier}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
