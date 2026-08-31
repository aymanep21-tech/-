import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Tag,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Percent,
  Search,
  Download
} from 'lucide-react';

export const ExpiryBatchesView: React.FC = () => {
  const { products, navigateTo, showToast } = useApp();

  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'warning' | 'safe'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten batches with product context
  const allBatches = products.flatMap((p) =>
    p.batches.map((b) => ({
      ...b,
      productId: p.id,
      productName: p.name,
      productCode: p.code,
      productImage: p.image,
      unit: p.unit,
      costPrice: p.costPrice,
      wholesalePrice: p.wholesalePrice
    }))
  );

  const filteredBatches = allBatches.filter((b) => {
    const matchesSearch = b.productName.includes(searchQuery) || b.batchNumber.includes(searchQuery);
    if (!matchesSearch) return false;

    if (filterSeverity === 'critical') return b.daysRemaining <= 30;
    if (filterSeverity === 'warning') return b.daysRemaining > 30 && b.daysRemaining <= 90;
    if (filterSeverity === 'safe') return b.daysRemaining > 90;
    return true;
  });

  const criticalCount = allBatches.filter((b) => b.daysRemaining <= 30).length;
  const warningCount = allBatches.filter((b) => b.daysRemaining > 30 && b.daysRemaining <= 90).length;
  const safeCount = allBatches.filter((b) => b.daysRemaining > 90).length;

  const handleCreatePromoDiscount = (batch: any) => {
    showToast(`تم إنشاء عرض تخفيض ترويجي 15% على دفعة ${batch.batchNumber} لتسريع تصريفها!`, 'success');
  };

  const handleReturnToSupplier = (batch: any) => {
    showToast(`تم فتح طلب إرجاع للمورد لدفعة ${batch.batchNumber}`, 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigateTo('inventory')}
            className="flex items-center gap-1 text-xs font-bold text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] transition-colors mb-1 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للمستودعات</span>
          </button>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">تواريخ الصلاحية وتتبع الدُفعات (Batches)</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            مراقبة الدُفعات القريبة من الانتهاء لحماية رأس المال وتفادي التوالف والركود.
          </p>
        </div>

        <button
          onClick={() => {
            showToast('جاري تصدير تقرير الصلاحيات للمخازن...', 'info');
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] hover:bg-[#f1f5f9] dark:hover:bg-[#222222] text-[#0f172a] dark:text-[#ededed] font-semibold rounded-xl text-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
          <span>تصدير تقرير الصلاحية PDF</span>
        </button>
      </div>

      {/* Severity Filter Strip (Section 28) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setFilterSeverity('all')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            filterSeverity === 'all'
              ? 'bg-[#121212] text-white border-[#059669] dark:bg-[#1a1a1a] shadow-xs'
              : 'bg-white dark:bg-[#121212] border-[#e2e8f0] dark:border-[#222222] text-[#0f172a] dark:text-[#ededed]'
          }`}
        >
          <p className="text-xs font-bold">جميع الدُفعات المسجلة</p>
          <p className="text-2xl font-mono font-extrabold mt-1">{allBatches.length}</p>
          <p className="text-[10px] opacity-70 mt-0.5">في كافة المستودعات</p>
        </div>

        <div
          onClick={() => setFilterSeverity('critical')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            filterSeverity === 'critical'
              ? 'bg-[#f43f5e] text-white border-[#f43f5e] shadow-xs'
              : 'bg-rose-50 dark:bg-[#1a1a1a] border-rose-200/60 dark:border-[#333333] text-[#f43f5e]'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">🔴 حرجة (&lt; 30 يوم)</p>
            <AlertTriangle className="w-4 h-4 text-[#f43f5e]" />
          </div>
          <p className="text-2xl font-mono font-extrabold mt-1">{criticalCount}</p>
          <p className="text-[10px] opacity-80 mt-0.5">تتطلب تسييل فوري أو إرجاع</p>
        </div>

        <div
          onClick={() => setFilterSeverity('warning')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            filterSeverity === 'warning'
              ? 'bg-[#d97706] text-white border-[#d97706] shadow-xs'
              : 'bg-amber-50 dark:bg-[#1a1a1a] border-amber-200/60 dark:border-[#333333] text-[#d97706] dark:text-[#f59e0b]'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">🟡 تنبيه (30 - 90 يوم)</p>
            <Clock className="w-4 h-4 text-[#d97706] dark:text-[#f59e0b]" />
          </div>
          <p className="text-2xl font-mono font-extrabold mt-1">{warningCount}</p>
          <p className="text-[10px] opacity-80 mt-0.5">صرف بنظام FIFO ذكي</p>
        </div>

        <div
          onClick={() => setFilterSeverity('safe')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            filterSeverity === 'safe'
              ? 'bg-[#059669] text-white border-[#059669] shadow-xs'
              : 'bg-emerald-50 dark:bg-[#1a1a1a] border-emerald-200/60 dark:border-[#333333] text-[#059669] dark:text-[#10b981]'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">🟢 دُفعات آمنة (&gt; 90 يوم)</p>
            <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
          </div>
          <p className="text-2xl font-mono font-extrabold mt-1">{safeCount}</p>
          <p className="text-[10px] opacity-80 mt-0.5">صلاحية كافية ومستقرة</p>
        </div>
      </div>

      {/* Batches Table (Section 28) */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#94a3b8] dark:text-[#666666] absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالصنف أو رقم الباتش..."
              className="w-full pr-10 pl-4 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
            />
          </div>
          <span className="text-xs text-[#94a3b8] dark:text-[#666666]">نظام الصرف التلقائي: الأقرب انتهاءً يصرف أولاً (FEFO)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold">
                <th className="py-3 px-3">المنتج</th>
                <th className="py-3 px-3">رقم الباتش</th>
                <th className="py-3 px-3">المستودع</th>
                <th className="py-3 px-3 text-center">الكمية المتوفرة</th>
                <th className="py-3 px-3 text-center">تاريخ الانتهاء</th>
                <th className="py-3 px-3 text-center">الأيام المتبقية</th>
                <th className="py-3 px-3 text-center">مستوى الخطورة</th>
                <th className="py-3 px-3 text-center">إجراءات تصريف الدفعة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
              {filteredBatches.map((b, idx) => (
                <tr key={idx} className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#0f172a] dark:text-[#ededed]">
                    <div className="flex items-center gap-2">
                      <img src={b.productImage} alt={b.productName} className="w-8 h-8 rounded-lg object-cover bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333]" />
                      <span>{b.productName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-[#475569] dark:text-[#888888]">{b.batchNumber}</td>
                  <td className="py-3 px-3 text-[#94a3b8] dark:text-[#666666]">{b.warehouse}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-[#0f172a] dark:text-[#ededed]">
                    {b.quantity} {b.unit}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-[#475569] dark:text-[#888888]">{b.expiryDate}</td>
                  <td className="py-3 px-3 text-center font-mono font-extrabold">
                    <span
                      className={
                        b.daysRemaining <= 30
                          ? 'text-[#f43f5e]'
                          : b.daysRemaining <= 90
                          ? 'text-[#d97706] dark:text-[#f59e0b]'
                          : 'text-[#059669] dark:text-[#10b981]'
                      }
                    >
                      {b.daysRemaining} يوم
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        b.daysRemaining <= 30
                          ? 'bg-rose-50 text-[#f43f5e] border-rose-200/60 dark:border-[#333333]'
                          : b.daysRemaining <= 90
                          ? 'bg-amber-50 text-[#d97706] dark:bg-[#1a1a1a] dark:text-[#f59e0b] border-amber-200/60 dark:border-[#333333]'
                          : 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border-emerald-200/60 dark:border-[#333333]'
                      }`}
                    >
                      {b.daysRemaining <= 30 ? '🔴 حرج' : b.daysRemaining <= 90 ? '🟡 تنبيه' : '🟢 آمن'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleCreatePromoDiscount(b)}
                        title="إنشاء عرض ترويجي وتخفيض السعر"
                        className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 dark:bg-[#1a1a1a] text-[#d97706] dark:text-[#f59e0b] rounded-lg text-[11px] font-bold transition-colors border border-amber-200/60 dark:border-[#333333] cursor-pointer"
                      >
                        <Tag className="w-3 h-3" />
                        <span>تخفيض ترويجي</span>
                      </button>

                      <button
                        onClick={() => handleReturnToSupplier(b)}
                        title="طلب إرجاع للمورد الأصلي"
                        className="flex items-center gap-1 px-2.5 py-1 bg-[#f8f9fa] hover:bg-[#f1f5f9] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] text-[#475569] dark:text-[#888888] rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>مرتجع مورد</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
