import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Truck, Phone, Target, Percent, X } from 'lucide-react';
import { SalesRep } from '../../types';

export const AddSalesRepModal: React.FC = () => {
  const { activeModal, setActiveModal, addSalesRep, showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [route, setRoute] = useState('خط مدينة 6 أكتوبر والشيخ زايد');
  const [target, setTarget] = useState<number | ''>(200000);
  const [commissionRate, setCommissionRate] = useState<number | ''>(2.5);
  const [vanPlate, setVanPlate] = useState('ط ر ج 4892');

  if (activeModal !== 'add_sales_rep') return null;

  const routes = [
    'خط مدينة 6 أكتوبر والشيخ زايد',
    'خط الهرم وفيصل والعمرانية',
    'خط المهندسين والدقي والعجوزة',
    'خط مصر الجديدة ومدينة نصر',
    'خط المعادي وحلوان والمقطم',
    'خط التجمع والقاهرة الجديدة'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('يرجى كتابة اسم المندوب', 'error');
      return;
    }

    const newRep: SalesRep = {
      id: `rep-${Date.now()}`,
      name,
      phone: phone || '01000000000',
      route,
      target: Number(target) || 0,
      monthlyTarget: Number(target) || 0,
      monthlySales: 0,
      commission: 0,
      vanPlate: vanPlate || 'بدون لوحة مسجلة',
      vanInventory: []
    };

    addSalesRep(newRep);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 text-right">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] flex items-center justify-center border border-transparent dark:border-[#333333]">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">تسجيل مندوب مبيعات وتوزيع جديد</h2>
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
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">اسم المندوب / السائق *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: محمود عبد الفتاح"
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-bold text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">رقم الهاتف</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01011223344"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">رقم لوحة سيارة التوزيع</label>
              <input
                type="text"
                value={vanPlate}
                onChange={(e) => setVanPlate(e.target.value)}
                placeholder="مثال: ق ن د 9120"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">خط السير والتوزيع الميداني</label>
            <select
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              {routes.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">هدف المبيعات الشهري (Target)</label>
              <input
                type="number"
                min={0}
                value={target}
                onChange={(e) => setTarget(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="200000"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">نسبة العمولة (%)</label>
              <input
                type="number"
                step="0.1"
                min={0}
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="2.5"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
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
              تسجيل المندوب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
