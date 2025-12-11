import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = 'neutral',
  color = '#6B7280'
}) => {
  return (
    <div className="neumorphic rounded-3xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="neumorphic-flat rounded-2xl p-3">
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        {trend !== 'neutral' && (
          <div className={`text-xs font-semibold px-3 py-1 rounded-full ${
            trend === 'up' ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEE2E2] text-[#991B1B]'
          }`}>
            {trend === 'up' ? '↑' : '↓'}
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm text-[#6B7280] mb-2">{title}</p>
        <p className="text-3xl font-bold text-[#374151] mb-1">{value}</p>
        <p className="text-xs text-[#9CA3AF]">{subtitle}</p>
      </div>
    </div>
  );
};
