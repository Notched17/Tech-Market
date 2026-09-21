"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";
import { CATEGORIES } from "@/lib/types";
import Link from "next/link";
import { Ticket } from "@/components/Ticket";
import FormField, { FormError } from "@/components/FormField";
import { Notice } from "@/components/States";

export default function NewJobPage() {
  const router = useRouter();
  const { profile, loading, isLoggedIn } = useProfile();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && !isLoggedIn) {
    return (
      <Notice
        title="Log in to post a job"
        action={
          <>
            <Link href="/login" className="btn-primary">
              Log in
            </Link>
            <Link href="/signup" className="btn-quiet">
              Create a company account
            </Link>
          </>
        }
      >
        Jobs are posted from a company account, so providers know who they&apos;re quoting for.
      </Notice>
    );
  }

  if (!loading && profile && profile.role !== "company") {
    return (
      <Notice
        title="Only company accounts post jobs"
        action={
          <Link href="/jobs" className="btn-primary">
            Browse open jobs
          </Link>
        }
      >
        You&apos;re signed in as a provider. Providers quote on jobs rather than posting them.
      </Notice>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { data, error: insertError } = await supabase
      .from("jobs")
      .insert({
        company_id: profile!.id,
        title,
        category,
        description,
        budget_min: budgetMin ? Number(budgetMin) : null,
        budget_max: budgetMax ? Number(budgetMax) : null,
      })
      .select()
      .single();

    if (insertError || !data) {
      setError(insertError?.message ?? "Could not post the job.");
      setSubmitting(false);
      return;
    }

    router.push(`/jobs/${data.id}`);
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 sm:py-14 grid lg:grid-cols-12 gap-x-10 gap-y-10 items-start">
      <div className="lg:col-span-8">
        <h1 className="text-4xl sm:text-5xl">Post a job</h1>
        <p className="text-ink-2 text-lg mt-3 max-w-xl">
          Describe what needs doing. Providers reply with a price and a note, and you choose one.
        </p>

        <Ticket
          as="section"
          className="mt-8"
          stub={
            <>
              <span className="label">New job ticket</span>
              <span className="text-sm text-ink-2">Number assigned when posted</span>
            </>
          }
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FormField id="title" label="Job title" hint="One line a provider can scan, e.g. what and where.">
              <input
                id="title"
                className="field text-lg"
                required
                aria-describedby="title-hint"
                placeholder="Rebuild our marketing website"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormField>

            <FormField id="category" label="Category">
              <select
                id="category"
                className="field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              id="description"
              label="What needs doing"
              hint="What you have now, what should change, and any deadline. Plain language is fine."
            >
              <textarea
                id="description"
                className="field"
                required
                rows={7}
                aria-describedby="description-hint"
                placeholder="We run a 12-page WordPress site that's slow on phones. We'd like it rebuilt on something easier to edit, live before the end of next month."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormField>

            <fieldset className="border-t border-rule pt-5">
              <legend className="label pr-3">Budget range (USD)</legend>
              <p id="budget-hint" className="text-sm text-ink-2 mt-1">
                Optional. A range helps providers price realistically.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <FormField id="budget-min" label="From">
                  <div className="field-affix">
                    <span aria-hidden="true">$</span>
                    <input
                      id="budget-min"
                      className="field num"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      aria-describedby="budget-hint"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                    />
                  </div>
                </FormField>
                <FormField id="budget-max" label="Up to">
                  <div className="field-affix">
                    <span aria-hidden="true">$</span>
                    <input
                      id="budget-max"
                      className="field num"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      aria-describedby="budget-hint"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                    />
                  </div>
                </FormField>
              </div>
            </fieldset>

            {error && <FormError>{error}</FormError>}

            <div className="flex flex-wrap items-center gap-4 border-t border-rule pt-6">
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? "Posting job…" : "Post job"}
              </button>
              <span className="text-sm text-ink-2">It goes live on the open jobs list straight away.</span>
            </div>
          </form>
        </Ticket>
      </div>

      <aside className="lg:col-span-4 lg:pt-28" aria-labelledby="tips-heading">
        <h2 id="tips-heading" className="text-2xl">What gets better quotes</h2>
        <ul className="mt-4 ruled border-y border-rule text-ink-2">
          <li className="py-3">
            <strong className="text-ink font-semibold">Say what exists today.</strong> The current
            site, system or setup, and who uses it.
          </li>
          <li className="py-3">
            <strong className="text-ink font-semibold">Say what done looks like.</strong> Providers
            price the outcome, so name it.
          </li>
          <li className="py-3">
            <strong className="text-ink font-semibold">Give a range, not a single number.</strong>{" "}
            You&apos;ll see how each quote sits against it.
          </li>
          <li className="py-3">
            <strong className="text-ink font-semibold">Mention timing.</strong> A deadline or
            &ldquo;flexible&rdquo; both help.
          </li>
        </ul>
      </aside>
    </div>
  );
}
