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
  low: 1.0,      // 100% of base speed
  medium: 0.9,   // 90% of base speed
  high: 0.7,     // 70% of base speed
  extreme: 0.5,  // 50% of base speed
};

// Light condition multipliers
export const LIGHT_FACTORS = {
  day: 1.0,    // 100% of base speed
  night: 0.6,  // 60% of base speed
  mixed: 0.8,  // 80% of base speed
};

// Terrain type multipliers
export const TERRAIN_FACTORS = {
  easy: 1.0,           // 100% of base speed
  alpine_medium: 0.8,  // 80% of base speed
  alpine_hard: 0.6,    // 60% of base speed
  alpine_extreme: 0.4, // 40% of base speed
};

// Physical condition multipliers
export const PHYSIQUE_FACTORS = {
  very_fit: 1.2,  // 120% of base speed
  fit: 1.0,       // 100% of base speed
  medium: 0.8,    // 80% of base speed
  poor: 0.6,      // 60% of base speed
  injured: 0.3,   // 30% of base speed
};

// Experience level multipliers
export const EXPERIENCE_FACTORS = {
  expert: 1.2,    // 120% of base speed
  advanced: 1.1,  // 110% of base speed
  medium: 1.0,    // 100% of base speed
  basic: 0.8,     // 80% of base speed
  none: 0.6,      // 60% of base speed
};

// Weather condition multipliers
export const WEATHER_FACTORS = {
  clear: 1.0,      // 100% of base speed
  rain: 0.8,       // 80% of base speed
  snow: 0.6,       // 60% of base speed
  storm: 0.4,      // 40% of base speed
  extreme: 0.3     // 30% of base speed
}; 

export const BREAK_DURATION = {
  short: 10,
  long: 30,
  meal: 60
};

export const SEASON_FACTORS = {
  winter: 0.8,
  summer: 1.0,
};

const GROUP_SIZE_FACTORS = {
  individual: 1.0,
  small_team: 0.95,  // 2-5 people
  squad: 0.9,        // 6-12 people
  platoon: 0.8,      // 13-30 people
  company: 0.7       // 31+ people
};