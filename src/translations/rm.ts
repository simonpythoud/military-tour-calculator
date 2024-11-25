const romanshTranslations = {
  title: 'Calculatur da temp da marcha militar',
  distanceMeasurements: 'Mesiraziuns da distanza',
  horizontalDistance: 'Distanza orizontala (km)',
  verticalDistance: 'Distanza verticala (m)',
  enterDistance: 'Endatar distanza',
  enterAltitude: 'Endatar autezza',
  influencingFactors: "Facturs d'influenza",
  packageWeight: 'Pais dal bagascha',
  dangerLevel: 'Nivel da privel',
  lightConditions: 'Cundiziuns da glisch',
  terrainType: 'Tip da terrain',
  physicalCondition: 'Cundiziun fisica',
  experienceLevel: "Nivel d'experientscha",
  results: 'Resultats',
  totalTime: 'Temp total',
  horizontalTime: 'Temp orizontal',
  verticalTime: 'Temp vertical',
  speedMultiplier: 'Multiplicatur da spertadad',
  speedAdaptedToFactorPercentage: 'Spertadad adaptada a fakturs',
  calculationMethod: 'Method da calculaziun',
  baseHorizontalSpeed: 'Spertadad orizontala da basa',
  baseVerticalSpeed: 'Spertadad verticala da basa',
  packageWeightEffect: 'Pais dal bagascha',
  currentMultiplier: 'Multiplicatur actual',
  horizontalCalculation: 'Calculaziun orizontala',
  verticalCalculation: 'Calculaziun verticala',

  // Factors
  useCustomFactorConstants: 'Utilisar facturs personalisads',
  useStandardFactors: 'Utilisar facturs standard',

  low: 'Bass',
  medium: 'Mesaun',
  high: 'Aut',
  extreme: 'Extrem',

  day: 'Di',
  night: 'Notg',
  mixed: 'Maschadà',

  easy: 'Simpel',
  alpine_medium: 'Alpin mesaun',
  alpine_hard: 'Alpin difficil',
  alpine_extreme: 'Alpin extrem',

  very_fit: 'Fitg bun',
  fit: 'Bun',
  poor: 'Flaivel',
  injured: 'Blessà',

  expert: 'Expert',
  advanced: 'Avanzà',
  basic: 'Basic',
  none: 'Nagin',

  // Performance calculation
  performanceEvolution: 'Evoluziun da la performance',
  performanceDescription: 'Evoluziun estimada da la performance in temp',
  hours: 'Ores',
  performancePercentage: 'Performance (%)',
  performanceWarning:
    'Nota: Questa è una stima e può variare in base a fattori individuali',

  // Export
  exportPDF: 'Esporta PDF',
  exportCSV: 'Esporta CSV',
  exportResults: 'Esporta resultats',

  // Salvadas calculaziuns
  savedCalculations: 'Calculaziuns salvadas',
  enterCalculationName: 'Endatescha il num da la calculaziun',
  save: 'Salvar',

  // Translations da decleraziuns
  longTourWarning: 'Avis da durada prolungada da la tura',
  longTourExplanation:
    "Questa tura surpassa 18 uras. Per turas da questa lunghezza, ils temps actuals da terminaziun pon variar considerablamain da las stimaziuns pervi da fatiga cumulativa, facturs psicologics e l'exposiziun prolungada a las cundiziuns d'enviern. Considera da divider questa tura en plirs dis.",
  dangerLevelWarning:
    'Questa tura involva cundiziuns da risc aut. As prepara bain, prevesa l’equipament adattà e valitescha ils privels avant da cuntinuar.',
  generalDisclaimer:
    'Tut las calculaziuns èn stimaziuns basadas sin cundiziuns standard. Ils temps reals pon variar tenor la furma corporala individuala, las cundiziuns meteorologicas, la grondezza dal grupp e auters facturs betg includids en questa calculaziun simpla. Planisescha adina cun margens da segirezza adequatas e consulta cun manaders experimentads per turas pretensiusas.',
  fatigueNote:
    "La fatiga crescha exponentialmain sur il temp e po influenzar considerablamain la prestaziun, surtut suenter 8 uras d'activitad cuntinuada.",
  safetyNote:
    'Quest instrument è mo per intents da planisaziun. Las decisiuns finalas duain adina esser basadas sin las cundiziuns actualas, las capacitads dal grupp e bun giudicament.',
  recommendedBreakNote:
    'Pausas regularas èn essenzialas per mantener la prestaziun. Per turas da sur 8 uras, includa pausas suffizientas da paus e da repas en tes planisaziuns.',

  // Estimate reliability
  estimateReliability: 'Estimation de la fiabilité du calcul',
  reliability_high: 'Aut',
  reliability_medium: 'Mesaun',
  reliability_low: 'Bass',

  // Tooltips
  tooltip_packageWeight:
    'Pais dal equipament purtà. Mintga 5kg reducescha la spertadad per 2%. In pac pli grev influenzescha significantamain il progress.',
  tooltip_dangerLevel:
    "Privels da l'ambient e ristgs. Nivels da privel pli auts pretendan dapli precauziun. Cundiziuns extremas pon reducir la spertadad per la mesadad.",
  tooltip_lightConditions:
    'Cundiziuns da vesaivladad. Viadis da notg reduceschan la spertadad per 40%. Cundiziuns maschadadas reduceschan la spertadad per 20%.',
  tooltip_terrainType:
    'Difficultad dal terrain. Terrain simpel permetta spertadad normala, entant che cundiziuns alpinas extremas pon reducir la spertadad fin 60%.',
  tooltip_physicalCondition:
    'Nivel da fitness actual. Persunas fitg en forma pon sa mover 20% pli spert, entant che cundiziuns mendras reduceschan significantamain la spertadad.',
  tooltip_experienceLevel:
    'Expertisa tecnica. Experts pon sa mover 20% pli spert grazia a moviments effizients. Nagina experientscha reducescha la spertadad per 40%.',

  // Cundiziun fisica
  condition_title: 'Cundiziun fisica',
  condition_description:
    'Ina meglra cundiziun pussibilitescha ina prestaziun superiura sin tut ils tips da terrain',
  condition_poor: 'Flaivla',
  condition_sufficient: 'Sufficienta',
  condition_good: 'Buna',
  condition_very_good: 'Fitg buna',
  condition_excellent: 'Excellenta',

  // Abilitads tecnicas
  technical_title: 'Abilitads tecnicas',
  technical_description:
    'Influenzescha la prestaziun, spezialmain sin terrain tecnic',
  technical_none: 'Naginas abilitads muntagnardas',
  technical_basic: 'Basas',
  technical_intermediate: 'Intermediar (Forzas spezialas)',
  technical_advanced: 'Avanzà (Spezialist muntogna)',
  technical_expert: 'Expert (Guid alpin)',

  // Pais
  weight_title: 'Pais',
  weight_description:
    'Chargia pli greva reducescha significantamain la sveltezza e la resistenza',
  weight_light: 'Lev (<15 kg)',
  weight_medium: 'Mesaun (15-25 kg)',
  weight_heavy: 'Grev (25-35 kg)',
  weight_very_heavy: 'Fitg grev (>35 kg)',

  // Terrain
  terrain_title: 'Terrain',
  terrain_description:
    'In factur fundamental che influenzescha fermamain la sveltezza da moviment',
  terrain_flat: 'Terrain plat',
  terrain_hiking_trail: 'Senda da viandar',
  terrain_difficult: 'Terrain difficil',
  terrain_alpine: 'Terrain alpin',
  terrain_technical_alpine: 'Terrain alpin tecnic',

  // Cundiziuns
  conditions_title: 'Cundiziuns',
  conditions_description:
    "Influenzescha la sveltezza totala ed il consum d'energia",
  conditions_spring: 'Primavaira (Naiv veglia/Naiv bletsch/Firn)',
  conditions_summer: 'Stad',
  conditions_autumn: 'Atun (Naiv frestga)',
  conditions_winter: 'Enviern',

  // Nivel da smanatscha
  threat_title: 'Nivel da smanatscha',
  threat_description:
    'Influenzescha la tscherna da la ruta e la sveltezza da moviment',
  threat_none: 'Nagina smanatscha',
  threat_green: 'Verd (Smanatscha bassa)',
  threat_yellow: 'Mellen (Smanatscha mesauna)',
  threat_red: 'Cotschen (Smanatscha auta)',

  // Add these new translations
  calculationConstants: 'Constantas da calculaziun',
  standardFactors: 'Facturs standard',
  tacticalFactors: 'Facturs tactics',
  baseSpeeds: 'Spertadads da basa',
  dangerFactors: 'Facturs da privel',
  lightFactors: 'Facturs da glisch',
  terrainFactors: 'Facturs da terrain',
  physiqueFactors: 'Facturs da constituziun fisica',
  experienceFactors: "Facturs d'experientscha",
  conditionFactors: 'Facturs da cundiziun',
  technicalSkillFactors: 'Facturs da capacitads tecnicas',
  weightFactors: 'Facturs da pais',
  conditionTypeFactors: 'Facturs da tip da cundiziun',
  threatLevelFactors: 'Facturs da nivel da smanatscha',
  customConstants: 'Constantas persunalisadas',
  uploadConstants: 'Chargiar constantas',
  resetToDefault: 'Resettar',
  invalidFormat: 'Format da datoteca nunvalid',
  constantsUpdated: 'Constantas actualisadas cun success',
  uploadInstructions:
    'Chargia ina datoteca JSON cun tias constantas persunalisadas. La datoteca sto cuntegnair tut ils facturs necessaris per il calcul.',
  downloadDefaultConstantsFile: 'Descargiar constantas predefinidas',
};

export default romanshTranslations;
