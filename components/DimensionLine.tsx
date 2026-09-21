import { formatMoney } from "@/lib/format";

export type Plot = { amount: number; label?: string; emphasis?: boolean; muted?: boolean };

// How a quote sits against the budget, as a sentence. The drawing repeats it visually.
export function budgetVerdict(amount: number, min: number | null, max: number | null) {
  if (max && amount > max) return { tone: "over" as const, text: `${formatMoney(amount - max)} over budget` };
  if (min && amount < min) return { tone: "under" as const, text: `${formatMoney(min - amount)} under the minimum` };
  if (min || max) return { tone: "within" as const, text: "Within budget" };
  return null;
}

export const VERDICT_TONE = {
  over: "text-redline",
  under: "text-hold",
  within: "text-approved",
} as const;

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="9"
      height="8"
      viewBox="0 0 9 8"
      aria-hidden="true"
      className="absolute top-1/2 -translate-y-1/2"
      style={dir === "left" ? { left: 0 } : { right: 0 }}
    >
      <path d={dir === "left" ? "M0 4L9 0.5V7.5z" : "M9 4L0 0.5V7.5z"} fill="var(--blue)" />
    </svg>
  );
}

// The budget drawn as a dimension line: extension lines at the range ends,
// arrowheads, the range written above, and quotes plotted below as markers.
export default function DimensionLine({
  min,
  max,
  plots = [],
  animate = false,
  className = "",
}: {
  min: number | null;
  max: number | null;
  plots?: Plot[];
  animate?: boolean;
  className?: string;
}) {
  if (!min && !max) return null;

  const amounts = plots.map((p) => p.amount);
  const lo = min ?? Math.min(max! * 0.6, ...amounts);
  const hi = max ?? Math.max(min! * 1.4, ...amounts);
  const span = Math.max(hi - lo, 1);
  const from = Math.min(lo - span * 0.3, ...amounts.map((a) => a - span * 0.05));
  const to = Math.max(hi + span * 0.3, ...amounts.map((a) => a + span * 0.05));
  const pct = (v: number) => ((v - from) / (to - from)) * 100;
  const left = pct(lo);
  const right = pct(hi);

  const rangeLabel = min && max ? `${formatMoney(min)} – ${formatMoney(max)}` : min ? `From ${formatMoney(min)}` : `Up to ${formatMoney(max!)}`;

  return (
    <div className={`relative select-none ${className}`} aria-hidden="true">
      {/* Range label above the line */}
      <div className="relative h-6">
        <span
          className="measure absolute -translate-x-1/2 text-sm font-semibold text-blue whitespace-nowrap bg-sheet px-1.5"
          style={{ left: `${(left + right) / 2}%` }}
        >
          {rangeLabel}
        </span>
      </div>

      <div className="relative h-5">
        {/* Extension lines */}
        <span className="absolute -top-6 bottom-[-6px] w-px bg-blue/60" style={{ left: `${left}%` }} />
        <span className="absolute -top-6 bottom-[-6px] w-px bg-blue/60" style={{ left: `${right}%` }} />
        {/* Faint full-scale baseline */}
        <span className="absolute inset-x-0 top-1/2 h-px bg-rule" />
        {/* Dimension line with arrowheads */}
        <span
          className={`absolute top-1/2 h-px bg-blue ${animate ? "draw-line" : ""}`}
          style={{ left: `${left}%`, width: `${right - left}%` }}
        >
          {min !== null && min > 0 && <Arrow dir="left" />}
          {max !== null && max > 0 && <Arrow dir="right" />}
        </span>
      </div>

      {/* Plotted quotes */}
      {plots.length > 0 && (
        <div className="relative" style={{ height: plots.some((p) => p.label) ? `${1.25 + plots.length * 1.4}rem` : "0.75rem" }}>
          {plots.map((p, i) => {
            const x = pct(p.amount);
            const verdict = budgetVerdict(p.amount, min, max);
            const color = p.muted ? "text-ink-2" : verdict ? VERDICT_TONE[verdict.tone] : "text-ink";
            return (
              <span
                key={i}
                className={`absolute top-0 ${animate ? "settle" : ""} ${color}`}
                style={{ left: `${x}%`, animationDelay: animate ? `${650 + i * 140}ms` : undefined }}
              >
                <span className="absolute -top-[14px] -ml-[1px] w-[2px] h-[18px] bg-current" />
                <svg width="10" height="10" viewBox="0 0 10 10" className="absolute top-[2px] -ml-[5px]">
                  <path d="M5 0L10 5L5 10L0 5z" fill={p.emphasis ? "currentColor" : "var(--sheet)"} stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {p.label && (
                  <span
                    className="absolute whitespace-nowrap text-[0.8125rem] font-semibold border-l border-current pl-1.5 leading-tight"
                    style={{
                      top: `${1 + i * 1.4}rem`,
                      ...(x > 60 ? { right: 0, borderLeft: "none", borderRight: "1px solid", paddingLeft: 0, paddingRight: "0.375rem", textAlign: "right" } : { left: 0 }),
                    }}
                  >
                    {p.label} <span className="measure">{formatMoney(p.amount)}</span>
                  </span>
                )}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
