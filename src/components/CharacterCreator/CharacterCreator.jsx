import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

export default function CharacterCreator({ universe }) {
  const [imageSrc, setImageSrc] = useState(null);

  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  // const races = {
  //   league: [
  //     { name: "Human", code: "human" },
  //     { name: "Vastaya", code: "vastaya" },
  //     { name: "Yordle", code: "yordles" },
  //     { name: "Troll", code: "troll" },
  //     { name: "Minotaur", code: "minotaur" },
  //     { name: "Marai", code: "marai" },
  //   ],
  //   classic: [
  //     { name: "Human", code: "human" },
  //     { name: "Dragonborn", code: "dragonborn" },
  //     { name: "Dwarf", code: "dwarf" },
  //     { name: "Elf", code: "elf" },
  //     { name: "Gnome", code: "gnome" },
  //     { name: "Half-Elf", code: "halfelf" },
  //     { name: "Half-Orc", code: "halforc" },
  //     { name: "Tiefling", code: "tiefling" },
  //   ],
  // };

  const races = [
    { name: "Human", code: "human" },
    { name: "Dragonborn", code: "dragonborn" },
    { name: "Dwarf", code: "dwarf" },
    { name: "Elf", code: "elf" },
    { name: "Gnome", code: "gnome" },
    { name: "Half-Elf", code: "halfelf" },
    { name: "Half-Orc", code: "halforc" },
    { name: "Tiefling", code: "tiefling" },
  ];
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

  const [background, setBackground] = useState("");
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

  const [portraitPrompt, setPortraitPrompt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.get("/api/assets/generate", {
      params: { background },
      responseType: "blob", // 👈 IMPORTANT (browser-friendly)
    });

    const imageUrl = URL.createObjectURL(response.data);
    setImageSrc(imageUrl);
  };

  return (
    <div className="card flex justify-content-center">
      <Card title="Character Creator">
        <div className="flex gap-6">
          <div className="flex flex-col gap-8 flex-1">
            <FloatLabel>
              <InputText
                id="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="Name">Name</label>
            </FloatLabel>
            <FloatLabel>
              <Dropdown
                value={race}
                onChange={(e) => setRace(e.value.name)}
                options={races}
                optionLabel="name"
                placeholder="Select a Race"
                className="w-full md:w-14rem"
              />
              <label htmlFor="Race">Race</label>
            </FloatLabel>
            {race}
            <FloatLabel>
              <Dropdown
                value={characterClass}
                onChange={(e) => setCharacterClass(e.value.name)}
                options={characterClasses}
                optionLabel="name"
                placeholder="Select a Character Class"
                className="w-full md:w-14rem"
              />
              <label htmlFor="Character Class">Character Class</label>
            </FloatLabel>
            {characterClass}
            <form onSubmit={handleSubmit}>
              <FloatLabel>
                <InputTextarea
                  id="background"
                  autoResize
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="background">Background</label>
              </FloatLabel>

              <Button type="submit">Submit</Button>
            </form>
          </div>
          <div className="flex align-items-start justify-content-center w-12rem">
            <Image
              src={
                imageSrc ||
                "https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
              }
              alt="Generated Character"
              width="250"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
