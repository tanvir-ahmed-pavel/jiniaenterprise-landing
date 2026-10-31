"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getCounterpartPath, getLocaleForPath } from "@/lib/i18n/alternates";

/** EN | বাংলা. Links to the same page in the other language when it exists. */
export function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname() || "/";
  const locale = getLocaleForPath(pathname);
  const target = getCounterpartPath(pathname);

  const item = (active: boolean) =>
    cn(
      "inline-flex h-11 min-w-11 items-center justify-center px-2 transition-colors",
      active ? "text-emerald-950" : "text-emerald-950/70 hover:text-emerald-950",
    );

  return (
    <nav aria-label="Language" className={cn("flex items-center text-[13px] font-medium", className)}>
      {locale === "en" ? (
        <span aria-current="true" className={item(true)}>EN</span>
      ) : (
        <Link href={target.en} hrefLang="en-BD" lang="en" className={item(false)}>EN</Link>
      )}
      <span aria-hidden className="h-4 w-px bg-emerald-950/20" />
      {locale === "bn" ? (
        <span aria-current="true" lang="bn" className={cn(item(true), "font-bangla")}>বাংলা</span>
      ) : (
        <Link href={target.bn} hrefLang="bn-BD" lang="bn" className={cn(item(false), "font-bangla")}>বাংলা</Link>
      )}
    </nav>
  );
}
