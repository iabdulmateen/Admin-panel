import { BundleItem, MetricScore, ComponentInspection } from '../types';

export const CORE_WEB_VITALS: MetricScore[] = [
  {
    label: 'Largest Contentful Paint (LCP)',
    score: 68,
    metric: '2.8s',
    status: 'warning',
    details: 'Heavy Emotion runtime CSS generation and ApexCharts rendering delay card paints on slow mobile CPU connections.'
  },
  {
    label: 'First Contentful Paint (FCP)',
    score: 82,
    metric: '1.4s',
    status: 'optimal',
    details: 'Initial HTML shell loads promptly via Vite; font-display swaps smoothly for Plus Jakarta Sans.'
  },
  {
    label: 'Cumulative Layout Shift (CLS)',
    score: 91,
    metric: '0.03',
    status: 'optimal',
    details: 'Fixed-height card wrappers (<MainCard>) prevent sudden layout displacement once chart data streams in.'
  },
  {
    label: 'Interaction to Next Paint (INP)',
    score: 75,
    metric: '140ms',
    status: 'warning',
    details: 'Redux theme context dispatches cause cascade re-renders across all styled MUI nodes when changing primary color or border radius.'
  },
  {
    label: 'Time to Interactive (TTI)',
    score: 71,
    metric: '3.4s',
    status: 'warning',
    details: 'Main thread blocked during hydration while Emotion evaluates style tags and ApexCharts initial canvas mounts.'
  }
];

export const BUNDLE_BREAKDOWN: BundleItem[] = [
  {
    name: '@mui/material & @mui/system',
    sizeKb: 342,
    gzipKb: 98,
    category: 'ui',
    color: '#0284c7',
    optimizationAdvice: 'Enable modular path imports (e.g., @mui/material/Button) or migrate to Tailwind CSS / Pigment CSS for zero-runtime CSS.'
  },
  {
    name: '@emotion/react & @emotion/styled',
    sizeKb: 114,
    gzipKb: 36,
    category: 'ui',
    color: '#ec4899',
    optimizationAdvice: 'Runtime style engine overhead. Causes ~60ms thread time during initial render.'
  },
  {
    name: 'apexcharts & react-apexcharts',
    sizeKb: 480,
    gzipKb: 135,
    category: 'charts',
    color: '#8b5cf6',
    optimizationAdvice: 'Must be lazily loaded via React.lazy() / dynamic imports with Skeleton fallback.'
  },
  {
    name: '@tabler/icons-react & lucide',
    sizeKb: 180,
    gzipKb: 48,
    category: 'icons',
    color: '#10b981',
    optimizationAdvice: 'Avoid whole-package barrel imports. Use tree-shakable subpaths or SVGs directly.'
  },
  {
    name: '@reduxjs/toolkit & react-redux',
    sizeKb: 65,
    gzipKb: 21,
    category: 'state',
    color: '#f59e0b',
    optimizationAdvice: 'Overkill for simple UI state (drawer/palette). Replace with lightweight Zustand (3KB) + TanStack Query.'
  },
  {
    name: 'axios & mock-adapter',
    sizeKb: 42,
    gzipKb: 14,
    category: 'utils',
    color: '#64748b',
    optimizationAdvice: 'Mock adapter should be stripped entirely from production bundles using tree-shaking flags.'
  }
];

export const INSPECTION_ITEMS: Record<string, ComponentInspection> = {
  header: {
    id: 'header',
    name: 'Header (AppBar)',
    category: 'Layout',
    muiEquivalent: 'MuiAppBar + MuiToolbar',
    renderCost: 'Low',
    bundleImpact: '18 KB',
    notes: 'Houses global search, notifications popover, language selector, and profile dropdown with sticky positioning.',
    responsiveBehavior: 'Collapses search into modal popover on viewport < 600px; toggles hamburger trigger.',
    stateDeps: ['customization.opened', 'auth.user']
  },
  sidebar: {
    id: 'sidebar',
    name: 'Sidebar Navigation Drawer',
    category: 'Navigation',
    muiEquivalent: 'MuiDrawer (variant: persistent / temporary)',
    renderCost: 'Medium',
    bundleImpact: '28 KB',
    notes: 'Renders nested accordion navigation groups with Chip badges and active route indicators.',
    responsiveBehavior: 'Desktop (>1200px): Persistent sliding drawer (260px). Tablet/Mobile (<1200px): Temporary overlay with backdrop.',
    stateDeps: ['customization.drawerOpen', 'location.pathname']
  },
  earningCard: {
    id: 'earningCard',
    name: 'EarningCard (Total Earning)',
    category: 'Widget',
    muiEquivalent: 'MainCard + MuiCardContent + Custom SVG sparkline',
    renderCost: 'Low',
    bundleImpact: '12 KB',
    notes: 'Berry signature visual widget: Royal purple gradient (#5e35b1 to #4527a0) with decorative concentric radial rings.',
    responsiveBehavior: 'Grid xs={12} sm={6} md={6} lg={4}. Stacks full-width on mobile with 16px bottom margin.',
    stateDeps: ['earningPeriod (local useState)']
  },
  totalOrderCard: {
    id: 'totalOrderCard',
    name: 'TotalOrderCard',
    category: 'Widget',
    muiEquivalent: 'MainCard + ApexCharts Sparkline (Area)',
    renderCost: 'Medium',
    bundleImpact: '35 KB (via ApexCharts sparkline)',
    notes: 'Deep primary blue card with month/year toggle tabs and embedded micro area chart.',
    responsiveBehavior: 'Grid xs={12} sm={6} md={6} lg={4}. Full width on mobile, 50% on tablet.',
    stateDeps: ['orderPeriod (month/year)']
  },
  totalIncomeCard: {
    id: 'totalIncomeCard',
    name: 'TotalIncomeStackedCard',
    category: 'Widget',
    muiEquivalent: 'MainCard + MuiAvatar + MuiTypography',
    renderCost: 'Low',
    bundleImpact: '8 KB',
    notes: 'Dual micro-cards featuring $203k Total Income with primary/secondary icon badges.',
    responsiveBehavior: 'Grid xs={12} sm={12} md={12} lg={4}. On desktop it stacks into a 2-tier column.',
    stateDeps: []
  },
  growthChart: {
    id: 'growthChart',
    name: 'TotalGrowthBarChart',
    category: 'Chart',
    muiEquivalent: 'MainCard + ApexCharts (Stacked Column Bar)',
    renderCost: 'High',
    bundleImpact: '140 KB (Heavy DOM canvas/svg node count)',
    notes: 'Primary analytics visual comparing Investment ($2,324.00) vs Loss across months. Features Today/Month/Year pill filters.',
    responsiveBehavior: 'Grid xs={12} md={8}. Collapses to 100% width on tablet/mobile with horizontal scroll or auto-decimated x-axis.',
    stateDeps: ['growthFilter (Today / Month / Year)']
  },
  popularStocks: {
    id: 'popularStocks',
    name: 'PopularStocksCard',
    category: 'Widget',
    muiEquivalent: 'MainCard + MuiList + MuiListItem + Trend Indicators',
    renderCost: 'Low',
    bundleImpact: '14 KB',
    notes: 'Monitors Apple, Uber, Amazon, Bajracharya stocks with sparkline trends and green/red profit chips.',
    responsiveBehavior: 'Grid xs={12} md={4}. Renders alongside Growth Chart on desktop, stacks below on mobile.',
    stateDeps: []
  },
  transactions: {
    id: 'transactions',
    name: 'LatestTransactionsCard',
    category: 'Widget',
    muiEquivalent: 'MainCard + MuiTable + MuiTablePagination',
    renderCost: 'Low',
    bundleImpact: '16 KB',
    notes: 'Order status breakdown with colored chips (Success, Pending, Rejected) and localized timestamps.',
    responsiveBehavior: 'Overflow container with responsive horizontal scrollbar on viewport < 768px.',
    stateDeps: ['page', 'rowsPerPage']
  }
};

export const DIRECTORY_STRUCTURE = `src/
├── assets/                  # Static fonts, SVGs, images
├── contexts/                # AuthContext (JWT / Firebase / Auth0 / Supabase)
├── hooks/                   # Custom hooks (useAuth, useConfig, useScript)
├── layout/                  # MainLayout, MinimalLayout, Customizer
│   ├── MainLayout/
│   │   ├── Header/          # LogoSection, SearchSection, ProfileSection, NotificationSection
│   │   ├── Sidebar/         # MenuList, MenuCard, Drawer container
│   │   └── index.tsx        # Shell wrapper with CSS baseline & padding calculation
├── menu-items/              # Declarative sidebar navigation configuration tree
│   ├── dashboard.ts
│   ├── pages.ts
│   ├── utilities.ts
│   └── other.ts
├── routes/                  # React Router v6 configuration with Loadable code-splitting
│   ├── index.tsx
│   ├── MainRoutes.tsx
│   └── AuthenticationRoutes.tsx
├── store/                   # Redux Toolkit setup
│   ├── slices/
│   │   ├── customization.ts # Drawer open state, borderRadius, fontFamily, themeMode
│   │   └── menu.ts          # Active navigation item tracker
│   └── index.ts             # configureStore + RootState / AppDispatch exports
├── ui-component/            # Reusable UI primitives wrapping Material-UI
│   ├── cards/               # MainCard, SubCard, AuthCard, Skeleton
│   ├── extended/            # Breadcrumbs, AnimateButton, Avatar
│   └── Loadable.tsx         # Suspense wrapper for lazy route chunks
├── utils/                   # Axios instance, mock-adapter, route-guard helpers
│   ├── axios.ts             # Axios with Bearer token interceptor
│   └── route-guard/         # GuestGuard, AuthGuard
└── views/                   # Page view components
    ├── dashboard/
    │   └── Default/         # EarningCard, TotalOrderLineChart, TotalGrowthBarChart
    └── pages/               # Auth, Error 404/500, Account Settings`;

export const ARCHITECTURAL_ANALYSIS_MARKDOWN = `# Senior Developer Deep Dive: Berry Dashboard Architecture & Production Readiness

## 1. Executive Summary & Core Stack Evaluation
Berry Dashboard (created by CodedThemes) is one of the most widely referenced Material-UI (MUI v5) admin templates in the React ecosystem. It provides a polished enterprise aesthetic characterized by soft pastel backdrops, signature radial card gradients, and modular card wrappers.

### Core Stack Anatomy:
- **UI Framework**: React 18+ (SPA with Vite / Next.js options)
- **Component Library**: Material-UI (MUI v5) + Emotion CSS-in-JS
- **State Management**: Redux Toolkit (RTK) + React Context (Auth)
- **Routing**: React Router v6 with \`Loadable\` Suspense chunks
- **HTTP Client**: Axios with interceptor pattern & Mock Adapter
- **Data Visualization**: ApexCharts & React-ApexCharts

---

## 2. Layout & Spatial Grid Architecture
- **Layout Shell Pattern**: Berry uses a persistent-to-temporary dynamic drawer strategy. On desktop (\`>= 1200px\`), the drawer occupies \`260px\` width with a fluid content canvas computed via \`calc(100% - 260px)\`. On viewports \`< 1200px\`, it switches to a full modal overlay with backdrop.
- **12-Column Grid Usage**:
  - Top Metrics Row: \`Grid container spacing={3}\` with cards spanning \`xs={12} sm={6} md={6} lg={4}\`.
  - Analytical Row: Main Chart (\`xs={12} md={8}\`) paired with Side Widget (\`xs={12} md={4}\`).
- **Inner Padding Hierarchy**: Standardized via \`<MainCard contentSX={{ p: 3 }}>\` (24px padding on desktop, 16px on mobile).

---

## 3. Performance & Core Web Vitals Analysis
- **LCP (2.8s) & First Paint Bottleneck**:
  - The primary culprit is **Emotion's runtime stylesheet injection**. Every styled MUI component parses CSS strings in JavaScript before injecting \`<style>\` tags into the document head, delaying the initial paint.
  - **ApexCharts bundle footprint**: ~480KB uncompressed JS. If loaded synchronously in the initial bundle, it blocks main thread hydration.
- **Recommendations for Production**:
  1. Wrap ApexCharts in a lazy-loaded wrapper with a skeleton placeholder (\`<Skeleton variant="rectangular" height={365} />\`).
  2. Transition to MUI's zero-runtime CSS engine (**Pigment CSS**) or **Tailwind CSS v4** to eliminate Emotion's 114KB runtime.
  3. Audit icon imports: Migrate from \`import { IconX } from '@tabler/icons-react'\` to direct path imports to avoid tree-shaking failures.

---

## 4. State Management Breakdown
- **Current Redux Usage**:
  - Redux Toolkit is currently used for **purely client UI state** (\`drawerOpen: boolean\`, \`fontFamily: string\`, \`borderRadius: number\`).
  - **Architectural Critique**: Utilizing Redux for simple UI layout states creates unnecessary boilerplate (actions, reducers, selectors, context providers) and triggers wide tree re-renders.
- **Senior Refactoring Recommendation**:
  - Move UI Customizer state to **Zustand** (3KB footprint, zero context overhead, local storage sync with 1 line).
  - Adopt **TanStack Query (React Query v5)** for server state (dashboard metrics, transactions, order stats) to provide automatic stale-while-revalidate, optimistic updates, and query caching.

---

## 5. API Integration Patterns & Mock Architecture
- **Current Implementation**:
  - Axios singleton in \`src/utils/axios.ts\` with a standard request interceptor attaching \`Authorization: Bearer <token>\`.
  - Uses \`axios-mock-adapter\` for prototyping.
- **Production Deficiencies & Hardening Roadmap**:
  1. **Token Refresh Loop**: Current implementation lacks an automated 401 response interceptor with token refresh queuing (\`axios-retry\` or custom queue).
  2. **AbortController**: API calls in \`useEffect\` lack cancellation tokens, creating potential memory leaks and race conditions when switching dashboard tabs rapidly.
  3. **Mock Isolation**: \`axios-mock-adapter\` often bleeds into production bundles if not isolated via environment-flagged dynamic imports.

---

## 6. Responsive Design Best Practices & Gaps
- **Strengths**:
  - Clean breakpoint system aligned with MUI standard (\`xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536\`).
  - Smooth drawer transitions using CSS transitions.
- **Gaps Identified**:
  - Data tables lack card-mode fallback on mobile viewports (< 600px), relying instead on horizontal scrolling which hurts mobile UX.
  - Interactive chip buttons inside metric cards (e.g. Month/Year toggles) have touch targets under 38px, violating WCAG 44px minimum target guidelines.
`;
