import type React from 'react';
import { useState, useEffect, useId, useMemo } from 'react';
import type { TourInputs, GpxRoute, Terrain } from '../types';
import { calculateTourTime, getConstants } from '../utils/calculateTime';
import { calculateSectionTimes } from '../utils/calculateSections';
import {
  FaRuler,
  FaMountain,
  FaWeightHanging,
  FaHiking,
  FaWindowClose,
  FaCog,
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { calculatePerformanceOverTime } from '../utils/calculatePerformance';
import PerformanceGraph from './PerformanceGraph';
import { saveCalculation, loadCalculation } from '../utils/storage';
import ExportResults from './ExportResults';
import TourDisclaimers from './TourDisclaimers';
import ReliabilityIndicator from './ReliabilityIndicator';
import TacticalTourFactors from './TacticalTourFactors';
import { validateConstants } from '../utils/manageConstants';
import { toast } from 'react-toastify';
import { MAX_HORIZONTAL_DISTANCE, MAX_VERTICAL_DISTANCE } from '../constants/limits';
import ConstantsToggle from './ConstantsToggle';
import SettingsModal from './SettingsModal';
import GpxUpload from './GpxUpload';
import RouteSections from './RouteSections';
import RouteMap from './RouteMap';

const TourCalculator: React.FC = () => {
  const { t } = useLanguage();
  const horizontalId = useId();
  const verticalId = useId();

  const [inputs, setInputs] = useState<TourInputs>({
    horizontalDistance: 0,
    verticalDistance: 0,
    condition: 'GOOD',
    technicalSkill: 'INTERMEDIATE',
    weight: 'LIGHT',
    terrain: 'FLAT',
    conditionType: 'SUMMER',
    threatLevel: 'GREEN',
  });
  const [calculationName, setCalculationName] = useState('');
  const [savedCalculations, setSavedCalculations] = useState<string[]>([]);
  const [useCustomFactorConstants, setUseCustomFactorConstants] =
    useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [gpxRoute, setGpxRoute] = useState<GpxRoute | null>(null);

  const tacticalConstants = useMemo(
    () => getConstants(useCustomFactorConstants),
    [useCustomFactorConstants]
  );

  const handleRouteLoaded = (route: GpxRoute) => {
    setGpxRoute(route);
    setInputs((prev) => ({
      ...prev,
      horizontalDistance: route.totalDistance,
      verticalDistance: route.totalElevationGain,
    }));
  };

  const handleClearRoute = () => {
    setGpxRoute(null);
    setInputs((prev) => ({
      ...prev,
      horizontalDistance: 0,
      verticalDistance: 0,
    }));
  };

  const handleUpdateSectionTerrain = (sectionId: string, terrain: Terrain) => {
    if (!gpxRoute) return;
    const updatedSections = gpxRoute.sections.map((s) =>
      s.id === sectionId ? { ...s, terrain } : s
    );
    setGpxRoute({ ...gpxRoute, sections: updatedSections });
  };

  useEffect(() => {
    const saved = localStorage.getItem('savedCalculations') || '{}';
    const calculations = JSON.parse(saved);
    setSavedCalculations(Object.keys(calculations));
  }, []);

  useEffect(() => {
    const customConstants = localStorage.getItem('customConstants');
    if (customConstants) {
      console.log(
        'Currently loaded custom constants:',
        JSON.parse(customConstants)
      );
      setUseCustomFactorConstants(true);
    } else {
      console.log('No custom constants found in localStorage');
      setUseCustomFactorConstants(false);
    }
  }, []);

  const sectionCalc = gpxRoute
    ? calculateSectionTimes(gpxRoute.sections, inputs, tacticalConstants)
    : null;

  const effectiveInputs: TourInputs = sectionCalc
    ? {
        ...inputs,
        horizontalDistance: sectionCalc.totalHorizontalDistance,
        verticalDistance: sectionCalc.totalVerticalDistance,
      }
    : inputs;

  const {
    totalHours: directTotalHours,
    horizontalHours,
    verticalHours,
    multiplier,
    reliabilityFactor,
  } = calculateTourTime(effectiveInputs, tacticalConstants);

  const totalHours = sectionCalc ? sectionCalc.totalHours : directTotalHours;
  const effectiveHorizontalHours = sectionCalc
    ? sectionCalc.totalHorizontalHours
    : horizontalHours;
  const effectiveVerticalHours = sectionCalc
    ? sectionCalc.totalVerticalHours
    : verticalHours;

  const formatTime = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const performanceData = calculatePerformanceOverTime(
    inputs,
    totalHours,
    tacticalConstants
  );

  const handleSave = () => {
    if (calculationName.trim()) {
      saveCalculation(calculationName, inputs);
      setSavedCalculations((prev) => [...prev, calculationName]);
      setCalculationName('');
    }
  };

  const handleLoad = (name: string) => {
    const loadedInputs = loadCalculation(name);
    if (loadedInputs) {
      setInputs(loadedInputs);
    }
  };

  const handleRemove = (name: string) => {
    const saved = JSON.parse(localStorage.getItem('savedCalculations') || '{}');
    delete saved[name];
    localStorage.setItem('savedCalculations', JSON.stringify(saved));
    setSavedCalculations(Object.keys(saved));
  };

  // const handleDownloadDefaultConstants = () => {
  //   const link = document.createElement('a');
  //   link.href = '/tour-calculator-constants-default.json';
  //   link.download = 'tour-calculator-constants-default.json';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleConstantsUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const constants = JSON.parse(text);

      console.log('Uploaded constants:', constants);
      console.log('Constants structure:', JSON.stringify(constants, null, 2)); // Pretty print

      // Validate the constants structure
      if (!validateConstants(constants)) {
        console.log('Constants validation failed');
        toast.error(t('invalidFormat'));
        return;
      }

      // Save to localStorage
      localStorage.setItem('customConstants', JSON.stringify(constants));
      console.log('Constants saved to localStorage');
      const savedConstants = localStorage.getItem('customConstants');
      console.log(
        'Verified saved constants:',
        JSON.parse(savedConstants || '{}')
      );

      toast.success(t('constantsUpdated'));

      // Reload the page to apply new constants
      window.location.reload();
    } catch (error) {
      console.error('Error processing constants:', error);
      toast.error(t('invalidFormat'));
    }
  };

  const handleResetConstants = () => {
    localStorage.removeItem('customConstants');
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <FaHiking className="text-military-green" />
          {t('title')}
        </h1>
        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 text-military-green hover:text-opacity-80"
          title={t('calculationConstants')}
          aria-label={t('calculationConstants')}
        >
          <FaCog className="w-6 h-6" />
        </button>
      </div>

      <GpxUpload
        onRouteLoaded={handleRouteLoaded}
        hasRoute={!!gpxRoute}
        onClearRoute={handleClearRoute}
      />

      {gpxRoute && (
        <>
          <RouteMap sections={gpxRoute.sections} />
          <RouteSections
            sections={gpxRoute.sections}
            onUpdateSectionTerrain={handleUpdateSectionTerrain}
          />
        </>
      )}

      {/* Distance Inputs Section */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <FaRuler className="text-military-green" />
          {t('distanceMeasurements')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label
              htmlFor={horizontalId}
              className="block mb-2 flex items-center gap-1"
            >
              <FaRuler className="text-blue-600" />
              {t('horizontalDistance')}
            </label>
            <input
              id={horizontalId}
              type="number"
              value={inputs.horizontalDistance ?? ''}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  // Limit horizontal distance to prevent DoS
                  horizontalDistance: Math.min(
                    Math.max(0, Number(e.target.value)),
                    MAX_HORIZONTAL_DISTANCE
                  ),
                })
              }
              onFocus={(e) => e.target.select()}
              max={MAX_HORIZONTAL_DISTANCE}
              min={0}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 border-blue-200"
              placeholder={t('enterDistance')}
            />
          </div>

          <div>
            <label
              htmlFor={verticalId}
              className="block mb-2 flex items-center gap-1"
            >
              <FaMountain className="text-orange-600" />
              {t('verticalDistance')}
            </label>
            <input
              id={verticalId}
              type="number"
              value={inputs.verticalDistance ?? ''}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  // Limit vertical distance to prevent DoS
                  verticalDistance: Math.min(
                    Math.max(0, Number(e.target.value)),
                    MAX_VERTICAL_DISTANCE
                  ),
                })
              }
              onFocus={(e) => e.target.select()}
              max={MAX_VERTICAL_DISTANCE}
              min={0}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300 border-orange-200"
              placeholder={t('enterAltitude')}
            />
          </div>
        </div>
      </div>

      {/* Factors Section - Changed from details to div since it should always be visible */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <div className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <FaWeightHanging className="text-military-green" />
          <div className="flex items-center gap-4 flex-1">
            {t('influencingFactors')}
          </div>
        </div>
        <TacticalTourFactors
          inputs={inputs}
          setInputs={setInputs}
          hasGpxRoute={!!gpxRoute}
        />
      </div>

      {/* Results Section */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold">{t('results')}</h2>
          <div className="pt-2">
            <ConstantsToggle
              useCustomFactorConstants={useCustomFactorConstants}
              setUseCustomFactorConstants={setUseCustomFactorConstants}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-600">
              {t('totalTime')}
            </div>
            <div className="text-lg sm:text-xl font-bold">
              {formatTime(totalHours)}
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-600">
              {t('horizontalTime')}
            </div>
            <div className="text-lg sm:text-xl font-bold text-blue-700">
              {formatTime(effectiveHorizontalHours)}
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-orange-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-600">
              {t('verticalTime')}
            </div>
            <div className="text-lg sm:text-xl font-bold text-orange-700">
              {formatTime(effectiveVerticalHours)}
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
            {/* <div className="text-xs sm:text-sm text-gray-600">{t('speedMultiplier')}</div> */}
            <div className="text-xs sm:text-sm text-gray-600">
              {t('speedAdaptedToFactorPercentage')}
            </div>
            {/* <div className="text-lg sm:text-xl font-bold">{result.multiplier.toFixed(2)}x</div> */}
            <div className="text-lg sm:text-xl font-bold">
              {Math.round(multiplier * 100)}%
            </div>
          </div>
        </div>

        <div className="mb-4 border-b pb-4">
          <ReliabilityIndicator reliability={reliabilityFactor} />
        </div>

        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-sm sm:text-base font-bold mb-2">
            {t('calculationMethod')}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
            <li>
              {t('baseHorizontalSpeed')}:{' '}
              {tacticalConstants.BASE_SPEEDS.HORIZONTAL} km/h
            </li>
            <li>
              {t('baseVerticalSpeed')}: {tacticalConstants.BASE_SPEEDS.VERTICAL}{' '}
              m/h
            </li>
            <li>
              {t('currentMultiplier')}: {multiplier.toFixed(2)}
            </li>
            <li>
              {t('horizontalCalculation')}: {inputs.horizontalDistance}km ÷ (
              {tacticalConstants.BASE_SPEEDS.HORIZONTAL} ×{' '}
              {multiplier.toFixed(2)})
            </li>
            <li>
              {t('verticalCalculation')}: {inputs.verticalDistance}m ÷ (
              {tacticalConstants.BASE_SPEEDS.VERTICAL} × {multiplier.toFixed(2)}
              )
            </li>
          </ul>
        </div>

        <TourDisclaimers
          totalHours={totalHours}
          // dangerLevel={inputs.dangerLevel}
          // terrain={inputs.terrain}
        />
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mt-4">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          {t('performanceEvolution')}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {t('performanceDescription')}
        </p>
        <PerformanceGraph data={performanceData} />
        <p className="text-xs text-gray-500 mt-2 italic">
          {t('performanceWarning')}
        </p>
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">{t('savedCalculations')}</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={calculationName}
            onChange={(e) => setCalculationName(e.target.value)}
            placeholder={t('enterCalculationName')}
            aria-label={t('enterCalculationName')}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-military-green text-white rounded hover:bg-opacity-90"
          >
            {t('save')}
          </button>
        </div>

        {savedCalculations.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {savedCalculations.map((name) => (
              <div key={name} className="relative">
                <button
                  onClick={() => handleLoad(name)}
                  className="px-3 py-1 pr-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                  {name}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(name)}
                  className="absolute top-0 right-0 h-full px-2 text-gray-600 hover:text-red-600 focus:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                  aria-label={`${t('removeCalculation')} ${name}`}
                  title={`${t('removeCalculation')} ${name}`}
                >
                  <FaWindowClose />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export Section */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">{t('exportResults')}</h2>
        <ExportResults
          results={{
            inputs,
            calculations: {
              total: formatTime(totalHours),
              horizontal: formatTime(effectiveHorizontalHours),
              vertical: formatTime(effectiveVerticalHours),
              multiplier: multiplier,
            },
            performance: performanceData,
          }}
        />
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        useCustomFactorConstants={useCustomFactorConstants}
        setUseCustomFactorConstants={setUseCustomFactorConstants}
        tacticalConstants={tacticalConstants}
        handleConstantsUpload={handleConstantsUpload}
        handleResetConstants={handleResetConstants}
      />
    </div>
  );
};

export default TourCalculator;
