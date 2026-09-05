export type ViewMode = 'live' | 'audit' | 'split';

export type AuditCategory = 
  | 'overview'
  | 'layout'
  | 'performance'
  | 'components'
  | 'state'
  | 'api'
  | 'production';

export type ActivePage = 'dashboard' | 'orders' | 'customers';

export interface ThemeConfig {
  primaryColor: string;
  primaryColorName: string;
  borderRadius: number; // 4, 8, 12, 16, 24
  fontFamily: string;
  isDark: boolean;
  navCollapsed: boolean;
  inspectorMode: boolean;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  items: OrderItem[];
  paymentMethod: 'Mastercard' | 'Visa' | 'PayPal' | 'Stripe' | 'Apple Pay';
  paymentCardLast4?: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Processing' | 'Cancelled';
  shippingAddress: string;
  trackingNumber: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  status: 'Active' | 'Pending' | 'Blocked';
  joinedDate: string;
  tier: 'VIP Client' | 'Standard' | 'Enterprise';
}

export interface ComponentInspection {
  id: string;
  name: string;
  category: 'Layout' | 'Widget' | 'Chart' | 'Navigation' | 'Atomic';
  muiEquivalent: string;
  renderCost: 'Low' | 'Medium' | 'High';
  bundleImpact: string;
  notes: string;
  responsiveBehavior: string;
  stateDeps: string[];
}

export interface MetricScore {
  label: string;
  score: number; // 0-100
  metric: string;
  status: 'optimal' | 'warning' | 'critical';
  details: string;
}

export interface BundleItem {
  name: string;
  sizeKb: number;
  gzipKb: number;
  category: 'core' | 'ui' | 'charts' | 'state' | 'icons' | 'utils';
  color: string;
  optimizationAdvice: string;
}
