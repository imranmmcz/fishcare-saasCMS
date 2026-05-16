'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  Droplets,
  Fish,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Calendar,
} from 'lucide-react';

// Sample data for demonstration
const stats = {
  totalPonds: 5,
  totalFish: 1250,
  totalStock: 45000,
  totalRevenue: 125000,
  pondGrowth: 12.5,
  fishGrowth: 8.3,
  stockGrowth: -2.1,
  revenueGrowth: 15.8,
};

const recentActivities = [
  { id: 1, text: 'রুই মাছ স্টক করা হয়েছে', time: '২ ঘন্টা আগে', type: 'stock' },
  { id: 2, text: 'পুকুর ১ এ সার দেওয়া হয়েছে', time: '৫ ঘন্টা আগে', type: 'pond' },
  { id: 3, text: 'ওষুধ কেনা হয়েছে', time: '১ দিন আগে', type: 'purchase' },
  { id: 4, text: 'বিক্রয় হয়েছে ৫০ কেজি রুই', time: '২ দিন আগে', type: 'sale' },
];

const pondData = [
  { name: 'পুকুর ১', fish: 320, health: 95 },
  { name: 'পুকুর ২', fish: 280, health: 88 },
  { name: 'পুকুর ৩', fish: 250, health: 92 },
  { name: 'পুকুর ৪', fish: 200, health: 78 },
  { name: 'পুকুর ৫', fish: 200, health: 85 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
          <p className="text-gray-600">আপনার মাছচাষের সামগ্রিক অবস্থা</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500">
            <option>এই মাস</option>
            <option>গত মাস</option>
            <option>এই বছর</option>
          </select>
          <button className="px-4 py-2 bg-ocean-500 hover:bg-ocean-600 text-white rounded-lg text-sm font-medium transition-colors">
            + নতুন যোগ করুন
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-ocean-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${stats.pondGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.pondGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(stats.pondGrowth)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalPonds}</h3>
          <p className="text-sm text-gray-600">মোট পুকুর</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Fish className="w-6 h-6 text-emerald-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${stats.fishGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.fishGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(stats.fishGrowth)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalFish.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">মোট মাছ (পিস)</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${stats.stockGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.stockGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(stats.stockGrowth)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalStock.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">মোট ওজন (কেজি)</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.revenueGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(stats.revenueGrowth)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">৳{stats.totalRevenue.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">মোট আয়</p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Ponds Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">পুকুর সমূহ</h3>
            <Link href="/dashboard/ponds" className="text-sm text-ocean-600 hover:text-ocean-700 font-medium">
              সব দেখুন
            </Link>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {pondData.map((pond, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{pond.name}</span>
                      <span className="text-sm text-gray-600">{pond.fish} পিস</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pond.health}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className={`h-full rounded-full ${
                          pond.health >= 90 ? 'bg-green-500' :
                          pond.health >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className={`w-16 text-right text-sm font-medium ${
                    pond.health >= 90 ? 'text-green-600' :
                    pond.health >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {pond.health}%
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">সাম্প্রতিক কার্যক্রম</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'stock' ? 'bg-ocean-100 text-ocean-600' :
                    activity.type === 'pond' ? 'bg-emerald-100 text-emerald-600' :
                    activity.type === 'purchase' ? 'bg-orange-100 text-orange-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'stock' && <Package className="w-4 h-4" />}
                    {activity.type === 'pond' && <Droplets className="w-4 h-4" />}
                    {activity.type === 'purchase' && <Activity className="w-4 h-4" />}
                    {activity.type === 'sale' && <TrendingUp className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">দ্রুত কাজ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { icon: Droplets, label: 'পুকুর যোগ করুন', href: '/dashboard/ponds/new', color: 'ocean' },
            { icon: Fish, label: 'স্টক যোগ করুন', href: '/dashboard/fish/new', color: 'emerald' },
            { icon: Package, label: 'বিক্রয় করুন', href: '/dashboard/sales/new', color: 'orange' },
            { icon: Activity, label: 'হিসাব লিখুন', href: '/dashboard/accounting/new', color: 'purple' },
            { icon: DollarSign, label: 'চালান তৈরি', href: '/dashboard/invoices/new', color: 'pink' },
            { icon: TrendingUp, label: 'রিপোর্ট', href: '/dashboard/reports', color: 'indigo' },
          ].map((action, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={action.href}
                className={`flex flex-col items-center p-4 rounded-xl border-2 border-dashed border-${
                  action.color === 'ocean' ? 'ocean-200 hover:border-ocean-400 hover:bg-ocean-50' :
                  action.color === 'emerald' ? 'emerald-200 hover:border-emerald-400 hover:bg-emerald-50' :
                  action.color === 'orange' ? 'orange-200 hover:border-orange-400 hover:bg-orange-50' :
                  action.color === 'purple' ? 'purple-200 hover:border-purple-400 hover:bg-purple-50' :
                  action.color === 'pink' ? 'pink-200 hover:border-pink-400 hover:bg-pink-50' :
                  'indigo-200 hover:border-indigo-400 hover:bg-indigo-50'
                } transition-colors text-center`}
              >
                <action.icon className={`w-6 h-6 mb-2 text-${
                  action.color === 'ocean' ? 'ocean-600' :
                  action.color === 'emerald' ? 'emerald-600' :
                  action.color === 'orange' ? 'orange-600' :
                  action.color === 'purple' ? 'purple-600' :
                  action.color === 'pink' ? 'pink-600' :
                  'indigo-600'
                }`} />
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}