import { size, gap } from "../bento";

export default function Instruments() {
  return (
    <div
      className="bg-white rounded-lg"
      style={{
        height: `${size - gap / 2}px`,
        width: `${size - gap}px`,
        backgroundImage: `url('/Instruments.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}
