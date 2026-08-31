import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  Plus,
  HelpCircle,
  User,
  Settings,
  KeyRound,
  LogOut,
  Sparkles,
  Boxes,
  Users,
  Receipt,
  ShoppingCart
} from 'lucide-react';

const screenBreadcrumbs: Record<ScreenId, string[]> = {
  dashboard: ['الرئيسية'],
  pos: ['الرئيسية', 'المبيعات', 'نقطة البيع السريعة (POS)'],
  sales_invoices: ['الرئيسية', 'المبيعات', 'فواتير البيع'],
  sales_orders: ['الرئيسية', 'المبيعات', 'طلبات العملاء'],
  sales_returns: ['الرئيسية', 'المبيعات', 'مرتجعات المبيعات'],
  products: ['الرئيسية', 'المخزون', 'دليل المنتجات والأسعار'],
  product_details: ['الرئيسية', 'المخزون', 'تفاصيل وحركة المنتج'],
  add_product: ['الرئيسية', 'المخزون', 'إضافة منتج جديد'],
  inventory: ['الرئيسية', 'المخزون', 'لوحة تحكم المخزون والجرد'],
  warehouses: ['الرئيسية', 'المخزون', 'المخازن والمستودعات'],
  expiry: ['الرئيسية', 'المخزون', 'متابعة الدُفعات والصلاحية'],
  customers: ['الرئيسية', 'العملاء', 'دليل العملاء والديون'],
  customer_details: ['الرئيسية', 'العملاء', 'ملف وكشف حساب العميل'],
  customer_statement: ['الرئيسية', 'العملاء', 'كشف حساب تفصيلي وسندات'],
  purchases: ['الرئيسية', 'المشتريات', 'فواتير وأوامر الشراء'],
  suppliers: ['الرئيسية', 'الموردون', 'دليل الموردين والمستحقات'],
  supplier_details: ['الرئيسية', 'الموردون', 'ملف وكشف حساب المورد'],
  representatives: ['الرئيسية', 'التوزيع', 'فريق المبيعات والمناديب'],
  delivery: ['الرئيسية', 'التوزيع', 'إدارة خطوط السير والتوصيل (Kanban)'],
  finance: ['الرئيسية', 'المالية', 'الخزينة والحسابات البنكية'],
  expenses: ['الرئيسية', 'المالية', 'سجل المصروفات'],
  reports: ['الرئيسية', 'التقارير الشاملة'],
  smart_analytics: ['الرئيسية', 'التحليلات الذكية والتنبؤات'],
  users_roles: ['الرئيسية', 'الإدارة', 'المستخدمون والصلاحيات'],
  settings: ['الرئيسية', 'الإعدادات العامة'],
  login: ['تسجيل الدخول']
};

export const TopBar: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    isDarkMode,
    toggleDarkMode,
    setMobileSidebarOpen,
    setGlobalSearchOpen,
    isNotificationsOpen,
    setNotificationsOpen,
    notifications,
    setActiveModal
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const quickMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const breadcrumbs = screenBreadcrumbs[currentScreen] || ['الرئيسية'];

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (quickMenuRef.current && !quickMenuRef.current.contains(e.target as Node)) {
        setIsQuickMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      id="main-topbar"
      className="sticky top-0 z-20 h-16 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-[#e2e8f0] dark:border-[#222222] px-4 md:px-6 flex items-center justify-between transition-colors"
    >
      {/* Right side: Mobile Menu + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] cursor-pointer"
          aria-label="القائمة"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumbs */}
        <nav aria-label="مسار التنقل" className="hidden sm:flex items-center gap-1.5 text-xs text-[#475569] dark:text-[#888888]">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-[#cbd5e1] dark:text-[#333333]">/</span>}
                <span
                  className={
                    isLast
                      ? 'font-bold text-[#0f172a] dark:text-[#ededed]'
                      : 'hover:text-[#0f172a] dark:hover:text-[#ededed]'
                  }
                >
                  {crumb}
                </span>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Middle: Global Search Trigger Button */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-[#f1f5f9] dark:bg-[#1a1a1a] hover:bg-[#e2e8f0]/60 dark:hover:bg-[#222222] text-[#475569] dark:text-[#888888] rounded-xl border border-[#e2e8f0] dark:border-[#222222] text-xs transition-all shadow-2xs group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#94a3b8] dark:text-[#666666] group-hover:text-[#059669] dark:group-hover:text-[#10b981] transition-colors" />
            <span>ابحث عن منتج، عميل، فاتورة، باركود...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#121212] border border-[#cbd5e1] dark:border-[#333333] rounded text-[#475569] dark:text-[#888888] shadow-2xs">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Left side: Quick actions, Notifications, Dark Mode, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search button */}
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="lg:hidden p-2 rounded-xl text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          title="بحث عام"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Quick Add Menu */}
        <div className="relative" ref={quickMenuRef}>
          <button
            onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-emerald-50 dark:bg-[#1a1a1a] hover:bg-emerald-100/70 dark:hover:bg-[#222222] text-[#059669] dark:text-[#10b981] border border-emerald-200/80 dark:border-[#333333] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">إجراء سريع</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#059669] dark:text-[#10b981]" />
          </button>

          {isQuickMenuOpen && (
            <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-[#121212] rounded-xl border border-[#e2e8f0] dark:border-[#222222] shadow-xl py-1.5 z-50 text-xs text-right">
              <button
                onClick={() => {
                  navigateTo('pos');
                  setIsQuickMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
                <span className="font-medium">+ فاتورة بيع جديدة</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('add_product');
                  setIsQuickMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] transition-colors cursor-pointer"
              >
                <Boxes className="w-4 h-4 text-[#2563eb] dark:text-[#3b82f6]" />
                <span className="font-medium">+ إضافة صنف / منتج</span>
              </button>

              <button
                onClick={() => {
                  setActiveModal('add_customer');
                  setIsQuickMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#d97706] dark:text-[#f59e0b]" />
                <span className="font-medium">+ تسجيل عميل جديد</span>
              </button>

              <button
                onClick={() => {
                  setActiveModal('add_expense');
                  setIsQuickMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] transition-colors cursor-pointer"
              >
                <Receipt className="w-4 h-4 text-[#e11d48] dark:text-[#f43f5e]" />
                <span className="font-medium">+ تسجيل سند مصروف</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Toggle */}
        <button
          onClick={() => setNotificationsOpen(!isNotificationsOpen)}
          className="relative p-2 rounded-xl text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          title="الإشعارات والتنبيهات"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 left-1 w-4 h-4 bg-[#f43f5e] text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          title={isDarkMode ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
          aria-label="تبديل المظهر"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User Profile dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#059669] to-[#10b981] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              أ.ع
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed] leading-tight">أيمن عبدالرحيم</p>
              <p className="text-[10px] text-[#475569] dark:text-[#888888]">مدير النظام</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#475569] dark:text-[#888888] hidden sm:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-[#121212] rounded-xl border border-[#e2e8f0] dark:border-[#222222] shadow-xl py-1.5 z-50 text-xs text-right">
              <div className="px-3.5 py-2 border-b border-[#e2e8f0] dark:border-[#222222]">
                <p className="font-bold text-[#0f172a] dark:text-[#ededed] text-sm">أيمن عبدالرحيم</p>
                <p className="text-[11px] text-[#059669] dark:text-[#10b981]">مدير النظام التنفيذي</p>
                <p className="text-[10px] text-[#475569] dark:text-[#888888] mt-0.5 font-mono">ayman.ep21@gmail.com</p>
              </div>

              <button
                onClick={() => {
                  navigateTo('users_roles');
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-[#475569] dark:text-[#888888]" />
                <span>الملف الشخصي</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('settings');
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4 text-[#475569] dark:text-[#888888]" />
                <span>إعدادات الحساب والنظام</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('smart_analytics');
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
                <span>مساعد الذكاء الاصطناعي</span>
              </button>

              <div className="border-t border-[#e2e8f0] dark:border-[#222222] my-1"></div>

              <button
                onClick={() => {
                  navigateTo('login');
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[#f43f5e] hover:bg-rose-50 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-semibold">تسجيل الخروج</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
