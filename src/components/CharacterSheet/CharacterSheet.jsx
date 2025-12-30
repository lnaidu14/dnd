import { useState, useEffect } from "react";
import axios from "axios";

export default function CharacterSheet({ character }) {
  console.log("character: ", character);
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);

  const { ability_scores: abilityScores } = character;
  return (
    <>
      {/* Character Sheet container */}
      <div className="flex flex-col gap-y-12 justify-center">
        {/* Character Information */}
        <div className="flex justify-center items-baseline gap-x-6">
          {/* First column */}
          <div className="flex-auto">
            <div
              id="class"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.character_class}
            </div>
            <label
              htmlFor="class"
              className="flex items-center justify-center text-sm"
            >
              Class
            </label>
            <div
              id="subclass"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.subclass ? character.subclass : "N/A"}
            </div>
            <label
              htmlFor="subclass"
              className="flex items-center justify-center text-sm"
            >
              Subclass
            </label>
            <input
              id="exp"
              value={character.exp}
              className="w-full h-8 flex items-center justify-center text-sm bg-white-800 text-gray-800"
            ></input>
            <label
              htmlFor="exp"
              className="flex items-center justify-center text-sm"
            >
              Experience Level
            </label>
          </div>
          {/* Second column */}
          <div className="flex-auto">
            <div
              id="character_name"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.name}
            </div>
            <label
              htmlFor="character_name"
              className="flex items-center justify-center text-sm"
            >
              Character Name
            </label>
            <input
              id="level"
              value={character.level}
              className="w-full h-8 flex items-center justify-center text-sm bg-white-900 text-gray-800"
            />
            <label
              htmlFor="level"
              className="flex items-center justify-center text-sm"
            >
              Level
            </label>
          </div>
          {/* Third column */}
          <div className="flex-auto">
            <div
              id="race"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.race}
            </div>
            <label
              htmlFor="race"
              className="flex items-center justify-center text-sm"
            >
              Race
            </label>
            <div
              id="background"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.background}
            </div>
            <label
              htmlFor="background"
              className="flex items-center justify-center text-sm"
            >
              Background
            </label>
            <div
              id="alignment"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.alignment}
            </div>
            <label
              htmlFor="alignment"
              className="flex items-center justify-center text-sm"
            >
              Alignment
            </label>
          </div>
        </div>
        {/* Ability Scores and Modifiers */}
        <div className="flex justify-center items-baseline">
          <div className="flex flex-col flex-auto">
            <div id="str" className="">
              {abilityScores.STR}
            </div>
            <label htmlFor="str">STR</label>
          </div>
          <div className="flex flex-col flex-auto">
            <div id="dex" className="">
              {abilityScores.DEX}
            </div>
            <label htmlFor="dex">DEX</label>
          </div>
          <div className="flex flex-col flex-auto">
            <div id="con" className="">
              {abilityScores.CON}
            </div>
            <label htmlFor="con">CON</label>
          </div>
          <div className="flex flex-col flex-auto">
            <div id="int" className="">
              {abilityScores.INT}
            </div>
            <label htmlFor="int">INT</label>
          </div>
          <div className="flex flex-col flex-auto">
            <div id="wis" className="">
              {abilityScores.WIS}
            </div>
            <label htmlFor="wis">WIS</label>
          </div>
          <div className="flex flex-col flex-auto">
            <div id="cha" className="">
              {abilityScores.CHA}
            </div>
            <label htmlFor="cha">CHA</label>
          </div>
        </div>
      </div>
    </>
  );
}
