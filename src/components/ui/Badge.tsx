import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  mono?: boolean;
}

/** Small pill/chip used for field numbers, crop tags, and mono status labels.
 * Unopinionated on color — pass background/text via className per use. */
export default function Badge({ children, className = "", mono = true }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold ${mono ? "font-mono" : ""} ${className}`}
    >
      {children}
    </span>
  );
}
