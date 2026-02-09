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
  useCustomFactorConstants: 'Use custom constants for factors',
  useDefaultFactorConstants: 'Use default constants for factors',

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
  condition_factors: 'Condition Factors',
  condition_description:
    'Better condition enables higher performance on all terrain types',
  condition_poor: 'Poor',
  condition_sufficient: 'Sufficient',
  condition_good: 'Good',
  condition_very_good: 'Very Good',
  condition_excellent: 'Excellent',

  // Technical Skills
  technical_title: 'Technical Skills',
  technical_factors: 'Technical Skill Factors',
  technical_description:
    'Influences performance, especially in technical terrain',
  technical_none: 'No Mountain Skills',
  technical_basic: 'Basic',
  technical_intermediate: 'Intermediate (Special Forces)',
  technical_advanced: 'Advanced (Mountain Specialist)',
  technical_expert: 'Expert (Mountain Guide)',

  // Weight
  weight_title: 'Weight',
  weight_factors: 'Weight Factors',
  weight_description: 'Heavier loads significantly reduce speed and endurance',
  weight_light: 'Light (<15 kg)',
  weight_medium: 'Medium (15-25 kg)',
  weight_heavy: 'Heavy (25-35 kg)',
  weight_very_heavy: 'Very Heavy (>35 kg)',
  
  // Tactical Terrain
  terrain_title: 'Tactical Terrain',
  terrain_factors: 'Terrain Factors',
  terrain_description:
    'A fundamental factor that strongly influences movement speed',
  terrain_flat: 'Flat Terrain',
  terrain_hiking_trail: 'Hiking Trail',
  terrain_difficult: 'Difficult Terrain',
  terrain_alpine: 'Alpine Terrain',
  terrain_technical_alpine: 'Technical Alpine Terrain',

  // Conditions
  conditions_title: 'Conditions',
  conditions_factors: 'Condition Type Factors',
  conditions_description: 'Influences overall speed and energy consumption',
  conditions_spring: 'Spring (Old snow/Wet snow/Firn)',
  conditions_summer: 'Summer',
  conditions_autumn: 'Autumn (Fresh snow)',
  conditions_winter: 'Winter',

  // Threat Level
  threat_title: 'Threat Level',
  threat_factors: 'Threat Level Factors',
  threat_description: 'Influences route choice and movement speed',
  threat_none: 'No Threat',
  threat_green: 'Green (Low Threat)',
  threat_yellow: 'Yellow (Medium Threat)',
  threat_red: 'Red (High Threat)',

  // Add these new translations
  calculationConstants: 'Calculation Constants',
  tacticalFactors: 'Tactical Factors',
  baseSpeeds: 'Base Speeds',

  customConstants: 'Custom Constants',
  uploadConstants: 'Upload Constants',
  resetToDefault: 'Reset to Default',
  invalidFormat: 'Invalid file format',
  constantsUpdated: 'Constants updated successfully',
  uploadInstructions: 'Upload a JSON file with your custom constants',
  downloadDefaultConstantsFile: 'Download default constants file',

  // GPX Import
  gpxImport: 'Route Import',
  gpxImportDescription: 'Upload a navigation file (.gpx, .kml, .tcx) to automatically calculate distances and elevation from your route.',
  gpxUploadFile: 'Upload Route File',
  gpxClearRoute: 'Clear Route',
  gpxSupportedFormats: 'Supported formats',
  gpxImportSuccess: 'Route imported successfully',
  gpxImportError: 'Failed to import route file. Please check the file format.',
  gpxRouteSections: 'Route Sections',
  gpxSectionsDescription: 'Each section has an auto-detected terrain difficulty based on elevation gradient. You can adjust the terrain type per section.',
  gpxRouteMap: 'Route Map',
  gpxTotalDistance: 'Total distance',
  terrainDisabledByRoute: 'Terrain is set per section in Route Sections above.',

  // TODO: Remove
  standardFactors: 'Standard Factors',
  dangerFactors: 'Danger Level Factors',
  lightFactors: 'Light Condition Factors',
  physiqueFactors: 'Physical Condition Factors',
  experienceFactors: 'Experience Level Factors',

  // V2
  v2_beta_tag: '(Beta)',
  v2_mode_basic: 'Basic (FM-style)',
  v2_mode_advanced: 'Advanced terrain',
  v2_model_basic_desc: 'Basic military estimation: 4 km/h horizontal, 400 m/h vertical with simple multiplicative factors.',
  v2_model_advanced_desc: 'Advanced terrain estimation: slope-aware speed, ascent/descent distinction, group fatigue, and non-linear load effects.',
  v2_elevation_gain: 'Elevation Gain (m)',
  v2_elevation_loss: 'Elevation Loss (m)',
  v2_enter_gain: 'Enter elevation gain',
  v2_enter_loss: 'Enter elevation loss',
  v2_group_size: 'Group Size',
  v2_group_small: 'Small (2-5)',
  v2_group_medium: 'Medium (6-12)',
  v2_group_large: 'Large Unit (13+)',
  v2_ascent_time: 'Ascent Time',
  v2_descent_time: 'Descent Time',
  v2_factor_breakdown: 'Factor Breakdown',
  v2_base_time: 'Base time',
  v2_penalty_summary: 'Total time adjusted by terrain, load, and conditions',
  v2_factor_condition: 'Physical Condition',
  v2_factor_skill: 'Technical Skills',
  v2_factor_load: 'Equipment Load',
  v2_factor_terrain: 'Terrain Difficulty',
  v2_factor_season: 'Season / Conditions',
  v2_factor_threat: 'Threat Level',
  v2_factor_fatigue: 'Group Fatigue',
  v2_factor_slope: 'Steep Descent',
  v2_model_label: 'Model',
  v2_slope_aware: 'Slope-aware speed adjustments applied',
  v2_fatigue_applied: 'Progressive group fatigue applied',
  v2_section_analysis: 'Section Analysis',
  v2_fatigue_short: 'fatigue',
  v2_model_basic: 'Basic military estimation (FM-style)',
  v2_model_advanced: 'Advanced terrain estimation',
};

export default englishTranslations;
