// Base speeds
export const BASE_SPEEDS = {
  HORIZONTAL: 4, // km/h
  VERTICAL: 400, // m/h
};

export const CONDITION_FACTORS = {
  POOR: 0.6, // Level 1
  SUFFICIENT: 0.8, // Level 2
  GOOD: 1.0, // Level 3
  VERY_GOOD: 1.2, // Level 4
  EXCELLENT: 1.4, // Level 5
};

export const TECHNICAL_SKILL_FACTORS = {
  NONE: 0.6, // Level 1
  BASIC: 0.8, // Level 2
  INTERMEDIATE: 1.0, // Level 3
  ADVANCED: 1.2, // Level 4
  EXPERT: 1.4, // Level 5
};

export const WEIGHT_FACTORS = {
  LIGHT: 1.0, // Level 1 (<15kg)
  MEDIUM: 0.8, // Level 2 (15-25kg)
  HEAVY: 0.6, // Level 3 (25-35kg)
  VERY_HEAVY: 0.4, // Level 4 (>35kg)
};

export const TACTICAL_TERRAIN_FACTORS = {
  FLAT: 1.0, // Level 1
  HIKING_TRAIL: 0.8, // Level 2
  DIFFICULT: 0.6, // Level 3
  ALPINE: 0.4, // Level 4
  TECHNICAL_ALPINE: 0.3, // Level 5
};

export const CONDITION_TYPE_FACTORS = {
  SPRING: 0.8, // Level 1
  SUMMER: 1.0, // Level 2
  AUTUMN: 0.7, // Level 3
  WINTER: 0.6, // Level 4
};

export const THREAT_LEVEL_FACTORS = {
  GREEN: 1, // Level 1
  YELLOW: 0.8, // Level 2
  RED: 0.5, // Level 3
};

// Additional factors that could be used

// // Package weight reduction
// export const PACKAGE_WEIGHT = {
//   REDUCTION_PER_5KG: 0.02, // 2% reduction per 5kg
// };

// // Light condition multipliers
// export const LIGHT_FACTORS = {
//   DAY: 1.0, // 100% of base speed
//   NIGHT: 0.6, // 60% of base speed
//   MIXED: 0.8, // 80% of base speed
// };

// // Weather condition multipliers
// export const WEATHER_FACTORS = {
//   CLEAR: 1.0, // 100% of base speed
//   RAIN: 0.8, // 80% of base speed
//   SNOW: 0.6, // 60% of base speed
//   STORM: 0.4, // 40% of base speed
//   EXTREME: 0.3, // 30% of base speed
// };

// // Break duration in minutes
// export const BREAK_DURATION = {
//   SHORT: 10,
//   LONG: 30,
//   MEAL: 60,
// };

// export const GROUP_SIZE_FACTORS = {
//   INDIVIDUAL: 1.0,
//   SMALL_TEAM: 0.95, // 2-5 people
//   SQUAD: 0.9, // 6-12 people
//   PLATOON: 0.8, // 13-30 people
//   COMPANY: 0.7, // 31+ people
// };
