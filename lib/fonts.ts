import { Hind_Siliguri, JetBrains_Mono } from "next/font/google";

/** Bangla text only: loaded by the /bn layout, nowhere else. */
export const banglaFont = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

/** The departures-board face: codes, times, prices. Used sparingly. */
export const boardFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});
