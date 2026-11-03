import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Home, 
  ChevronRight, 
  MoreVertical, 
  ChevronLeft,
  RefreshCw,
  X,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  Filter,
  Check
} from 'lucide-react';
import { ThemeConfig } from '../../types';
import API from '../../api';

export interface OrderItemData {
  id: string;
  mongoId?: string;
  customerName: string;
  customerEmail: string;
  branch: string;
  paymentType: string;
  quantity: number;
  totalPrice: number;
  orderDate: string;
  status: 'Pending' | 'Complete' | 'Cancel' | 'Hold';
  itemsSummary?: string;
  shippingAddress?: string;
  trackingNumber?: string;
}

interface OrderListPageProps {
  themeConfig?: ThemeConfig;
}

export const OrderListPage: React.FC<OrderListPageProps> = () => {
  const [orders, setOrders] = useState<OrderItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [notification, setNotification] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState<OrderItemData | null>(null);
  const [activeMenuOrderId, setActiveMenuOrderId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // New Order Form
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerEmail: '',
    branch: 'Karachi, Pakistan',
    paymentType: 'Card',
    totalPrice: '',
    itemsSummary: '1x Clothing Order',
    status: 'Pending' as OrderItemData['status']
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Fetch Live Orders from MongoDB Atlas
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
            customerEmail: order.customerInfo?.email || order.user?.email || 'customer@example.com',
            branch: order.shippingAddress?.city || 'Pakistan',
            paymentType: order.paymentMethod === 'Cash on Delivery' ? 'COD' : order.paymentMethod || 'COD',
            quantity: totalQty,
            totalPrice: order.totalPrice || 0,
            orderDate: formattedDate,
            status: order.isDelivered ? 'Complete' : (order.status || 'Pending'),
            itemsSummary: order.orderItems?.map((i: any) => i.name).join(', ') || 'Standard Order Items',
            shippingAddress: order.shippingAddress?.address || 'Standard Delivery Address',
            trackingNumber: `TRK-${Math.floor(100000 + Math.random() * 900000)}`
          };
        });

        setOrders(formattedOrders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.warn('Could not load orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order: OrderItemData) => {
    const matchesQuery = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.paymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    return matchesQuery && matchesStatus;
  });

  const totalRows = filteredOrders.length;
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + rowsPerPage);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedOrders.map((o: OrderItemData) => o.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev: string[]) => 
      prev.includes(id) ? prev.filter((item: string) => item !== id) : [...prev, id]
    );
  };

  const handleAddOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.customerName.trim() || !newOrder.totalPrice) return;

    setSubmitting(true);
    const newId = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdOrder: OrderItemData = {
      id: newId,
      customerName: newOrder.customerName,
      customerEmail: newOrder.customerEmail || `${newOrder.customerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      branch: newOrder.branch,
      paymentType: newOrder.paymentType,
      quantity: 1,
      totalPrice: Number(newOrder.totalPrice) || 0,
      orderDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: newOrder.status,
      itemsSummary: newOrder.itemsSummary,
      shippingAddress: `${newOrder.branch}, Delivery Address`,
      trackingNumber: `TRK-PK-${Math.floor(100000 + Math.random() * 900000)}`
    };

    try {
      await API.post('/orders', createdOrder);
    } catch (e) {
      console.warn('API Post Order failed:', e);
    }

    setOrders([createdOrder, ...orders]);
    setIsAddModalOpen(false);
    showToast(`Order "${newId}" created successfully!`);

    setNewOrder({
      customerName: '',
      customerEmail: '',
      branch: 'Karachi, Pakistan',
      paymentType: 'Card',
      totalPrice: '',
      itemsSummary: '1x Clothing Item',
      status: 'Pending'
    });
    setSubmitting(false);
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      const order = orders.find(o => o.id === id);
      if (order?.mongoId) {
        await API.delete(`/orders/${order.mongoId}`);
      }
    } catch (e) {
      console.warn('API delete failed:', e);
    }
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    setSelectedIds(prev => prev.filter(item => item !== id));
    setActiveMenuOrderId(null);
    if (detailOrder?.id === id) setDetailOrder(null);
    showToast(`Order ${id} deleted.`);
  };

  const handleUpdateStatus = (id: string, newStatus: OrderItemData['status']) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    setActiveMenuOrderId(null);
    if (detailOrder?.id === id) {
      setDetailOrder({ ...detailOrder, status: newStatus });
    }
    showToast(`Order ${id} status updated to ${newStatus}`);
  };

  const getStatusBadge = (status: OrderItemData['status']) => {
    switch (status) {
      case 'Complete':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Complete</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Pending</span>
          </span>
        );
      case 'Cancel':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Cancel</span>
          </span>
        );
      case 'Hold':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <AlertCircle className="w-3 h-3 text-sky-600" />
            <span>Hold</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Orders Management ({orders.length})</h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
            <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">Order</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#5e35b1] font-semibold">List</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchOrders}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            title="Refresh Orders"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Order</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID, customer, city..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Status:
            </span>
            {['All', 'Complete', 'Pending', 'Hold', 'Cancel'].map((status) => (
              <button
                key={status}
                onClick={() => { setSelectedStatus(status); setPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStatus === status
                    ? 'bg-[#ede7f6] text-[#5e35b1] border border-purple-200 shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {status}
              </button>
            ))}
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
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Location / City</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 text-center">Items</th>
                <th className="py-3.5 px-4 text-center">Total Price</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading && (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-slate-500 font-medium">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-purple-600" />
                    Loading orders...
                  </td>
                </tr>
              )}

              {!loading && paginatedOrders.map((order) => {
                const isSelected = selectedIds.includes(order.id);
                return (
                  <tr 
                    key={order.id} 
                    className={`hover:bg-slate-50/80 transition-colors relative ${isSelected ? 'bg-purple-50/30' : ''}`}
                  >
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(order.id)}
                        className="w-4 h-4 rounded border-slate-300 text-purple-600 cursor-pointer"
                      />
                    </td>
                    <td 
                      onClick={() => setDetailOrder(order)}
                      className="py-3.5 px-4 font-mono font-semibold text-purple-700 hover:underline cursor-pointer"
                    >
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{order.customerName}</div>
                      <div className="text-[11px] text-slate-400">{order.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {order.branch}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {order.paymentType}
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-slate-700">
                      {order.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {order.orderDate}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-3.5 px-4 text-center relative">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setDetailOrder(order)}
                          className="p-1.5 text-slate-500 hover:text-purple-600 rounded-lg hover:bg-slate-100"
                          title="View Order Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveMenuOrderId(activeMenuOrderId === order.id ? null : order.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                          title="More Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {activeMenuOrderId === order.id && (
                        <div className="absolute right-4 top-10 z-30 w-44 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 text-left text-xs font-medium text-slate-700 space-y-1">
                          <button
                            onClick={() => setDetailOrder(order)}
                            className="w-full text-left px-3 py-1.5 hover:bg-purple-50 hover:text-purple-700 rounded-lg flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Details
                          </button>
                          <div className="border-t border-slate-100 my-1 pt-1">
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'Complete')}
                              className="w-full text-left px-3 py-1 hover:bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3 h-3" /> Mark Complete
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'Pending')}
                              className="w-full text-left px-3 py-1 hover:bg-amber-50 text-amber-700 rounded-lg flex items-center gap-1.5"
                            >
                              <Clock className="w-3 h-3" /> Mark Pending
                            </button>
                          </div>
                          <div className="border-t border-slate-100 my-1 pt-1">
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 rounded-lg flex items-center gap-2 font-semibold"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete Order
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {!loading && paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-slate-400 font-medium">
                    No live orders in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            Showing <strong className="text-slate-800">{totalRows === 0 ? 0 : startIndex + 1}</strong> to <strong className="text-slate-800">{Math.min(startIndex + rowsPerPage, totalRows)}</strong> of <strong className="text-slate-800">{totalRows}</strong> orders
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                className="bg-transparent font-semibold border border-slate-200 rounded-lg py-1 px-2 focus:outline-none cursor-pointer"
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
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-semibold">Page {page}</span>
              <button
                disabled={startIndex + rowsPerPage >= totalRows}
                onClick={() => setPage(p => p + 1)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Order Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#ede7f6] flex items-center justify-center text-[#5e35b1]">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Create New Order</h3>
                  <p className="text-[11px] text-slate-400">Add order details to live database</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddOrderSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newOrder.customerName}
                  onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Customer Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={newOrder.customerEmail}
                    onChange={e => setNewOrder({ ...newOrder, customerEmail: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / Branch</label>
                  <input
                    type="text"
                    placeholder="e.g. Karachi, Pakistan"
                    value={newOrder.branch}
                    onChange={e => setNewOrder({ ...newOrder, branch: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="120.00"
                    value={newOrder.totalPrice}
                    onChange={e => setNewOrder({ ...newOrder, totalPrice: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Initial Status</label>
                  <select
                    value={newOrder.status}
                    onChange={e => setNewOrder({ ...newOrder, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Complete">Complete</option>
                    <option value="Hold">Hold</option>
                    <option value="Cancel">Cancel</option>
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
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Creating...' : 'Save Order'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-purple-600 font-mono">{detailOrder.id}</span>
                <h3 className="text-sm font-bold text-slate-900">Order Details</h3>
              </div>
              <button
                onClick={() => setDetailOrder(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <div className="text-[11px] text-slate-400">Customer Name</div>
                  <div className="font-bold text-slate-800 text-sm">{detailOrder.customerName}</div>
                  <div className="text-slate-500">{detailOrder.customerEmail}</div>
                </div>
                <div>{getStatusBadge(detailOrder.status)}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[11px] text-slate-400">Payment & City</div>
                  <div className="font-semibold text-slate-700">{detailOrder.paymentType}</div>
                  <div className="text-slate-500">{detailOrder.branch}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[11px] text-slate-400">Total Price & Date</div>
                  <div className="font-bold text-slate-900 text-sm">${detailOrder.totalPrice.toFixed(2)}</div>
                  <div className="text-slate-500">{detailOrder.orderDate}</div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-[11px] text-slate-400">Items Ordered</div>
                <div className="font-semibold text-slate-700 mt-0.5">{detailOrder.itemsSummary || 'Standard Product Package'}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => handleDeleteOrder(detailOrder.id)}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Order</span>
              </button>

              <button
                onClick={() => setDetailOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};