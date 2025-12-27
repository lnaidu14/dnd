import { POINT_BUY_COSTS } from './constants';

export const abilityModifier = (score) =>
    Math.floor((score - 10) / 2);

export const proficiencyBonus = (level) => {
    if (level >= 17) return 6;
    if (level >= 13) return 5;
    if (level >= 9) return 4;
    if (level >= 5) return 3;
    return 2;
};

export const calculatePointBuyTotal = (stats) =>
  Object.values(stats).reduce((sum, score) => {
    const cost = POINT_BUY_COSTS[score];
    return sum + (cost ?? 0);
  }, 0);

export const applyRacialBonuses = (stats, race) => {
  if (!race?.bonuses) return stats;
  const updated = { ...stats };
  Object.entries(race.bonuses).forEach(([key, value]) => {
    updated[key] += value;
  });
  return updated;
};

export const savingThrow = (
  abilityScore,
  isProficient,
  proficiencyBonus,
  bonuses = 0
) => {
  return (
    abilityModifier(abilityScore) +
    (isProficient ? proficiencyBonus : 0) +
    bonuses
  );
};

export const calculateMaxHP = (level, hitDie, conScore) => {
  let hp = hitDie + conScore;

  if (level === 1) return hp;

  const avgDie = Math.floor(hitDie / 2) + 1;

  hp += (level - 1) * (avgDie + conScore);

  return hp;
};

export const calculateSavingThrows = (
  abilityModifiers,
  level,
  savingThrowProficiencies
) => {
  const profBonus = proficiencyBonus(level);

  return Object.fromEntries(
    Object.entries(abilityModifiers).map(([ability, mod]) => {
      console.log("ability: ", ability);
      const isProficient = savingThrowProficiencies.includes(ability);
      return [ability, mod + (isProficient ? profBonus : 0)];
    })
  );
};