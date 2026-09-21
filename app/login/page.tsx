"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const justSignedUp = params.get("confirm") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="font-display text-2xl font-semibold mb-1">Log in</h1>

      {justSignedUp && (
        <p className="text-sm bg-teal/10 text-teal-dark border border-teal/30 rounded px-3 py-2 mb-6">
          Account created. If email confirmation is on for this project,
          check your inbox before logging in.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p className="text-rust text-sm">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary mt-2">
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="text-sm text-ink-soft mt-6">
        Need an account?{" "}
        <Link href="/signup" className="text-teal-dark font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
