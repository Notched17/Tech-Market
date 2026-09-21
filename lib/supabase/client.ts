import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check your .env.local file."
  );
}

// A single shared browser client. Safe to import into any client component:
// the anon/publishable key only grants what Row Level Security policies allow.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
