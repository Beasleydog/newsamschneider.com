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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeToWhite, setFadeToWhite] = useState(false);
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
    // If already transitioning, ignore input
    if (isTransitioning) return;

    // Check if we're on the last game and trying to go forward
    if (currentImage === games.length - 1 && position > 0) {
      setIsTransitioning(true);
      // Start glitch effect and fade to white
      setGlitchAmount(20);
      setScreenLightModifier(2); // Increase brightness

      setTimeout(() => {
        setFadeToWhite(true);
      }, 1500);
      return;
    }

    // Original joystick move logic
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
      1,
      isTransitioning
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
    <div
      className="w-full h-screen"
      style={{
        transition: "opacity 1s",
        opacity: fadeToWhite ? 0 : 1,
      }}
    >
      <Canvas gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene
            onJoystickMove={handleJoystickMove}
            onButtonPress={handleButtonPress}
            onDraw={handleDraw}
            screenLightModifier={screenLightModifier}
            isTransitioning={isTransitioning}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
