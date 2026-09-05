import React, { useState } from 'react';
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
  ShieldCheck, 
  Truck, 
  RotateCcw,
  SlidersHorizontal,
  X,
  Package
} from 'lucide-react';
import { ThemeConfig } from '../../types';

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

const initialProducts: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    category: 'Audio',
    brand: 'Sony',
    sku: 'SNY-WH1000XM5-BLK',
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewsCount: 248,
    stock: 45,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Industry-leading noise canceling with two processors and 8 microphones for unprecedented noise canceling and exceptional call quality. Engineered with an ultra-comfortable lightweight design in soft fit leather.',
    features: [
      'Industry-leading noise cancellation optimized to your environment',
      'Up to 30-hour battery life with quick charging (3 min for 3 hours)',
      'Crystal clear hands-free calling with 4 beamforming microphones',
      'Ultra-comfortable, lightweight design with soft fit leather'
    ],
    specifications: [
      { label: 'Brand', value: 'Sony' },
      { label: 'Model', value: 'WH-1000XM5' },
      { label: 'Connectivity', value: 'Bluetooth 5.2, 3.5mm AUX' },
      { label: 'Battery Life', value: '30 Hours (ANC On)' },
      { label: 'Charging', value: 'USB-C Fast Charging' },
      { label: 'Weight', value: '250 grams' },
      { label: 'Warranty', value: '1 Year Manufacturer' }
    ],
    colors: [
      { name: 'Black', hex: '#1e1e1e' },
      { name: 'Silver Platinum', hex: '#d1d5db' },
      { name: 'Midnight Blue', hex: '#1e3a8a' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Apple Watch Ultra 2 Titanium GPS + Cellular',
    category: 'Wearables',
    brand: 'Apple',
    sku: 'APL-WTC-ULTRA2',
    price: 799.00,
    originalPrice: 849.00,
    rating: 4.9,
    reviewsCount: 312,
    stock: 28,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The ultimate sports and adventure watch features a lightweight aerospace-grade titanium case, extra-long battery life, and the brightest Apple display ever.',
    features: [
      'Rugged 49mm aerospace-grade titanium case',
      'Up to 36 hours of battery life under standard use',
      'Precision dual-frequency GPS for accurate distance and pace',
      'Water resistant 100m with recreational scuba dive certification'
    ],
    specifications: [
      { label: 'Brand', value: 'Apple' },
      { label: 'Case Size', value: '49mm Titanium' },
      { label: 'Display', value: 'Always-On Retina 3000 nits' },
      { label: 'Water Resistance', value: '100m ISO 22810' },
      { label: 'Connectivity', value: 'LTE, GPS, Wi-Fi, BT 5.3' },
      { label: 'Warranty', value: '1 Year AppleCare' }
    ],
    colors: [
      { name: 'Natural Titanium', hex: '#a8a29e' },
      { name: 'Orange Trail', hex: '#ea580c' },
      { name: 'Midnight Ocean', hex: '#0f172a' }
    ]
  },
  {
    id: 'prod-3',
    name: 'MacBook Pro 16" M3 Max Liquid Retina XDR',
    category: 'Laptops',
    brand: 'Apple',
    sku: 'APL-MBP-16M3MAX',
    price: 2499.00,
    originalPrice: 2699.00,
    rating: 5.0,
    reviewsCount: 184,
    stock: 15,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Supercharged by M3 Max chip with up to 16 CPU cores and 40 GPU cores. Features breathtaking Liquid Retina XDR display and all-day battery life.',
    features: [
      'Apple M3 Max 16-core CPU with extreme computing throughput',
      '16.2-inch Liquid Retina XDR display with 1,600 nits peak brightness',
      'Up to 22 hours of battery life with advanced thermal efficiency',
      'Three Thunderbolt 4 ports, HDMI port, SDXC card slot, MagSafe 3'
    ],
    specifications: [
      { label: 'Brand', value: 'Apple' },
      { label: 'Chip', value: 'M3 Max 16-Core' },
      { label: 'Memory', value: '36GB Unified RAM' },
      { label: 'Storage', value: '1TB PCIe SSD' },
      { label: 'Display', value: '16.2" Liquid Retina XDR 120Hz' },
      { label: 'Warranty', value: '1 Year AppleCare' }
    ],
    colors: [
      { name: 'Space Black', hex: '#262626' },
      { name: 'Silver', hex: '#e5e5e5' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Canon EOS R6 Mark II Mirrorless Full Frame Camera',
    category: 'Cameras',
    brand: 'Canon',
    sku: 'CNN-EOS-R6M2',
    price: 2299.00,
    originalPrice: 2499.00,
    rating: 4.7,
    reviewsCount: 96,
    stock: 8,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'High-speed continuous shooting at up to 40 fps electronic shutter. Next-generation Dual Pixel CMOS AF II with deep learning AI subject detection.',
    features: [
      '24.2 Megapixel Full-Frame CMOS image sensor',
      '4K 60p full-sensor oversampled video without 30-min recording limit',
      'Up to 8 stops of in-body Image Stabilization (IBIS)',
      'Dual UHS-II SD card slots for redundant recording'
    ],
    specifications: [
      { label: 'Brand', value: 'Canon' },
      { label: 'Mount', value: 'Canon RF' },
      { label: 'Sensor', value: '24.2 MP Full-Frame' },
      { label: 'Video', value: '4K 60fps 10-bit 4:2:2 C-Log3' },
      { label: 'ISO Range', value: '100-102400 (Expandable)' },
      { label: 'Weight', value: '670g (Body only)' }
    ],
    colors: [
      { name: 'Matte Black', hex: '#171717' }
    ]
  },
  {
    id: 'prod-5',
    name: 'Logitech MX Master 3S Ergonomic Wireless Mouse',
    category: 'Accessories',
    brand: 'Logitech',
    sku: 'LOG-MXM3S-GRY',
    price: 99.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviewsCount: 520,
    stock: 80,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'An icon remastered. Quiet Clicks and 8K DPI any-surface tracking make it faster, quieter, and more precise than ever for advanced power users.',
    features: [
      'Quiet clicks with 90% less click noise than predecessor',
      '8,000 DPI Darkfield sensor tracks glass surfaces effortlessly',
      'MagSpeed electromagnetic scroll wheel scrolls 1,000 lines per second',
      'Connect up to 3 computers with seamless Cross-Computer Flow'
    ],
    specifications: [
      { label: 'Brand', value: 'Logitech' },
      { label: 'Sensor', value: 'Darkfield 8000 DPI' },
      { label: 'Battery', value: 'Up to 70 Days per full charge' },
      { label: 'Buttons', value: '7 programmable buttons' },
      { label: 'Connectivity', value: 'Bluetooth & Logi Bolt USB' }
    ],
    colors: [
      { name: 'Graphite', hex: '#334155' },
      { name: 'Pale Gray', hex: '#e2e8f0' }
    ]
  },
  {
    id: 'prod-6',
    name: 'Nike Air Max 270 React Running Shoes',
    category: 'Footwear',
    brand: 'Nike',
    sku: 'NKE-AM270-WHT',
    price: 159.95,
    originalPrice: 179.95,
    rating: 4.6,
    reviewsCount: 142,
    stock: 19,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Nike Air Max 270 delivers unrivaled, all-day comfort. The sleek, running-inspired design roots you to Nike DNA with super soft cushioning.',
    features: [
      'Large Max Air 270 unit delivers responsive all-day bounce',
      'Woven and synthetic fabric on the upper provides lightweight fit',
      'Foam midsole feels soft and comfortable under foot',
      'Rubber on the outsole adds durable traction'
    ],
    specifications: [
      { label: 'Brand', value: 'Nike' },
      { label: 'Silhouette', value: 'Air Max 270' },
      { label: 'Upper', value: 'Breathable Engineered Mesh' },
      { label: 'Sole', value: 'Rubber with 270 Air Unit' },
      { label: 'Closure', value: 'Lace-Up' }
    ],
    colors: [
      { name: 'Crimson Red', hex: '#dc2626' },
      { name: 'Black White', hex: '#000000' },
      { name: 'Pure Platinum', hex: '#f1f5f9' }
    ]
  }
];

interface ProductPageProps {
  themeConfig: ThemeConfig;
  initialViewMode?: 'list' | 'details';
}

export const ProductPage: React.FC<ProductPageProps> = () => {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProducts[0].id);
  const [viewMode, setViewMode] = useState<'list' | 'details'>('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Electronics',
    brand: '',
    price: '',
    originalPrice: '',
    stock: '25',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    description: '',
    sku: ''
  });

  // Active product for details
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Active thumbnail for gallery in details view
  const [activeImage, setActiveImage] = useState<string>(selectedProduct?.image || '');
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const categories = ['All', 'Audio', 'Wearables', 'Laptops', 'Cameras', 'Accessories', 'Footwear'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Handle deleting a product
  const handleDeleteProduct = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    setDeleteConfirmId(null);
    showToast(`"${productToDelete?.name || 'Product'}" has been deleted.`);
    
    if (selectedProductId === id) {
      if (updated.length > 0) {
        setSelectedProductId(updated[0].id);
        setActiveImage(updated[0].image);
      } else {
        setViewMode('list');
      }
    }
  };

  // Handle adding a new product
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.price) return;

    const priceNum = parseFloat(newProduct.price) || 99.99;
    const originalPriceNum = newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : priceNum * 1.15;
    const stockNum = parseInt(newProduct.stock, 10) || 15;
    const newId = `prod-${Date.now()}`;

    const createdProduct: ProductItem = {
      id: newId,
      name: newProduct.name,
      category: newProduct.category || 'Electronics',
      brand: newProduct.brand || 'Premium Brand',
      sku: newProduct.sku || `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
      price: priceNum,
      originalPrice: originalPriceNum,
      rating: parseFloat(newProduct.rating) || 4.8,
      reviewsCount: 1,
      stock: stockNum,
      status: stockNum > 10 ? 'In Stock' : stockNum > 0 ? 'Low Stock' : 'Out of Stock',
      image: newProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      gallery: [
        newProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
      ],
      description: newProduct.description || 'Modern high-performance device with cutting-edge engineering, premium durability, and manufacturer warranty.',
      features: [
        'Built with premium aerospace-grade materials',
        'Long-lasting energy efficiency & battery standby',
        'Intuitive interface and ergonomic design',
        'Comprehensive 1-year product warranty'
      ],
      specifications: [
        { label: 'Brand', value: newProduct.brand || 'Berry Official' },
        { label: 'Category', value: newProduct.category },
        { label: 'SKU', value: newProduct.sku || `SKU-${Date.now().toString().slice(-6)}` },
        { label: 'Condition', value: 'Brand New (Sealed)' },
        { label: 'Warranty', value: '1 Year Manufacturer' }
      ],
      colors: [
        { name: 'Obsidian Black', hex: '#1e293b' },
        { name: 'Berry Purple', hex: '#5e35b1' },
        { name: 'Silver Slate', hex: '#94a3b8' }
      ]
    };

    setProducts([createdProduct, ...products]);
    setSelectedProductId(newId);
    setActiveImage(createdProduct.image);
    setIsAddModalOpen(false);
    setViewMode('details');
    showToast(`"${createdProduct.name}" added successfully!`);

    // Reset form
    setNewProduct({
      name: '',
      category: 'Electronics',
      brand: '',
      price: '',
      originalPrice: '',
      stock: '25',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      description: '',
      sku: ''
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Breadcrumb & Page Header (Exact Berry style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {viewMode === 'details' && selectedProduct ? 'Product Details' : 'Products'}
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

        {/* Global Action Buttons: Add Product & View Mode Switch */}
        <div className="flex items-center gap-2.5">
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

          {/* "+ Add Product" Button (Berry Blue #1e88e5) */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#1e88e5] hover:bg-[#1565c0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODE 1: PRODUCT DETAILS VIEW (Prominent Details + Delete + Add) */}
      {/* ============================================================ */}
      {viewMode === 'details' && selectedProduct && (
        <div className="space-y-6">
          {/* Top Bar with Navigation Back & Delete Button */}
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

            {/* Delete button right inside Product Details view */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(selectedProduct.id)}
                className="px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:border-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                title="Delete this product"
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

          {/* Product Details Main Card (Berry eCommerce details layout) */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden p-5 sm:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Span 5): Image Gallery */}
              <div className="lg:col-span-5 space-y-4">
                {/* Main Large Image */}
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-4 relative group">
                  <img
                    src={activeImage || selectedProduct.image}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Stock status overlay badge */}
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

                {/* Thumbnails row */}
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {selectedProduct.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl border-2 p-1 bg-slate-50 shrink-0 transition-all ${
                        (activeImage === img || (!activeImage && idx === 0))
                          ? 'border-[#5e35b1] shadow-xs' 
                          : 'border-slate-100 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumb ${idx}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain mix-blend-multiply rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column (Span 7): Product Details & Purchase Actions */}
              <div className="lg:col-span-7 space-y-5">
                {/* Brand and Category badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#5e35b1] bg-[#ede7f6] px-2.5 py-1 rounded-lg">
                    {selectedProduct.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Brand: <strong className="text-slate-800">{selectedProduct.brand}</strong>
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h1>

                {/* Star Ratings & Reviews count */}
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
                    {selectedProduct.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({selectedProduct.reviewsCount} customer reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 py-2 border-y border-slate-100">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <>
                      <span className="text-sm font-medium text-slate-400 line-through">
                        ${selectedProduct.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        Save ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Color Swatches */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-700">
                      Color: <span className="font-normal text-slate-500">{selectedProduct.colors[selectedColor]?.name}</span>
                    </p>
                    <div className="flex items-center gap-2.5">
                      {selectedProduct.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(idx)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            selectedColor === idx 
                              ? 'ring-2 ring-offset-2 ring-[#5e35b1]' 
                              : 'opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColor === idx && (
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overview Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Quantity & Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-700 font-bold hover:bg-slate-100 shadow-xs"
                    >
                      -
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-700 font-bold hover:bg-slate-100 shadow-xs"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => showToast(`Added ${quantity} item(s) of "${selectedProduct.name}" to cart.`)}
                    className="px-5 py-2.5 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all"
                  >
                    <span>Add to Cart</span>
                  </button>

                  {/* Red Delete Button right next to cart action */}
                  <button
                    onClick={() => setDeleteConfirmId(selectedProduct.id)}
                    className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>

                {/* Assurance Perks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#1e88e5]" />
                    <span>Free Delivery across country</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#5e35b1]" />
                    <span>1 Year Official Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-emerald-600" />
                    <span>30-Day Hassle Free Returns</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Tabs: Description, Specifications, Reviews */}
            <div className="mt-10 border-t border-slate-100 pt-6">
              {/* Tab Navigation */}
              <div className="flex items-center gap-6 border-b border-slate-100 pb-3">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`text-xs font-bold pb-1 transition-all ${
                    activeTab === 'description'
                      ? 'text-[#5e35b1] border-b-2 border-[#5e35b1]'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Features & Details
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`text-xs font-bold pb-1 transition-all ${
                    activeTab === 'specifications'
                      ? 'text-[#5e35b1] border-b-2 border-[#5e35b1]'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`text-xs font-bold pb-1 transition-all ${
                    activeTab === 'reviews'
                      ? 'text-[#5e35b1] border-b-2 border-[#5e35b1]'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Reviews ({selectedProduct.reviewsCount})
                </button>
              </div>

              {/* Tab 1: Description & Features */}
              {activeTab === 'description' && (
                <div className="pt-4 space-y-4 text-xs text-slate-600">
                  <p>{selectedProduct.description}</p>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Key Highlights:</h4>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Specifications Table */}
              {activeTab === 'specifications' && (
                <div className="pt-4 overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse max-w-2xl">
                    <tbody className="divide-y divide-slate-100">
                      {selectedProduct.specifications.map((spec, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-2.5 pr-4 font-semibold text-slate-500 w-1/3">{spec.label}</td>
                          <td className="py-2.5 pl-4 font-medium text-slate-800">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3: Customer Reviews */}
              {activeTab === 'reviews' && (
                <div className="pt-4 space-y-4">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl max-w-md">
                    <span className="text-3xl font-extrabold text-[#5e35b1]">
                      {selectedProduct.rating.toFixed(1)}
                    </span>
                    <div>
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Based on {selectedProduct.reviewsCount} verified reviews</p>
                    </div>
                  </div>

                  <div className="space-y-3 max-w-xl text-xs">
                    <div className="p-3 border border-slate-100 rounded-xl bg-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Alexander Hayes</span>
                        <span className="text-[10px] text-slate-400">2 days ago</span>
                      </div>
                      <p className="text-slate-600">
                        Exceeded expectations! Build quality is top notch and the delivery was fast.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODE 2: ALL PRODUCTS LIST / GRID (with details, delete, add) */}
      {/* ============================================================ */}
      {viewMode === 'list' && (
        <div className="space-y-5">
          {/* Filter Bar & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by name, brand, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-700 placeholder-slate-400"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
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

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
              >
                {/* Product Image Box */}
                <div className="relative w-full h-52 bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Stock Pill Badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    product.status === 'In Stock' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : product.status === 'Low Stock' 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {product.status}
                  </span>

                  {/* Quick Delete icon on image */}
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

                {/* Product Meta Info */}
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
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{product.rating.toFixed(1)}</span>
                      <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Action Buttons Row: View Details + Delete */}
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
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No products found</p>
              <p className="text-xs text-slate-400">Try changing your search terms or filters.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 rounded-xl bg-[#5e35b1] text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 1: ADD NEW PRODUCT MODAL                                */}
      {/* ============================================================ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-xl w-full p-6 space-y-4 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#ede7f6] flex items-center justify-center text-[#5e35b1]">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Add New Product</h3>
                  <p className="text-[11px] text-slate-400">Enter product details to add to catalog</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3.5">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              {/* Category and Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                  >
                    <option value="Audio">Audio</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Cameras">Cameras</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Smart Devices">Smart Devices</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Sony, Apple, Nike"
                    value={newProduct.brand}
                    onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Price, Original Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="299.99"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="349.99"
                    value={newProduct.originalPrice}
                    onChange={e => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stock Units</label>
                  <input
                    type="number"
                    placeholder="25"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Image URL & Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.image}
                  onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
                {/* Presets */}
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                  <span>Quick sample:</span>
                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80' })}
                    className="text-[#5e35b1] hover:underline"
                  >
                    Smartwatch
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' })}
                    className="text-[#5e35b1] hover:underline"
                  >
                    Headphones
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80' })}
                    className="text-[#5e35b1] hover:underline"
                  >
                    Laptop
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Detailed product features, materials, and specification notes..."
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none"
                />
              </div>

              {/* Form Buttons */}
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
                  className="px-4 py-2 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: DELETE CONFIRMATION MODAL                            */}
      {/* ============================================================ */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Delete Product?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to delete this product? This action will remove it from the catalog.
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

      {/* CodedThemes Footer (Exact Berry style) */}
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
