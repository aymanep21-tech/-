import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, Tag, CreditCard, Calendar, FileText, X } from 'lucide-react';
import { PaymentMethod } from '../../types';

export const AddExpenseModal: React.FC = () => {
  const { activeModal, setActiveModal, addExpense, showToast } = useApp();

  const [category, setCategory] = useState('وقود ومحروقات سيارات');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>(500);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [account, setAccount] = useState('الخزينة الرئيسية');

  if (activeModal !== 'add_expense') return null;

  const categories = [
    'وقود ومحروقات سيارات',
    'صيانة ومرافق مخازن',
    'مهمات تغليف وكراتين',
    'إيجارات ومستودعات',
    'رواتب وعمولات مناديب',
    'رسوم وتراخيص حكومية',
    'نثريات وضيافة',
    'أخرى'
  ];

  const accounts = ['الخزينة الرئيسية', 'البنك الأهلي المصري', 'خزينة الفرع / المعرض', 'فودافون كاش'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      showToast('يرجى إدخال مبلغ صحيح لسند الصرف', 'error');
      return;
    }
    if (!description.trim()) {
      showToast('يرجى كتابة بيان الصرف', 'error');
      return;
    }

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    addExpense({
      date: dateStr,
      category,
      description,
      amount: Number(amount),
      paymentMethod,
      account,
      recordedBy: 'المدير المالي / الكاشير'
    });

    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 text-right">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-[#1a1a1a] text-[#e11d48] dark:text-[#f43f5e] flex items-center justify-center border border-transparent dark:border-[#333333]">
              <DollarSign className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">قيد سند صرف / مصروف جديد</h2>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] text-lg leading-none cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">المبلغ (ج.م) *</label>
            <input
              type="number"
              required
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0.00"
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-base font-bold text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">بند وتصنيف المصروف *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-medium focus:outline-none focus:border-[#059669]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">البيان والشرح التفصيلي *</label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مثال: تموين سيارة التوزيع جامبو 1 بالسولار لخط أكتوبر..."
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الخزينة / الحساب المنصرف منه</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              >
                {accounts.map((acc) => (
                  <option key={acc} value={acc}>
                    {acc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">طريقة الدفع</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              >
                <option value="cash">نقداً من الخزينة</option>
                <option value="bank_transfer">تحويل بنكي</option>
                <option value="cheque">شيك بنكي</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e2e8f0] dark:border-[#222222]">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 rounded-xl text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] font-semibold cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold shadow-xs cursor-pointer"
            >
              حفظ وتأكيد السند
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
