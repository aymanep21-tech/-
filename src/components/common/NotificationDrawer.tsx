import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Bell,
  CheckCheck,
  AlertTriangle,
  Package,
  Calendar,
  AlertCircle,
  CreditCard,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setNotificationsOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigateTo
  } = useApp();

  if (!isNotificationsOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getSeverityIcon = (type: string, severity: string) => {
    switch (type) {
      case 'stock':
        return <Package className="w-4 h-4 text-rose-500" />;
      case 'expiry':
        return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'invoice':
        return <CreditCard className="w-4 h-4 text-orange-500" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-emerald-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'danger':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300';
      case 'warning':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300';
      case 'info':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300';
      default:
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] h-full shadow-2xl border-l border-[#e2e8f0] dark:border-[#222222] flex flex-col text-right">
        {/* Header */}
        <div className="p-4 border-b border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-transparent dark:border-[#333333]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#0f172a] dark:text-[#ededed] text-sm">مركز التنبيهات والإشعارات</h3>
              <p className="text-xs text-[#475569] dark:text-[#888888]">{unreadCount} إشعار جديد يحتاج المتابعة</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                title="تحديد الكل كمقروء"
                className="p-1.5 text-[#94a3b8] dark:text-[#666666] hover:text-[#059669] dark:hover:text-[#10b981] rounded-lg hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setNotificationsOpen(false)}
              className="p-1.5 text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] rounded-lg hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-16 text-center text-[#94a3b8] dark:text-[#666666]">
              <Bell className="w-10 h-10 mx-auto text-[#cbd5e1] dark:text-[#333333] mb-2" />
              <p className="text-sm font-medium">لا توجد إشعارات حالياً</p>
              <p className="text-xs mt-1">كل شيء يسير بسلاسة في المخازن والتوزيع</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.targetScreen) {
                    navigateTo(n.targetScreen, {
                      productId: n.targetId,
                      customerId: n.targetId
                    });
                    setNotificationsOpen(false);
                  }
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                  n.read
                    ? 'bg-[#f8f9fa] dark:bg-[#121212] border-[#e2e8f0] dark:border-[#222222] opacity-75'
                    : 'bg-white dark:bg-[#1a1a1a] border-[#059669]/40 dark:border-[#059669]/40 shadow-xs'
                } hover:border-[#059669] dark:hover:border-[#10b981]`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#f1f5f9] dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] shrink-0 mt-0.5">
                    {getSeverityIcon(n.type, n.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${getSeverityBadge(n.severity)}`}>
                        {n.title}
                      </span>
                      <span className="text-[10px] text-[#94a3b8] dark:text-[#666666] font-medium">{n.time}</span>
                    </div>
                    <p className="text-xs text-[#0f172a] dark:text-[#ededed] font-medium leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                </div>

                {!n.read && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10b981]"></span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e2e8f0] dark:border-[#222222] bg-[#f8f9fa] dark:bg-[#121212] flex justify-between items-center text-xs">
          <button
            onClick={() => {
              navigateTo('smart_analytics');
              setNotificationsOpen(false);
            }}
            className="text-[#059669] dark:text-[#10b981] font-bold hover:underline cursor-pointer"
          >
            عرض توقعات وتنبيهات الذكاء الاصطناعي ←
          </button>
        </div>
      </div>
    </div>
  );
};
