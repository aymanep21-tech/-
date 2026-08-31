import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Printer,
  FileDown,
  Share2,
  Calendar,
  Building2,
  Phone,
  MapPin,
  DollarSign,
  Receipt,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const CustomerStatementView: React.FC = () => {
  const {
    customers,
    selectedCustomerId,
    navigateTo,
    showToast
  } = useApp();

  const [dateFrom, setDateFrom] = useState('2026-08-01');
  const [dateTo, setDateTo] = useState('2026-08-30');

  const customer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  if (!customer) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>العميل غير محدد.</p>
        <button onClick={() => navigateTo('customers')} className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs">
          العودة لقائمة العملاء
        </button>
      </div>
    );
  }

  // Sample transactions ledger for statement
  const transactions = [
    {
      id: 'tx-1',
      date: '2026-08-01',
      ref: 'رصيد افتتاحي سابق',
      docType: 'opening',
      docNumber: '-',
      debit: 25000,
      credit: 0,
      balance: 25000
    },
    {
      id: 'tx-2',
      date: '2026-08-06',
      ref: 'فاتورة مبيعات بضاعة غذائية',
      docType: 'invoice',
      docNumber: 'INV-2026-1044',
      debit: 18500,
      credit: 0,
      balance: 43500
    },
    {
      id: 'tx-3',
      date: '2026-08-12',
      ref: 'سند قبض نقدي - إيصال 492',
      docType: 'payment',
      docNumber: 'REC-2026-0492',
      debit: 0,
      credit: 20000,
      balance: 23500
    },
    {
      id: 'tx-4',
      date: '2026-08-20',
      ref: 'فاتورة مبيعات جملة',
      docType: 'invoice',
      docNumber: 'INV-2026-1089',
      debit: 21700,
      credit: 0,
      balance: 45200
    },
    {
      id: 'tx-5',
      date: '2026-08-28',
      ref: 'سند قبض شيك بنكي مسحوب',
      docType: 'payment',
      docNumber: 'CHQ-84920',
      debit: 0,
      credit: 15000,
      balance: 30200
    }
  ];

  const totalDebit = transactions.reduce((acc, t) => acc + t.debit, 0);
  const totalCredit = transactions.reduce((acc, t) => acc + t.credit, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    showToast('جاري تصدير كشف الحساب بصيغة PDF...', 'info');
    setTimeout(() => {
      showToast('تم تحميل كشف الحساب بنجاح', 'success');
    }, 1000);
  };

  const handleWhatsApp = () => {
    const text = `كشف حساب ${customer.shopName} - الرصيد المستحق: ${customer.balance.toLocaleString()} ج.م - شركة الرضا للتوزيع`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Top controls (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigateTo('customers')}
          className="flex items-center gap-1 text-xs font-bold text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لدليل العملاء</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة كشف الحساب</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#f8f9fa] hover:bg-[#f1f5f9] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] text-[#0f172a] dark:text-[#ededed] font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>تصدير PDF</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#10b981] hover:bg-[#059669] text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>إرسال واتساب</span>
          </button>
        </div>
      </div>

      {/* Printable Statement Container */}
      <div id="printable-statement" className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 md:p-8 shadow-2xs space-y-6">
        {/* Statement Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-[#e2e8f0] dark:border-[#222222] pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-black text-[#059669] dark:text-[#10b981]">WholesalePro Distribution</span>
            </div>
            <h1 className="text-base font-extrabold text-[#0f172a] dark:text-[#ededed]">شركة الرضا لتجارة وتوزيع المواد الغذائية بالجملة</h1>
            <p className="text-xs text-[#475569] dark:text-[#888888]">قسم الحسابات والذمم المدينة • هاتف: 0238350000</p>
          </div>

          <div className="sm:text-left text-right bg-[#f8f9fa] dark:bg-[#1a1a1a] p-3 rounded-xl border border-[#e2e8f0] dark:border-[#333333]">
            <h2 className="text-sm font-extrabold text-[#0f172a] dark:text-[#ededed]">كشف حساب عميل تفصيلي</h2>
            <p className="text-xs text-[#475569] dark:text-[#888888] mt-1">
              الفترة من: <span className="font-mono font-bold text-[#0f172a] dark:text-[#ededed]">{dateFrom}</span> إلى: <span className="font-mono font-bold text-[#0f172a] dark:text-[#ededed]">{dateTo}</span>
            </p>
            <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">تاريخ الإصدار: 2026-08-30</p>
          </div>
        </div>

        {/* Customer Info Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl text-xs">
          <div>
            <span className="text-[#94a3b8] dark:text-[#666666] block text-[11px]">اسم المتجر / المنشأة:</span>
            <span className="font-bold text-[#0f172a] dark:text-[#ededed] text-sm">{customer.shopName}</span>
          </div>
          <div>
            <span className="text-[#94a3b8] dark:text-[#666666] block text-[11px]">المسؤول / الهاتف:</span>
            <span className="font-semibold text-[#0f172a] dark:text-[#ededed]">{customer.name} ({customer.phone})</span>
          </div>
          <div>
            <span className="text-[#94a3b8] dark:text-[#666666] block text-[11px]">سقف الائتمان الممنوح:</span>
            <span className="font-mono font-bold text-[#0f172a] dark:text-[#ededed]">{customer.creditLimit.toLocaleString()} ج.م</span>
          </div>
          <div>
            <span className="text-[#94a3b8] dark:text-[#666666] block text-[11px]">المندوب والمنطقة:</span>
            <span className="font-semibold text-[#0f172a] dark:text-[#ededed]">{customer.assignedRep} ({customer.route})</span>
          </div>
        </div>

        {/* Financial Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold">
                <th className="py-2.5 px-3">التاريخ</th>
                <th className="py-2.5 px-3">البيان والشرح</th>
                <th className="py-2.5 px-3 text-center">رقم المستند</th>
                <th className="py-2.5 px-3 text-left">مدين (فواتير +)</th>
                <th className="py-2.5 px-3 text-left">دائن (سداد -)</th>
                <th className="py-2.5 px-3 text-left">الرصيد المستحق (ج.م)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-[#475569] dark:text-[#888888]">{tx.date}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#0f172a] dark:text-[#ededed]">{tx.ref}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-[#94a3b8] dark:text-[#666666]">{tx.docNumber}</td>
                  <td className="py-2.5 px-3 text-left font-mono font-bold text-[#0f172a] dark:text-[#ededed]">
                    {tx.debit > 0 ? `${tx.debit.toLocaleString()} ج.م` : '-'}
                  </td>
                  <td className="py-2.5 px-3 text-left font-mono font-bold text-[#059669] dark:text-[#10b981]">
                    {tx.credit > 0 ? `${tx.credit.toLocaleString()} ج.م` : '-'}
                  </td>
                  <td className="py-2.5 px-3 text-left font-mono font-extrabold text-[#0f172a] dark:text-[#ededed]">
                    {tx.balance.toLocaleString()} ج.م
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] font-bold border-t border-[#e2e8f0] dark:border-[#222222]">
                <td colSpan={3} className="py-3 px-3 text-[#475569] dark:text-[#888888]">
                  الإجمالي خلال الفترة
                </td>
                <td className="py-3 px-3 text-left font-mono text-[#0f172a] dark:text-[#ededed]">
                  {totalDebit.toLocaleString()} ج.م
                </td>
                <td className="py-3 px-3 text-left font-mono text-[#059669] dark:text-[#10b981]">
                  {totalCredit.toLocaleString()} ج.م
                </td>
                <td className="py-3 px-3 text-left font-mono text-[#f43f5e] text-sm">
                  {customer.balance.toLocaleString()} ج.م
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Final Balance Notice */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-emerald-50 dark:bg-[#1a1a1a] border border-emerald-200/60 dark:border-[#333333] rounded-xl gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />
            <div>
              <p className="font-bold text-xs text-[#0f172a] dark:text-[#ededed]">الرصيد الصافي المطلوب سداده حالياً:</p>
              <p className="text-[11px] text-[#475569] dark:text-[#888888]">نرجو مراجعة كشف الحساب وسداد المستحق طبقاً لمواعيد الائتمان المتفق عليها.</p>
            </div>
          </div>
          <div className="text-left font-mono">
            <span className="text-xl font-black text-[#059669] dark:text-[#10b981]">
              {customer.balance.toLocaleString()} ج.م
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
