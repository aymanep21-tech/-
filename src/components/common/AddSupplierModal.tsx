import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Phone, User, DollarSign, X } from 'lucide-react';
import { Supplier } from '../../types';

export const AddSupplierModal: React.FC = () => {
  const { activeModal, setActiveModal, addSupplier, showToast } = useApp();

  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('زيوت ومسليات');
  const [initialBalance, setInitialBalance] = useState<number | ''>(0);

  if (activeModal !== 'add_supplier') return null;

  const categories = [
    'زيوت ومسليات',
    'ألبان ومشروبات',
    'بقوليات وأرز',
    'مشروبات وشاي وبن',
    'حلويات وبسكويت',
    'منظفات وعناية',
    'عام / توكيلات متنوعة'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('يرجى كتابة اسم شركة المورد / المصنع', 'error');
      return;
    }

    const newSupp: Supplier = {
      id: `supp-${Date.now()}`,
      name,
      companyName: name,
      contactPerson: contactPerson || 'مدير المبيعات والتوريد',
      phone: phone || '01000000000',
      category,
      balance: Number(initialBalance) || 0,
      totalPurchases: 0,
      totalPaid: 0,
      status: 'active'
    };

    addSupplier(newSupp);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 text-right">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] flex items-center justify-center border border-transparent dark:border-[#333333]">
              <Building2 className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">تسجيل شركة مورد / مصنع جديد</h2>
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
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">اسم شركة المورد / المصنع *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: شركة جهينة للصناعات الغذائية"
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-bold text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">المسؤول / المندوب</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="مثال: أ/ وائل سامي"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">رقم الهاتف والتواصل</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01234567890"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">نشاط وتصنيف المنتجات</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الرصيد الافتتاحي المستحق للمورد (ج.م)</label>
            <input
              type="number"
              min={0}
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0.00"
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            />
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
              تسجيل المورد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
