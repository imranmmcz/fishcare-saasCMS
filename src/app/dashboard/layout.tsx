'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Droplets,
  Fish,
  ShoppingCart,
  Receipt,
  TrendingUp,
  Settings,
  Bell,
  Users,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  FileText,
  Calculator,
  BarChart3,
  Package,
  Heart,
  HelpCircle,
} from 'lucide-react';

const farmerMenuItems = [
  { icon: LayoutDashboard, label: 'ড্যাশবোর্ড', href: '/dashboard' },
  { icon: Droplets, label: 'পুকুর ব্যবস্থাপনা', href: '/dashboard/ponds' },
  { icon: Fish, label: 'মাছের স্টক', href: '/dashboard/fish' },
  { icon: Package, label: 'পণ্য স্টক', href: '/dashboard/products' },
  { icon: Receipt, label: 'চালান', href: '/dashboard/invoices' },
  { icon: FileText, label: 'হিসাব-নিকাশ', href: '/dashboard/accounting' },
  { icon: TrendingUp, label: 'বিক্রয়', href: '/dashboard/sales' },
  { icon: Calculator, label: 'ক্যালকুলেটর', href: '/dashboard/calculators' },
  { icon: BarChart3, label: 'রিপোর্ট', href: '/dashboard/reports' },
];

const otherMenuItems = [
  { icon: Bell, label: 'নোটিফিকেশন', href: '/dashboard/notifications' },
  { icon: Heart, label: 'ইচ্ছার তালিকা', href: '/dashboard/wishlist' },
  { icon: HelpCircle, label: 'সাহায্য', href: '/dashboard/help' },
  { icon: Settings, label: 'সেটিংস', href: '/dashboard/settings' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 hidden lg:block ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Fish className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Fish Care</h1>
                  <p className="text-xs text-gray-500">মাছচাষের বিশ্বস্ত সাথী</p>
                </div>
              )}
            </Link>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"
          >
            <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform ${!sidebarOpen && 'rotate-180'}`} />
          </button>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {farmerMenuItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-ocean-50 text-ocean-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive && 'text-ocean-600'}`} />
                    {sidebarOpen && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="my-4 border-t border-gray-100" />

            <div className="space-y-1">
              {otherMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-ocean-50 text-ocean-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive && 'text-ocean-600'}`} />
                    {sidebarOpen && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Logout */}
          <div className="p-3 border-t border-gray-100">
            <Link
              href="/logout"
              className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium text-sm">লগআউট</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Fish className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900">Fish Care</span>
        </Link>
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-gray-600">
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
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 lg:hidden"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Fish className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">Fish Care</h1>
                    <p className="text-xs text-gray-500">ড্যাশবোর্ড</p>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 px-3 space-y-1 overflow-y-auto">
                {farmerMenuItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-ocean-50 text-ocean-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive && 'text-ocean-600'}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  );
                })}

                <div className="my-4 border-t border-gray-100" />

                {otherMenuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-ocean-50 text-ocean-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive && 'text-ocean-600'}`} />
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
      <main className={`pt-16 lg:pt-0 min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}