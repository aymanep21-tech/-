import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, Building2, Phone, MapPin, CreditCard, Shield } from 'lucide-react';
import { Customer } from '../../types';

export const AddCustomerModal: React.FC = () => {
  const { activeModal, setActiveModal, addCustomer, showToast } = useApp();

  const [shopName, setShopName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('سوبرماركت');
  const [route, setRoute] = useState('خط الدقي والمهندسين');
  const [assignedRep, setAssignedRep] = useState('محمد سامي');
  const [creditLimit, setCreditLimit] = useState(50000);
  const [tier, setTier] = useState<'A' | 'B' | 'C'>('B');

  if (activeModal !== 'add_customer') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName || !name || !phone) {
      showToast('يرجى ملء الحقول الإلزامية', 'error');
      return;
    }

    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      shopName,
      name,
      phone,
      address,
      type,
      tier,
      creditLimit: Number(creditLimit),
      balance: 0,
      assignedRep,
      route
    };

    addCustomer(newCust);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 text-right">
      <div className="w-full max-w-lg bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] flex items-center justify-center border border-transparent dark:border-[#333333]">
              <UserPlus className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">تسجيل عميل جملة جديد</h2>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">اسم المحل / المنشأة *</label>
              <input
                type="text"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="مثال: هايبر ماركت المدينة"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">اسم المالك / المسؤول *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: الحاج محمود حسن"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">رقم الهاتف / الواتساب *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01012345678"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">نشاط العميل</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              >
                <option value="سوبرماركت">سوبرماركت</option>
                <option value="هايبر ماركت">هايبر ماركت</option>
                <option value="بقالة">بقالة وتموينات</option>
                <option value="مطعم وكافيه">مطعم / كافيه</option>
                <option value="فندق وضيافة">فندق / قرية سياحية</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">خط السير والمنطقة</label>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              >
                <option value="خط الدقي والمهندسين">خط الدقي والمهندسين</option>
                <option value="خط 6 أكتوبر والشيخ زايد">خط 6 أكتوبر والشيخ زايد</option>
                <option value="خط الهرم وفيصل">خط الهرم وفيصل</option>
                <option value="خط التجمع والمعادي">خط التجمع والمعادي</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">المندوب المسؤول</label>
              <select
                value={assignedRep}
                onChange={(e) => setAssignedRep(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              >
                <option value="محمد سامي">محمد سامي</option>
                <option value="أحمد طارق">أحمد طارق</option>
                <option value="كريم عبد الله">كريم عبد الله</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">سقف الائتمان المسموح به (ج.م)</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={creditLimit}
                onChange={(e) => setCreditLimit(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] font-bold focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">تصنيف العميل (Tier)</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-bold focus:outline-none focus:border-[#059669]"
              >
                <option value="A">فئة أ (كبار العملاء - مسحوبات ضخمة)</option>
                <option value="B">فئة ب (عملاء متوسطون)</option>
                <option value="C">فئة ج (عملاء صغار / نقدي غالباً)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">العنوان التفصيلي وملاحظات التوصيل</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="الشارع، رقم العمارة، علامة مميزة لتفريغ سيارة البضاعة..."
              className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#e2e8f0] dark:border-[#222222]">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl shadow-xs cursor-pointer"
            >
              حفظ العميل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
