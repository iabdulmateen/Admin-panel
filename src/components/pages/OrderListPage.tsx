import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  Home, 
  ChevronRight, 
  MoreVertical, 
  ChevronLeft,
  ArrowUp,
  RefreshCw
} from 'lucide-react';
import { ThemeConfig } from '../../types';
import API from '../../services/api';

interface OrderItemData {
  id: string;
  mongoId: string;
  customerName: string;
  branch: string;
  paymentType: string;
  quantity: number;
  totalPrice: number;
  orderDate: string;
  status: 'Pending' | 'Complete' | 'Cancel' | 'Hold';
}

const defaultOrderList: OrderItemData[] = [
  { id: '#790955', mongoId: '1', customerName: 'Joseph William', branch: 'Karachi', paymentType: 'Card', quantity: 6, totalPrice: 120, orderDate: '04 Sept 2026', status: 'Pending' },
  { id: '#790956', mongoId: '2', customerName: 'Emma Watson', branch: 'Lahore', paymentType: 'Card', quantity: 1, totalPrice: 240, orderDate: '03 Sept 2026', status: 'Complete' },
];

interface OrderListPageProps {
  themeConfig?: ThemeConfig;
}

// 1. Initial State me Khali Array [] rakhein
export const OrderListPage: React.FC<OrderListPageProps> = () => {
  const [orders, setOrders] = useState<OrderItemData[]>([]); // 👈 Start with []
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 2. Fetch Orders from MongoDB Atlas
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get('/orders');
      if (res.data && Array.isArray(res.data)) {
        const formattedOrders: OrderItemData[] = res.data.map((order: any) => {
          const totalQty = order.orderItems?.reduce(
            (acc: number, item: any) => acc + (item.qty || item.quantity || 1),
            0
          ) || 1;

          const rawDate = order.createdAt ? new Date(order.createdAt) : new Date();
          const formattedDate = rawDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });

          return {
            id: `#${order._id ? order._id.slice(-6).toUpperCase() : 'ORDER'}`,
            mongoId: order._id,
            customerName: order.customerInfo?.name || order.user?.name || 'Guest Customer',
            branch: order.shippingAddress?.city || 'Pakistan',
            paymentType: order.paymentMethod === 'Cash on Delivery' ? 'COD' : order.paymentMethod || 'COD',
            quantity: totalQty,
            totalPrice: order.totalPrice || 0,
            orderDate: formattedDate,
            status: order.isDelivered ? 'Complete' : (order.status || 'Pending'),
          };
        });

        setOrders(formattedOrders); // 👈 Direct Real Orders
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.warn('Could not load orders:', err);
      setOrders([]); // 👈 Never show dummy data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
      {/* Top Breadcrumb & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-slate-800">Live Orders ({orders.length})</h1>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Order</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#5e35b1] font-semibold">List</span>
        </div>
      </div>

      {/* Main White Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Orders or Customers..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Refresh Button */}
            <button
              onClick={fetchOrders}
              className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            {/* Download Button */}
            <button
              onClick={() => {
                const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(orders, null, 2))}`;
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute('href', jsonString);
                downloadAnchor.setAttribute('download', 'live_orders.json');
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
              className="px-3.5 py-2 rounded-xl border border-[#1e88e5] text-[#1e88e5] hover:bg-blue-50 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
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
                    <span>Order ID</span>
                    <ArrowUp className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">City / Branch</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 text-center">Items</th>
                <th className="py-3.5 px-4 text-center">Total Price</th>
                <th className="py-3.5 px-4">Order Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading && (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-slate-500">
                    Loading live orders from database...
                  </td>
                </tr>
              )}

              {!loading && paginatedOrders.map((order) => {
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
                    <td className="py-3.5 px-4 font-mono font-semibold text-purple-700">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {order.customerName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {order.branch}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {order.paymentType}
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-slate-700">
                      {order.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                      ${order.totalPrice}
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

              {!loading && paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-slate-400">
                    No live orders found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
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
    </div>
  );
};