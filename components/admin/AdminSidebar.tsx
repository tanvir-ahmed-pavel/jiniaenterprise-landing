"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "./AdminAuthWrapper";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Car,
  FileText,
  Calendar,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vehicles", label: "Vehicles", icon: Car },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Jinia Enterprise"
            className="h-10 w-auto"
          />
          <span className="font-bold text-lg">Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
        <Link href="/" className="block mt-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-gray-800 text-sm"
          >
            ← Back to Website
          </Button>
        </Link>
      </div>
    </aside>
  );
}
