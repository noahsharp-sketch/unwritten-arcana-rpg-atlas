import { useState } from "react";
import { cn } from "@/lib/utils";
import { dialogue as defaultNode, type DialogueNode } from "./data";

export function DialogueBox({ node = defaultNode, onChoose }: { node?: DialogueNode; onChoose?: (id: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <section className="frame flex flex-col gap-5 p-5 md:flex-row" aria-label={`Conversation with ${node.speaker}`}>
      <div className="flex shrink-0 flex-col items-center md:w-36">
        <div className="grid h-28 w-28 place-items-center rounded-sm border-2 border-gold bg-secondary font-display text-5xl text-gold">
          {node.portrait}
        </div>
        <p className="mt-2 text-center font-display">{node.speaker}</p>
        <p className="text-center text-xs italic text-muted-foreground">{node.role}</p>
      </div>
      <div className="flex-1">
        <div className="parchment rounded-sm p-4 text-lg leading-relaxed">“{node.text}”</div>
        <ol className="mt-4 space-y-1.5">
          {node.choices.map((c, i) => (
            <li key={c.id}>
              <button onClick={() => { setPicked(c.id); onChoose?.(c.id); }}
                className={cn("group flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left transition hover:bg-secondary",
                  picked === c.id && "bg-secondary text-gold")}>
                <span className="font-display text-gold">{i + 1}.</span>
                <span className="flex-1">{c.text}</span>
                {c.tag && <span className="rounded-sm border border-border px-2 text-xs uppercase tracking-widest text-arcane">{c.tag}</span>}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
