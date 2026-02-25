import { Press_Start_2P } from "next/font/google";

export const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false, // 주요 폰트가 아니므로 preload 제외
});
