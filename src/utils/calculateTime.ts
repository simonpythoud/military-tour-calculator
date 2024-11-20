import { TourInputs } from '../types';

const BASE_HORIZONTAL_SPEED = 4; // km/h
const BASE_VERTICAL_SPEED = 400; // m/h

const getFactorMultiplier = (inputs: TourInputs): number => {
  let multiplier = 1;

  // Package weight factor
  multiplier *= (1 - (inputs.package * 0.02)); // Each 5kg reduces speed by 2%

  // Danger level factor
  const dangerFactors = {
    low: 1,
    medium: 0.9,
    high: 0.7,
    extreme: 0.5
  };
  multiplier *= dangerFactors[inputs.dangerLevel];

  // Light factor
  const lightFactors = {
    day: 1,
    night: 0.6,
    mixed: 0.8
  };
  multiplier *= lightFactors[inputs.light];

  // Terrain factor
  const terrainFactors = {
    easy: 1,
    alpine_medium: 0.8,
    alpine_hard: 0.6,
    alpine_extreme: 0.4
  };
  multiplier *= terrainFactors[inputs.terrain];

  // Physique factor
  const physiqueFactors = {
    very_fit: 1.2,
    fit: 1,
    medium: 0.8,
    poor: 0.6,
    injured: 0.3
  };
  multiplier *= physiqueFactors[inputs.physique];

  // Experience factor
  const experienceFactors = {
    expert: 1.2,
    advanced: 1.1,
    medium: 1,
    basic: 0.8,
    none: 0.6
  };
  multiplier *= experienceFactors[inputs.experience];

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
    ? inputs.horizontalDistance / (BASE_HORIZONTAL_SPEED * multiplier)
    : 0;
  
  // Calculate vertical time (convert meters to kilometers for consistency)
  const verticalHours = inputs.verticalDistance 
    ? inputs.verticalDistance / (BASE_VERTICAL_SPEED * multiplier)
    : 0;
  
  return {
    totalHours: horizontalHours + verticalHours,
    horizontalHours,
    verticalHours,
    multiplier
  };
};
