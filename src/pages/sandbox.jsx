import { CharacterCreator } from "@/components";
import { useState, useEffect } from "react";

export default function Sandbox() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CharacterCreator />
    </div>
  );
}
