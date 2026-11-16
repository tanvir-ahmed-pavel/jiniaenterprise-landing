import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

export function createStaticClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a dummy client or throw a handled error?
    // Returning null might break return type.
    // Let's throw a specific error we can catch, or just return empty.
    // Actually, createClient requires string.
    console.warn("Supabase keys missing during build static generation.");
    return null;
  }

  return createClient<Database>(url, key);
}

/**
 * Anonymous, cookie-free client for public reads (fleet, blog, booking form).
 * It never touches `cookies()`, so pages that use it can be prerendered and
 * cached at the edge. Only published / active rows are read through it.
 */
export function createPublicReadClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
