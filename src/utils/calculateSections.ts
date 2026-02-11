import type { RouteSection, TourInputs, Constants } from '../types';
import { calculateTourTime } from './calculateTime';

interface SectionResult {
  sectionId: string;
  sectionName: string;
  horizontalHours: number;
  verticalHours: number;
  totalHours: number;
  multiplier: number;
}

interface SectionCalculationResult {
  sectionResults: SectionResult[];
  totalHours: number;
  totalHorizontalHours: number;
  totalVerticalHours: number;
  totalHorizontalDistance: number;
  totalVerticalDistance: number;
}

export const calculateSectionTimes = (
  sections: RouteSection[],
  baseInputs: TourInputs,
  constants: Constants
): SectionCalculationResult => {
  const sectionResults: SectionResult[] = [];
  let totalHours = 0;
  let totalHorizontalHours = 0;
  let totalVerticalHours = 0;
  let totalHorizontalDistance = 0;
  let totalVerticalDistance = 0;

  for (const section of sections) {
    const sectionInputs: TourInputs = {
      ...baseInputs,
      horizontalDistance: section.horizontalDistance,
      verticalDistance: section.elevationGain,
      terrain: section.terrain,
    };

    const result = calculateTourTime(sectionInputs, constants);

    sectionResults.push({
      sectionId: section.id,
      sectionName: section.name,
      horizontalHours: result.horizontalHours,
      verticalHours: result.verticalHours,
      totalHours: result.totalHours,
      multiplier: result.multiplier,
    });

    totalHours += result.totalHours;
    totalHorizontalHours += result.horizontalHours;
    totalVerticalHours += result.verticalHours;
    totalHorizontalDistance += section.horizontalDistance;
    totalVerticalDistance += section.elevationGain;
  }

  return {
    sectionResults,
    totalHours,
    totalHorizontalHours,
    totalVerticalHours,
    totalHorizontalDistance,
    totalVerticalDistance,
  };
};
