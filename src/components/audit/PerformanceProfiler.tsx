import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle2, TrendingDown, Cpu, ArrowUpRight, HardDrive, RefreshCw } from 'lucide-react';
import { CORE_WEB_VITALS, BUNDLE_BREAKDOWN } from '../../data/berryAnalysisData';

export const PerformanceProfiler: React.FC = () => {
  const [selectedBundle, setSelectedBundle] = useState<string>(BUNDLE_BREAKDOWN[0].name);

  const activeBundleItem = BUNDLE_BREAKDOWN.find(b => b.name === selectedBundle) || BUNDLE_BREAKDOWN[0];
  const totalRawKb = BUNDLE_BREAKDOWN.reduce((acc, curr) => acc + curr.sizeKb, 0);
  const totalGzipKb = BUNDLE_BREAKDOWN.reduce((acc, curr) => acc + curr.gzipKb, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>Runtime & Bundle Performance Profiler</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Berry Core Web Vitals & Bundle Diagnostics</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          An in-depth performance audit measuring Berry's initial payload weight, Emotion CSS-in-JS style injection cost, 
          and third-party chart library impact on modern mobile CPUs and throttled network conditions.
        </p>
      </div>

      {/* Core Web Vitals Gauges */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Synthetic Core Web Vitals Audit (Mobile 4G Throttled)</h3>
          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Chrome DevTools Simulation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CORE_WEB_VITALS.map((metric, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{metric.label.split('(')[0]}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                  metric.status === 'optimal' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {metric.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {metric.metric}
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      metric.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                {metric.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bundle Size Breakdown Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Vendor Bundle Distribution & Treemap Breakdown</h3>
            <p className="text-xs text-slate-500">
              Total Client Payload: <span className="font-mono font-bold text-slate-800">{totalRawKb} KB uncompressed</span> ({totalGzipKb} KB gzipped)
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Target: &lt; 200 KB Gzip for Enterprise LCP &lt; 1.8s
          </div>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="space-y-2">
          <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner bg-slate-100">
            {BUNDLE_BREAKDOWN.map((item) => {
              const pct = (item.sizeKb / totalRawKb) * 100;
              return (
                <div
                  key={item.name}
                  onClick={() => setSelectedBundle(item.name)}
                  className="h-full transition-all hover:opacity-80 cursor-pointer relative group"
                  style={{ width: `${pct}%`, backgroundColor: item.color }}
                  title={`${item.name}: ${item.sizeKb} KB`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 text-[11px] text-slate-600 pt-1">
            {BUNDLE_BREAKDOWN.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedBundle(item.name)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all ${
                  selectedBundle === item.name 
                    ? 'border-slate-800 bg-slate-900 text-white font-bold' 
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span>{item.name.split('/')[0]}</span>
                <span className="font-mono text-[10px] opacity-80">{item.gzipKb}k gz</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Selected Package Diagnostic Card */}
        <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">Package Diagnostic</span>
              <h4 className="text-base font-bold font-mono text-white">{activeBundleItem.name}</h4>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div>Raw: <span className="text-purple-300 font-bold">{activeBundleItem.sizeKb} KB</span></div>
              <div>Gzip: <span className="text-cyan-300 font-bold">{activeBundleItem.gzipKb} KB</span></div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Senior Architectural Optimization Advice</span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {activeBundleItem.optimizationAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* Emotion CSS-in-JS vs Zero-Runtime Deep-Dive */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Emotion CSS-in-JS Runtime vs Zero-Runtime Architecture</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Why top engineering organizations are migrating away from Emotion-based MUI in favor of zero-runtime styling engines like Tailwind CSS v4 or MUI Pigment CSS:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-800">
              <AlertTriangle className="w-4 h-4" />
              <span>Berry's Current Stack (Emotion v11)</span>
            </div>
            <ul className="space-y-1.5 text-rose-900/90 list-disc list-inside leading-relaxed text-[11px]">
              <li><strong>Runtime Tag Injection:</strong> Injects thousands of <code className="bg-rose-100 px-1 py-0.5 rounded">&lt;style&gt;</code> tags into DOM at runtime.</li>
              <li><strong>Main Thread Blocking:</strong> Evaluates CSS hashes on every re-render, consuming 60ms - 90ms CPU cycles on mid-range Android devices.</li>
              <li><strong>SSR Incompatibility:</strong> Emotion generates inconsistent hydration classnames without complex cache sync.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              <span>Modern Zero-Runtime (Tailwind v4 / Pigment CSS)</span>
            </div>
            <ul className="space-y-1.5 text-emerald-900/90 list-disc list-inside leading-relaxed text-[11px]">
              <li><strong>0 KB JavaScript Engine:</strong> All CSS is extracted at build time by Vite, eliminating the 114KB Emotion runtime completely.</li>
              <li><strong>Instant LCP:</strong> Browser parses pure static CSS via standard stylesheet caching without JS hydration delays.</li>
              <li><strong>Fluid Theme Variables:</strong> CSS Custom Properties allow instant dark/light/radius switching without React re-renders.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
