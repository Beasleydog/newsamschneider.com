import { size, gap } from "../bento";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

export default function Seconds() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const birthDate = new Date("2006-04-03T11:10:00");

    const calculateSeconds = () => {
      const now = new Date();
      const diffInSeconds = Math.floor(
        (now.getTime() - birthDate.getTime()) / 1000
      );
      setSeconds(diffInSeconds);
    };

    calculateSeconds();
    const interval = setInterval(calculateSeconds, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-[#ff79b4] rounded-lg overflow-hidden text-[4.7rem] font-bold p-4"
      style={{
        height: `${size - gap / 2}px`,
        width: `${size}px`,
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-[1.5rem] leading-[2.2rem] font-bold text-[#653144]">
          i'm
        </span>
        <span className="text-[1.8rem] leading-[1.5rem] font-bold text-[#492331]">
          <NumberFlow style={{ height: "1.5rem" }} value={seconds} />
        </span>
        <span className="text-[1.5rem] mt-2 leading-[1rem] text-[#653144] font-bold mt-2">
          seconds old
        </span>
      </div>
    </div>
  );
}
