import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Truck,
  Plus,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Boxes,
  FileText,
  Printer,
  Calendar,
  DollarSign,
  UserCheck
} from 'lucide-react';

export const DeliveryDispatchView: React.FC = () => {
  const { salesReps, invoices, showToast } = useApp();

  const [selectedStatus, setSelectedStatus] = useState<'all' | 'loading' | 'on_route' | 'delivered'>('all');

  const manifests = [
    {
      id: 'MNF-2026-081',
      date: '2026-08-30',
      driver: 'محمد سامي',
      vanPlate: 'ط ر ج 4892',
      route: 'خط مدينة 6 أكتوبر والشيخ زايد',
      ordersCount: 8,
      cartonsCount: 142,
      totalValue: 84500,
      collectedValue: 52000,
      status: 'on_route',
      progress: 65
    },
    {
      id: 'MNF-2026-082',
      date: '2026-08-30',
      driver: 'أحمد طارق',
      vanPlate: 'س ف ن 1940',
      route: 'خط الهرم وفيصل والجيزة',
      ordersCount: 12,
      cartonsCount: 198,
      totalValue: 112400,
      collectedValue: 74200,
      status: 'on_route',
      progress: 50
    },
    {
      id: 'MNF-2026-083',
      date: '2026-08-30',
      driver: 'كريم عبد الله',
      vanPlate: 'ي م هـ 8201',
      route: 'خط التجمع والمعادي',
      ordersCount: 6,
      cartonsCount: 95,
      totalValue: 68900,
      collectedValue: 68900,
      status: 'delivered',
      progress: 100
    }
  ];

  const handlePrintManifest = (mnf: any) => {
    showToast(`جاري طباعة منافستو التحميل ${mnf.id} للسائق ${mnf.driver}`, 'info');
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">إدارة حركة الشحن ومنافستو التوزيع</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            تجهيز حمولات سيارات التوزيع، متابعة خطوط السير وتأكيدات التسليم والتحصيل.
          </p>
        </div>

        <button
          onClick={() => showToast('إنشاء وتجهيز منافستو شحن جديد للسيارات', 'info')}
          className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ تجهيز منافستو تحميل جديد</span>
        </button>
      </div>

      {/* Manifest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {manifests.map((mnf) => (
          <div
            key={mnf.id}
            className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-[#f8f9fa] dark:bg-[#1a1a1a] px-2 py-1 rounded-md text-[#059669] dark:text-[#10b981] border border-[#e2e8f0] dark:border-[#333333]">
                    {mnf.id}
                  </span>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                    mnf.status === 'delivered'
                      ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border-emerald-200/60 dark:border-[#333333]'
                      : 'bg-sky-50 text-sky-700 dark:bg-[#1a1a1a] dark:text-sky-400 border-sky-200/60 dark:border-[#333333]'
                  }`}
                >
                  {mnf.status === 'delivered' ? '✓ تم إكمال الرحلة' : '🚚 في خط السير'}
                </span>
              </div>

              <div className="space-y-2 text-xs pt-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
                  <span className="font-bold text-[#0f172a] dark:text-[#ededed]">{mnf.driver} ({mnf.vanPlate})</span>
                </div>

                <div className="flex items-center gap-2 text-[#475569] dark:text-[#888888]">
                  <MapPin className="w-4 h-4 text-[#94a3b8] dark:text-[#666666]" />
                  <span>{mnf.route}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] p-2.5 rounded-xl">
                  <div>
                    <span className="text-[#94a3b8] dark:text-[#666666] block">عدد الطلبات:</span>
                    <span className="font-bold font-mono text-[#0f172a] dark:text-[#ededed]">{mnf.ordersCount} فواتير</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] dark:text-[#666666] block">إجمالي الكراتين:</span>
                    <span className="font-bold font-mono text-[#0f172a] dark:text-[#ededed]">{mnf.cartonsCount} كرتونة</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-[#e2e8f0] dark:border-[#222222] flex justify-between">
                    <span className="text-[#94a3b8] dark:text-[#666666]">قيمة البضاعة المحملة:</span>
                    <span className="font-mono font-bold text-[#059669] dark:text-[#10b981]">{mnf.totalValue.toLocaleString()} ج.م</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[10px] text-[#475569] dark:text-[#888888]">
                    <span>نسبة إنجاز التسليم:</span>
                    <span className="font-mono font-bold text-[#0f172a] dark:text-[#ededed]">{mnf.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#e2e8f0] dark:bg-[#222222] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#059669] dark:bg-[#10b981] rounded-full"
                      style={{ width: `${mnf.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-[#e2e8f0] dark:border-[#222222]">
              <button
                onClick={() => handlePrintManifest(mnf)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#f8f9fa] hover:bg-[#f1f5f9] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] text-[#0f172a] dark:text-[#ededed] font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة المنافستو</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
