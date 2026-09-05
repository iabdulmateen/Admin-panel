import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  Home, 
  ChevronRight, 
  MoreVertical, 
  ChevronLeft,
  ArrowUp
} from 'lucide-react';
import { ThemeConfig } from '../../types';

interface OrderItemData {
  id: string;
  customerName: string;
  branch: string;
  paymentType: string;
  quantity: number;
  orderDate: string;
  status: 'Pending' | 'Complete' | 'Cancel' | 'Hold';
}

const defaultOrderList: OrderItemData[] = [
  { id: '#790955', customerName: 'Joseph William', branch: 'USA', paymentType: 'Card', quantity: 6, orderDate: '04 Sept 2026', status: 'Pending' },
  { id: '#790956', customerName: 'Emma Watson', branch: 'Canada', paymentType: 'Card', quantity: 1, orderDate: '03 Sept 2026', status: 'Complete' },
  { id: '#790957', customerName: 'Rahul Sharma', branch: 'India', paymentType: 'UPI', quantity: 2, orderDate: '02 Sept 2026', status: 'Pending' },
  { id: '#790958', customerName: 'Oliver Smith', branch: 'UK', paymentType: 'COD', quantity: 1, orderDate: '01 Sept 2026', status: 'Cancel' },
  { id: '#790959', customerName: 'Liam Brown', branch: 'Australia', paymentType: 'Card', quantity: 1, orderDate: '31 Aug 2026', status: 'Hold' },
  { id: '#790960', customerName: 'Hans Muller', branch: 'USA', paymentType: 'UPI', quantity: 1, orderDate: '30 Aug 2026', status: 'Pending' },
  { id: '#790961', customerName: 'Jean Dupont', branch: 'USA', paymentType: 'Card', quantity: 1, orderDate: '29 Aug 2026', status: 'Hold' },
  { id: '#790962', customerName: 'Yuki Tanaka', branch: 'UK', paymentType: 'UPI', quantity: 2, orderDate: '28 Aug 2026', status: 'Pending' },
  { id: '#790963', customerName: 'Ahmed Khan', branch: 'USA', paymentType: 'COD', quantity: 1, orderDate: '27 Aug 2026', status: 'Complete' },
  { id: '#790964', customerName: 'Wei Lim', branch: 'UK', paymentType: 'Card', quantity: 2, orderDate: '26 Aug 2026', status: 'Pending' },
  { id: '#790965', customerName: 'Lucas Silva', branch: 'Brazil', paymentType: 'Card', quantity: 3, orderDate: '25 Aug 2026', status: 'Complete' },
  { id: '#790966', customerName: 'Chloe Dubois', branch: 'France', paymentType: 'Card', quantity: 1, orderDate: '24 Aug 2026', status: 'Hold' },
  { id: '#790967', customerName: 'Alexander White', branch: 'USA', paymentType: 'COD', quantity: 4, orderDate: '23 Aug 2026', status: 'Complete' },
];

interface OrderListPageProps {
  themeConfig: ThemeConfig;
}

export const OrderListPage: React.FC<OrderListPageProps> = () => {
  const [orders, setOrders] = useState<OrderItemData[]>(defaultOrderList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.paymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRows = filteredOrders.length;
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + rowsPerPage);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedOrders.map(o => o.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: OrderItemData['status']) => {
    switch (status) {
      case 'Complete':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e8f5e9] text-[#2e7d32]">
            Complete
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fff8e1] text-[#ff8f00]">
            Pending
          </span>
        );
      case 'Cancel':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ffebee] text-[#c62828]">
            Cancel
          </span>
        );
      case 'Hold':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e1f5fe] text-[#0288d1]">
            Hold
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {/* Top Breadcrumb & Page Title (Exact Berry style from Image 8) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-slate-800">List</h1>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Order</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#5e35b1] font-semibold">List</span>
        </div>
      </div>

      {/* Main White Table Card (Exact Berry Order List styling) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Top Control Bar: Search on Left, Download & Add New on Right */}
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
                const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(orders, null, 2))}`;
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute('href', jsonString);
                downloadAnchor.setAttribute('download', 'berry_orders.json');
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
                const newId = `#7909${Math.floor(65 + Math.random() * 30)}`;
                const newOrder: OrderItemData = {
                  id: newId,
                  customerName: 'New Customer',
                  branch: 'USA',
                  paymentType: 'Card',
                  quantity: 1,
                  orderDate: '05 Sept 2026',
                  status: 'Pending'
                };
                setOrders([newOrder, ...orders]);
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
                    checked={paginatedOrders.length > 0 && selectedIds.length === paginatedOrders.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">
                    <span>ID</span>
                    <ArrowUp className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Branch</th>
                <th className="py-3.5 px-4">Payment Type</th>
                <th className="py-3.5 px-4 text-center">Quantity</th>
                <th className="py-3.5 px-4">Order Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedOrders.map((order) => {
                const isSelected = selectedIds.includes(order.id);
                return (
                  <tr 
                    key={order.id} 
                    className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-purple-50/30' : ''}`}
                  >
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(order.id)}
                        className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {order.customerName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {order.branch}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {order.paymentType}
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-slate-700">
                      {order.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {order.orderDate}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-400">
                    No orders matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row (Exact Berry styling from Image 8) */}
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

      {/* CodedThemes Footer (Exact Berry style from Image 8 & 9) */}
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
