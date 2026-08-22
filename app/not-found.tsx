import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-8 px-4 max-w-lg">
        <div className="space-y-4">
          <p className="text-8xl font-heading font-black text-emerald-600/20">404</p>
          <h1 className="text-3xl font-heading font-bold text-emerald-950">
            Page not found
          </h1>
          <p className="text-gray-600">
            That URL is not available. Try the fleet, services, or contact desk
            instead.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button className="gap-2 rounded-full bg-emerald-900">
              <Home className="h-4 w-4" /> Home
            </Button>
          </Link>
          <Link href="/vehicles">
            <Button variant="outline" className="gap-2 rounded-full">
              Fleet <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/car-rental-dhaka">
            <Button variant="ghost" className="rounded-full">
              Car rental Dhaka
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="rounded-full">
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
