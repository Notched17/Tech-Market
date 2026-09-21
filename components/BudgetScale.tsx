import { formatMoney } from "@/lib/format";

// Where a quote sits against the posted budget range. The sentence carries the
// meaning; the scale is a quick visual read of the same thing.
export function budgetVerdict(amount: number, min: number | null, max: number | null) {
  if (max && amount > max) return { tone: "over" as const, text: `${formatMoney(amount - max)} over budget` };
  if (min && amount < min) return { tone: "under" as const, text: `${formatMoney(min - amount)} under the minimum` };
  if (min || max) return { tone: "within" as const, text: "Within budget" };
  return null;
}

export default function BudgetScale({
  amount,
  min,
  max,
  className = "",
}: {
  amount: number;
  min: number | null;
  max: number | null;
  className?: string;
}) {
  const verdict = budgetVerdict(amount, min, max);
  if (!verdict) return null;

  const lo = min ?? 0;
  const hi = max ?? Math.max(amount, lo) * 1.25;
  const span = Math.max(hi - lo, 1);
  const from = lo - span * 0.35;
  const to = hi + span * 0.35;
  const pct = (v: number) => Math.min(100, Math.max(0, ((v - from) / (to - from)) * 100));

  const toneClass =
    verdict.tone === "over" ? "text-stamp-void" : verdict.tone === "under" ? "text-stamp-progress" : "text-stamp-open";

  return (
    <div className={className}>
      <div className="relative h-3" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-px bg-rule-strong" />
        <div
          className="absolute top-0.5 bottom-0.5 bg-ink/15 border-x-2 border-ink"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
        />
        <div
          className="absolute top-[-3px] bottom-[-3px] w-[3px] -ml-[1.5px] bg-ink"
          style={{ left: `${pct(amount)}%` }}
        />
      </div>
      <p className={`mt-1.5 text-sm font-semibold ${toneClass}`}>{verdict.text}</p>
    </div>
  );
}
