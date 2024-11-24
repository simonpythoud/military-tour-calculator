import React, { useState, useEffect } from 'react';
import { TourInputs } from '../types';
import { calculateTourTime } from '../utils/calculateTime';
import {
  FaRuler,
  FaMountain,
  FaWeightHanging,
  FaHiking,
  FaChevronDown,
  FaWindowClose,
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
import TacticalFactorsDisplay from './TacticalFactorsDisplay';

const TourCalculator: React.FC = () => {
  const { t } = useLanguage();
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
  // const [useCustomFactorConstants, setUseCustomFactorConstants] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('savedCalculations') || '{}';
    const calculations = JSON.parse(saved);
    setSavedCalculations(Object.keys(calculations));
  }, []);

  const {
    totalHours,
    horizontalHours,
    verticalHours,
    multiplier,
    reliabilityFactor,
  } = calculateTourTime(inputs, false); //, useCustomFactorConstants);

  const formatTime = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const performanceData = calculatePerformanceOverTime(
    inputs,
    totalHours,
    false //, useCustomFactorConstants
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

  const handleDownloadDefaultConstants = () => {
    const link = document.createElement('a');
    link.href = '/tour-calculator-constants-default.json';
    link.download = 'tour-calculator-constants-default.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConstantsUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const constants = JSON.parse(text);

      // Validate the constants structure
      if (!validateConstants(constants)) {
        toast.error(t('invalidFormat'));
        return;
      }

      // Save to localStorage
      localStorage.setItem('customConstants', JSON.stringify(constants));
      toast.success(t('constantsUpdated'));

      // Reload the page to apply new constants
      window.location.reload();
    } catch (error) {
      toast.error(t('invalidFormat'));
    }
  };

  const handleResetConstants = () => {
    localStorage.removeItem('customConstants');
    window.location.reload(); // Reload to reset to default constants
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
        <FaHiking className="text-military-green" />
        {t('title')}
      </h1>

      {/* Distance Inputs Section */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <FaRuler className="text-military-green" />
          {t('distanceMeasurements')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaRuler className="text-blue-600" />
              {t('horizontalDistance')}
            </label>
            <input
              type="number"
              value={inputs.horizontalDistance ?? ''}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  horizontalDistance: Number(e.target.value),
                })
              }
              onFocus={(e) => e.target.select()}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 border-blue-200"
              placeholder={t('enterDistance')}
            />
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaMountain className="text-orange-600" />
              {t('verticalDistance')}
            </label>
            <input
              type="number"
              value={inputs.verticalDistance ?? ''}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  verticalDistance: Number(e.target.value),
                })
              }
              onFocus={(e) => e.target.select()}
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
        {/*
        <div className="flex items-center gap-2 text-sm font-normal mb-4">
          // TODO: Replace this component by a "Use custom factors constants"
          <button
            onClick={() => setUseCustomFactorConstants(!useCustomFactorConstants)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-0 focus:ring-military-green focus:ring-offset-0 ${useCustomFactorConstants ? 'bg-military-green' : 'bg-gray-200'}`}
          >
            <span
              className={`${useCustomFactorConstants ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>

          /* <span
            className={`${useCustomFactorConstants ? 'text-military-green font-bold' : 'text-gray-900'}`}
          >
            {useCustomFactorConstants
              ? t('useCustomFactorConstants')
              : t('useStandardFactors')}
          </span>
        </div> */}
        <TacticalTourFactors inputs={inputs} setInputs={setInputs} />
      </div>

      {/* Results Section */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Results
        </h2>
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
              {formatTime(horizontalHours)}
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-orange-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-600">
              {t('verticalTime')}
            </div>
            <div className="text-lg sm:text-xl font-bold text-orange-700">
              {formatTime(verticalHours)}
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
            <li>{t('baseHorizontalSpeed')}: 4 km/h</li>
            <li>{t('baseVerticalSpeed')}: 400 m/h</li>
            <li>
              {t('currentMultiplier')}: {multiplier.toFixed(2)}
            </li>
            <li>
              {t('horizontalCalculation')}: {inputs.horizontalDistance}km ÷ ({4}{' '}
              × {multiplier.toFixed(2)})
            </li>
            <li>
              {t('verticalCalculation')}: {inputs.verticalDistance}m ÷ ({400} ×{' '}
              {multiplier.toFixed(2)})
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

      {/* Export Section */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">{t('exportResults')}</h2>
        <ExportResults
          results={{
            inputs,
            calculations: {
              total: formatTime(totalHours),
              horizontal: formatTime(horizontalHours),
              vertical: formatTime(verticalHours),
              multiplier: multiplier,
            },
            performance: performanceData,
          }}
        />
      </div>

      {/* Constants Section - Changed to details to make it collapsible */}
      <details className="mt-6 p-4 bg-white rounded-lg shadow group">
        <summary className="text-xl font-bold mb-4 cursor-pointer flex items-center justify-between">
          {t('calculationConstants')}
          <FaChevronDown className="transform transition-transform duration-200 group-open:rotate-180 text-gray-600" />
        </summary>
        
        <TacticalFactorsDisplay/>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleDownloadDefaultConstants}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t('downloadDefaultConstantsFile')}
          </button>
          { /* Hide this section until further development */}
          {false && <div>
            <input
              type="file"
              accept=".json"
              onChange={handleConstantsUpload}
              className="hidden"
              id="constants-upload"
            />
            <label
              htmlFor="constants-upload"
              className="px-4 py-2 bg-military-green text-white rounded hover:bg-opacity-90 cursor-pointer"
            >
              {t('uploadConstants')}
            </label>
            <button
              onClick={handleResetConstants}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              {t('resetToDefault')}
            </button>
          </div>}
        </div>
      </details>
    </div>
  );
};

export default TourCalculator;
