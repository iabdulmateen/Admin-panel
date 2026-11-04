import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  Plus, 
  Trash2, 
  Star, 
  Eye, 
  Check, 
  X,
  RefreshCw,
  Filter,
  Wifi,
  WifiOff
} from 'lucide-react';
import { ThemeConfig } from '../../types';
import API from '../../api';

export interface ProductItem {
  id: string;
  mongoId?: string;
  name: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  rating: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
  description: string;
}

interface ProductPageProps {
  themeConfig?: ThemeConfig;
}

export const ProductPage: React.FC<ProductPageProps> = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'T-Shirts',
    brand: 'Shop-co',
    price: '',
    stock: '25',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    description: '',
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const fetchProducts = async () => {
    setLoading(true);
    localStorage.removeItem('berry_dashboard_products_v2');

    const urls = [
      'http://localhost:3000/api/products',
      'http://127.0.0.1:3000/api/products',
      '/api/products'
    ];

    let rawProducts: any[] | null = null;

    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          rawProducts = await res.json();
          setIsConnected(true);
          break;
        }
      } catch (e) {
        // try next
      }
    }

    if (!rawProducts) {
      try {
        const res = await API.get('/products');
        if (res.data) {
          rawProducts = res.data;
          setIsConnected(true);
        }
      } catch (err) {
        console.error('Products API fetch error:', err);
        setIsConnected(false);
      }
    }

    if (rawProducts && Array.isArray(rawProducts)) {
      const formatted: ProductItem[] = rawProducts.map((p: any) => ({
        id: p._id || p.id,
        mongoId: p._id,
        name: p.name || 'Untitled Product',
        category: p.category || 'T-Shirts',
        brand: p.brand || 'Shop-co',
        sku: `SKU-${String(p._id || p.id).slice(-6).toUpperCase()}`,
        price: Number(p.price) || 0,
        rating: p.rating || 4.5,
        stock: p.stock !== undefined ? p.stock : 25,
        status: (p.stock ?? 25) > 10 ? 'In Stock' : (p.stock ?? 25) > 0 ? 'Low Stock' : 'Out of Stock',
        image: p.imageUrl || p.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        description: p.description || 'Quality clothing item.'
      }));

      setProducts(formatted);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['All', 'T-Shirts', 'Shirts', 'Jeans', 'Accessories'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' });
      showToast('Product deleted from MongoDB.');
      fetchProducts();
      setDeleteConfirmId(null);
    } catch (err: any) {
      console.error('Delete product error:', err);
    }
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.price) return;

    setSubmitting(true);
    try {
      await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          price: Number(newProduct.price),
          category: newProduct.category,
          stock: Number(newProduct.stock),
          imageUrl: newProduct.image
        })
      });
      showToast(`Product "${newProduct.name}" created!`);
      fetchProducts();
      setIsAddModalOpen(false);
    } catch (e) {
      console.error('Post Product error:', e);
    } finally {
      setSubmitting(false);
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

      {/* Connection Bar */}
      <div className="flex items-center justify-between bg-white p-3 px-4 rounded-xl border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" /> 🟢 Connected to MongoDB Products Database
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              <WifiOff className="w-3.5 h-3.5 text-rose-600" /> 🔴 Connecting to http://localhost:3000/api/products...
            </span>
          )}
        </div>

        <button onClick={fetchProducts} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Live Website Products ({products.length})</h1>
        </div>

        <button onClick={() => setIsAddModalOpen(true)} className="px-3.5 py-2 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="space-y-5">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${
                  selectedCategory.toLowerCase() === cat.toLowerCase() ? 'bg-[#5e35b1] text-white' : 'bg-slate-50 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="py-12 text-center text-xs font-semibold text-slate-500 flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
            <span>Loading MongoDB products...</span>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group">
                <div className="relative w-full h-52 bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {product.status} ({product.stock})
                  </span>
                  <button onClick={() => setDeleteConfirmId(product.id)} className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>{product.brand}</span>
                      <span className="text-[#5e35b1] font-semibold">{product.category}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm mt-1 line-clamp-2">{product.name}</h3>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-700">{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-base font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                    <button onClick={() => setDeleteConfirmId(product.id)} className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Add Product to MongoDB</h3>
              <button onClick={() => setIsAddModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3">
              <input type="text" required placeholder="Product Name *" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" step="0.01" required placeholder="Price ($) *" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl" />
                <input type="number" placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl" />
              </div>
              <input type="url" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl" />
              <textarea rows={2} placeholder="Description..." value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl resize-none" />
              
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border rounded-xl text-xs">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#5e35b1] text-white rounded-xl text-xs font-semibold">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 space-y-4 text-center">
            <Trash2 className="w-8 h-8 text-rose-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">Delete Product from Database?</h3>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2 border rounded-xl text-xs">Cancel</button>
              <button onClick={() => handleDeleteProduct(deleteConfirmId)} className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};