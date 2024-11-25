import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

interface Props {
  totalHours: number;
  // TODO: Replace by actual tactical warnings
  // dangerLevel: string;
  // terrain: string;
}

const TourDisclaimers: React.FC<Props> = ({
  totalHours,
  // dangerLevel,
  // terrain,
}) => {
  const { t } = useLanguage();

  return (
    <div className="mt-4 space-y-3">
      {/* {(dangerLevel === 'high' || dangerLevel === 'extreme') && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-red-600 mt-1 mr-3 w-6" />
            <p className="text-sm text-red-700">{t('dangerLevelWarning')}</p>
          </div>
        </div>
      )} */}

      {totalHours > 18 && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 w-6" />
            <p className="text-sm text-yellow-700">
              {t('longTourExplanation')}
            </p>
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <div className="flex items-start">
          <FaInfoCircle className="text-blue-600 mt-1 mr-3 w-6" />
          <p className="text-sm text-blue-700">{t('generalDisclaimer')}</p>
        </div>
      </div>
    </div>
  );
};

export default TourDisclaimers;
