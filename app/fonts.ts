import { PT_Serif } from "next/font/google";
import { Rammetto_One } from "next/font/google";
import { Luckiest_Guy } from "next/font/google";
import localFont from "next/font/local";

const jersey15 = localFont({
  src: "./fonts/Jersey15.ttf",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const rammettoOne = Rammetto_One({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const berlinSansFBDemi = localFont({
  src: "./fonts/BRLNSDB.ttf",
});

export { jersey15, ptSerif, rammettoOne, luckiestGuy, berlinSansFBDemi };
