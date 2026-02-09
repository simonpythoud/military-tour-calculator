import type { GroupSize, V2TourInputs } from '../../types/v2';
import type { Weight, Terrain, ConditionType, ThreatLevel } from '../../types';

const GROUP_SIZE_FATIGUE_MULTIPLIERS: Record<GroupSize, number> = {
  SMALL: 1.0,
  MEDIUM: 1.1,
  LARGE_UNIT: 1.25,
};

const WEIGHT_FATIGUE_RATES: Record<Weight, number> = {
  LIGHT: 0.08,
  MEDIUM: 0.18,
  HEAVY: 0.32,
  VERY_HEAVY: 0.50,
};

const TERRAIN_FATIGUE_RATES: Record<Terrain, number> = {
  FLAT: 0.05,
  HIKING_TRAIL: 0.12,
  DIFFICULT: 0.22,
  ALPINE: 0.35,
  TECHNICAL_ALPINE: 0.50,
};

const SEASON_FATIGUE_RATES: Record<ConditionType, number> = {
  SUMMER: 0.05,
  SPRING: 0.12,
  AUTUMN: 0.15,
  WINTER: 0.25,
};

const THREAT_FATIGUE_RATES: Record<ThreatLevel, number> = {
  GREEN: 0.02,
  YELLOW: 0.10,
  RED: 0.20,
};

export const calculateFatigueMultiplier = (
  elapsedHours: number,
  inputs: V2TourInputs
): number => {
  if (elapsedHours <= 0) return 1.0;

  const baseFatigue = Math.pow(elapsedHours / 5, 1.6) * 0.02;
  const weightRate = WEIGHT_FATIGUE_RATES[inputs.weight];
  const terrainRate = TERRAIN_FATIGUE_RATES[inputs.terrain];
  const seasonRate = SEASON_FATIGUE_RATES[inputs.conditionType];
  const threatRate = THREAT_FATIGUE_RATES[inputs.threatLevel];

  const linearFatigue = (weightRate + terrainRate + seasonRate + threatRate) * elapsedHours;

  const weightNonLinear = inputs.weight === 'VERY_HEAVY'
    ? Math.pow(elapsedHours / 6, 1.3) * 0.03
    : inputs.weight === 'HEAVY'
      ? Math.pow(elapsedHours / 7, 1.2) * 0.02
      : 0;

  const groupMultiplier = GROUP_SIZE_FATIGUE_MULTIPLIERS[inputs.groupSize];

  const totalFatiguePercent = (baseFatigue + linearFatigue + weightNonLinear) * groupMultiplier * 100;
  const clampedFatigue = Math.min(80, Math.max(0, totalFatiguePercent));

  return 1 - clampedFatigue / 100;
};

export const calculateFatigueTimePenalty = (
  baseTimeHours: number,
  inputs: V2TourInputs
): number => {
  if (baseTimeHours <= 2) return 0;

  const steps = Math.ceil(baseTimeHours * 2);
  let totalPenalty = 0;

  for (let i = 0; i < steps; i++) {
    const hour = (i / steps) * baseTimeHours;
    const fatigueMultiplier = calculateFatigueMultiplier(hour, inputs);
    const speedReduction = 1 - fatigueMultiplier;
    totalPenalty += speedReduction * (baseTimeHours / steps);
  }

  return totalPenalty;
};

export interface PerformancePointV2 {
  hour: number;
  performance: number;
}

export const calculatePerformanceOverTimeV2 = (
  inputs: V2TourInputs,
  totalHours: number,
  baseMultiplier: number
): PerformancePointV2[] => {
  const points: PerformancePointV2[] = [];
  const maxHour = Math.ceil(totalHours);

  for (let hour = 0; hour <= maxHour; hour++) {
    const fatigueMultiplier = calculateFatigueMultiplier(hour, inputs);
    const performance = Math.max(0, fatigueMultiplier * 100 * Math.min(1, baseMultiplier + 0.3));
    points.push({
      hour,
      performance: Math.min(100, Math.round(performance * 10) / 10),
    });
  }

  return points;
};
