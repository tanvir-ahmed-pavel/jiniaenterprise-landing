"use client";

import { AdminAuthWrapper } from "@/components/admin/AdminAuthWrapper";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin") {
    return <AdminAuthWrapper>{children}</AdminAuthWrapper>;
  }

  return (
    <AdminAuthWrapper>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-gray-50">{children}</main>
      </div>
    </AdminAuthWrapper>
  );
}
