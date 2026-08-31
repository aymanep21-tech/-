import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SalesRep } from '../types';
import {
  Users,
  Target,
  Truck,
  MapPin,
  TrendingUp,
  Percent,
  DollarSign,
  Calendar,
  CheckCircle2,
  Boxes,
  Plus,
  Phone
} from 'lucide-react';

export const RepresentativesView: React.FC = () => {
  const { salesReps, showToast } = useApp();

  const [selectedRep, setSelectedRep] = useState<SalesRep>(salesReps[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'van_inventory' | 'visits'>('overview');

  const totalSales = salesReps.reduce((acc, r) => acc + r.monthlySales, 0);
  const totalTarget = salesReps.reduce((acc, r) => acc + r.target, 0);
  const totalCommissions = salesReps.reduce((acc, r) => acc + r.commission, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header (Section 36) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">مناديب المبيعات وعُهد السيارات</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            متابعة التارجت، العمولات، خطوط السير اليومية، وجرد بضاعة وسيارات التوزيع.
          </p>
        </div>

        <button
          onClick={() => showToast('إضافة مندوب مبيعات وسائق جديد', 'info')}
          className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ إضافة مندوب جديد</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">إجمالي مبيعات المناديب</p>
            <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
          </div>
          <p className="text-2xl font-mono font-extrabold text-[#0f172a] dark:text-[#ededed]">
            {totalSales.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">
            من إجمالي هدف {totalTarget.toLocaleString()} ج.م ({Math.round((totalSales / totalTarget) * 100)}%)
          </p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">إجمالي العمولات المستحقة</p>
            <DollarSign className="w-4 h-4 text-[#0ea5e9] dark:text-[#38bdf8]" />
          </div>
          <p className="text-2xl font-mono font-extrabold text-[#0ea5e9] dark:text-[#38bdf8]">
            {totalCommissions.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">محسوبة بنسب التحصيل الفعلي</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">سيارات التوزيع النشطة</p>
            <Truck className="w-4 h-4 text-[#d97706] dark:text-[#f59e0b]" />
          </div>
          <p className="text-2xl font-mono font-extrabold text-[#d97706] dark:text-[#f59e0b]">
            {salesReps.length} سيارات
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">على خطوط السير الميدانية</p>
        </div>
      </div>

      {/* Main Reps Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reps List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">قائمة المناديب</h2>
          {salesReps.map((r) => {
            const achievement = Math.round((r.monthlySales / r.target) * 100);
            const isSelected = selectedRep.id === r.id;

            return (
              <div
                key={r.id}
                onClick={() => setSelectedRep(r)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-right ${
                  isSelected
                    ? 'bg-white dark:bg-[#1a1a1a] border-[#059669] shadow-md ring-2 ring-[#059669]/20'
                    : 'bg-white dark:bg-[#121212] border-[#e2e8f0] dark:border-[#222222] hover:border-[#cbd5e1] dark:hover:border-[#333333]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] font-bold flex items-center justify-center border border-emerald-200/60 dark:border-[#333333]">
                      {r.name.split(' ')[0][0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">{r.name}</h3>
                      <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {r.route}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-extrabold text-[#059669] dark:text-[#10b981] bg-emerald-50 dark:bg-[#1a1a1a] border border-emerald-200/60 dark:border-[#333333] px-2 py-0.5 rounded-md">
                    {achievement}%
                  </span>
                </div>

                <div className="space-y-1.5 text-xs pt-2 border-t border-[#f1f5f9] dark:border-[#222222]">
                  <div className="flex justify-between text-[#475569] dark:text-[#888888]">
                    <span>المبيعات المحققة:</span>
                    <span className="font-mono font-bold text-[#0f172a] dark:text-[#ededed]">
                      {r.monthlySales.toLocaleString()} / {r.target.toLocaleString()} ج.م
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#f1f5f9] dark:bg-[#222222] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#059669] rounded-full"
                      style={{ width: `${Math.min(100, achievement)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rep Details Card (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#f1f5f9] dark:border-[#222222] gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#0f172a] dark:text-[#ededed]">{selectedRep.name}</h2>
              <p className="text-xs text-[#94a3b8] dark:text-[#666666]">
                هاتف: {selectedRep.phone} • خط السير: {selectedRep.route}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#475569] dark:text-[#888888]">لوحة السيارة:</span>
              <span className="font-mono font-bold text-xs bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] px-2.5 py-1 rounded-lg text-[#0f172a] dark:text-[#ededed]">
                {selectedRep.vanPlate}
              </span>
            </div>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center gap-2 border-b border-[#f1f5f9] dark:border-[#222222] pb-3 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                activeTab === 'overview' ? 'bg-[#059669] text-white' : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
              }`}
            >
              الأداء والعمولات
            </button>
            <button
              onClick={() => setActiveTab('van_inventory')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                activeTab === 'van_inventory' ? 'bg-[#059669] text-white' : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
              }`}
            >
              جرد بضاعة السيارة (Van Stock)
            </button>
            <button
              onClick={() => setActiveTab('visits')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                activeTab === 'visits' ? 'bg-[#059669] text-white' : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
              }`}
            >
              الزيارات والمسار اليومي
            </button>
          </div>

          {/* Performance View */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] rounded-xl">
                  <span className="text-[#94a3b8] dark:text-[#666666] block mb-1">العمولة المستحقة للشهر الحالي</span>
                  <span className="text-xl font-mono font-extrabold text-[#059669] dark:text-[#10b981]">
                    {selectedRep.commission.toLocaleString()} ج.م
                  </span>
                </div>

                <div className="p-4 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] rounded-xl">
                  <span className="text-[#94a3b8] dark:text-[#666666] block mb-1">نسبة تحقيق الهدف (Target)</span>
                  <span className="text-xl font-mono font-extrabold text-[#0ea5e9] dark:text-[#38bdf8]">
                    {Math.round((selectedRep.monthlySales / selectedRep.target) * 100)}%
                  </span>
                </div>
              </div>

              <div className="p-4 border border-[#e2e8f0] dark:border-[#333333] rounded-xl space-y-2">
                <h4 className="font-bold text-[#0f172a] dark:text-[#ededed]">سياسة العمولة المطبقة:</h4>
                <p className="text-[#475569] dark:text-[#888888] text-[11px] leading-relaxed">
                  • 2% على المبيعات النقدية المسددة فوراً بالسيارة.<br />
                  • 1.25% على المبيعات الآجلة المحصلة خلال فترة السماح (15 يوماً).<br />
                  • بونص إضافي 1,000 ج.م عند كسر حاجز 100% من التارجت الشهري.
                </p>
              </div>
            </div>
          )}

          {/* Van Stock View */}
          {activeTab === 'van_inventory' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2">
                <h3 className="font-bold text-[#0f172a] dark:text-[#ededed]">الأصناف المحملة على سيارة {selectedRep.vanPlate}</h3>
                <button
                  onClick={() => showToast('تم فتح محضر جرد وتسوية عهدة السيارة', 'info')}
                  className="px-2.5 py-1 bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333] font-bold rounded-lg text-[11px] cursor-pointer"
                >
                  مطابقة وجرد السيارة
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] font-bold">
                      <th className="py-2 px-2">الصنف</th>
                      <th className="py-2 px-2 text-center">الكمية المحملة</th>
                      <th className="py-2 px-2 text-center">المباع اليوم</th>
                      <th className="py-2 px-2 text-center">المتبقي بالسيارة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
                    {selectedRep.vanInventory.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-2 font-semibold text-[#0f172a] dark:text-[#ededed]">{item.productName}</td>
                        <td className="py-2.5 px-2 text-center font-mono text-[#475569] dark:text-[#888888]">{item.quantity + 8} {item.unit}</td>
                        <td className="py-2.5 px-2 text-center font-mono font-bold text-[#059669] dark:text-[#10b981]">8 {item.unit}</td>
                        <td className="py-2.5 px-2 text-center font-mono font-extrabold text-[#0f172a] dark:text-[#ededed]">{item.quantity} {item.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Visits View */}
          {activeTab === 'visits' && (
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-[#0f172a] dark:text-[#ededed]">جدول زيارات اليوم ({selectedRep.route})</h3>
              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 dark:bg-[#1a1a1a] border border-emerald-200/60 dark:border-[#333333] rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0f172a] dark:text-[#ededed]">1. هايبر ماركت البركة والخير</p>
                    <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">تمت الزيارة 09:30 ص • فاتورة بقيمة 21,700 ج.م</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-[#222222] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333]">
                    ✓ تمت الزيارة
                  </span>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-[#1a1a1a] border border-emerald-200/60 dark:border-[#333333] rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0f172a] dark:text-[#ededed]">2. كافيه ومطعم رويال لاونج</p>
                    <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">تمت الزيارة 11:15 ص • تحصيل نقدي 7,500 ج.م</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-[#222222] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333]">
                    ✓ تمت الزيارة
                  </span>
                </div>

                <div className="p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0f172a] dark:text-[#ededed]">3. ماركت الجزيرة - الدقي</p>
                    <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">موعد مرتقب 02:00 م</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f1f5f9] dark:bg-[#222222] text-[#475569] dark:text-[#888888] border border-[#e2e8f0] dark:border-[#333333]">
                    ⏳ قيد التوجه
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
