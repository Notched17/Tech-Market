"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";

// Wordmark: the name set over a dimension line, the drafting mark for a measured span.
export function Wordmark() {
  return (
    <span className="inline-flex flex-col items-stretch leading-none">
      <span className="text-[1.375rem] font-extrabold tracking-[-0.03em] text-ink">Docket</span>
      <svg viewBox="0 0 80 8" preserveAspectRatio="none" className="mt-1 h-2 w-full text-blue" aria-hidden="true">
        <path d="M0.75 0v8M79.25 0v8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1.5 4H78.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 4L7 1.5V6.5zM78.5 4L73 1.5V6.5z" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function NavBar() {
  const { profile, isLoggedIn, loading } = useProfile();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const links: { href: string; label: string }[] = [{ href: "/jobs", label: "Open jobs" }];
  if (!loading && isLoggedIn) {
    if (profile?.role === "company") links.push({ href: "/jobs/new", label: "Post a job" });
    links.push({ href: "/dashboard", label: profile?.role === "company" ? "Your jobs" : "Your quotes" });
  }

  const linkClass = (href: string) =>
    `relative inline-flex items-center min-h-11 font-medium transition-colors hover:text-blue ${
      pathname === href
        ? "text-blue after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-blue"
        : "text-ink"
    }`;

  return (
    <header className="relative bg-sheet border-b border-rule-strong">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between gap-6 h-16">
        <Link href="/" className="inline-flex items-center min-h-11" aria-label="Docket home">
          <Wordmark />
        </Link>

        <button
          type="button"
          className="sm:hidden btn-quiet btn-sm"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="site-nav"
          aria-label="Main"
          className={`${open ? "flex" : "hidden"} sm:flex absolute sm:static inset-x-0 top-16 z-40 flex-col sm:flex-row sm:items-center gap-1 sm:gap-7 bg-sheet border-b sm:border-0 border-rule-strong px-5 pb-4 sm:p-0`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={linkClass(l.href)}
              aria-current={pathname === l.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {!loading && isLoggedIn && (
            <div className="flex items-center gap-4 sm:pl-7 sm:border-l border-rule">
              {profile && (
                <span className="leading-tight">
                  <span className="block font-semibold truncate max-w-44">
                    {profile.role === "company" ? profile.company_name || profile.display_name : profile.display_name}
                  </span>
                  <span className="note">{profile.role === "company" ? "Company account" : "Provider account"}</span>
                </span>
              )}
              <button onClick={handleSignOut} className="btn-quiet btn-sm">
                Sign out
              </button>
            </div>
          )}

          {!loading && !isLoggedIn && (
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/login" className={linkClass("/login")} onClick={() => setOpen(false)}>
                Log in
              </Link>
              <Link href="/signup" className="btn-primary btn-sm" onClick={() => setOpen(false)}>
                Create account
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
