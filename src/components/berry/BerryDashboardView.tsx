import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShoppingBag, 
  Store, 
  ChevronDown, 
  CreditCard,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeConfig } from '../../types';

interface BerryDashboardViewProps {
  themeConfig: ThemeConfig;
}

export const BerryDashboardView: React.FC<BerryDashboardViewProps> = ({
  themeConfig,
}) => {
  const [orderPeriod, setOrderPeriod] = useState<'month' | 'year'>('month');
  const [growthFilter, setGrowthFilter] = useState<'Today' | 'This Month' | 'This Year'>('Today');
  const [animCounter, setAnimCounter] = useState<number>(0);
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number | null>(null);

  // Exact 12 monthly stacked bar data matching Berry Dashboard
  const monthlyData = [
    { month: 'Jan', investment: 35, loss: 20, profit: 45, maintenance: 15 },
    { month: 'Feb', investment: 50, loss: 30, profit: 55, maintenance: 20 },
    { month: 'Mar', investment: 40, loss: 25, profit: 40, maintenance: 15 },
    { month: 'Apr', investment: 60, loss: 35, profit: 70, maintenance: 25 },
    { month: 'May', investment: 45, loss: 20, profit: 50, maintenance: 20 },
    { month: 'Jun', investment: 70, loss: 40, profit: 80, maintenance: 30 },
    { month: 'Jul', investment: 85, loss: 45, profit: 90, maintenance: 35 },
    { month: 'Aug', investment: 60, loss: 30, profit: 65, maintenance: 25 },
    { month: 'Sep', investment: 75, loss: 35, profit: 80, maintenance: 30 },
    { month: 'Oct', investment: 95, loss: 50, profit: 100, maintenance: 40 },
    { month: 'Nov', investment: 80, loss: 40, profit: 85, maintenance: 35 },
    { month: 'Dec', investment: 110, loss: 55, profit: 115, maintenance: 45 },
  ];

  const stocks = [
    { name: 'Bajaj Finserv', price: '$1839.00', change: '10% Profit', isGain: true },
    { name: 'TTML', price: '$100.00', change: '10% Loss', isGain: false },
    { name: 'Reliance', price: '$200.00', change: '10% Profit', isGain: true },
    { name: 'TTML', price: '$189.00', change: '10% Loss', isGain: false },
    { name: 'Stolon', price: '$189.00', change: '10% Loss', isGain: false },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {/* ============================================================ */}
      {/* ROW 1: TOP 3-COLUMN METRIC CARDS (Exact Berry Screenshot 1) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        
        {/* CARD 1 (Span 4): TOTAL EARNING ($500.00, Purple Gradient) */}
        <div
          id="berry-card-earning"
          className="lg:col-span-4 relative overflow-hidden bg-gradient-to-br from-[#5e35b1] to-[#4527a0] text-white p-5 rounded-2xl shadow-xs flex flex-col justify-between h-[200px]"
        >
          {/* Concentric Circle Watermarks */}
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -right-4 -bottom-10 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />

          {/* Top Row: Credit Cards Icon on left, ... Menu on right */}
          <div className="flex items-center justify-between relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#4527a0]/80 flex items-center justify-center text-white shadow-xs">
              <CreditCard className="w-5 h-5" />
            </div>
            <button className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Row: Number & Subtitle */}
          <div className="relative z-10 space-y-1 mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold tracking-tight">$500.00</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs font-medium text-purple-200">Total Earning</p>
          </div>
        </div>

        {/* CARD 2 (Span 4): TOTAL ORDER ($961, Blue Gradient with Month/Year toggle) */}
        <div
          id="berry-card-order"
          className="lg:col-span-4 relative overflow-hidden bg-gradient-to-br from-[#1e88e5] to-[#1565c0] text-white p-5 rounded-2xl shadow-xs flex flex-col justify-between h-[200px]"
        >
          {/* Concentric Circle Watermarks */}
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -right-4 -top-10 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />

          {/* Top Row: Shopping Bag on left, Month/Year toggle on right */}
          <div className="flex items-center justify-between relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#1565c0]/80 flex items-center justify-center text-white shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex items-center bg-white/10 p-1 rounded-xl">
              <button
                onClick={() => setOrderPeriod('month')}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
                  orderPeriod === 'month' ? 'bg-[#1565c0] text-white shadow-xs' : 'text-blue-100 hover:text-white'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setOrderPeriod('year')}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
                  orderPeriod === 'year' ? 'bg-[#1565c0] text-white shadow-xs' : 'text-blue-100 hover:text-white'
                }`}
              >
                Year
              </button>
            </div>
          </div>

          {/* Bottom Row: Number & Sparkline Wave */}
          <div className="relative z-10 space-y-1 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold tracking-tight">
                  {orderPeriod === 'month' ? '$961' : '$10,480'}
                </span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </div>
              </div>
              
              {/* Micro wave sparkline with smooth entrance animation */}
              <div className="w-24 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    d="M 0,25 Q 25,5 50,18 T 100,5"
                    fill="none"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs font-medium text-blue-100">Total Order</p>
          </div>
        </div>

        {/* CARD 3 (Span 4): STACK OF TWO TOTAL INCOME CARDS ($203k Blue, $203k Light) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4 h-[200px]">
          
          {/* Top Card: Blue Total Income */}
          <div className="bg-[#1e88e5] text-white p-4 rounded-2xl shadow-xs flex items-center justify-between flex-1 relative overflow-hidden">
            {/* Wave decoration on right */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#1565c0] flex items-center justify-center text-white shadow-xs">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight leading-tight">$203k</span>
                <p className="text-xs text-blue-100 font-medium">Total Income</p>
              </div>
            </div>
          </div>

          {/* Bottom Card: White Total Income with Yellow Icon */}
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex items-center justify-between flex-1 relative overflow-hidden">
            {/* Soft wave decoration on right */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#fff8e1]/60 pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#fff8e1] flex items-center justify-center text-[#ffa000] shadow-xs">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-800 leading-tight">$203k</span>
                <p className="text-xs text-slate-400 font-medium">Total Income</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* ROW 2: TOTAL GROWTH BAR CHART + POPULAR STOCKS LIST           */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* TOTAL GROWTH BAR CHART (Span 8) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          
          {/* Header & Filter Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-400">Total Growth</p>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">$2,324.00</h2>
            </div>

            {/* Dropdown Filter & Replay Animation Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAnimCounter(c => c + 1)}
                title="Replay upward graph animation"
                className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-[#5e35b1] hover:bg-[#ede7f6]/50 transition-all flex items-center justify-center cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="relative">
                <button 
                  onClick={() => {
                    setGrowthFilter(prev => prev === 'Today' ? 'This Month' : 'Today');
                    setAnimCounter(c => c + 1);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <span>{growthFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Stacked Column Bar Chart (Jan - Dec) */}
          <div className="mt-6 h-72 w-full flex flex-col justify-end">
            <div className="h-56 w-full flex items-end justify-between gap-1.5 sm:gap-3 px-1 relative">
              {monthlyData.map((item, idx) => {
                const total = item.investment + item.loss + item.profit + item.maintenance;
                const hPercent = (total / 330) * 100;

                const invH = (item.investment / total) * 100;
                const lossH = (item.loss / total) * 100;
                const profH = (item.profit / total) * 100;
                const mainH = (item.maintenance / total) * 100;

                return (
                  <div 
                    key={idx} 
                    className="flex-1 flex flex-col items-center h-full justify-end group relative"
                    onMouseEnter={() => setHoveredMonthIdx(idx)}
                    onMouseLeave={() => setHoveredMonthIdx(null)}
                  >
                    {/* Interactive Floating Tooltip on Hover */}
                    {hoveredMonthIdx === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-[calc(100%+8px)] z-40 bg-slate-900/95 text-white text-[11px] p-2.5 rounded-xl shadow-xl backdrop-blur-xs min-w-[125px] pointer-events-none"
                      >
                        <div className="font-bold border-b border-slate-700 pb-1 mb-1.5 flex justify-between items-center">
                          <span>{item.month}</span>
                          <span className="text-emerald-400 font-bold">${total}</span>
                        </div>
                        <div className="space-y-1 text-[10px]">
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#ede7f6]" /> Maint</span>
                            <span className="font-semibold text-white">${item.maintenance}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#5e35b1]" /> Profit</span>
                            <span className="font-semibold text-white">${item.profit}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1e88e5]" /> Loss</span>
                            <span className="font-semibold text-white">${item.loss}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#90caf9]" /> Invest</span>
                            <span className="font-semibold text-white">${item.investment}</span>
                          </div>
                        </div>
                        <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                      </motion.div>
                    )}

                    {/* Stacked Bar rising up smoothly from bottom */}
                    <motion.div 
                      key={`${growthFilter}-${idx}-${animCounter}`}
                      initial={{ height: '0%', opacity: 0 }}
                      animate={{ height: `${hPercent}%`, opacity: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: idx * 0.045, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                      className="w-full max-w-[28px] rounded-t-md overflow-hidden flex flex-col justify-end transition-shadow duration-200 group-hover:shadow-md cursor-pointer"
                    >
                      {/* 1. Maintenance (Light lavender top) */}
                      <div className="w-full bg-[#ede7f6]" style={{ height: `${mainH}%` }} />
                      {/* 2. Profit (Royal purple) */}
                      <div className="w-full bg-[#5e35b1]" style={{ height: `${profH}%` }} />
                      {/* 3. Loss (Deep blue) */}
                      <div className="w-full bg-[#1e88e5]" style={{ height: `${lossH}%` }} />
                      {/* 4. Investment (Sky blue bottom) */}
                      <div className="w-full bg-[#90caf9]" style={{ height: `${invH}%` }} />
                    </motion.div>

                    <span className="text-[11px] font-medium text-slate-400 mt-2 group-hover:text-slate-800 transition-colors">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend (Exact colors from Image 1 & 2) */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#90caf9]" />
                <span>Investment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#1e88e5]" />
                <span>Loss</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#5e35b1]" />
                <span>Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#ede7f6]" />
                <span>Maintenance</span>
              </div>
            </div>
          </div>
        </div>

        {/* POPULAR STOCKS (Span 4) */}
        <div className="lg:col-span-4 bg-white border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800">Popular Stocks</h2>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Featured Stock Card: Bajaj Finery */}
            <div className="mt-4 p-4 rounded-xl bg-[#ede7f6] relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h3 className="text-xs font-bold text-[#5e35b1]">Bajaj Finery</h3>
                  <span className="inline-block text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5">
                    10% Profit
                  </span>
                </div>
                <span className="text-sm font-bold text-[#5e35b1]">$1839.00</span>
              </div>

              {/* Smooth Purple Area Wave Chart with entrance animation */}
              <div className="mt-3 h-10 w-full relative z-10">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
                  <motion.path
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ transformOrigin: "bottom" }}
                    d="M 0,25 Q 25,5 50,20 T 100,10 L 100,30 L 0,30 Z"
                    fill="rgba(94, 53, 177, 0.2)"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
                    d="M 0,25 Q 25,5 50,20 T 100,10"
                    fill="none"
                    stroke="#5e35b1"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* List of other stocks */}
            <div className="divide-y divide-slate-100 mt-2">
              {stocks.map((stock, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{stock.name}</p>
                    <span 
                      className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
                        stock.isGain ? 'text-emerald-600' : 'text-rose-500'
                      }`}
                    >
                      {stock.isGain ? (
                        <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-rose-500" />
                      )}
                      {stock.change}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-800">{stock.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Centered View All Link */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <button className="text-xs font-semibold text-[#1e88e5] hover:underline flex items-center justify-center gap-1 mx-auto">
              <span>View All</span>
              <span>&gt;</span>
            </button>
          </div>
        </div>

      </div>

      {/* CodedThemes Footer (Exact Berry style from Image 1 & 2) */}
      <footer className="pt-6 pb-2 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© All rights reserved <span className="text-[#5e35b1] font-semibold cursor-pointer">CodedThemes</span></p>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#" className="hover:text-slate-800 transition-colors">License</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Hire us</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Figma Design System</a>
        </div>
      </footer>
    </div>
  );
};
