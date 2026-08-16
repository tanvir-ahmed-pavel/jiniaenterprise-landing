import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SilkRibbonBackdrop } from "@/components/ui/SilkRibbonBackdrop";

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

export function PageHeader({ title, subtitle, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Signature Diagonal Silk Ribbon Backdrop */}
      <SilkRibbonBackdrop className="opacity-55" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl space-y-6">
          {/* Breadcrumbs — Minimalist */}
          {breadcrumbs && (
            <div className="flex items-center gap-2 opacity-0 animate-fade-in mb-4">
              <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/50 hover:text-emerald-700 transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-emerald-900/30" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/50 hover:text-emerald-700 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 font-extrabold">
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {subtitle && (
              <span className="inline-block text-emerald-800 text-xs font-black uppercase tracking-[0.25em] bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200 opacity-0 animate-fade-in-up">
                {subtitle}
              </span>
            )}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-emerald-950 leading-[0.9] tracking-tight opacity-0 animate-fade-in-up animation-delay-100">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl opacity-0 animate-fade-in-up animation-delay-200">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
          <span className="text-[15rem] font-heading font-black italic select-none pointer-events-none">
            {title.split(" ")[0]}
          </span>
        </div>
      </div>
    </section>
  );
}
