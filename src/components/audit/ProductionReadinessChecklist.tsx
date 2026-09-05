import React, { useState } from 'react';
import { CheckSquare, Square, ShieldCheck, AlertCircle, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  priority: 'P0 - Blocker' | 'P1 - Critical' | 'P2 - Important' | 'P3 - Enhancement';
  effort: 'Low' | 'Medium' | 'High';
  description: string;
  defaultChecked: boolean;
}

export const ProductionReadinessChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: 'p0-mock',
      category: 'Security & Build',
      title: 'Strip Mock Service Worker / Axios Mock Adapter from Production Bundle',
      priority: 'P0 - Blocker',
      effort: 'Low',
      description: 'Ensure axios-mock-adapter is gated behind import.meta.env.DEV so test credentials and mock JSON are not exposed in public bundle.',
      defaultChecked: true
    },
    {
      id: 'p0-tokens',
      category: 'Security & Build',
      title: 'Migrate JWT Service Token from LocalStorage to HttpOnly Cookies',
      priority: 'P0 - Blocker',
      effort: 'Medium',
      description: 'Berry defaults to localStorage.setItem("serviceToken"), leaving tokens vulnerable to Cross-Site Scripting (XSS) extraction.',
      defaultChecked: false
    },
    {
      id: 'p1-chart-lazy',
      category: 'Performance',
      title: 'Lazy-load ApexCharts with React.lazy() and Skeleton Placeholders',
      priority: 'P1 - Critical',
      effort: 'Low',
      description: 'Isolate the 480KB ApexCharts dependency into a separate vendor chunk so it does not delay First Contentful Paint (FCP).',
      defaultChecked: false
    },
    {
      id: 'p1-query-cache',
      category: 'API & State',
      title: 'Implement TanStack Query (React Query) for Metric Caching & Deduplication',
      priority: 'P1 - Critical',
      effort: 'Medium',
      description: 'Replace raw useEffect fetching with automated cache invalidation, background revalidation, and AbortController cancellation.',
      defaultChecked: false
    },
    {
      id: 'p1-token-refresh',
      category: 'API & State',
      title: 'Implement Automated 401 Silent Token Refresh Interceptor Queue',
      priority: 'P1 - Critical',
      effort: 'Medium',
      description: 'Prevents mass session expiration when JWT short-lived access token expires during active dashboard sessions.',
      defaultChecked: false
    },
    {
      id: 'p2-emotion-mig',
      category: 'Performance',
      title: 'Evaluate MUI Pigment CSS or Tailwind CSS v4 Migration',
      priority: 'P2 - Important',
      effort: 'High',
      description: 'Eliminates 114KB Emotion runtime and avoids runtime style injection overhead during client hydration.',
      defaultChecked: false
    },
    {
      id: 'p2-touch-targets',
      category: 'Accessibility & UX',
      title: 'Enlarge Touch Targets for Mobile Pills and Dropdowns to >= 44px',
      priority: 'P2 - Important',
      effort: 'Low',
      description: 'Achieve WCAG 2.1 AA mobile touch target compliance on Month/Year filter chips and table pagination buttons.',
      defaultChecked: false
    },
    {
      id: 'p2-error-boundary',
      category: 'Reliability',
      title: 'Add Granular Card-Level React Error Boundaries',
      priority: 'P2 - Important',
      effort: 'Low',
      description: 'Wrap individual widgets (<EarningCard>, <TotalGrowthBarChart>) in ErrorBoundary so a single failed chart does not crash the entire dashboard.',
      defaultChecked: true
    },
    {
      id: 'p3-fsd',
      category: 'Architecture',
      title: 'Transition from Layered Structure to Feature-Sliced Design (FSD)',
      priority: 'P3 - Enhancement',
      effort: 'High',
      description: 'Group components, queries, and types by business domain (e.g. features/analytics, features/billing) for multi-team scale.',
      defaultChecked: false
    },
  ]);

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    items.forEach(item => { map[item.id] = item.defaultChecked; });
    return map;
  });

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Production Deployment Roadmap</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Berry Enterprise Production Hardening Checklist</h2>
            <p className="text-xs text-slate-500">
              Senior engineering roadmap to take Berry from prototype template to enterprise-grade production reliability.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center gap-4 shrink-0">
            <div>
              <div className="text-xs font-bold text-slate-700">Readiness Progress</div>
              <div className="text-xs text-slate-400">{completedCount} of {items.length} Tasks Complete</div>
            </div>
            <div className="text-2xl font-black text-purple-700 font-mono">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {items.map((item) => {
          const isChecked = !!checkedIds[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                isChecked 
                  ? 'bg-slate-50/80 border-slate-200 opacity-80' 
                  : 'bg-white border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-sm'
              }`}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); toggleCheck(item.id); }}
                className="mt-0.5 text-purple-600 focus:outline-none"
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-bold ${isChecked ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {item.title}
                  </span>
                  
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                    item.priority.startsWith('P0') 
                      ? 'bg-rose-100 text-rose-800' 
                      : item.priority.startsWith('P1') 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.priority}
                  </span>

                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    Effort: {item.effort}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
