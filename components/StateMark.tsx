import type { BidStatus, JobStatus } from "@/lib/types";

type Status = JobStatus | BidStatus;

// Drawing-legend symbols: the shape and the word carry the state; colour only reinforces it.
const STATES: Record<Status, { label: string; tone: string; symbol: "ring" | "half" | "full" | "cross" | "dash" }> = {
  open: { label: "Open", tone: "text-blue", symbol: "ring" },
  in_progress: { label: "In progress", tone: "text-hold", symbol: "half" },
  completed: { label: "Completed", tone: "text-ink-2", symbol: "full" },
  cancelled: { label: "Cancelled", tone: "text-redline", symbol: "cross" },
  pending: { label: "Awaiting decision", tone: "text-ink-2", symbol: "dash" },
  accepted: { label: "Accepted", tone: "text-approved", symbol: "full" },
  rejected: { label: "Declined", tone: "text-redline", symbol: "cross" },
};

function Symbol({ kind }: { kind: (typeof STATES)[Status]["symbol"] }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="shrink-0">
      {kind === "ring" && <circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />}
      {kind === "dash" && (
        <circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.2 1.8" />
      )}
      {kind === "half" && (
        <>
          <circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 1.25a4.75 4.75 0 0 1 0 9.5z" fill="currentColor" />
        </>
      )}
      {kind === "full" && <circle cx="6" cy="6" r="5.25" fill="currentColor" />}
      {kind === "cross" && (
        <>
          <circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.4 3.4l5.2 5.2M8.6 3.4l-5.2 5.2" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

export default function StateMark({ status, className = "" }: { status: Status; className?: string }) {
  const s = STATES[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap ${s.tone} ${className}`}>
      <Symbol kind={s.symbol} />
      {s.label}
    </span>
  );
}
