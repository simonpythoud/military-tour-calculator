import type React from 'react';
import { useState, useEffect } from 'react';
import type { GpxRoute, Terrain } from '../../types';
import type { V2TourInputs, V2CalculationMode } from '../../types/v2';
import { calculateV2 } from '../../utils/v2/calculateTimeV2';
import { calculateSectionTimesV2 } from '../../utils/v2/calculateSectionsV2';
import { calculatePerformanceOverTimeV2 } from '../../utils/v2/fatigueModel';
import { getConstants } from '../../utils/calculateTime';
import {
  FaRuler,
  FaMountain,
  FaWeightHanging,
  FaHiking,
  FaWindowClose,
  FaCog,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import PerformanceGraph from '../PerformanceGraph';
import { saveCalculation, loadCalculation } from '../../utils/storage';
import ExportResults from '../ExportResults';
import TourDisclaimers from '../TourDisclaimers';
import ReliabilityIndicator from '../ReliabilityIndicator';
import TacticalTourFactors from '../TacticalTourFactors';
import { validateConstants } from '../../utils/manageConstants';
import { toast } from 'react-toastify';
import ConstantsToggle from '../ConstantsToggle';
import SettingsModal from '../SettingsModal';
import GpxUpload from '../GpxUpload';
import RouteSections from '../RouteSections';
import RouteMap from '../RouteMap';
import CalculationModeToggle from './CalculationModeToggle';
import FactorContribution from './FactorContribution';

const V2Calculator: React.FC = () => {
  const { t } = useLanguage();
  const [calculationMode, setCalculationMode] = useState<V2CalculationMode>('basic');
  const [inputs, setInputs] = useState<V2TourInputs>({
    horizontalDistance: 0,
    verticalDistance: 0,
    condition: 'GOOD',
    technicalSkill: 'INTERMEDIATE',
    weight: 'LIGHT',
    terrain: 'FLAT',
    conditionType: 'SUMMER',
    threatLevel: 'GREEN',
    elevationGain: 0,
    elevationLoss: 0,
    groupSize: 'SMALL',
    calculationMode: 'basic',
  });
  const [calculationName, setCalculationName] = useState('');
  const [savedCalculations, setSavedCalculations] = useState<string[]>([]);
  const [useCustomFactorConstants, setUseCustomFactorConstants] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [gpxRoute, setGpxRoute] = useState<GpxRoute | null>(null);

  const tacticalConstants = getConstants(useCustomFactorConstants);

  const handleModeChange = (mode: V2CalculationMode) => {
    setCalculationMode(mode);
    setInputs(prev => ({ ...prev, calculationMode: mode }));
  };

  const handleRouteLoaded = (route: GpxRoute) => {
    setGpxRoute(route);
    setInputs(prev => ({
      ...prev,
      horizontalDistance: route.totalDistance,
      verticalDistance: route.totalElevationGain,
      elevationGain: route.totalElevationGain,
      elevationLoss: route.totalElevationLoss,
    }));
  };

  const handleClearRoute = () => {
    setGpxRoute(null);
    setInputs(prev => ({
      ...prev,
      horizontalDistance: 0,
      verticalDistance: 0,
      elevationGain: 0,
      elevationLoss: 0,
    }));
  };

  const handleUpdateSectionTerrain = (sectionId: string, terrain: Terrain) => {
    if (!gpxRoute) return;
    const updatedSections = gpxRoute.sections.map(s =>
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
      setUseCustomFactorConstants(true);
    } else {
      setUseCustomFactorConstants(false);
    }
  }, []);

  const effectiveInputs: V2TourInputs = {
    ...inputs,
    calculationMode,
    elevationGain: inputs.elevationGain || inputs.verticalDistance,
    elevationLoss: inputs.elevationLoss || 0,
  };

  const sectionCalc = gpxRoute
    ? calculateSectionTimesV2(gpxRoute.sections, effectiveInputs, useCustomFactorConstants)
    : null;

  const sectionEffectiveInputs: V2TourInputs = sectionCalc
    ? {
        ...effectiveInputs,
        horizontalDistance: sectionCalc.totalHorizontalDistance,
        verticalDistance: sectionCalc.totalElevationGain,
        elevationGain: sectionCalc.totalElevationGain,
        elevationLoss: sectionCalc.totalElevationLoss,
      }
    : effectiveInputs;

  const result = calculateV2(sectionEffectiveInputs, useCustomFactorConstants);
  const totalHours = sectionCalc ? sectionCalc.totalHours : result.totalHours;
  const effectiveHorizontalHours = sectionCalc ? sectionCalc.totalHorizontalHours : result.horizontalHours;

  const formatTime = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const performanceData = calculatePerformanceOverTimeV2(
    effectiveInputs,
    totalHours,
    result.multiplier
  );

  const handleSave = () => {
    if (calculationName.trim()) {
      saveCalculation(calculationName, inputs);
      setSavedCalculations(prev => [...prev, calculationName]);
      setCalculationName('');
    }
  };

  const handleLoad = (name: string) => {
    const loadedInputs = loadCalculation(name);
    if (loadedInputs) {
      setInputs(prev => ({
        ...prev,
        ...loadedInputs,
      }));
    }
  };

  const handleRemove = (name: string) => {
    const saved = JSON.parse(localStorage.getItem('savedCalculations') || '{}');
    delete saved[name];
    localStorage.setItem('savedCalculations', JSON.stringify(saved));
    setSavedCalculations(Object.keys(saved));
  };

  const handleConstantsUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const constants = JSON.parse(text);
      if (!validateConstants(constants)) {
        toast.error(t('invalidFormat'));
        return;
      }
      localStorage.setItem('customConstants', JSON.stringify(constants));
      toast.success(t('constantsUpdated'));
      window.location.reload();
    } catch (_error) {
      toast.error(t('invalidFormat'));
    }
  };

  const handleResetConstants = () => {
    localStorage.removeItem('customConstants');
    window.location.reload();
  };

  const factorContributions = sectionCalc
    ? sectionCalc.factorContributions
    : result.factorContributions;
  const totalPenaltyPercent = sectionCalc
    ? sectionCalc.totalPenaltyPercent
    : result.totalPenaltyPercent;
  const baseTimeHours = sectionCalc
    ? sectionCalc.baseTimeHours
    : result.baseTimeHours;

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <FaHiking className="text-military-green" />
          {t('title')}
          <span className="text-xs font-normal bg-military-green text-white px-2 py-0.5 rounded-full">V2</span>
        </h1>
        <div className="flex items-center gap-2">
          <CalculationModeToggle mode={calculationMode} onModeChange={handleModeChange} />
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-military-green hover:text-opacity-80"
            title={t('calculationConstants')}
          >
            <FaCog className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className={`p-3 rounded-lg border mb-4 ${
        calculationMode === 'basic'
          ? 'bg-blue-50 border-blue-200'
          : 'bg-amber-50 border-amber-200'
      }`}>
        <p className="text-xs sm:text-sm">
          {calculationMode === 'basic' ? t('v2_model_basic_desc') : t('v2_model_advanced_desc')}
        </p>
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

      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <FaRuler className="text-military-green" />
          {t('distanceMeasurements')}
        </h2>
        <div className={`grid grid-cols-1 ${calculationMode === 'advanced' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'} gap-3 sm:gap-4`}>
          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaRuler className="text-blue-600" />
              {t('horizontalDistance')}
            </label>
            <input
              type="number"
              value={inputs.horizontalDistance ?? ''}
              onChange={e =>
                setInputs({
                  ...inputs,
                  horizontalDistance: Number(e.target.value),
                })
              }
              onFocus={e => e.target.select()}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 border-blue-200"
              placeholder={t('enterDistance')}
            />
          </div>

          {calculationMode === 'basic' && (
            <div>
              <label className="block mb-2 flex items-center gap-1">
                <FaMountain className="text-orange-600" />
                {t('verticalDistance')}
              </label>
              <input
                type="number"
                value={inputs.verticalDistance ?? ''}
                onChange={e =>
                  setInputs({
                    ...inputs,
                    verticalDistance: Number(e.target.value),
                    elevationGain: Number(e.target.value),
                  })
                }
                onFocus={e => e.target.select()}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300 border-orange-200"
                placeholder={t('enterAltitude')}
              />
            </div>
          )}

          {calculationMode === 'advanced' && (
            <>
              <div>
                <label className="block mb-2 flex items-center gap-1">
                  <FaArrowUp className="text-green-600" />
                  {t('v2_elevation_gain')}
                </label>
                <input
                  type="number"
                  value={inputs.elevationGain ?? ''}
                  onChange={e =>
                    setInputs({
                      ...inputs,
                      elevationGain: Number(e.target.value),
                      verticalDistance: Number(e.target.value),
                    })
                  }
                  onFocus={e => e.target.select()}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-300 border-green-200"
                  placeholder={t('v2_enter_gain')}
                />
              </div>
              <div>
                <label className="block mb-2 flex items-center gap-1">
                  <FaArrowDown className="text-red-600" />
                  {t('v2_elevation_loss')}
                </label>
                <input
                  type="number"
                  value={inputs.elevationLoss ?? ''}
                  onChange={e =>
                    setInputs({
                      ...inputs,
                      elevationLoss: Number(e.target.value),
                    })
                  }
                  onFocus={e => e.target.select()}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-300 border-red-200"
                  placeholder={t('v2_enter_loss')}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <div className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <FaWeightHanging className="text-military-green" />
          <div className="flex items-center gap-4 flex-1">
            {t('influencingFactors')}
          </div>
        </div>
        <TacticalTourFactors inputs={inputs} setInputs={(newInputs) => {
          setInputs(prev => ({ ...prev, ...newInputs }));
        }} hasGpxRoute={!!gpxRoute} />

        {calculationMode === 'advanced' && (
          <div className="mt-4 pt-4 border-t">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t('v2_group_size')}
            </label>
            <select
              value={inputs.groupSize}
              onChange={e =>
                setInputs({ ...inputs, groupSize: e.target.value as V2TourInputs['groupSize'] })
              }
              className="w-full sm:w-auto p-2 border rounded"
            >
              <option value="SMALL">{t('v2_group_small')}</option>
              <option value="MEDIUM">{t('v2_group_medium')}</option>
              <option value="LARGE_UNIT">{t('v2_group_large')}</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold">
            {t('results')}
          </h2>
          <div className="pt-2">
            <ConstantsToggle
              useCustomFactorConstants={useCustomFactorConstants}
              setUseCustomFactorConstants={setUseCustomFactorConstants}
            />
          </div>
        </div>

        <div className={`grid ${calculationMode === 'advanced' ? 'grid-cols-2 lg:grid-cols-5' : 'grid-cols-2 lg:grid-cols-4'} gap-2 sm:gap-4 mb-4 sm:mb-6`}>
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
          {calculationMode === 'advanced' ? (
            <>
              <div className="p-2 sm:p-3 bg-green-50 rounded-lg">
                <div className="text-xs sm:text-sm text-gray-600">
                  {t('v2_ascent_time')}
                </div>
                <div className="text-lg sm:text-xl font-bold text-green-700">
                  {formatTime(result.ascentHours)}
                </div>
              </div>
              <div className="p-2 sm:p-3 bg-red-50 rounded-lg">
                <div className="text-xs sm:text-sm text-gray-600">
                  {t('v2_descent_time')}
                </div>
                <div className="text-lg sm:text-xl font-bold text-red-700">
                  {formatTime(result.descentHours)}
                </div>
              </div>
            </>
          ) : (
            <div className="p-2 sm:p-3 bg-orange-50 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600">
                {t('verticalTime')}
              </div>
              <div className="text-lg sm:text-xl font-bold text-orange-700">
                {formatTime(result.verticalHours)}
              </div>
            </div>
          )}
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-600">
              {t('speedAdaptedToFactorPercentage')}
            </div>
            <div className="text-lg sm:text-xl font-bold">
              {Math.round(result.multiplier * 100)}%
            </div>
          </div>
        </div>

        <div className="mb-4 border-b pb-4">
          <ReliabilityIndicator reliability={result.reliabilityFactor} />
        </div>

        {factorContributions.length > 0 && (
          <div className="mb-4 border-b pb-4">
            <h3 className="text-sm sm:text-base font-bold mb-3">
              {t('v2_factor_breakdown')}
            </h3>
            <FactorContribution
              contributions={factorContributions}
              totalPenaltyPercent={totalPenaltyPercent}
              baseTimeHours={baseTimeHours}
              totalHours={totalHours}
            />
          </div>
        )}

        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-sm sm:text-base font-bold mb-2">
            {t('calculationMethod')}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
            <li>
              {t('v2_model_label')}: {calculationMode === 'basic' ? t('v2_mode_basic') : t('v2_mode_advanced')}
            </li>
            <li>{t('baseHorizontalSpeed')}: {tacticalConstants.BASE_SPEEDS.HORIZONTAL} km/h</li>
            <li>{t('baseVerticalSpeed')}: {tacticalConstants.BASE_SPEEDS.VERTICAL} m/h</li>
            <li>
              {t('currentMultiplier')}: {result.multiplier.toFixed(2)}
            </li>
            {calculationMode === 'advanced' && (
              <>
                <li>{t('v2_slope_aware')}</li>
                <li>{t('v2_fatigue_applied')}</li>
              </>
            )}
          </ul>
        </div>

        <TourDisclaimers totalHours={totalHours} />
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

      {sectionCalc && calculationMode === 'advanced' && (
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow mt-4">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            {t('v2_section_analysis')}
          </h2>
          <div className="space-y-2">
            {sectionCalc.sectionResults.map(sr => (
              <div key={sr.sectionId} className="flex items-center gap-2 text-sm">
                <span className="flex-1 truncate">{sr.sectionName}</span>
                <span className="text-xs text-gray-500">
                  {formatTime(sr.totalHours)}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      sr.delayContributionPercent > 30
                        ? 'bg-red-500'
                        : sr.delayContributionPercent > 15
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(100, sr.delayContributionPercent)}%` }}
                  />
                </div>
                <span className="text-xs w-12 text-right">
                  {sr.delayContributionPercent}%
                </span>
                {sr.cumulativeFatiguePercent > 0 && (
                  <span className="text-xs text-orange-600">
                    ({t('v2_fatigue_short')}: {sr.cumulativeFatiguePercent}%)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">{t('savedCalculations')}</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={calculationName}
            onChange={e => setCalculationName(e.target.value)}
            placeholder={t('enterCalculationName')}
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
            {savedCalculations.map(name => (
              <div key={name} className="relative">
                <button
                  onClick={() => handleLoad(name)}
                  className="px-3 py-1 pr-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                  {name}
                </button>
                <button
                  onClick={() => handleRemove(name)}
                  className="absolute top-0 right-0 h-full px-2 text-gray-600"
                >
                  <FaWindowClose />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">{t('exportResults')}</h2>
        <ExportResults
          results={{
            inputs,
            calculations: {
              total: formatTime(totalHours),
              horizontal: formatTime(effectiveHorizontalHours),
              vertical: formatTime(result.verticalHours),
              multiplier: result.multiplier,
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

export default V2Calculator;
