"use client";

import { usePathname } from "next/navigation";
import { RequestWizard } from "@/components/wizard/RequestWizard";
import { siteConfig } from "@/lib/config";

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
    <div id="top" className="jinia-site min-h-screen bg-white">
      {background}
      {navbar}
      <div className="flex-1 relative z-0 pt-16">{children}</div>
      {footer}
      <RequestWizard whatsapp={siteConfig.whatsapp} phone={siteConfig.phone} />
    </div>
  );
}
