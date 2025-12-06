"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./DiceRoller.module.css";
import { Dice3D } from "../";

export default function DiceRoller({ sides }) {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [showDice, setShowDice] = useState(false);

  const rollDie = () => {
    if (!sides || sides < 1) return;

    setRolling(true);
    setShowDice(true);
    setResult(null);

    setTimeout(() => {
      const value = Math.floor(Math.random() * sides) + 1;
      setResult(value);
      setRolling(false);

      setTimeout(() => setShowDice(false), 2000);
    }, 1200);
  };

  const getDieClass = () => {
    switch (sides) {
      case 4:
        return styles.d4;
      case 6:
        return styles.d6;
      case 8:
        return styles.d8;
      case 10:
        return styles.d10;
      case 12:
        return styles.d12;
      case 20:
        return styles.d20;
      default:
        return styles.d20;
    }
  };

  return (
    <>
      <div className={styles.diceOverlay}>
        <button className={styles.diceButton} onClick={rollDie}>
          <Dice3D sides={sides} rolling={rolling} />
        </button>
      </div>

      {showDice && (
        <motion.div
          className={styles.diceCenter}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dice3D sides={sides} rolling={rolling} />

          {!rolling && result !== null && (
            <motion.div
              className={styles.diceResult}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {result}
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
}
