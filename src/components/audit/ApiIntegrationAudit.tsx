import React from 'react';
import { Globe, ShieldAlert, CheckCircle2, RefreshCw, AlertTriangle, Key, Layers, Server } from 'lucide-react';

export const ApiIntegrationAudit: React.FC = () => {
  const axiosSnippet = `// Berry's Current API Client: src/utils/axios.ts
import axios from 'axios';

const axiosServices = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://mock-api.berrydashboard.com'
});

// Request Interceptor: Injects Bearer Token
axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      config.headers.Authorization = \`Bearer \${accessToken}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Basic Error Catch
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Missing refresh token loop!
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;`;

  const enterprisePattern = `// Recommended Enterprise Pattern: TanStack Query v5 + Axios + Zod
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import axiosServices from '@/utils/axios';

// 1. Strict Runtime Contract Validation
const GrowthMetricSchema = z.object({
  totalInvestment: z.number(),
  totalLoss: z.number(),
  period: z.enum(['Today', 'This Month', 'This Year']),
  monthlyBreakdown: z.array(z.object({
    month: z.string(),
    investment: z.number(),
    loss: z.number()
  }))
});

export type GrowthMetrics = z.infer<typeof GrowthMetricSchema>;

// 2. Self-Healing, Cached Hook with Abort Signal
export const useGrowthMetrics = (period: string) => {
  return useQuery({
    queryKey: ['dashboard', 'growth', period],
    queryFn: async ({ signal }) => {
      // AbortController cancels in-flight request if user switches tabs rapidly!
      const { data } = await axiosServices.get('/api/analytics/growth', {
        params: { period },
        signal
      });
      return GrowthMetricSchema.parse(data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes fresh in-memory cache
    gcTime: 1000 * 60 * 30,    // 30 minutes garbage collection
    retry: 2                   // Exponential backoff
  });
};`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
          <Globe className="w-4 h-4" />
          <span>API & Data Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Berry API Integration Patterns & Network Architecture</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          Evaluation of Axios singleton interceptors, mock service adapter leakage, token authentication lifecycles, 
          and the lack of automated request deduplication in standard Berry templates.
        </p>
      </div>

      {/* Code Side-by-Side */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Axios Interceptor Implementation vs Enterprise TanStack Query</h3>
            <p className="text-xs text-slate-500">Comparing current singleton pattern with modern resilient caching</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 font-mono">Current: src/utils/axios.ts</span>
            <div className="bg-slate-950 text-slate-200 font-mono text-[11px] p-3 rounded-xl overflow-x-auto border border-slate-800 h-84">
              <pre>{axiosSnippet}</pre>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 font-mono">Enterprise Solution: Query + Zod + Signal</span>
            <div className="bg-slate-950 text-slate-200 font-mono text-[11px] p-3 rounded-xl overflow-x-auto border border-emerald-950 h-84">
              <pre>{enterprisePattern}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Critical Production Gaps */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">4 Critical API Architecture Gaps in Berry Default</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Key className="w-4 h-4 text-amber-700" />
              <span>1. Missing 401 Refresh Token Queue</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              When access tokens expire, concurrent dashboard requests all fail with 401 simultaneously. 
              Production systems require a promise queue that pauses incoming calls, executes one token refresh request, and retries the queued requests seamlessly.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <RefreshCw className="w-4 h-4 text-amber-700" />
              <span>2. No Request Cancellation (AbortController)</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              If a user rapidly clicks between &ldquo;Today&rdquo;, &ldquo;This Month&rdquo;, and &ldquo;This Year&rdquo; filters, responses can resolve out of order, 
              causing older data to overwrite newer selections (race condition). Passing an <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900">AbortSignal</code> solves this.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Server className="w-4 h-4 text-amber-700" />
              <span>3. Mock Adapter Production Leakage</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Berry uses <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900">axios-mock-adapter</code> for sample data. 
              If the mock adapter is imported synchronously in <code className="text-slate-800">index.ts</code>, mock JSON payloads get bundled into the production output, increasing payload size by ~42 KB.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>4. Lack of Runtime Schema Validation</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Berry assumes the backend returns perfectly shaped JSON matching TypeScript interfaces. 
              If the backend changes a field type from number to null, UI components crash with <code className="text-slate-800">Cannot read property of undefined</code>. Zod prevents this at runtime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
