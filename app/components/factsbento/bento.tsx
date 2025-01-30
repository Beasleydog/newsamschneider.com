import Burgers from "./boxes/burgers";
import Scratch from "./boxes/scratch";
import Beasley from "./boxes/beasley";
import Bowling from "./boxes/bowling";
import Instruments from "./boxes/instruments";
import Spotify from "./boxes/spotify";
import Button from "./boxes/button";
import Sam from "./boxes/sam";
import Levi from "./boxes/levi";
import PingPong from "./boxes/pingpong";
import Seconds from "./boxes/seconds";
export const size = 200;
export const gap = 10;

export default function Bento() {
  return (
    <div className="flex flex-row items-center justify-center p-4">
      <div
        className={` flex flex-col items-center justify-center`}
        style={{
          height: `${size * 4 + gap * 2}px`,
          width: `${size * 3 + gap * 2}px`,
        }}
      >
        <div
          className={` flex flex-row items-center justify-center`}
          style={{
            height: `${size * 2 + gap * 2}px`,
            width: `${size * 3 + gap * 2}px`,
            gap: `${gap}px`,
          }}
        >
          <Burgers />
          <div
            className={`flex flex-col items-center justify-center`}
            style={{
              gap: `${gap}px`,
            }}
          >
            <Scratch />
            <div
              className="flex flex-row items-center justify-center"
              style={{
                gap: `${gap}px`,
              }}
            >
              <Bowling />
              <Instruments />
            </div>
          </div>
        </div>
        <div
          className={` flex flex-row items-center justify-center`}
          style={{
            height: `${size}px`,
            width: `${size * 3 + gap * 2}px`,
            gap: `${gap}px`,
          }}
        >
          <Button />
          <Spotify />
        </div>
        <div
          className={` flex flex-row items-center justify-center`}
          style={{
            height: `${size}px`,
            width: `${size * 3 + gap * 2}px`,
            gap: `${gap}px`,
            paddingTop: `${gap}px`,
          }}
        >
          <Levi />
          <PingPong />
        </div>
      </div>
      <div
        className={` flex flex-col items-center justify-center`}
        style={{
          height: `${size * 4 + gap * 2}px`,
          width: `${size}px`,
          gap: `${gap}px`,
          paddingTop: `${gap}px`,
        }}
      >
        <Beasley />
        <Sam />
        <Seconds />
      </div>
    </div>
  );
}
