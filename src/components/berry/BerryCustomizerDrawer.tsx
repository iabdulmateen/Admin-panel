import React from 'react';
import { X, Check, RotateCcw, Palette, Sparkles, Sliders } from 'lucide-react';
import { ThemeConfig } from '../../types';

interface BerryCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: ThemeConfig;
  setThemeConfig: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

export const BerryCustomizerDrawer: React.FC<BerryCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  themeConfig,
  setThemeConfig,
}) => {
  if (!isOpen) return null;

  const colorPresets = [
    { name: 'Berry Royal Purple', hex: '#5e35b1' },
    { name: 'Berry Indigo', hex: '#3949ab' },
    { name: 'Vibrant Blue', hex: '#1e88e5' },
    { name: 'Teal Forest', hex: '#00897b' },
    { name: 'Sunset Amber', hex: '#e65100' },
  ];

  const radiusOptions = [4, 8, 12, 16, 24];

  const fontOptions = [
    { label: 'Plus Jakarta Sans', value: "'Plus Jakarta Sans', sans-serif" },
    { label: 'Roboto (MUI Default)', value: "'Roboto', sans-serif" },
    { label: 'Inter', value: "'Inter', sans-serif" },
  ];

  const resetToDefault = () => {
    setThemeConfig(prev => ({
      ...prev,
      primaryColor: '#5e35b1',
      primaryColorName: 'Berry Royal Purple',
      borderRadius: 12,
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-purple-600" />
              <div>
                <h3 className="text-base font-bold text-slate-800">Berry Theme Customizer</h3>
                <p className="text-xs text-slate-400">Live Redux-driven layout settings</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            {/* Color Scheme */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Color Presets</span>
                <span className="text-xs text-purple-600 font-semibold">{themeConfig.primaryColorName}</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() => setThemeConfig(prev => ({
                      ...prev,
                      primaryColor: preset.hex,
                      primaryColorName: preset.name
                    }))}
                    className="h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105 relative shadow-sm"
                    style={{ backgroundColor: preset.hex }}
                    title={preset.name}
                  >
                    {themeConfig.primaryColor === preset.hex && (
                      <Check className="w-5 h-5 text-white stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Border Radius</span>
                <span className="text-xs font-mono font-bold text-slate-700">{themeConfig.borderRadius}px</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {radiusOptions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setThemeConfig(prev => ({ ...prev, borderRadius: r }))}
                    className={`py-2 text-xs font-bold border transition-all ${
                      themeConfig.borderRadius === r
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    style={{ borderRadius: `${r}px` }}
                  >
                    {r}px
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family Selection */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Font Family</span>
              <div className="space-y-2">
                {fontOptions.map((font) => (
                  <button
                    key={font.label}
                    onClick={() => setThemeConfig(prev => ({ ...prev, fontFamily: font.value }))}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                      themeConfig.fontFamily === font.value
                        ? 'border-purple-600 bg-purple-50/70 text-purple-900 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{font.label}</span>
                    {themeConfig.fontFamily === font.value && (
                      <Check className="w-4 h-4 text-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural note box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Senior Architect Note</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                In Berry production, this customizer dispatches actions directly to the Redux <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">customizationReducer</code>. 
                Modifying these values re-evaluates the Emotion CSS theme tree and pushes local storage persistence.
              </p>
            </div>
          </div>

          {/* Footer Reset button */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
            <button
              onClick={resetToDefault}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
