import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Supplier } from '../types';
import {
  Building2,
  Plus,
  Search,
  Phone,
  DollarSign,
  Receipt,
  Download,
  CreditCard
} from 'lucide-react';

export const SuppliersView: React.FC = () => {
  const { suppliers, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [addSupplierModal, setAddSupplierModal] = useState(false);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const filteredSuppliers = suppliers.filter((s) => {
    return (
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalOwed = suppliers.reduce((acc, s) => acc + s.balance, 0);

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    setAddSupplierModal(false);
    showToast(`تم تسجيل المورد ${name} بنجاح في قاعدة البيانات`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">الموردون وشركات الإنتاج</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            إدارة حسابات المصانع والشركات الموردة، الذمم الدائنة وسندات السداد.
          </p>
        </div>

        <button
          onClick={() => setAddSupplierModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ إضافة مورد جديد</span>
        </button>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">إجمالي مستحقات الموردين (ذمم دائنة)</p>
          <p className="text-2xl font-mono font-extrabold text-[#f43f5e] mt-1">
            {totalOwed.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">مطلوب سدادها للمصانع</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">عدد الشركات المعتمدة</p>
          <p className="text-2xl font-mono font-extrabold text-[#0f172a] dark:text-[#ededed] mt-1">
            {suppliers.length} شركات
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">عقود توريد وتوكيلات جملة</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">شروط الدفع المعتادة</p>
          <p className="text-2xl font-mono font-extrabold text-[#059669] dark:text-[#10b981] mt-1">
            30 يوماً
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">تسهيلات ائتمانية تجارية</p>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#94a3b8] dark:text-[#666666] absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المورد أو النشاط..."
              className="w-full pr-10 pl-4 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
            />
          </div>
          <span className="text-xs text-[#94a3b8] dark:text-[#666666]">إجمالي الموردين: {filteredSuppliers.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold">
                <th className="py-3 px-3">الشركة / المورد</th>
                <th className="py-3 px-3">مسؤول التواصل</th>
                <th className="py-3 px-3">الهاتف والبريد</th>
                <th className="py-3 px-3">النشاط والتخصص</th>
                <th className="py-3 px-3 text-left">الرصيد المستحق له</th>
                <th className="py-3 px-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
              {filteredSuppliers.map((s) => (
                <tr key={s.id} className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-[#0f172a] dark:text-[#ededed]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333] flex items-center justify-center font-bold">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#475569] dark:text-[#888888] font-medium">{s.contactPerson}</td>
                  <td className="py-3 px-3 font-mono text-[#94a3b8] dark:text-[#666666]">{s.phone}</td>
                  <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">{s.category}</td>
                  <td className="py-3 px-3 text-left font-mono font-extrabold text-[#f43f5e] text-sm">
                    {s.balance.toLocaleString()} ج.م
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => showToast(`تسجيل سند صرف للمورد ${s.name}`, 'info')}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] font-bold rounded-lg text-[11px] transition-colors border border-emerald-200/60 dark:border-[#333333] cursor-pointer"
                    >
                      سداد دفعة
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Supplier Modal */}
      {addSupplierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 text-right space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
              <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">إضافة شركة ومورد جديد</h3>
              <button onClick={() => setAddSupplierModal(false)} className="text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#ededed] cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddSupplier} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">اسم الشركة / المصنع:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: شركة المراعي للصناعات الغذائية"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">مسؤول المبيعات لدى المورد:</label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="أحمد يوسف"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">رقم الهاتف:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01000000000"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#e2e8f0] dark:border-[#222222]">
                <button
                  type="button"
                  onClick={() => setAddSupplierModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  حفظ المورد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
