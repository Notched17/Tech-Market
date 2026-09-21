"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import type { Job } from "@/lib/types";
import { formatBudget, sheetNo, timeAgo, formatDate } from "@/lib/format";
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

  const cols = "md:grid-cols-[6rem_minmax(0,1fr)_11rem_9.5rem_7rem]";

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
        <div className="sheet">
          <div aria-hidden="true" className={`hidden md:grid ${cols} gap-x-6 px-6 py-3 border-b-[1.5px] border-ink note font-semibold`}>
            <span>Sheet</span>
            <span>Job</span>
            <span>Category</span>
            <span className="text-right">Budget</span>
            <span className="text-right">Posted</span>
          </div>
          <ul className="divide-y divide-rule">
            {jobs.map((job) => (
              <li
                key={job.id}
                className={`group relative grid grid-cols-[1fr_auto] ${cols} gap-x-6 gap-y-1.5 px-5 md:px-6 py-5 transition-colors hover:bg-tint/60 focus-within:bg-tint/60`}
              >
                <span className="sheet-no text-sm text-ink-2 md:pt-1">No. {sheetNo(job.id)}</span>
                <div className="col-span-2 md:col-span-1 order-3 md:order-none min-w-0">
                  <h2 className="text-xl leading-snug">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="after:absolute after:inset-0 underline decoration-transparent group-hover:decoration-blue group-hover:text-blue underline-offset-4 transition-colors"
                    >
                      {job.title}
                    </Link>
                  </h2>
                  <p className="note mt-0.5">
                    {job.company?.company_name || job.company?.display_name || "A company"}
                  </p>
                  <p className="text-ink-2 mt-2 line-clamp-2 max-w-prose">{job.description}</p>
                </div>
                <span className="order-4 md:order-none text-sm md:text-base md:pt-1">{job.category}</span>
                <span className="order-2 md:order-none measure font-semibold text-right md:pt-1">{formatBudget(job)}</span>
                <span className="order-5 md:order-none note text-right md:pt-1.5">
                  <time dateTime={job.created_at} title={formatDate(job.created_at)}>
                    {timeAgo(job.created_at)}
                  </time>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </PageShell>
  );
}
