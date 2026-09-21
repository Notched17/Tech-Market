import type { ReactNode } from "react";

// The work-order ticket: a stub strip carrying the ticket number and state,
// a perforated tear line, then the body.
export function Ticket({
  stub,
  children,
  className = "",
  as: Tag = "article",
}: {
  stub?: ReactNode;
  children: ReactNode;
  className?: string;
  as?: "article" | "section" | "div";
}) {
  return (
    <Tag className={`ticket ${className}`}>
      {stub && (
        <>
          <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-3">{stub}</div>
          <div className="perf" aria-hidden="true" />
        </>
      )}
      <div className="px-5 sm:px-7 py-6">{children}</div>
    </Tag>
  );
}

// A printed label over its filled-in value.
export function FormValue({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="label">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}
