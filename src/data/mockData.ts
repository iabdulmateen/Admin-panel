import { Order, Customer } from '../types';

export const initialOrders: Order[] = [
  {
    id: '#ORD-009841',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.vance@company.com',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    items: [
      { name: 'Berry Pro React Material-UI Admin Template', quantity: 1, price: 69.00 },
      { name: 'Extended Enterprise Multi-Site License', quantity: 1, price: 349.00 }
    ],
    paymentMethod: 'Mastercard',
    paymentCardLast4: '4821',
    date: '05 Sep 2026, 11:24 AM',
    amount: 418.00,
    status: 'Completed',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477, USA',
    trackingNumber: 'TRK-US-98234190'
  },
  {
    id: '#ORD-009840',
    customerName: 'Marcus Thorne',
    customerEmail: 'm.thorne@technova.io',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    items: [
      { name: 'Figma UI Design System Kit (Berry Edition)', quantity: 2, price: 49.00 },
      { name: 'Priority 24/7 SLA Support Addon', quantity: 1, price: 199.00 }
    ],
    paymentMethod: 'PayPal',
    date: '05 Sep 2026, 09:12 AM',
    amount: 297.00,
    status: 'Processing',
    shippingAddress: '45 Wall Street, Suite 1200, New York, NY 10005, USA',
    trackingNumber: 'TRK-US-98234189'
  },
  {
    id: '#ORD-009839',
    customerName: 'Sophia Lindqvist',
    customerEmail: 'sophia@nordicdesign.se',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    items: [
      { name: 'ApexCharts Enterprise Analytics Dashboard', quantity: 1, price: 129.00 }
    ],
    paymentMethod: 'Visa',
    paymentCardLast4: '1109',
    date: '04 Sep 2026, 04:45 PM',
    amount: 129.00,
    status: 'Completed',
    shippingAddress: 'Birger Jarlsgatan 18, 114 34 Stockholm, Sweden',
    trackingNumber: 'TRK-EU-44210982'
  },
  {
    id: '#ORD-009838',
    customerName: 'David Chen',
    customerEmail: 'd.chen@apexsoftware.cn',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    items: [
      { name: 'Full-Stack Next.js 15 Starter Kit', quantity: 1, price: 89.00 },
      { name: 'PostgreSQL Cloud Database Adapter', quantity: 1, price: 59.00 }
    ],
    paymentMethod: 'Stripe',
    paymentCardLast4: '9021',
    date: '04 Sep 2026, 02:18 PM',
    amount: 148.00,
    status: 'Pending',
    shippingAddress: 'Room 802, Tower B, High-Tech Industrial Park, Shenzhen, China',
    trackingNumber: 'TRK-AP-10293812'
  },
  {
    id: '#ORD-009837',
    customerName: 'Amira Al-Mansoor',
    customerEmail: 'amira@gulfinnovate.ae',
    customerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    items: [
      { name: 'Berry Dashboard Ultimate Bundle (React + Vue + Angular)', quantity: 1, price: 499.00 }
    ],
    paymentMethod: 'Apple Pay',
    date: '04 Sep 2026, 11:05 AM',
    amount: 499.00,
    status: 'Completed',
    shippingAddress: 'Downtown Dubai, Boulevard Plaza Tower 1, Dubai, UAE',
    trackingNumber: 'TRK-ME-77218392'
  },
  {
    id: '#ORD-009836',
    customerName: 'Julian Rossi',
    customerEmail: 'julian.rossi@milano-agency.it',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    items: [
      { name: 'E-commerce UI Components & Cart Checkout Kit', quantity: 1, price: 79.00 }
    ],
    paymentMethod: 'Mastercard',
    paymentCardLast4: '3049',
    date: '03 Sep 2026, 06:30 PM',
    amount: 79.00,
    status: 'Cancelled',
    shippingAddress: 'Via Monte Napoleone 8, 20121 Milano, Italy',
    trackingNumber: 'TRK-EU-99102431'
  },
  {
    id: '#ORD-009835',
    customerName: 'Chloe Bennett',
    customerEmail: 'chloe.bennett@sydneyventures.au',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    items: [
      { name: 'Berry SaaS Multi-Tenancy Architecture Kit', quantity: 1, price: 299.00 },
      { name: 'Auth0 / Firebase Integration Module', quantity: 1, price: 89.00 }
    ],
    paymentMethod: 'Visa',
    paymentCardLast4: '7712',
    date: '03 Sep 2026, 03:15 PM',
    amount: 388.00,
    status: 'Completed',
    shippingAddress: 'Level 14, 100 George St, Sydney, NSW 2000, Australia',
    trackingNumber: 'TRK-AU-55210941'
  },
  {
    id: '#ORD-009834',
    customerName: 'Klaus Schmidt',
    customerEmail: 'klaus.schmidt@berlintech.de',
    customerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    items: [
      { name: 'Tailwind CSS v4 Berry Admin Dashboard', quantity: 1, price: 69.00 }
    ],
    paymentMethod: 'Stripe',
    paymentCardLast4: '6241',
    date: '02 Sep 2026, 01:40 PM',
    amount: 69.00,
    status: 'Processing',
    shippingAddress: 'Friedrichstraße 43, 10117 Berlin, Germany',
    trackingNumber: 'TRK-EU-33190284'
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    phone: '+1 (555) 234-8921',
    location: 'Springfield, OR',
    country: 'United States',
    totalOrders: 14,
    totalSpent: 3420.50,
    status: 'Active',
    joinedDate: '12 Jan 2025',
    tier: 'VIP Client'
  },
  {
    id: 'CUST-002',
    name: 'Marcus Thorne',
    email: 'm.thorne@technova.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    phone: '+1 (212) 890-3341',
    location: 'New York, NY',
    country: 'United States',
    totalOrders: 9,
    totalSpent: 1890.00,
    status: 'Active',
    joinedDate: '24 Mar 2025',
    tier: 'Enterprise'
  },
  {
    id: 'CUST-003',
    name: 'Sophia Lindqvist',
    email: 'sophia@nordicdesign.se',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    phone: '+46 8 123 4567',
    location: 'Stockholm',
    country: 'Sweden',
    totalOrders: 6,
    totalSpent: 920.00,
    status: 'Active',
    joinedDate: '02 Jun 2025',
    tier: 'Standard'
  },
  {
    id: 'CUST-004',
    name: 'David Chen',
    email: 'd.chen@apexsoftware.cn',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    phone: '+86 755 8821 9901',
    location: 'Shenzhen',
    country: 'China',
    totalOrders: 3,
    totalSpent: 420.00,
    status: 'Pending',
    joinedDate: '18 Jul 2025',
    tier: 'Standard'
  },
  {
    id: 'CUST-005',
    name: 'Amira Al-Mansoor',
    email: 'amira@gulfinnovate.ae',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    phone: '+971 4 399 2210',
    location: 'Dubai',
    country: 'United Arab Emirates',
    totalOrders: 21,
    totalSpent: 8940.00,
    status: 'Active',
    joinedDate: '15 Nov 2024',
    tier: 'VIP Client'
  },
  {
    id: 'CUST-006',
    name: 'Julian Rossi',
    email: 'julian.rossi@milano-agency.it',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    phone: '+39 02 8765 4321',
    location: 'Milano',
    country: 'Italy',
    totalOrders: 2,
    totalSpent: 158.00,
    status: 'Blocked',
    joinedDate: '05 Aug 2025',
    tier: 'Standard'
  },
  {
    id: 'CUST-007',
    name: 'Chloe Bennett',
    email: 'chloe.bennett@sydneyventures.au',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    phone: '+61 2 9876 5432',
    location: 'Sydney',
    country: 'Australia',
    totalOrders: 8,
    totalSpent: 2150.00,
    status: 'Active',
    joinedDate: '29 Sep 2025',
    tier: 'Enterprise'
  },
  {
    id: 'CUST-008',
    name: 'Klaus Schmidt',
    email: 'klaus.schmidt@berlintech.de',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    phone: '+49 30 5544 3322',
    location: 'Berlin',
    country: 'Germany',
    totalOrders: 5,
    totalSpent: 730.00,
    status: 'Active',
    joinedDate: '10 Oct 2025',
    tier: 'Standard'
  }
];
