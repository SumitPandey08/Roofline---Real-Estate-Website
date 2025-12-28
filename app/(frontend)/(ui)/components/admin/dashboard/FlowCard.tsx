import React from 'react';
import { 
  MdArrowUpward, 
  MdArrowDownward, 
  MdTrendingUp, 
  MdTrendingDown, 
  MdInfoOutline, 
  MdChevronRight 
} from 'react-icons/md';

interface FlowCardData {
  tittle: string;
  flowArr: number[];
  numericalValue: string | number;
  growth: number;
  description: string;
  theme: 'purple' | 'blue' | 'green' | 'orange' | 'slate' | 'red';
}

interface FlowCardProps {
  data: FlowCardData;
}

const FlowCard: React.FC<FlowCardProps> = ({ data }) => {
  const { tittle, flowArr, numericalValue, growth, description, theme } = data;

  const isPositive = growth >= 0;

  // Configuration for dynamic themes
  const themeConfig = {
    purple: { text: "text-purple-600", bg: "bg-purple-600", light: "bg-purple-50", border: "border-purple-100" },
    blue: { text: "text-blue-600", bg: "bg-blue-600", light: "bg-blue-50", border: "border-blue-100" },
    green: { text: "text-green-600", bg: "bg-green-600", light: "bg-green-50", border: "border-green-100" },
    orange: { text: "text-orange-600", bg: "bg-orange-600", light: "bg-orange-50", border: "border-orange-100" },
    slate: { text: "text-slate-600", bg: "bg-slate-600", light: "bg-slate-50", border: "border-slate-100" },
    red: { text: "text-red-600", bg: "bg-red-600", light: "bg-red-50", border: "border-red-100" },
  }[theme];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      
      {/* Top Section: Title and Info Icon */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{tittle}</p>
          <button className="text-slate-300 hover:text-slate-500 transition-colors">
            <MdInfoOutline size={16} title="View data details" />
          </button>
        </div>
        
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? <MdArrowUpward /> : <MdArrowDownward />}
          {Math.abs(growth)}%
        </div>
      </div>

      {/* Numerical Value */}
      <h3 className="text-2xl font-bold text-slate-800 mt-2">{numericalValue}</h3>

      {/* Dynamic Flow Chart (Theme-colored Bars) */}
      <div className="flex items-end gap-1.5 h-16 my-5">
        {flowArr.map((val, i) => {
          const max = Math.max(...flowArr);
          const height = (val / max) * 100;
          return (
            <div 
              key={i} 
              className={`w-full rounded-t-md transition-all duration-700 ${themeConfig.bg}`}
              style={{ 
                height: `${height}%`, 
                opacity: 0.2 + (i / flowArr.length) * 0.8 // Creates a nice gradient fade
              }}
            ></div>
          );
        })}
      </div>

      {/* Bottom Section: Description and Detail Button */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${themeConfig.light} ${themeConfig.text}`}>
            {isPositive ? <MdTrendingUp size={20} /> : <MdTrendingDown size={20} />}
          </div>
          <p className="text-[11px] text-slate-500 leading-tight max-w-[120px]">
            {description}
          </p>
        </div>

        {/* Detail Button */}
        <button className={`flex items-center gap-1 text-xs font-bold py-2 px-3 rounded-xl transition-all ${themeConfig.light} ${themeConfig.text} hover:shadow-sm active:scale-95`}>
          Details
          <MdChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default FlowCard;