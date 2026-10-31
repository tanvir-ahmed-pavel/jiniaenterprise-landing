import { JetBrains_Mono } from "next/font/google";

/**
 * The departures-board face: codes, times, prices. Used sparingly. Not
 * preloaded: the board text paints at once in the fallback mono and swaps,
 * so the font never competes with the hero for bandwidth.
 */
export const boardFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});
