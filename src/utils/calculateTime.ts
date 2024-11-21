import { TourInputs } from '../types';
import {
  BASE_SPEEDS,
  PACKAGE_WEIGHT,
  DANGER_FACTORS,
  LIGHT_FACTORS,
  TERRAIN_FACTORS,
  PHYSIQUE_FACTORS,
  EXPERIENCE_FACTORS,
} from '../constants/tourFactors';

export const getFactorMultiplier = (inputs: TourInputs): number => {
  let multiplier = 1;

  // Package weight factor
  multiplier *= (1 - (inputs.package * PACKAGE_WEIGHT.REDUCTION_PER_5KG));

  // Apply all other factors
  multiplier *= DANGER_FACTORS[inputs.dangerLevel];
  multiplier *= LIGHT_FACTORS[inputs.light];
  multiplier *= TERRAIN_FACTORS[inputs.terrain];
  multiplier *= PHYSIQUE_FACTORS[inputs.physique];
  multiplier *= EXPERIENCE_FACTORS[inputs.experience];

  return multiplier;
};

export const calculateTourTime = (inputs: TourInputs): {
  totalHours: number;
  horizontalHours: number;
  verticalHours: number;
  multiplier: number;
  reliabilityFactor: 'high' | 'medium' | 'low';
  warnings: string[];
} => {
  const multiplier = getFactorMultiplier(inputs);
  
  const horizontalHours = inputs.horizontalDistance 
    ? inputs.horizontalDistance / (BASE_SPEEDS.HORIZONTAL * multiplier)
    : 0;
  
  const verticalHours = inputs.verticalDistance 
    ? inputs.verticalDistance / (BASE_SPEEDS.VERTICAL * multiplier)
    : 0;
  
  const totalHours = horizontalHours + verticalHours;
  
  // Determine reliability factor and generate warnings
  const warnings: string[] = [];
  let reliabilityFactor: 'high' | 'medium' | 'low' = 'high';
  
  if (totalHours > 24) {
    reliabilityFactor = 'low';
    warnings.push('multiDayTourWarning');
  } else if (totalHours > 18) {
    reliabilityFactor = 'low';
    warnings.push('extendedTourWarning');
  } else if (totalHours > 12) {
    reliabilityFactor = 'medium';
    warnings.push('longTourWarning');
  }
  
  if (inputs.dangerLevel === 'extreme' || inputs.dangerLevel === 'high') {
    warnings.push('highDangerWarning');
  }
  
  if (inputs.terrain === 'alpine_extreme') {
    warnings.push('extremeTerrainWarning');
  }
  
  return {
    totalHours,
    horizontalHours,
    verticalHours,
    multiplier,
    reliabilityFactor,
    warnings
  };
};
