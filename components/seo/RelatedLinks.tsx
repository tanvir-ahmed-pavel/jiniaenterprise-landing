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
      <h2 className="text-xl font-heading font-medium text-emerald-950">{title}</h2>
      <ul className="flex flex-wrap gap-x-5 gap-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center gap-1.5 border-b border-emerald-950/25 pb-1 text-sm font-normal text-emerald-900 transition-colors hover:border-emerald-700 hover:text-emerald-700"
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
