import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  Home, 
  ChevronRight, 
  MoreVertical, 
  ChevronLeft,
  X,
  Trash2,
  Eye,
  Filter,
  Check,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { ThemeConfig, Customer } from '../../types';

const defaultCustomerList: Customer[] = [
  {
    id: 'cust-1',
    name: 'Caroline Pandolfi',
    email: 'caroline.pandolfi@gmail.com',
    phone: '+1 (618) 787-3453',
    location: 'Springfield, USA',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    tier: 'VIP Client',
    totalOrders: 14,
    totalSpent: 3420.50
  },
  {
    id: 'cust-2',
    name: 'Liam Smith',
    email: 'liam.smith@technova.io',
    phone: '+1 (212) 555-1234',
    location: 'New York, USA',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    tier: 'Enterprise',
    totalOrders: 9,
    totalSpent: 1890.00
  },
  {
    id: 'cust-3',
    name: 'Emma Johnson',
    email: 'emma.johnson@nordic.se',
    phone: '+46 8 123 4567',
    location: 'Stockholm, Sweden',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    tier: 'Standard',
    totalOrders: 6,
    totalSpent: 920.00
  },
  {
    id: 'cust-4',
    name: 'Noah Brown',
    email: 'noah.brown@apex.cn',
    phone: '+86 755 8821 9901',
    location: 'Shenzhen, China',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    tier: 'Standard',
    totalOrders: 3,
    totalSpent: 420.00
  },
  {
    id: 'cust-5',
    name: 'Olivia Davis',
    email: 'olivia.davis@gulf.ae',
    phone: '+971 4 399 2210',
    location: 'Dubai, UAE',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    tier: 'VIP Client',
    totalOrders: 21,
    totalSpent: 8940.00
  },
  {
    id: 'cust-6',
    name: 'William Miller',
    email: 'william.miller@milano.it',
    phone: '+39 02 8765 4321',
    location: 'Milano, Italy',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    tier: 'Standard',
    totalOrders: 2,
    totalSpent: 158.00
  },
  {
    id: 'cust-7',
    name: 'Sophia Wilson',
    email: 'sophia.wilson@sydney.au',
    phone: '+61 2 9876 5432',
    location: 'Sydney, Australia',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    tier: 'Enterprise',
    totalOrders: 8,
    totalSpent: 2150.00
  },
  {
    id: 'cust-8',
    name: 'James Moore',
    email: 'james.moore@berlin.de',
    phone: '+49 30 5544 3322',
    location: 'Berlin, Germany',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    tier: 'Standard',
    totalOrders: 5,
    totalSpent: 730.00
  }
];

interface CustomerListPageProps {
  themeConfig?: ThemeConfig;
}

const LOCAL_STORAGE_CUSTOMERS_KEY = 'berry_dashboard_customers_v2';

export const CustomerListPage: React.FC<CustomerListPageProps> = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [notification, setNotification] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailCustomer, setDetailCustomer] = useState<Customer | null>(null);
  const [activeMenuCustId, setActiveMenuCustId] = useState<string | null>(null);

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'United States',
    status: 'Active' as Customer['status'],
    tier: 'Standard'
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const saveCustomersToLocal = (data: Customer[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CUSTOMERS_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage customer save error:', e);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOMERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomers(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Error reading saved customers:', e);
    }
    setCustomers(defaultCustomerList);
    saveCustomersToLocal(defaultCustomerList);
  }, []);

  const filteredCustomers = customers.filter(c => {
    const matchesQuery = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;

    return matchesQuery && matchesStatus;
  });

  const totalRows = filteredCustomers.length;
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + rowsPerPage);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedCustomers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedCustomers.map(c => c.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name.trim() || !newCustomer.email.trim()) return;

    const created: Customer = {
      id: `cust-${Date.now()}`,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone || '+1 (555) 019-2831',
      location: newCustomer.location,
      status: newCustomer.status,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?w=120&auto=format&fit=crop&q=80`,
      tier: newCustomer.tier,
      totalOrders: 1,
      totalSpent: 120.00
    };

    const updated = [created, ...customers];
    setCustomers(updated);
    saveCustomersToLocal(updated);
    setIsAddModalOpen(false);
    showToast(`Customer "${created.name}" created successfully!`);

    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      location: 'United States',
      status: 'Active',
      tier: 'Standard'
    });
  };

  const handleDeleteCustomer = (id: string) => {
    const updated = customers.filter(c => c.id !== id);
    setCustomers(updated);
    saveCustomersToLocal(updated);
    setSelectedIds(prev => prev.filter(i => i !== id));
    setActiveMenuCustId(null);
    if (detailCustomer?.id === id) setDetailCustomer(null);
    showToast('Customer removed from records.');
  };

  const handleToggleStatus = (id: string) => {
    const updated = customers.map(c => 
      c.id === id ? { ...c, status: (c.status === 'Active' ? 'Inactive' : 'Active') as Customer['status'] } : c
    );
    setCustomers(updated);
    saveCustomersToLocal(updated);
    setActiveMenuCustId(null);
    if (detailCustomer?.id === id) {
      setDetailCustomer({
        ...detailCustomer,
        status: detailCustomer.status === 'Active' ? 'Inactive' : 'Active'
      });
    }
    showToast('Customer status updated.');
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    const updated = customers.filter(c => !selectedIds.includes(c.id));
    setCustomers(updated);
    saveCustomersToLocal(updated);
    setSelectedIds([]);
    showToast(`${selectedIds.length} customers deleted.`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Customer Directory ({customers.length})</h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
            <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">Customer</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#5e35b1] font-semibold">List</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(customers, null, 2))}`;
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute('href', jsonString);
              downloadAnchor.setAttribute('download', 'berry_customers.json');
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="px-3.5 py-2 rounded-xl border border-[#1e88e5] text-[#1e88e5] hover:bg-blue-50 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#1e88e5] hover:bg-[#1565c0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer name, email, location..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Status:
            </span>
            {['All', 'Active', 'Inactive'].map((st) => (
              <button
                key={st}
                onClick={() => { setSelectedStatus(st); setPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStatus === st
                    ? 'bg-[#ede7f6] text-[#5e35b1] border border-purple-200 shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}

            {selectedIds.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1 transition-all ml-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3.5 px-4 w-12">
                  <input
                    type="checkbox"
                    checked={paginatedCustomers.length > 0 && selectedIds.length === paginatedCustomers.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedCustomers.map((customer) => {
                const isSelected = selectedIds.includes(customer.id);
                return (
                  <tr 
                    key={customer.id} 
                    className={`hover:bg-slate-50/80 transition-colors relative ${isSelected ? 'bg-purple-50/30' : ''}`}
                  >
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(customer.id)}
                        className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setDetailCustomer(customer)}>
                        <img 
                          src={customer.avatar} 
                          alt={customer.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover shadow-xs border border-slate-100"
                        />
                        <div>
                          <p className="font-semibold text-slate-800 leading-tight hover:text-purple-600 transition-colors">
                            {customer.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {customer.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {customer.email}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {customer.phone}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {customer.location}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {customer.tier || 'Standard'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {customer.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e8f5e9] text-[#2e7d32] border border-emerald-200">
                          <UserCheck className="w-3 h-3 text-emerald-600" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ffebee] text-[#e53935] border border-rose-200">
                          <UserX className="w-3 h-3 text-rose-600" />
                          <span>Inactive</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center relative">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setDetailCustomer(customer)}
                          className="p-1.5 text-slate-500 hover:text-purple-600 rounded-lg hover:bg-slate-100"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveMenuCustId(activeMenuCustId === customer.id ? null : customer.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                          title="More Options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {activeMenuCustId === customer.id && (
                        <div className="absolute right-4 top-10 z-30 w-44 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 text-left text-xs font-medium text-slate-700 space-y-1">
                          <button
                            onClick={() => setDetailCustomer(customer)}
                            className="w-full text-left px-3 py-1.5 hover:bg-purple-50 hover:text-purple-700 rounded-lg flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Profile
                          </button>
                          <button
                            onClick={() => handleToggleStatus(customer.id)}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                          >
                            {customer.status === 'Active' ? <UserX className="w-3.5 h-3.5 text-rose-500" /> : <UserCheck className="w-3.5 h-3.5 text-emerald-500" />}
                            <span>Set as {customer.status === 'Active' ? 'Inactive' : 'Active'}</span>
                          </button>
                          <div className="border-t border-slate-100 my-1 pt-1">
                            <button
                              onClick={() => handleDeleteCustomer(customer.id)}
                              className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 rounded-lg flex items-center gap-2 font-semibold"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete Customer
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-400">
                    No customers matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            Showing <strong className="text-slate-800">{totalRows === 0 ? 0 : startIndex + 1}</strong> to <strong className="text-slate-800">{Math.min(startIndex + rowsPerPage, totalRows)}</strong> of <strong className="text-slate-800">{totalRows}</strong> customers
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                className="bg-transparent font-medium border border-slate-200 rounded-lg py-1 px-2 focus:outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="p-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-semibold">Page {page}</span>
              <button
                disabled={startIndex + rowsPerPage >= totalRows}
                onClick={() => setPage(p => p + 1)}
                className="p-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: ADD CUSTOMER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-md w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Add New Customer</h3>
                  <p className="text-[11px] text-slate-400">Add customer profile to directory</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomerSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={newCustomer.name}
                  onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="sarah.j@example.com"
                  value={newCustomer.email}
                  onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 234-8901"
                    value={newCustomer.phone}
                    onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location / Country</label>
                  <input
                    type="text"
                    placeholder="e.g. United States"
                    value={newCustomer.location}
                    onChange={e => setNewCustomer({ ...newCustomer, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Client Tier</label>
                  <select
                    value={newCustomer.tier}
                    onChange={e => setNewCustomer({ ...newCustomer, tier: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="VIP Client">VIP Client</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Initial Status</label>
                  <select
                    value={newCustomer.status}
                    onChange={e => setNewCustomer({ ...newCustomer, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1e88e5] hover:bg-[#1565c0] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Customer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CUSTOMER DETAILS MODAL */}
      {detailCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Customer Profile</h3>
              <button
                onClick={() => setDetailCustomer(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center space-y-2 py-2">
              <img
                src={detailCustomer.avatar}
                alt={detailCustomer.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-purple-200 shadow-md"
              />
              <div>
                <h2 className="text-base font-bold text-slate-900">{detailCustomer.name}</h2>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 mt-1">
                  {detailCustomer.tier || 'Standard Client'}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{detailCustomer.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{detailCustomer.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{detailCustomer.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-center">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-[11px] text-slate-400 font-medium">Total Orders</div>
                <div className="text-base font-bold text-slate-800">{detailCustomer.totalOrders || 1}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-[11px] text-slate-400 font-medium">Total Spent</div>
                <div className="text-base font-bold text-emerald-700">${(detailCustomer.totalSpent || 120.00).toFixed(2)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleDeleteCustomer(detailCustomer.id)}
                className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
              <button
                onClick={() => handleToggleStatus(detailCustomer.id)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Toggle Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="pt-6 pb-2 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <p>© All rights reserved <span className="text-[#5e35b1] font-semibold cursor-pointer">CodedThemes</span></p>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#" className="hover:text-slate-800 transition-colors">License</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Hire us</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Figma Design System</a>
        </div>
      </footer>
    </div>
  );
};
