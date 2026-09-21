"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2">
      {/* A tag-style work ticket with its string hole. */}
      <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true" className="shrink-0">
        <path
          d="M5 1h12l4 4v19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5z"
          fill="var(--canary)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        <circle cx="11" cy="6.5" r="2" fill="var(--desk)" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M5 13h12M5 17h12M5 21h7" stroke="var(--ink)" strokeWidth="1.5" />
      </svg>
      <span className="text-2xl font-extrabold tracking-tight" style={{ fontStretch: "70%" }}>
        Docket
      </span>
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
    links.push({ href: "/dashboard", label: profile?.role === "company" ? "Your jobs" : "Your bids" });
  }

  const linkClass = (href: string) =>
    `relative inline-flex items-center min-h-11 px-1 font-medium transition-colors hover:text-ink ${
      pathname === href
        ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-canary"
        : "text-ink-2"
    }`;

  return (
    <header className="relative bg-stock border-b border-rule-strong">
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
          className={`${open ? "flex" : "hidden"} sm:flex absolute sm:static inset-x-0 top-16 z-40 flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 bg-stock border-b sm:border-0 border-rule-strong px-5 pb-4 sm:p-0`}
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
            <div className="flex items-center gap-4 sm:pl-6 sm:border-l border-rule">
              {profile && (
                <span className="text-sm text-ink-2 leading-tight">
                  <span className="block font-semibold text-ink truncate max-w-40">
                    {profile.role === "company"
                      ? profile.company_name || profile.display_name
                      : profile.display_name}
                  </span>
                  <span className="label text-[0.8125rem]">
                    {profile.role === "company" ? "Company" : "Provider"}
                  </span>
                </span>
              )}
              <button onClick={handleSignOut} className="btn-quiet btn-sm">
                Sign out
              </button>
            </div>
          )}

          {!loading && !isLoggedIn && (
            <div className="flex items-center gap-3 sm:gap-4">
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
