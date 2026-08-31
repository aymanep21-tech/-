import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  comparisonText?: string;
  icon: React.ReactNode;
  iconBg?: string;
  sparklinePoints?: number[];
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  unit = 'ج.م',
  change,
  changeType = 'positive',
  comparisonText = 'مقارنة بالأمس',
  icon,
  iconBg = 'bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-transparent dark:border-[#333333]',
  sparklinePoints = [35, 45, 40, 55, 60, 52, 70],
  onClick
}) => {
  // Generate simple SVG sparkline
  const min = Math.min(...sparklinePoints);
  const max = Math.max(...sparklinePoints);
  const range = max - min || 1;
  const width = 80;
  const height = 28;

  const pointsString = sparklinePoints
    .map((p, i) => {
      const x = (i / (sparklinePoints.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs transition-all duration-200 text-right ${
        onClick ? 'cursor-pointer hover:border-[#059669] dark:hover:border-[#10b981] hover:shadow-md' : ''
      }`}
    >
      {/* Top row: Icon and sparkline */}
      <div className="flex items-center justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>

        {/* Mini sparkline chart */}
        <div className="w-20 h-7 opacity-80">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke={changeType === 'negative' ? '#f43f5e' : '#10b981'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsString}
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <p className="text-xs font-semibold text-[#475569] dark:text-[#888888] mb-1">{title}</p>

      {/* Main Big Number */}
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-2xl lg:text-3xl font-extrabold text-[#0f172a] dark:text-[#ededed] font-mono tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && <span className="text-xs font-bold text-[#94a3b8] dark:text-[#666666] font-sans">{unit}</span>}
      </div>

      {/* Bottom row: trend and change */}
      {change && (
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded-md ${
              changeType === 'positive'
                ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333]'
                : changeType === 'negative'
                ? 'bg-rose-50 text-[#e11d48] dark:bg-[#1a1a1a] dark:text-[#f43f5e] border border-rose-200/60 dark:border-[#333333]'
                : 'bg-[#f1f5f9] text-[#475569] dark:bg-[#1a1a1a] dark:text-[#888888] border border-[#e2e8f0] dark:border-[#333333]'
            }`}
          >
            {changeType === 'positive' ? (
              <TrendingUp className="w-3 h-3" />
            ) : changeType === 'negative' ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            <span className="font-mono text-[11px]">{change}</span>
          </span>
          <span className="text-[#94a3b8] dark:text-[#666666] text-[11px] font-medium">{comparisonText}</span>
        </div>
      )}
    </div>
  );
};
