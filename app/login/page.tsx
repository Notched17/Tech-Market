"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import FormField, { FormError } from "@/components/FormField";

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
    <div className="max-w-md mx-auto px-5 py-12 sm:py-20">
      <section className="sheet">
        <div className="px-6 sm:px-9 pt-8 sm:pt-10 pb-8">
          <h1 className="text-3xl sm:text-4xl">Log in</h1>

          {justSignedUp && (
            <p role="status" className="mt-5 border border-blue bg-tint px-4 py-3 text-sm">
              Account created. If this project asks you to confirm your email, open the link in your
              inbox first, then log in here.
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-7">
            <FormField id="email" label="Email">
              <input
                id="email"
                className="field"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            <FormField id="password" label="Password">
              <input
                id="password"
                className="field"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>

            {error && <FormError>{error}</FormError>}

            <button type="submit" disabled={submitting} className="btn-primary w-full mt-1">
              {submitting ? "Logging in…" : "Log in"}
            </button>
          </form>
        </div>
        <p className="border-t border-rule px-6 sm:px-9 py-4 text-ink-2">
          New to Docket?{" "}
          <Link href="/signup" className="link">
            Create an account
          </Link>
        </p>
      </section>
    </div>
  );
}
