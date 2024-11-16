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

  if (utils.fontLoaded) {
    // Base light level without glitch effect
    ctx.globalAlpha = screenLightModifier;

    drawTitle(ctx, currentImage, contentX, currentY, contentWidth);
    currentY = drawDescription(
      ctx,
      currentImage,
      contentX,
      currentY,
      contentWidth
    );
    currentY = drawAchievements(
      ctx,
      currentImage,
      contentX,
      currentY,
      contentWidth,
      y,
      boxHeight,
      INNER_PADDING
    );
    drawImage(
      ctx,
      currentImage,
      contentX,
      currentY,
      contentWidth,
      y,
      boxHeight,
      INNER_PADDING,
      utils.loadedImages
    );
    drawProgressBar(ctx, canvas, currentImage);
  }

  // Apply glitch effect if needed
  if (glitchAmount > 0) {
    applyGlitchEffect(ctx, canvas, glitchAmount, screenLightModifier);
  }

  ctx.restore();
};

const drawTitle = (
  ctx: CanvasRenderingContext2D,
  currentImage: number,
  contentX: number,
  currentY: number,
  contentWidth: number
): number => {
  ctx.font = "40px 'Press Start 2P'";
  ctx.fillStyle = "#ffff00";
  ctx.textAlign = "left";

  const titleLineHeight = 45;
  const words = games[currentImage].title.split(" ");
  let line = "";
  let y = currentY;

  words.forEach((word) => {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > contentWidth) {
      ctx.fillText(line, contentX, y);
      line = word + " ";
      y += titleLineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, contentX, y);

  return y;
};

const drawDescription = (
  ctx: CanvasRenderingContext2D,
  currentImage: number,
  contentX: number,
  currentY: number,
  contentWidth: number
): number => {
  let y = currentY + 45 * 0.8; // Add spacing after title
  ctx.font = "20px 'Press Start 2P'";
  const description =
    games[currentImage].oneLiner || "No description available";
  const descWords = description.split(" ");
  let line = "";
  const descLineHeight = 30;

  descWords.forEach((word) => {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > contentWidth) {
      ctx.fillText(line, contentX, y);
      line = word + " ";
      y += descLineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, contentX, y);

  return y + descLineHeight * 3; // Add spacing after description
};

const drawAchievements = (
  ctx: CanvasRenderingContext2D,
  currentImage: number,
  contentX: number,
  currentY: number,
  contentWidth: number,
  y: number,
  boxHeight: number,
  INNER_PADDING: number
): number => {
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

    drawMedal(ctx, medalX, medalY, medalSize);

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

  return achievementY + INNER_PADDING;
};

const drawMedal = (
  ctx: CanvasRenderingContext2D,
  medalX: number,
  medalY: number,
  medalSize: number
) => {
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
};

const drawImage = (
  ctx: CanvasRenderingContext2D,
  currentImage: number,
  contentX: number,
  currentY: number,
  contentWidth: number,
  y: number,
  boxHeight: number,
  INNER_PADDING: number,
  loadedImages: { [key: string]: HTMLImageElement }
) => {
  const currentSrc = games[currentImage].imageUrl;
  const img = loadedImages[currentSrc];
  if (img) {
    const maxImageWidth = contentWidth;
    const maxImageHeight = y + boxHeight - currentY - INNER_PADDING;

    const scale = Math.min(
      maxImageWidth / img.width,
      maxImageHeight / img.height
    );

    const finalWidth = img.width * scale;
    const finalHeight = img.height * scale;

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
};

const drawProgressBar = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  currentImage: number
) => {
  const progressBarHeight = 40;
  const progressBarY = canvas.height - progressBarHeight;
  const progressWidth = (canvas.width * (currentImage + 1)) / games.length;

  ctx.fillStyle = "#ffff00";
  ctx.fillRect(0, progressBarY, progressWidth, progressBarHeight);
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
