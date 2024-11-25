export type Package = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35;

// Standard Factors
export type DangerLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
export type Light = 'DAY' | 'NIGHT' | 'MIXED';
export type Terrain =
  | 'EASY'
  | 'ALPINE_MEDIUM'
  | 'ALPINE_HARD'
  | 'ALPINE_EXTREME';
export type Physique = 'VERY_FIT' | 'FIT' | 'MEDIUM' | 'POOR' | 'INJURED';
export type Experience = 'NONE' | 'BASIC' | 'MEDIUM' | 'ADVANCED' | 'EXPERT';

// Tactical Factors
export type Condition =
  | 'POOR'
  | 'SUFFICIENT'
  | 'GOOD'
  | 'VERY_GOOD'
  | 'EXCELLENT';
export type TechnicalSkill =
  | 'NONE'
  | 'BASIC'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'EXPERT';
export type Weight = 'LIGHT' | 'MEDIUM' | 'HEAVY' | 'VERY_HEAVY';
export type TacticalTerrain =
  | 'FLAT'
  | 'HIKING_TRAIL'
  | 'DIFFICULT'
  | 'ALPINE'
  | 'TECHNICAL_ALPINE';
export type ConditionType = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
export type ThreatLevel = 'GREEN' | 'YELLOW' | 'RED';

export interface TourInputs {
  horizontalDistance: number;
  verticalDistance: number;

  // Standard Factors
  package: Package;
  dangerLevel: DangerLevel;
  light: Light;
  terrain: Terrain;
  physique: Physique;
  experience: Experience;

  // Tactical Factors
  condition: Condition;
  technicalSkill: TechnicalSkill;
  weight: Weight;
  tacticalTerrain: TacticalTerrain;
  conditionType: ConditionType;
  threatLevel: ThreatLevel;
}

export interface Constants {
  BASE_SPEEDS: Record<string, number>;
  PACKAGE_WEIGHT: Record<string, number>;
  DANGER_FACTORS: Record<string, number>;
  LIGHT_FACTORS: Record<string, number>;
  TERRAIN_FACTORS: Record<string, number>;
  PHYSIQUE_FACTORS: Record<string, number>;
  EXPERIENCE_FACTORS: Record<string, number>;
  CONDITION_FACTORS: Record<string, number>;
  TECHNICAL_SKILL_FACTORS: Record<string, number>;
  WEIGHT_FACTORS: Record<string, number>;
  TACTICAL_TERRAIN_FACTORS: Record<string, number>;
  CONDITION_TYPE_FACTORS: Record<string, number>;
  THREAT_LEVEL_FACTORS: Record<string, number>;
}
