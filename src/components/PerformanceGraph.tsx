import type React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

interface PerformancePoint {
  hour: number;
  performance: number;
}

interface Props {
  data: PerformancePoint[];
}

const FatigueGraph: React.FC<Props> = ({ data }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            label={{ value: t('hours'), position: 'bottom' }}
          />
          <YAxis
            label={{
              value: t('performancePercentage'),
              angle: -90,
              position: 'insideLeft',
            }}
            domain={[0, 100]}
          />
          <Tooltip
            formatter={(value: number) => [
              `${Math.round(value)}%`,
              t('performancePercentage'),
            ]}
            labelFormatter={(label: number) => `${label} ${t('hours')}`}
          />
          <Line
            type="monotone"
            dataKey="performance"
            stroke="#4B5320"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FatigueGraph;
