import type { ReactNode } from "react";

export function PageShell({
  children,
  width = "max-w-6xl",
}: {
  children: ReactNode;
  width?: string;
}) {
  return <div className={`${width} mx-auto px-5 py-10 sm:py-14`}>{children}</div>;
}

export function PageHeader({
  title,
  lede,
  action,
}: {
  title: string;
  lede?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-8 sm:mb-10">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {lede && <p className="mt-3 text-ink-2 text-lg">{lede}</p>}
      </div>
      {action}
    </header>
  );
}

// An empty state that says what to do next.
export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="border border-dashed border-rule-strong rounded-[2px] px-6 py-10 sm:px-10 bg-stock/60">
      <h2 className="text-2xl">{title}</h2>
      {children && <p className="mt-2 text-ink-2 max-w-prose">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Notice({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="max-w-xl mx-auto px-5 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      {children && <p className="mt-3 text-ink-2 text-lg">{children}</p>}
      {action && <div className="mt-8 flex flex-wrap gap-3">{action}</div>}
    </div>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="text-stamp-void font-medium">
      {children}
    </p>
  );
}

export function SkeletonRows({ rows = 4, label = "Loading" }: { rows?: number; label?: string }) {
  return (
    <div role="status" aria-label={label} className="ruled border-y border-rule">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="py-5 flex flex-col gap-2.5">
          <div className="skeleton h-5 w-2/3" />
          <div className="skeleton h-3.5 w-1/3" />
        </div>
      ))}
    </div>
  );
}
