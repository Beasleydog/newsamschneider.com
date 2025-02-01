import { size, gap } from "../bento";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

export default function Button() {
  const [buttonClicks, setButtonClicks] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastOptimisticUpdate, setLastOptimisticUpdate] = useState<
    number | null
  >(null);

  const fetchCount = async () => {
    const res = await fetch("/api/button/get", {
      cache: "no-store",
    });
    const count = await res.json();
    // Only update if we haven't made an optimistic update recently
    if (!lastOptimisticUpdate || Date.now() - lastOptimisticUpdate > 2000) {
      setButtonClicks((prev) => (count > prev ? count : prev));
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchCount().then(() => setIsLoading(false));

    // Set up polling
    const interval = setInterval(fetchCount, 60 * 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const handleClick = async () => {
    // Optimistic update
    setButtonClicks((prev) => prev + 1);
    setLastOptimisticUpdate(Date.now());

    try {
      const res = await fetch("/api/button/increment", {
        cache: "no-store",
      });
      const newCount = await res.json();
      setButtonClicks((prev) => (newCount > prev ? newCount : prev));
    } catch (error) {
      // Revert optimistic update on error
      setButtonClicks((prev) => prev - 1);
      console.error("Failed to increment count:", error);
    } finally {
      // Clear optimistic update timestamp after 2 seconds
      setTimeout(() => setLastOptimisticUpdate(null), 2000);
    }
  };

  return (
    <div
      className={`flex flex-row bg-[#e86060] rounded-lg overflow-hidden text-[4.7rem] font-bold p-4 text-[#3e2a06]`}
      style={{
        height: `${size - gap / 2}px`,
        width: `${size * 2}px`,
      }}
    >
      <div className="w-1/2 flex flex-col justify-around items-end pr-4">
        <span className="text-center text-[1rem] font-bold text-[#833939]">
          this button has been clicked
        </span>
        <span className="w-full text-center text-[2.5rem] text-white font-bold leading-10">
          {isLoading ? (
            <svg className="animate-spin h-12 w-12 mx-auto" viewBox="0 0 24 24">
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
          ) : (
            <>
              <span className="text-[3rem]">
                <NumberFlow value={buttonClicks} />
              </span>{" "}
              <br />
              times
            </>
          )}
        </span>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <button
          className="bg-white rounded-[50%] overflow-hidden w-[150px] h-[150px] transition-transform duration-100 ease-in-out active:translate-y-1 hover:scale-[0.98]"
          onClick={handleClick}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          disabled={isLoading}
          style={{
            backgroundImage: `url(${"buttonface.svg"})`,
            backgroundSize: "40%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: isPressed
              ? "0 1px 2px 0 rgba(0, 0, 0, 0.25), inset 0 1px 5px 0 rgba(0, 0, 0, 0.25)"
              : "0 4px 4px 0 rgba(0, 0, 0, 0.25), inset 0 -3px 5px 0 rgba(0, 0, 0, 0.25)",
            transform: isPressed ? "translateY(2px)" : "translateY(0)",
            transition: "all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)",
            opacity: isLoading ? 0.7 : 1,
          }}
        ></button>
      </div>
    </div>
  );
}
