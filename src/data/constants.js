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
        },
        {
            name: "Elf",
            code: "elf",
            bonuses: { DEX: 2 },
        },
        {
            name: "Dwarf",
            code: "dwarf",
            bonuses: { CON: 2 },
        },
        {
            name: "Half-Orc",
            code: "halforc",
            bonuses: { STR: 2, CON: 1 },
        },
        {
            name: "Tiefling",
            code: "tiefling",
            bonuses: { CHA: 2, INT: 1 },
        },
    ],

    characterClasses: [
        { name: "Barbarian", code: "barbarian" },
        { name: "Bard", code: "bard" },
        { name: "Cleric", code: "cleric" },
        { name: "Druid", code: "druid" },
        { name: "Fighter", code: "fighter" },
        { name: "Monk", code: "monk" },
        { name: "Paladin", code: "paladin" },
        { name: "Ranger", code: "ranger" },
        { name: "Rogue", code: "rogue" },
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
