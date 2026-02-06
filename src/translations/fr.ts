const frenchTranslations = {
  title: 'Calculateur de temps de marche militaire',
  distanceMeasurements: 'Mesures de distance',
  horizontalDistance: 'Distance horizontale (km)',
  verticalDistance: 'Distance verticale (m)',
  enterDistance: 'Entrer la distance',
  enterAltitude: "Entrer l'altitude",
  influencingFactors: "Facteurs d'influence",
  packageWeight: 'Poids du paquetage',
  dangerLevel: 'Niveau de danger',
  lightConditions: 'Conditions de luminosité',
  terrainType: 'Type de terrain',
  physicalCondition: 'Condition physique',
  experienceLevel: "Niveau d'expérience",
  results: 'Résultats',
  totalTime: 'Temps total',
  horizontalTime: 'Temps horizontal',
  verticalTime: 'Temps vertical',
  speedMultiplier: 'Multiplicateur de vitesse',
  speedAdaptedToFactorPercentage: 'Vitesse adaptée aux facteurs',
  calculationMethod: 'Méthode de calcul',
  baseHorizontalSpeed: 'Vitesse horizontale de base',
  baseVerticalSpeed: 'Vitesse verticale de base',
  packageWeightEffect: 'Poids du paquetage',
  currentMultiplier: 'Multiplicateur actuel',
  horizontalCalculation: 'Calcul horizontal',
  verticalCalculation: 'Calcul vertical',

  // Factors
  useCustomFactorConstants: 'Utiliser des constantes personnalisées pour les facteurs',
  useDefaultFactorConstants: 'Utiliser les constantes standard pour les facteurs',

  low: 'Faible',
  medium: 'Moyen',
  high: 'Élevé',
  extreme: 'Extrême',

  day: 'Jour',
  night: 'Nuit',
  mixed: 'Mixte',

  easy: 'Facile',
  alpine_medium: 'Alpin moyen',
  alpine_hard: 'Alpin difficile',
  alpine_extreme: 'Alpin extrême',

  very_fit: 'Très en forme',
  fit: 'En forme',
  poor: 'Faible',
  injured: 'Blessé',

  expert: 'Expert',
  advanced: 'Avancé',
  basic: 'Basique',
  none: 'Aucune',

  // Performance calculation
  performanceEvolution: 'Évolution de la performance',
  performanceDescription: 'Évolution estimée de la performance sur la durée',
  hours: 'Heures',
  performancePercentage: 'Performance (%)',
  performanceWarning:
    'Remarque : Cette estimation peut varier en fonction de facteurs individuels',

  // Export
  exportPDF: 'Export PDF',
  exportCSV: 'Export CSV',
  exportResults: 'Exporter les résultats',

  // Saved calculations
  savedCalculations: 'Calculs enregistrés',
  enterCalculationName: 'Entrer le nom du calcul',
  save: 'Enregistrer',

  // Disclaimer translations
  longTourWarning: 'Avertissement sur la durée du tour',
  longTourExplanation:
    "Ce tour dépasse les 18 heures. Pour les tours de cette longueur, les temps de fin réels peuvent varier de manière significative par rapport aux estimations en raison de l'épuisement cumulatif, des facteurs psychologiques et de l'exposition prolongée aux conditions environnementales. Considérez la division en plusieurs jours.",
  dangerLevelWarning:
    "Ce tour implique des conditions de danger élevé. Assurez-vous de vous préparer correctement, de porter l'équipement approprié et de réaliser une évaluation des risques adéquate.",
  generalDisclaimer:
    "Tous les calculs sont des estimations basées sur des conditions standard. Les temps réels peuvent varier en fonction de la condition physique, des conditions météorologiques, de la taille du groupe et d'autres facteurs non inclus dans ce calcul de base. Toujours planifier avec des marges de sécurité suffisantes et consulter des leaders expérimentés pour les tours difficiles.",
  fatigueNote:
    "L'épuisement augmente exponentiellement avec le temps et peut significativement affecter la performance, surtout après 8 heures de travail continu.",
  safetyNote:
    'Ce outil est uniquement pour des calculs de planification. Les décisions finales doivent toujours être basées sur les conditions actuelles, les capacités du groupe et une bonne appréciation.',
  recommendedBreakNote:
    "Les pauses régulières sont essentielles pour maintenir la performance. Pour les tours d'une durée supérieure à 8 heures, incluez des pauses et des pauses-repas dans votre planification.",

  // Estimate reliability
  estimateReliability: 'Estimation de la fiabilité du calcul',
  reliability_high: 'Élevé',
  reliability_medium: 'Moyen',
  reliability_low: 'Faible',

  // Tooltips
  tooltip_packageWeight:
    "Poids de l'équipement transporté. Chaque 5kg réduit la vitesse de 2%. Un sac plus lourd impactera significativement votre progression.",
  tooltip_dangerLevel:
    'Dangers environnementaux et risques. Des niveaux de danger plus élevés nécessitent plus de prudence. Les conditions extrêmes peuvent réduire la vitesse de moitié.',
  tooltip_lightConditions:
    'Conditions de visibilité. Le voyage de nuit réduit la vitesse de 40%. Les conditions mixtes (aube/crépuscule) réduisent la vitesse de 20%.',
  tooltip_terrainType:
    "Difficulté du terrain. Un terrain facile permet une vitesse normale, tandis que les conditions alpines extrêmes peuvent réduire la vitesse jusqu'à 60%.",
  tooltip_physicalCondition:
    "Niveau de forme actuel. Les personnes très en forme peuvent se déplacer 20% plus vite, tandis qu'une mauvaise condition réduit significativement la vitesse.",
  tooltip_experienceLevel:
    'Expertise technique. Les experts peuvent se déplacer 20% plus vite grâce à des mouvements efficaces. Aucune expérience réduit la vitesse de 40%.',

  // Condition physique tactique
  condition_title: 'Condition physique',
  condition_description:
    'Une meilleure condition permet une performance supérieure sur tous les types de terrain',
  condition_poor: 'Mauvaise',
  condition_sufficient: 'Suffisante',
  condition_good: 'Bonne',
  condition_very_good: 'Très bonne',
  condition_excellent: 'Excellente',

  // Compétences techniques
  technical_title: 'Compétences techniques',
  technical_description:
    'Influence la performance, particulièrement en terrain technique',
  technical_none: 'Aucune compétence montagne',
  technical_basic: 'Base',
  technical_intermediate: 'Intermédiaire (Forces spéciales)',
  technical_advanced: 'Avancé (Spécialiste montagne)',
  technical_expert: 'Expert (Guide de montagne)',

  // Poids
  weight_title: 'Poids',
  weight_description:
    "Les charges plus lourdes réduisent significativement la vitesse et l'endurance",
  weight_light: 'Léger (<15 kg)',
  weight_medium: 'Moyen (15-25 kg)',
  weight_heavy: 'Lourd (25-35 kg)',
  weight_very_heavy: 'Très lourd (>35 kg)',

  // Terrain
  terrain_title: 'Terrain',
  terrain_description:
    'Un facteur fondamental qui influence fortement la vitesse de déplacement',
  terrain_flat: 'Terrain plat',
  terrain_hiking_trail: 'Sentier de randonnée',
  terrain_difficult: 'Terrain difficile',
  terrain_alpine: 'Terrain alpin',
  terrain_technical_alpine: 'Terrain alpin technique',

  // Conditions
  conditions_title: 'Conditions',
  conditions_description:
    "Influence la vitesse globale et la consommation d'énergie",
  conditions_spring: 'Printemps (Vieille neige/Neige mouillée/Névé)',
  conditions_summer: 'Été',
  conditions_autumn: 'Automne (Neige fraîche)',
  conditions_winter: 'Hiver',

  // Niveau de menace
  threat_title: 'Niveau de menace',
  threat_description:
    "Influence le choix d'itinéraire et la vitesse de déplacement",
  threat_none: 'Pas de menace',
  threat_green: 'Vert (Menace faible)',
  threat_yellow: 'Jaune (Menace moyenne)',
  threat_red: 'Rouge (Menace élevée)',

  // Add these new translations
  calculationConstants: 'Constantes de calcul',
  standardFactors: 'Facteurs standard',
  tacticalFactors: 'Facteurs tactiques',
  baseSpeeds: 'Vitesses de base',
  dangerFactors: 'Facteurs de danger',
  lightFactors: 'Facteurs de luminosité',
  terrain_factors: 'Facteurs de terrain',
  physiqueFactors: 'Facteurs de condition physique',
  experienceFactors: "Facteurs d'expérience",
 condition_factors: 'Facteurs de condition',
  technical_factors: 'Facteurs de compétence technique',
  weight_factors: 'Facteurs de poids',
  conditions_factors: 'Facteurs de type de condition',
  threat_factors: 'Facteurs de niveau de menace',
  customConstants: 'Constantes personnalisées',
  uploadConstants: 'Télécharger les constantes',
  resetToDefault: 'Réinitialiser',
  invalidFormat: 'Format de fichier invalide',
  constantsUpdated: 'Constantes mises à jour avec succès',
  uploadInstructions:
    'Téléchargez un fichier JSON avec vos constantes personnalisées. Le fichier doit contenir tous les facteurs nécessaires au calcul.',
  downloadDefaultConstantsFile: 'Télécharger les constantes par défaut',

  // GPX Import
  gpxImport: 'Importation de route',
  gpxImportDescription: 'Téléchargez un fichier de navigation (.gpx, .kml, .tcx) pour calculer automatiquement les distances et le dénivelé de votre itinéraire.',
  gpxUploadFile: 'Télécharger un fichier de route',
  gpxClearRoute: 'Supprimer la route',
  gpxSupportedFormats: 'Formats supportés',
  gpxImportSuccess: 'Route importée avec succès',
  gpxImportError: "Échec de l'importation du fichier de route. Veuillez vérifier le format du fichier.",
  gpxRouteSections: 'Sections de la route',
  gpxSectionsDescription: 'Chaque section a une difficulté de terrain détectée automatiquement en fonction du gradient d\'altitude. Vous pouvez ajuster le type de terrain par section.',
  gpxRouteMap: 'Carte de la route',
  gpxTotalDistance: 'Distance totale',
};

export default frenchTranslations;
