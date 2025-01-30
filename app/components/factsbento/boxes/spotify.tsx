import { size, gap } from "../bento";
import { useEffect, useState, useRef } from "react";

interface SpotifyData {
  name: string;
  artist: string;
  album: string;
  albumCover: string;
  progress: number;
  duration: number;
  isPlaying: boolean;
  isRecent?: boolean;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function Spotify() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isFetchingRef = useRef(false);

  const startProgressTracking = (startProgress: number, duration: number) => {
    // Clear any existing intervals/timeouts
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set initial progress
    setCurrentProgress(startProgress);

    // Start progress tracking
    progressInterval.current = setInterval(() => {
      setCurrentProgress((prev) => {
        const newProgress = prev + 1000;
        // If we've reached the end of the song, clear the interval
        if (newProgress >= duration) {
          if (progressInterval.current) clearInterval(progressInterval.current);
          return duration;
        }
        return newProgress;
      });
    }, 1000);

    // Set timeout to fetch new song when this one ends
    const remainingTime = duration - startProgress;
    timeoutRef.current = setTimeout(async () => {
      await fetchData();
    }, remainingTime);
  };

  const fetchData = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const response = await fetch("/api/spotify");
      const result = await response.json();

      if (
        result.message === "No recent tracks found" ||
        result.error ||
        !result.name
      ) {
        setData(null);
        return;
      }

      setData(result);

      // If the song is playing, start tracking its progress
      if (result.isPlaying) {
        startProgressTracking(result.progress, result.duration);
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
      setData(null);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const progress = data
    ? Math.min((currentProgress / data.duration) * 100, 100)
    : 0;
  console.log(data, progress, currentProgress);
  return (
    <div
      className="rounded-lg relative overflow-hidden flex flex-col p-3 gap-3"
      style={{
        height: `${size - gap / 2}px`,
        width: `${size - gap}px`,
        background: "#1db954",
      }}
    >
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-white">
          <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-3">
          {data ? (
            <>
              <img
                src={data.albumCover}
                alt={data.album}
                className="w-full aspect-square object-cover rounded-lg h-[84px]"
              />
              <div className="flex flex-col">
                <div className="font-bold text-sm truncate text-white">
                  {data.name}
                </div>
                <div className="text-xs opacity-75 truncate text-white">
                  {data.artist}
                </div>
              </div>
              {data.isPlaying ? (
                <div className="w-full mt-auto">
                  <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-1000 ease-linear rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] mt-1 opacity-75 text-white">
                    <span>{formatTime(currentProgress)}</span>
                    <span>{formatTime(data.duration)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm font-medium text-center text-[#b5e8c7] mt-auto">
                  Paused
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-full aspect-square bg-black/20 rounded-lg" />
              <div className="flex flex-col">
                <div className="h-4 w-2/3 bg-black/20 rounded mb-1" />
                <div className="h-3 w-1/2 bg-black/20 rounded" />
              </div>
              <div className="text-sm font-medium text-center text-white mt-auto">
                Offline
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
