"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import type { Role } from "@/lib/types";
import { Ticket } from "@/components/Ticket";
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
      body: "Post jobs, compare quotes against your budget, accept one.",
    },
    {
      value: "provider",
      title: "I do tech work",
      body: "Freelancer or small team. Browse open jobs and send quotes.",
    },
  ];

  return (
    <div className="max-w-xl mx-auto px-5 py-12 sm:py-20">
      <Ticket
        as="section"
        stub={
          <>
            <span className="label">New Docket account</span>
            <Link href="/login" className="text-sm link">
              Log in instead
            </Link>
          </>
        }
      >
        <h1 className="text-3xl sm:text-4xl">Create an account</h1>
        <p className="text-ink-2 mt-2">
          Choose the side you&apos;re on. Companies post the work, providers quote for it.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-7">
          <fieldset>
            <legend className="label mb-2">Account type</legend>
            <div className="grid sm:grid-cols-2 gap-3">
              {roles.map((r) => {
                const checked = role === r.value;
                return (
                  <label
                    key={r.value}
                    className={`relative flex flex-col gap-1 cursor-pointer rounded-[2px] border px-4 py-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                      checked
                        ? "border-ink bg-wash shadow-[inset_0_0_0_1px_var(--ink)]"
                        : "border-rule-strong bg-stock hover:border-ink"
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
                      <span
                        aria-hidden="true"
                        className={`grid place-items-center size-4 rounded-full border-2 border-ink ${
                          checked ? "bg-ink" : "bg-stock"
                        }`}
                      >
                        {checked && <span className="size-1.5 rounded-full bg-canary" />}
                      </span>
                      {r.title}
                    </span>
                    <span className="text-sm text-ink-2 pl-6">{r.body}</span>
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
      </Ticket>
    </div>
  );
}
