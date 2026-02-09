import type { RouteSection } from '../../types';
import type { V2TourInputs, V2SectionResult, V2SectionCalculationResult } from '../../types/v2';
import { calculateAdvancedV2, calculateBasicV2 } from './calculateTimeV2';
import { calculateFatigueMultiplier } from './fatigueModel';

export const calculateSectionTimesV2 = (
  sections: RouteSection[],
  baseInputs: V2TourInputs,
  useCustomFactorConstants: boolean
): V2SectionCalculationResult => {
  const sectionResults: V2SectionResult[] = [];
  let cumulativeHours = 0;
  let totalHours = 0;
  let totalHorizontalHours = 0;
  let totalAscentHours = 0;
  let totalDescentHours = 0;
  let totalHorizontalDistance = 0;
  let totalElevationGain = 0;
  let totalElevationLoss = 0;

  for (const section of sections) {
    const sectionInputs: V2TourInputs = {
      ...baseInputs,
      horizontalDistance: section.horizontalDistance,
      verticalDistance: section.elevationGain,
      elevationGain: section.elevationGain,
      elevationLoss: section.elevationLoss,
      terrain: section.terrain,
    };

    const isAdvanced = baseInputs.calculationMode === 'advanced';
    const result = isAdvanced
      ? calculateAdvancedV2(sectionInputs, useCustomFactorConstants)
      : calculateBasicV2(sectionInputs, useCustomFactorConstants);

    const fatigueMult = isAdvanced
      ? calculateFatigueMultiplier(cumulativeHours, baseInputs)
      : 1.0;

    const fatigueAdjustedTotal = fatigueMult < 1
      ? result.totalHours / fatigueMult
      : result.totalHours;

    const cumulativeFatiguePercent = (1 - fatigueMult) * 100;

    sectionResults.push({
      sectionId: section.id,
      sectionName: section.name,
      horizontalHours: result.horizontalHours,
      ascentHours: result.ascentHours,
      descentHours: result.descentHours,
      totalHours: fatigueAdjustedTotal,
      multiplier: result.multiplier,
      cumulativeFatiguePercent: Math.round(cumulativeFatiguePercent * 10) / 10,
      delayContributionPercent: 0,
      terrain: section.terrain,
    });

    cumulativeHours += fatigueAdjustedTotal;
    totalHours += fatigueAdjustedTotal;
    totalHorizontalHours += result.horizontalHours;
    totalAscentHours += result.ascentHours;
    totalDescentHours += result.descentHours;
    totalHorizontalDistance += section.horizontalDistance;
    totalElevationGain += section.elevationGain;
    totalElevationLoss += section.elevationLoss;
  }

  if (totalHours > 0) {
    for (const sr of sectionResults) {
      sr.delayContributionPercent = Math.round((sr.totalHours / totalHours) * 1000) / 10;
    }
  }

  const dummyInputs: V2TourInputs = {
    ...baseInputs,
    horizontalDistance: totalHorizontalDistance,
    verticalDistance: totalElevationGain,
    elevationGain: totalElevationGain,
    elevationLoss: totalElevationLoss,
  };
  const overallResult = baseInputs.calculationMode === 'advanced'
    ? calculateAdvancedV2(dummyInputs, useCustomFactorConstants)
    : calculateBasicV2(dummyInputs, useCustomFactorConstants);

  const baseTimeHours = overallResult.baseTimeHours;
  const totalPenaltyPercent = baseTimeHours > 0
    ? ((totalHours - baseTimeHours) / baseTimeHours) * 100
    : 0;

  return {
    sectionResults,
    totalHours,
    totalHorizontalHours,
    totalAscentHours,
    totalDescentHours,
    totalHorizontalDistance,
    totalElevationGain,
    totalElevationLoss,
    factorContributions: overallResult.factorContributions,
    totalPenaltyPercent: Math.round(totalPenaltyPercent * 10) / 10,
    baseTimeHours,
  };
};
