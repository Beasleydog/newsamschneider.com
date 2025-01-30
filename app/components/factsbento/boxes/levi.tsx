import { size, gap } from "../bento";

export default function Levi() {
  return (
    <div
      className="bg-[#f1e375] rounded-lg"
      style={{
        height: `${size - gap / 2}px`,
        width: `${size}px`,
        backgroundImage: `url('/levi.png')`,
        backgroundSize: "80%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}
