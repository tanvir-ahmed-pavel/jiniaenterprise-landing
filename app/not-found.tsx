"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <div className="glass-glow rounded-3xl p-12 max-w-md mx-auto space-y-6">
          <div className="text-8xl font-bold text-green-600/20 drop-shadow-[0_0_30px_rgba(74,222,128,0.15)]">
            404
          </div>
          <h1 className="text-3xl font-heading font-bold text-green-800">
            Page Not Found
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or deleted.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" /> Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
