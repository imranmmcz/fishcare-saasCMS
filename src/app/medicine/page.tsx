'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Share2, Star, Filter, Grid3X3, List, ArrowRight, ChevronDown, X } from 'lucide-react';

const medicines = [
  { id: 1, name: 'অক্সিটেট্রাসাইক্লিন', category: 'অ্যান্টিবায়োটিক', price: 350, oldPrice: 420, rating: 4.8, reviews: 124, stock: 50, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', badge: 'বেস্ট সেলার' },
  { id: 2, name: 'প্রোবায়োটিক মিক্স', category: 'প্রোবায়োটিক', price: 280, oldPrice: null, rating: 4.9, reviews: 89, stock: 30, image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80', badge: 'জনপ্রিয়' },
  { id: 3, name: 'ভিটামিন প্রিমিক্স', category: 'ভিটামিন', price: 220, oldPrice: 260, rating: 4.7, reviews: 156, stock: 100, image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80', badge: 'ফ্ল্যাশ সেল' },
  { id: 4, name: 'ফর্মালিন সলিউশন', category: 'ডিসইনফেক্ট্যান্ট', price: 180, oldPrice: null, rating: 4.6, reviews: 78, stock: 20, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', badge: null },
  { id: 5, name: 'পটাশিয়াম পারম্যাঙ্গানেট', category: 'ডিসইনফেক্ট্যান্ট', price: 150, oldPrice: 180, rating: 4.5, reviews: 92, stock: 40, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80', badge: null },
  { id: 6, name: 'এমোক্সিসিলিন', category: 'অ্যান্টিবায়োটিক', price: 420, oldPrice: 500, rating: 4.8, reviews: 134, stock: 35, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80', badge: 'নতুন' },
  { id: 7, name: 'কালিফনিক এসিড', category: 'অ্যান্টিবায়োটিক', price: 380, oldPrice: 450, rating: 4.6, reviews: 67, stock: 25, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', badge: null },
  { id: 8, name: 'ফেরিক ক্লোরাইড', category: 'মিনারেল', price: 200, oldPrice: null, rating: 4.4, reviews: 45, stock: 60, image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80', badge: null },
];

const categories = ['সব', 'অ্যান্টিবায়োটিক', 'ভিটামিন', 'প্রোবায়োটিক', 'ডিসইনফেক্ট্যান্ট', 'মিনারেল', 'ছত্রাকনাশক'];

export default function MedicinePage() {
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredMedicines = medicines.filter(m =>
    selectedCategory === 'সব' || m.category === selectedCategory
  );

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Fish Care</h1>
                <p className="text-xs text-gray-500">ওষুধের দোকান</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ওষুধ খুঁজুন..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="relative p-2 text-gray-600 hover:text-ocean-600">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-ocean-600">হোম</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">মাছের ওষুধ</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">ক্যাটাগরি</h3>
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-ocean-50 text-ocean-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm"
                >
                  <Filter className="w-4 h-4" />
                  ফিল্টার
                </button>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{filteredMedicines.length}</span> টি পণ্য পাওয়া গেছে
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-ocean-500"
                >
                  <option value="popular">জনপ্রিয়তা</option>
                  <option value="price-low">দাম কম থেকে বেশি</option>
                  <option value="price-high">দাম বেশি থেকে কম</option>
                  <option value="newest">নতুন</option>
                </select>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-ocean-50 text-ocean-600' : 'text-gray-400'}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-ocean-50 text-ocean-600' : 'text-gray-400'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}>
              {filteredMedicines.map((medicine, index) => (
                <motion.div
                  key={medicine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                    <Image
                      src={medicine.image}
                      alt={medicine.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {medicine.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        {medicine.badge}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleWishlist(medicine.id)}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(medicine.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </button>
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex items-center' : ''}`}>
                    {viewMode === 'list' ? (
                      <>
                        <div className="flex-1">
                          <span className="text-xs text-ocean-600 font-medium">{medicine.category}</span>
                          <h3 className="font-semibold text-gray-900 mt-1">{medicine.name}</h3>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{medicine.rating} ({medicine.reviews})</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <span className="text-lg font-bold text-gray-900">৳{medicine.price}</span>
                          {medicine.oldPrice && <span className="text-sm text-gray-400 line-through ml-2">৳{medicine.oldPrice}</span>}
                        </div>
                        <button className="ml-4 w-10 h-10 bg-ocean-500 hover:bg-ocean-600 rounded-xl flex items-center justify-center text-white transition-colors">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-xs text-ocean-600 font-medium">{medicine.category}</span>
                        <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">{medicine.name}</h3>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(medicine.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({medicine.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-lg font-bold text-gray-900">৳{medicine.price}</span>
                            {medicine.oldPrice && <span className="text-sm text-gray-400 line-through ml-2">৳{medicine.oldPrice}</span>}
                          </div>
                          <button className="w-10 h-10 bg-ocean-500 hover:bg-ocean-600 rounded-xl flex items-center justify-center text-white transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">ফিল্টার</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowFilters(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-ocean-50 text-ocean-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}