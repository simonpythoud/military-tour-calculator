import type React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import ConstantsToggle from './ConstantsToggle';
import TacticalFactorsDisplay from './TacticalFactorsDisplay';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  useCustomFactorConstants: boolean;
  setUseCustomFactorConstants: (value: boolean) => void;
  tacticalConstants: any;
  handleConstantsUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetConstants: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  useCustomFactorConstants,
  setUseCustomFactorConstants,
  tacticalConstants,
  handleConstantsUpload,
  handleResetConstants,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{t('calculationConstants')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-4">
          <ConstantsToggle
            useCustomFactorConstants={useCustomFactorConstants}
            setUseCustomFactorConstants={setUseCustomFactorConstants}
          />

          <TacticalFactorsDisplay tacticalConstants={tacticalConstants} />

          <div className="space-y-4 mt-6">
            <div className="flex justify-end gap-2">
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
            </div>
            <div className="text-right">
              <a
                href="/tour-calculator-constants-default.json"
                download
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {t('downloadDefaultConstantsFile')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal; 