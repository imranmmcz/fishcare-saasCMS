'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, MapPin, Calendar, RefreshCw, Download, Share2, Filter } from 'lucide-react';

const divisions = [
  { value: 'dhaka', label: 'ঢাকা', districts: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'টঙ্গী', 'সাভার'] },
  { value: 'chittagong', label: 'চট্টগ্রাম', districts: ['চট্টগ্রাম', 'কক্সবাজার', 'রাঙ্গামাটি', 'বান্দরবান'] },
  { value: 'khulna', label: 'খুলনা', districts: ['খুলনা', 'বাগেরহাট', 'সাতক্ষীরা', 'যশোর'] },
  { value: 'rajshahi', label: 'রাজশাহী', districts: ['রাজশাহী', 'বগুড়া', 'পাবনা', 'নওগাঁ'] },
  { value: 'sylhet', label: 'সিলেট', districts: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'] },
  { value: 'barisal', label: 'বরিশাল', districts: ['বরিশাল', 'ভোলা', 'ঝালকাঠি', 'পটুয়াখালী'] },
  { value: 'rangpur', label: 'রংপুর', districts: ['রংপুর', 'দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম'] },
  { value: 'mymensingh', label: 'ময়মনসিংহ', districts: ['ময়মনসিংহ', 'জামালপুর', 'শেরপুর', 'নেত্রকোণা'] },
];

const fishPrices = {
  dhaka: [
    { fish: 'রুই', sizes: [{ size: 'বড়', wholesale: 280, retail: 320, trend: 'up' }, { size: 'মাঝারি', wholesale: 250, retail: 290, trend: 'stable' }, { size: 'ছোট', wholesale: 200, retail: 240, trend: 'down' }] },
    { fish: 'কাতলা', sizes: [{ size: 'বড়', wholesale: 260, retail: 300, trend: 'stable' }, { size: 'মাঝারি', wholesale: 230, retail: 270, trend: 'up' }] },
    { fish: 'তেলাপিয়া', sizes: [{ size: 'বড়', wholesale: 120, retail: 150, trend: 'stable' }, { size: 'ছোট', wholesale: 80, retail: 100, trend: 'down' }] },
    { fish: 'পাঙাশ', sizes: [{ size: 'বড়', wholesale: 180, retail: 220, trend: 'up' }, { size: 'মাঝারি', wholesale: 150, retail: 180, trend: 'stable' }] },
    { fish: 'কই', sizes: [{ size: 'মাঝারি', wholesale: 350, retail: 400, trend: 'stable' }, { size: 'ছোট', wholesale: 280, retail: 320, trend: 'up' }] },
    { fish: 'শিং', sizes: [{ size: 'মাঝারি', wholesale: 400, retail: 450, trend: 'stable' }] },
    { fish: 'মাগুর', sizes: [{ size: 'মাঝারি', wholesale: 500, retail: 580, trend: 'up' }] },
    { fish: 'বোয়াল', sizes: [{ size: 'বড়', wholesale: 280, retail: 330, trend: 'stable' }] },
  ],
  chittagong: [
    { fish: 'রুই', sizes: [{ size: 'বড়', wholesale: 290, retail: 330, trend: 'up' }, { size: 'মাঝারি', wholesale: 260, retail: 300, trend: 'stable' }] },
    { fish: 'চিংড়ি', sizes: [{ size: 'মাঝারি', wholesale: 450, retail: 520, trend: 'up' }] },
    { fish: 'পাবদা', sizes: [{ size: 'মাঝারি', wholesale: 320, retail: 370, trend: 'stable' }] },
  ],
};

const marketStats = [
  { label: 'মোট বাজার', value: '64', icon: MapPin },
  { label: 'আজকের আপডেট', value: '১২৮', icon: RefreshCw },
  { label: 'দাম বেড়েছে', value: '৪৫', icon: TrendingUp, color: 'text-green-600' },
  { label: 'দাম কমেছে', value: '২৩', icon: TrendingDown, color: 'text-red-600' },
];

export default function MarketPage() {
  const [selectedDivision, setSelectedDivision] = useState('dhaka');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [dateRange, setDateRange] = useState('today');

  const currentDivision = divisions.find(d => d.value === selectedDivision);
  const prices = fishPrices[selectedDivision as keyof typeof fishPrices] || fishPrices.dhaka;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Fish Care</h1>
                <p className="text-xs text-gray-500">বাজার মূল্য</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50">
                <Download className="w-4 h-4" />
                ডাউনলোড
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50">
                <Share2 className="w-4 h-4" />
                শেয়ার
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
            <span className="text-gray-900 font-medium">বাজার মূল্য</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {marketStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color || 'text-ocean-600'}`} />
                <span className="text-xs text-gray-500">আজ</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Selector */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">আপনার এলাকা নির্বাচন করুন</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">বিভাগ</label>
              <select
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict('');
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              >
                {divisions.map((div) => (
                  <option key={div.value} value={div.value}>{div.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">জেলা</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              >
                <option value="">সকল জেলা</option>
                {currentDivision?.districts.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">সময়কাল</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              >
                <option value="today">আজ</option>
                <option value="week">এই সপ্তাহ</option>
                <option value="month">এই মাস</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prices Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{currentDivision?.label} বিভাগের বাজার মূল্য</h3>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4" />
                সর্বশেষ আপডেট: আজ, সকাল ১০টা
              </p>
            </div>
            <button className="flex items-center gap-2 text-ocean-600 hover:text-ocean-700 text-sm font-medium">
              <RefreshCw className="w-4 h-4" />
              রিফ্রেশ
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">মাছের নাম</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">সাইজ</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">পাইকারি দাম</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">খুচরা দাম</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">প্রবণতা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prices.map((item, index) => (
                  item.sizes.map((size, sizeIndex) => (
                    <motion.tr
                      key={`${index}-${sizeIndex}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (sizeIndex * 0.05) }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {sizeIndex === 0 && (
                        <td rowSpan={item.sizes.length} className="px-6 py-4">
                          <span className="font-semibold text-gray-900">{item.fish}</span>
                        </td>
                      )}
                      <td className="px-6 py-4 text-gray-600">{size.size}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">৳{size.wholesale}/কেজি</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">৳{size.retail}/কেজি</td>
                      <td className="px-6 py-4 text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                          size.trend === 'up' ? 'bg-green-100' : size.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          {size.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                          {size.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                          {size.trend === 'stable' && <Minus className="w-4 h-4 text-gray-600" />}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price Comparison */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">বিভাগভিত্তিক দাম তুলনা</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['রুই (বড়)', 'কাতলা (মাঝারি)', 'তেলাপিয়া (ছোট)', 'পাঙাশ (বড়)'].map((fish, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">{fish}</p>
                <div className="space-y-2">
                  {['ঢাকা', 'চট্টগ্রাম', 'খুলনা', 'রাজশাহী'].map((div, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-500">{div}</span>
                      <span className="font-medium">৳{280 + Math.floor(Math.random() * 50)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}