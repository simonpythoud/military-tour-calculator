export type Package = 0 | 5 | 10 | 15 | 20 | 25 | 30;

export type DangerLevel = 'low' | 'medium' | 'high' | 'extreme';
export type Light = 'day' | 'night' | 'mixed';
export type Terrain = 'easy' | 'alpine_medium' | 'alpine_hard' | 'alpine_extreme';
export type Physique = 'very_fit' | 'fit' | 'medium' | 'poor' | 'injured';
export type Experience = 'none' | 'basic' | 'medium' | 'advanced' | 'expert';

export interface TourInputs {
  horizontalDistance: number;
  verticalDistance: number;
  package: Package;
  dangerLevel: DangerLevel;
  light: Light;
  terrain: Terrain;
  physique: Physique;
  experience: Experience;
}
