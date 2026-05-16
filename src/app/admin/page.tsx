'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  FileText,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Calendar,
  Activity,
  ArrowRight,
} from 'lucide-react';

// Stats Data
const stats = [
  { label: 'মোট বিক্রয় (এই মাস)', value: '৳২,৫০,০০০', growth: 12.5, icon: TrendingUp, color: 'ocean' },
  { label: 'মোট অর্ডার', value: '১,২৫০', growth: 8.3, icon: ShoppingCart, color: 'emerald' },
  { label: 'বকেয়া', value: '৳৪৫,০০০', growth: -5.2, icon: DollarSign, color: 'orange' },
  { label: 'নতুন ব্যবহারকারী', value: '১৫৬', growth: 15.8, icon: Users, color: 'purple' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'রহিম উদ্দিন', items: 3, total: '৳৪,৫০০', status: 'পেন্ডিং', time: '৫ মিনিট আগে' },
  { id: 'ORD-002', customer: 'করিম শেখ', items: 5, total: '৳৮,২০০', status: 'কনফার্ম', time: '১৫ মিনিট আগে' },
  { id: 'ORD-003', customer: 'জামাল হোসেন', items: 2, total: '৳২,১০০', status: 'শিপড', time: '৩০ মিনিট আগে' },
  { id: 'ORD-004', customer: 'সালমা বেগম', items: 4, total: '৳৫,৬০০', status: 'ডেলিভার্ড', time: '১ ঘন্টা আগে' },
  { id: 'ORD-005', customer: 'আবদুল কাদের', items: 1, total: '৳১,২০০', status: 'পেন্ডিং', time: '২ ঘন্টা আগে' },
];

const topProducts = [
  { name: 'অক্সিটেট্রাসাইক্লিন', sales: 245, revenue: '৳৮৫,৭৫০' },
  { name: 'প্রোবায়োটিক মিক্স', sales: 198, revenue: '৳৫৫,৪৪০' },
  { name: 'ভিটামিন প্রিমিক্স', sales: 156, revenue: '৳৩৪,৩২০' },
  { name: 'ফর্মালিন সলিউশন', sales: 124, revenue: '৳২২,৩২০' },
];

const systemStats = [
  { label: 'সক্রিয় ব্যবহারকারী', value: '৮৯২', icon: Users },
  { label: 'মোট পুকুর', value: '৩,৪৫৬', icon: Activity },
  { label: 'পণ্য স্টক', value: '২,১০০+', icon: Package },
  { label: 'আজকের লেনদেন', value: '৪৫৬', icon: DollarSign },
];

const statusColors: Record<string, string> = {
  'পেন্ডিং': 'bg-yellow-100 text-yellow-700',
  'কনফার্ম': 'bg-blue-100 text-blue-700',
  'শিপড': 'bg-purple-100 text-purple-700',
  'ডেলিভার্ড': 'bg-green-100 text-green-700',
  'বাতিল': 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">অ্যাডমিন ড্যাশবোর্ড</h1>
          <p className="text-gray-600">আপনার প্ল্যাটফর্মের সামগ্রিক পরিস্থিতি</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">২৫ এপ্রিল, ২০২৪</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-ocean-500 hover:bg-ocean-600 text-white rounded-xl text-sm font-medium transition-colors">
            <Bell className="w-4 h-4" />
            রিপোর্ট
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                stat.color === 'ocean' ? 'bg-ocean-100 text-ocean-600' :
                stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`flex items-center text-sm font-medium ${stat.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.growth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(stat.growth)}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">সাম্প্রতিক অর্ডার</h3>
              <p className="text-sm text-gray-500">সর্বশেষ ৫টি অর্ডার</p>
            </div>
            <Link href="/admin/orders" className="text-sm text-ocean-600 hover:text-ocean-700 font-medium">
              সব দেখুন
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">অর্ডার ID</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">গ্রাহক</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">আইটেম</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">মোট</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">স্ট্যাটাস</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">সময়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-ocean-600">{order.id}</td>
                    <td className="px-5 py-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{order.items} টি</td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{order.time}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">সেরা পণ্য</h3>
            <TrendingUp className="w-5 h-5 text-ocean-600" />
          </div>
          <div className="p-5 space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center text-ocean-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} বিক্রি</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">{product.revenue}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* System Stats & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">সিস্টেম পরিসংখ্যান</h3>
          <div className="grid grid-cols-2 gap-4">
            {systemStats.map((stat, index) => (
              <div key={stat.label} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className="w-5 h-5 text-ocean-600" />
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">দ্রুত কাজ</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: 'ব্যবহারকারী যোগ', href: '/admin/users/new', color: 'ocean' },
              { icon: Package, label: 'পণ্য যোগ', href: '/admin/products/new', color: 'emerald' },
              { icon: FileText, label: 'চালান তৈরি', href: '/admin/invoices/new', color: 'orange' },
              { icon: DollarSign, label: 'পেমেন্ট দেখুন', href: '/admin/payments', color: 'purple' },
            ].map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={action.href}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-${
                    action.color === 'ocean' ? 'ocean-200 hover:border-ocean-400 hover:bg-ocean-50' :
                    action.color === 'emerald' ? 'emerald-200 hover:border-emerald-400 hover:bg-emerald-50' :
                    action.color === 'orange' ? 'orange-200 hover:border-orange-400 hover:bg-orange-50' :
                    'purple-200 hover:border-purple-400 hover:bg-purple-50'
                  } transition-colors`}
                >
                  <action.icon className={`w-5 h-5 text-${
                    action.color === 'ocean' ? 'ocean-600' :
                    action.color === 'emerald' ? 'emerald-600' :
                    action.color === 'orange' ? 'orange-600' :
                    'purple-600'
                  }`} />
                  <span className="font-medium text-gray-700">{action.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">সাম্প্রতিক কার্যক্রম</h3>
        <div className="space-y-4">
          {[
            { time: '১০ মিনিট আগে', action: 'নতুন অর্ডার', detail: 'ORD-001 ক্রেয়া করা হয়েছে', type: 'order' },
            { time: '৩০ মিনিট আগে', action: 'পেমেন্ট', detail: 'বিকাশ পেমেন্ট সম্পন্ন - ৳২,৫০০', type: 'payment' },
            { time: '১ ঘন্টা আগে', action: 'ব্যবহারকারী', detail: 'নতুন ব্যবহারকারী রেজিস্ট্রেশন: karim@mail.com', type: 'user' },
            { time: '২ ঘন্টা আগে', action: 'স্টক', detail: 'অক্সিটেট্রাসাইক্লিন স্টক আপডেট - ৫০ পিস', type: 'stock' },
          ].map((log, index) => (
            <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
              <div className={`w-2 h-2 mt-2 rounded-full ${
                log.type === 'order' ? 'bg-ocean-500' :
                log.type === 'payment' ? 'bg-green-500' :
                log.type === 'user' ? 'bg-purple-500' :
                'bg-orange-500'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{log.action}</p>
                <p className="text-sm text-gray-600">{log.detail}</p>
              </div>
              <span className="text-xs text-gray-500">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}