"use client";

import { usePathname } from "next/navigation";

export function SiteShell({
  navbar,
  footer,
  background,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  background: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="jinia-site min-h-screen bg-white">
      {background}
      {navbar}
      <div className="flex-1 relative z-0 pt-16">{children}</div>
      {footer}
    </div>
  );
}
