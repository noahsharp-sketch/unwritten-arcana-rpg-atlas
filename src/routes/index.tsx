import { createFileRoute } from "@tanstack/react-router";
import { CharacterPanel } from "@/components/arcana/CharacterPanel";
import { Spellbook } from "@/components/arcana/Spellbook";
import { Inventory } from "@/components/arcana/Inventory";
import { QuestLog } from "@/components/arcana/QuestLog";
import { DialogueBox } from "@/components/arcana/DialogueBox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Unwritten Arcana — Interface Prototype" },
      { name: "description", content: "Fantasy RPG UI prototype: character, spellbook, inventory, quest log and dialogue panels." },
      { property: "og:title", content: "The Unwritten Arcana — Interface Prototype" },
      { property: "og:description", content: "Modular fantasy RPG interface panels for The Unwritten Arcana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-arcane">Interface Prototype</p>
        <h1 className="gilt-text mt-2 text-4xl md:text-5xl">The Unwritten Arcana</h1>
        <p className="mt-2 italic text-muted-foreground">Mock data only — panels are standalone and await game-state wiring.</p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
        <CharacterPanel />
        <div className="grid gap-8">
          <Spellbook />
          <div className="grid gap-8 xl:grid-cols-[1fr_1.3fr]">
            <Inventory />
            <QuestLog />
          </div>
        </div>
      </div>
      <div className="mt-8"><DialogueBox /></div>
    </main>
  );
}
