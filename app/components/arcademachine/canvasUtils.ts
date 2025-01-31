import { games } from "@/app/constants/games";

interface CanvasUtils {
  loadedImages: { [key: string]: HTMLImageElement };
  fontLoaded: boolean;
}

export const drawCanvas = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  utils: CanvasUtils,
  currentImage: number,
  glitchAmount: number,
  screenLightModifier: number
) => {
  // Clear and draw background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImage(ctx, currentImage, utils.loadedImages);

  // Apply glitch effect if needed
  if (glitchAmount > 0) {
    applyGlitchEffect(ctx, canvas, glitchAmount, screenLightModifier);
  }

  ctx.restore();
};

const drawImage = (
  ctx: CanvasRenderingContext2D,
  currentImage: number,
  loadedImages: { [key: string]: HTMLImageElement }
) => {
  const currentSrc = games[currentImage].imageUrl;
  const img = loadedImages[currentSrc];
  if (img) {
    // Calculate scale to cover the entire canvas while maintaining aspect ratio
    const scale = Math.max(
      ctx.canvas.width / img.width,
      ctx.canvas.height / img.height
    );

    const finalWidth = img.width * scale;
    const finalHeight = img.height * scale;

    // Center the image
    const x = (ctx.canvas.width - finalWidth) / 2;
    const y = (ctx.canvas.height - finalHeight) / 2;

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
      ctx.drawImage(offscreen, x, y, finalWidth, finalHeight);
    }
  }
};

const applyGlitchEffect = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  amount: number,
  screenLightModifier: number
) => {
  // Create an off-screen canvas for the glitch effect
  const offscreen = document.createElement("canvas");
  offscreen.width = canvas.width;
  offscreen.height = canvas.height;
  const offCtx = offscreen.getContext("2d");

  if (!offCtx) return;

  // Copy the original content
  offCtx.drawImage(canvas, 0, 0);

  // Create random slices based on glitch amount
  const baseSlices = 3; // Minimum number of slices
  const maxExtraSlices = 15; // Maximum additional slices
  const numSlices = baseSlices + Math.floor((amount / 20) * maxExtraSlices);

  // Random light flicker
  const flickerIntensity = Math.random() * 0.5; // Random value between 0 and 0.5
  ctx.globalAlpha = Math.max(0.3, screenLightModifier - flickerIntensity);

  for (let i = 0; i < numSlices; i++) {
    // Random slice parameters
    const sliceY = Math.random() * canvas.height;
    const sliceHeight = Math.random() * 50 + 10;
    const offsetX = (Math.random() - 0.5) * amount * 2;

    // Draw slice with offset
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, sliceY, canvas.width, sliceHeight);
    ctx.clip();
    ctx.drawImage(offscreen, offsetX, 0);
    ctx.restore();

    // Occasionally add a color shift with varying intensity
    if (Math.random() < 0.3) {
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      const glitchAlpha = Math.random() * 0.2 * screenLightModifier; // Tie glitch intensity to screen light
      ctx.fillStyle = `rgba(255, 255, 0, ${glitchAlpha})`;
      ctx.fillRect(0, sliceY, canvas.width, sliceHeight);
      ctx.restore();
    }
  }

  // Reset global alpha
  ctx.globalAlpha = 1;
};
