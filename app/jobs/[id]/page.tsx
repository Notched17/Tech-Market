"use client";

import { use, useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";
import Link from "next/link";
import type { Bid, Job } from "@/lib/types";
import Stamp from "@/components/Stamp";
import BudgetScale from "@/components/BudgetScale";
import FormField, { FormError } from "@/components/FormField";
import { ErrorNote } from "@/components/States";
import { formatBudget, formatDate, formatMoney, ticketNo, timeAgo } from "@/lib/format";

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
        <h1 className="text-3xl sm:text-4xl">This job couldn&apos;t be loaded</h1>
        <div className="mt-3">
          <ErrorNote>{loadError}</ErrorNote>
        </div>
        <p className="mt-3 text-ink-2">It may have been removed, or the link may be wrong.</p>
        <Link href="/jobs" className="btn-quiet mt-8">
          Back to open jobs
        </Link>
      </div>
    );
  }
  if (!job) {
    return (
      <div role="status" aria-label="Loading job" className="max-w-6xl mx-auto px-5 py-10 sm:py-14">
        <div className="ticket p-7 flex flex-col gap-4 max-w-3xl">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-9 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-24 w-full mt-4" />
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

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <Link href="/jobs" className="link font-medium">
          Open jobs
        </Link>
        <span className="text-ink-2" aria-hidden="true">
          {" "}/{" "}
        </span>
        <span className="text-ink-2 ticket-no" aria-current="page">
          No. {ticketNo(job.id)}
        </span>
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem] gap-x-10 gap-y-8 items-start">
        {/* The ticket */}
        <article className="ticket">
          <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-3">
            <span className="ticket-no text-ink-2">No. {ticketNo(job.id)}</span>
            <Stamp status={job.status} large />
          </div>
          <div className="perf" aria-hidden="true" />
          <div className="px-5 sm:px-8 py-7">
            <h1 className="text-3xl sm:text-[2.75rem]">{job.title}</h1>

            <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 border-y border-rule py-5">
              <div>
                <dt className="label">Posted by</dt>
                <dd className="mt-1 font-medium">{companyName}</dd>
              </div>
              <div>
                <dt className="label">Category</dt>
                <dd className="mt-1">{job.category}</dd>
              </div>
              <div>
                <dt className="label">Budget</dt>
                <dd className="mt-1 num font-semibold">{formatBudget(job)}</dd>
              </div>
              <div>
                <dt className="label">Posted</dt>
                <dd className="mt-1">
                  <time dateTime={job.created_at} title={formatDate(job.created_at)}>
                    {timeAgo(job.created_at)}
                  </time>
                </dd>
              </div>
            </dl>

            <h2 className="label mt-7">What needs doing</h2>
            <p className="mt-2 whitespace-pre-wrap text-lg leading-relaxed max-w-[68ch]">
              {job.description}
            </p>
          </div>

          {/* Quote ledger: only the job owner sees every bid (RLS also enforces this) */}
          {isOwner && (
            <section aria-labelledby="quotes-heading" className="border-t-2 border-ink">
              <div className="px-5 sm:px-8 pt-6 pb-2 flex flex-wrap items-baseline justify-between gap-3">
                <h2 id="quotes-heading" className="text-2xl">
                  Quotes <span className="num text-ink-2">({bids.length})</span>
                </h2>
                {bids.length > 1 && (
                  <p className="text-sm text-ink-2">In the order they arrived.</p>
                )}
              </div>
              {bids.length === 0 ? (
                <p className="px-5 sm:px-8 pb-8 pt-2 text-ink-2 max-w-prose">
                  No quotes yet. Providers see this job on the open jobs list and can quote from
                  there. Each one will appear here with its price against your budget.
                </p>
              ) : (
                <ul className="px-3 sm:px-5 pb-5 pt-2 flex flex-col gap-2.5">
                  {bids.map((bid) => (
                    <li
                      key={bid.id}
                      className={`copy-sheet px-4 sm:px-5 py-4 grid sm:grid-cols-[minmax(0,1fr)_13rem] gap-x-6 gap-y-3 ${
                        bid.status === "rejected" ? "opacity-70" : ""
                      } ${bid.status === "accepted" ? "shadow-[inset_0_0_0_2px_var(--stamp-open)]" : ""}`}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-semibold">
                            {bid.provider?.display_name ?? "Provider"}
                          </span>
                          {bid.status !== "pending" && <Stamp status={bid.status} />}
                          {bid.status !== "rejected" && bid.amount === lowest && live.length > 1 && (
                            <span className="label text-ink">Lowest quote</span>
                          )}
                        </div>
                        {bid.message ? (
                          <p className="mt-2 text-ink-2 whitespace-pre-wrap max-w-prose">{bid.message}</p>
                        ) : (
                          <p className="mt-2 text-ink-2 italic">No note included.</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-3 sm:items-stretch">
                        <span
                          className="num text-2xl font-bold sm:text-right"
                          style={{ fontStretch: "80%" }}
                        >
                          {formatMoney(bid.amount)}
                        </span>
                        <BudgetScale amount={bid.amount} min={job.budget_min} max={job.budget_max} />
                        {bid.status === "pending" && job.status === "open" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateBidStatus(bid.id, "accepted")}
                              className="btn-ink btn-sm flex-1"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateBidStatus(bid.id, "rejected")}
                              className="btn-quiet btn-sm flex-1 bg-stock"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </article>

        {/* Action column */}
        <aside className="lg:sticky lg:top-6 flex flex-col gap-6">
          {/* Bid form: providers who haven't bid yet, on an open job */}
          {isLoggedIn && isProvider && job.status === "open" && !myBid && (
            <form onSubmit={handleBid} className="copy-sheet p-5 sm:p-6 flex flex-col gap-5" aria-labelledby="quote-heading">
              <div>
                <h2 id="quote-heading" className="text-2xl">Send a quote</h2>
                <p className="text-sm text-ink-2 mt-1">
                  The company sees your price, your note and your display name.
                </p>
              </div>
              <FormField
                id="amount"
                label="Your price (USD)"
                hint={job.budget_min || job.budget_max ? `Their budget: ${formatBudget(job)}` : undefined}
              >
                <div className="field-affix">
                  <span aria-hidden="true">$</span>
                  <input
                    id="amount"
                    className="field num text-lg"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    required
                    aria-describedby={job.budget_min || job.budget_max ? "amount-hint" : undefined}
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
            <section className="copy-sheet p-5 sm:p-6" aria-labelledby="my-quote-heading">
              <div className="flex items-center justify-between gap-3">
                <h2 id="my-quote-heading" className="text-2xl">Your quote</h2>
                <Stamp status={myBid.status} />
              </div>
              <p className="num text-3xl font-bold mt-4" style={{ fontStretch: "80%" }}>
                {formatMoney(myBid.amount)}
              </p>
              <BudgetScale amount={myBid.amount} min={job.budget_min} max={job.budget_max} className="mt-3" />
              {myBid.message && (
                <p className="text-ink-2 mt-4 pt-4 border-t border-rule-strong/50 whitespace-pre-wrap">
                  {myBid.message}
                </p>
              )}
              <p className="text-sm text-ink-2 mt-4">
                {myBid.status === "pending" && "The company hasn't decided yet. Your quote stays here as a record."}
                {myBid.status === "accepted" && "The company accepted your quote. The job is now in progress."}
                {myBid.status === "rejected" && "The company declined this quote."}
              </p>
            </section>
          )}

          {isOwner && (
            <section className="ticket p-5 sm:p-6" aria-labelledby="summary-heading">
              <h2 id="summary-heading" className="text-2xl">Your job</h2>
              <dl className="mt-4 ruled border-y border-rule">
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="label">Status</dt>
                  <dd><Stamp status={job.status} /></dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="label">Quotes</dt>
                  <dd className="num font-semibold">{bids.length}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="label">Lowest</dt>
                  <dd className="num font-semibold">{lowest === null ? "None yet" : formatMoney(lowest)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="label">Your budget</dt>
                  <dd className="num font-semibold text-right">{formatBudget(job)}</dd>
                </div>
              </dl>
              <p className="text-sm text-ink-2 mt-4">
                {job.status === "open"
                  ? "Accepting a quote moves the job to in progress and takes it off the open jobs list."
                  : "This job is no longer taking quotes."}
              </p>
            </section>
          )}

          {!isLoggedIn && job.status === "open" && (
            <section className="copy-sheet p-5 sm:p-6">
              <h2 className="text-2xl">Want to quote on this?</h2>
              <p className="text-ink-2 mt-2">Log in with a provider account to send a price and a note.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/login" className="btn-primary">Log in</Link>
                <Link href="/signup" className="btn-quiet bg-stock">Create account</Link>
              </div>
            </section>
          )}

          {isLoggedIn && !isOwner && profile?.role === "company" && (
            <p className="text-ink-2 text-sm px-1">
              You&apos;re signed in as a company. Only provider accounts can quote on jobs.
            </p>
          )}

          {isLoggedIn && isProvider && !myBid && job.status !== "open" && (
            <p className="text-ink-2 px-1">This job is no longer taking quotes.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
