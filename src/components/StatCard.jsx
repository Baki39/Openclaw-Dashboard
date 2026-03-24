import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, format = 'number' }) => {
  const isPositive = change >= 0;

  const formatValue = (val) => {
    if (format === 'currency') {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (format === 'compact') {
      if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
    }
    return val.toLocaleString();
  };

  return (
    <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] card-hover animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{formatValue(value)}</p>
    </div>
  );
};

export default StatCard;