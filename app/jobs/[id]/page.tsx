"use client";

import { use, useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/useProfile";
import type { Bid, Job } from "@/lib/types";

const STATUS_STYLES: Record<Job["status"], string> = {
  open: "bg-forest/10 text-forest",
  in_progress: "bg-amber/10 text-amber",
  completed: "bg-ink-soft/10 text-ink-soft",
  cancelled: "bg-rust/10 text-rust",
};

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
    return <div className="max-w-2xl mx-auto px-5 py-16 text-rust text-sm">{loadError}</div>;
  }
  if (!job) {
    return <div className="max-w-2xl mx-auto px-5 py-16 text-ink-soft text-sm">Loading…</div>;
  }

  const isOwner = profile?.id === job.company_id;
  const isProvider = profile?.role === "provider";
  const myBid = bids.find((b) => b.provider_id === profile?.id);

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <span
        className={`inline-block text-xs font-medium rounded px-2 py-1 mb-4 ${STATUS_STYLES[job.status]}`}
      >
        {job.status.replace("_", " ")}
      </span>

      <h1 className="font-display text-3xl font-semibold">{job.title}</h1>
      <p className="text-sm text-ink-soft mt-1">
        {job.category} · posted by{" "}
        {job.company?.company_name || job.company?.display_name || "a company"}
      </p>

      <p className="mt-6 whitespace-pre-wrap leading-relaxed">{job.description}</p>

      <div className="mt-6 text-sm text-ink-soft">
        {job.budget_min || job.budget_max
          ? `Budget: ${job.budget_min ? `$${job.budget_min}` : "—"} to ${
              job.budget_max ? `$${job.budget_max}` : "—"
            }`
          : "No budget range given"}
      </div>

      {/* Bid form: providers who haven't bid yet, on an open job */}
      {isLoggedIn && isProvider && job.status === "open" && !myBid && (
        <form onSubmit={handleBid} className="mt-10 border-t border-border pt-8 flex flex-col gap-4">
          <h2 className="font-display text-lg font-semibold">Submit a bid</h2>
          <label className="flex flex-col gap-1 text-sm">
            Your price ($)
            <input
              className="field"
              type="number"
              min={0}
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Message
            <textarea
              className="field"
              rows={4}
              placeholder="Why you're a good fit, and your timeline."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          {bidError && <p className="text-rust text-sm">{bidError}</p>}
          <button type="submit" disabled={submittingBid} className="btn-primary self-start">
            {submittingBid ? "Submitting…" : "Submit bid"}
          </button>
        </form>
      )}

      {isLoggedIn && myBid && !isOwner && (
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="font-display text-lg font-semibold mb-2">Your bid</h2>
          <p className="text-sm">
            ${myBid.amount} —{" "}
            <span className="font-medium capitalize">{myBid.status}</span>
          </p>
          {myBid.message && <p className="text-sm text-ink-soft mt-1">{myBid.message}</p>}
        </div>
      )}

      {/* Bid list: only the job owner sees every bid (RLS also enforces this) */}
      {isOwner && (
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="font-display text-lg font-semibold mb-4">
            Bids ({bids.length})
          </h2>
          {bids.length === 0 && (
            <p className="text-sm text-ink-soft">No bids yet.</p>
          )}
          <ul className="flex flex-col divide-y divide-border">
            {bids.map((bid) => (
              <li key={bid.id} className="py-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">
                    ${bid.amount} — {bid.provider?.display_name ?? "Provider"}
                  </p>
                  {bid.message && <p className="text-sm text-ink-soft mt-1">{bid.message}</p>}
                  <p className="text-xs text-ink-soft mt-1 capitalize">{bid.status}</p>
                </div>
                {bid.status === "pending" && job.status === "open" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => updateBidStatus(bid.id, "accepted")}
                      className="btn-primary !px-3 !py-1.5 text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateBidStatus(bid.id, "rejected")}
                      className="btn-quiet !px-3 !py-1.5 text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
