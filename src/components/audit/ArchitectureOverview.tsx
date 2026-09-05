import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Zap, 
  GitBranch, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { ARCHITECTURAL_ANALYSIS_MARKDOWN, DIRECTORY_STRUCTURE } from '../../data/berryAnalysisData';

export const ArchitectureOverview: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const copyReport = () => {
    navigator.clipboard.writeText(ARCHITECTURAL_ANALYSIS_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReport = () => {
    const blob = new Blob([ARCHITECTURAL_ANALYSIS_MARKDOWN], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Berry_Dashboard_Architecture_Audit_Senior_Dev.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const scorecards = [
    { title: 'Layout & Spatial Design', score: 92, status: 'Production Ready', desc: 'MUI 12-col grid, fluid drawer, and strict padding cadence.', color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Component Reusability', score: 88, status: 'High Quality', desc: 'Strong MainCard & SubCard primitives; clear theme overrides.', color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Architecture Modularity', score: 85, status: 'Solid Boilerplate', desc: 'Clear layout/routes/views separation; Loadable code-splitting.', color: 'text-purple-600 bg-purple-50' },
    { title: 'API Integration Flow', score: 79, status: 'Needs Hardening', desc: 'Good Axios interceptor; lacks 401 retry queue & AbortController.', color: 'text-amber-600 bg-amber-50' },
    { title: 'State Management Balance', score: 76, status: 'Refactor Advised', desc: 'Redux overused for simple UI toggles (drawer, theme colors).', color: 'text-amber-600 bg-amber-50' },
    { title: 'Runtime Performance', score: 71, status: 'Optimization Needed', desc: 'Emotion CSS-in-JS runtime + monolithic ApexCharts chunk.', color: 'text-rose-600 bg-rose-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Senior Developer Verdict */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Senior Staff Architect Audit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Berry React Dashboard Architecture Report
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Berry Dashboard (CodedThemes) is an outstanding, design-driven Material-UI v5 admin template. 
              While visually exceptional, taking it to high-scale production requires addressing runtime CSS-in-JS overhead, 
              modernizing client state with lightweight stores, and upgrading API data fetching with TanStack Query.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={copyReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Full Markdown'}</span>
            </button>
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download .md Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scorecards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Senior Audit Dimension Scores</h3>
          <span className="text-xs font-bold text-slate-500">Overall Benchmark: 82 / 100</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scorecards.map((sc, idx) => (
            <div 
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{sc.title}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sc.color}`}>
                  {sc.status}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">{sc.score}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                {sc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Stack Comparison Table (Berry Default vs Recommended Enterprise 2026) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Architecture Evolutionary Roadmap: Berry vs Production Enterprise</h3>
          <p className="text-xs text-slate-500 mt-0.5">How senior engineering teams adapt Berry for billion-request scale</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                <th className="py-3 pl-2">System Layer</th>
                <th className="py-3">Berry Default (Current)</th>
                <th className="py-3">Senior Enterprise Refactor</th>
                <th className="py-3 pr-2">Architectural Payoff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 pl-2 font-bold text-slate-800">Styling Engine</td>
                <td className="py-3.5 text-rose-700 bg-rose-50/50 px-2 rounded font-mono text-[11px]">Emotion CSS-in-JS (114KB)</td>
                <td className="py-3.5 text-emerald-700 bg-emerald-50/50 px-2 rounded font-mono text-[11px]">Tailwind CSS v4 or Pigment CSS</td>
                <td className="py-3.5 text-slate-600">Zero runtime style calculation; saves ~70ms main-thread parse time</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 pl-2 font-bold text-slate-800">Client State</td>
                <td className="py-3.5 text-amber-700 bg-amber-50/50 px-2 rounded font-mono text-[11px]">Redux Toolkit (for UI drawers)</td>
                <td className="py-3.5 text-emerald-700 bg-emerald-50/50 px-2 rounded font-mono text-[11px]">Zustand (3KB store)</td>
                <td className="py-3.5 text-slate-600">Eliminates provider wrappers, selective selector subscriptions</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 pl-2 font-bold text-slate-800">Server Data / Cache</td>
                <td className="py-3.5 text-amber-700 bg-amber-50/50 px-2 rounded font-mono text-[11px]">Naive Axios in useEffect + Mock</td>
                <td className="py-3.5 text-emerald-700 bg-emerald-50/50 px-2 rounded font-mono text-[11px]">TanStack Query v5 (React Query)</td>
                <td className="py-3.5 text-slate-600">Automatic background revalidation, query deduping, AbortController cancellation</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 pl-2 font-bold text-slate-800">Chart Delivery</td>
                <td className="py-3.5 text-rose-700 bg-rose-50/50 px-2 rounded font-mono text-[11px]">Synchronous ApexCharts (480KB)</td>
                <td className="py-3.5 text-emerald-700 bg-emerald-50/50 px-2 rounded font-mono text-[11px]">Dynamic React.lazy() + Suspense</td>
                <td className="py-3.5 text-slate-600">Prevents heavy chart library from delaying the initial FCP/LCP metric</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 pl-2 font-bold text-slate-800">Application Routing</td>
                <td className="py-3.5 text-slate-700 font-mono text-[11px]">React Router v6 SPA</td>
                <td className="py-3.5 text-emerald-700 bg-emerald-50/50 px-2 rounded font-mono text-[11px]">Next.js App Router (RSC)</td>
                <td className="py-3.5 text-slate-600">Server-side rendered skeleton shells, zero client JS for static layout chrome</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Directory & Modular Architecture Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Berry Modular Directory Anatomy</h3>
            <p className="text-xs text-slate-500">Structural folder pattern implemented by CodedThemes</p>
          </div>
          <span className="text-xs font-mono text-purple-700 bg-purple-50 px-2 py-1 rounded-md font-bold">
            Layer-First Architecture
          </span>
        </div>

        <div className="bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-xl overflow-x-auto border border-slate-800">
          <pre>{DIRECTORY_STRUCTURE}</pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Architectural Strengths</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              Decoupling menu items into <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">src/menu-items/</code> makes role-based access control (RBAC) filtering trivial. The <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">Loadable</code> Suspense pattern avoids monolithic bundles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Enterprise Scaling Consideration</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              For teams exceeding 15 developers, migrate from this layer-driven structure (<code className="text-slate-700">views/</code>, <code className="text-slate-700">store/</code>) to a <strong>Feature-Sliced Design (FSD)</strong> where domain logic, APIs, and components live together in self-contained feature slices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
