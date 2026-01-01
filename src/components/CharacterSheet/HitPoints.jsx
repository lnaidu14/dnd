import React from "react";

export default function HitPoints({ character }) {
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
