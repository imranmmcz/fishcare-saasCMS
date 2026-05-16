'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileText,
  DollarSign,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  BarChart3,
  Shield,
  Database,
  Globe,
  BellRing,
  CreditCard,
  Megaphone,
  Image,
  Palette,
  File,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'ড্যাশবোর্ড', href: '/admin', badge: null },
  { icon: Users, label: 'ব্যবহারকারী', href: '/admin/users', badge: '156' },
  { icon: Shield, label: 'রোল ও পারমিশন', href: '/admin/roles', badge: null },
  { icon: Package, label: 'পণ্য ব্যবস্থাপনা', href: '/admin/products', badge: '42' },
  { icon: ShoppingCart, label: 'অর্ডার', href: '/admin/orders', badge: '28' },
  { icon: FileText, label: 'চালান', href: '/admin/invoices', badge: null },
  { icon: DollarSign, label: 'পেমেন্ট', href: '/admin/payments', badge: '12' },
  { icon: BarChart3, label: 'রিপোর্ট', href: '/admin/reports', badge: null },
  { icon: Megaphone, label: 'ক্যাম্পেইন', href: '/admin/campaigns', badge: null },
  { icon: BellRing, label: 'নোটিফিকেশন', href: '/admin/notifications', badge: '5' },
];

const settingsItems = [
  { icon: Palette, label: 'থিম সেটিংস', href: '/admin/settings/theme' },
  { icon: Globe, label: 'ভাষা সেটিংস', href: '/admin/settings/language' },
  { icon: Database, label: 'ব্যাকআপ', href: '/admin/settings/backup' },
  { icon: CreditCard, label: 'পেমেন্ট গেটওয়ে', href: '/admin/settings/payment' },
  { icon: Image, label: 'বিজ্ঞাপন', href: '/admin/settings/ads' },
  { icon: File, label: 'SEO সেটিংস', href: '/admin/settings/seo' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Stats for dashboard
  const stats = [
    { label: 'মোট বিক্রয়', value: '৳২,৫০,০০০', growth: 12.5, icon: TrendingUp },
    { label: 'মোট অর্ডার', value: '১,২৫০', growth: 8.3, icon: ShoppingCart },
    { label: 'বকেয়া', value: '৳৪৫,০০০', growth: -5.2, icon: DollarSign },
    { label: 'নতুন ব্যবহারকারী', value: '১৫৬', growth: 15.8, icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 z-40 transition-all duration-300 hidden lg:block ${
          sidebarOpen ? 'w-72' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-bold text-white">Fish Care</h1>
                  <p className="text-xs text-gray-400">অ্যাডমিন প্যানেল</p>
                </div>
              )}
            </Link>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-20 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${!sidebarOpen && 'rotate-180'}`} />
          </button>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <div className="mb-4">
              {sidebarOpen && <p className="px-3 text-xs font-medium text-gray-500 uppercase mb-2">মূল মেনু</p>}
              <div className="space-y-1">
                {adminMenuItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-ocean-600 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                      </div>
                      {sidebarOpen && item.badge && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{item.badge}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="my-4 border-t border-gray-800" />

            <div>
              {sidebarOpen && <p className="px-3 text-xs font-medium text-gray-500 uppercase mb-2">সেটিংস</p>}
              <div className="space-y-1">
                {settingsItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-ocean-600 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="p-3 border-t border-gray-800">
            <Link
              href="/logout"
              className="flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium text-sm">লগআউট</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 z-30 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-gray-400"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <span className="font-bold text-white">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-gray-400">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-gray-900 z-50 lg:hidden"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white">Fish Care</h1>
                    <p className="text-xs text-gray-400">অ্যাডমিন</p>
                  </div>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 px-3 space-y-1 overflow-y-auto">
                {adminMenuItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                        isActive ? 'bg-ocean-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{item.badge}</span>
                      )}
                    </Link>
                  );
                })}

                <div className="my-4 border-t border-gray-800" />

                {settingsItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        isActive ? 'bg-ocean-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`pt-16 lg:pt-0 min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}