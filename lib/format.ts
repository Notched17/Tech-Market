import type { Job } from "@/lib/types";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatMoney(n: number) {
  return money.format(n);
}

export function formatBudget(job: Pick<Job, "budget_min" | "budget_max">) {
  if (job.budget_min && job.budget_max)
    return `${formatMoney(job.budget_min)} – ${formatMoney(job.budget_max)}`;
  if (job.budget_min) return `From ${formatMoney(job.budget_min)}`;
  if (job.budget_max) return `Up to ${formatMoney(job.budget_max)}`;
  return "No budget given";
}

// Short sheet number for a job, taken from its id.
export function sheetNo(id: string) {
  return id.replace(/-/g, "").slice(0, 6).toUpperCase();
}

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function timeAgo(iso: string) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of steps) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "just now";
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
