import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TourInputs } from '../types';
import {
  FaRunning,
  FaMountain,
  FaWeightHanging,
  FaSnowflake,
  FaExclamationTriangle,
  FaGraduationCap,
} from 'react-icons/fa';
import InfoTooltip from './InfoTooltip';

interface Props {
  inputs: TourInputs;
  setInputs: (inputs: TourInputs) => void;
}

const TacticalTourFactors: React.FC<Props> = ({ inputs, setInputs }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-military-green">
      {/* Physical Condition */}
      <div>
        <label className="block mb-2 flex items-center gap-1">
          <FaRunning className="text-military-green" />
          {t('condition_title')}
          <InfoTooltip content={t('condition_description')} />
        </label>
        <select
          value={inputs.condition}
          onChange={(e) =>
            setInputs({ ...inputs, condition: e.target.value as any })
          }
          className="w-full p-2 border rounded"
        >
          <option value="poor">{t('condition_poor')}</option>
          <option value="sufficient">{t('condition_sufficient')}</option>
          <option value="good">{t('condition_good')}</option>
          <option value="very_good">{t('condition_very_good')}</option>
          <option value="excellent">{t('condition_excellent')}</option>
        </select>
      </div>

      {/* Technical Skills */}
      <div>
        <label className="block mb-2 flex items-center gap-1">
          <FaGraduationCap className="text-military-green" />
          {t('technical_title')}
          <InfoTooltip content={t('technical_description')} />
        </label>
        <select
          value={inputs.technicalSkill}
          onChange={(e) =>
            setInputs({ ...inputs, technicalSkill: e.target.value as any })
          }
          className="w-full p-2 border rounded"
        >
          <option value="none">{t('technical_none')}</option>
          <option value="basic">{t('technical_basic')}</option>
          <option value="intermediate">{t('technical_intermediate')}</option>
          <option value="advanced">{t('technical_advanced')}</option>
          <option value="expert">{t('technical_expert')}</option>
        </select>
      </div>

      {/* Weight */}
      <div>
        <label className="block mb-2 flex items-center gap-1">
          <FaWeightHanging className="text-military-green" />
          {t('weight_title')}
          <InfoTooltip content={t('weight_description')} />
        </label>
        <select
          value={inputs.weight}
          onChange={(e) =>
            setInputs({ ...inputs, weight: e.target.value as any })
          }
          className="w-full p-2 border rounded"
        >
          <option value="light">{t('weight_light')}</option>
          <option value="medium">{t('weight_medium')}</option>
          <option value="heavy">{t('weight_heavy')}</option>
          <option value="very_heavy">{t('weight_very_heavy')}</option>
        </select>
      </div>

      {/* Terrain */}
      <div>
        <label className="block mb-2 flex items-center gap-1">
          <FaMountain className="text-military-green" />
          {t('terrain_title')}
          <InfoTooltip content={t('terrain_description')} />
        </label>
        <select
          value={inputs.tacticalTerrain}
          onChange={(e) =>
            setInputs({ ...inputs, tacticalTerrain: e.target.value as any })
          }
          className="w-full p-2 border rounded"
        >
          <option value="flat">{t('terrain_flat')}</option>
          <option value="hiking_trail">{t('terrain_hiking_trail')}</option>
          <option value="difficult">{t('terrain_difficult')}</option>
          <option value="alpine">{t('terrain_alpine')}</option>
          <option value="technical_alpine">
            {t('terrain_technical_alpine')}
          </option>
        </select>
      </div>

      {/* Conditions */}
      <div>
        <label className="block mb-2 flex items-center gap-1">
          <FaSnowflake className="text-military-green" />
          {t('conditions_title')}
          <InfoTooltip content={t('conditions_description')} />
        </label>
        <select
          value={inputs.conditionType}
          onChange={(e) =>
            setInputs({ ...inputs, conditionType: e.target.value as any })
          }
          className="w-full p-2 border rounded"
        >
          <option value="spring">{t('conditions_spring')}</option>
          <option value="summer">{t('conditions_summer')}</option>
          <option value="autumn">{t('conditions_autumn')}</option>
          <option value="winter">{t('conditions_winter')}</option>
        </select>
      </div>

      {/* Threat Level */}
      <div>
        <label className="block mb-2 flex items-center gap-1">
          <FaExclamationTriangle className="text-military-green" />
          {t('threat_title')}
          <InfoTooltip content={t('threat_description')} />
        </label>
        <select
          value={inputs.threatLevel}
          onChange={(e) =>
            setInputs({ ...inputs, threatLevel: e.target.value as any })
          }
          className="w-full p-2 border rounded"
        >
          <option value="green">{t('threat_green')}</option>
          <option value="yellow">{t('threat_yellow')}</option>
          <option value="red">{t('threat_red')}</option>
        </select>
      </div>
    </div>
  );
};

export default TacticalTourFactors;
