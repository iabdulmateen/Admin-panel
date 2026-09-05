import React from 'react';
import { X, Layers, Cpu, Package, Sparkles, Layout, Database } from 'lucide-react';
import { ComponentInspection } from '../../types';
import { INSPECTION_ITEMS } from '../../data/berryAnalysisData';

interface InspectorHUDProps {
  selectedId: string | null;
  onClose: () => void;
}

export const InspectorHUD: React.FC<InspectorHUDProps> = ({ selectedId, onClose }) => {
  if (!selectedId || !INSPECTION_ITEMS[selectedId]) return null;

  const item: ComponentInspection = INSPECTION_ITEMS[selectedId];

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-md w-full bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-slate-700/60 p-5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{item.name}</span>
              <span className="text-[10px] font-mono font-normal bg-purple-900/60 text-purple-300 px-1.5 py-0.5 rounded">
                {item.category}
              </span>
            </h4>
            <p className="text-[11px] font-mono text-slate-400">{item.muiEquivalent}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2 my-3">
        <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/50">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold">
            <Cpu className="w-3 h-3 text-amber-400" />
            <span>Render Cost</span>
          </div>
          <p className={`text-xs font-bold mt-1 ${
            item.renderCost === 'Low' ? 'text-emerald-400' : item.renderCost === 'Medium' ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {item.renderCost}
          </p>
        </div>

        <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/50">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold">
            <Package className="w-3 h-3 text-cyan-400" />
            <span>Bundle Impact</span>
          </div>
          <p className="text-xs font-mono font-bold text-cyan-300 mt-1">
            {item.bundleImpact}
          </p>
        </div>
      </div>

      {/* Responsive behavior & Notes */}
      <div className="space-y-2 text-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Layout className="w-3 h-3 text-indigo-400" />
            <span>Responsive Grid Pattern</span>
          </span>
          <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed bg-slate-800/30 p-2 rounded-lg">
            {item.responsiveBehavior}
          </p>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Senior Architect Insights</span>
          </span>
          <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
            {item.notes}
          </p>
        </div>

        {item.stateDeps.length > 0 && (
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>State / Hook Dependencies</span>
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {item.stateDeps.map((dep, idx) => (
                <span key={idx} className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                  {dep}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
