import { TourInputs } from '../types';
// import { TourInputs, Constants } from '../types';
import * as tacticalConstants from '../constants/tacticalTourFactors';

export const getFactorMultiplier = (
  inputs: TourInputs,
): number => {
  let multiplier = 1;
  const constants = getConstants();

  // Apply tactical factors using constants
  multiplier *= constants.CONDITION_FACTORS[inputs.condition];
  multiplier *= constants.TECHNICAL_SKILL_FACTORS[inputs.technicalSkill];
  multiplier *= constants.WEIGHT_FACTORS[inputs.weight];
  multiplier *= constants.TACTICAL_TERRAIN_FACTORS[inputs.terrain];
  multiplier *= constants.CONDITION_TYPE_FACTORS[inputs.conditionType];
  multiplier *= constants.THREAT_LEVEL_FACTORS[inputs.threatLevel];

  return multiplier;
};

export const calculateTourTime = (
  inputs: TourInputs,
  useCustomFactorConstants: boolean
): {
  totalHours: number;
  horizontalHours: number;
  verticalHours: number;
  multiplier: number;
  reliabilityFactor: 'high' | 'medium' | 'low';
  warnings: string[];
} => {
  const constants = getConstants(useCustomFactorConstants);

  if (
    !constants ||
    !constants.BASE_SPEEDS ||
    typeof constants.BASE_SPEEDS.HORIZONTAL !== 'number' ||
    typeof constants.BASE_SPEEDS.VERTICAL !== 'number'
  ) {
    console.error('Invalid constants structure:', constants);
    // Return default values to prevent crash
    return {
      totalHours: 0,
      horizontalHours: 0,
      verticalHours: 0,
      multiplier: 1,
      reliabilityFactor: 'low' as const,
      warnings: ['constantsError'],
    };
  }

  const multiplier = getFactorMultiplier(inputs);

  const horizontalHours = inputs.horizontalDistance
    ? inputs.horizontalDistance /
    (constants.BASE_SPEEDS.HORIZONTAL * multiplier)
    : 0;

  const verticalHours = inputs.verticalDistance
    ? inputs.verticalDistance / (constants.BASE_SPEEDS.VERTICAL * multiplier)
    : 0;

  const totalHours = horizontalHours + verticalHours;

  // Determine reliability factor and generate warnings
  const warnings: string[] = [];
  let reliabilityFactor: 'high' | 'medium' | 'low' = 'high';

  // Time-based warnings
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


  if (inputs.threatLevel === 'RED') {
    warnings.push('highThreatWarning');
  }
  if (inputs.terrain === 'TECHNICAL_ALPINE') {
    warnings.push('technicalTerrainWarning');
  }

  return {
    totalHours,
    horizontalHours,
    verticalHours,
    multiplier,
    reliabilityFactor,
    warnings,
  };
};

// Returns consolidated constants object
const getConstants = (useCustomFactorConstants: boolean = false) => {
  // Ensure tactical constants are merged first as base
  let baseConstants = { ...tacticalConstants };

  return baseConstants;

  // const customConstants = localStorage.getItem('customConstants');
  // if (customConstants) {
  //   console.log('using custom constants');
  //   const parsed = JSON.parse(customConstants);
  //   baseConstants = { ...baseConstants, ...parsed };
  // }

  // return standardizeConstants(baseConstants);
};

// const standardizeConstants = (constants: Constants): Constants => {
//   const standardized: Constants = { ...constants };

//   // Get all possible factor keys from both standard and tactical constants
//   const factorKeys = new Set([
//     ...Object.keys(tacticalConstants),
//   ]);

//   factorKeys.forEach((key) => {
//     if (
//       standardized[key as keyof Constants] &&
//       typeof standardized[key as keyof Constants] === 'object'
//     ) {
//       standardized[key as keyof Constants] = Object.entries(
//         standardized[key as keyof Constants] as Record<string, number>
//       ).reduce<Record<string, number>>((acc, [subKey, value]) => {
//         if (typeof value === 'number') {
//           acc[subKey.toUpperCase()] = value;
//         } else {
//           console.warn(
//             `Invalid value for ${key}.${subKey}: expected number, got ${typeof value}`
//           );
//         }
//         return acc;
//       }, {});
//     }
//   });

//   return standardized;
// };
