import type { TourInputs } from '../types';
import { getFactorMultiplier } from './calculateTime';

interface PerformancePoint {
  hour: number;
  performance: number;
}

export const calculatePerformanceOverTime = (
  inputs: TourInputs,
  totalHours: number,
  useCustomFactors: boolean
): PerformancePoint[] => {
  const baseMultiplier = getFactorMultiplier(inputs, useCustomFactors);
  const points: PerformancePoint[] = [];

  // Calculate performance points for each hour
  for (let hour = 0; hour <= Math.ceil(totalHours); hour++) {
    // Base fatigue increases exponentially over time
    const baseFatigue = (hour / 4) ** 1.5;

    // Additional fatigue factors
    const weightFatigue = 
      inputs.weight === 'VERY_HEAVY'
        ? hour * 0.5  // Significant fatigue for very heavy loads
        : inputs.weight === 'HEAVY'
          ? hour * 0.3  // Heavy loads cause substantial fatigue
          : inputs.weight === 'MEDIUM'
            ? hour * 0.2  // Medium loads cause moderate fatigue
            : hour * 0.1; // Light loads cause minimal fatigue

    const terrainFatigue =
      inputs.terrain === 'TECHNICAL_ALPINE'
        ? hour * 0.5  // Most demanding terrain
        : inputs.terrain === 'ALPINE'
          ? hour * 0.4  // Very difficult terrain
          : inputs.terrain === 'DIFFICULT'
            ? hour * 0.3  // Difficult terrain
            : inputs.terrain === 'HIKING_TRAIL'
              ? hour * 0.2  // Moderate terrain
              : hour * 0.1; // Flat terrain causes minimal fatigue

    // Additional condition-based fatigue
    const conditionTypeFatigue = 
      inputs.conditionType === 'WINTER'
        ? hour * 0.3  // Winter conditions are most fatiguing
        : inputs.conditionType === 'AUTUMN' || inputs.conditionType === 'SPRING'
          ? hour * 0.2  // Shoulder seasons are moderately fatiguing
          : hour * 0.1; // Summer conditions are least fatiguing

    // Calculate total fatigue and convert to performance (100% - fatigue%)
    let totalFatigue =
      (baseFatigue + weightFatigue + terrainFatigue + conditionTypeFatigue) * (1 / baseMultiplier);
    totalFatigue = Math.min(100, Math.max(0, totalFatigue));

    points.push({
      hour,
      performance: 100 - totalFatigue,
    });
  }

  return points;
};
