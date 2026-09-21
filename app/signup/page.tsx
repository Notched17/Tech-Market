"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import type { Role } from "@/lib/types";
import FormField, { FormError } from "@/components/FormField";

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

  const roles: { value: Role; title: string; body: string }[] = [
    {
      value: "company",
      title: "I need tech work done",
      body: "Post jobs, see quotes against your budget, accept one.",
    },
    {
      value: "provider",
      title: "I do tech work",
      body: "Freelancer or small team. Browse open jobs and send quotes.",
    },
  ];

  return (
    <div className="max-w-xl mx-auto px-5 py-12 sm:py-20">
      <section className="sheet">
        <div className="px-6 sm:px-9 pt-8 sm:pt-10 pb-8">
          <h1 className="text-3xl sm:text-4xl">Create an account</h1>
          <p className="text-ink-2 mt-2">
            Choose your side. Companies post the work, providers quote for it.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-7">
            <fieldset>
              <legend className="font-semibold mb-2">Account type</legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {roles.map((r) => {
                  const checked = role === r.value;
                  return (
                    <label
                      key={r.value}
                      className={`relative flex flex-col gap-1 cursor-pointer border px-4 py-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-blue ${
                        checked ? "border-blue bg-tint shadow-[inset_0_0_0_1px_var(--blue)]" : "border-rule-strong bg-sheet hover:border-blue"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={r.value}
                        checked={checked}
                        onChange={() => setRole(r.value)}
                        className="sr-only"
                      />
                      <span className="flex items-center gap-2 font-semibold">
                        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0 text-blue">
                          <circle cx="7" cy="7" r="5.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          {checked && <circle cx="7" cy="7" r="3" fill="currentColor" />}
                        </svg>
                        {r.title}
                      </span>
                      <span className="note pl-[1.375rem]">{r.body}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <FormField id="display-name" label={role === "company" ? "Your name" : "Display name"}>
              <input
                id="display-name"
                className="field"
                autoComplete="name"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </FormField>

            {role === "company" && (
              <FormField id="company-name" label="Company name">
                <input
                  id="company-name"
                  className="field"
                  autoComplete="organization"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </FormField>
            )}

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

            <FormField id="password" label="Password" hint="At least 6 characters.">
              <input
                id="password"
                className="field"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                aria-describedby="password-hint"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>

            {error && <FormError>{error}</FormError>}

            <button type="submit" disabled={submitting} className="btn-primary w-full mt-1">
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>
        <p className="border-t border-rule px-6 sm:px-9 py-4 text-ink-2">
          Already have an account?{" "}
          <Link href="/login" className="link">
            Log in
          </Link>
        </p>
      </section>
    </div>
  );
}
