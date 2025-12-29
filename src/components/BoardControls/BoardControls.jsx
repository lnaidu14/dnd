import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { CharacterCreator } from "@/components";
import { Checkbox } from "primereact/checkbox";

function SettingsPanel({
  gridVisible,
  toggleGrid,
  snapToGrid,
  toggleSnapToGrid,
  measurement,
}) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-6 items-center">
          <i className="pi pi-table" />
          <i className="pi pi-arrows-alt" />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div>Grid</div>
          <div>Snap to Grid</div>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <Checkbox onChange={toggleGrid} checked={gridVisible} />
          <Checkbox onChange={toggleSnapToGrid} checked={snapToGrid} />
        </div>
      </div>
      <div className="flex gap-2 items-center"></div>

      <div
        className="absolute right-0 top-full mt-2 w-56
                        bg-gray-800 border border-gray-700 rounded-lg
                        shadow-lg z-50"
      ></div>
    </>
  );
}

export default function BoardControls({
  gridVisible,
  toggleGrid,
  snapToGrid,
  toggleSnapToGrid,
  measurement,
}) {
  const [isCharacterCreatorOpen, setIsCharacterCreatorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center gap-2">
      <Button
        icon="pi pi-plus"
        onClick={() => setIsCharacterCreatorOpen(true)}
        rounded
        severity="success"
      />
      <Dialog
        header="Character Creator"
        visible={isCharacterCreatorOpen}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!isCharacterCreatorOpen) return;
          setIsCharacterCreatorOpen(false);
        }}
      >
        <CharacterCreator />
      </Dialog>

      <Button
        icon="pi pi-cog"
        onClick={() => setIsSettingsOpen(true)}
        rounded
        severity="secondary"
      />
      <Dialog
        header="Board Settings"
        visible={isSettingsOpen}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!isSettingsOpen) return;
          setIsSettingsOpen(false);
        }}
      >
        <SettingsPanel
          gridVisible={gridVisible}
          toggleGrid={toggleGrid}
          snapToGrid={snapToGrid}
          toggleSnapToGrid={toggleSnapToGrid}
          measurement={measurement}
        />
      </Dialog>
    </div>
  );
}
