import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

/**
 * The opener every interior page shares. Deliberately built from the same
 * parts as the home hero — gold hairline eyebrow, light display type, muted
 * supporting line — so an interior page reads as the same site rather than a
 * template with the logo swapped in.
 */
export function PageHeader({ title, subtitle, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-emerald-950/10 bg-[radial-gradient(120%_85%_at_50%_-10%,rgba(198,157,75,.08),transparent_60%),linear-gradient(180deg,#f2f7f3_0%,#fbfdfb_70%,#ffffff_100%)] -mt-16 pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="container relative">
        <div className="max-w-4xl">
          {breadcrumbs && (
            <nav aria-label="Breadcrumb" className="type-label mb-10 flex flex-wrap items-center gap-2 text-emerald-950/45">
              <Link href="/" className="transition-colors hover:text-emerald-700">
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 shrink-0 text-emerald-950/25" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-emerald-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-emerald-700">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {subtitle && (
            <p className="type-label flex items-center gap-3 text-emerald-700">
              <span aria-hidden className="h-px w-6 shrink-0 bg-amber-400" />
              {subtitle}
            </p>
          )}

          <h1 className="type-display mt-6 font-heading text-[2.6rem] text-emerald-950 sm:text-[3.6rem] lg:text-[4.5rem]">
            {title}
          </h1>

          {description && (
            <p className="type-body mt-6 max-w-2xl text-base leading-relaxed text-emerald-950/55 sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
