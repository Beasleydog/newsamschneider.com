"use client";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { games } from "@/app/constants/games";
import Scene from "./scene";
import { drawCanvas } from "./canvasUtils";

export default function ArcadeMachineViewer() {
  const [currentImage, setCurrentImage] = useState(0);
  const loadedImages = useRef<{ [key: string]: HTMLImageElement }>({});
  const backgroundImage = useRef<HTMLImageElement>();
  const fontLoaded = useRef(false);
  const [glitchAmount, setGlitchAmount] = useState(0);
  const [screenLightModifier, setScreenLightModifier] = useState(0); // Start with screen off
  const orbitControlsRef = useRef(null);

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

    // Load images
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

    // Start with initial glitch effect
    setTimeout(() => {
      setGlitchAmount(10);
      setTimeout(() => {
        setGlitchAmount(0);
      }, 1000);
    }, 4000);
  }, []);

  const handleJoystickMove = (position: number) => {
    // Simple cycling through games
    setGlitchAmount(20);
    setScreenLightModifier(0.5);

    setTimeout(() => {
      const newIndex = (currentImage + position + games.length) % games.length;
      setCurrentImage(newIndex);

      setTimeout(() => {
        setGlitchAmount(10);
        setScreenLightModifier(0.75);
        setTimeout(() => {
          setGlitchAmount(0);
          setScreenLightModifier(1);
        }, 100);
      }, 100);
    }, 200);
  };

  const handleButtonPress = (isPressed: boolean) => {
    if (!isPressed) {
      window.open(games[currentImage].url, "_blank");
    }
  };

  const handleDraw = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    // Draw main content
    drawCanvas(
      ctx,
      canvas,
      {
        loadedImages: loadedImages.current,
        fontLoaded: fontLoaded.current,
      },
      currentImage,
      glitchAmount,
      1
    );
  };

  return (
    <div className="w-full top-0 h-[calc(100%-100vh)]">
      <div className="sticky top-0 bg-red-500 overflow-visible h-[0px] ">
        <Canvas className="!h-screen !w-[95%]" gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <Scene
              onJoystickMove={handleJoystickMove}
              onButtonPress={handleButtonPress}
              onDraw={handleDraw}
              screenLightModifier={screenLightModifier}
              orbitControlsRef={orbitControlsRef}
            />
            <OrbitControls ref={orbitControlsRef} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
