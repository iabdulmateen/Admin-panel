import React from 'react';
import { Database, GitFork, RefreshCw, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const StateManagementAudit: React.FC = () => {
  const reduxSnippet = `// Berry's State Layer: src/store/slices/customization.ts
import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

const initialState = {
  isOpen: [], // Active route tree id array
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true // Sidebar drawer toggle!
};

export const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    setMenu(state, action) {
      state.opened = action.payload; // UI toggle in global Redux store!
    },
    setFontFamily(state, action) {
      state.fontFamily = action.payload;
    },
    setBorderRadius(state, action) {
      state.borderRadius = action.payload;
    }
  }
});

export const { setMenu, setFontFamily, setBorderRadius } = customizationSlice.actions;
export default customizationSlice.reducer;`;

  const zustandSolution = `// Recommended Senior Enterprise Alternative: src/store/useUIStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  borderRadius: number;
  fontFamily: string;
  toggleSidebar: () => void;
  setBorderRadius: (radius: number) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      borderRadius: 12,
      fontFamily: 'Plus Jakarta Sans',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setBorderRadius: (borderRadius) => set({ borderRadius }),
    }),
    { name: 'berry-ui-storage' } // Automatic LocalStorage sync with zero boilerplate!
  )
);`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
          <Database className="w-4 h-4" />
          <span>State Management Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Berry State Layer: Redux Toolkit & React Context Audit</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          An architectural breakdown of Berry's dual-state model: Redux Toolkit for UI customization and React Context for Authentication. 
          We evaluate the performance pitfalls of putting transient layout toggles into Redux and provide a production migration path.
        </p>
      </div>

      {/* Dual State Architecture Diagram */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Current Dual-Engine State Topology</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-purple-200 bg-purple-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-900 text-xs uppercase tracking-wider">Engine 1: Redux Toolkit</span>
              <span className="text-[10px] font-mono bg-purple-200 text-purple-800 px-2 py-0.5 rounded font-bold">Client UI State</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                <span><strong>customizationSlice:</strong> Drawer open/close, font, radius, themeMode</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                <span><strong>menuSlice:</strong> Active route ID and breadcrumbs hierarchy</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                <span><strong>cartSlice (Optional):</strong> E-commerce prototype product state</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 text-xs uppercase tracking-wider">Engine 2: React Context API</span>
              <span className="text-[10px] font-mono bg-blue-200 text-blue-800 px-2 py-0.5 rounded font-bold">Auth & Security</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span><strong>JWTContext / FirebaseContext:</strong> User identity, login, logout</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span><strong>ConfigContext:</strong> Layout orientation (RTL/LTR)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span><strong>AuthGuard:</strong> Route protection wrappers based on token presence</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Comparison: Redux vs Zustand */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Senior Architect Critique: Redux Overuse Anti-Pattern</h3>
            <p className="text-xs text-slate-500">Why using Redux for simple drawer toggles degrades performance</p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
            65KB Overhead for ~3 Flags
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Current Redux */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 font-mono">Current: Redux Toolkit Implementation</span>
            <div className="bg-slate-950 text-slate-200 font-mono text-[11px] p-3 rounded-xl overflow-x-auto border border-slate-800 h-80">
              <pre>{reduxSnippet}</pre>
            </div>
          </div>

          {/* Recommended Zustand */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 font-mono">Recommended: Zustand Lightweight Store</span>
            <div className="bg-slate-950 text-slate-200 font-mono text-[11px] p-3 rounded-xl overflow-x-auto border border-emerald-950 h-80">
              <pre>{zustandSolution}</pre>
            </div>
          </div>
        </div>

        {/* Benefits Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Senior Refactoring Payoff</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Migrating UI layout state to <strong>Zustand</strong> shrinks state management bundle size from <strong>65 KB to 3.2 KB</strong>. 
            More importantly, components subscribing via fine-grained selectors (e.g., <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">useUIStore(s =&gt; s.sidebarOpen)</code>) 
            only re-render when their specific slice changes, preventing full-tree layout re-renders.
          </p>
        </div>
      </div>
    </div>
  );
};
