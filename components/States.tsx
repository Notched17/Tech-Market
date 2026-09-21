import type { ReactNode } from "react";
import { FormError } from "@/components/FormField";

export function PageShell({ children, width = "max-w-6xl" }: { children: ReactNode; width?: string }) {
  return <div className={`${width} mx-auto px-5 py-10 sm:py-14`}>{children}</div>;
}

export function PageHeader({ title, lede, action }: { title: string; lede?: ReactNode; action?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 mb-8 sm:mb-10">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {lede && <p className="mt-3 text-lg text-ink-2">{lede}</p>}
      </div>
      {action}
    </header>
  );
}

// An empty drawing sheet that says what to do next.
export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="border border-dashed border-rule-strong bg-sheet/80 px-6 py-10 sm:px-10">
      <h2 className="text-2xl">{title}</h2>
      {children && <p className="mt-2 text-ink-2 max-w-prose">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Notice({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="max-w-xl mx-auto px-5 py-16 sm:py-24">
      <div className="sheet p-7 sm:p-10">
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        {children && <p className="mt-3 text-lg text-ink-2">{children}</p>}
        {action && <div className="mt-8 flex flex-wrap gap-3">{action}</div>}
      </div>
    </div>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return <FormError>{children}</FormError>;
}

export function SkeletonRows({ rows = 4, label = "Loading" }: { rows?: number; label?: string }) {
  return (
    <div role="status" aria-label={label} className="sheet divide-y divide-rule">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-6 py-5 flex flex-col gap-2.5">
          <div className="skeleton h-5 w-2/3" />
          <div className="skeleton h-3.5 w-1/3" />
        </div>
      ))}
    </div>
  );
}
