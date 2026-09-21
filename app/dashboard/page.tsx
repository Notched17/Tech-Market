"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";
import type { Bid, Job } from "@/lib/types";

export default function DashboardPage() {
  const { profile, loading, isLoggedIn } = useProfile();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [bids, setBids] = useState<(Bid & { job?: Pick<Job, "title" | "status"> })[]>([]);

  useEffect(() => {
    if (!profile) return;

    if (profile.role === "company") {
      supabase
        .from("jobs")
        .select("*")
        .eq("company_id", profile.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => setJobs((data as Job[]) ?? []));
    } else {
      supabase
        .from("bids")
        .select("*, job:jobs(title, status)")
        .eq("provider_id", profile.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => setBids((data as unknown as typeof bids) ?? []));
    }
  }, [profile]);

  if (!loading && !isLoggedIn) {
    return <div className="max-w-2xl mx-auto px-5 py-16">Log in to see your dashboard.</div>;
  }
  if (loading || !profile) {
    return <div className="max-w-2xl mx-auto px-5 py-16 text-ink-soft text-sm">Loading…</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <h1 className="font-display text-3xl font-semibold mb-1">
        {profile.role === "company" ? "Your jobs" : "Your bids"}
      </h1>
      <p className="text-ink-soft mb-8">
        {profile.role === "company"
          ? "Jobs you've posted and their bid activity."
          : "Jobs you've bid on and where each one stands."}
      </p>

      {profile.role === "company" ? (
        jobs.length === 0 ? (
          <p className="text-sm text-ink-soft border border-dashed border-border rounded p-6">
            You haven&apos;t posted a job yet.{" "}
            <Link href="/jobs/new" className="text-teal-dark font-medium">
              Post one now
            </Link>
            .
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-border border-t border-b border-border">
            {jobs.map((job) => (
              <li key={job.id} className="py-4">
                <Link href={`/jobs/${job.id}`} className="font-medium hover:text-teal-dark">
                  {job.title}
                </Link>
                <p className="text-sm text-ink-soft capitalize">{job.status.replace("_", " ")}</p>
              </li>
            ))}
          </ul>
        )
      ) : bids.length === 0 ? (
        <p className="text-sm text-ink-soft border border-dashed border-border rounded p-6">
          You haven&apos;t placed a bid yet.{" "}
          <Link href="/jobs" className="text-teal-dark font-medium">
            Browse open jobs
          </Link>
          .
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-border border-t border-b border-border">
          {bids.map((bid) => (
            <li key={bid.id} className="py-4">
              <Link href={`/jobs/${bid.job_id}`} className="font-medium hover:text-teal-dark">
                {bid.job?.title ?? "Job"}
              </Link>
              <p className="text-sm text-ink-soft">
                Your bid: ${bid.amount} · <span className="capitalize">{bid.status}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
