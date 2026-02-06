import type React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from 'react-icons/fa';

interface Props {
  reliability: 'high' | 'medium' | 'low';
}

const ReliabilityIndicator: React.FC<Props> = ({ reliability }) => {
  const { t } = useLanguage();

  const getIcon = () => {
    switch (reliability) {
      case 'high':
        return <FaCheckCircle className="text-green-500" />;
      case 'medium':
        return <FaExclamationCircle className="text-yellow-500" />;
      case 'low':
        return <FaTimesCircle className="text-red-500" />;
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      {getIcon()}
      <span className="text-sm text-gray-600">
        {t('estimateReliability')}: {t(`reliability_${reliability}`)}
      </span>
    </div>
  );
};

export default ReliabilityIndicator;
