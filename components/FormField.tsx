import type { ReactNode } from "react";

// Label, control, optional hint. The control is passed as children and should
// carry the matching `id` (and `aria-describedby={`${id}-hint`}` when a hint is set).
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
      <label htmlFor={id} className="label flex items-baseline justify-between gap-3">
        <span>{label}</span>
        {optional && <span className="font-normal">Optional</span>}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-ink-2">
          {hint}
        </p>
      )}
    </div>
  );
}

export function FormError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="text-sm text-stamp-void font-medium border-t-2 border-stamp-void pt-2">
      {children}
    </p>
  );
}
