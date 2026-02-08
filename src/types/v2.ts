import type { TourInputs, Terrain } from './index';

export type V2CalculationMode = 'basic' | 'advanced';

export type GroupSize = 'SMALL' | 'SECTION' | 'LARGE_UNIT';

export interface V2TourInputs extends TourInputs {
  elevationGain: number;
  elevationLoss: number;
  groupSize: GroupSize;
  calculationMode: V2CalculationMode;
}

export interface FactorContribution {
  id: string;
  labelKey: string;
  percentage: number;
  color: 'green' | 'yellow' | 'orange' | 'red';
  iconType: 'base' | 'terrain' | 'load' | 'season' | 'threat' | 'fatigue' | 'condition' | 'skill' | 'slope' | 'group';
}

export interface V2CalculationResult {
  totalHours: number;
  horizontalHours: number;
  verticalHours: number;
  ascentHours: number;
  descentHours: number;
  multiplier: number;
  reliabilityFactor: 'high' | 'medium' | 'low';
  warnings: string[];
  factorContributions: FactorContribution[];
  totalPenaltyPercent: number;
  baseTimeHours: number;
  modelLabel: string;
}

export interface V2SectionResult {
  sectionId: string;
  sectionName: string;
  horizontalHours: number;
  ascentHours: number;
  descentHours: number;
  totalHours: number;
  multiplier: number;
  cumulativeFatiguePercent: number;
  delayContributionPercent: number;
  terrain: Terrain;
}

export interface V2SectionCalculationResult {
  sectionResults: V2SectionResult[];
  totalHours: number;
  totalHorizontalHours: number;
  totalAscentHours: number;
  totalDescentHours: number;
  totalHorizontalDistance: number;
  totalElevationGain: number;
  totalElevationLoss: number;
  factorContributions: FactorContribution[];
  totalPenaltyPercent: number;
  baseTimeHours: number;
}
