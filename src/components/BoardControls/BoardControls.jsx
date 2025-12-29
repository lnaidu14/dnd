import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { CharacterCreator } from "@/components";
import { InputSwitch } from "primereact/inputswitch";
import { Menu } from "primereact/menu";

export default function BoardControls({
  gridVisible,
  toggleGrid,
  snapToGrid,
  toggleSnapToGrid,
  measurement,
}) {
  const [isCharacterCreatorOpen, setIsCharacterCreatorOpen] = useState(false);
  const settingsMenuRef = useRef(null);
  const settingsMenuItems = [
    {
      label: "Settings",
      items: [
        {
          label: "Grid",
          icon: "pi pi-table",
          template: (item, options) => {
            return (
              <div
                className="flex items-center w-full justify-between px-4 py-2 p-menuitem-content"
                data-pc-section="content"
                onMouseMove={(e) => options.onMouseMove(e)}
                onClick={(e) => e.stopPropagation()}
              >
                <label htmlFor="grid" onClick={(e) => e.stopPropagation()}>
                  Grid
                </label>

                <InputSwitch
                  checked={gridVisible}
                  onChange={toggleGrid}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            );
          },
        },
        {
          label: "Snap to Grid",
          icon: "pi pi-arrows-alt",
          template: (item, options) => {
            return (
              <div
                className="flex items-center w-full justify-between px-4 py-2 p-menuitem-content"
                data-pc-section="content"
                onMouseMove={(e) => options.onMouseMove(e)}
                onClick={(e) => e.stopPropagation()}
              >
                <label
                  htmlFor="snap_to_grid"
                  onClick={(e) => e.stopPropagation()}
                >
                  Snap to Grid
                </label>
                <InputSwitch
                  onChange={toggleSnapToGrid}
                  checked={snapToGrid}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            );
          },
        },
      ],
    },
  ];

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
        style={{ width: "60vw" }}
        onHide={() => {
          if (!isCharacterCreatorOpen) return;
          setIsCharacterCreatorOpen(false);
        }}
      >
        <CharacterCreator />
      </Dialog>

      <Menu
        model={settingsMenuItems}
        popup
        ref={settingsMenuRef}
        id="popup_menu_left"
      />
      <Button
        icon="pi pi-cog"
        onClick={(event) => settingsMenuRef.current.toggle(event)}
        aria-controls="popup_menu_left"
        aria-haspopup
        rounded
        severity="secondary"
      />
    </div>
  );
}
