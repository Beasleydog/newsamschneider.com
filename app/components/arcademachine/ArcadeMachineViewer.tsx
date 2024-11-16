"use client";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";

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
  const [scanLinePosition, setScanLinePosition] = useState(-1); // -1 means off, 0-100 is the position
  const [screenBrightness, setScreenBrightness] = useState(0);
  const [horizontalSync, setHorizontalSync] = useState(false);
  const [verticalPinch, setVerticalPinch] = useState(0); // New: for the pinch effect
  const [screenScale, setScreenScale] = useState(0.1); // New: for the scale effect

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

    // Start the animation after a delay
    setTimeout(() => {
      // Animate the scan line from top to bottom
      const startingGlitchAmount = 10;
      const animationSteps = 100;
      const delay = 40;
      for (let i = 0; i <= animationSteps; i++) {
        setTimeout(() => {
          setScanLinePosition(i);
          setGlitchAmount((1 - i / animationSteps) * startingGlitchAmount);
        }, i * delay); // Each step takes 20ms (2 seconds total)
      }
      setTimeout(() => {
        setGlitchAmount(0);
      }, animationSteps * delay + 100);
    }, 4000); // Wait 1 second before starting
  }, []);

  const handleJoystickMove = (position: number) => {
    // Start glitch effect and dim screen
    setGlitchAmount(20);
    setScreenLightModifier(0.5); // Dim the screen

    // After a short delay, change image and remove glitch
    setTimeout(() => {
      const newIndex = (currentImage + position + games.length) % games.length;
      setCurrentImage(newIndex);

      // Fade out glitch effect and restore screen brightness
      setTimeout(() => {
        setGlitchAmount(10);
        setScreenLightModifier(0.75);
        setTimeout(() => {
          setGlitchAmount(0);
          setScreenLightModifier(1); // Restore full brightness
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
    console.log(scanLinePosition);
    // Draw scan line and black overlay
    if (scanLinePosition < 100 && scanLinePosition >= 0) {
      const scanY = (canvas.height * scanLinePosition) / 100;

      // Black overlay covering everything below scan line
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, scanY, canvas.width, canvas.height - scanY);

      // Bright scan line
      const gradient = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.95)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 15, canvas.width, 30);
    } else if (scanLinePosition === -1) {
      // Before animation starts: completely black
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
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
