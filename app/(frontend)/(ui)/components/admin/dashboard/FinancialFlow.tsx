"use client";

import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { MdTimeline, MdFileDownload } from 'react-icons/md';

interface DataPoint {
  name: string;
  income: number;
  expense: number;
}

interface DataSet {
  [key: string]: DataPoint[];
}

// Mock Data for different periods
const dataSets: DataSet = {
  Week: [
    { name: 'Mon', income: 4000, expense: 2400 },
    { name: 'Tue', income: 3000, expense: 1398 },
    { name: 'Wed', income: 2000, expense: 9800 },
    { name: 'Thu', income: 2780, expense: 3908 },
    { name: 'Fri', income: 1890, expense: 4800 },
    { name: 'Sat', income: 2390, expense: 3800 },
    { name: 'Sun', income: 3490, expense: 4300 },
  ],
  Month: [
    { name: 'Week 1', income: 15000, expense: 12000 },
    { name: 'Week 2', income: 22000, expense: 18000 },
    { name: 'Week 3', income: 18000, expense: 21000 },
    { name: 'Week 4', income: 25000, expense: 17000 },
  ],
  Year: [
    { name: 'Jan', income: 45000, expense: 32000 },
    { name: 'Feb', income: 52000, expense: 38000 },
    { name: 'Mar', income: 48000, expense: 41000 },
    { name: 'Apr', income: 61000, expense: 45000 },
    { name: 'May', income: 55000, expense: 49000 },
    { name: 'Jun', income: 68000, expense: 52000 },
  ]
};

const FinancialFlow: React.FC = () => {
  const [period, setPeriod] = useState<string>('Month');

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <MdTimeline size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Financial Flow</h2>
          </div>
          <p className="text-sm text-slate-500">Comparison between Income and Expense</p>
        </div>

        {/* Period Switcher */}
        <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200">
          {['Week', 'Month', 'Year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                period === p 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataSets[period]}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 12}}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 12}}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" height={36}/>
            
            <Area 
              type="monotone" 
              dataKey="income" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorIncome)" 
              name="Income"
            />
            <Area 
              type="monotone" 
              dataKey="expense" 
              stroke="#ef4444" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorExpense)" 
              name="Expense"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialFlow;