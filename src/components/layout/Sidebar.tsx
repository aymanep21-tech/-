import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  Package,
  Boxes,
  Warehouse,
  Users,
  Building2,
  Truck,
  UserCheck,
  Wallet,
  ReceiptText,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  LogOut,
  Zap
} from 'lucide-react';

interface NavGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  screen?: ScreenId;
  badge?: number | string;
  badgeColor?: string;
  children?: {
    id: string;
    title: string;
    screen: ScreenId;
    badge?: number | string;
  }[];
}

export const Sidebar: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    isSidebarCollapsed,
    toggleSidebar,
    products,
    deliveryOrders,
    notifications
  } = useApp();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    sales: true,
    inventory: true,
    distribution: true,
    finance: false
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const lowStockCount = products.filter((p) => p.status === 'low_stock' || p.status === 'out_of_stock').length;
  const activeDeliveryCount = deliveryOrders.filter((d) => d.status !== 'delivered' && d.status !== 'returned').length;
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const navGroups: NavGroup[] = [
    {
      id: 'dashboard',
      title: 'الرئيسية',
      icon: <LayoutDashboard className="w-5 h-5" />,
      screen: 'dashboard'
    },
    {
      id: 'pos',
      title: 'نقطة البيع السريعة (POS)',
      icon: <Zap className="w-5 h-5 text-emerald-500" />,
      screen: 'pos',
      badge: 'سريع',
      badgeColor: 'bg-emerald-500 text-white'
    },
    {
      id: 'sales',
      title: 'المبيعات',
      icon: <ShoppingCart className="w-5 h-5" />,
      children: [
        { id: 'sales_invoices', title: 'فواتير البيع', screen: 'sales_invoices' },
        { id: 'sales_orders', title: 'طلبات العملاء', screen: 'sales_invoices' },
        { id: 'sales_returns', title: 'المرتجعات', screen: 'sales_invoices' }
      ]
    },
    {
      id: 'purchases',
      title: 'المشتريات',
      icon: <Receipt className="w-5 h-5" />,
      screen: 'purchases',
      children: [
        { id: 'pur_invoices', title: 'فواتير الشراء', screen: 'purchases' },
        { id: 'pur_orders', title: 'أوامر الشراء', screen: 'purchases' }
      ]
    },
    {
      id: 'inventory',
      title: 'المخزون',
      icon: <Boxes className="w-5 h-5" />,
      badge: lowStockCount > 0 ? lowStockCount : undefined,
      badgeColor: 'bg-amber-500 text-white',
      children: [
        { id: 'inv_products', title: 'المنتجات والأسعار', screen: 'products' },
        { id: 'inv_warehouses', title: 'المخازن والمستودعات', screen: 'warehouses' },
        { id: 'inv_expiry', title: 'الدُفعات وتواريخ الصلاحية', screen: 'expiry', badge: 'هام' }
      ]
    },
    {
      id: 'customers',
      title: 'العملاء',
      icon: <Users className="w-5 h-5" />,
      screen: 'customers'
    },
    {
      id: 'suppliers',
      title: 'الموردون',
      icon: <Building2 className="w-5 h-5" />,
      screen: 'suppliers'
    },
    {
      id: 'distribution',
      title: 'التوزيع والمناديب',
      icon: <Truck className="w-5 h-5" />,
      badge: activeDeliveryCount > 0 ? activeDeliveryCount : undefined,
      badgeColor: 'bg-blue-600 text-white',
      children: [
        { id: 'dist_reps', title: 'فريق المناديب', screen: 'representatives' },
        { id: 'dist_delivery', title: 'إدارة التوصيل (Kanban)', screen: 'delivery' }
      ]
    },
    {
      id: 'finance',
      title: 'الحسابات والمالية',
      icon: <Wallet className="w-5 h-5" />,
      children: [
        { id: 'fin_overview', title: 'الخزينة والبنوك', screen: 'finance' },
        { id: 'fin_expenses', title: 'سجل المصروفات', screen: 'expenses' }
      ]
    },
    {
      id: 'reports',
      title: 'التقارير الشاملة',
      icon: <BarChart3 className="w-5 h-5" />,
      screen: 'reports'
    },
    {
      id: 'smart_analytics',
      title: 'التحليلات الذكية',
      icon: <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      screen: 'smart_analytics',
      badge: 'AI',
      badgeColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'users_roles',
      title: 'المستخدمون والصلاحيات',
      icon: <ShieldCheck className="w-5 h-5" />,
      screen: 'users_roles'
    },
    {
      id: 'settings',
      title: 'إعدادات النظام',
      icon: <Settings className="w-5 h-5" />,
      screen: 'settings'
    }
  ];

  const isCurrentScreenInGroup = (group: NavGroup): boolean => {
    if (group.screen === currentScreen) return true;
    if (group.children) {
      return group.children.some((c) => c.screen === currentScreen);
    }
    return false;
  };

  return (
    <aside
      id="main-sidebar"
      className={`relative z-30 flex flex-col bg-white dark:bg-[#121212] border-l border-[#e2e8f0] dark:border-[#222222] transition-all duration-300 select-none ${
        isSidebarCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#e2e8f0] dark:border-[#222222]">
        <button
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-3 text-right focus:outline-none group cursor-pointer"
        >
          {/* Logo icon with exact Emerald 600 to Teal 700 gradient */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#059669] to-[#0f766e] flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform shrink-0">
            <Boxes className="w-6 h-6" />
          </div>
          {!isSidebarCollapsed && (
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#0f172a] dark:text-[#ededed]">فيدورا</span>
                <span className="font-bold text-xs bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333] px-1.5 py-0.5 rounded-md font-mono">ERP</span>
              </div>
              <p className="text-[11px] text-[#475569] dark:text-[#888888] font-medium">نظام إدارة التوزيع والجملة</p>
            </div>
          )}
        </button>

        {/* Collapse button */}
        <button
          onClick={toggleSidebar}
          aria-label={isSidebarCollapsed ? 'توسيع القائمة' : 'طي القائمة'}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-[#475569] dark:text-[#888888] hover:text-[#0f172a] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] dark:hover:text-[#ededed] transition-colors"
        >
          {isSidebarCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Action Button (POS) with Emerald 600 / Emerald 500 hover */}
      {!isSidebarCollapsed ? (
        <div className="px-3 pt-3">
          <button
            onClick={() => navigateTo('pos')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-medium rounded-xl shadow-sm shadow-emerald-600/25 transition-all text-sm group cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            <span>فاتورة بيع سريعة (POS)</span>
          </button>
        </div>
      ) : (
        <div className="p-2">
          <button
            onClick={() => navigateTo('pos')}
            title="فاتورة بيع سريعة"
            className="w-full flex items-center justify-center p-2.5 bg-[#059669] hover:bg-[#10b981] text-white rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Zap className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navGroups.map((group) => {
          const isActive = isCurrentScreenInGroup(group);
          const hasChildren = group.children && group.children.length > 0;
          const isOpen = openGroups[group.id];

          if (hasChildren && !isSidebarCollapsed) {
            return (
              <div key={group.id} className="space-y-0.5">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#059669] dark:text-[#10b981] bg-emerald-50 dark:bg-[#1a1a1a] border border-emerald-100 dark:border-[#222222]'
                      : 'text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] hover:text-[#0f172a] dark:hover:text-[#ededed]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#059669] dark:text-[#10b981]' : 'text-[#475569] dark:text-[#666666]'}>
                      {group.icon}
                    </span>
                    <span>{group.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {group.badge && (
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${group.badgeColor || 'bg-[#f1f5f9] dark:bg-[#222222] text-[#475569] dark:text-[#888888]'}`}>
                        {group.badge}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-[#475569] dark:text-[#666666] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="pr-7 space-y-0.5 mr-2 border-r-2 border-[#e2e8f0] dark:border-[#222222]">
                    {group.children!.map((sub) => {
                      const isSubActive = currentScreen === sub.screen;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => navigateTo(sub.screen)}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            isSubActive
                              ? 'bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] font-semibold border border-emerald-200/50 dark:border-[#333333]'
                              : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a]'
                          }`}
                        >
                          <span>{sub.title}</span>
                          {sub.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-amber-50 dark:bg-[#1a1a1a] border border-amber-200 dark:border-amber-900/50 text-[#d97706] dark:text-[#f59e0b] rounded font-semibold">
                              {sub.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Single item or collapsed view
          return (
            <button
              key={group.id}
              onClick={() => {
                if (group.screen) {
                  navigateTo(group.screen);
                } else if (group.children && group.children[0]) {
                  navigateTo(group.children[0].screen);
                }
              }}
              title={isSidebarCollapsed ? group.title : undefined}
              className={`w-full flex items-center cursor-pointer ${
                isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-3 py-2.5'
              } rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] font-semibold border border-emerald-100 dark:border-[#333333] shadow-xs'
                  : 'text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] hover:text-[#0f172a] dark:hover:text-[#ededed]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-[#059669] dark:text-[#10b981]' : 'text-[#475569] dark:text-[#666666]'}>
                  {group.icon}
                </span>
                {!isSidebarCollapsed && <span>{group.title}</span>}
              </div>
              {!isSidebarCollapsed && group.badge && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${group.badgeColor || 'bg-[#f1f5f9] dark:bg-[#222222] text-[#475569] dark:text-[#888888]'}`}>
                  {group.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Mini Bar at Footer */}
      <div className="p-3 border-t border-[#e2e8f0] dark:border-[#222222] bg-[#f8f9fa] dark:bg-[#121212]">
        {!isSidebarCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-[#1a1a1a] border border-[#059669]/30 flex items-center justify-center font-bold text-[#059669] dark:text-[#10b981] text-sm shrink-0">
                أ.ع
              </div>
              <div className="overflow-hidden text-right">
                <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed] truncate">أيمن عبدالرحيم</p>
                <p className="text-[11px] text-[#059669] dark:text-[#10b981] truncate">مدير النظام التنفيذي</p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('login')}
              title="تسجيل الخروج"
              className="p-1.5 text-[#475569] dark:text-[#888888] hover:text-[#f43f5e] hover:bg-rose-50 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              onClick={() => navigateTo('settings')}
              className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-[#1a1a1a] border border-[#059669]/30 flex items-center justify-center font-bold text-[#059669] dark:text-[#10b981] text-sm cursor-pointer"
              title="أيمن عبدالرحيم (مدير النظام)"
            >
              أ.ع
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
