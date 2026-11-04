import React, { useState,useEffect} from 'react';
import { ThemeConfig } from './types';
import { BerryHeader } from './components/berry/BerryHeader';
import { BerrySidebar } from './components/berry/BerrySidebar';
import { BerryDashboardView } from './components/berry/BerryDashboardView';
import { OrderListPage } from './components/pages/OrderListPage';
import { CustomerListPage } from './components/pages/CustomerListPage';
import { ProductPage } from './components/pages/ProductPage';
import { BerryCustomizerDrawer } from './components/berry/BerryCustomizerDrawer';
import { Settings } from 'lucide-react';
import socket from '../socket';

export default function App() {
  console.log('ADMIN APP LOADED');
  useEffect(() => {
  console.log('Socket instance:', socket);
  console.log('Socket connected:', socket.connected);

  if (!socket.connected) {
    socket.connect();
  }

  return () => {
    // Filhal disconnect mat karna
  };
}, []);
  // Active Sidebar Item for Berry: 'default' (Dashboard), 'customer-list', or 'order-list'
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('default');

  // Customizer Drawer State
  const [customizerOpen, setCustomizerOpen] = useState<boolean>(false);

  // Theme & State Configuration
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    primaryColor: '#5e35b1',
    primaryColorName: 'Berry Royal Purple',
    borderRadius: 12,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    isDark: false,
    navCollapsed: true,
    inspectorMode: false
  });

  return (
    <div 
      id="berry-dashboard-root" 
      className="min-h-screen bg-[#f4f6f9] text-slate-800 flex flex-col selection:bg-purple-500 selection:text-white relative"
      style={{ fontFamily: themeConfig.fontFamily }}
    >
      {/* Berry Header */}
      <BerryHeader 
        themeConfig={themeConfig}
        setThemeConfig={setThemeConfig}
        onToggleCustomizer={() => setCustomizerOpen(true)}
        activePage={activeSidebarItem}
        onSelectPage={setActiveSidebarItem}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <BerrySidebar 
          themeConfig={themeConfig}
          activeItem={activeSidebarItem}
          onSelectItem={setActiveSidebarItem}
        />

        {/* Center Content Canvas */}
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-57px)]">
          {activeSidebarItem === 'customer-list' && (
            <CustomerListPage themeConfig={themeConfig} />
          )}

          {activeSidebarItem === 'order-list' && (
            <OrderListPage themeConfig={themeConfig} />
          )}

          {(activeSidebarItem === 'products' || activeSidebarItem === 'product-details') && (
            <ProductPage themeConfig={themeConfig} />
          )}

          {activeSidebarItem !== 'customer-list' && 
           activeSidebarItem !== 'order-list' && 
           activeSidebarItem !== 'products' && 
           activeSidebarItem !== 'product-details' && (
            <BerryDashboardView themeConfig={themeConfig} />
          )}
        </main>
      </div>

      {/* Floating Purple Settings Gear on Right Edge (Exact Berry Signature from Screenshots) */}
      <button
        id="berry-floating-settings-tab"
        onClick={() => setCustomizerOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#5e35b1] hover:bg-[#4527a0] text-white p-2.5 rounded-l-xl shadow-lg transition-all z-40 flex items-center justify-center cursor-pointer"
        title="Settings & Customization"
      >
        <Settings className="w-5 h-5 animate-spin-slow" />
      </button>

      {/* Berry Customizer Drawer */}
      <BerryCustomizerDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        themeConfig={themeConfig}
        setThemeConfig={setThemeConfig}
      />
    </div>
  );
}
