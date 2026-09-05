import React from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  Maximize2, 
  Minimize2,
  SlidersHorizontal,
  Radio,
  Languages
} from 'lucide-react';
import { ThemeConfig } from '../../types';

interface BerryHeaderProps {
  themeConfig: ThemeConfig;
  setThemeConfig: React.Dispatch<React.SetStateAction<ThemeConfig>>;
  onToggleCustomizer: () => void;
  activePage: string;
  onSelectPage: (page: string) => void;
}

export const BerryHeader: React.FC<BerryHeaderProps> = ({
  themeConfig,
  setThemeConfig,
  onToggleCustomizer,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [searchFocused, setSearchFocused] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header 
      id="berry-header"
      className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 sm:px-6 py-2.5 transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand & Sidebar Toggle & Search */}
        <div className="flex items-center gap-4">
          {/* Berry Brand Logo */}
          <div className="flex items-center gap-2 mr-2">
            <div className="w-8 h-8 rounded-full bg-[#ede7f6] flex items-center justify-center text-[#5e35b1] shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="14" r="7" fill="#5e35b1" />
                <circle cx="9" cy="12" r="1.5" fill="#7e57c2" />
                <circle cx="14" cy="12" r="1.5" fill="#7e57c2" />
                <circle cx="12" cy="15" r="1.5" fill="#7e57c2" />
                <path d="M12 7 C12 4, 15 3, 17 4 C15 6, 14 7, 12 7 Z" fill="#43a047" />
                <path d="M12 7 C12 4, 9 3, 7 4 C9 6, 10 7, 12 7 Z" fill="#66bb6a" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 font-sans">
              BERRY
            </span>
          </div>

          {/* Sidebar Toggle Button (Purple rounded icon button) */}
          <button
            id="sidebar-toggle-btn"
            onClick={() => setThemeConfig(prev => ({ ...prev, navCollapsed: !prev.navCollapsed }))}
            className="w-8 h-8 rounded-lg bg-[#ede7f6] text-[#5e35b1] hover:bg-[#5e35b1] hover:text-white transition-all flex items-center justify-center focus:outline-none"
            title="Toggle Navigation Drawer"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Search Bar (Berry Signature Search with pill border & right filter button) */}
          <div className="relative hidden md:block w-72 lg:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="berry-global-search"
              type="text"
              placeholder="Search"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-10 pr-10 py-2 text-xs bg-[#f8fafc] border border-slate-200/80 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700 placeholder-slate-400"
            />
            <button 
              className="w-7 h-7 absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#ede7f6] text-[#5e35b1] hover:bg-[#5e35b1] hover:text-white rounded-lg flex items-center justify-center transition-all"
              title="Filter"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: 4 Circular Actions + Profile Pill with Gear */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Signal / Broadcast button (Purple soft circle) */}
          <button 
            className="w-8 h-8 rounded-lg bg-[#ede7f6] text-[#5e35b1] hover:bg-[#5e35b1] hover:text-white transition-all flex items-center justify-center"
            title="Live Connection"
          >
            <Radio className="w-4 h-4" />
          </button>

          {/* Language selector (Blue soft circle) */}
          <button 
            className="w-8 h-8 rounded-lg bg-[#e3f2fd] text-[#1e88e5] hover:bg-[#1e88e5] hover:text-white transition-all flex items-center justify-center"
            title="Language"
          >
            <Languages className="w-4 h-4" />
          </button>

          {/* Notification Button (Yellow soft circle) */}
          <button
            id="berry-notification-btn"
            className="w-8 h-8 rounded-lg bg-[#fff8e1] text-[#ffb300] hover:bg-[#ffb300] hover:text-white transition-all flex items-center justify-center"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Fullscreen toggle (Blue soft circle) */}
          <button 
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-lg bg-[#e3f2fd] text-[#1e88e5] hover:bg-[#1e88e5] hover:text-white transition-all flex items-center justify-center hidden sm:flex"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Profile Avatar with settings gear next to it */}
          <div className="flex items-center gap-2 pl-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" 
                alt="User profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <button
              id="berry-header-settings-btn"
              onClick={onToggleCustomizer}
              className="w-8 h-8 rounded-lg bg-[#e3f2fd] text-[#1e88e5] hover:bg-[#1e88e5] hover:text-white transition-all flex items-center justify-center"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
