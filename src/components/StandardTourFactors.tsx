import React from 'react';
import {
  FaWeightHanging,
  FaExclamationTriangle,
  FaSun,
  FaMountain,
  FaRunning,
  FaMedal,
} from 'react-icons/fa';
import { TourInputs, Package } from '../types';
import InfoTooltip from './InfoTooltip';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  inputs: TourInputs;
  setInputs: React.Dispatch<React.SetStateAction<TourInputs>>;
  packageOptions: Package[];
}

const StandardTourFactors: React.FC<Props> = ({
  inputs,
  setInputs,
  packageOptions,
}) => {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-gray-900">
      <div>
        <label htmlFor="package-weight" className="block mb-2 flex items-center gap-1">
          <FaWeightHanging className="text-gray-600" />
          {t('packageWeight')}
          <InfoTooltip content={t('tooltip_packageWeight')} />
        </label>
        <select
          id="package-weight"
          value={inputs.package}
          onChange={(e) =>
            setInputs({ ...inputs, package: Number(e.target.value) as Package })
          }
          className="w-full p-2 border rounded"
        >
          {packageOptions.map((weight) => (
            <option key={weight} value={weight}>
              {weight} kg
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 flex items-center gap-1">
          <FaExclamationTriangle className="text-gray-600" />
          {t('dangerLevel')}
          <InfoTooltip content={t('tooltip_dangerLevel')} />
        </label>
        <select
          value={inputs.dangerLevel}
          onChange={(e) =>
            setInputs({ ...inputs, dangerLevel: e.target.value as any })
          }
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
          <InfoTooltip content={t('tooltip_lightConditions')} />
        </label>
        <select
          value={inputs.light}
          onChange={(e) =>
            setInputs({ ...inputs, light: e.target.value as any })
          }
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
          <InfoTooltip content={t('tooltip_terrainType')} />
        </label>
        <select
          value={inputs.terrain}
          onChange={(e) =>
            setInputs({ ...inputs, terrain: e.target.value as any })
          }
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
          <InfoTooltip content={t('tooltip_physicalCondition')} />
        </label>
        <select
          value={inputs.physique}
          onChange={(e) =>
            setInputs({ ...inputs, physique: e.target.value as any })
          }
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
          <InfoTooltip content={t('tooltip_experienceLevel')} />
        </label>
        <select
          value={inputs.experience}
          onChange={(e) =>
            setInputs({ ...inputs, experience: e.target.value as any })
          }
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
  );
};

export default StandardTourFactors;
