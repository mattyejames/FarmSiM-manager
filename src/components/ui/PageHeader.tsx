import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

/** The 56px top bar repeated at the top of every screen. */
export default function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <div className="flex h-14 flex-none items-center justify-between border-b border-border-faint bg-surface-4 px-6">
      <div className="flex items-baseline gap-2.5">
        <h1 className="text-[15px] font-semibold text-text">{title}</h1>
        {subtitle && <span className="font-mono text-[10.5px] text-text-faint">{subtitle}</span>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
