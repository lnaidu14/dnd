import { useState } from "react";
import styles from "./DiceRoller.module.css";

const DICE_TYPES = [
  { sides: 4, name: "d4", color: "#ff6b6b" },
  { sides: 6, name: "d6", color: "#4ecdc4" },
  { sides: 8, name: "d8", color: "#45b7d1" },
  { sides: 10, name: "d10", color: "#96ceb4" },
  { sides: 12, name: "d12", color: "#feca57" },
  { sides: 20, name: "d20", color: "#ff9ff3" },
];

export default function DiceRoller({
  character = null,
  onRoll,
  availableCharacters = [],
}) {
  const [rollingDice, setRollingDice] = useState({});
  const [results, setResults] = useState({});
  const [selectedCharacter, setSelectedCharacter] = useState(character);

  const getProficiencyBonus = (level) => {
    return Math.ceil(level / 4) + 1; // D&D 5e proficiency bonus formula
  };

  const getCharacterBonus = (diceType, rollType = "attack") => {
    const activeChar = selectedCharacter || character;
    if (!activeChar) return 0;

    const level = activeChar.level || 1;
    const profBonus = getProficiencyBonus(level);

    switch (diceType) {
      case "d20":
        if (rollType === "attack") {
          const abilityMod = getAbilityModifier(activeChar.str || 10);
          return abilityMod + profBonus;
        } else if (rollType === "save") {
          return getAbilityModifier(activeChar.wis || 10);
        }
        return getAbilityModifier(activeChar.dex || 10);
      case "d6":
      case "d8":
        return getAbilityModifier(activeChar.str || 10);
      default:
        return 0;
    }
  };

  const getAbilityModifier = (score) => {
    return Math.floor((score - 10) / 2);
  };

  const rollDice = async (diceType) => {
    const { sides, name } = diceType;

    setRollingDice((prev) => ({ ...prev, [name]: true }));

    const animationDuration = 1000;
    const intervalTime = 50;
    const iterations = animationDuration / intervalTime;

    let currentIteration = 0;
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * sides) + 1;
      setResults((prev) => ({ ...prev, [name]: randomValue }));

      currentIteration++;
      if (currentIteration >= iterations) {
        clearInterval(interval);

        const baseRoll = Math.floor(Math.random() * sides) + 1;
        const bonus = getCharacterBonus(name);
        const finalResult = baseRoll + bonus;

        setResults((prev) => ({
          ...prev,
          [name]: {
            total: finalResult,
            base: baseRoll,
            bonus: bonus,
          },
        }));
        setRollingDice((prev) => ({ ...prev, [name]: false }));

        if (onRoll) {
          onRoll({
            dice: name,
            baseRoll: baseRoll,
            bonus: bonus,
            total: finalResult,
            sides: sides,
            character: character?.name,
            timestamp: new Date().toISOString(),
          });
        }
      }
    }, intervalTime);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {availableCharacters.length > 0 && (
          <div className={styles.characterSelector}>
            <label>Rolling for: </label>
            <select
              value={selectedCharacter?.id || ""}
              onChange={(e) => {
                const char = availableCharacters.find(
                  (c) => c.id === e.target.value
                );
                setSelectedCharacter(char);
              }}
              className={styles.characterSelect}
            >
              <option value="">No Character</option>
              {availableCharacters.map((char) => (
                <option key={char.id} value={char.id}>
                  {char.name} ({char.class} {char.level})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className={styles.diceGrid}>
        {DICE_TYPES.map((dice) => (
          <div
            key={dice.name}
            className={`${styles.diceButton} ${
              rollingDice[dice.name] ? styles.rolling : ""
            }`}
            onClick={() => rollDice(dice)}
            style={{ "--dice-color": dice.color }}
          >
            <div className={styles.diceName}>{dice.name}</div>
            <div className={styles.diceResult}>
              {typeof results[dice.name] === "object"
                ? `${results[dice.name].total}${
                    results[dice.name].bonus > 0
                      ? ` (${results[dice.name].base}+${
                          results[dice.name].bonus
                        })`
                      : ""
                  }`
                : results[dice.name] || "?"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
