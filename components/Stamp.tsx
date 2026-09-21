import type { BidStatus, JobStatus } from "@/lib/types";

type Status = JobStatus | BidStatus;

// Status is carried by the stamp's word and border, not by colour alone.
const STAMPS: Record<Status, { label: string; className: string }> = {
  open: { label: "Open", className: "text-stamp-open" },
  in_progress: { label: "In progress", className: "text-stamp-progress" },
  completed: { label: "Completed", className: "text-ink-2" },
  cancelled: { label: "Cancelled", className: "text-stamp-void" },
  pending: { label: "Pending", className: "text-ink-2" },
  accepted: { label: "Accepted", className: "text-stamp-open" },
  rejected: { label: "Declined", className: "text-stamp-void" },
};

export default function Stamp({
  status,
  large = false,
  className = "",
}: {
  status: Status;
  large?: boolean;
  className?: string;
}) {
  const s = STAMPS[status];
  return (
    <span className={`stamp ${large ? "stamp-lg" : ""} ${s.className} ${className}`}>
      {s.label}
    </span>
  );
}
