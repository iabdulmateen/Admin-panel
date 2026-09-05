import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  Home, 
  ChevronRight, 
  MoreVertical, 
  ChevronLeft
} from 'lucide-react';
import { ThemeConfig } from '../../types';

interface CustomerItemData {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'Active' | 'Inactive';
  avatar: string;
}

const defaultCustomerList: CustomerItemData[] = [
  {
    id: 'cust-1',
    name: 'Caroline Pandolfi',
    email: 'caroline1@gmail.com',
    phone: '6187873453',
    location: 'United States',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-2',
    name: 'Liam Smith',
    email: 'liam2@gmail.com',
    phone: '2125551234',
    location: 'United States',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-3',
    name: 'Emma Johnson',
    email: 'emma3@gmail.com',
    phone: '3105555678',
    location: 'Canada',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-4',
    name: 'Noah Brown',
    email: 'noah4@gmail.com',
    phone: '4155559999',
    location: 'United Kingdom',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-5',
    name: 'Olivia Davis',
    email: 'olivia5@gmail.com',
    phone: '6465551111',
    location: 'United States',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-6',
    name: 'William Miller',
    email: 'william6@gmail.com',
    phone: '7185552222',
    location: 'Canada',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-7',
    name: 'Sophia Wilson',
    email: 'sophia7@gmail.com',
    phone: '9175553333',
    location: 'United States',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-8',
    name: 'James Moore',
    email: 'james8@gmail.com',
    phone: '2025554444',
    location: 'United Kingdom',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-9',
    name: 'Isabella Taylor',
    email: 'isabella9@gmail.com',
    phone: '3055555555',
    location: 'Canada',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-10',
    name: 'Benjamin Anderson',
    email: 'benjamin10@gmail.com',
    phone: '4085556666',
    location: 'United States',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-11',
    name: 'Mia Martinez',
    email: 'mia11@gmail.com',
    phone: '5125557777',
    location: 'United States',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-12',
    name: 'Ethan Thomas',
    email: 'ethan12@gmail.com',
    phone: '6175558888',
    location: 'Canada',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-13',
    name: 'Ava Jackson',
    email: 'ava13@gmail.com',
    phone: '7025559999',
    location: 'United Kingdom',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-14',
    name: 'Lucas White',
    email: 'lucas14@gmail.com',
    phone: '8085551122',
    location: 'United States',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80'
  }
];

interface CustomerListPageProps {
  themeConfig: ThemeConfig;
}

export const CustomerListPage: React.FC<CustomerListPageProps> = () => {
  const [customers, setCustomers] = useState<CustomerItemData[]>(defaultCustomerList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {/* Top Breadcrumb & Page Title (Exact Berry style from Image 11 & 12) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-slate-800">List</h1>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Customer</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#5e35b1] font-semibold">List</span>
        </div>
      </div>

      {/* Main White Table Card (Exact Berry Customer List styling) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Download Button */}
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
              <span>Download</span>
            </button>

            {/* Add New Button */}
            <button
              onClick={() => {
                const newCustomer: CustomerItemData = {
                  id: `cust-${Date.now()}`,
                  name: 'New Customer',
                  email: 'newcustomer@gmail.com',
                  phone: '5551234567',
                  location: 'United States',
                  status: 'Active',
                  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
                };
                setCustomers([newCustomer, ...customers]);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#1e88e5] hover:bg-[#1565c0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
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
                    className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-purple-50/30' : ''}`}
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
                      <div className="flex items-center gap-3">
                        <img 
                          src={customer.avatar} 
                          alt={customer.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover shadow-xs border border-slate-100"
                        />
                        <div>
                          <p className="font-semibold text-slate-800 leading-tight">
                            {customer.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {customer.email}
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
                      {customer.status === 'Active' ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e8f5e9] text-[#2e7d32]">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ffebee] text-[#e53935]">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    No customers matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row (Exact Berry styling from Image 11 & 12: 1-10 of 14) */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              className="bg-transparent font-medium border-b border-slate-300 py-0.5 px-1 focus:outline-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span>
              {totalRows === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + rowsPerPage, totalRows)} of {totalRows}
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={startIndex + rowsPerPage >= totalRows}
                onClick={() => setPage(p => p + 1)}
                className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CodedThemes Footer (Exact Berry style from Image 11 & 12) */}
      <footer className="pt-6 pb-2 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
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
