import React, { useState } from 'react';
import { TourInputs, Package } from '../types';
import { calculateTourTime } from '../utils/calculateTime';
import { FaRuler, FaMountain, FaWeightHanging, FaExclamationTriangle, FaSun, FaHiking, FaRunning, FaMedal, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { calculatePerformanceOverTime } from '../utils/calculateFatigue';
import PerformanceGraph from './PerformanceGraph';

const TourCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<TourInputs>({
    horizontalDistance: 0,
    verticalDistance: 0,
    package: 0,
    dangerLevel: 'low',
    light: 'day',
    terrain: 'easy',
    physique: 'fit',
    experience: 'medium'
  });

  const result = calculateTourTime(inputs);

  const formatTime = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const packageOptions: Package[] = [0, 5, 10, 15, 20, 25, 30];

  const performanceData = calculatePerformanceOverTime(inputs, result.totalHours);

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
              onChange={(e) => setInputs({
                ...inputs, 
                horizontalDistance: Number(e.target.value)
              })}
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
              onChange={(e) => setInputs({
                ...inputs, 
                verticalDistance: Number(e.target.value)
              })}
              onFocus={(e) => e.target.select()}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300 border-orange-200"
              placeholder={t('enterAltitude')}
            />
          </div>
        </div>
      </div>

      {/* Factors Section - Updated with gray chevron */}
      <details className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6 group" open>
        <summary className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 cursor-pointer">
          <FaWeightHanging className="text-military-green" />
          {t('influencingFactors')}
          <FaChevronDown className="ml-auto transform transition-transform duration-200 group-open:rotate-180 text-gray-600" />
        </summary>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaWeightHanging className="text-gray-600" />
              {t('packageWeight')}
            </label>
            <select
              value={inputs.package}
              onChange={(e) => setInputs({...inputs, package: Number(e.target.value) as Package})}
              className="w-full p-2 border rounded"
            >
              {packageOptions.map(weight => (
                <option key={weight} value={weight}>{weight} kg</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaExclamationTriangle className="text-gray-600" />
              {t('dangerLevel')}
            </label>
            <select
              value={inputs.dangerLevel}
              onChange={(e) => setInputs({...inputs, dangerLevel: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="low">{t('low')}</option>
              <option value="medium">{t('medium')}</option>
              <option value="high">{t('high')}</option>
              <option value="extreme">{t('extreme')}</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaSun className="text-gray-600" />
              {t('lightConditions')}
            </label>
            <select
              value={inputs.light}
              onChange={(e) => setInputs({...inputs, light: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="day">{t('day')}</option>
              <option value="night">{t('night')}</option>
              <option value="mixed">{t('mixed')}</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaMountain className="text-gray-600" />
              {t('terrainType')}
            </label>
            <select
              value={inputs.terrain}
              onChange={(e) => setInputs({...inputs, terrain: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="easy">{t('easy')}</option>
              <option value="alpine_medium">{t('alpine_medium')}</option>
              <option value="alpine_hard">{t('alpine_hard')}</option>
              <option value="alpine_extreme">{t('alpine_extreme')}</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaRunning className="text-gray-600" />
              {t('physicalCondition')}
            </label>
            <select
              value={inputs.physique}
              onChange={(e) => setInputs({...inputs, physique: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="very_fit">{t('very_fit')}</option>
              <option value="fit">{t('fit')}</option>
              <option value="medium">{t('medium')}</option>
              <option value="poor">{t('poor')}</option>
              <option value="injured">{t('injured')}</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaMedal className="text-gray-600" />
              {t('experienceLevel')}
            </label>
            <select
              value={inputs.experience}
              onChange={(e) => setInputs({...inputs, experience: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="expert">{t('expert')}</option>
              <option value="advanced">{t('advanced')}</option>
              <option value="medium">{t('medium')}</option>
              <option value="basic">{t('basic')}</option>
              <option value="none">{t('none')}</option>
            </select>
          </div>
        </div>
      </details>
        
      {/* Results Section */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Results</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-600">{t('totalTime')}</div>
            <div className="text-lg sm:text-xl font-bold">{formatTime(result.totalHours)}</div>
          </div>
          <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-600">{t('horizontalTime')}</div>
            <div className="text-lg sm:text-xl font-bold text-blue-700">{formatTime(result.horizontalHours)}</div>
          </div>
          <div className="p-2 sm:p-3 bg-orange-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-600">{t('verticalTime')}</div>
            <div className="text-lg sm:text-xl font-bold text-orange-700">{formatTime(result.verticalHours)}</div>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
            {/* <div className="text-xs sm:text-sm text-gray-600">{t('speedMultiplier')}</div> */}
            <div className="text-xs sm:text-sm text-gray-600">{t('speedAdaptedToFactorPercentage')}</div>
            {/* <div className="text-lg sm:text-xl font-bold">{result.multiplier.toFixed(2)}x</div> */}
            <div className="text-lg sm:text-xl font-bold">{Math.round(result.multiplier * 100)}%</div>
          </div>
        </div>
          
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-sm sm:text-base font-bold mb-2">{t('calculationMethod')}</h3>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
            <li>{t('baseHorizontalSpeed')}: 4 km/h</li>
            <li>{t('baseVerticalSpeed')}: 400 m/h</li>
            <li>{t('packageWeightEffect')}: -{inputs.package * 2}% speed</li>
            <li>{t('currentMultiplier')}: {result.multiplier.toFixed(2)}</li>
            <li>{t('horizontalCalculation')}: {inputs.horizontalDistance}km ÷ ({4} × {result.multiplier.toFixed(2)})</li>
            <li>{t('verticalCalculation')}: {inputs.verticalDistance}m ÷ ({400} × {result.multiplier.toFixed(2)})</li>
          </ul>
        </div>
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
    </div>
  );
};

export default TourCalculator;
