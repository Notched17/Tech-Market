"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";

export default function NavBar() {
  const { profile, isLoggedIn, loading } = useProfile();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="bg-ink text-paper-raised border-b border-black/20">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Docket
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/jobs" className="hover:text-teal transition-colors">
            Browse jobs
          </Link>
          {!loading && isLoggedIn && (
            <>
              {profile?.role === "company" && (
                <Link href="/jobs/new" className="hover:text-teal transition-colors">
                  Post a job
                </Link>
              )}
              <Link href="/dashboard" className="hover:text-teal transition-colors">
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="hover:text-teal transition-colors">
                Sign out
              </button>
            </>
          )}
          {!loading && !isLoggedIn && (
            <>
              <Link href="/login" className="hover:text-teal transition-colors">
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-teal hover:bg-teal-dark transition-colors rounded px-3 py-1.5 font-medium"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
