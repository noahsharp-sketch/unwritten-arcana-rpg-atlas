import { useState } from "react";
import { cn } from "@/lib/utils";
import { Frame } from "./Frame";
import { quests as defaultQuests, type Quest } from "./data";

export function QuestLog({ quests = defaultQuests }: { quests?: Quest[] }) {
  const [sel, setSel] = useState(quests[0]);
  return (
    <Frame title="Quest Log" subtitle="Threads yet to be tied">
      <div className="grid gap-5 md:grid-cols-[14rem_1fr]">
        <ul className="space-y-1">
          {quests.map((q) => (
            <li key={q.id}>
              <button onClick={() => setSel(q)} aria-pressed={sel.id === q.id}
                className={cn("w-full rounded-sm border-l-2 px-3 py-2 text-left transition",
                  sel.id === q.id ? "border-gold bg-secondary" : "border-transparent hover:bg-muted",
                  q.status === "done" && "opacity-55")}>
                <span className={cn("block text-xs uppercase tracking-widest", q.type === "main" ? "text-ember" : "text-arcane")}>
                  {q.type === "main" ? "Main tale" : "Side tale"}{q.status === "done" && " · Complete"}
                </span>
                <span className="font-display">{q.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <article>
          <h3 className="text-xl">{sel.title}</h3>
          <p className="text-sm text-muted-foreground">Given by {sel.giver}</p>
          <p className="mt-3 leading-relaxed">{sel.summary}</p>
          <ol className="mt-4 space-y-2">
            {sel.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span aria-hidden className={cn("mt-1 grid h-4 w-4 shrink-0 place-items-center rotate-45 border",
                  s.done ? "border-gold bg-gold" : "border-muted-foreground")} />
                <span className={cn(s.done && "text-muted-foreground line-through")}>{s.text}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </Frame>
  );
}
