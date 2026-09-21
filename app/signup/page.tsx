"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import type { Role } from "@/lib/types";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("company");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Something went wrong signing up.");
      setSubmitting(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      role,
      display_name: displayName,
      company_name: role === "company" ? companyName : null,
    });

    if (profileError) {
      setError(profileError.message);
      setSubmitting(false);
      return;
    }

    // If email confirmation is required on this project, there is no
    // session yet — send people to log in instead of the dashboard.
    if (data.session) {
      router.push("/dashboard");
    } else {
      router.push("/login?confirm=1");
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="font-display text-2xl font-semibold mb-1">Create an account</h1>
      <p className="text-ink-soft text-sm mb-8">
        Join as a company posting work, or a provider bidding on it.
      </p>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setRole("company")}
          className={`flex-1 rounded border px-3 py-2 text-sm font-medium transition-colors ${
            role === "company"
              ? "border-teal bg-teal/10 text-teal-dark"
              : "border-border text-ink-soft"
          }`}
        >
          I need work done
        </button>
        <button
          type="button"
          onClick={() => setRole("provider")}
          className={`flex-1 rounded border px-3 py-2 text-sm font-medium transition-colors ${
            role === "provider"
              ? "border-teal bg-teal/10 text-teal-dark"
              : "border-border text-ink-soft"
          }`}
        >
          I do tech work
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          {role === "company" ? "Your name" : "Display name"}
          <input
            className="field"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>

        {role === "company" && (
          <label className="flex flex-col gap-1 text-sm">
            Company name
            <input
              className="field"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </label>
        )}

        <label className="flex flex-col gap-1 text-sm">
          Email
          <input
            className="field"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Password
          <input
            className="field"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p className="text-rust text-sm">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary mt-2">
          {submitting ? "Creating account…" : "Sign up"}
        </button>
      </form>

      <p className="text-sm text-ink-soft mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-teal-dark font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
