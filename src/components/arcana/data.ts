// Mock data for the UI prototype. Replace with game-state adapters when integrating.
export type Rarity = "common" | "rare" | "epic" | "legendary";

export const character = {
  name: "Ilsabet Vanehart",
  title: "Scrivener of the Blank Page",
  level: 12,
  xp: { current: 7420, next: 9000 },
  vitals: [
    { key: "HP", label: "Vitality", value: 84, max: 120, tone: "vital" },
    { key: "MP", label: "Ink", value: 63, max: 90, tone: "arcane" },
    { key: "ST", label: "Resolve", value: 40, max: 50, tone: "gold" },
  ] as const,
  attributes: [
    { label: "Might", value: 9 },
    { label: "Grace", value: 13 },
    { label: "Wit", value: 18 },
    { label: "Will", value: 16 },
    { label: "Lore", value: 20 },
    { label: "Fate", value: 11 },
  ],
  equipped: [
    { slot: "Head", item: "Circlet of Margins" },
    { slot: "Body", item: "Vellum-Woven Robe" },
    { slot: "Hand", item: "Quill of First Words" },
    { slot: "Charm", item: "Unsealed Locket" },
  ],
};

export type Spell = {
  id: string; name: string; school: string; cost: number; cooldown: string;
  glyph: string; description: string; known: boolean;
};
export const spells: Spell[] = [
  { id: "s1", name: "Erasure", school: "Unwriting", cost: 12, cooldown: "6s", glyph: "✕", known: true,
    description: "Strike a line through a foe's next action. It simply never happens." },
  { id: "s2", name: "Marginalia", school: "Annotation", cost: 8, cooldown: "3s", glyph: "✎", known: true,
    description: "Scribble a ward beside an ally, absorbing the next 30 damage." },
  { id: "s3", name: "Ink Tide", school: "Flow", cost: 20, cooldown: "12s", glyph: "≈", known: true,
    description: "A wave of living ink slows all enemies in a cone." },
  { id: "s4", name: "Footnote", school: "Annotation", cost: 5, cooldown: "1s", glyph: "†", known: true,
    description: "Reveal a hidden weakness on the target for 10 seconds." },
  { id: "s5", name: "Blank Verse", school: "Unwriting", cost: 35, cooldown: "40s", glyph: "◯", known: false,
    description: "Silence every voice in the room — friend and foe alike." },
  { id: "s6", name: "Colophon", school: "Binding", cost: 50, cooldown: "120s", glyph: "❖", known: false,
    description: "Seal the chapter. Fallen allies rise with half their vitality." },
];

export type Item = { id: string; name: string; rarity: Rarity; qty: number; glyph: string; kind: string; note: string };
export const inventory: Item[] = [
  { id: "i1", name: "Vial of Lampblack", rarity: "common", qty: 7, glyph: "⚱", kind: "Consumable", note: "Restores 25 Ink." },
  { id: "i2", name: "Saffron Wax Seal", rarity: "rare", qty: 2, glyph: "✺", kind: "Reagent", note: "Binds a spell to an object." },
  { id: "i3", name: "Torn Index Page", rarity: "epic", qty: 1, glyph: "▤", kind: "Quest", note: "Lists names no one remembers." },
  { id: "i4", name: "Quill of First Words", rarity: "legendary", qty: 1, glyph: "✒", kind: "Weapon", note: "+6 Lore. Equipped." },
  { id: "i5", name: "Hardtack", rarity: "common", qty: 4, glyph: "▣", kind: "Food", note: "Restores 15 Vitality." },
  { id: "i6", name: "Moth-Eaten Map", rarity: "rare", qty: 1, glyph: "⌖", kind: "Key", note: "The Blotted Coast." },
  { id: "i7", name: "Silver Bookmark", rarity: "rare", qty: 3, glyph: "⟟", kind: "Trinket", note: "Return to a saved place." },
  { id: "i8", name: "Gilded Thread", rarity: "epic", qty: 5, glyph: "∿", kind: "Reagent", note: "For rebinding tomes." },
];
export const gold = 1284;

export type Quest = {
  id: string; title: string; giver: string; type: "main" | "side"; status: "active" | "done";
  summary: string; steps: { text: string; done: boolean }[];
};
export const quests: Quest[] = [
  { id: "q1", title: "The Missing Chapter", giver: "Archivist Orel", type: "main", status: "active",
    summary: "Somewhere between chapters eleven and twelve, a city has been unwritten. Find who held the pen.",
    steps: [
      { text: "Speak with Archivist Orel", done: true },
      { text: "Recover the Torn Index Page", done: true },
      { text: "Follow the ink trail to the Blotted Coast", done: false },
      { text: "Confront the Redactor", done: false },
    ] },
  { id: "q2", title: "A Seal of Saffron", giver: "Wren the Chandler", type: "side", status: "active",
    summary: "Wren's candles keep burning out mid-sentence. She suspects her wax is cursed.",
    steps: [
      { text: "Collect 3 Saffron Wax Seals", done: false },
      { text: "Return to Wren's shop", done: false },
    ] },
  { id: "q3", title: "Overdue", giver: "The Lending Ghost", type: "side", status: "done",
    summary: "A spectral librarian wanted one book returned — two hundred years late.",
    steps: [{ text: "Return 'On Quiet Endings'", done: true }] },
];

export type DialogueNode = { speaker: string; role: string; portrait: string; text: string; choices: { id: string; text: string; tag?: string }[] };
export const dialogue: DialogueNode = {
  speaker: "Archivist Orel",
  role: "Keeper of the Lower Stacks",
  portrait: "O",
  text: "The ink is still wet on this page, Scrivener. Whoever unwrote Calderwick did it tonight — and they left their quill behind. Will you follow the trail, or shall I send for the Wardens?",
  choices: [
    { id: "c1", text: "I'll follow the trail myself.", tag: "Quest" },
    { id: "c2", text: "Let me examine the quill first.", tag: "Lore 18" },
    { id: "c3", text: "Why would anyone erase a whole city?" },
    { id: "c4", text: "Send for the Wardens. I'm not ready.", tag: "Leave" },
  ],
};
