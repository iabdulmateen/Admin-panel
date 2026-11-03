// @ts-ignore React typings are unavailable in this project.
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Check, 
  Package,
  RefreshCw
} from 'lucide-react';
import { ThemeConfig } from '../../types';
import API from '../../api';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  colors: { name: string; hex: string }[];
}

interface ProductPageProps {
  themeConfig?: ThemeConfig;
  initialViewMode?: 'list' | 'details';
}

export const ProductPage = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'T-Shirts',
    brand: 'Shop-co',
    price: '',
    originalPrice: '',
    stock: '25',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    description: '',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products');
      if (res.data && Array.isArray(res.data)) {
       const formatted: ProductItem[] = res.data.map((p: any): ProductItem => {
          const pId = p._id || p.id;
          const pImg = p.imageUrl || p.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80';
          const pStock = p.stock !== undefined ? p.stock : 25;
          const priceNum = Number(p.price) || 0;

          return {
            id: pId,
            name: p.name || 'Untitled Product',
            category: p.category || 'General',
            brand: p.brand || 'Shop-co',
            sku: `SKU-${String(pId).slice(-6).toUpperCase()}`,
            price: priceNum,
            originalPrice: p.oldPrice ? Number(p.oldPrice) : priceNum,
            rating: p.rating || 4.5,
            reviewsCount: 18,
            stock: pStock,
            status: pStock > 10 ? 'In Stock' : pStock > 0 ? 'Low Stock' : 'Out of Stock',
            image: pImg,
            gallery: [pImg],
            description: p.description || 'Quality product in catalog.',
            features: ['Soft & breathable material', 'Quality craftsmanship'],
            specifications: [{ label: 'Brand', value: p.brand || 'Shop-co' }],
            colors: [{ name: 'Black', hex: '#18181b' }]
          };
        });

        setProducts(formatted);
        if (!selectedProductId && formatted.length > 0) {
          setSelectedProductId(formatted[0].id);
        }
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.warn('Could not load products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const [activeImage, setActiveImage] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.image);
    }
  }, [selectedProductId, selectedProduct]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const categories = ['All', 'T-Shirts', 'Shirts', 'Jeans', 'Electronics', 'Accessories'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = async (id: string) => {
    try {
      await API.delete(`/products/${id}`);
    } catch (err: any) {
      console.warn('API delete product failed:', err);
    }

    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    setDeleteConfirmId(null);
    showToast(`Product deleted successfully.`);
    
    if (selectedProductId === id) {
      if (updated.length > 0) {
        setSelectedProductId(updated[0].id);
        setActiveImage(updated[0].image);
      } else {
        setViewMode('list');
      }
    }
  };

  const handleAddProductSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.price) return;

    setSubmitting(true);
    try {
      const payload = {
        name: newProduct.name,
        description: newProduct.description || 'Quality product in catalog.',
        price: Number(newProduct.price),
        category: newProduct.category,
        stock: Number(newProduct.stock) || 25,
        imageUrl: newProduct.image
      };

      await API.post('/products', payload);
      setIsAddModalOpen(false);
      showToast(`"${newProduct.name}" added successfully!`);

      setNewProduct({
        name: '',
        category: 'T-Shirts',
        brand: 'Shop-co',
        price: '',
        originalPrice: '',
        stock: '25',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        description: '',
      });

      await fetchProducts();
      setViewMode('list');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to add product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {viewMode === 'details' && selectedProduct ? 'Product Details' : `Live Products Catalog (${products.length})`}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
            <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#5e35b1] font-semibold">Products</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProducts}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* DETAILS VIEW */}
      {viewMode === 'details' && selectedProduct && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
            <button
              onClick={() => setViewMode('list')}
              className="px-3 py-1.5 rounded-xl border text-slate-600 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to List</span>
            </button>
            <button
              onClick={() => setDeleteConfirmId(selectedProduct.id)}
              className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80 bg-slate-50 rounded-xl p-4 flex items-center justify-center">
              <img src={activeImage || selectedProduct.image} alt={selectedProduct.name} className="h-full object-contain" />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h2>
              <div className="text-2xl font-extrabold text-slate-900">${selectedProduct.price.toFixed(2)}</div>
              <p className="text-xs text-slate-600">{selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-5">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#5e35b1] text-white'
                      : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="py-12 text-center text-xs font-semibold text-slate-500">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-600 mx-auto mb-2" />
              <span>Loading products...</span>
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex flex-col justify-between">
                  <div 
                    onClick={() => { setSelectedProductId(product.id); setViewMode('details'); }}
                    className="w-full h-48 bg-slate-50 rounded-xl p-2 flex items-center justify-center cursor-pointer"
                  >
                    <img src={product.image} alt={product.name} className="h-full object-contain" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <h3 className="font-bold text-xs text-slate-800 line-clamp-1">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-slate-900">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => setDeleteConfirmId(product.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
              <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-500">No products found in live database.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal Add */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Add New Product</h3>
            <form onSubmit={handleAddProductSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Product Title"
                value={newProduct.name}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-2 border text-xs rounded-xl"
              />
              <input
                type="number"
                required
                placeholder="Price ($)"
                value={newProduct.price}
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full p-2 border text-xs rounded-xl"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                className="w-full p-2 border text-xs rounded-xl"
              />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-3 py-1.5 text-xs">Cancel</button>
                <button type="submit" disabled={submitting} className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Delete */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Delete Product?</h3>
            <div className="flex gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2 text-xs border rounded-xl">Cancel</button>
              <button onClick={() => handleDeleteProduct(deleteConfirmId)} className="flex-1 py-2 text-xs bg-rose-600 text-white rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};