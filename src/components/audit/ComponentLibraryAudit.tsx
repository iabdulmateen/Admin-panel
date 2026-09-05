import React from 'react';
import { Palette, Layers, Code, CheckCircle, Sparkles, Box, Type } from 'lucide-react';

export const ComponentLibraryAudit: React.FC = () => {
  const mainCardCode = `// Berry's Signature Primitive: src/ui-component/cards/MainCard.tsx
import React, { forwardRef } from 'react';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const MainCard = forwardRef(({
  border = true,
  boxShadow,
  children,
  content = true,
  contentSX = {},
  darkTitle,
  secondary,
  shadow,
  sx = {},
  title,
  ...others
}, ref) => {
  const theme = useTheme();

  return (
    <Card
      ref={ref}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: theme.palette.primary[200] + 75,
        borderRadius: \`\${theme.shape.borderRadius}px\`,
        ':hover': {
          boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
        },
        ...sx
      }}
    >
      {/* Optional Card Title & Action Header */}
      {title && <CardHeader title={typeof title === 'string' ? <Typography variant="h3">{title}</Typography> : title} action={secondary} />}
      {title && divider && <Divider />}

      {/* Flexible Card Content */}
      {content ? <CardContent sx={contentSX}>{children}</CardContent> : children}
    </Card>
  );
});`;

  const compOverrides = [
    {
      component: 'MuiCard & MuiCardContent',
      overrideStrategy: 'Flattened default elevation (elevation={0}); added subtle 1px border using theme.palette.divider or soft primary tint.',
      benefit: 'Eliminates dated Material Design 2 skeuomorphic shadows in favor of a clean, modern dashboard aesthetic.'
    },
    {
      component: 'MuiButton',
      overrideStrategy: 'Applied theme.shape.borderRadius, removed uppercase text-transform, and enhanced active/hover scale transitions.',
      benefit: 'Provides high-end SaaS feel rather than default Android native button behavior.'
    },
    {
      component: 'MuiListItemButton (Sidebar Navigation)',
      overrideStrategy: 'Injected custom rounded corners, left vertical accent pills, and dynamic primary.light background on active state.',
      benefit: 'Creates distinctive Berry brand navigation with crisp visual affordance.'
    },
    {
      component: 'MuiChip & MuiBadge',
      overrideStrategy: 'Configured light/dark variant styles with translucent color fills (e.g. bg-purple-50 text-purple-700).',
      benefit: 'Clean status indicators with high contrast that pass WCAG accessibility thresholds.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <Palette className="w-4 h-4" />
          <span>Design System & Component Library Analysis</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">MUI v5 Theme Engine & CodedThemes Design Tokens</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          Deep examination of how Berry customizes Material-UI (MUI v5) through theme component overrides, 
          tokenized design variables, and the central <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-purple-700">&lt;MainCard&gt;</code> primitive wrapper.
        </p>
      </div>

      {/* MainCard Pattern Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">The &lt;MainCard&gt; Abstraction Pattern</h3>
            <p className="text-xs text-slate-500">The foundational wrapper powering 90% of Berry's dashboard widgets</p>
          </div>
          <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
            src/ui-component/cards/MainCard.tsx
          </span>
        </div>

        <div className="bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-xl overflow-x-auto border border-slate-800">
          <pre>{mainCardCode}</pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>ForwardRef Integration</span>
            </span>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Properly wraps components in <code className="text-slate-800">React.forwardRef</code> for seamless integration with tooltip and popover anchors.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Unified Border Radius</span>
            </span>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Ties directly into <code className="text-slate-800">theme.shape.borderRadius</code>, allowing universal aesthetic updates from the live customizer.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Content Pass-Through</span>
            </span>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Provides <code className="text-slate-800">content={'{false}'}</code> flag when custom padding or table layouts require edge-to-edge rendering.
            </p>
          </div>
        </div>
      </div>

      {/* Component Overrides Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">MUI Global Component Style Overrides</h3>
        <p className="text-xs text-slate-500">
          How Berry transforms default Material Design 2 into its signature enterprise aesthetic:
        </p>

        <div className="space-y-3">
          {compOverrides.map((override, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {override.component}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Applied in compStyleOverride.ts
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {override.overrideStrategy}
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1 border-t border-slate-200/60">
                <strong className="text-slate-700">Senior Architect Assessment:</strong> {override.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
