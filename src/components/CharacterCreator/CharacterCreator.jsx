import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast";
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
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";

export default function CharacterCreator({
  campaignId,
  setIsCharacterCreatorOpen,
}) {
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
  const [isCreating, setIsCreating] = useState(false);
  const toast = useRef(null);

  const pointsSpent = calculatePointBuyTotal(stats);
  const pointsRemaining = 27 - pointsSpent;

  const createCharacter = async (character) => {
    try {
      const response = await axios.post("/api/characters", character);
      toast.current.show({
        severity: "success",
        summary: "Created",
        detail: "Character created successfully!",
        life: 3000,
      });
      return response.data.character;
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create character",
        life: 3000,
      });
    }
  };

  const updateStat = (ability, newValue) => {
    if (newValue < 8 || newValue > 15) return;

    const oldValue = stats[ability];
    const oldCost = POINT_BUY_COSTS[oldValue];
    const newCost = POINT_BUY_COSTS[newValue];

    const costDifference = newCost - oldCost;

    if (costDifference > pointsRemaining) return;

    setStats({ ...stats, [ability]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);

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
      campaign_id: campaignId,
      name,
      level,
      race: selectedRace?.name,
      character_class: selectedCharacterClass?.name,
      subclass: "",
      background: selectedBackground?.name,
      alignment: selectedAlignment?.name,
      ability_modifiers: abilityModifiers,
      proficiency_bonus: proficiencyBonus(level),
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
      portrait: selectedImageUrl,
      token_image: selectedImageUrl,
    };

    const createdCharacter = await createCharacter(character);
    if (createdCharacter) {
      setIsCreating(false);
      setIsCharacterCreatorOpen(false);
    }
  };

  return (
    <div className="card flex justify-content-center">
      {isCreating ? <ProgressSpinner /> : <></>}
      <Toast ref={toast} />
      <Card>
        <div className="flex flex-row gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="text-xl font-bold uppercase mb-2">
              Character Information
            </div>
            <FloatLabel>
              <label htmlFor="level">Level</label>
              <InputText
                id="name"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                placeholder="Enter character level..."
                className="w-full"
              />
            </FloatLabel>

            <FloatLabel>
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter character name..."
                className="w-full"
              />
            </FloatLabel>

            <FloatLabel>
              <Dropdown
                value={selectedRace}
                onChange={(e) => setSelectedRace(e.value)}
                options={characterData.races}
                optionLabel="name"
                placeholder="Select Race"
                className="w-full"
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
                className="w-full"
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
                className="w-full"
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
                className="w-full"
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
              <div className="text-xl font-bold uppercase mb-2">
                Ability Scores
              </div>

              <div className="flex flex-col flex-1 gap-3">
                {Object.keys(stats).map((ability) => {
                  const value = stats[ability];

                  const increment = () => {
                    if (value < 15) {
                      updateStat(ability, value + 1);
                    }
                  };

                  const decrement = () => {
                    if (value > 8) {
                      updateStat(ability, value - 1);
                    }
                  };

                  return (
                    <div
                      key={ability}
                      className="flex flex-row gap-x-6 items-center"
                    >
                      <strong className="text-sm w-12">{ability}</strong>

                      <Button
                        type="button"
                        onClick={decrement}
                        disabled={value <= 8}
                        className="p-button-danger disabled:opacity-40"
                      >
                        <div className="pi pi-minus"></div>
                      </Button>

                      <div className="w-10 h-10 flex items-center rounded-md justify-center text-sm bg-gray-100 text-gray-800">
                        {value}
                      </div>

                      <Button
                        type="button"
                        onClick={increment}
                        disabled={value >= 15}
                        className="p-button-success disabled:opacity-40"
                      >
                        <div className="pi pi-plus"></div>
                      </Button>

                      <span className="text-sm whitespace-nowrap w-14 text-right">
                        Mod:
                        <span
                          className={
                            abilityModifier(value) >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {abilityModifier(value) >= 0 ? "+" : ""}
                          {abilityModifier(value)}
                        </span>
                      </span>
                    </div>
                  );
                })}
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

            <Button type="submit" label="Create Character" />
          </form>
          <div className="flex flex-col gap-6 items-center">
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
                className="pi pi-info-circle ml-4 text-gray-500 hover:text-blue-500 hover:scale-110 transition duration-200 ease-in-out"
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
