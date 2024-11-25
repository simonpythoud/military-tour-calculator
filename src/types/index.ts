// Tactical Factors
export type Condition = 'POOR' | 'SUFFICIENT' | 'GOOD' | 'VERY_GOOD' | 'EXCELLENT';
export type TechnicalSkill = 'NONE' | 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type Weight = 'LIGHT' | 'MEDIUM' | 'HEAVY' | 'VERY_HEAVY';
export type Terrain = 'FLAT' | 'HIKING_TRAIL' | 'DIFFICULT' | 'ALPINE' | 'TECHNICAL_ALPINE';
export type ConditionType = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
export type ThreatLevel = 'GREEN' | 'YELLOW' | 'RED';

export interface TourInputs {
  horizontalDistance: number;
  verticalDistance: number;
  
  // Tactical Factors
  condition: Condition;
  technicalSkill: TechnicalSkill;
  weight: Weight;
  terrain: Terrain;
  conditionType: ConditionType;
  threatLevel: ThreatLevel;
}

export interface Constants {
  BASE_SPEEDS: Record<string, number>;
  CONDITION_FACTORS: Record<string, number>;
  TECHNICAL_SKILL_FACTORS: Record<string, number>;
  WEIGHT_FACTORS: Record<string, number>;
  TACTICAL_TERRAIN_FACTORS: Record<string, number>;
  CONDITION_TYPE_FACTORS: Record<string, number>;
  THREAT_LEVEL_FACTORS: Record<string, number>;
}
