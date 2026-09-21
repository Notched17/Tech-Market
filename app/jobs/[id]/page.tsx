"use client";

import { use, useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";
import Link from "next/link";
import type { Bid, Job } from "@/lib/types";
import StateMark from "@/components/StateMark";
import TitleBlock from "@/components/TitleBlock";
import DimensionLine, { budgetVerdict, VERDICT_TONE } from "@/components/DimensionLine";
import FormField, { FormError } from "@/components/FormField";
import { ErrorNote } from "@/components/States";
import { formatBudget, formatDate, formatMoney, sheetNo, timeAgo } from "@/lib/format";

export default function JobDetailPage(props: PageProps<"/jobs/[id]">) {
  const { id } = use(props.params);
  const { profile, isLoggedIn } = useProfile();

  const [job, setJob] = useState<Job | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [bidError, setBidError] = useState<string | null>(null);
  const [submittingBid, setSubmittingBid] = useState(false);

  const load = useCallback(async () => {
    const { data: jobData, error: jobErr } = await supabase
      .from("jobs")
      .select("*, company:profiles(display_name, company_name)")
      .eq("id", id)
      .single();

    if (jobErr) {
      setLoadError(jobErr.message);
      return;
    }
    setJob(jobData as unknown as Job);

    const { data: bidData } = await supabase
      .from("bids")
      .select("*, provider:profiles(display_name)")
      .eq("job_id", id)
      .order("created_at", { ascending: true });
    setBids((bidData as unknown as Bid[]) ?? []);
  }, [id]);

  useEffect(() => {
    // `load` only calls setState after its `await`s resolve, so this isn't
    // actually synchronous — but the new react-hooks rule can't tell that
    // from a named async callback, so it flags it. Same fetch-then-refetch
    // shape used after handleBid/updateBidStatus below.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function handleBid(e: React.FormEvent) {
    e.preventDefault();
    setBidError(null);
    setSubmittingBid(true);

    const { error } = await supabase.from("bids").insert({
      job_id: id,
      provider_id: profile!.id,
      amount: Number(amount),
      message: message || null,
    });

    if (error) {
      setBidError(error.message);
      setSubmittingBid(false);
      return;
    }

    setAmount("");
    setMessage("");
    setSubmittingBid(false);
    load();
  }

  async function updateBidStatus(bidId: string, status: "accepted" | "rejected") {
    await supabase.from("bids").update({ status }).eq("id", bidId);
    if (status === "accepted") {
      await supabase.from("jobs").update({ status: "in_progress" }).eq("id", id);
    }
    load();
  }

  if (loadError) {
    return (
      <div className="max-w-xl mx-auto px-5 py-16 sm:py-24">
        <div className="sheet p-7 sm:p-10">
          <h1 className="text-3xl sm:text-4xl">This job couldn&apos;t be loaded</h1>
          <div className="mt-4">
            <ErrorNote>{loadError}</ErrorNote>
          </div>
          <p className="mt-3 text-ink-2">It may have been removed, or the link may be wrong.</p>
          <Link href="/jobs" className="btn-quiet mt-8">
            Back to open jobs
          </Link>
        </div>
      </div>
    );
  }
  if (!job) {
    return (
      <div role="status" aria-label="Loading job" className="max-w-6xl mx-auto px-5 py-10 sm:py-14">
        <div className="sheet p-8 flex flex-col gap-4 max-w-3xl">
          <div className="skeleton h-9 w-3/4" />
          <div className="skeleton h-4 w-1/3" />
          <div className="skeleton h-24 w-full mt-4" />
          <div className="skeleton h-10 w-full mt-2" />
        </div>
      </div>
    );
  }

  const isOwner = profile?.id === job.company_id;
  const isProvider = profile?.role === "provider";
  const myBid = bids.find((b) => b.provider_id === profile?.id);

  const companyName = job.company?.company_name || job.company?.display_name || "A company";
  const live = bids.filter((b) => b.status !== "rejected");
  const lowest = live.length ? Math.min(...live.map((b) => b.amount)) : null;
  const hasBudget = !!(job.budget_min || job.budget_max);

  const plots = isOwner
    ? live.map((b) => ({ amount: b.amount, label: b.provider?.display_name ?? "Provider", emphasis: b.status === "accepted" }))
    : myBid && !isOwner
      ? [{ amount: myBid.amount, label: "Your quote", emphasis: true }]
      : [];

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <Link href="/jobs" className="link">
          Open jobs
        </Link>
        <span className="text-ink-2" aria-hidden="true">
          {" "}/{" "}
        </span>
        <span className="measure text-ink-2" aria-current="page">
          No. {sheetNo(job.id)}
        </span>
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem] gap-x-10 gap-y-8 items-start">
        {/* The job sheet */}
        <article className="sheet">
          <div className="px-6 sm:px-9 pt-8 pb-8">
            <h1 className="text-3xl sm:text-[2.625rem]">{job.title}</h1>
            <p className="note mt-2">
              Posted by <span className="text-ink font-semibold">{companyName}</span>{" "}
              <time dateTime={job.created_at} title={formatDate(job.created_at)}>
                {timeAgo(job.created_at)}
              </time>
            </p>

            <h2 className="note mt-8">What needs doing</h2>
            <p className="mt-2 whitespace-pre-wrap text-lg leading-relaxed max-w-[68ch]">{job.description}</p>

            <h2 className="note mt-8">Budget</h2>
            {hasBudget ? (
              <DimensionLine min={job.budget_min} max={job.budget_max} plots={plots} className="mt-2 max-w-2xl" />
            ) : (
              <p className="mt-1 text-ink-2">No budget range given. Providers price it from the description.</p>
            )}

            <div className="mt-8 flex justify-end">
              <TitleBlock
                className="w-full sm:w-[22rem]"
                cells={[
                  { label: "Sheet", value: <span className="measure">No. {sheetNo(job.id)}</span> },
                  { label: "State", value: <StateMark status={job.status} /> },
                  { label: "Category", value: job.category, wide: true },
                ]}
              />
            </div>
          </div>

          {/* Quotes: only the job owner sees every bid (RLS also enforces this) */}
          {isOwner && (
            <section aria-labelledby="quotes-heading" className="border-t-[1.5px] border-ink">
              <div className="px-6 sm:px-9 pt-6 pb-2 flex flex-wrap items-baseline justify-between gap-3">
                <h2 id="quotes-heading" className="text-2xl">
                  Quotes <span className="measure text-ink-2">({bids.length})</span>
                </h2>
                {bids.length > 1 && <p className="note">In the order they arrived.</p>}
              </div>
              {bids.length === 0 ? (
                <p className="px-6 sm:px-9 pb-8 pt-2 text-ink-2 max-w-prose">
                  No quotes yet. Providers see this job on the open jobs list. Each quote will appear
                  here and on your budget line above.
                </p>
              ) : (
                <ul className="divide-y divide-rule">
                  {bids.map((bid) => {
                    const verdict = budgetVerdict(bid.amount, job.budget_min, job.budget_max);
                    return (
                      <li
                        key={bid.id}
                        className={`px-6 sm:px-9 py-5 grid sm:grid-cols-[minmax(0,1fr)_12rem] gap-x-8 gap-y-3 ${
                          bid.status === "accepted" ? "bg-tint/70" : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-semibold text-lg">{bid.provider?.display_name ?? "Provider"}</span>
                            <StateMark status={bid.status} />
                            {bid.status !== "rejected" && bid.amount === lowest && live.length > 1 && (
                              <span className="note text-blue">Lowest quote</span>
                            )}
                          </div>
                          {bid.message ? (
                            <p className="mt-2 text-ink-2 whitespace-pre-wrap max-w-prose">{bid.message}</p>
                          ) : (
                            <p className="mt-2 text-ink-2">No note included.</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 sm:items-end">
                          <span className="measure text-2xl font-semibold">{formatMoney(bid.amount)}</span>
                          {verdict && (
                            <span className={`text-sm font-semibold ${VERDICT_TONE[verdict.tone]}`}>{verdict.text}</span>
                          )}
                          {bid.status === "pending" && job.status === "open" && (
                            <div className="flex gap-2 mt-1 w-full">
                              <button onClick={() => updateBidStatus(bid.id, "accepted")} className="btn-primary btn-sm flex-1">
                                Accept
                              </button>
                              <button onClick={() => updateBidStatus(bid.id, "rejected")} className="btn-danger btn-sm flex-1">
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}
        </article>

        {/* Action column */}
        <aside className="lg:sticky lg:top-6 flex flex-col gap-6">
          {/* Bid form: providers who haven't bid yet, on an open job */}
          {isLoggedIn && isProvider && job.status === "open" && !myBid && (
            <form onSubmit={handleBid} className="sheet p-6 sm:p-7 flex flex-col gap-5" aria-labelledby="quote-heading">
              <div>
                <h2 id="quote-heading" className="text-2xl">Send a quote</h2>
                <p className="note mt-1">The company sees your price, your note and your display name.</p>
              </div>
              <FormField id="amount" label="Your price (USD)" hint={hasBudget ? `Their budget: ${formatBudget(job)}` : undefined}>
                <div className="field-affix">
                  <span aria-hidden="true">$</span>
                  <input
                    id="amount"
                    className="field measure text-lg"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    required
                    aria-describedby={hasBudget ? "amount-hint" : undefined}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </FormField>
              <FormField id="message" label="Note to the company" optional>
                <textarea
                  id="message"
                  className="field"
                  rows={5}
                  placeholder="How you'd approach it, what's included, and when you can start."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormField>
              {bidError && <FormError>{bidError}</FormError>}
              <button type="submit" disabled={submittingBid} className="btn-primary w-full">
                {submittingBid ? "Sending quote…" : "Send quote"}
              </button>
            </form>
          )}

          {isLoggedIn && myBid && !isOwner && (
            <section className="sheet p-6 sm:p-7" aria-labelledby="my-quote-heading">
              <div className="flex items-center justify-between gap-3">
                <h2 id="my-quote-heading" className="text-2xl">Your quote</h2>
                <StateMark status={myBid.status} />
              </div>
              <p className="measure text-3xl font-semibold mt-4">{formatMoney(myBid.amount)}</p>
              {(() => {
                const v = budgetVerdict(myBid.amount, job.budget_min, job.budget_max);
                return v ? <p className={`mt-1 text-sm font-semibold ${VERDICT_TONE[v.tone]}`}>{v.text}</p> : null;
              })()}
              {myBid.message && (
                <p className="text-ink-2 mt-4 pt-4 border-t border-rule whitespace-pre-wrap">{myBid.message}</p>
              )}
              <p className="note mt-4">
                {myBid.status === "pending" && "The company hasn't decided yet. Your quote stays here as a record."}
                {myBid.status === "accepted" && "The company accepted your quote. The job is now in progress."}
                {myBid.status === "rejected" && "The company declined this quote."}
              </p>
            </section>
          )}

          {isOwner && (
            <section className="sheet p-6 sm:p-7" aria-labelledby="summary-heading">
              <h2 id="summary-heading" className="text-2xl">Your job</h2>
              <dl className="mt-4 divide-y divide-rule border-y border-rule">
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="note">State</dt>
                  <dd>
                    <StateMark status={job.status} />
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="note">Quotes</dt>
                  <dd className="measure font-semibold">{bids.length}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="note">Lowest</dt>
                  <dd className="measure font-semibold">{lowest === null ? "None yet" : formatMoney(lowest)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="note">Your budget</dt>
                  <dd className="measure font-semibold text-right">{formatBudget(job)}</dd>
                </div>
              </dl>
              <p className="note mt-4">
                {job.status === "open"
                  ? "Accepting a quote moves the job to in progress and takes it off the open jobs list."
                  : "This job is no longer taking quotes."}
              </p>
            </section>
          )}

          {!isLoggedIn && job.status === "open" && (
            <section className="sheet p-6 sm:p-7">
              <h2 className="text-2xl">Want to quote on this?</h2>
              <p className="text-ink-2 mt-2">Log in with a provider account to send a price and a note.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/login" className="btn-primary">
                  Log in
                </Link>
                <Link href="/signup" className="btn-quiet">
                  Create account
                </Link>
              </div>
            </section>
          )}

          {isLoggedIn && !isOwner && profile?.role === "company" && (
            <p className="note px-1">You&apos;re signed in as a company. Only provider accounts can quote on jobs.</p>
          )}

          {isLoggedIn && isProvider && !myBid && job.status !== "open" && (
            <p className="text-ink-2 px-1">This job is no longer taking quotes.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
