import { gap, size } from "../bento";
import { useEffect, useState } from "react";

export default function Sam() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Calculate eye offset based on mouse position
    // Limit the movement to a small range (e.g., -5px to 5px)
    const maxOffset = 3;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = ((mousePosition.x - centerX) / centerX) * maxOffset;
    const offsetY = ((mousePosition.y - centerY) / centerY) * maxOffset;

    setEyeOffset({
      x: Math.max(-maxOffset, Math.min(maxOffset, offsetX)),
      y: Math.max(-maxOffset, Math.min(maxOffset, offsetY)),
    });
  }, [mousePosition]);

  return (
    <div
      className={`overflow-hidden relative bg-[#ecc19c] rounded-lg text-[2.7rem] p-4 text-white`}
      style={{
        height: `${size * 2 + gap / 2}px`,
        width: `${size}px`,
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url('/eyes.png')",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url('/sam.png')",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
}
