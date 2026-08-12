import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink font-semibold hover:brightness-110",
  secondary: "border border-border text-text-dim hover:bg-surface-hover",
  danger: "text-danger hover:underline",
  ghost: "text-text-dim hover:bg-surface-hover",
};

export default function Button({ variant = "secondary", className = "", ...rest }: Props) {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    />
  );
}
