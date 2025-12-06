import React, { useState } from 'react';
import styles from './BoardControls.module.css';
import { FiSettings, FiGrid, FiMove, FiX } from "react-icons/fi";
import { Dropdown } from "primereact/dropdown";

export default function BoardControls({
  gridVisible,
  toggleGrid,
  snapToGrid,
  toggleSnapToGrid,
  sides,
  setSides,
  measurement,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const sideOptions = [
    { name: "4", code: "d4" },
    { name: "6", code: "d6" },
    { name: "8", code: "d8" },
    { name: "10", code: "d10" },
    { name: "20", code: "d20" },
  ];

  return (
    <div className={`${styles.controlsContainer} ${isOpen ? styles.open : ""}`}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close settings" : "Open settings"}
      >
        {isOpen ? <FiX size={20} /> : <FiSettings size={20} />}
      </button>

      <div className={styles.panel}>
        <div className={styles.panelContent}>
          <h3 className={styles.panelTitle}>Board Settings</h3>
          <div className={styles.controlGroup}>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={gridVisible}
                onChange={toggleGrid}
              />
              <span className={styles.toggleSlider}></span>
              <span className={styles.toggleLabel}>
                <FiGrid /> Grid
              </span>
            </label>

            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={snapToGrid}
                onChange={toggleSnapToGrid}
              />
              <span className={styles.toggleSlider}></span>
              <span className={styles.toggleLabel}>
                <FiMove /> Snap to Grid
              </span>
            </label>

            <Dropdown
              value={sides}
              onChange={(e) => setSides(e.value)}
              options={sideOptions}
              optionLabel="name"
              placeholder="Select sides"
              className="w-full md:w-14rem"
            />
          </div>

          {measurement && (
            <div className={styles.measurementDisplay}>
              Distance: {measurement} ft
            </div>
          )}
        </div>
      </div>
    </div>
  );
}