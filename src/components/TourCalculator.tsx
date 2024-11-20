import React, { useState } from 'react';
import { TourInputs, Package } from '../types';
import { calculateTourTime } from '../utils/calculateTime';
import { FaRuler, FaMountain, FaWeightHanging, FaExclamationTriangle, FaSun, FaHiking, FaRunning, FaMedal } from 'react-icons/fa';

const TourCalculator: React.FC = () => {
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaHiking className="text-military-green" />
        Military Tour Time Calculator
      </h1>
      
      {/* Distance Inputs Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaRuler className="text-military-green" />
          Distance Measurements
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaRuler className="text-gray-600" />
              Horizontal Distance (km)
            </label>
            <input
              type="number"
              value={inputs.horizontalDistance ?? ''}
              onChange={(e) => setInputs({
                ...inputs, 
                horizontalDistance: Number(e.target.value)
              })}
              onFocus={(e) => e.target.select()}
              className="w-full p-2 border rounded"
              placeholder="Enter distance"
            />
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaMountain className="text-gray-600" />
              Vertical Distance (m)
            </label>
            <input
              type="number"
              value={inputs.verticalDistance ?? ''}
              onChange={(e) => setInputs({
                ...inputs, 
                verticalDistance: Number(e.target.value)
              })}
              onFocus={(e) => e.target.select()}
              className="w-full p-2 border rounded"
              placeholder="Enter altitude"
            />
          </div>
        </div>
      </div>

      {/* Factors Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaWeightHanging className="text-military-green" />
          Influencing Factors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaWeightHanging className="text-gray-600" />
              Package Weight
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
              Danger Level
            </label>
            <select
              value={inputs.dangerLevel}
              onChange={(e) => setInputs({...inputs, dangerLevel: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="extreme">Extreme</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaSun className="text-gray-600" />
              Light Conditions
            </label>
            <select
              value={inputs.light}
              onChange={(e) => setInputs({...inputs, light: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaMountain className="text-gray-600" />
              Terrain Type
            </label>
            <select
              value={inputs.terrain}
              onChange={(e) => setInputs({...inputs, terrain: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="easy">Easy</option>
              <option value="alpine_medium">Alpine Medium</option>
              <option value="alpine_hard">Alpine Hard</option>
              <option value="alpine_extreme">Alpine Extreme</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaRunning className="text-gray-600" />
              Physical Condition
            </label>
            <select
              value={inputs.physique}
              onChange={(e) => setInputs({...inputs, physique: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="very_fit">Very Fit</option>
              <option value="fit">Fit</option>
              <option value="medium">Medium</option>
              <option value="poor">Poor</option>
              <option value="injured">Injured</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-1">
              <FaMedal className="text-gray-600" />
              Experience Level
            </label>
            <select
              value={inputs.experience}
              onChange={(e) => setInputs({...inputs, experience: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="expert">Expert</option>
              <option value="advanced">Advanced</option>
              <option value="medium">Medium</option>
              <option value="basic">Basic</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>
        
      {/* Results Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Results</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Total Time</div>
            <div className="text-xl font-bold">{formatTime(result.totalHours)}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Horizontal Time</div>
            <div className="text-xl font-bold">{formatTime(result.horizontalHours)}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Vertical Time</div>
            <div className="text-xl font-bold">{formatTime(result.verticalHours)}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Speed Multiplier</div>
            <div className="text-xl font-bold">{result.multiplier.toFixed(2)}x</div>
          </div>
        </div>
          
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Calculation Method:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Base horizontal speed: 4 km/h</li>
            <li>Base vertical speed: 400 m/h</li>
            <li>Package weight: -{inputs.package * 2}% speed</li>
            <li>Current conditions multiplier: {result.multiplier.toFixed(2)}</li>
            <li>Horizontal calculation: {inputs.horizontalDistance}km ÷ ({4} × {result.multiplier.toFixed(2)})</li>
            <li>Vertical calculation: {inputs.verticalDistance}m ÷ ({400} × {result.multiplier.toFixed(2)})</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TourCalculator;
