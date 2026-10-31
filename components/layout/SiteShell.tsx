"use client";

import { usePathname } from "next/navigation";

export function SiteShell({
  navbar,
  footer,
  background,
  mobileBar,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  background: React.ReactNode;
  mobileBar?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    // Bottom padding on phones keeps the footer clear of the fixed action bar.
    <div className="jinia-site min-h-screen bg-white pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
      {background}
      {navbar}
      <div className="flex-1 relative z-0 pt-16">{children}</div>
      {footer}
      {mobileBar}
    </div>
  );
}
