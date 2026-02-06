import type React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface TacticalFactorsDisplayProps {
  tacticalConstants: {
    CONDITION_FACTORS: Record<string, number>;
    TECHNICAL_SKILL_FACTORS: Record<string, number>;
    WEIGHT_FACTORS: Record<string, number>;
    TACTICAL_TERRAIN_FACTORS: Record<string, number>;
    CONDITION_TYPE_FACTORS: Record<string, number>;
    THREAT_LEVEL_FACTORS: Record<string, number>;
    BASE_SPEEDS: Record<string, number>;
  };
}

const TacticalFactorsDisplay: React.FC<TacticalFactorsDisplayProps> = ({ tacticalConstants }) => {
  const { t } = useLanguage();

  const formatPercentage = (value: number) => `${Math.round(value * 100)}%`;
  const formatHorizontalSpeed = (value: number) => `${value} km/h`;
  const formatVerticalSpeed = (value: number) => `${value} m/h`;

  const renderBaseSpeed = () => (
    <div>
      <h4 className="font-medium mb-1">{t('baseSpeeds')}</h4>
      <ul className="list-disc list-inside text-sm">
        <li>{t('baseHorizontalSpeed')}: {formatHorizontalSpeed(tacticalConstants.BASE_SPEEDS.HORIZONTAL)}</li>
        <li>{t('baseVerticalSpeed')}: {formatVerticalSpeed(tacticalConstants.BASE_SPEEDS.VERTICAL)}</li>
      </ul>
    </div>
  );

  const renderFactorList = (
    factors: Record<string, number>,
    title: string
  ) => (
    <div>
      <h4 className="font-medium mb-1">{t(`${title}_factors` as any)}</h4>
      <ul className="list-disc list-inside text-sm">
        {Object.entries(factors).map(([key, value]) => (
          <li key={key}>
            {t((`${title}_${key.toLowerCase()}`) as any)}: {formatPercentage(value)}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {renderBaseSpeed()}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-military-green">
        {renderFactorList(tacticalConstants.CONDITION_FACTORS, 'condition')}
        {renderFactorList(tacticalConstants.TECHNICAL_SKILL_FACTORS, 'technical')}
        {renderFactorList(tacticalConstants.WEIGHT_FACTORS, 'weight')}
        {renderFactorList(tacticalConstants.TACTICAL_TERRAIN_FACTORS, 'terrain')}
        {renderFactorList(tacticalConstants.CONDITION_TYPE_FACTORS, 'conditions')}
        {renderFactorList(tacticalConstants.THREAT_LEVEL_FACTORS, 'threat')}
      </div>
    </div>
  );
};

export default TacticalFactorsDisplay; 