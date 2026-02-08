import type React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { V2CalculationMode } from '../../types/v2';

interface Props {
  mode: V2CalculationMode;
  onModeChange: (mode: V2CalculationMode) => void;
}

const CalculationModeToggle: React.FC<Props> = ({ mode, onModeChange }) => {
  const { t } = useLanguage();

  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-300">
      <button
        type="button"
        onClick={() => onModeChange('basic')}
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          mode === 'basic'
            ? 'bg-military-green text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        {t('v2_mode_basic')}
      </button>
      <button
        type="button"
        onClick={() => onModeChange('advanced')}
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          mode === 'advanced'
            ? 'bg-military-green text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        {t('v2_mode_advanced')}
      </button>
    </div>
  );
};

export default CalculationModeToggle;
