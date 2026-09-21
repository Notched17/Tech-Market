"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";
import type { Bid, Job } from "@/lib/types";
import StateMark from "@/components/StateMark";
import { PageShell, PageHeader, EmptyState, Notice, SkeletonRows } from "@/components/States";
import { formatBudget, formatDate, formatMoney, sheetNo, timeAgo } from "@/lib/format";

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
    return (
      <Notice
        title="Log in to see your dashboard"
        action={
          <>
            <Link href="/login" className="btn-primary">
              Log in
            </Link>
            <Link href="/signup" className="btn-quiet">
              Create account
            </Link>
          </>
        }
      >
        Your posted jobs or your quotes are listed here once you&apos;re signed in.
      </Notice>
    );
  }
  if (loading || !profile) {
    return (
      <PageShell>
        <div className="skeleton h-12 w-64 mb-10" />
        <SkeletonRows rows={4} label="Loading your dashboard" />
      </PageShell>
    );
  }

  const isCompany = profile.role === "company";
  const jobCols = "md:grid-cols-[6rem_minmax(0,1fr)_9.5rem_10rem_7.5rem]";
  const bidCols = "md:grid-cols-[minmax(0,1fr)_8.5rem_11rem_9.5rem]";

  return (
    <PageShell>
      <PageHeader
        title={isCompany ? "Your jobs" : "Your quotes"}
        lede={
          isCompany
            ? "Every job you've posted and where it stands. Open a job to review its quotes."
            : "Every job you've quoted on and where your quote stands."
        }
        action={
          isCompany ? (
            <Link href="/jobs/new" className="btn-primary">
              Post a job
            </Link>
          ) : (
            <Link href="/jobs" className="btn-primary">
              Find more work
            </Link>
          )
        }
      />

      {isCompany ? (
        jobs.length === 0 ? (
          <EmptyState
            title="No jobs posted yet"
            action={
              <Link href="/jobs/new" className="btn-primary">
                Post your first job
              </Link>
            }
          >
            Describe what needs doing and set a budget range. Quotes from providers are plotted against
            your budget on the job&apos;s page.
          </EmptyState>
        ) : (
          <div className="sheet">
            <div aria-hidden="true" className={`hidden md:grid ${jobCols} gap-x-6 px-6 py-3 border-b-[1.5px] border-ink note font-semibold`}>
              <span>Sheet</span>
              <span>Job</span>
              <span>State</span>
              <span className="text-right">Budget</span>
              <span className="text-right">Posted</span>
            </div>
            <ul className="divide-y divide-rule">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className={`group relative grid grid-cols-[1fr_auto] ${jobCols} gap-x-6 gap-y-1.5 items-center px-5 md:px-6 py-4 transition-colors hover:bg-tint/60 focus-within:bg-tint/60`}
                >
                  <span className="sheet-no text-sm text-ink-2">No. {sheetNo(job.id)}</span>
                  <h2 className="col-span-2 md:col-span-1 order-3 md:order-none text-lg leading-snug min-w-0">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="after:absolute after:inset-0 underline decoration-transparent group-hover:decoration-blue group-hover:text-blue underline-offset-4"
                    >
                      {job.title}
                    </Link>
                  </h2>
                  <span className="order-2 md:order-none justify-self-end md:justify-self-start">
                    <StateMark status={job.status} />
                  </span>
                  <span className="order-4 md:order-none measure text-sm md:text-base md:text-right">{formatBudget(job)}</span>
                  <span className="order-5 md:order-none note text-right">
                    <time dateTime={job.created_at} title={formatDate(job.created_at)}>
                      {timeAgo(job.created_at)}
                    </time>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : bids.length === 0 ? (
        <EmptyState
          title="No quotes sent yet"
          action={
            <Link href="/jobs" className="btn-primary">
              Browse open jobs
            </Link>
          }
        >
          Find a job that fits your skills and send a price with a short note. Every quote you send is
          tracked here until the company decides.
        </EmptyState>
      ) : (
        <div className="sheet">
          <div aria-hidden="true" className={`hidden md:grid ${bidCols} gap-x-6 px-6 py-3 border-b-[1.5px] border-ink note font-semibold`}>
            <span>Job</span>
            <span className="text-right">Your quote</span>
            <span>Quote state</span>
            <span>Job state</span>
          </div>
          <ul className="divide-y divide-rule">
            {bids.map((bid) => (
              <li
                key={bid.id}
                className={`group relative grid grid-cols-[1fr_auto] ${bidCols} gap-x-6 gap-y-2 items-center px-5 md:px-6 py-4 transition-colors hover:bg-tint/60 focus-within:bg-tint/60`}
              >
                <div className="col-span-2 md:col-span-1 min-w-0">
                  <h2 className="text-lg leading-snug">
                    <Link
                      href={`/jobs/${bid.job_id}`}
                      className="after:absolute after:inset-0 underline decoration-transparent group-hover:decoration-blue group-hover:text-blue underline-offset-4"
                    >
                      {bid.job?.title ?? "Job"}
                    </Link>
                  </h2>
                  <p className="note">
                    Quoted <time dateTime={bid.created_at}>{timeAgo(bid.created_at)}</time>
                  </p>
                </div>
                <span className="measure text-lg font-semibold md:text-right">{formatMoney(bid.amount)}</span>
                <span className="justify-self-end md:justify-self-start">
                  <span className="sr-only">Quote: </span>
                  <StateMark status={bid.status} />
                </span>
                {bid.job && (
                  <span className="col-span-2 md:col-span-1 flex items-center gap-2">
                    <span className="note md:sr-only">Job:</span>
                    <StateMark status={bid.job.status} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </PageShell>
  );
}
