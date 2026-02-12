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
  useCustomFactorConstants: 'Usare costanti personalizzate per i fattori',
  useDefaultFactorConstants: 'Usare costanti standard per i fattori',

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
  removeCalculation: 'Rimuovi calcolo',

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
  terrain_factors: 'Fattori del terreno',
  physiqueFactors: 'Fattori di condizione fisica',
  experienceFactors: 'Fattori di esperienza',
  condition_factors: 'Fattori di condizione',
  technical_factors: 'Fattori di abilità tecnica',
  weight_factors: 'Fattori di peso',
  conditions_factors: 'Fattori di tipo di condizione',
  threat_factors: 'Fattori di livello di minaccia',
  customConstants: 'Costanti personalizzate',
  uploadConstants: 'Carica costanti',
  resetToDefault: 'Ripristina default',
  invalidFormat: 'Formato file non valido',
  constantsUpdated: 'Costanti aggiornate con successo',
  uploadInstructions:
    'Carica un file JSON con le tue costanti personalizzate. Il file deve contenere tutti i fattori necessari per il calcolo.',
  downloadDefaultConstantsFile: 'Scarica costanti predefinite',

  // GPX Import
  gpxImport: 'Importazione percorso',
  gpxImportDescription:
    'Carica un file di navigazione (.gpx, .kml, .tcx) per calcolare automaticamente distanze e dislivello dal tuo percorso.',
  gpxUploadFile: 'Carica file percorso',
  gpxClearRoute: 'Elimina percorso',
  gpxSupportedFormats: 'Formati supportati',
  gpxImportSuccess: 'Percorso importato con successo',
  gpxImportError:
    'Importazione del file di percorso fallita. Controlla il formato del file.',
  gpxFileTooBig: 'Il file è troppo grande. La dimensione massima è 10MB.',
  invalidFileExtension:
    'Estensione file non valida. Formati supportati: .gpx, .kml, .tcx',
  gpxRouteSections: 'Sezioni del percorso',
  gpxSectionsDescription:
    'Ogni sezione ha una difficoltà del terreno rilevata automaticamente in base al gradiente di altitudine. Puoi modificare il tipo di terreno per ogni sezione.',
  gpxRouteMap: 'Mappa del percorso',
  gpxTotalDistance: 'Distanza totale',
  terrainDisabledByRoute:
    'Il terreno è impostato per sezione nelle Sezioni del percorso sopra.',

  // V2
  v2_beta_tag: '(Beta)',
  v2_mode_basic: 'Base (stile FM)',
  v2_mode_advanced: 'Terreno avanzato',
  v2_model_basic_desc:
    'Stima militare di base: 4 km/h orizzontale, 400 m/h verticale con fattori moltiplicativi semplici.',
  v2_model_advanced_desc:
    'Stima terreno avanzata: velocità in base alla pendenza, distinzione salita/discesa, fatica di gruppo ed effetti di carico non lineari.',
  v2_elevation_gain: 'Dislivello positivo (m)',
  v2_elevation_loss: 'Dislivello negativo (m)',
  v2_enter_gain: 'Inserire dislivello positivo',
  v2_enter_loss: 'Inserire dislivello negativo',
  v2_group_size: 'Dimensione del gruppo',
  v2_group_small: 'Piccolo (2-5)',
  v2_group_medium: 'Medio (6-12)',
  v2_group_large: 'Grande unità (13+)',
  v2_ascent_time: 'Tempo di salita',
  v2_descent_time: 'Tempo di discesa',
  v2_factor_breakdown: 'Scomposizione dei fattori',
  v2_base_time: 'Tempo base',
  v2_penalty_summary: 'Tempo totale adattato per terreno, carico e condizioni',
  v2_factor_condition: 'Condizione fisica',
  v2_factor_skill: 'Abilità tecniche',
  v2_factor_load: 'Carico equipaggiamento',
  v2_factor_terrain: 'Difficoltà del terreno',
  v2_factor_season: 'Stagione / Condizioni',
  v2_factor_threat: 'Livello di minaccia',
  v2_factor_fatigue: 'Fatica di gruppo',
  v2_factor_slope: 'Discesa ripida',
  v2_model_label: 'Modello',
  v2_slope_aware: 'Adeguamenti di velocità in base alla pendenza applicati',
  v2_fatigue_applied: 'Fatica progressiva di gruppo applicata',
  v2_section_analysis: 'Analisi delle sezioni',
  v2_fatigue_short: 'fatica',
  v2_model_basic: 'Stima militare di base (stile FM)',
  v2_model_advanced: 'Stima terreno avanzata',
};

export default italianTranslations;
