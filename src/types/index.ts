export type Package = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35;

// Standard Factors
export type DangerLevel = 'low' | 'medium' | 'high' | 'extreme';
export type Light = 'day' | 'night' | 'mixed';
export type Terrain =
  | 'easy'
  | 'alpine_medium'
  | 'alpine_hard'
  | 'alpine_extreme';
export type Physique = 'very_fit' | 'fit' | 'medium' | 'poor' | 'injured';
export type Experience = 'none' | 'basic' | 'medium' | 'advanced' | 'expert';

// Tactical Factors
export type Condition =
  | 'poor'
  | 'sufficient'
  | 'good'
  | 'very_good'
  | 'excellent';
export type TechnicalSkill =
  | 'none'
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'expert';
export type Weight = 'light' | 'medium' | 'heavy' | 'very_heavy';
export type TacticalTerrain =
  | 'flat'
  | 'hiking_trail'
  | 'difficult'
  | 'alpine'
  | 'technical_alpine';
export type ConditionType = 'spring' | 'summer' | 'autumn' | 'winter';
export type ThreatLevel = 'green' | 'yellow' | 'red';

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
