"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";
import { CATEGORIES } from "@/lib/types";

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
      <div className="max-w-lg mx-auto px-5 py-16">
        <p>You need to log in to post a job.</p>
      </div>
    );
  }

  if (!loading && profile && profile.role !== "company") {
    return (
      <div className="max-w-lg mx-auto px-5 py-16">
        <p>Only company accounts can post jobs. You&apos;re signed in as a provider.</p>
      </div>
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
    <div className="max-w-lg mx-auto px-5 py-14">
      <h1 className="font-display text-2xl font-semibold mb-1">Post a job</h1>
      <p className="text-ink-soft text-sm mb-8">
        Describe what needs doing. Providers will bid with a price and a note.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Title
          <input
            className="field"
            required
            placeholder="Rebuild our marketing website"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Category
          <select
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
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Description
          <textarea
            className="field"
            required
            rows={6}
            placeholder="What needs to happen, what you already have in place, and any deadlines."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="flex gap-3">
          <label className="flex flex-col gap-1 text-sm flex-1">
            Budget min ($)
            <input
              className="field"
              type="number"
              min={0}
              value={budgetMin}
              onChange={(e) => setBudgetMin(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm flex-1">
            Budget max ($)
            <input
              className="field"
              type="number"
              min={0}
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
            />
          </label>
        </div>

        {error && <p className="text-rust text-sm">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary mt-2">
          {submitting ? "Posting…" : "Post job"}
        </button>
      </form>
    </div>
  );
}
