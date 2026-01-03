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
