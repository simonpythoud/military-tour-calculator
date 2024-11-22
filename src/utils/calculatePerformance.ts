import { TourInputs } from '../types';
import { getFactorMultiplier } from './calculateTime';

interface PerformancePoint {
  hour: number;
  performance: number;
}

export const calculatePerformanceOverTime = (
  inputs: TourInputs,
  totalHours: number,
  useTacticalFactors: boolean = true
): PerformancePoint[] => {
  const baseMultiplier = getFactorMultiplier(inputs, useTacticalFactors);
  const points: PerformancePoint[] = [];

  // Calculate performance points for each hour
  for (let hour = 0; hour <= Math.ceil(totalHours); hour++) {
    // Base fatigue increases exponentially over time
    const baseFatigue = Math.pow(hour / 4, 1.5);

    // Additional fatigue factors
    const packageFatigue = (inputs.package / 10) * hour;
    const terrainFatigue =
      inputs.terrain === 'alpine_extreme'
        ? hour * 0.5
        : inputs.terrain === 'alpine_hard'
          ? hour * 0.3
          : inputs.terrain === 'alpine_medium'
            ? hour * 0.2
            : 0;

    // Calculate total fatigue and convert to performance (100% - fatigue%)
    let totalFatigue =
      (baseFatigue + packageFatigue + terrainFatigue) * (1 / baseMultiplier);
    totalFatigue = Math.min(100, Math.max(0, totalFatigue));

    points.push({
      hour,
      performance: 100 - totalFatigue,
    });
  }

  return points;
};
