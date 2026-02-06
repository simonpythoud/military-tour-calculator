import type React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { TourInputs } from '../types';
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
          <option value="POOR">{t('condition_poor')}</option>
          <option value="SUFFICIENT">{t('condition_sufficient')}</option>
          <option value="GOOD">{t('condition_good')}</option>
          <option value="VERY_GOOD">{t('condition_very_good')}</option>
          <option value="EXCELLENT">{t('condition_excellent')}</option>
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
          <option value="NONE">{t('technical_none')}</option>
          <option value="BASIC">{t('technical_basic')}</option>
          <option value="INTERMEDIATE">{t('technical_intermediate')}</option>
          <option value="ADVANCED">{t('technical_advanced')}</option>
          <option value="EXPERT">{t('technical_expert')}</option>
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
          <option value="LIGHT">{t('weight_light')}</option>
          <option value="MEDIUM">{t('weight_medium')}</option>
          <option value="HEAVY">{t('weight_heavy')}</option>
          <option value="VERY_HEAVY">{t('weight_very_heavy')}</option>
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
          value={inputs.terrain}
          onChange={(e) =>
            setInputs({ ...inputs, terrain: e.target.value as any })
          }
          className="w-full p-2 border rounded"
        >
          <option value="FLAT">{t('terrain_flat')}</option>
          <option value="HIKING_TRAIL">{t('terrain_hiking_trail')}</option>
          <option value="DIFFICULT">{t('terrain_difficult')}</option>
          <option value="ALPINE">{t('terrain_alpine')}</option>
          <option value="TECHNICAL_ALPINE">
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
          <option value="SPRING">{t('conditions_spring')}</option>
          <option value="SUMMER">{t('conditions_summer')}</option>
          <option value="AUTUMN">{t('conditions_autumn')}</option>
          <option value="WINTER">{t('conditions_winter')}</option>
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
          <option value="GREEN">{t('threat_green')}</option>
          <option value="YELLOW">{t('threat_yellow')}</option>
          <option value="RED">{t('threat_red')}</option>
        </select>
      </div>
    </div>
  );
};

export default TacticalTourFactors;
