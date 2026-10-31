import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { BanglaPageShell } from "@/components/seo/BanglaPageShell";
import { getBnPage } from "@/content/bn/pages";

const PATH = "/bn/car-rental-with-driver";
const page = getBnPage(PATH);

export const metadata = page
  ? createMetadata({ title: page.metaTitle, description: page.metaDescription, path: PATH })
  : {};

export default function Page() {
  if (!page) notFound();
  return <BanglaPageShell page={page} />;
}
