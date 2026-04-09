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

export function PageHeader({ title, subtitle, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Premium Artistic Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-[120px] -z-10 opacity-60 translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px] -z-10 opacity-50 -translate-x-1/4 translate-y-1/4" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl space-y-6">
          {/* Breadcrumbs — Minimalist */}
          {breadcrumbs && (
            <div className="flex items-center gap-2 opacity-0 animate-fade-in mb-4">
              <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-green-900/40 hover:text-green-600 transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-green-900/20" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-green-900/40 hover:text-green-600 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600">
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {subtitle && (
              <span className="block text-green-600 text-xs font-black uppercase tracking-[0.3em] opacity-0 animate-fade-in-up">
                {subtitle}
              </span>
            )}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-green-950 leading-[0.85] tracking-tight italic opacity-0 animate-fade-in-up animation-delay-100">
              {title}
            </h1>
            {description && (
              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl opacity-0 animate-fade-in-up animation-delay-200">
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
