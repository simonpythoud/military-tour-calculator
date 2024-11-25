const englishTranslations = {
  title: 'Military Tour Time Calculator',
  distanceMeasurements: 'Distance Measurements',
  horizontalDistance: 'Horizontal Distance (km)',
  verticalDistance: 'Vertical Distance (m)',
  enterDistance: 'Enter distance',
  enterAltitude: 'Enter altitude',
  influencingFactors: 'Influencing Factors',
  packageWeight: 'Package Weight',
  dangerLevel: 'Danger Level',
  lightConditions: 'Light Conditions',
  terrainType: 'Terrain Type',
  physicalCondition: 'Physical Condition',
  experienceLevel: 'Experience Level',
  results: 'Results',
  totalTime: 'Total Time',
  horizontalTime: 'Horizontal Time',
  verticalTime: 'Vertical Time',
  speedMultiplier: 'Speed Multiplier',
  speedAdaptedToFactorPercentage: 'Speed Adapted to Factors',
  calculationMethod: 'Calculation Method',
  baseHorizontalSpeed: 'Base horizontal speed',
  baseVerticalSpeed: 'Base vertical speed',
  packageWeightEffect: 'Package weight',
  currentMultiplier: 'Current conditions multiplier',
  horizontalCalculation: 'Horizontal calculation',
  verticalCalculation: 'Vertical calculation',

  // Factors
  useCustomFactorConstants: 'Use custom factors',
  useStandardFactors: 'Use standard factors',

  // Danger levels
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  extreme: 'Extreme',

  // Light conditions
  day: 'Day',
  night: 'Night',
  mixed: 'Mixed',

  // Terrain types
  easy: 'Easy',
  alpine_medium: 'Alpine Medium',
  alpine_hard: 'Alpine Hard',
  alpine_extreme: 'Alpine Extreme',

  // Physical condition
  very_fit: 'Very Fit',
  fit: 'Fit',
  poor: 'Poor',
  injured: 'Injured',

  // Experience levels
  expert: 'Expert',
  advanced: 'Advanced',
  basic: 'Basic',
  none: 'None',

  // Performance calculation
  performanceEvolution: 'Performance Evolution',
  performanceDescription: 'Estimated performance level over time',
  hours: 'Hours',
  performancePercentage: 'Performance (%)',
  performanceWarning:
    'Note: This is an estimation and may vary based on individual factors',

  // Export
  exportPDF: 'Export PDF',
  exportCSV: 'Export CSV',
  exportResults: 'Export Results',

  // Saved calculations
  savedCalculations: 'Saved Calculations',
  enterCalculationName: 'Enter calculation name',
  save: 'Save',

  // Disclaimer translations
  longTourWarning: 'Extended Tour Duration Warning',
  longTourExplanation:
    'This tour exceeds 18 hours. For tours of this length, actual completion times can vary significantly from estimates due to cumulative fatigue, psychological factors, and extended exposure to environmental conditions. Consider splitting this into multiple days.',
  dangerLevelWarning:
    'This tour involves high-risk conditions. Ensure proper preparation, equipment, and risk assessment before proceeding.',
  generalDisclaimer:
    'All calculations are estimates based on standard conditions. Actual times may vary depending on individual fitness, weather conditions, group size, and other factors not included in this basic calculation. Always plan with adequate safety margins and consult with experienced leaders for challenging tours.',
  fatigueNote:
    'Fatigue increases exponentially over time and can significantly impact performance, especially after 8 hours of continuous activity.',
  safetyNote:
    'This tool is for planning purposes only. Final decisions should always be based on current conditions, group capabilities, and sound judgment.',
  recommendedBreakNote:
    'Regular breaks are essential for maintaining performance. For tours over 8 hours, include adequate rest and meal breaks in your planning.',

  // Estimate reliability
  estimateReliability: 'Estimate Calculation Reliability',
  reliability_high: 'High',
  reliability_medium: 'Medium',
  reliability_low: 'Low',

  // Tooltips
  tooltip_packageWeight:
    'Weight of equipment carried. Every 5kg reduces speed by 2%. A heavier pack will significantly impact your progress over time.',
  tooltip_dangerLevel:
    'Environmental hazards and risks. Higher danger levels require more caution and slower progress. Extreme conditions can halve your speed.',
  tooltip_lightConditions:
    'Visibility conditions. Night travel reduces speed by 40% due to limited visibility. Mixed conditions (dawn/dusk) reduce speed by 20%.',
  tooltip_terrainType:
    'Difficulty of the terrain. Easy terrain allows normal speed, while extreme alpine conditions can reduce speed by up to 60% due to technical challenges.',
  tooltip_physicalCondition:
    'Current fitness level. Very fit individuals can move 20% faster than baseline, while poor condition or injuries significantly reduce speed.',
  tooltip_experienceLevel:
    'Technical expertise and familiarity. Experts can move 20% faster due to efficient movement and better route finding. No experience reduces speed by 40%.',

  // Physical Condition
  condition_title: 'Physical Condition',
  condition_description:
    'Better condition enables higher performance on all terrain types',
  condition_poor: 'Poor',
  condition_sufficient: 'Sufficient',
  condition_good: 'Good',
  condition_very_good: 'Very Good',
  condition_excellent: 'Excellent',

  // Technical Skills
  technical_title: 'Technical Skills',
  technical_description:
    'Influences performance, especially in technical terrain',
  technical_none: 'No Mountain Skills',
  technical_basic: 'Basic',
  technical_intermediate: 'Intermediate (Special Forces)',
  technical_advanced: 'Advanced (Mountain Specialist)',
  technical_expert: 'Expert (Mountain Guide)',

  // Weight
  weight_title: 'Weight',
  weight_description: 'Heavier loads significantly reduce speed and endurance',
  weight_light: 'Light (<15 kg)',
  weight_medium: 'Medium (15-25 kg)',
  weight_heavy: 'Heavy (25-35 kg)',
  weight_very_heavy: 'Very Heavy (>35 kg)',

  // Terrain
  terrain_title: 'Terrain',
  terrain_description:
    'A fundamental factor that strongly influences movement speed',
  terrain_flat: 'Flat Terrain',
  terrain_hiking_trail: 'Hiking Trail',
  terrain_difficult: 'Difficult Terrain',
  terrain_alpine: 'Alpine Terrain',
  terrain_technical_alpine: 'Technical Alpine Terrain',

  // Conditions
  conditions_title: 'Conditions',
  conditions_description: 'Influences overall speed and energy consumption',
  conditions_spring: 'Spring (Old snow/Wet snow/Firn)',
  conditions_summer: 'Summer',
  conditions_autumn: 'Autumn (Fresh snow)',
  conditions_winter: 'Winter',

  // Threat Level
  threat_title: 'Threat Level',
  threat_description: 'Influences route choice and movement speed',
  threat_none: 'No Threat',
  threat_green: 'Green (Low Threat)',
  threat_yellow: 'Yellow (Medium Threat)',
  threat_red: 'Red (High Threat)',

  // Add these new translations
  calculationConstants: 'Calculation Constants',
  standardFactors: 'Standard Factors',
  tacticalFactors: 'Tactical Factors',
  baseSpeeds: 'Base Speeds',
  dangerFactors: 'Danger Level Factors',
  lightFactors: 'Light Condition Factors',
  terrainFactors: 'Terrain Factors',
  physiqueFactors: 'Physical Condition Factors',
  experienceFactors: 'Experience Level Factors',
  conditionFactors: 'Condition Factors',
  technicalSkillFactors: 'Technical Skill Factors',
  weightFactors: 'Weight Factors',
  tacticalTerrainFactors: 'Tactical Terrain Factors',
  conditionTypeFactors: 'Condition Type Factors',
  threatLevelFactors: 'Threat Level Factors',
  customConstants: 'Custom Constants',
  uploadConstants: 'Upload Constants',
  resetToDefault: 'Reset to Default',
  invalidFormat: 'Invalid file format',
  constantsUpdated: 'Constants updated successfully',
  uploadInstructions: 'Upload a JSON file with your custom constants',
  downloadDefaultConstantsFile: 'Download default constants file',
};

export default englishTranslations;
