import type { ReactNode } from "react";

// Label, control, optional hint. Pass the control as children with a matching `id`
// (and `aria-describedby={`${id}-hint`}` when a hint is set).
export default function FormField({
  id,
  label,
  hint,
  optional = false,
  children,
  className = "",
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 font-semibold">
        <span>{label}</span>
        {optional && <span className="note">Optional</span>}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="note">
          {hint}
        </p>
      )}
    </div>
  );
}

// A redline markup: the revision delta plus the message.
export function FormError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="flex items-start gap-2 text-redline font-medium">
      <svg width="14" height="13" viewBox="0 0 14 13" aria-hidden="true" className="mt-1 shrink-0">
        <path d="M7 1L13 12H1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </p>
  );
}
