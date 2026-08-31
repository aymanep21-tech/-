import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Filter, RotateCcw, Check } from 'lucide-react';

export const FilterDrawer: React.FC = () => {
  const {
    isFilterDrawerOpen,
    setFilterDrawerOpen,
    customers,
    salesReps,
    showToast
  } = useApp();

  const [dateFrom, setDateFrom] = useState('2026-08-01');
  const [dateTo, setDateTo] = useState('2026-08-30');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedRepId, setSelectedRepId] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  if (!isFilterDrawerOpen) return null;

  const handleApply = () => {
    setFilterDrawerOpen(false);
    showToast('تم تطبيق معايير التصفية والفرز', 'success');
  };

  const handleReset = () => {
    setDateFrom('2026-08-01');
    setDateTo('2026-08-30');
    setSelectedCustomerId('');
    setSelectedRepId('');
    setSelectedWarehouse('');
    setSelectedPaymentMethod('');
    setSelectedStatus('');
    showToast('تمت إعادة ضبط معايير البحث', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] h-full shadow-2xl border-l border-[#e2e8f0] dark:border-[#222222] flex flex-col text-right">
        {/* Header */}
        <div className="p-4 border-b border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-transparent dark:border-[#333333]">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#0f172a] dark:text-[#ededed] text-sm">تصفية وبحث متقدم</h3>
              <p className="text-xs text-[#475569] dark:text-[#888888]">فلترة فواتير المبيعات والعمليات</p>
            </div>
          </div>
          <button
            onClick={() => setFilterDrawerOpen(false)}
            className="p-1.5 text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] rounded-lg hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Form */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Date range */}
          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1.5">الفترة الزمنية</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[11px] text-[#475569] dark:text-[#888888] block mb-1">من تاريخ:</span>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                />
              </div>
              <div>
                <span className="text-[11px] text-[#475569] dark:text-[#888888] block mb-1">إلى تاريخ:</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>
          </div>

          {/* Customer */}
          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1.5">العميل / المنشأة</label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="">جميع العملاء</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shopName} ({c.name})
                </option>
              ))}
            </select>
          </div>

          {/* Sales rep */}
          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1.5">مندوب المبيعات</label>
            <select
              value={selectedRepId}
              onChange={(e) => setSelectedRepId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="">جميع المناديب</option>
              {salesReps.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.route})
                </option>
              ))}
            </select>
          </div>

          {/* Warehouse */}
          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1.5">المستودع / المخزن</label>
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="">جميع المخازن</option>
              <option value="المخزن الرئيسي (المنطقة الصناعية)">المخزن الرئيسي (المنطقة الصناعية)</option>
              <option value="مخزن التبريد المركزي">مخزن التبريد المركزي</option>
              <option value="مخزن المنظفات والكيماويات">مخزن المنظفات والكيماويات</option>
            </select>
          </div>

          {/* Payment method */}
          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1.5">طريقة الدفع</label>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="">جميع طرق الدفع</option>
              <option value="cash">نقداً (كاش)</option>
              <option value="credit">آجل / ذمم عملاء</option>
              <option value="bank_transfer">تحويل بنكي</option>
              <option value="cheque">شيك بنكي</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1.5">حالة الفاتورة / الطلب</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="">جميع الحالات</option>
              <option value="completed">مكتمل ومسدد</option>
              <option value="processing">قيد التجهيز بالمستودع</option>
              <option value="out_for_delivery">خرج للتوصيل مع المندوب</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#e2e8f0] dark:border-[#222222] bg-[#f8f9fa] dark:bg-[#121212] flex items-center gap-2">
          <button
            onClick={handleApply}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>تطبيق الفلترة</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#e2e8f0] dark:border-[#333333] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-medium rounded-xl text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط</span>
          </button>
        </div>
      </div>
    </div>
  );
};
