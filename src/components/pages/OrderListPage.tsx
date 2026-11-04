import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
  Trash2,
  Eye,
  Check,
  Wifi,
  WifiOff
} from 'lucide-react';
import { ThemeConfig } from '../../types';
import API from '../../api';
import socket from '../../../socket';

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
}

interface OrderListPageProps {
  themeConfig?: ThemeConfig;
}

export const OrderListPage: React.FC<OrderListPageProps> = () => {
  const [orders, setOrders] = useState<OrderItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [notification, setNotification] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState<OrderItemData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerEmail: '',
    branch: 'Karachi, Pakistan',
    paymentType: 'COD',
    totalPrice: '',
    itemsSummary: '1x T-shirt with Tape Details',
    status: 'Pending' as OrderItemData['status']
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

const formatSingleOrder = (order: any): OrderItemData => {
  const totalQty = order.orderItems?.reduce(
    (acc: number, item: any) =>
      acc + (item.qty || item.quantity || 1),
    0
  ) || 1;

  const rawDate = order.createdAt
    ? new Date(order.createdAt)
    : new Date();

  return {
    id: `#${order._id ? order._id.slice(-6).toUpperCase() : 'ORD-1001'}`,
    mongoId: order._id,
    customerName:
      order.customerInfo?.name ||
      order.user?.name ||
      'Guest Customer',
    customerEmail:
      order.customerInfo?.email ||
      order.user?.email ||
      'customer@example.com',
    branch: order.shippingAddress?.city || 'Pakistan',
    paymentType:
      order.paymentMethod === 'Cash on Delivery'
        ? 'COD'
        : order.paymentMethod || 'COD',
    quantity: totalQty,
    totalPrice: Number(order.totalPrice) || 0,
    orderDate: rawDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: order.isDelivered
      ? 'Complete'
      : order.status || 'Pending',
    itemsSummary:
      order.orderItems
        ?.map((item: any) => `${item.name} (x${item.qty || 1})`)
        .join(', ') || 'Clothing Items',
    shippingAddress: order.shippingAddress
      ? `${order.shippingAddress.address || ''}, ${order.shippingAddress.city || ''}`
      : 'N/A',
  };
};

  const formatAndSetOrders = (rawOrders: any[]) => {
    const formattedOrders: OrderItemData[] = rawOrders.map((order: any) => {
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
        id: `#${order._id ? order._id.slice(-6).toUpperCase() : 'ORD-1001'}`,
        mongoId: order._id,
        customerName: order.customerInfo?.name || order.user?.name || 'Guest Customer',
        customerEmail: order.customerInfo?.email || order.user?.email || 'customer@example.com',
        branch: order.shippingAddress?.city || 'Pakistan',
        paymentType: order.paymentMethod === 'Cash on Delivery' ? 'COD' : order.paymentMethod || 'COD',
        quantity: totalQty,
        totalPrice: Number(order.totalPrice) || 0,
        orderDate: formattedDate,
        status: order.isDelivered ? 'Complete' : (order.status || 'Pending'),
        itemsSummary: order.orderItems?.map((i: any) => `${i.name} (x${i.qty || 1})`).join(', ') || 'Clothing Items',
        shippingAddress: order.shippingAddress ? `${order.shippingAddress.address || ''}, ${order.shippingAddress.city || ''}` : 'N/A',
      };
    });

    setOrders(formattedOrders);
  };

  const fetchOrders = async () => {
    setLoading(true);
    localStorage.removeItem('berry_dashboard_orders_v2');

    const urls = [
      'http://127.0.0.1:4000/api/orders', // 👈 Direct IPv4 loopback socket
      'http://localhost:4000/api/orders',
      '/api/orders'
    ];

    let rawOrders: any[] | null = null;

    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            rawOrders = data;
            setIsConnected(true);
            break;
          }
        }
      } catch (e) {
        // try next
      }
    }

    if (!rawOrders) {
      try {
        console.log('LOCAL STORAGE:', Object.keys(localStorage));

console.log(
  'POSSIBLE AUTH TOKENS:',
  Object.entries(localStorage).map(([key, value]) => ({
    key,
    hasValue: !!value,
    valueLength: value?.length
  }))
);
        const res = await API.get('/orders');
        if (res.data && Array.isArray(res.data)) {
          rawOrders = res.data;
          setIsConnected(true);
        }
      } catch (err) {
        console.warn('Axios API error:', err);
      }
    }

    if (rawOrders && Array.isArray(rawOrders)) {
      formatAndSetOrders(rawOrders);
    } else {
      setIsConnected(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

useEffect(() => {
  const handleNewOrder = (rawOrder: any) => {
    console.log('NEW ORDER RECEIVED:', rawOrder);

    const formattedOrder = formatSingleOrder(rawOrder);

    console.log('FORMATTED ORDER:', formattedOrder);

    setOrders((previousOrders) => {
      console.log('PREVIOUS ORDERS:', previousOrders);

      const alreadyExists = previousOrders.some(
        (order) =>
          order.mongoId === formattedOrder.mongoId ||
          order.id === formattedOrder.id
      );

      console.log('ALREADY EXISTS:', alreadyExists);

      if (alreadyExists) return previousOrders;

      return [formattedOrder, ...previousOrders];
      console.log('ADDING NEW ORDER TO STATE:', formattedOrder);
    });

    showToast(`New order received: ${formattedOrder.id}`);
  };

  socket.on('new-order', handleNewOrder);

  return () => {
    socket.off('new-order', handleNewOrder);
  };
}, []);
  const filteredOrders = orders.filter(order => {
    const matchesQuery = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.paymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || 
      (selectedStatus === 'Complete' && order.status === 'Complete') ||
      (selectedStatus === 'Pending' && order.status === 'Pending') ||
      (selectedStatus === 'Cancel' && order.status === 'Cancel') ||
      (selectedStatus === 'Hold' && order.status === 'Hold');

    return matchesQuery && matchesStatus;
  });

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

  const handleAddOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.customerName.trim() || !newOrder.totalPrice) return;

    setSubmitting(true);
    try {
      await fetch('http://127.0.0.1:4000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo: { name: newOrder.customerName, email: newOrder.customerEmail },
          shippingAddress: { address: 'Main Street', city: newOrder.branch, country: 'Pakistan', postalCode: '75000' },
          paymentMethod: newOrder.paymentType,
          totalPrice: Number(newOrder.totalPrice),
          orderItems: [{ name: newOrder.itemsSummary, qty: 1, price: Number(newOrder.totalPrice) }]
        })
      });
      showToast('New Order saved to MongoDB!');
      fetchOrders();
      setIsAddModalOpen(false);
    } catch (e) {
      console.error('Post Order error:', e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOrder = async (orderItem: OrderItemData) => {
    if (orderItem.mongoId) {
      try {
        await fetch(`http://127.0.0.1:4000/api/orders/${orderItem.mongoId}`, { method: 'DELETE' });
      } catch (e) {
        console.warn('Delete error:', e);
      }
    }
    setOrders(prev => prev.filter(o => o.id !== orderItem.id));
    if (detailOrder?.id === orderItem.id) setDetailOrder(null);
    showToast(`Order ${orderItem.id} deleted.`);
  };

  const getStatusBadge = (status: OrderItemData['status']) => {
    switch (status) {
      case 'Complete':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Complete</span>;
      case 'Pending':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Pending</span>;
      case 'Cancel':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Cancel</span>;
      case 'Hold':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">Hold</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex items-center justify-between bg-white p-3 px-4 rounded-xl border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" /> 🟢 Connected to 127.0.0.1:4000 MongoDB Backend
            </span>
          ) : isConnected === false ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              <WifiOff className="w-3.5 h-3.5 text-rose-600" /> 🔴 Disconnected. Ensure "node index.js" is running in Terminal
            </span>
          ) : (
            <span className="text-xs text-slate-400">Connecting to server...</span>
          )}
        </div>

        <button
          onClick={fetchOrders}
          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Retry / Refresh</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Live Website Orders ({orders.length})</h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Order</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between gap-3 border-b border-slate-100">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search customer, Order ID, city..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Complete', 'Pending', 'Hold', 'Cancel'].map((status) => (
              <button
                key={status}
                onClick={() => { setSelectedStatus(status); setPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                  selectedStatus === status ? 'bg-[#ede7f6] text-[#5e35b1]' : 'bg-slate-50 text-slate-600'
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
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase bg-slate-50">
                <th className="py-3.5 px-4 w-12">
                  <input
                    type="checkbox"
                    checked={paginatedOrders.length > 0 && selectedIds.length === paginatedOrders.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-purple-600"
                  />
                </th>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">City</th>
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
                  <td colSpan={10} className="text-center py-10 text-slate-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-purple-600" />
                    Fetching live orders...
                  </td>
                </tr>
              )}

              {!loading && paginatedOrders.map((order) => {
                const isSelected = selectedIds.includes(order.id);
                return (
                  <tr key={order.id} className={`hover:bg-slate-50/80 ${isSelected ? 'bg-purple-50/30' : ''}`}>
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(order.id)}
                        className="w-4 h-4 rounded border-slate-300 text-purple-600"
                      />
                    </td>
                    <td onClick={() => setDetailOrder(order)} className="py-3.5 px-4 font-mono font-semibold text-purple-700 hover:underline cursor-pointer">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{order.customerName}</div>
                      <div className="text-[11px] text-slate-400">{order.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">{order.branch}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">{order.paymentType}</td>
                    <td className="py-3.5 px-4 text-center font-medium text-slate-700">{order.quantity}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900">${order.totalPrice.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-slate-500">{order.orderDate}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setDetailOrder(order)} className="p-1.5 text-slate-500 hover:text-purple-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteOrder(order)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!loading && paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-slate-400 font-medium">
                    No orders found in MongoDB Atlas database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div>Showing <strong>{totalRows === 0 ? 0 : startIndex + 1}</strong> to <strong>{Math.min(startIndex + rowsPerPage, totalRows)}</strong> of <strong>{totalRows}</strong> orders</div>
          <div className="flex items-center gap-4">
            <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="p-1.5 border rounded-lg disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold">Page {page}</span>
            <button disabled={startIndex + rowsPerPage >= totalRows} onClick={() => setPage(p => p + 1)} className="p-1.5 border rounded-lg disabled:opacity-30">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-bold text-slate-900">Order Details ({detailOrder.id})</h3>
              <button onClick={() => setDetailOrder(null)}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Customer:</strong> {detailOrder.customerName}</p>
              <p><strong>Items:</strong> {detailOrder.itemsSummary}</p>
              <p><strong>Shipping:</strong> {detailOrder.shippingAddress}</p>
              <p><strong>Total:</strong> ${detailOrder.totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => handleDeleteOrder(detailOrder)} className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg font-semibold">Delete</button>
              <button onClick={() => setDetailOrder(null)} className="px-4 py-1.5 bg-slate-900 text-white rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};