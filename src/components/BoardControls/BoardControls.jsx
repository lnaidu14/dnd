import React, { useState } from 'react';
import styles from './BoardControls.module.css';
import { FiSettings, FiGrid, FiMove, FiX, FiChevronRight } from 'react-icons/fi';

export default function BoardControls({ 
  gridVisible, 
  toggleGrid, 
  snapToGrid, 
  toggleSnapToGrid,
  measurement 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.controlsContainer} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close settings' : 'Open settings'}
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
          </div>
          
          {measurement && (
            <div className={styles.measurementDisplay}>
              Distance: {measurement} squares
            </div>
          )}
        </div>
      </div>
    </div>
  );
}