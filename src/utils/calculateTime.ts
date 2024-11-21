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
} => {
  const multiplier = getFactorMultiplier(inputs);
  
  // Calculate horizontal time
  const horizontalHours = inputs.horizontalDistance 
    ? inputs.horizontalDistance / (BASE_SPEEDS.HORIZONTAL * multiplier)
    : 0;
  
  // Calculate vertical time
  const verticalHours = inputs.verticalDistance 
    ? inputs.verticalDistance / (BASE_SPEEDS.VERTICAL * multiplier)
    : 0;
  
  return {
    totalHours: horizontalHours + verticalHours,
    horizontalHours,
    verticalHours,
    multiplier
  };
};
