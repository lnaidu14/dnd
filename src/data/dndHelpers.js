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
    Object.values(stats).reduce(
        (sum, score) => sum + POINT_BUY_COSTS[score],
        0
    );

export const applyRacialBonuses = (stats, race) => {
    if (!race?.bonuses) return stats;
    const updated = { ...stats };
    Object.entries(race.bonuses).forEach(([key, value]) => {
        updated[key] += value;
    });
    return updated;
};