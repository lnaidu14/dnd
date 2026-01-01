import React from "react";

export default function AbilityScores({ abilityScores }) {
  return (
    <>
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
    </>
  );
}
