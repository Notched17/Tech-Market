"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import type { Job } from "@/lib/types";
import { formatBudget, ticketNo, timeAgo } from "@/lib/format";
import { PageShell, PageHeader, EmptyState, ErrorNote, SkeletonRows } from "@/components/States";

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
    <PageShell>
      <PageHeader
        title="Open jobs"
        lede={
          jobs && jobs.length > 0
            ? `${jobs.length} ${jobs.length === 1 ? "job" : "jobs"} taking quotes, newest first.`
            : "Tech work companies need done, taking quotes now."
        }
      />

      {error && <ErrorNote>Couldn&apos;t load jobs: {error}</ErrorNote>}
      {jobs === null && !error && <SkeletonRows rows={5} label="Loading open jobs" />}
      {jobs?.length === 0 && (
        <EmptyState title="No open jobs right now">
          When a company posts a job it appears here, newest first. Check back soon.
        </EmptyState>
      )}

      {jobs && jobs.length > 0 && (
        <div className="bg-stock border border-rule-strong rounded-[2px]">
          <div
            aria-hidden="true"
            className="hidden md:grid grid-cols-[5.5rem_minmax(0,1fr)_11rem_9.5rem_7rem] gap-x-6 px-6 py-3 border-b-2 border-ink label"
          >
            <span>No.</span>
            <span>Job</span>
            <span>Category</span>
            <span className="text-right">Budget</span>
            <span className="text-right">Posted</span>
          </div>
          <ul className="ruled">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="group relative grid grid-cols-[1fr_auto] md:grid-cols-[5.5rem_minmax(0,1fr)_11rem_9.5rem_7rem] gap-x-6 gap-y-1.5 px-5 md:px-6 py-5 transition-colors hover:bg-wash focus-within:bg-wash"
              >
                <span className="ticket-no text-ink-2 text-sm md:pt-1 order-1 md:order-none">
                  No. {ticketNo(job.id)}
                </span>
                <div className="col-span-2 md:col-span-1 order-3 md:order-none min-w-0">
                  <h2 className="text-xl leading-snug">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="after:absolute after:inset-0 underline decoration-transparent group-hover:decoration-ink underline-offset-4 transition-colors"
                    >
                      {job.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-ink-2 mt-0.5">
                    {job.company?.company_name || job.company?.display_name || "A company"}
                  </p>
                  <p className="text-ink-2 mt-2 line-clamp-2 max-w-prose">{job.description}</p>
                </div>
                <span className="order-4 md:order-none text-sm md:text-base md:pt-1">
                  {job.category}
                </span>
                <span className="order-2 md:order-none num font-semibold text-right md:pt-1">
                  {formatBudget(job)}
                </span>
                <span className="order-5 md:order-none text-sm text-ink-2 text-right md:pt-1.5">
                  <time dateTime={job.created_at}>{timeAgo(job.created_at)}</time>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </PageShell>
  );
}
