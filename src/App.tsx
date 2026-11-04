import React, { useState, useEffect } from 'react';
import { ThemeConfig } from './types';
import { BerryHeader } from './components/berry/BerryHeader';
import { BerrySidebar } from './components/berry/BerrySidebar';
import { BerryDashboardView } from './components/berry/BerryDashboardView';
import { OrderListPage } from './components/pages/OrderListPage';
import { CustomerListPage } from './components/pages/CustomerListPage';
import { ProductPage } from './components/pages/ProductPage';
import { BerryCustomizerDrawer } from './components/berry/BerryCustomizerDrawer';
import { Settings, LogOut } from 'lucide-react';
import socket from '../socket';
import { LoginPage } from './components/pages/LoginPage';

export default function App() {
  console.log('ADMIN APP LOADED');

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('userToken');
  });

  useEffect(() => {
    console.log('Socket instance:', socket);
    console.log('Socket connected:', socket.connected);

    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
  };

  // Active Sidebar Item for Berry
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

  // Agar User Logged in nahi hai -> LoginPage Show karein
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // Logged In Admin Panel View
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

      {/* Floating Buttons on Right Edge: Logout & Settings Gear */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
        <button
          onClick={handleLogout}
          className="bg-rose-600 hover:bg-rose-700 text-white p-2.5 rounded-l-xl shadow-lg transition-all flex items-center justify-center cursor-pointer"
          title="Sign Out / Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
        <button
          id="berry-floating-settings-tab"
          onClick={() => setCustomizerOpen(true)}
          className="bg-[#5e35b1] hover:bg-[#4527a0] text-white p-2.5 rounded-l-xl shadow-lg transition-all flex items-center justify-center cursor-pointer"
          title="Settings & Customization"
        >
          <Settings className="w-5 h-5 animate-spin-slow" />
        </button>
      </div>

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