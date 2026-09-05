import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  LineChart, 
  FileText, 
  Target, 
  BookOpen, 
  PieChart, 
  ClipboardList, 
  BarChart2, 
  Users, 
  Headphones, 
  ShoppingCart, 
  MessageSquare, 
  Columns3, 
  Mail, 
  Calendar, 
  Contact, 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Plug, 
  Layout, 
  Table, 
  Grid, 
  MapPin, 
  CheckSquare, 
  Sparkles, 
  Feather, 
  ShieldCheck, 
  CreditCard, 
  Wrench, 
  Bell, 
  Phone, 
  HelpCircle, 
  Shield, 
  Type, 
  Palette, 
  SunMedium, 
  Smile, 
  Film, 
  ListOrdered, 
  Sliders, 
  Ban, 
  Store,
  Compass
} from 'lucide-react';
import { ThemeConfig } from '../../types';

interface BerrySidebarProps {
  themeConfig: ThemeConfig;
  activeItem: string;
  onSelectItem: (id: string) => void;
}

export const BerrySidebar: React.FC<BerrySidebarProps> = ({
  themeConfig,
  activeItem,
  onSelectItem,
}) => {
  // Collapsible state for Customer, Order & E-commerce menus
  const [customerExpanded, setCustomerExpanded] = useState<boolean>(true);
  const [orderExpanded, setOrderExpanded] = useState<boolean>(true);
  const [ecommerceExpanded, setEcommerceExpanded] = useState<boolean>(true);

  if (themeConfig.navCollapsed) {
    return (
      <aside 
        id="berry-sidebar-collapsed"
        className="w-16 bg-white border-r border-slate-100 flex flex-col items-center py-3 transition-all duration-300 z-20 shrink-0"
      >
        <div className="space-y-3">
          <button
            onClick={() => onSelectItem('default')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeItem === 'default' ? 'bg-[#ede7f6] text-[#5e35b1]' : 'text-slate-500 hover:bg-slate-50'
            }`}
            title="Default Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSelectItem('customer-list')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeItem === 'customer-list' ? 'bg-[#ede7f6] text-[#5e35b1]' : 'text-slate-500 hover:bg-slate-50'
            }`}
            title="Customer List"
          >
            <Headphones className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSelectItem('order-list')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeItem === 'order-list' ? 'bg-[#ede7f6] text-[#5e35b1]' : 'text-slate-500 hover:bg-slate-50'
            }`}
            title="Order List"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSelectItem('products')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeItem === 'products' || activeItem === 'product-details' ? 'bg-[#ede7f6] text-[#5e35b1]' : 'text-slate-500 hover:bg-slate-50'
            }`}
            title="Products"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      id="berry-sidebar"
      className="w-64 bg-white border-r border-slate-100 flex flex-col h-[calc(100vh-57px)] sticky top-[57px] transition-all duration-300 z-20 shrink-0 select-none overflow-y-auto"
    >
      <div className="p-3.5 space-y-5 flex-1">
        
        {/* ============================================================ */}
        {/* GROUP 1: DASHBOARD                                           */}
        {/* ============================================================ */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
            Dashboard
          </p>
          <div className="space-y-0.5 pt-1">
            <button
              onClick={() => onSelectItem('default')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl transition-all ${
                activeItem === 'default'
                  ? 'bg-[#ede7f6] text-[#5e35b1] font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Default</span>
            </button>

            <button
              onClick={() => onSelectItem('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl transition-all ${
                activeItem === 'analytics'
                  ? 'bg-[#ede7f6] text-[#5e35b1] font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span>Analytics</span>
            </button>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <FileText className="w-4 h-4" />
              <span>Invoice</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Target className="w-4 h-4" />
              <span>CRM</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* GROUP 2: WIDGET                                              */}
        {/* ============================================================ */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
            Widget
          </p>
          <div className="space-y-0.5 pt-1">
            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <PieChart className="w-4 h-4" />
              <span>Statistics</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <ClipboardList className="w-4 h-4" />
              <span>Data</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <BarChart2 className="w-4 h-4" />
              <span>Chart</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* GROUP 3: APPLICATION (Customer & Order with collapsible sub-pages) */}
        {/* ============================================================ */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
            Application
          </p>
          <div className="space-y-1 pt-1">
            
            {/* Users dropdown */}
            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Users</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* CUSTOMER (Collapsible item matching screenshot 7, 11, 12) */}
            <div>
              <button
                onClick={() => setCustomerExpanded(prev => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  customerExpanded || activeItem === 'customer-list'
                    ? 'bg-[#ede7f6] text-[#5e35b1]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Headphones className="w-4 h-4" />
                  <span>Customer</span>
                </div>
                {customerExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#5e35b1]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Sub-items list matching screenshot 7, 11, 12 */}
              {customerExpanded && (
                <div className="pl-6 pt-1 space-y-0.5 border-l border-slate-100 ml-4">
                  <button
                    onClick={() => onSelectItem('customer-list')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeItem === 'customer-list'
                        ? 'bg-[#e3f2fd] text-[#1e88e5] font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>List</span>
                  </button>

                  <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Create</span>
                  </div>

                  <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Edit</span>
                  </div>

                  <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Details</span>
                  </div>
                </div>
              )}
            </div>

            {/* ORDER (Collapsible item matching screenshot 7, 8, 9) */}
            <div>
              <button
                onClick={() => setOrderExpanded(prev => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  orderExpanded || activeItem === 'order-list'
                    ? 'bg-[#ede7f6] text-[#5e35b1]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Order</span>
                </div>
                {orderExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#5e35b1]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Sub-items list matching screenshot 7 */}
              {orderExpanded && (
                <div className="pl-6 pt-1 space-y-0.5 border-l border-slate-100 ml-4">
                  <button
                    onClick={() => onSelectItem('order-list')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeItem === 'order-list'
                        ? 'bg-[#e3f2fd] text-[#1e88e5] font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>List</span>
                  </button>

                  <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Create</span>
                  </div>

                  <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Edit</span>
                  </div>

                  <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Details</span>
                  </div>
                </div>
              )}
            </div>

            {/* Other Application links */}
            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Columns3 className="w-4 h-4" />
              <span>Kanban</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Mail className="w-4 h-4" />
              <span>Mail</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Contact className="w-4 h-4" />
                <span>Contact</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* E-COMMERCE (Collapsible item matching Berry application section) */}
            <div>
              <button
                onClick={() => setEcommerceExpanded(prev => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  ecommerceExpanded || activeItem === 'products' || activeItem === 'product-details'
                    ? 'bg-[#ede7f6] text-[#5e35b1]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4" />
                  <span>E-commerce</span>
                </div>
                {ecommerceExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#5e35b1]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Sub-items list for E-commerce */}
              {ecommerceExpanded && (
                <div className="pl-6 pt-1 space-y-0.5 border-l border-slate-100 ml-4">
                  <button
                    onClick={() => onSelectItem('products')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeItem === 'products'
                        ? 'bg-[#e3f2fd] text-[#1e88e5] font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>Products</span>
                  </button>

                  <button
                    onClick={() => onSelectItem('product-details')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeItem === 'product-details'
                        ? 'bg-[#e3f2fd] text-[#1e88e5] font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>Product Details</span>
                  </button>

                  <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Checkout</span>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Invoice</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4" />
                <span>CRM</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* GROUP 4: FORMS (Screenshot 3)                                */}
        {/* ============================================================ */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
            Forms
          </p>
          <div className="space-y-0.5 pt-1">
            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Components</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Plug className="w-4 h-4" />
                <span>Plugins</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Layout className="w-4 h-4" />
                <span>Layouts</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Table className="w-4 h-4" />
                <span>Table</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Grid className="w-4 h-4" />
                <span>Data Grid</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <BarChart2 className="w-4 h-4" />
                <span>Charts</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <MapPin className="w-4 h-4" />
              <span>Map</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <CheckSquare className="w-4 h-4" />
              <span>Forms Validati...</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Sparkles className="w-4 h-4" />
              <span>Forms Wizard</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* GROUP 5: UI ELEMENT (Screenshot 4)                           */}
        {/* ============================================================ */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
            UI Element
          </p>
          <div className="space-y-0.5 pt-1">
            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Feather className="w-4 h-4" />
                <div>
                  <p className="font-semibold text-slate-700">Basic</p>
                  <p className="text-[10px] text-slate-400">8+ Basic Components</p>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-purple-700 bg-[#ede7f6] rounded-xl cursor-pointer">
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4" />
                <span>Advance</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-purple-700" />
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Compass className="w-4 h-4" />
              <span>Sample Page</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* GROUP 6: PAGES (Screenshot 4 & 5)                            */}
        {/* ============================================================ */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
            Pages
          </p>
          <p className="px-3 text-[10px] text-slate-400">Prebuild Pages</p>
          <div className="space-y-0.5 pt-1">
            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Authentication</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span>Pricing</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Wrench className="w-4 h-4" />
                <span>Maintenance</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Bell className="w-4 h-4" />
              <span>Landing</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Phone className="w-4 h-4" />
              <span>Contact US</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <span>FAQs</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Shield className="w-4 h-4" />
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* GROUP 7: UTILITIES (Screenshot 5)                            */}
        {/* ============================================================ */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
            Utilities
          </p>
          <div className="space-y-0.5 pt-1">
            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Type className="w-4 h-4" />
              <span>Typography</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Palette className="w-4 h-4" />
              <span>Color</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <SunMedium className="w-4 h-4" />
              <span>Shadow</span>
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Smile className="w-4 h-4" />
                <span>Icons</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <Film className="w-4 h-4" />
              <span>Animation</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* GROUP 8: OTHERS (Screenshot 6 & 7)                           */}
        {/* ============================================================ */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
            Others
          </p>
          <div className="space-y-0.5 pt-1">
            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <ListOrdered className="w-4 h-4" />
                <span>Menu Levels</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <div>
                  <p className="font-semibold text-slate-700">Sub Caption Levels</p>
                  <p className="text-[10px] text-slate-400">Caption Collapse</p>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 rounded-xl cursor-not-allowed">
              <Ban className="w-4 h-4" />
              <span>Disabled Menu</span>
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[9px]">○</div>
                <span>Oval Chip</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-[#1e88e5] text-white text-[10px] font-bold flex items-center justify-center">
                9
              </span>
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px]">👤</div>
                <span>Avatar</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#1e88e5] text-[10px] font-bold">
                coded
              </span>
            </div>

            <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border border-dashed border-slate-400 rounded-sm"></div>
                <span>Outlined</span>
              </div>
              <span className="px-2 py-0.5 rounded-full border border-[#1e88e5] text-[#1e88e5] text-[10px] font-bold">
                outlined
              </span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#5e35b1] rounded-xl hover:bg-purple-50 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <span>Documentation</span>
            </div>

            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#5e35b1] rounded-xl hover:bg-purple-50 cursor-pointer">
              <Target className="w-4 h-4" />
              <span>Roadmap</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SIDEBAR FOOTER CARD: "Get Extra Space" (Screenshot 7)         */}
        {/* ============================================================ */}
        <div className="pt-2">
          <div className="p-4 rounded-2xl bg-[#e3f2fd] relative overflow-hidden space-y-3">
            {/* Soft decorative circular wave in background */}
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-[#90caf9]/50 pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#1e88e5] shadow-xs">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1565c0]">Get Extra Space</h4>
                <p className="text-[11px] text-slate-500 font-medium">28/23 GB</p>
              </div>
            </div>

            <div className="space-y-1 relative z-10">
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="text-[#1565c0]">Progress</span>
                <span className="text-slate-700">80%</span>
              </div>
              <div className="w-full bg-[#bbdefb] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#1e88e5] h-1.5 rounded-full w-[80%]" />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-3 pb-2">
            <span className="px-3 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono text-[10px] font-semibold">
              v5.2.0
            </span>
          </div>
        </div>

      </div>
    </aside>
  );
};
