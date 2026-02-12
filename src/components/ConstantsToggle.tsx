import type React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ConstantsToggleProps {
  useCustomFactorConstants: boolean;
  setUseCustomFactorConstants: (value: boolean) => void;
}

const ConstantsToggle: React.FC<ConstantsToggleProps> = ({
  useCustomFactorConstants,
  setUseCustomFactorConstants,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-sm font-normal mb-4">
      <button
        type="button"
        role="switch"
        aria-checked={useCustomFactorConstants}
        aria-label={t('customConstants')}
        onClick={() => setUseCustomFactorConstants(!useCustomFactorConstants)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-military-green focus-visible:ring-offset-2 ${
          useCustomFactorConstants ? 'bg-military-green' : 'bg-gray-200'
        } ${!localStorage.getItem('customConstants') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!localStorage.getItem('customConstants')}
      >
        <span
          className={`${
            useCustomFactorConstants ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
      <span
        className={`${
          useCustomFactorConstants
            ? 'text-military-green font-bold'
            : 'text-gray-900'
        }`}
      >
        {useCustomFactorConstants
          ? t('useCustomFactorConstants')
          : t('useDefaultFactorConstants')}
      </span>
    </div>
  );
};

export default ConstantsToggle;
