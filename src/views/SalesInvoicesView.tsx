import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Invoice } from '../types';
import {
  Receipt,
  Plus,
  Filter,
  Download,
  Search,
  Eye,
  Printer,
  Share2,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  DollarSign
} from 'lucide-react';

export const SalesInvoicesView: React.FC = () => {
  const {
    invoices,
    setSelectedInvoice,
    setFilterDrawerOpen,
    navigateTo,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.representativeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || inv.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalSalesAmount = filteredInvoices.reduce((acc, curr) => acc + curr.grandTotal, 0);
  const totalPaidAmount = filteredInvoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDueAmount = filteredInvoices.reduce((acc, curr) => acc + curr.remainingAmount, 0);

  const handleExportExcel = () => {
    showToast('جاري تصدير جدول فواتير المبيعات إلى Excel...', 'info');
    setTimeout(() => {
      showToast('تم تصدير كشف الفواتير بنجاح', 'success');
    }, 1000);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200 text-right">
      {/* Header (Section 22) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">فواتير وعمليات المبيعات</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            إدارة الفواتير، متابعة أوامر التوزيع، وسجل التحصيلات والذمم.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigateTo('pos')}
            className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ فاتورة بيع جديدة (POS)</span>
          </button>

          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#f8f9fa] hover:bg-[#f1f5f9] dark:bg-[#1a1a1a] dark:hover:bg-[#222222] text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-[#e2e8f0] dark:border-[#333333]"
          >
            <Filter className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
            <span>فلترة متقدمة</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#f8f9fa] hover:bg-[#f1f5f9] dark:bg-[#1a1a1a] dark:hover:bg-[#222222] text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-[#e2e8f0] dark:border-[#333333]"
          >
            <Download className="w-4 h-4 text-[#94a3b8] dark:text-[#666666]" />
            <span>تصدير Excel</span>
          </button>
        </div>
      </div>

      {/* Mini KPI summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] font-semibold">إجمالي المبيعات المفلترة</p>
            <p className="text-lg font-mono font-extrabold text-[#0f172a] dark:text-[#ededed] mt-0.5">
              {totalSalesAmount.toLocaleString()} ج.م
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333] flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] font-semibold">المبالغ المسددة (التحصيل)</p>
            <p className="text-lg font-mono font-extrabold text-[#059669] dark:text-[#10b981] mt-0.5">
              {totalPaidAmount.toLocaleString()} ج.م
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-[#1a1a1a] text-[#0ea5e9] dark:text-[#38bdf8] border border-blue-200/60 dark:border-[#333333] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] font-semibold">المبالغ الآجلة (المتبقية)</p>
            <p className="text-lg font-mono font-extrabold text-[#f43f5e] mt-0.5">
              {totalDueAmount.toLocaleString()} ج.م
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-[#1a1a1a] text-[#f43f5e] border border-rose-200/60 dark:border-[#333333] flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#94a3b8] dark:text-[#666666] absolute right-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الفاتورة، اسم العميل، المندوب..."
              className="w-full pr-9 pl-4 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
            />
          </div>

          {/* Status filter */}
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="all">جميع الحالات</option>
              <option value="completed">مكتمل ومسدد</option>
              <option value="processing">قيد التجهيز</option>
              <option value="out_for_delivery">قيد التوصيل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>

          {/* Payment filter */}
          <div className="w-full md:w-44">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="all">جميع طرق الدفع</option>
              <option value="cash">نقداً (كاش)</option>
              <option value="credit">آجل / ذمم</option>
              <option value="bank_transfer">تحويل بنكي</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table (Section 22) */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold">
                <th className="py-3.5 px-3">رقم الفاتورة</th>
                <th className="py-3.5 px-3">العميل / المنشأة</th>
                <th className="py-3.5 px-3">المندوب</th>
                <th className="py-3.5 px-3 text-center">التاريخ والوقت</th>
                <th className="py-3.5 px-3 text-left">الإجمالي النهائي</th>
                <th className="py-3.5 px-3 text-left">المدفوع</th>
                <th className="py-3.5 px-3 text-left">المتبقي (آجل)</th>
                <th className="py-3.5 px-3 text-center">طريقة الدفع</th>
                <th className="py-3.5 px-3 text-center">الحالة</th>
                <th className="py-3.5 px-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-[#94a3b8] dark:text-[#666666]">
                    <Receipt className="w-10 h-10 mx-auto text-[#cbd5e1] dark:text-[#333333] mb-2" />
                    <p className="text-sm font-medium">لا توجد فواتير مطابقة للبحث</p>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors"
                  >
                    {/* Invoice Number */}
                    <td className="py-3 px-3">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="font-mono font-bold text-[#059669] hover:text-[#10b981] dark:text-[#10b981] hover:underline cursor-pointer"
                      >
                        {inv.invoiceNumber}
                      </button>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-3 font-semibold text-[#0f172a] dark:text-[#ededed]">
                      <div>{inv.customerName}</div>
                      <span className="text-[10px] text-[#94a3b8] dark:text-[#666666] font-mono">{inv.customerPhone}</span>
                    </td>

                    {/* Rep */}
                    <td className="py-3 px-3 text-[#475569] dark:text-[#888888] font-medium">
                      {inv.representativeName}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-center text-[#94a3b8] dark:text-[#666666] font-mono text-[11px]">
                      <div>{inv.date}</div>
                      <span className="text-[10px] text-[#94a3b8] dark:text-[#666666]">{inv.time}</span>
                    </td>

                    {/* Grand total */}
                    <td className="py-3 px-3 text-left font-mono font-extrabold text-[#0f172a] dark:text-[#ededed]">
                      {inv.grandTotal.toLocaleString()} ج.م
                    </td>

                    {/* Paid */}
                    <td className="py-3 px-3 text-left font-mono font-bold text-[#059669] dark:text-[#10b981]">
                      {inv.paidAmount.toLocaleString()} ج.م
                    </td>

                    {/* Remaining */}
                    <td className="py-3 px-3 text-left font-mono font-bold text-[#f43f5e]">
                      {inv.remainingAmount > 0 ? `${inv.remainingAmount.toLocaleString()} ج.م` : '-'}
                    </td>

                    {/* Payment Method */}
                    <td className="py-3 px-3 text-center">
                      <span className="text-[11px] font-semibold text-[#475569] dark:text-[#888888]">
                        {inv.paymentMethod === 'cash'
                          ? 'نقداً'
                          : inv.paymentMethod === 'credit'
                          ? 'آجل'
                          : 'تحويل'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold inline-block border ${
                          inv.status === 'completed'
                            ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border-emerald-200/60 dark:border-[#333333]'
                            : inv.status === 'out_for_delivery'
                            ? 'bg-blue-50 text-[#0ea5e9] dark:bg-[#1a1a1a] dark:text-[#38bdf8] border-blue-200/60 dark:border-[#333333]'
                            : 'bg-amber-50 text-[#d97706] dark:bg-[#1a1a1a] dark:text-[#f59e0b] border-amber-200/60 dark:border-[#333333]'
                        }`}
                      >
                        {inv.status === 'completed'
                          ? 'مكتمل'
                          : inv.status === 'out_for_delivery'
                          ? 'قيد التوصيل'
                          : 'قيد التجهيز'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          title="عرض الفاتورة والطباعة"
                          className="p-1.5 rounded-lg text-[#94a3b8] dark:text-[#666666] hover:text-[#059669] dark:hover:text-[#10b981] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setTimeout(() => window.print(), 200);
                          }}
                          title="طباعة مباشرة"
                          className="p-1.5 rounded-lg text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const text = `فاتورة مبيعات ${inv.invoiceNumber} بقيمة ${inv.grandTotal.toLocaleString()} ج.م`;
                            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          title="مشاركة عبر واتساب"
                          className="p-1.5 rounded-lg text-[#94a3b8] dark:text-[#666666] hover:text-[#059669] dark:hover:text-[#10b981] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border-t border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between text-xs text-[#94a3b8] dark:text-[#666666]">
          <span>إجمالي الفواتير: {filteredInvoices.length}</span>
          <span className="font-mono">Wholesale Invoicing & Receivables</span>
        </div>
      </div>
    </div>
  );
};
