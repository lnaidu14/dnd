import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";

export default function CharacterCreator({ universe }) {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const races = {
    league: [
      { name: "Human", code: "human" },
      { name: "Vastaya", code: "vastaya" },
      { name: "Yordle", code: "yordles" },
      { name: "Troll", code: "troll" },
      { name: "Minotaur", code: "minotaur" },
      { name: "Marai", code: "marai" },
    ],
    classic: [
      { name: "Human", code: "human" },
      { name: "Dragonborn", code: "dragonborn" },
      { name: "Dwarf", code: "dwarf" },
      { name: "Elf", code: "elf" },
      { name: "Gnome", code: "gnome" },
      { name: "Half-Elf", code: "halfelf" },
      { name: "Half-Orc", code: "halforc" },
      { name: "Tiefling", code: "tiefling" },
    ],
  };

  const [characterClass, setCharacterClass] = useState("");
  const characterClasses = [
    { name: "Barbarian", code: "barbarian" },
    { name: "Bard", code: "bard" },
    { name: "Cleric", code: "cleric" },
    { name: "Druid", code: "druid" },
    { name: "Fighter", code: "fighter" },
    { name: "Monk", code: "monk" },
    { name: "Paladin", code: "paladin" },
    { name: "Ranger", code: "ranger" },
    { name: "Rogue", code: "rogue" },
  ];

  const [background, setBackground] = useState("default");
  const backgrounds = [
    {
      name: "Acolyte",
      code: "acolyte",
    },
    { name: "Charlatan", code: "charlatan" },
    { name: "Criminal", code: "criminal" },
    { name: "Entertainer", code: "entertainer" },
    { name: "Folk Hero", code: "folkhero" },
    { name: "Guild Artisan", code: "guildartisan" },
    { name: "Noble", code: "noble" },
    { name: "Outlander", code: "outlander" },
    { name: "Sage", code: "sage" },
    { name: "Soldier", code: "soldier" },
    { name: "Urchin", code: "urchin" },
  ];
  const backgroundDescriptions = {
    acolyte:
      "You have spent your life in service to a temple, learning sacred rites and providing sacrifices to the god or gods you worship. Serving the gods and discovering their sacred works will guide you to greatness.",
  };

  return (
    <div className="card flex justify-content-center">
      <Card title="Character Creator">
        <Avatar label="P" size="xlarge" shape="circle" />
        <FloatLabel>
          <InputText
            id="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="Name">Name</label>
        </FloatLabel>
        <Dropdown
          value={race}
          onChange={(e) => setRace(e.value)}
          options={races["league"]}
          optionLabel="name"
          placeholder="Select a Race"
          className="w-full md:w-14rem"
        />

        <Dropdown
          value={characterClass}
          onChange={(e) => setCharacterClass(e.value)}
          options={characterClasses}
          optionLabel="name"
          placeholder="Select a Character Class"
          className="w-full md:w-14rem"
        />

        <Dropdown
          value={background}
          onChange={(e) => setBackground(e.value)}
          options={backgrounds}
          optionLabel="name"
          placeholder="Select a Background"
          className="w-full md:w-14rem"
        />
        {background && (
          <div className="m-3 p-3 border-1 border-400 border-round">
            <h3 className="m-0 mb-2">{background}</h3>
          </div>
        )}
        <p className="m-0">This is the Character Creator component.</p>
      </Card>
    </div>
  );
}
