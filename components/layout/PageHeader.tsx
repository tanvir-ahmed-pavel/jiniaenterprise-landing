import Link from "next/link";

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

/** Split off the last word so it can take the serif accent, as the home headlines do. */
function accentTitle(title: string) {
  const trimmed = title.trim();
  const cut = trimmed.lastIndexOf(" ");
  if (cut < 0) return { head: "", tail: trimmed };
  return { head: trimmed.slice(0, cut + 1), tail: trimmed.slice(cut + 1) };
}

/**
 * The opener every interior page shares, built from the home page's parts:
 * white ground, heavy grotesk headline ending on a gold serif word, a short
 * lede. Mobile first — the headline is sized for a phone and scales up.
 */
export function PageHeader({ title, subtitle, description, breadcrumbs }: PageHeaderProps) {
  const { head, tail } = accentTitle(title);
  return (
    <section className="relative -mt-16 border-b border-ink/10 bg-white pb-12 pt-28 text-ink sm:pb-16 md:pt-36">
      <div className="container">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] text-ink/45 sm:mb-10">
            <Link href="/" className="transition-colors hover:text-ink">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span aria-hidden className="text-ink/25">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-ink">{crumb.label}</Link>
                ) : (
                  <span aria-current="page" className="text-ink/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            {subtitle && (
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">{subtitle}</p>
            )}
            <h1 className="type-display mt-4 font-heading text-[clamp(2.6rem,9vw,5.6rem)] [overflow-wrap:anywhere]">
              {head}
              <span className="type-accent text-gold-deep">{tail}</span>
            </h1>
          </div>
          {description && (
            <p className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg lg:pb-2">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
