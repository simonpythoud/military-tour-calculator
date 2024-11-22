// Base speeds
export const BASE_SPEEDS = {
  HORIZONTAL: 4, // km/h
  VERTICAL: 400, // m/h
};

// Package weight reduction
export const PACKAGE_WEIGHT = {
  REDUCTION_PER_5KG: 0.02, // 2% reduction per 5kg
};

// Danger level multipliers
export const DANGER_FACTORS = {
  LOW: 1.0, // 100% of base speed
  MEDIUM: 0.9, // 90% of base speed
  HIGH: 0.7, // 70% of base speed
  EXTREME: 0.5, // 50% of base speed
};

// Light condition multipliers
export const LIGHT_FACTORS = {
  DAY: 1.0, // 100% of base speed
  NIGHT: 0.6, // 60% of base speed
  MIXED: 0.8, // 80% of base speed
};

// Terrain type multipliers
export const TERRAIN_FACTORS = {
  EASY: 1.0, // 100% of base speed
  ALPINE_MEDIUM: 0.8, // 80% of base speed
  ALPINE_HARD: 0.6, // 60% of base speed
  ALPINE_EXTREME: 0.4, // 40% of base speed
};

// Physical condition multipliers
export const PHYSIQUE_FACTORS = {
  VERY_FIT: 1.2, // 120% of base speed
  FIT: 1.0, // 100% of base speed
  MEDIUM: 0.8, // 80% of base speed
  POOR: 0.6, // 60% of base speed
  INJURED: 0.3, // 30% of base speed
};

// Experience level multipliers
export const EXPERIENCE_FACTORS = {
  EXPERT: 1.2, // 120% of base speed
  ADVANCED: 1.1, // 110% of base speed
  MEDIUM: 1.0, // 100% of base speed
  BASIC: 0.8, // 80% of base speed
  NONE: 0.6, // 60% of base speed
};

// Weather condition multipliers
export const WEATHER_FACTORS = {
  CLEAR: 1.0, // 100% of base speed
  RAIN: 0.8, // 80% of base speed
  SNOW: 0.6, // 60% of base speed
  STORM: 0.4, // 40% of base speed
  EXTREME: 0.3, // 30% of base speed
};

// Break duration in minutes
export const BREAK_DURATION = {
  SHORT: 10,
  LONG: 30,
  MEAL: 60,
};

export const SEASON_FACTORS = {
  WINTER: 0.8,
  SUMMER: 1.0,
};

export const GROUP_SIZE_FACTORS = {
  INDIVIDUAL: 1.0,
  SMALL_TEAM: 0.95, // 2-5 people
  SQUAD: 0.9, // 6-12 people
  PLATOON: 0.8, // 13-30 people
  COMPANY: 0.7, // 31+ people
};
