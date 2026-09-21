"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import type { Job } from "@/lib/types";

function formatBudget(job: Job) {
  if (job.budget_min && job.budget_max) return `$${job.budget_min} – $${job.budget_max}`;
  if (job.budget_min) return `From $${job.budget_min}`;
  if (job.budget_max) return `Up to $${job.budget_max}`;
  return "Budget not set";
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("jobs")
      .select("*, company:profiles(display_name, company_name)")
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setJobs(data as unknown as Job[]);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <h1 className="font-display text-3xl font-semibold mb-1">Open jobs</h1>
      <p className="text-ink-soft mb-8">Tech work companies need done, open for bids.</p>

      {error && <p className="text-rust text-sm">{error}</p>}
      {jobs === null && !error && <p className="text-ink-soft text-sm">Loading…</p>}
      {jobs?.length === 0 && (
        <p className="text-ink-soft text-sm border border-dashed border-border rounded p-6">
          No open jobs yet. Once a company posts one, it shows up here.
        </p>
      )}

      <ul className="flex flex-col divide-y divide-border border-t border-b border-border">
        {jobs?.map((job) => (
          <li key={job.id} className="py-5">
            <Link href={`/jobs/${job.id}`} className="group">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-lg font-semibold group-hover:text-teal-dark transition-colors">
                  {job.title}
                </h2>
                <span className="text-sm text-ink-soft whitespace-nowrap">
                  {formatBudget(job)}
                </span>
              </div>
              <p className="text-sm text-ink-soft mt-1">
                {job.category} · posted by{" "}
                {job.company?.company_name || job.company?.display_name || "a company"}
              </p>
              <p className="text-sm text-ink mt-2 line-clamp-2">{job.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
