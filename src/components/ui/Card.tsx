import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/** The dark panel used for every card/table/modal surface across the app. */
export default function Card({ children, className = "", ...rest }: Props) {
  return (
    <div className={`rounded-lg border border-border bg-surface-2 ${className}`} {...rest}>
      {children}
    </div>
  );
}
