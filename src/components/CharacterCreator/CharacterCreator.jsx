import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { characterData, POINT_BUY_COSTS } from "@/data/constants";
import {
  calculateMaxHP,
  calculatePointBuyTotal,
  abilityModifier,
  applyRacialBonuses,
  proficiencyBonus,
  calculateSavingThrows,
} from "@/data/dndHelpers";
import { Portrait } from "@/components";

export default function CharacterCreator({ universe }) {
  const [name, setName] = useState("");
  const [backstory, setBackStory] = useState("");
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedCharacterClass, setSelectedCharacterClass] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedAlignment, setSelectedAlignment] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [isNpc, setIsNpc] = useState(false);
  const [level, setLevel] = useState(1);
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

    const oldValue = stats[ability];
    const oldCost = POINT_BUY_COSTS[oldValue];
    const newCost = POINT_BUY_COSTS[newValue];

    const costDifference = newCost - oldCost;

    if (costDifference > pointsRemaining) return;

    setStats({ ...stats, [ability]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalStats = selectedRace
      ? applyRacialBonuses(stats, selectedRace)
      : stats;

    const abilityModifiers = Object.fromEntries(
      Object.entries(finalStats).map(([k, v]) => [k, abilityModifier(v)])
    );

    const maxHp = calculateMaxHP(
      level,
      selectedCharacterClass.hitDie,
      abilityModifiers["CON"]
    );

    const spellAttackBonus = selectedCharacterClass.spellcastingAbility
      ? proficiencyBonus(level) +
        abilityModifiers[selectedCharacterClass["spellcastingAbility"]]
      : 0;

    const character = {
      name,
      level,
      race: selectedRace?.name,
      class: selectedCharacterClass?.name,
      background: selectedBackground?.name,
      alignment: selectedAlignment?.name,
      stats: finalStats,
      modifiers: abilityModifiers,
      proficiencyBonus: proficiencyBonus(level),
      initiative_modifier: abilityModifiers["DEX"],
      speed: selectedRace.speed,
      max_hp: maxHp,
      is_npc: isNpc,
      current_hp: maxHp,
      backstory,
      spell_save_dc: spellAttackBonus + 8,
      spell_attack_bonus: spellAttackBonus,
      armor_class: 10 + abilityModifiers["DEX"],
      ability_scores: finalStats,
      saving_throws: calculateSavingThrows(
        abilityModifiers,
        level,
        selectedCharacterClass.savingThrowProficiencies
      ),
    };

    console.log("Created Character:", character);
  };

  return (
    <div className="card flex justify-content-center">
      <Card title="Character Creator">
        <div className="flex gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FloatLabel>
              <label htmlFor="level">Level</label>
              <InputText
                id="name"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                placeholder="Enter character level..."
              />
            </FloatLabel>

            <FloatLabel>
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter character name..."
              />
            </FloatLabel>

            <FloatLabel>
              <Dropdown
                value={selectedRace}
                onChange={(e) => setSelectedRace(e.value)}
                options={characterData.races}
                optionLabel="name"
                placeholder="Select Race"
              />
              <label htmlFor="race">Race</label>
            </FloatLabel>

            <FloatLabel>
              <Dropdown
                value={selectedCharacterClass}
                onChange={(e) => setSelectedCharacterClass(e.value)}
                options={characterData.characterClasses}
                optionLabel="name"
                placeholder="Select Class"
              />
              <label htmlFor="characterClass">Character Class</label>
            </FloatLabel>

            <FloatLabel>
              <Dropdown
                value={selectedBackground}
                onChange={(e) => setSelectedBackground(e.value)}
                options={characterData.backgrounds}
                optionLabel="name"
                placeholder="Select Background"
              />
              <label htmlFor="background">Background</label>
            </FloatLabel>

            <FloatLabel>
              <Dropdown
                value={selectedAlignment}
                onChange={(e) => setSelectedAlignment(e.value)}
                options={characterData.alignments}
                optionLabel="name"
                placeholder="Select Alignment"
              />
              <label htmlFor="alignment">Alignment</label>
            </FloatLabel>

            <span className="flex gap-6">
              <label htmlFor="npc">NPC</label>
              <InputSwitch
                checked={isNpc}
                onChange={(e) => setIsNpc(e.value)}
              />
            </span>

            <div className="flex flex-col">
              <h4 className="mb-3">Ability Scores (Point Buy)</h4>

              <div className="flex flex-col gap-3">
                {Object.keys(stats).map((ability) => (
                  <div
                    key={ability}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3"
                  >
                    <strong className="text-sm w-12">{ability}</strong>

                    <InputNumber
                      value={stats[ability]}
                      onValueChange={(e) => {
                        if (e.value !== null) {
                          updateStat(ability, e.value);
                        }
                      }}
                      showButtons
                      buttonLayout="horizontal"
                      step={pointsRemaining ? 1 : 0}
                      min={8}
                      max={15}
                      decrementButtonClassName="p-button-danger"
                      incrementButtonClassName="p-button-success"
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                      className="w-full min-w-0"
                      format={false}
                    />

                    <span className="text-sm whitespace-nowrap w-14 text-right">
                      Mod:
                      <span
                        className={
                          abilityModifier(stats[ability]) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {abilityModifier(stats[ability]) >= 0 ? "+" : ""}
                        {abilityModifier(stats[ability])}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <strong className="mt-3">
                Points Remaining: {pointsRemaining}
              </strong>
            </div>

            <FloatLabel>
              <InputTextarea
                value={backstory}
                onChange={(e) => setBackStory(e.target.value)}
                rows={4}
                placeholder="Enter character backstory..."
                className="w-full"
              />
              <label>Character Backstory</label>
            </FloatLabel>

            <Button type="submit">Create Character</Button>
          </form>
          <div>
            <FloatLabel>
              <InputText
                id="name"
                label="Image URL"
                value={selectedImageUrl}
                onChange={(e) => setSelectedImageUrl(e.target.value)}
                placeholder="Enter an image URL..."
              />
              <label>Image URL</label>
              <i
                title="You can find image URLs by right clicking on an image you find on the internet and selecting 'Copy Image Link' (wording may vary based on browser). You can verify if it works by pasting the same link on your browser's search bar."
                className="pi pi-info-circle m-6 text-gray-500 hover:text-blue-500 hover:scale-110 transition duration-200 ease-in-out"
              ></i>
            </FloatLabel>
            <Portrait
              imageUrl={selectedImageUrl}
              name={name ? name : "Character Name"}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
