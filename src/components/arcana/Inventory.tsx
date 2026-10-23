import { useState } from "react";
import { cn } from "@/lib/utils";
import { Frame } from "./Frame";
import { inventory as defaultItems, gold as defaultGold, type Item, type Rarity } from "./data";

const rarityBorder: Record<Rarity, string> = {
  common: "border-rarity-common/50",
  rare: "border-rarity-rare",
  epic: "border-rarity-epic",
  legendary: "border-rarity-legendary glow-arcane",
};
const rarityText: Record<Rarity, string> = {
  common: "text-rarity-common", rare: "text-rarity-rare", epic: "text-rarity-epic", legendary: "text-rarity-legendary",
};

export function Inventory({ items = defaultItems, gold = defaultGold, slots = 20 }: { items?: Item[]; gold?: number; slots?: number }) {
  const [sel, setSel] = useState<Item | null>(items[0] ?? null);
  const empty = Math.max(0, slots - items.length);
  return (
    <Frame title="Satchel" subtitle={`${items.length} / ${slots} slots`}
      actions={<span className="font-display text-gold">⛁ {gold.toLocaleString()}</span>}>
      <div className="grid grid-cols-5 gap-2">
        {items.map((it) => (
          <button key={it.id} onClick={() => setSel(it)} aria-label={it.name} aria-pressed={sel?.id === it.id}
            className={cn("relative grid aspect-square place-items-center rounded-sm border-2 bg-secondary text-2xl transition hover:bg-muted",
              rarityBorder[it.rarity], sel?.id === it.id && "ring-2 ring-ring ring-offset-2 ring-offset-card")}>
            {it.glyph}
            {it.qty > 1 && <span className="absolute bottom-0.5 right-1 text-xs tabular-nums text-muted-foreground">{it.qty}</span>}
          </button>
        ))}
        {Array.from({ length: empty }).map((_, i) => (
          <div key={i} className="aspect-square rounded-sm border border-dashed border-border bg-background/40" />
        ))}
      </div>
      {sel && (
        <div className="mt-4 rounded-sm border border-border bg-background/50 p-3">
          <div className="flex items-baseline justify-between">
            <h3 className={cn("text-base", rarityText[sel.rarity])}>{sel.name}</h3>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{sel.rarity} · {sel.kind}</span>
          </div>
          <p className="mt-1 text-sm italic text-muted-foreground">{sel.note}</p>
        </div>
      )}
    </Frame>
  );
}
