import type { Metadata } from "next";
import "./globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import NotFound from "./(site)/not-found";

export const metadata: Metadata = {
  title: "Page not found | Jinia Enterprise",
  robots: { index: false, follow: true },
};

/** Unmatched URLs: the site has two root layouts (en, bn), so the 404 brings its own document. */
export default function GlobalNotFound() {
  return (
    <RootDocument lang="en-BD">
      <NotFound />
    </RootDocument>
  );
}
