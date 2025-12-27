import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { characterData } from "@/data/constants";
import {
  calculatePointBuyTotal,
  abilityModifier,
  applyRacialBonuses,
  proficiencyBonus,
} from "@/data/dndHelpers";

export default function CharacterCreator({ universe }) {
  const [name, setName] = useState("");
  const [backstory, setBackStory] = useState("");
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedCharacterClass, setSelectedCharacterClass] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedAlignment, setSelectedAlignment] = useState(null);
  const [level] = useState(1);
  const [stats, setStats] = useState({
    STR: 8,
    DEX: 8,
    CON: 8,
    INT: 8,
    WIS: 8,
    CHA: 8,
  });

  const pointsSpent = calculatePointBuyTotal(stats);
  const pointsRemaining = 27 - pointsSpent;

  const updateStat = (ability, newValue) => {
    if (newValue < 8 || newValue > 15) return;

    const newStats = { ...stats, [ability]: newValue };
    const newTotal = calculatePointBuyTotal(newStats);

    if (newTotal <= 27) {
      setStats(newStats);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalStats = selectedRace
      ? applyRacialBonuses(stats, selectedRace)
      : stats;

    const character = {
      name,
      level,
      race: selectedRace?.name,
      class: selectedCharacterClass?.name,
      background: selectedBackground?.name,
      alignment: selectedAlignment?.name,
      stats: finalStats,
      modifiers: Object.fromEntries(
        Object.entries(finalStats).map(([k, v]) => [k, abilityModifier(v)])
      ),
      proficiencyBonus: proficiencyBonus(level),
      backstory,
    };

    console.log("FINAL CHARACTER:", character);
  };

  return (
    <div className="card flex justify-content-center">
      <Card title="Character Creator">
        <div className="flex gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FloatLabel>
              <InputText
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Name</label>
            </FloatLabel>

            <Dropdown
              value={selectedRace}
              onChange={(e) => setSelectedRace(e.value)}
              options={characterData.races}
              optionLabel="name"
              placeholder="Select Race"
            />

            <Dropdown
              value={selectedCharacterClass}
              onChange={(e) => setSelectedCharacterClass(e.value)}
              options={characterData.characterClasses}
              optionLabel="name"
              placeholder="Select Class"
            />

            <Dropdown
              value={selectedBackground}
              onChange={(e) => setSelectedBackground(e.value)}
              options={characterData.backgrounds}
              optionLabel="name"
              placeholder="Select Background"
            />

            <Dropdown
              value={selectedAlignment}
              onChange={(e) => setSelectedAlignment(e.value)}
              options={characterData.alignments}
              optionLabel="name"
              placeholder="Select Alignment"
            />

            <div>
              <h4>Ability Scores (Point Buy)</h4>
              {Object.keys(stats).map((ability) => (
                <div key={ability} className="flex align-items-center gap-2">
                  <strong>{ability}</strong>
                  <InputNumber
                    value={stats[ability]}
                    onValueChange={(e) => updateStat(ability, e.value)}
                    showButtons
                    buttonLayout="horizontal"
                    step={1}
                    min={8}
                    max={15}
                    decrementButtonClassName="p-button-danger"
                    incrementButtonClassName="p-button-success"
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                  />
                  <span>
                    Mod: {abilityModifier(stats[ability]) >= 0 ? "+" : ""}
                    {abilityModifier(stats[ability])}
                  </span>
                </div>
              ))}
              <strong>Points Remaining: {pointsRemaining}</strong>
            </div>

            <FloatLabel>
              <InputTextarea
                value={backstory}
                onChange={(e) => setBackStory(e.target.value)}
                rows={4}
              />
              <label>Backstory</label>
            </FloatLabel>

            <Button type="submit">Create Character</Button>
          </form>

          <Image
            src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
            alt="Character"
            width="250"
          />
        </div>
      </Card>
    </div>
  );
}
