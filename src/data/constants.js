export const POINT_BUY_COSTS = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
};

export const characterData = {
  races: [
    {
      name: "Human",
      code: "human",
      bonuses: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
      speed: 30,
    },
    {
      name: "Elf",
      code: "elf",
      bonuses: { DEX: 2 },
      speed: 30,
    },
    {
      name: "Dwarf",
      code: "dwarf",
      bonuses: { CON: 2 },
      speed: 25,
    },
    {
      name: "Half-Orc",
      code: "halforc",
      bonuses: { STR: 2, CON: 1 },
      speed: 30,
    },
    {
      name: "Tiefling",
      code: "tiefling",
      bonuses: { CHA: 2, INT: 1 },
      speed: 30,
    },
  ],

  characterClasses: [
    {
      name: "Barbarian",
      code: "barbarian",
      hitDie: 12,
      savingThrowProficiencies: ["STR", "CON"],
    },
    {
      name: "Bard",
      code: "bard",
      hitDie: 8,
      spellcastingAbility: "CHA",
      savingThrowProficiencies: ["DEX", "CHA"],
    },
    {
      name: "Cleric",
      code: "cleric",
      hitDie: 8,
      spellcastingAbility: "WIS",
      savingThrowProficiencies: ["WIS", "CHA"],
    },
    {
      name: "Druid",
      code: "druid",
      hitDie: 8,
      spellcastingAbility: "WIS",
      savingThrowProficiencies: ["INT", "WIS"],
    },
    {
      name: "Fighter",
      code: "fighter",
      hitDie: 10,
      savingThrowProficiencies: ["STR", "CON"],
    },
    {
      name: "Monk",
      code: "monk",
      hitDie: 8,
      savingThrowProficiencies: ["STR", "DEX"],
    },
    {
      name: "Paladin",
      code: "paladin",
      hitDie: 10,
      savingThrowProficiencies: ["WIS", "CHA"],
    },
    {
      name: "Ranger",
      code: "ranger",
      hitDie: 10,
      savingThrowProficiencies: ["STR", "DEX"],
    },
    {
      name: "Rogue",
      code: "rogue",
      hitDie: 8,
      savingThrowProficiencies: ["DEX", "INT"],
    },
    {
      name: "Warlock",
      code: "warlock",
      hitDie: 8,
      spellcastingAbility: "CHA",
      savingThrowProficiencies: ["WIS", "CHA"],
    },
    {
      name: "Wizard",
      code: "wizard",
      hitDie: 6,
      spellcastingAbility: "INT",
      savingThrowProficiencies: ["INT", "WIS"],
    },
    {
      name: "Sorcerer",
      code: "sorcerer",
      hitDie: 6,
      spellcastingAbility: "CHA",
      savingThrowProficiencies: ["CON", "CHA"],
    },
  ],

  backgrounds: [
    { name: "Acolyte", code: "acolyte" },
    { name: "Criminal", code: "criminal" },
    { name: "Folk Hero", code: "folkhero" },
    { name: "Noble", code: "noble" },
    { name: "Soldier", code: "soldier" },
  ],

  alignments: [
    { name: "Lawful Good", code: "LG" },
    { name: "Neutral Good", code: "NG" },
    { name: "Chaotic Good", code: "CG" },
    { name: "True Neutral", code: "TN" },
    { name: "Chaotic Neutral", code: "CN" },
    { name: "Lawful Evil", code: "LE" },
    { name: "Neutral Evil", code: "NE" },
    { name: "Chaotic Evil", code: "CE" },
  ],
};
