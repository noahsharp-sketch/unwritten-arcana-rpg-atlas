import { useState } from "react";
import { cn } from "@/lib/utils";
import { Frame } from "./Frame";
import { spells as defaultSpells, type Spell } from "./data";

export function Spellbook({ spells = defaultSpells, onCast }: { spells?: Spell[]; onCast?: (s: Spell) => void }) {
  const [selected, setSelected] = useState<Spell>(spells[0]!);
  return (
    <Frame title="Spellbook" subtitle="Words that rewrite the world" variant="parchment">
      <div className="grid gap-5 md:grid-cols-2">
        <ul className="grid grid-cols-3 gap-3 content-start">
          {spells.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => setSelected(s)}
                aria-pressed={selected.id === s.id}
                className={cn(
                  "flex aspect-square w-full flex-col items-center justify-center rounded-sm border-2 border-parchment-muted/40 transition",
                  selected.id === s.id ? "border-ember bg-parchment-ink/10" : "hover:border-parchment-ink/60",
                  !s.known && "opacity-45",
                )}
              >
                <span className="text-3xl leading-none">{s.glyph}</span>
                <span className="mt-1 text-xs font-display">{s.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <article className="border-l-2 border-parchment-muted/30 pl-5">
          <p className="text-xs uppercase tracking-widest text-parchment-muted">{selected.school}</p>
          <h3 className="text-2xl">{selected.name}</h3>
          <p className="mt-3 italic leading-relaxed">{selected.description}</p>
          <dl className="mt-4 flex gap-6 text-sm">
            <div><dt className="text-parchment-muted">Ink</dt><dd className="font-display text-lg">{selected.cost}</dd></div>
            <div><dt className="text-parchment-muted">Recharge</dt><dd className="font-display text-lg">{selected.cooldown}</dd></div>
          </dl>
          <button
            disabled={!selected.known}
            onClick={() => onCast?.(selected)}
            className="mt-5 rounded-sm border border-parchment-ink bg-parchment-ink px-4 py-2 font-display text-sm tracking-widest text-parchment transition hover:bg-ember hover:border-ember disabled:cursor-not-allowed disabled:opacity-40"
          >
            {selected.known ? "Inscribe to hotbar" : "Not yet learned"}
          </button>
        </article>
      </div>
    </Frame>
  );
}
