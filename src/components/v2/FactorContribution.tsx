import type React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { FactorContribution as FactorContributionType } from '../../types/v2';
import {
  FaRunning,
  FaGraduationCap,
  FaWeightHanging,
  FaMountain,
  FaSnowflake,
  FaExclamationTriangle,
  FaClock,
  FaArrowDown,
  FaUsers,
} from 'react-icons/fa';

interface Props {
  contributions: FactorContributionType[];
  totalPenaltyPercent: number;
  baseTimeHours: number;
  totalHours: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  condition: <FaRunning />,
  skill: <FaGraduationCap />,
  load: <FaWeightHanging />,
  terrain: <FaMountain />,
  season: <FaSnowflake />,
  threat: <FaExclamationTriangle />,
  fatigue: <FaClock />,
  slope: <FaArrowDown />,
  group: <FaUsers />,
  base: <FaClock />,
};

const COLOR_MAP: Record<string, string> = {
  green: 'bg-green-100 text-green-800 border-green-300',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  orange: 'bg-orange-100 text-orange-800 border-orange-300',
  red: 'bg-red-100 text-red-800 border-red-300',
};

const BAR_COLOR_MAP: Record<string, string> = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

const formatTime = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
};

const FactorContribution: React.FC<Props> = ({
  contributions,
  totalPenaltyPercent,
  baseTimeHours,
}) => {
  const { t } = useLanguage();

  const penalties = contributions.filter((c) => c.percentage > 0);
  const bonuses = contributions.filter((c) => c.percentage < 0);
  const maxAbsPercent = Math.max(
    ...contributions.map((c) => Math.abs(c.percentage)),
    1
  );

  const summaryColor =
    totalPenaltyPercent > 30
      ? 'text-red-700 bg-red-50 border-red-200'
      : totalPenaltyPercent > 10
        ? 'text-orange-700 bg-orange-50 border-orange-200'
        : totalPenaltyPercent > 0
          ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
          : 'text-green-700 bg-green-50 border-green-200';

  return (
    <div className="space-y-3">
      <div className={`p-3 rounded-lg border ${summaryColor}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {t('v2_base_time')}: {formatTime(baseTimeHours)}
          </span>
          <span className="text-sm font-bold">
            {totalPenaltyPercent > 0 ? '+' : ''}
            {Math.round(totalPenaltyPercent)}%
          </span>
        </div>
        {Math.abs(totalPenaltyPercent) >= 1 && (
          <p className="text-xs mt-1 opacity-80">{t('v2_penalty_summary')}</p>
        )}
      </div>

      {penalties.length > 0 && (
        <div className="space-y-1.5">
          {penalties.map((contribution) => (
            <div key={contribution.id} className="flex items-center gap-2">
              <span
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded ${COLOR_MAP[contribution.color]}`}
              >
                {ICON_MAP[contribution.iconType] || <FaClock />}
              </span>
              <span className="text-xs text-gray-700 flex-1 min-w-0 truncate">
                {t(contribution.labelKey as Parameters<typeof t>[0])}
              </span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                <div
                  className={`h-full rounded-full ${BAR_COLOR_MAP[contribution.color]}`}
                  style={{
                    width: `${Math.min(100, (Math.abs(contribution.percentage) / maxAbsPercent) * 100)}%`,
                  }}
                />
              </div>
              <span
                className={`text-xs font-medium flex-shrink-0 w-12 text-right ${
                  contribution.percentage > 0
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}
              >
                +{Math.round(contribution.percentage)}%
              </span>
            </div>
          ))}
        </div>
      )}

      {bonuses.length > 0 && (
        <div className="space-y-1.5">
          {bonuses.map((contribution) => (
            <div key={contribution.id} className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded bg-green-100 text-green-800 border-green-300">
                {ICON_MAP[contribution.iconType] || <FaClock />}
              </span>
              <span className="text-xs text-gray-700 flex-1 min-w-0 truncate">
                {t(contribution.labelKey as Parameters<typeof t>[0])}
              </span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: `${Math.min(100, (Math.abs(contribution.percentage) / maxAbsPercent) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-xs font-medium flex-shrink-0 w-12 text-right text-green-600">
                {Math.round(contribution.percentage)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FactorContribution;
