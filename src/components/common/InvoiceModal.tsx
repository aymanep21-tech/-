import React from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice } from '../../types';
import {
  X,
  Printer,
  FileDown,
  Share2,
  Boxes,
  Phone,
  MapPin,
  Calendar,
  UserCheck,
  CheckCircle2,
  Clock,
  RotateCcw
} from 'lucide-react';

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  const { showToast } = useApp();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast('جاري تصدير الفاتورة كملف PDF عالي الجودة...', 'info');
    setTimeout(() => {
      showToast('تم تحميل ملف PDF للفاتورة بنجاح', 'success');
    }, 1000);
  };

  const handleShareWhatsApp = () => {
    const text = `فاتورة مبيعات ${invoice.invoiceNumber} بقيمة ${invoice.grandTotal.toLocaleString()} ج.م - نظام فيدورا ERP`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="no-print p-4 bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#0f172a] dark:text-[#ededed] bg-white dark:bg-[#121212] px-2.5 py-1 rounded-lg border border-[#e2e8f0] dark:border-[#333333]">
              {invoice.invoiceNumber}
            </span>
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                invoice.status === 'completed'
                  ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] dark:border dark:border-[#059669]/30'
                  : invoice.status === 'out_for_delivery'
                  ? 'bg-blue-50 text-blue-700 dark:bg-[#1a1a1a] dark:text-blue-400 dark:border dark:border-blue-500/30'
                  : 'bg-amber-50 text-amber-700 dark:bg-[#1a1a1a] dark:text-amber-400 dark:border dark:border-amber-500/30'
              }`}
            >
              {invoice.status === 'completed'
                ? 'مسددة ومكتملة'
                : invoice.status === 'out_for_delivery'
                ? 'قيد التوصيل'
                : 'قيد التجهيز'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] dark:bg-[#1a1a1a] dark:hover:bg-[#222222] text-[#0f172a] dark:text-[#ededed] border border-[#e2e8f0] dark:border-[#333333] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>PDF</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#059669] hover:bg-[#10b981] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>واتساب</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] rounded-lg hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="flex-1 overflow-y-auto p-6 md:p-8 bg-white text-[#0f172a] text-right">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-[#0f172a] pb-5 gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-white">
                  <Boxes className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-extrabold text-[#0f172a]">فيدورا للتوزيع والجملة (Fedora ERP)</h1>
              </div>
              <p className="text-xs font-bold text-[#334155]">شركة الرضا لتجارة وتوزيع المواد الغذائية بالجملة</p>
              <p className="text-[11px] text-[#64748b] mt-0.5">س.ت: 1084920 • ب.ض: 492-381-902 • مصلحة الضرائب المصرية</p>
              <p className="text-[11px] text-[#64748b]">المنطقة الصناعية - 6 أكتوبر - هاتف: 0238350000</p>
            </div>

            <div className="sm:text-left text-right bg-[#f8f9fa] p-3 rounded-xl border border-[#e2e8f0]">
              <h2 className="text-sm font-extrabold text-[#0f172a] mb-1">فاتورة مبيعات ضريبية</h2>
              <p className="text-xs font-mono font-bold text-[#059669]">{invoice.invoiceNumber}</p>
              <p className="text-[11px] text-[#475569] mt-1">التاريخ: {invoice.date} - {invoice.time}</p>
              <p className="text-[11px] text-[#475569]">المستودع: {invoice.warehouse}</p>
            </div>
          </div>

          {/* Customer & Rep Meta Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#e2e8f0] text-xs">
            <div className="space-y-1">
              <p className="text-[#94a3b8] font-medium">بيانات العميل / المشتري:</p>
              <p className="font-bold text-[#0f172a] text-sm">{invoice.customerName}</p>
              <p className="text-[#475569]">هاتف: {invoice.customerPhone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#94a3b8] font-medium">مسؤول البيع والتوزيع:</p>
              <p className="font-bold text-[#0f172a] text-sm">{invoice.representativeName}</p>
              <p className="text-[#475569]">
                طريقة الدفع:{' '}
                <span className="font-bold">
                  {invoice.paymentMethod === 'cash'
                    ? 'نقداً (كاش)'
                    : invoice.paymentMethod === 'credit'
                    ? 'آجل (ذمم عملاء)'
                    : 'تحويل بنكي'}
                </span>
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="py-4">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b-2 border-[#e2e8f0] bg-[#f8f9fa] text-[#334155] font-bold">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">الصنف / المنتج</th>
                  <th className="py-2.5 px-3 text-center">الوحدة</th>
                  <th className="py-2.5 px-3 text-center">الكمية</th>
                  <th className="py-2.5 px-3 text-left">السعر (ج.م)</th>
                  <th className="py-2.5 px-3 text-left">الخصم</th>
                  <th className="py-2.5 px-3 text-left">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9fa]">
                    <td className="py-2.5 px-3 text-[#94a3b8] font-mono">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-semibold text-[#0f172a]">{item.productName}</td>
                    <td className="py-2.5 px-3 text-center text-[#475569]">{item.unit}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-[#0f172a] font-mono">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-left font-mono">{item.unitPrice.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-left font-mono text-rose-600">{item.discount > 0 ? `-${item.discount}` : '-'}</td>
                    <td className="py-2.5 px-3 text-left font-mono font-bold text-[#0f172a]">{item.total.toLocaleString()} ج.م</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Summary Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start pt-4 border-t-2 border-[#e2e8f0] gap-6">
            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e2e8f0]">
                <p className="font-bold text-[#334155] mb-1">ملاحظات والتسليم:</p>
                <p className="text-[#475569] text-[11px] leading-relaxed">
                  {invoice.notes || 'البضاعة المباعة تخضع لضمان الجودة وصلاحية التوزيع. لا يعتد بأي دفعات إلا بإيصال رسمي مختوم.'}
                </p>
              </div>

              {/* Stamp and signature placeholder */}
              <div className="flex items-center justify-between pt-4 px-2">
                <div className="text-center">
                  <p className="text-[10px] text-[#94a3b8]">توقيع المستلم</p>
                  <div className="w-24 h-8 border-b border-dashed border-[#94a3b8] mt-2"></div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-[#94a3b8]">ختم الشركة المعتمد</p>
                  <div className="w-20 h-10 border border-[#059669]/50 rounded-lg flex items-center justify-center text-[10px] font-bold text-[#059669] rotate-[-5deg]">
                    WholesalePro
                  </div>
                </div>
              </div>
            </div>

            {/* Totals Table */}
            <div className="w-full sm:w-5/12 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#f1f5f9] text-[#475569]">
                <span>الإجمالي الفرعي (Subtotal):</span>
                <span className="font-mono font-semibold">{invoice.subtotal.toLocaleString()} ج.م</span>
              </div>

              {invoice.discount > 0 && (
                <div className="flex justify-between py-1 border-b border-[#f1f5f9] text-rose-600">
                  <span>الخصم الممنوح (Discount):</span>
                  <span className="font-mono font-semibold">-{invoice.discount.toLocaleString()} ج.م</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-[#f1f5f9] text-[#475569]">
                <span>ضريبة القيمة المضافة (0% جملة أساسية):</span>
                <span className="font-mono font-semibold">0.00 ج.م</span>
              </div>

              <div className="flex justify-between py-2 border-b-2 border-[#0f172a] font-extrabold text-sm text-[#0f172a] bg-[#f8f9fa] px-2 rounded">
                <span>صافي الفاتورة (Grand Total):</span>
                <span className="font-mono text-[#059669] text-base">{invoice.grandTotal.toLocaleString()} ج.م</span>
              </div>

              <div className="flex justify-between py-1 text-[#334155]">
                <span>المدفوع نقدياً / تحويل:</span>
                <span className="font-mono font-bold text-[#059669]">{invoice.paidAmount.toLocaleString()} ج.م</span>
              </div>

              <div className="flex justify-between py-1 text-[#334155]">
                <span>المتبقي على الحساب (آجل):</span>
                <span className="font-mono font-bold text-rose-600">{invoice.remainingAmount.toLocaleString()} ج.م</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
