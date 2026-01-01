import React from "react";

export default function Skills({ skills, skillProficiencies }) {
  return (
    <>
      <div>
        <h1>Skills</h1>
        {Object.keys(skills).map((cs) => {
          return (
            <>
              <div className="flex flex-auto gap-6">
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={skillProficiencies.find(
                    (sp) => sp.name === cs
                  )}
                  disabled
                />
                <input
                  type="text"
                  value={skills[cs]}
                  name="skill_modifier"
                />
                <p>{cs}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
