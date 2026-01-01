import React from "react";
import CharacterInformation from "./CharacterInformation";
import AbilityScores from "./AbilityScores";


function HitPoints({ character }) {
  return (
    <>
      <div className="flex-auto">
        <h1>Hit Points</h1>
        <div className="flex gap-3">
          <div>MAX: {character.max_hp}</div>
          <div>CURRENT: {character.current_hp}</div>
          <div>TEMP: {character.temp_hp}</div>
        </div>
      </div>
    </>
  );
}

export default function Overview({abilityScores, character}) {
  return (
    <>
      <div>
        {/* Character Information */}
        <CharacterInformation character={character} />
        {/* Ability Scores and Modifiers */}
        <AbilityScores abilityScores={abilityScores} />
        <HitPoints character={character} />
        <div>Proficiency Bonus: {character.proficiency_bonus}</div>
      </div>
    </>
  );
}
