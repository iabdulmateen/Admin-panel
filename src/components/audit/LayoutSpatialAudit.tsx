import React, { useState } from 'react';
import { Layout, Maximize2, Monitor, Tablet, Smartphone, CheckCircle, AlertTriangle, Layers, Grid } from 'lucide-react';

export const LayoutSpatialAudit: React.FC = () => {
  const [selectedBreakpoint, setSelectedBreakpoint] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('lg');

  const breakpointData = {
    xs: {
      range: '< 600px',
      drawer: 'Temporary overlay (Modal with Backdrop)',
      metricCols: '1 column (100% width, xs={12})',
      growthChartSpan: '100% width (xs={12})',
      stocksCardSpan: '100% width (xs={12}, stacked underneath)',
      padding: '16px (p: 2)',
      touchAudit: 'FAIL - Some chart filter pills have height 32px (< 44px minimum target)',
    },
    sm: {
      range: '600px - 899px',
      drawer: 'Temporary overlay (drawer width: 260px)',
      metricCols: '2 columns (sm={6})',
      growthChartSpan: '100% width (sm={12})',
      stocksCardSpan: '100% width (sm={12})',
      padding: '24px (p: 3)',
      touchAudit: 'PASS - Adequate spacing between stacked elements',
    },
    md: {
      range: '900px - 1199px',
      drawer: 'Temporary or Mini-variant depending on route',
      metricCols: '2 columns (md={6})',
      growthChartSpan: '8 columns (md={8} - ~66.6% width)',
      stocksCardSpan: '4 columns (md={4} - ~33.3% width)',
      padding: '24px (p: 3)',
      touchAudit: 'PASS',
    },
    lg: {
      range: '1200px - 1535px',
      drawer: 'Persistent Sidebar (260px width, content canvas computed dynamically)',
      metricCols: '3 to 4 columns (lg={4} / lg={3})',
      growthChartSpan: '8 columns (lg={8})',
      stocksCardSpan: '4 columns (lg={4})',
      padding: '24px (p: 3)',
      touchAudit: 'PASS - Standard desktop mouse pointer interactions',
    },
    xl: {
      range: '>= 1536px',
      drawer: 'Persistent Sidebar with optional floating layout container',
      metricCols: '4 columns (xl={3})',
      growthChartSpan: '8 columns (xl={8})',
      stocksCardSpan: '4 columns (xl={4})',
      padding: '24px to 32px (p: 3 to 4)',
      touchAudit: 'PASS',
    },
  };

  const current = breakpointData[selectedBreakpoint];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider">
          <Layout className="w-4 h-4" />
          <span>Spatial & Responsive Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Berry 12-Column Layout Engine & Spatial Math</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          Berry is built on Material-UI's Flexbox-based <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-purple-700">&lt;Grid container spacing=&#123;3&#125;&gt;</code>. 
          Its spatial layout transitions across 5 key responsive tiers, adapting both the navigation drawer and dashboard cards dynamically.
        </p>
      </div>

      {/* Breakpoint Matrix Interactive Sandbox */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">MUI Breakpoint Simulator</h3>
            <p className="text-xs text-slate-500">Select a viewport breakpoint to inspect Berry's spatial adaptations</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((bp) => (
              <button
                key={bp}
                onClick={() => setSelectedBreakpoint(bp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                  selectedBreakpoint === bp
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {bp}
              </button>
            ))}
          </div>
        </div>

        {/* Viewport Visualization Preview Box */}
        <div className="border border-dashed border-slate-300 rounded-2xl p-4 bg-slate-50/70 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-mono font-bold text-purple-700">Breakpoint: {selectedBreakpoint.toUpperCase()} ({current.range})</span>
            <span className="flex items-center gap-1.5 font-medium">
              {selectedBreakpoint === 'xs' && <Smartphone className="w-4 h-4 text-slate-500" />}
              {selectedBreakpoint === 'sm' && <Tablet className="w-4 h-4 text-slate-500" />}
              {(selectedBreakpoint === 'md' || selectedBreakpoint === 'lg' || selectedBreakpoint === 'xl') && <Monitor className="w-4 h-4 text-slate-500" />}
              <span>Simulated Device Viewport</span>
            </span>
          </div>

          {/* Grid Layout Diagram */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Top Metric Cards Grid Distribution</div>
            <div className="grid grid-cols-12 gap-2 text-center text-xs font-mono font-bold">
              {selectedBreakpoint === 'xs' ? (
                <>
                  <div className="col-span-12 bg-purple-600 text-white p-3 rounded-lg shadow-xs">EarningCard (12 cols - 100%)</div>
                  <div className="col-span-12 bg-blue-600 text-white p-3 rounded-lg shadow-xs">TotalOrderCard (12 cols - 100%)</div>
                  <div className="col-span-12 bg-purple-800 text-white p-3 rounded-lg shadow-xs">TotalIncomeDark (12 cols - 100%)</div>
                  <div className="col-span-12 bg-white border border-slate-300 text-slate-800 p-3 rounded-lg shadow-xs">TotalIncomeLight (12 cols - 100%)</div>
                </>
              ) : selectedBreakpoint === 'sm' || selectedBreakpoint === 'md' ? (
                <>
                  <div className="col-span-6 bg-purple-600 text-white p-3 rounded-lg shadow-xs">EarningCard (6 cols - 50%)</div>
                  <div className="col-span-6 bg-blue-600 text-white p-3 rounded-lg shadow-xs">TotalOrderCard (6 cols - 50%)</div>
                  <div className="col-span-6 bg-purple-800 text-white p-3 rounded-lg shadow-xs">TotalIncomeDark (6 cols - 50%)</div>
                  <div className="col-span-6 bg-white border border-slate-300 text-slate-800 p-3 rounded-lg shadow-xs">TotalIncomeLight (6 cols - 50%)</div>
                </>
              ) : (
                <>
                  <div className="col-span-3 bg-purple-600 text-white p-3 rounded-lg shadow-xs">Earning (3 cols)</div>
                  <div className="col-span-3 bg-blue-600 text-white p-3 rounded-lg shadow-xs">TotalOrder (3 cols)</div>
                  <div className="col-span-3 bg-purple-800 text-white p-3 rounded-lg shadow-xs">IncomeDark (3 cols)</div>
                  <div className="col-span-3 bg-white border border-slate-300 text-slate-800 p-3 rounded-lg shadow-xs">IncomeLight (3 cols)</div>
                </>
              )}
            </div>
          </div>

          {/* Row 2 Grid Diagram */}
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Analytics & Stock Widget Distribution</div>
            <div className="grid grid-cols-12 gap-2 text-center text-xs font-mono font-bold">
              {selectedBreakpoint === 'xs' || selectedBreakpoint === 'sm' ? (
                <>
                  <div className="col-span-12 bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-lg">
                    TotalGrowthBarChart (12 cols - Full Width)
                  </div>
                  <div className="col-span-12 bg-slate-100 border border-slate-300 text-slate-800 p-3 rounded-lg">
                    PopularStocksCard (12 cols - Full Width Stacked)
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-8 bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-lg">
                    TotalGrowthBarChart (8 cols - 66.6% Canvas)
                  </div>
                  <div className="col-span-4 bg-slate-100 border border-slate-300 text-slate-800 p-4 rounded-lg">
                    PopularStocksCard (4 cols - 33.3% Canvas)
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Breakpoint Breakdown Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Sidebar Drawer Behavior</span>
            </span>
            <p className="text-slate-600 leading-relaxed font-mono text-[11px]">
              {current.drawer}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Grid className="w-4 h-4 text-blue-600" />
              <span>Padding Math & Spacing Multiplier</span>
            </span>
            <p className="text-slate-600 leading-relaxed font-mono text-[11px]">
              Content padding: {current.padding} (Grid spacing multiplier: 3 = 24px)
            </p>
          </div>
        </div>
      </div>

      {/* Senior Architect Critique on Layout Execution */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Senior Developer Critical Evaluation: Layout & Spatial Engine</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-emerald-700">
              <CheckCircle className="w-4 h-4" />
              <span>Architectural Strengths</span>
            </div>
            <ul className="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
              <li>
                <strong>Calculated Canvas Width:</strong> Dynamic transition on desktop using <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">calc(100% - 260px)</code> prevents horizontal scroll overflow when the drawer expands.
              </li>
              <li>
                <strong>Consistent Radius Tokenization:</strong> All cards leverage <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">borderRadius: theme.shape.borderRadius</code>, allowing universal aesthetic switches from 4px to 24px without visual degradation.
              </li>
              <li>
                <strong>Visual Anchor Hierarchy:</strong> Placing the signature purple and cyan metric cards at the top immediately establishes brand identity and pulls the eye into key KPIs.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-amber-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Identified Weaknesses & Production Fixes</span>
            </div>
            <ul className="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
              <li>
                <strong>Table Overflow on Mobile:</strong> Berry's transaction table relies purely on horizontal scrolling on small screens (<code className="text-slate-800">overflowX: 'auto'</code>). For enterprise UX, implement a responsive card-stack view below 600px.
              </li>
              <li>
                <strong>Touch Target Deficits:</strong> The Month/Year toggle pills inside the cards measure 32px height, violating the WCAG 2.1 AA requirement of minimum 44x44px touch targets.
              </li>
              <li>
                <strong>Fixed Drawer Width:</strong> The hardcoded 260px drawer width feels cramped for internationalized navigation labels (e.g., German translations often wrap onto two lines).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
