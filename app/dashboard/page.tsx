"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";
import type { Bid, Job } from "@/lib/types";
import Stamp from "@/components/Stamp";
import { PageShell, PageHeader, EmptyState, Notice, SkeletonRows } from "@/components/States";
import { formatBudget, formatDate, formatMoney, ticketNo, timeAgo } from "@/lib/format";

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
  const rowGrid = "grid grid-cols-[1fr_auto] md:grid-cols-[5.5rem_minmax(0,1fr)_10rem_9rem_8rem] gap-x-6 gap-y-1.5";

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
            Write up what needs doing and set a budget range. Quotes from providers will show up on
            the job, measured against your budget.
          </EmptyState>
        ) : (
          <div className="bg-stock border border-rule-strong rounded-[2px]">
            <div aria-hidden="true" className={`hidden md:grid ${rowGrid} px-6 py-3 border-b-2 border-ink label`}>
              <span>No.</span>
              <span>Job</span>
              <span>Status</span>
              <span className="text-right">Budget</span>
              <span className="text-right">Posted</span>
            </div>
            <ul className="ruled">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className={`group relative ${rowGrid} items-center px-5 md:px-6 py-4 transition-colors hover:bg-wash focus-within:bg-wash`}
                >
                  <span className="ticket-no text-sm text-ink-2">No. {ticketNo(job.id)}</span>
                  <h2 className="col-span-2 md:col-span-1 order-3 md:order-none text-lg leading-snug min-w-0">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="after:absolute after:inset-0 underline decoration-transparent group-hover:decoration-ink underline-offset-4"
                    >
                      {job.title}
                    </Link>
                  </h2>
                  <span className="order-2 md:order-none justify-self-end md:justify-self-start">
                    <Stamp status={job.status} />
                  </span>
                  <span className="order-4 md:order-none num text-sm md:text-base md:text-right">
                    {formatBudget(job)}
                  </span>
                  <span className="order-5 md:order-none text-sm text-ink-2 text-right">
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
          Find a job that fits your skills and send a price with a short note. Each quote you send is
          tracked here until the company decides.
        </EmptyState>
      ) : (
        <div className="bg-stock border border-rule-strong rounded-[2px]">
          <div
            aria-hidden="true"
            className="hidden md:grid grid-cols-[minmax(0,1fr)_9rem_9rem_9rem] gap-x-6 px-6 py-3 border-b-2 border-ink label"
          >
            <span>Job</span>
            <span className="text-right">Your quote</span>
            <span>Quote</span>
            <span>Job status</span>
          </div>
          <ul className="ruled">
            {bids.map((bid) => (
              <li
                key={bid.id}
                className="group relative grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_9rem_9rem_9rem] gap-x-6 gap-y-2 items-center px-5 md:px-6 py-4 transition-colors hover:bg-wash focus-within:bg-wash"
              >
                <div className="col-span-2 md:col-span-1 min-w-0">
                  <h2 className="text-lg leading-snug">
                    <Link
                      href={`/jobs/${bid.job_id}`}
                      className="after:absolute after:inset-0 underline decoration-transparent group-hover:decoration-ink underline-offset-4"
                    >
                      {bid.job?.title ?? "Job"}
                    </Link>
                  </h2>
                  <p className="text-sm text-ink-2">
                    Quoted <time dateTime={bid.created_at}>{timeAgo(bid.created_at)}</time>
                  </p>
                </div>
                <span className="num text-lg font-bold md:text-right" style={{ fontStretch: "80%" }}>
                  {formatMoney(bid.amount)}
                </span>
                <span className="justify-self-end md:justify-self-start">
                  <span className="sr-only">Quote: </span>
                  <Stamp status={bid.status} />
                </span>
                {bid.job && (
                  <span className="col-span-2 md:col-span-1 text-sm text-ink-2 md:text-ink">
                    <span className="md:sr-only">Job: </span>
                    {bid.job.status === "open"
                      ? "Taking quotes"
                      : bid.job.status === "in_progress"
                        ? "In progress"
                        : bid.job.status === "completed"
                          ? "Completed"
                          : "Cancelled"}
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
