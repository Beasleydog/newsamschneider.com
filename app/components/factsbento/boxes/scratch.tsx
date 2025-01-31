import { size, gap } from "../bento";
import { useEffect, useState } from "react";

export default function Scratch() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/scratchviews")
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, []);

  return (
    <div
      className={`relative bg-[#f7a618] rounded-lg overflow-hidden text-[4.7rem] font-bold p-4 text-[#3e2a06]`}
      style={{
        height: `${size - gap / 2}px`,
        width: `${size * 2 - gap}px`,
      }}
    >
      <div className="flex flex-col items-end pr-4">
        <span className="text-[5rem] font-bold h-[100px] flex justify-center items-center">
          {views === null ? (
            <svg className="animate-spin h-12 w-12" viewBox="0 0 24 24">
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
            views.toLocaleString()
          )}
        </span>
        <span className="text-[1.7rem] text-[#8b5d0d] font-bold">
          views on Scratch
        </span>
      </div>
      <img
        src="/scratch.png"
        className="absolute bottom-0 left-0"
        style={{
          height: `${size * 0.6}px`,
          width: `${size * 0.6}px`,
        }}
      />
      <></>
    </div>
  );
}
