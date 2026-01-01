import { useState, useEffect } from "react";
import Skills from "./Skills";
import { TabMenu } from "primereact/tabmenu";
import Overview from "./Overview";
import Miscellaneous from "./Miscellaneous";

export default function CharacterSheet({ character }) {
  console.log("character: ", character);
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { label: "Overview", icon: "pi pi-home" },
    { label: "Skills", icon: "pi pi-chart-line" },
    { label: "Miscellaneous", icon: "pi pi-inbox" },
  ];

  const {
    ability_scores: abilityScores,
    skills,
    skill_proficiencies: skillProficiencies,
  } = character;
  return (
    <>
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />

      {/* Character Sheet container */}
      <div className="flex flex-col gap-y-12 justify-center">
        {(() => {
          switch (activeIndex) {
            case 0:
              return (
                <Overview character={character} abilityScores={abilityScores} />
              );
            case 1:
              return (
                <Skills
                  skills={skills}
                  skillProficiencies={skillProficiencies}
                />
              );
            case 2:
              return <Miscellaneous character={character} />;

            default:
              return null;
          }
        })()}

        {/* Main area */}
        <div className="flex">
          <div>
            {/* Death Saves */}
            <div>
              Death Saves
              <div className="flex gap-3">
                {/* Successes */}
                <div>Successes</div>
                {/* Failures */}
                <div>Failures</div>
              </div>
            </div>
            {/* Conditions */}
            <div>Conditions</div>
          </div>
        </div>
      </div>
    </>
  );
}
