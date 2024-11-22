const italianTranslations = {
  title: 'Calcolatore tempo di marcia militare',
  distanceMeasurements: 'Misure di distanza',
  horizontalDistance: 'Distanza orizzontale (km)',
  verticalDistance: 'Distanza verticale (m)',
  enterDistance: 'Inserire distanza',
  enterAltitude: 'Inserire altitudine',
  influencingFactors: 'Fattori influenti',
  packageWeight: "Peso dell'equipaggiamento",
  dangerLevel: 'Livello di pericolo',
  lightConditions: 'Condizioni di luce',
  terrainType: 'Tipo di terreno',
  physicalCondition: 'Condizione fisica',
  experienceLevel: 'Livello di esperienza',
  results: 'Risultati',
  totalTime: 'Tempo totale',
  horizontalTime: 'Tempo orizzontale',
  verticalTime: 'Tempo verticale',
  speedMultiplier: 'Moltiplicatore di velocità',
  speedAdaptedToFactorPercentage: 'Velocità adattata ai fattori',
  calculationMethod: 'Metodo di calcolo',
  baseHorizontalSpeed: 'Velocità orizzontale base',
  baseVerticalSpeed: 'Velocità verticale base',
  packageWeightEffect: "Peso dell'equipaggiamento",
  currentMultiplier: 'Moltiplicatore attuale',
  horizontalCalculation: 'Calcolo orizzontale',
  verticalCalculation: 'Calcolo verticale',

  // Factors
  useTacticalFactors: 'Utilizzare i fattori tattici',
  useStandardFactors: 'Utilizzare i fattori standard',

  low: 'Basso',
  medium: 'Medio',
  high: 'Alto',
  extreme: 'Estremo',

  day: 'Giorno',
  night: 'Notte',
  mixed: 'Misto',

  easy: 'Facile',
  alpine_medium: 'Alpino medio',
  alpine_hard: 'Alpino difficile',
  alpine_extreme: 'Alpino estremo',

  very_fit: 'Molto in forma',
  fit: 'In forma',
  poor: 'Scarso',
  injured: 'Ferito',

  expert: 'Esperto',
  advanced: 'Avanzato',
  basic: 'Base',
  none: 'Nessuna',

  // Performance calculation
  performanceEvolution: 'Evoluzione della performance',
  performanceDescription: 'Evoluzione stimata della performance nel tempo',
  hours: 'Ore',
  performancePercentage: 'Performance (%)',
  performanceWarning:
    'Nota: Questa è una stima e può variare in base a fattori individuali',

  // Export
  exportPDF: 'Esporta PDF',
  exportCSV: 'Esporta CSV',
  exportResults: 'Esporta risultati',

  // Saved calculations
  savedCalculations: 'Calcoli salvati',
  enterCalculationName: 'Inserire il nome del calcolo',
  save: 'Salva',

  // Disclaimer translations
  longTourWarning: 'Avviso sulla durata del tour',
  longTourExplanation:
    "Questa passeggiata supera le 18 ore. Per passeggiate di questa lunghezza, i tempi di fine reali possono variare significativamente dalle stime a causa dell'esaurimento cumulativo, dei fattori psicologici e dell'esposizione prolungata alle condizioni ambientali. Considerare la divisione in più giorni.",
  dangerLevelWarning:
    "Questa passeggiata implica condizioni di pericolo elevato. Assicurarsi di essere ben preparato, di portare l'attrezzatura appropriata e di eseguire una valutazione dei rischi adeguata.",
  generalDisclaimer:
    'Tutti i calcoli sono stime basate su condizioni standard. I tempi reali possono variare in base alla condizione fisica, alle condizioni meteorologiche, alla dimensione del gruppo e ad altri fattori non inclusi in questo calcolo di base. Pianificare sempre con margini di sicurezza adeguati e consultare leader esperti per passeggiate difficili.',
  fatigueNote:
    "L'esaurimento aumenta esponenzialmente con il tempo e può significativamente influenzare la performance, specialmente dopo 8 ore di attività continua.",
  safetyNote:
    'Questo strumento è solo per scopi di pianificazione. Le decisioni finali devono sempre essere basate sulle condizioni attuali, sulle capacità del gruppo e su una buona valutazione.',
  recommendedBreakNote:
    'Le pausen regolari sono essenziali per mantenere la performance. Per passeggiate superiori alle 8 ore, includere pausen e pause pranzo nella pianificazione.',

  // Estimate reliability
  estimateReliability: 'Stima della fiabilità del calcolo',
  reliability_high: 'Alta',
  reliability_medium: 'Media',
  reliability_low: 'Bassa',

  // Tooltips
  tooltip_packageWeight:
    "Peso dell'attrezzatura trasportata. Ogni 5kg riduce la velocità del 2%. Un carico più pesante influenzerà significativamente la progressione.",
  tooltip_dangerLevel:
    'Pericoli ambientali e rischi. Livelli di pericolo più elevati richiedono maggiore cautela. Le condizioni estreme possono dimezzare la velocità.',
  tooltip_lightConditions:
    'Condizioni di visibilità. Il viaggio notturno riduce la velocità del 40%. Condizioni miste (alba/tramonto) riducono la velocità del 20%.',
  tooltip_terrainType:
    'Difficoltà del terreno. Un terreno facile permette velocità normale, mentre condizioni alpine estreme possono ridurre la velocità fino al 60%.',
  tooltip_physicalCondition:
    'Livello di forma fisica attuale. Persone molto in forma possono muoversi 20% più velocemente, mentre una cattiva condizione riduce significativamente la velocità.',
  tooltip_experienceLevel:
    'Esperienza tecnica. Gli esperti possono muoversi 20% più velocemente grazie a movimenti efficienti. Nessuna esperienza riduce la velocità del 40%.',

  // Condizione fisica
  condition_title: 'Condizione fisica',
  condition_description:
    'Una migliore condizione permette prestazioni superiori su tutti i tipi di terreno',
  condition_poor: 'Scarsa',
  condition_sufficient: 'Sufficiente',
  condition_good: 'Buona',
  condition_very_good: 'Molto buona',
  condition_excellent: 'Eccellente',

  // Abilità tecniche
  technical_title: 'Abilità tecniche',
  technical_description:
    'Influenza le prestazioni, specialmente su terreno tecnico',
  technical_none: 'Nessuna abilità montana',
  technical_basic: 'Base',
  technical_intermediate: 'Intermedio (Forze speciali)',
  technical_advanced: 'Avanzato (Specialista montagna)',
  technical_expert: 'Esperto (Guida alpina)',

  // Peso
  weight_title: 'Peso',
  weight_description:
    'Carichi più pesanti riducono significativamente velocità e resistenza',
  weight_light: 'Leggero (<15 kg)',
  weight_medium: 'Medio (15-25 kg)',
  weight_heavy: 'Pesante (25-35 kg)',
  weight_very_heavy: 'Molto pesante (>35 kg)',

  // Terreno
  terrain_title: 'Terreno',
  terrain_description:
    'Un fattore fondamentale che influenza fortemente la velocità di movimento',
  terrain_flat: 'Terreno pianeggiante',
  terrain_hiking_trail: 'Sentiero escursionistico',
  terrain_difficult: 'Terreno difficile',
  terrain_alpine: 'Terreno alpino',
  terrain_technical_alpine: 'Terreno alpino tecnico',

  // Condizioni
  conditions_title: 'Condizioni',
  conditions_description:
    'Influenza la velocità complessiva e il consumo di energia',
  conditions_spring: 'Primavera (Neve vecchia/Neve bagnata/Nevato)',
  conditions_summer: 'Estate',
  conditions_autumn: 'Autunno (Neve fresca)',
  conditions_winter: 'Inverno',

  // Livello di minaccia
  threat_title: 'Livello di minaccia',
  threat_description:
    'Influenza la scelta del percorso e la velocità di movimento',
  threat_none: 'Nessuna minaccia',
  threat_green: 'Verde (Minaccia bassa)',
  threat_yellow: 'Giallo (Minaccia media)',
  threat_red: 'Rosso (Minaccia alta)',

  // Add these new translations
  calculationConstants: 'Costanti di calcolo',
  standardFactors: 'Fattori standard',
  tacticalFactors: 'Fattori tattici',
  baseSpeeds: 'Velocità di base',
  dangerFactors: 'Fattori di pericolo',
  lightFactors: 'Fattori di luce',
  terrainFactors: 'Fattori del terreno',
  physiqueFactors: 'Fattori di condizione fisica',
  experienceFactors: 'Fattori di esperienza',
  conditionFactors: 'Fattori di condizione',
  technicalSkillFactors: 'Fattori di abilità tecnica',
  weightFactors: 'Fattori di peso',
  tacticalTerrainFactors: 'Fattori tattici del terreno',
  conditionTypeFactors: 'Fattori di tipo di condizione',
  threatLevelFactors: 'Fattori di livello di minaccia',
  customConstants: 'Costanti personalizzate',
  uploadConstants: 'Carica costanti',
  resetToDefault: 'Ripristina default',
  invalidFormat: 'Formato file non valido',
  constantsUpdated: 'Costanti aggiornate con successo',
  uploadInstructions:
    'Carica un file JSON con le tue costanti personalizzate. Il file deve contenere tutti i fattori necessari per il calcolo.',
  downloadDefaultConstantsFile: 'Scarica costanti predefinite',
};

export default italianTranslations;
