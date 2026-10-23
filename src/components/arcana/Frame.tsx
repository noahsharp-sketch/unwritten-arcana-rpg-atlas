import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Ornamented container shared by every Arcana panel. */
export function Frame({ title, subtitle, actions, children, className, variant = "dark" }: {
  title: string; subtitle?: string; actions?: ReactNode; children: ReactNode; className?: string;
  variant?: "dark" | "parchment";
}) {
  return (
    <section className={cn("frame flex flex-col", variant === "parchment" && "parchment", className)}>
      <Corners />
      <header className="flex items-end justify-between gap-4 border-b border-border px-5 pb-3 pt-4">
        <div>
          <h2 className={cn("text-xl", variant === "dark" ? "gilt-text" : "text-parchment-ink")}>{title}</h2>
          {subtitle && (
            <p className={cn("text-sm italic", variant === "dark" ? "text-muted-foreground" : "text-parchment-muted")}>{subtitle}</p>
          )}
        </div>
        {actions}
      </header>
      <div className="flex-1 p-5">{children}</div>
    </section>
  );
}

function Corners() {
  const c = "pointer-events-none absolute h-3 w-3 border-gold";
  return (
    <>
      <span aria-hidden className={cn(c, "-left-1 -top-1 border-l-2 border-t-2")} />
      <span aria-hidden className={cn(c, "-right-1 -top-1 border-r-2 border-t-2")} />
      <span aria-hidden className={cn(c, "-bottom-1 -left-1 border-b-2 border-l-2")} />
      <span aria-hidden className={cn(c, "-bottom-1 -right-1 border-b-2 border-r-2")} />
    </>
  );
}

const toneBar = { vital: "bg-vital", arcane: "bg-arcane", gold: "bg-gold" } as const;

export function Meter({ label, value, max, tone }: { label: string; value: number; max: number; tone: keyof typeof toneBar }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-display tracking-wider">{label}</span>
        <span className="tabular-nums text-muted-foreground">{value} / {max}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-sm border border-border bg-background" role="meter" aria-valuenow={value} aria-valuemax={max} aria-label={label}>
        <div className={cn("h-full", toneBar[tone])} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}
