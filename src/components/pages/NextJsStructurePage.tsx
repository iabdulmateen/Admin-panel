import React, { useState } from 'react';
import { ThemeConfig } from '../../types';
import { 
  Folder, 
  FileCode, 
  Copy, 
  Check, 
  Sparkles, 
  Download, 
  Terminal, 
  CheckCircle2, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

interface NextJsStructurePageProps {
  themeConfig: ThemeConfig;
  onNavigateToPage?: (pageId: string) => void;
}

export const NextJsStructurePage: React.FC<NextJsStructurePageProps> = ({
  themeConfig,
  onNavigateToPage
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('app/page.tsx');

  const copyCode = (key: string, code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fileSnippets: Record<string, { desc: string; code: string }> = {
    'app/layout.tsx': {
      desc: 'Next.js 14/15 Root Layout with Plus Jakarta Sans & Berry styling.',
      code: `import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  title: 'Berry Dashboard & E-Commerce Suite',
  description: 'Assignment submission: Full Dashboard, Order List, and Customer List pages in Next.js & Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="bg-[#f8fafc] text-slate-800 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}`
    },
    'app/page.tsx': {
      desc: 'Page 1: Full Berry Dashboard (Default Dashboard with Earning, Orders, Income, Total Growth & Popular Stocks).',
      code: `'use client';
import React from 'react';
import { BerryHeader } from '@/components/BerryHeader';
import { BerrySidebar } from '@/components/BerrySidebar';
import { BerryDashboardView } from '@/components/BerryDashboardView';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col">
      <BerryHeader activePage="dashboard" />
      <div className="flex flex-1">
        <BerrySidebar activeItem="default" />
        <main className="flex-1 p-6 overflow-y-auto">
          <BerryDashboardView />
        </main>
      </div>
    </div>
  );
}`
    },
    'app/orders/page.tsx': {
      desc: 'Page 2: Full Order List Page with Search, Status Filters, Responsive Table, and Order Details Modal.',
      code: `'use client';
import React from 'react';
import { BerryHeader } from '@/components/BerryHeader';
import { BerrySidebar } from '@/components/BerrySidebar';
import { OrderListPage } from '@/components/OrderListPage';

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col">
      <BerryHeader activePage="orders" />
      <div className="flex flex-1">
        <BerrySidebar activeItem="orders" />
        <main className="flex-1 overflow-y-auto">
          <OrderListPage />
        </main>
      </div>
    </div>
  );
}`
    },
    'app/customers/page.tsx': {
      desc: 'Page 3: Full Customer List Page with Directory, Add Customer Modal, Tier Badges, and Customer Profile Modal.',
      code: `'use client';
import React from 'react';
import { BerryHeader } from '@/components/BerryHeader';
import { BerrySidebar } from '@/components/BerrySidebar';
import { CustomerListPage } from '@/components/CustomerListPage';

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col">
      <BerryHeader activePage="customers" />
      <div className="flex flex-1">
        <BerrySidebar activeItem="customers" />
        <main className="flex-1 overflow-y-auto">
          <CustomerListPage />
        </main>
      </div>
    </div>
  );
}`
    },
    'tailwind.config.ts': {
      desc: 'Tailwind CSS config with Berry purple & blue design tokens.',
      code: `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        berry: {
          purple: '#5e35b1',
          'purple-dark': '#4527a0',
          'purple-light': '#ede7f6',
          blue: '#1e88e5',
          'blue-dark': '#1565c0',
          'blue-light': '#e3f2fd',
        }
      }
    }
  },
  plugins: [],
};
export default config;`
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div 
        className="bg-white border border-slate-200/80 p-6 shadow-xs space-y-3"
        style={{ borderRadius: `${themeConfig.borderRadius}px` }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
              <Sparkles className="w-4 h-4" />
              <span>Next.js App Router Architecture</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Assignment Structure: 3-Page Next.js Frontend
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Yeh architecture aapke assignment ke teeno pages ko Next.js 14/15 App Router standard ke mutabiq map karta hai. Live preview mein teeno pages fully responsive aur operational hain!
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateToPage?.('default')}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Page 1: Dashboard
            </button>
            <button
              onClick={() => onNavigateToPage?.('orders')}
              className="px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-lg"
            >
              Page 2: Orders
            </button>
            <button
              onClick={() => onNavigateToPage?.('customers')}
              className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg"
            >
              Page 3: Customers
            </button>
          </div>
        </div>
      </div>

      {/* Code Browser & Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Next.js File Tree */}
        <div 
          className="lg:col-span-4 bg-white border border-slate-200/80 p-4 shadow-xs space-y-4"
          style={{ borderRadius: `${themeConfig.borderRadius}px` }}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Next.js Project Directory
          </div>

          <div className="space-y-1 font-mono text-xs text-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-900 py-1">
              <Folder className="w-4 h-4 text-purple-600" />
              <span>my-berry-nextjs/</span>
            </div>

            <div className="pl-4 space-y-1 border-l-2 border-slate-100">
              <div className="flex items-center gap-2 font-semibold text-slate-800 py-1">
                <Folder className="w-3.5 h-3.5 text-purple-500" />
                <span>app/</span>
              </div>

              <div className="pl-4 space-y-1 border-l border-slate-200">
                {Object.keys(fileSnippets).map(fileName => (
                  <button
                    key={fileName}
                    onClick={() => setSelectedFile(fileName)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-all ${
                      selectedFile === fileName 
                        ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200' 
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{fileName}</span>
                    </div>
                    {fileName.includes('orders') && (
                      <span className="text-[9px] bg-purple-100 text-purple-800 px-1 rounded">P2</span>
                    )}
                    {fileName.includes('customers') && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded">P3</span>
                    )}
                    {fileName === 'app/page.tsx' && (
                      <span className="text-[9px] bg-blue-100 text-blue-800 px-1 rounded">P1</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 font-semibold text-slate-800 py-1">
                <Folder className="w-3.5 h-3.5 text-slate-400" />
                <span>components/</span>
              </div>
              <div className="pl-4 text-[11px] text-slate-400">
                BerryDashboardView, OrderListPage, CustomerListPage...
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-xl text-xs space-y-1 text-slate-600">
            <div className="font-bold text-purple-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Assignment Requirements Met</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px]">
              <li>Page 1: Full Berry Dashboard Replica</li>
              <li>Page 2: Full Order List with Filters & Modal</li>
              <li>Page 3: Customer Directory with Add Modal</li>
              <li>100% Responsive & Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Right: Code Viewer */}
        <div 
          className="lg:col-span-8 bg-slate-900 text-slate-200 p-5 shadow-xs flex flex-col space-y-4 overflow-hidden"
          style={{ borderRadius: `${themeConfig.borderRadius}px` }}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono font-bold text-purple-400">
                {selectedFile}
              </div>
              <div className="text-[11px] text-slate-400">
                {fileSnippets[selectedFile]?.desc}
              </div>
            </div>

            <button
              onClick={() => copyCode(selectedFile, fileSnippets[selectedFile]?.code || '')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              {copiedKey === selectedFile ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Window */}
          <pre className="flex-1 overflow-x-auto p-4 bg-slate-950/80 rounded-xl font-mono text-xs text-slate-300 leading-relaxed border border-slate-800/80">
            <code>{fileSnippets[selectedFile]?.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
