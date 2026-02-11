import type {
  V2TourInputs,
  V2CalculationResult,
  FactorContribution,
} from '../../types/v2';
import * as tacticalConstants from '../../constants/tacticalTourFactors';
import {
  calculateAdvancedVerticalTime,
  getAdvancedHorizontalSpeedMultiplier,
} from './slopeModel';
import { calculateFatigueTimePenalty } from './fatigueModel';

const getConstants = (useCustomFactorConstants: boolean) => {
  let baseConstants = { ...tacticalConstants };
  if (useCustomFactorConstants) {
    const customConstants = localStorage.getItem('customConstants');
    if (customConstants) {
      const parsed = JSON.parse(customConstants);
      baseConstants = { ...baseConstants, ...parsed };
    }
  }
  return baseConstants;
};

const getBaseMultiplier = (
  inputs: V2TourInputs,
  useCustomFactorConstants: boolean
): number => {
  let multiplier = 1;
  const constants = getConstants(useCustomFactorConstants);
  multiplier *= constants.CONDITION_FACTORS[inputs.condition];
  multiplier *= constants.TECHNICAL_SKILL_FACTORS[inputs.technicalSkill];
  multiplier *= constants.WEIGHT_FACTORS[inputs.weight];
  multiplier *= constants.TACTICAL_TERRAIN_FACTORS[inputs.terrain];
  multiplier *= constants.CONDITION_TYPE_FACTORS[inputs.conditionType];
  multiplier *= constants.THREAT_LEVEL_FACTORS[inputs.threatLevel];
  return multiplier;
};

const getFactorColor = (
  penalty: number
): 'green' | 'yellow' | 'orange' | 'red' => {
  if (penalty <= 5) return 'green';
  if (penalty <= 15) return 'yellow';
  if (penalty <= 30) return 'orange';
  return 'red';
};

const computeFactorContributions = (
  inputs: V2TourInputs,
  useCustomFactorConstants: boolean,
  baseTimeHours: number,
  totalHours: number,
  isAdvanced: boolean
): FactorContribution[] => {
  const constants = getConstants(useCustomFactorConstants);
  const contributions: FactorContribution[] = [];

  const totalPenalty =
    totalHours > 0 ? ((totalHours - baseTimeHours) / baseTimeHours) * 100 : 0;

  const conditionFactor = constants.CONDITION_FACTORS[inputs.condition];
  const skillFactor = constants.TECHNICAL_SKILL_FACTORS[inputs.technicalSkill];
  const weightFactor = constants.WEIGHT_FACTORS[inputs.weight];
  const terrainFactor = constants.TACTICAL_TERRAIN_FACTORS[inputs.terrain];
  const seasonFactor = constants.CONDITION_TYPE_FACTORS[inputs.conditionType];
  const threatFactor = constants.THREAT_LEVEL_FACTORS[inputs.threatLevel];

  const allFactors = [
    {
      factor: conditionFactor,
      id: 'condition',
      labelKey: 'v2_factor_condition',
      iconType: 'condition' as const,
    },
    {
      factor: skillFactor,
      id: 'skill',
      labelKey: 'v2_factor_skill',
      iconType: 'skill' as const,
    },
    {
      factor: weightFactor,
      id: 'load',
      labelKey: 'v2_factor_load',
      iconType: 'load' as const,
    },
    {
      factor: terrainFactor,
      id: 'terrain',
      labelKey: 'v2_factor_terrain',
      iconType: 'terrain' as const,
    },
    {
      factor: seasonFactor,
      id: 'season',
      labelKey: 'v2_factor_season',
      iconType: 'season' as const,
    },
    {
      factor: threatFactor,
      id: 'threat',
      labelKey: 'v2_factor_threat',
      iconType: 'threat' as const,
    },
  ];

  const totalFactorDeviation = allFactors.reduce(
    (sum, f) => sum + Math.abs(1 - f.factor),
    0
  );

  for (const f of allFactors) {
    const deviation = 1 - f.factor;
    let percentage = 0;
    if (totalFactorDeviation > 0 && totalPenalty !== 0) {
      percentage =
        (Math.abs(deviation) / totalFactorDeviation) *
        totalPenalty *
        Math.sign(deviation);
    }
    contributions.push({
      id: f.id,
      labelKey: f.labelKey,
      percentage: Math.round(percentage * 10) / 10,
      color: getFactorColor(Math.abs(percentage)),
      iconType: f.iconType,
    });
  }

  if (isAdvanced && baseTimeHours > 2) {
    const fatigueTimePenalty = calculateFatigueTimePenalty(
      baseTimeHours,
      inputs
    );
    const fatiguePenaltyPercent =
      baseTimeHours > 0 ? (fatigueTimePenalty / baseTimeHours) * 100 : 0;
    contributions.push({
      id: 'fatigue',
      labelKey: 'v2_factor_fatigue',
      percentage: Math.round(fatiguePenaltyPercent * 10) / 10,
      color: getFactorColor(fatiguePenaltyPercent),
      iconType: 'fatigue',
    });
  }

  if (isAdvanced && inputs.elevationLoss > 0) {
    const descentPenalty =
      inputs.elevationLoss > 200 ? Math.min(15, inputs.elevationLoss / 200) : 0;
    if (descentPenalty > 0) {
      contributions.push({
        id: 'slope',
        labelKey: 'v2_factor_slope',
        percentage: Math.round(descentPenalty * 10) / 10,
        color: getFactorColor(descentPenalty),
        iconType: 'slope',
      });
    }
  }

  return contributions.filter((c) => Math.abs(c.percentage) >= 0.1);
};

export const calculateBasicV2 = (
  inputs: V2TourInputs,
  useCustomFactorConstants: boolean
): V2CalculationResult => {
  const constants = getConstants(useCustomFactorConstants);

  if (
    !constants?.BASE_SPEEDS?.HORIZONTAL ||
    !constants?.BASE_SPEEDS?.VERTICAL
  ) {
    return {
      totalHours: 0,
      horizontalHours: 0,
      verticalHours: 0,
      ascentHours: 0,
      descentHours: 0,
      multiplier: 1,
      reliabilityFactor: 'low',
      warnings: ['constantsError'],
      factorContributions: [],
      totalPenaltyPercent: 0,
      baseTimeHours: 0,
      modelLabel: 'v2_model_basic',
    };
  }

  const multiplier = getBaseMultiplier(inputs, useCustomFactorConstants);
  const horizontalHours =
    inputs.horizontalDistance > 0
      ? inputs.horizontalDistance /
        (constants.BASE_SPEEDS.HORIZONTAL * multiplier)
      : 0;
  const verticalHours =
    inputs.verticalDistance > 0
      ? inputs.verticalDistance / (constants.BASE_SPEEDS.VERTICAL * multiplier)
      : 0;
  const totalHours = horizontalHours + verticalHours;

  const baseTimeHours =
    inputs.horizontalDistance > 0
      ? inputs.horizontalDistance / constants.BASE_SPEEDS.HORIZONTAL
      : 0;
  const baseVerticalTime =
    inputs.verticalDistance > 0
      ? inputs.verticalDistance / constants.BASE_SPEEDS.VERTICAL
      : 0;
  const totalBaseTime = baseTimeHours + baseVerticalTime;

  const contributions = computeFactorContributions(
    inputs,
    useCustomFactorConstants,
    totalBaseTime,
    totalHours,
    false
  );

  const totalPenaltyPercent =
    totalBaseTime > 0
      ? ((totalHours - totalBaseTime) / totalBaseTime) * 100
      : 0;

  const { warnings, reliabilityFactor } = getWarningsAndReliability(
    totalHours,
    inputs
  );

  return {
    totalHours,
    horizontalHours,
    verticalHours,
    ascentHours: verticalHours,
    descentHours: 0,
    multiplier,
    reliabilityFactor,
    warnings,
    factorContributions: contributions,
    totalPenaltyPercent: Math.round(totalPenaltyPercent * 10) / 10,
    baseTimeHours: totalBaseTime,
    modelLabel: 'v2_model_basic',
  };
};

export const calculateAdvancedV2 = (
  inputs: V2TourInputs,
  useCustomFactorConstants: boolean
): V2CalculationResult => {
  const constants = getConstants(useCustomFactorConstants);

  if (
    !constants?.BASE_SPEEDS?.HORIZONTAL ||
    !constants?.BASE_SPEEDS?.VERTICAL
  ) {
    return {
      totalHours: 0,
      horizontalHours: 0,
      verticalHours: 0,
      ascentHours: 0,
      descentHours: 0,
      multiplier: 1,
      reliabilityFactor: 'low',
      warnings: ['constantsError'],
      factorContributions: [],
      totalPenaltyPercent: 0,
      baseTimeHours: 0,
      modelLabel: 'v2_model_advanced',
    };
  }

  const multiplier = getBaseMultiplier(inputs, useCustomFactorConstants);

  const elevGain =
    inputs.elevationGain > 0 ? inputs.elevationGain : inputs.verticalDistance;
  const elevLoss = inputs.elevationLoss > 0 ? inputs.elevationLoss : 0;

  const slopeMultiplier = getAdvancedHorizontalSpeedMultiplier(
    elevGain,
    elevLoss,
    inputs.horizontalDistance
  );
  const effectiveHorizontalMultiplier =
    multiplier * Math.min(1.15, Math.max(0.5, slopeMultiplier));

  const horizontalHours =
    inputs.horizontalDistance > 0
      ? inputs.horizontalDistance /
        (constants.BASE_SPEEDS.HORIZONTAL * effectiveHorizontalMultiplier)
      : 0;

  const { ascentHours: rawAscent, descentHours: rawDescent } =
    calculateAdvancedVerticalTime(
      elevGain,
      elevLoss,
      inputs.horizontalDistance,
      constants.BASE_SPEEDS.VERTICAL
    );
  const ascentHours = rawAscent > 0 ? rawAscent / multiplier : 0;
  const descentHours = rawDescent > 0 ? rawDescent / multiplier : 0;

  const preFatigueTotal = horizontalHours + ascentHours + descentHours;

  const fatigueTimePenalty = calculateFatigueTimePenalty(
    preFatigueTotal,
    inputs
  );
  const totalHours = preFatigueTotal + fatigueTimePenalty;

  const baseHorizontalTime =
    inputs.horizontalDistance > 0
      ? inputs.horizontalDistance / constants.BASE_SPEEDS.HORIZONTAL
      : 0;
  const baseVerticalTime =
    elevGain > 0 ? elevGain / constants.BASE_SPEEDS.VERTICAL : 0;
  const baseDescentTime =
    elevLoss > 0 ? elevLoss / (constants.BASE_SPEEDS.VERTICAL * 1.2) : 0;
  const totalBaseTime = baseHorizontalTime + baseVerticalTime + baseDescentTime;

  const contributions = computeFactorContributions(
    inputs,
    useCustomFactorConstants,
    totalBaseTime,
    totalHours,
    true
  );

  const totalPenaltyPercent =
    totalBaseTime > 0
      ? ((totalHours - totalBaseTime) / totalBaseTime) * 100
      : 0;

  const { warnings, reliabilityFactor } = getWarningsAndReliability(
    totalHours,
    inputs
  );

  return {
    totalHours,
    horizontalHours,
    verticalHours: ascentHours + descentHours,
    ascentHours,
    descentHours,
    multiplier,
    reliabilityFactor,
    warnings,
    factorContributions: contributions,
    totalPenaltyPercent: Math.round(totalPenaltyPercent * 10) / 10,
    baseTimeHours: totalBaseTime,
    modelLabel: 'v2_model_advanced',
  };
};

export const calculateV2 = (
  inputs: V2TourInputs,
  useCustomFactorConstants: boolean
): V2CalculationResult => {
  if (inputs.calculationMode === 'basic') {
    return calculateBasicV2(inputs, useCustomFactorConstants);
  }
  return calculateAdvancedV2(inputs, useCustomFactorConstants);
};

const getWarningsAndReliability = (
  totalHours: number,
  inputs: V2TourInputs
): { warnings: string[]; reliabilityFactor: 'high' | 'medium' | 'low' } => {
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

  if (inputs.threatLevel === 'RED') {
    warnings.push('highThreatWarning');
  }
  if (inputs.terrain === 'TECHNICAL_ALPINE') {
    warnings.push('technicalTerrainWarning');
  }

  return { warnings, reliabilityFactor };
};
