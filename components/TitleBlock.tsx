import type { ReactNode } from "react";

// The ruled box in the corner of a drawing: sheet number, category, date, state.
export default function TitleBlock({
  cells,
  className = "",
}: {
  cells: { label: string; value: ReactNode; wide?: boolean }[];
  className?: string;
}) {
  return (
    <dl className={`title-block grid-cols-2 ${className}`}>
      {cells.map((c) => (
        <div key={c.label} className={c.wide ? "col-span-2" : ""}>
          <dt className="note text-[0.8125rem]">{c.label}</dt>
          <dd className="mt-0.5 font-semibold text-ink">{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}
