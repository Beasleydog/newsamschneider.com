import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingProps {
  onLoadingComplete: () => void;
}

export default function Loading({ onLoadingComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadedAssets = new Set();
    let totalAssets = 0;

    const updateProgress = () => {
      const progress = (loadedAssets.size / totalAssets) * 100;
      setProgress(progress);

      if (progress === 100) {
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    };

    const handleLoad = (element: HTMLElement) => {
      loadedAssets.add(element);
      updateProgress();
    };

    // Function to check if all images and videos are loaded
    const checkAllAssetsLoaded = () => {
      const images = document.getElementsByTagName("img");
      const videos = document.getElementsByTagName("video");

      totalAssets = images.length + videos.length;
      if (totalAssets === 0) {
        onLoadingComplete();
        return;
      }

      // Check images
      Array.from(images).forEach((img) => {
        if (img.complete) {
          handleLoad(img);
        } else {
          img.addEventListener("load", () => handleLoad(img));
          img.addEventListener("error", () => handleLoad(img));
        }
      });

      // Check videos
      Array.from(videos).forEach((video) => {
        if (video.readyState >= 3) {
          handleLoad(video);
        } else {
          video.addEventListener("canplay", () => handleLoad(video));
          video.addEventListener("error", () => handleLoad(video));
        }
      });
    };

    // Start checking assets after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(checkAllAssetsLoaded, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      const images = document.getElementsByTagName("img");
      const videos = document.getElementsByTagName("video");

      Array.from(images).forEach((img) => {
        img.removeEventListener("load", () => handleLoad(img));
        img.removeEventListener("error", () => handleLoad(img));
      });

      Array.from(videos).forEach((video) => {
        video.removeEventListener("canplay", () => handleLoad(video));
        video.removeEventListener("error", () => handleLoad(video));
      });
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-row items-center gap-2">
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-lg text-gray-400 w-6">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
