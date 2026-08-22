import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type RelatedLink = {
  href: string;
  label: string;
};

type RelatedLinksProps = {
  links: RelatedLink[];
  title?: string;
  className?: string;
};

export function RelatedLinks({
  links,
  title = "Related pages",
  className,
}: RelatedLinksProps) {
  if (!links.length) return null;

  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-xl font-heading font-black text-emerald-950">{title}</h2>
      <ul className="flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              {link.label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
