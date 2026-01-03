"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

export function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      } else {
        // Redirect to login if not authenticated
        router.push("/admin");
      }
      setIsLoading(false);
    };

    // Skip auth check on login page
    if (pathname === "/admin") {
      setIsLoading(false);
      return;
    }

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // On login page, always render children
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  // On other admin pages, only render if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export function useAdminAuth() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_auth") === "true";
    }
    return false;
  };

  return { logout, isAuthenticated };
}
