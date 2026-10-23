import { Frame, Meter } from "./Frame";
import { character as defaultCharacter } from "./data";

export function CharacterPanel({ character = defaultCharacter }: { character?: typeof defaultCharacter }) {
  const c = character;
  return (
    <Frame title="Character" subtitle={c.title}>
      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-gold bg-secondary font-display text-3xl text-gold glow-arcane">
          {c.name[0]}
        </div>
        <div className="flex-1">
          <h3 className="text-lg">{c.name}</h3>
          <p className="text-sm text-muted-foreground">Level {c.level} Scrivener</p>
          <div className="mt-2">
            <Meter label="Experience" value={c.xp.current} max={c.xp.next} tone="gold" />
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {c.vitals.map((v) => <Meter key={v.key} label={v.label} value={v.value} max={v.max} tone={v.tone} />)}
      </div>

      <h4 className="mt-6 mb-2 text-sm text-gold">Attributes</h4>
      <dl className="grid grid-cols-3 gap-2">
        {c.attributes.map((a) => (
          <div key={a.label} className="rounded-sm border border-border bg-secondary px-2 py-2 text-center">
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">{a.label}</dt>
            <dd className="font-display text-2xl">{a.value}</dd>
          </div>
        ))}
      </dl>

      <h4 className="mt-6 mb-2 text-sm text-gold">Equipped</h4>
      <ul className="divide-y divide-border">
        {c.equipped.map((e) => (
          <li key={e.slot} className="flex justify-between py-1.5 text-sm">
            <span className="text-muted-foreground">{e.slot}</span><span>{e.item}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
