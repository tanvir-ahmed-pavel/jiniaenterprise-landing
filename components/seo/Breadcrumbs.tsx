import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  includeJsonLd?: boolean;
  className?: string;
};

export function Breadcrumbs({
  items,
  includeJsonLd = true,
  className,
}: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <>
      {includeJsonLd ? <JsonLd data={getBreadcrumbSchema(items)} /> : null}
      <nav aria-label="Breadcrumb" className={cn("mb-4", className)}>
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
                {index > 0 ? (
                  <ChevronRight
                    className="h-3 w-3 text-emerald-900/30"
                    aria-hidden
                  />
                ) : null}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/50 hover:text-emerald-700 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
