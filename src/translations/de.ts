const germanTranslations = {
  title: 'Militärischer Marschzeitrechner',
  distanceMeasurements: 'Distanzmessungen',
  horizontalDistance: 'Horizontale Distanz (km)',
  verticalDistance: 'Vertikale Distanz (m)',
  enterDistance: 'Distanz eingeben',
  enterAltitude: 'Höhe eingeben',
  influencingFactors: 'Einflussfaktoren',
  packageWeight: 'Packungsgewicht',
  dangerLevel: 'Gefahrenstufe',
  lightConditions: 'Lichtverhältnisse',
  terrainType: 'Geländetyp',
  physicalCondition: 'Körperliche Verfassung',
  experienceLevel: 'Erfahrungsstufe',
  results: 'Ergebnisse',
  totalTime: 'Gesamtzeit',
  horizontalTime: 'Horizontale Zeit',
  verticalTime: 'Vertikale Zeit',
  speedMultiplier: 'Geschwindigkeitsmultiplikator',
  speedAdaptedToFactorPercentage: 'Geschwindigkeit angepasst an Faktoren',
  calculationMethod: 'Berechnungsmethode',
  baseHorizontalSpeed: 'Basis-Horizontalgeschwindigkeit',
  baseVerticalSpeed: 'Basis-Vertikalgeschwindigkeit',
  packageWeightEffect: 'Packungsgewicht',
  currentMultiplier: 'Aktueller Multiplikator',
  horizontalCalculation: 'Horizontale Berechnung',
  verticalCalculation: 'Vertikale Berechnung',

  // Factors
  useCustomFactorConstants:
    'Benutzerdefinierte Konstanten für Faktoren verwenden',
  useDefaultFactorConstants: 'Standardkonstanten für Faktoren verwenden',

  low: 'Niedrig',
  medium: 'Mittel',
  high: 'Hoch',
  extreme: 'Extrem',

  day: 'Tag',
  night: 'Nacht',
  mixed: 'Gemischt',

  easy: 'Einfach',
  alpine_medium: 'Alpin Mittel',
  alpine_hard: 'Alpin Schwer',
  alpine_extreme: 'Alpin Extrem',

  very_fit: 'Sehr fit',
  fit: 'Fit',
  poor: 'Schwach',
  injured: 'Verletzt',

  expert: 'Experte',
  advanced: 'Fortgeschritten',
  basic: 'Grundlegend',
  none: 'Keine',

  // Performance calculation
  performanceEvolution: 'Leistungsentwicklung',
  performanceDescription: 'Geschätzte Leistungsentwicklung über die Zeit',
  hours: 'Stunden',
  performancePercentage: 'Leistung (%)',
  performanceWarning:
    'Hinweis: Dies ist eine Schätzung und kann aufgrund individueller Faktoren variieren',

  // Export
  exportPDF: 'Export PDF',
  exportCSV: 'Export CSV',
  exportResults: 'Ergebnisse exportieren',

  // Saved calculations
  savedCalculations: 'Gespeicherte Berechnungen',
  enterCalculationName: 'Berechnungsnamen eingeben',
  save: 'Speichern',
  removeCalculation: 'Berechnung entfernen',

  // Disclaimer translations
  longTourWarning: 'Erweiterte Tourdauerwarnung',
  longTourExplanation:
    'Diese Tour überschreitet 18 Stunden. Für Touren dieser Länge können tatsächliche Abschlusszeiten erheblich von den Schätzungen abweichen, aufgrund kumulativer Ermüdung, psychologischer Faktoren und erhöhtem Exposition gegenüber Umweltbedingungen. Betrachten Sie die Teilung in mehrere Tage.',
  dangerLevelWarning:
    'Diese Tour beinhaltet hohe Gefahrenbedingungen. Stellen Sie sicher, dass Sie sich richtig vorbereitet haben, dass Sie die richtige Ausrüstung tragen und dass Sie eine angemessene Gefahrenbeurteilung durchführen.',
  generalDisclaimer:
    'Alle Berechnungen basieren auf Standardbedingungen. Tatsächliche Zeiten können variieren, abhängig von individueller Fitness, Wetterbedingungen, Gruppengröße und anderen Faktoren, die in dieser grundlegenden Berechnung nicht berücksichtigt wurden. Planen Sie immer mit ausreichenden Sicherheitsmargen und beraten Sie sich mit erfahrenen Führern für schwierige Touren.',
  fatigueNote:
    'Ermüdung steigt exponentiell mit der Zeit an und kann die Leistung erheblich beeinflussen, insbesondere nach 8 Stunden kontinuierlicher Aktivität.',
  safetyNote:
    'Dieses Tool ist nur für Planungszwecke vorgesehen. Entscheidungen sollten immer auf der Grundlage der aktuellen Bedingungen, der Gruppenfähigkeiten und einer sorgfältigen Urteilsbildung basieren.',
  recommendedBreakNote:
    'Regelmäßige Pausen sind essentiell für die Leistungsfähigkeit. Für Touren über 8 Stunden sollten Sie angemessene Pausen und Mahlzeiten in Ihre Planung einbeziehen.',

  // Estimate reliability
  estimateReliability: 'Berechnungsfiabilität schätzen',
  reliability_high: 'Hoch',
  reliability_medium: 'Mittel',
  reliability_low: 'Niedrig',

  // Tooltips
  tooltip_packageWeight:
    'Gewicht der getragenen Ausrüstung. Alle 5kg reduzieren die Geschwindigkeit um 2%. Ein schwereres Paket wird Ihren Fortschritt deutlich beeinflussen.',
  tooltip_dangerLevel:
    'Umweltgefahren und Risiken. Höhere Gefahrenstufen erfordern mehr Vorsicht und langsameres Vorankommen. Extreme Bedingungen können die Geschwindigkeit halbieren.',
  tooltip_lightConditions:
    'Sichtbedingungen. Nachtreisen reduziert die Geschwindigkeit um 40%. Gemischte Bedingungen (Dämmerung) reduzieren die Geschwindigkeit um 20%.',
  tooltip_terrainType:
    'Schwierigkeit des Geländes. Einfaches Gelände ermöglicht normale Geschwindigkeit, während extreme alpine Bedingungen die Geschwindigkeit um bis zu 60% reduzieren können.',
  tooltip_physicalCondition:
    'Aktuelle Fitness. Sehr fitte Personen können sich 20% schneller bewegen, während schlechte Kondition die Geschwindigkeit deutlich reduziert.',
  tooltip_experienceLevel:
    'Technische Expertise. Experten können sich 20% schneller bewegen durch effiziente Bewegung und bessere Routenfindung. Keine Erfahrung reduziert die Geschwindigkeit um 40%.',

  // Physical Condition
  condition_title: 'Kondition',
  condition_description:
    'Eine bessere Kondition ermöglicht eine höhere Leistung auf allen Geländetypen',
  condition_poor: 'Schlecht',
  condition_sufficient: 'Ausreichend',
  condition_good: 'Gut',
  condition_very_good: 'Sehr gut',
  condition_excellent: 'Ausgezeichnet',

  // Technical Skills
  technical_title: 'Technisches Können',
  technical_description:
    'Beeinflusst die Leistung, insbesondere in technischem Gelände',
  technical_none: 'Keine Gebirge Fähigkeit',
  technical_basic: 'Grundlagen',
  technical_intermediate: 'Mittelstuffe (Spezial Kräfte)',
  technical_advanced: 'Fortgeschritten (Geb Spez)',
  technical_expert: 'Expert (Bergführer)',

  // Weight
  weight_title: 'Gewicht',
  weight_description:
    'Schwerere Lasten verringern Geschwindigkeit und Ausdauer erheblich',
  weight_light: 'Leicht (<15 kg)',
  weight_medium: 'Mittel (15-25 kg)',
  weight_heavy: 'Schwer (25-35 kg)',
  weight_very_heavy: 'Sehr schwer (>35 kg)',

  // Terrain
  terrain_title: 'Gelände',
  terrain_description:
    'Ein grundlegender Faktor, der die Bewegungsgeschwindigkeit stark beeinflusst',
  terrain_flat: 'Flaches Gelände',
  terrain_hiking_trail: 'Wanderweg',
  terrain_difficult: 'Schwieriges Gelände',
  terrain_alpine: 'Alpines Gelände',
  terrain_technical_alpine: 'Technisches Alpingelände',

  // Conditions
  conditions_title: 'Verhältnisse',
  conditions_description:
    'Beeinflusst die Geschwindigkeit und den Energieverbrauch insgesamt',
  conditions_spring: 'Frühling (Altschnee/Nassschnee/Firn)',
  conditions_summer: 'Sommer',
  conditions_autumn: 'Herbst (Neuschnee)',
  conditions_winter: 'Winter',

  // Threat Level
  threat_title: 'Bedrohungsstufe',
  threat_description:
    'Beeinflusst die Routenwahl und die Bewegungsgeschwindigkeit',
  threat_none: 'Keine Bedrohung',
  threat_green: 'Grün (Niedrige Bedrohung)',
  threat_yellow: 'Gelb (Mittlere Bedrohung)',
  threat_red: 'Rot (Hohe Bedrohung)',

  // Add these new translations
  calculationConstants: 'Berechnungskonstanten',
  standardFactors: 'Standardfaktoren',
  tacticalFactors: 'Taktische Faktoren',
  baseSpeeds: 'Grundgeschwindigkeiten',
  dangerFactors: 'Gefahrenfaktoren',
  lightFactors: 'Lichtfaktoren',
  terrain_factors: 'Geländefaktoren',
  physiqueFactors: 'Körperliche Konditionsfaktoren',
  experienceFactors: 'Erfahrungsfaktoren',
  condition_factors: 'Konditionsfaktoren',
  technical_factors: 'Technische Fähigkeitsfaktoren',
  weight_factors: 'Gewichtsfaktoren',
  conditions_factors: 'Bedingungstypfaktoren',
  threat_factors: 'Bedrohungsstufenfaktoren',
  customConstants: 'Benutzerdefinierte Konstanten',
  uploadConstants: 'Konstanten hochladen',
  resetToDefault: 'Zurücksetzen',
  invalidFormat: 'Ungültiges Dateiformat',
  constantsUpdated: 'Konstanten erfolgreich aktualisiert',
  uploadInstructions:
    'Laden Sie eine JSON-Datei mit Ihren benutzerdefinierten Konstanten hoch. Die Datei muss alle für die Berechnung erforderlichen Faktoren enthalten.',
  downloadDefaultConstantsFile: 'Standardkonstanten herunterladen',

  // GPX Import
  gpxImport: 'Routenimport',
  gpxImportDescription:
    'Laden Sie eine Navigationsdatei (.gpx, .kml, .tcx) hoch, um Distanzen und Höhenmeter automatisch aus Ihrer Route zu berechnen.',
  gpxUploadFile: 'Routendatei hochladen',
  gpxClearRoute: 'Route löschen',
  gpxSupportedFormats: 'Unterstützte Formate',
  gpxImportSuccess: 'Route erfolgreich importiert',
  gpxImportError:
    'Route konnte nicht importiert werden. Bitte überprüfen Sie das Dateiformat.',
  gpxFileTooBig: 'Datei ist zu groß. Maximale Größe ist 10MB.',
  invalidFileExtension: 'Ungültige Dateiendung. Unterstützte Formate: .gpx, .kml, .tcx',
  gpxRouteSections: 'Routenabschnitte',
  gpxSectionsDescription:
    'Jeder Abschnitt hat eine automatisch erkannte Geländeschwierigkeit basierend auf dem Höhengradient. Sie können den Geländetyp pro Abschnitt anpassen.',
  gpxRouteMap: 'Routenkarte',
  gpxTotalDistance: 'Gesamtdistanz',
  terrainDisabledByRoute:
    'Gelände wird pro Abschnitt in den Routenabschnitten oben festgelegt.',

  // V2
  v2_beta_tag: '(Beta)',
  v2_mode_basic: 'Basis (FM-Stil)',
  v2_mode_advanced: 'Erweitertes Gelände',
  v2_model_basic_desc:
    'Einfache militärische Schätzung: 4 km/h horizontal, 400 m/h vertikal mit einfachen multiplikativen Faktoren.',
  v2_model_advanced_desc:
    'Erweiterte Geländeschätzung: neigungsabhängige Geschwindigkeit, Auf-/Abstiegsunterscheidung, Gruppenermüdung und nichtlineare Lasteffekte.',
  v2_elevation_gain: 'Höhengewinn (m)',
  v2_elevation_loss: 'Höhenverlust (m)',
  v2_enter_gain: 'Höhengewinn eingeben',
  v2_enter_loss: 'Höhenverlust eingeben',
  v2_group_size: 'Gruppengrösse',
  v2_group_small: 'Klein (2-5)',
  v2_group_medium: 'Mittel (6-12)',
  v2_group_large: 'Grosser Verband (13+)',
  v2_ascent_time: 'Aufstiegszeit',
  v2_descent_time: 'Abstiegszeit',
  v2_factor_breakdown: 'Faktorenaufschlüsselung',
  v2_base_time: 'Basiszeit',
  v2_penalty_summary:
    'Gesamtzeit angepasst durch Gelände, Last und Bedingungen',
  v2_factor_condition: 'Kondition',
  v2_factor_skill: 'Technisches Können',
  v2_factor_load: 'Ausrüstungslast',
  v2_factor_terrain: 'Geländeschwierigkeit',
  v2_factor_season: 'Saison / Verhältnisse',
  v2_factor_threat: 'Bedrohungsstufe',
  v2_factor_fatigue: 'Gruppenermüdung',
  v2_factor_slope: 'Steiler Abstieg',
  v2_model_label: 'Modell',
  v2_slope_aware: 'Neigungsabhängige Geschwindigkeitsanpassungen angewendet',
  v2_fatigue_applied: 'Progressive Gruppenermüdung angewendet',
  v2_section_analysis: 'Abschnittsanalyse',
  v2_fatigue_short: 'Ermüdung',
  v2_model_basic: 'Einfache militärische Schätzung (FM-Stil)',
  v2_model_advanced: 'Erweiterte Geländeschätzung',
};

export default germanTranslations;
