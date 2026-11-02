import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  Plus, 
  Trash2, 
  Star, 
  Eye, 
  ArrowLeft, 
  Check, 
  X,
  Package,
  RefreshCw,
  Tag,
  Box,
  Layers,
  Filter
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

const defaultProductsList: ProductItem[] = [
  {
    id: 'prod-101',
    name: 'Berry Pro React Material-UI Admin Template',
    category: 'Software',
    brand: 'CodedThemes',
    sku: 'SKU-BERRY-001',
    price: 69.00,
    originalPrice: 89.00,
    rating: 4.9,
    reviewsCount: 142,
    stock: 99,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Premier React & MUI admin dashboard template with modular design system, dark mode, TypeScript support, and full e-commerce modules.',
    features: ['React 19 & MUI v5 support', 'TypeScript standard code', '100+ UI Components', 'Multiple color presets'],
    specifications: [
      { label: 'Framework', value: 'React / Vite' },
      { label: 'UI Library', value: 'Material UI & Tailwind' },
      { label: 'License', value: 'Standard & Enterprise' }
    ],
    colors: [{ name: 'Royal Purple', hex: '#5e35b1' }, { name: 'Ocean Blue', hex: '#1e88e5' }]
  },
  {
    id: 'prod-102',
    name: 'Classic Slim Fit Cotton T-Shirt',
    category: 'T-Shirts',
    brand: 'Shop-co',
    sku: 'SKU-TSHIRT-002',
    price: 39.00,
    originalPrice: 55.00,
    rating: 4.7,
    reviewsCount: 88,
    stock: 45,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Ultra-breathable 100% organic cotton crewneck tee crafted for daily wear with reinforced stitching.',
    features: ['100% Organic Cotton', 'Pre-shrunk fabric', 'Machine washable at 30°C'],
    specifications: [
      { label: 'Material', value: 'Cotton' },
      { label: 'Fit', value: 'Slim Fit' }
    ],
    colors: [{ name: 'Classic Black', hex: '#000000' }, { name: 'Heather Gray', hex: '#64748b' }]
  },
  {
    id: 'prod-103',
    name: 'Figma UI Design System Kit (Berry Edition)',
    category: 'Software',
    brand: 'Berry Design',
    sku: 'SKU-FIGMA-003',
    price: 49.00,
    originalPrice: 79.00,
    rating: 4.8,
    reviewsCount: 64,
    stock: 80,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Complete Figma design system matching Berry UI with auto-layout v5, variants, tokens, and dark/light components.',
    features: ['Figma Auto Layout 5.0', 'Color Tokens & Styles', 'Desktop & Mobile frames'],
    specifications: [
      { label: 'File Format', value: '.FIG' },
      { label: 'Components', value: '250+' }
    ],
    colors: [{ name: 'Berry Theme', hex: '#5e35b1' }]
  },
  {
    id: 'prod-104',
    name: 'Vintage Denim Oxford Casual Shirt',
    category: 'Shirts',
    brand: 'Levi Style',
    sku: 'SKU-SHIRT-004',
    price: 79.50,
    originalPrice: 99.00,
    rating: 4.6,
    reviewsCount: 34,
    stock: 8,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Premium denim button-down shirt with chest pockets, relaxed fit, and vintage enzyme wash finish.',
    features: ['Heavyweight denim cotton', 'Button-down collar', 'Chest patch pockets'],
    specifications: [
      { label: 'Material', value: 'Denim Cotton' },
      { label: 'Care', value: 'Machine wash cold' }
    ],
    colors: [{ name: 'Indigo Blue', hex: '#1e3a8a' }]
  },
  {
    id: 'prod-105',
    name: 'ApexCharts Enterprise Analytics Dashboard',
    category: 'Software',
    brand: 'ApexCorp',
    sku: 'SKU-APEX-005',
    price: 129.00,
    originalPrice: 169.00,
    rating: 4.9,
    reviewsCount: 52,
    stock: 50,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Interactive analytics chart widgets with live data stream connectors, CSV export, and customization controls.',
    features: ['Realtime WebSocket data feed', '15+ Chart types', 'Export SVG & PNG'],
    specifications: [
      { label: 'Library', value: 'ApexCharts / Recharts' }
    ],
    colors: [{ name: 'Emerald', hex: '#10b981' }]
  },
  {
    id: 'prod-106',
    name: 'Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    brand: 'SonicPro',
    sku: 'SKU-AUDIO-006',
    price: 199.00,
    originalPrice: 249.00,
    rating: 4.8,
    reviewsCount: 110,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Active Noise Cancellation headphones with 40-hour battery life, spatial audio, and USB-C fast charging.',
    features: ['ANC Active Noise Cancelling', 'Bluetooth 5.3', '40-Hour Battery'],
    specifications: [
      { label: 'Connectivity', value: 'Bluetooth & 3.5mm' },
      { label: 'Weight', value: '250g' }
    ],
    colors: [{ name: 'Matte Black', hex: '#18181b' }, { name: 'Silver', hex: '#cbd5e1' }]
  }
];

interface ProductPageProps {
  themeConfig?: ThemeConfig;
  initialViewMode?: 'list' | 'details';
}

ing, setSubmitting] = useState(false);

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
export const ProductPage: React.FC<ProductPageProps> = () => {
  const [products, setProducts] = useState<ProductItem[]>([]); // 👈 Start with []
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products');
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        const formatted: ProductItem[] = res.data.map((p: any) => ({
          id: p._id || p.id || `prod-${Math.random()}`,
          name: p.name || 'Untitled Product',
          category: p.category || 'General',
          brand: p.brand || 'Shop-co',
          sku: `SKU-${String(p._id || p.id).slice(-6).toUpperCase()}`,
          price: Number(p.price) || 0,
          originalPrice: p.oldPrice ? Number(p.oldPrice) : Number(p.price) || 0,
          rating: p.rating || 4.5,
          reviewsCount: p.reviewsCount || 18,
          stock: p.stock !== undefined ? p.stock : 25,
          status: (p.stock ?? 25) > 10 ? 'In Stock' : (p.stock ?? 25) > 0 ? 'Low Stock' : 'Out of Stock',
          image: p.imageUrl || p.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
          gallery: [p.imageUrl || p.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'],
          description: p.description || 'Quality product in Berry live catalog.',
          features: ['Premium craftsmanship', 'Quality guarantee'],
          specifications: [{ label: 'Brand', value: p.brand || 'Shop-co' }],
          colors: [{ name: 'Default', hex: '#18181b' }]
        }));

        setProducts(formatted);
        saveProductsToLocal(formatted);
        if (!selectedProductId && formatted.length > 0) {
          setSelectedProductId(formatted[0].id);
        }
      } else {
        loadFallbackProducts();
      }
    } catch (err) {
      console.warn('Could not load products from API server, switching to local cache:', err);
      loadFallbackProducts();
    } finally {
      setLoading(false);
    }
  };

  const loadFallbackProducts = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
          if (!selectedProductId) setSelectedProductId(parsed[0].id);
          return;
        }
      }
    } catch (e) {
      console.warn('Error reading local products:', e);
    }
    setProducts(defaultProductsList);
    saveProductsToLocal(defaultProductsList);
    if (!selectedProductId) setSelectedProductId(defaultProductsList[0].id);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.image);
    }
  }, [selectedProductId, selectedProduct]);

  const categories = ['All', 'Software', 'T-Shirts', 'Shirts', 'Electronics', 'Accessories'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Handle deleting a product
  const handleDeleteProduct = async (id: string) => {
    try {
      await API.delete(`/products/${id}`);
    } catch (err: any) {
      console.warn('API delete product failed, deleting locally:', err);
    }

    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveProductsToLocal(updated);
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

  // Handle adding a product
  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.price) return;

    setSubmitting(true);
    const newId = `prod-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdProduct: ProductItem = {
      id: newId,
      name: newProduct.name,
      category: newProduct.category,
      brand: newProduct.brand || 'Shop-co',
      sku: `SKU-${newProduct.category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      price: Number(newProduct.price) || 0,
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : (Number(newProduct.price) * 1.25),
      rating: 4.8,
      reviewsCount: 1,
      stock: Number(newProduct.stock) || 25,
      status: (Number(newProduct.stock) || 25) > 10 ? 'In Stock' : 'Low Stock',
      image: newProduct.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      gallery: [newProduct.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'],
      description: newProduct.description || 'Premium quality product added to live catalog.',
      features: ['High quality material', '100% Satisfaction guarantee'],
      specifications: [
        { label: 'Brand', value: newProduct.brand || 'Shop-co' },
        { label: 'Category', value: newProduct.category }
      ],
      colors: [{ name: 'Default', hex: '#5e35b1' }]
    };

    try {
      await API.post('/products', {
        name: createdProduct.name,
        description: createdProduct.description,
        price: createdProduct.price,
        category: createdProduct.category,
        stock: createdProduct.stock,
        imageUrl: createdProduct.image
      });
    } catch (e) {
      console.warn('API Post Product failed, saving locally:', e);
    }

    const updated = [createdProduct, ...products];
    setProducts(updated);
    saveProductsToLocal(updated);
    setIsAddModalOpen(false);
    setSelectedProductId(createdProduct.id);
    showToast(`"${createdProduct.name}" added successfully!`);

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
    setSubmitting(false);
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
          <h1 className="text-xl font-bold text-slate-800">
            {viewMode === 'details' && selectedProduct ? 'Product Details' : `Live Products Catalog (${products.length})`}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
            <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">E-commerce</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#5e35b1] font-semibold">
              {viewMode === 'details' && selectedProduct ? 'Product Details' : 'Products'}
            </span>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Refresh Button */}
          <button
            onClick={fetchProducts}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            title="Refresh Products"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          {/* Switch View Buttons */}
          <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list' 
                  ? 'bg-[#ede7f6] text-[#5e35b1]' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => {
                if (selectedProduct) {
                  setViewMode('details');
                  setActiveImage(selectedProduct.image);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'details' 
                  ? 'bg-[#ede7f6] text-[#5e35b1]' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Product Details
            </button>
          </div>

          {/* "+ Add Product" Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* MODE 1: PRODUCT DETAILS VIEW */}
      {viewMode === 'details' && selectedProduct && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('list')}
                className="p-2 rounded-xl text-slate-500 hover:text-[#5e35b1] hover:bg-[#ede7f6] transition-all"
                title="Back to Products List"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <p className="text-xs font-medium text-slate-400">SKU: {selectedProduct.sku}</p>
                <h2 className="text-sm font-bold text-slate-800 line-clamp-1">{selectedProduct.name}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(selectedProduct.id)}
                className="px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Product</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden p-5 sm:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Product Image & Gallery */}
              <div className="lg:col-span-5 space-y-4">
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-4 relative group">
                  <img
                    src={activeImage || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full shadow-xs ${
                    selectedProduct.status === 'In Stock' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : selectedProduct.status === 'Low Stock' 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {selectedProduct.status} ({selectedProduct.stock} left)
                  </span>
                </div>

                {/* Thumbnails */}
                {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {selectedProduct.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`w-16 h-16 rounded-xl border p-1 bg-slate-50 overflow-hidden flex-shrink-0 transition-all ${
                          activeImage === img ? 'border-purple-600 ring-2 ring-purple-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#5e35b1] bg-[#ede7f6] px-2.5 py-1 rounded-lg">
                    {selectedProduct.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Brand: <strong className="text-slate-800">{selectedProduct.brand}</strong>
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h1>

                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(selectedProduct.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {selectedProduct.rating.toFixed(1)} ({selectedProduct.reviewsCount} reviews)
                  </span>
                </div>

                <div className="flex items-baseline gap-3 py-3 border-y border-slate-100">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-sm font-medium text-slate-400 line-through">
                      ${selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Features & Specifications */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Highlights:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProduct.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(selectedProduct.id)}
                    className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Product</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all"
                  >
                    Back to All Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ALL PRODUCTS LIST / GRID */}
      {viewMode === 'list' && (
        <div className="space-y-5">
          {/* Filter Bar & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by name, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-700 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#5e35b1] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="py-12 text-center text-xs font-semibold text-slate-500 flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
              <span>Loading products catalog...</span>
            </div>
          )}

          {/* Product Cards Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div className="relative w-full h-52 bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />

                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      product.status === 'In Stock' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : product.status === 'Low Stock' 
                        ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {product.status} ({product.stock})
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmId(product.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/90 hover:bg-rose-50 hover:text-rose-600 text-slate-400 shadow-xs transition-all opacity-0 group-hover:opacity-100"
                      title="Delete product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>{product.brand}</span>
                        <span className="text-[#5e35b1] font-semibold">{product.category}</span>
                      </div>

                      <h3 
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setActiveImage(product.image);
                          setViewMode('details');
                        }}
                        className="font-bold text-slate-800 text-xs sm:text-sm mt-1 line-clamp-2 hover:text-[#5e35b1] cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-700">{product.rating.toFixed(1)}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setActiveImage(product.image);
                          setViewMode('details');
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#ede7f6] hover:bg-[#d1c4e9] text-[#5e35b1] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(product.id)}
                        className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center transition-all"
                        title="Delete product"
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
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No products found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: ADD NEW PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-xl w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#ede7f6] flex items-center justify-center text-[#5e35b1]">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Add New Product to Catalog</h3>
                  <p className="text-[11px] text-slate-400">Product will immediately appear in dashboard catalog</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Slim Fit Denim Shirt"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Software">Software</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Shop-co, Nike"
                    value={newProduct.brand}
                    onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="149.99"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stock Units</label>
                  <input
                    type="number"
                    placeholder="25"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.image}
                  onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Detailed product features..."
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl resize-none"
                />
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
                  <span>{submitting ? 'Adding...' : 'Save Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Delete Product from Catalog?</h3>
              <p className="text-xs text-slate-500">
                This will remove the product from your store view and dashboard inventory.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};