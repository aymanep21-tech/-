import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Printer,
  Shield,
  CreditCard,
  Warehouse,
  Save,
  CheckCircle2,
  Users,
  Smartphone
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { showToast } = useApp();

  const [companyName, setCompanyName] = useState('شركة الرضا لتجارة وتوزيع المواد الغذائية بالجملة');
  const [taxNumber, setTaxNumber] = useState('498-291-042');
  const [commercialRecord, setCommercialRecord] = useState('84920 - سجل تجاري الجيزة');
  const [phone, setPhone] = useState('0238350000');
  const [address, setAddress] = useState('المنطقة الصناعية الثالثة، قطعة 14، 6 أكتوبر، مصر');
  const [printPaperSize, setPrintPaperSize] = useState<'a4' | 'thermal80'>('a4');
  const [currency, setCurrency] = useState('ج.م (EGP)');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('تم حفظ إعدادات النظام وتفضيلات الفواتير بنجاح', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right max-w-4xl mx-auto">
      {/* Header (Section 52) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">إعدادات النظام والشركة</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            بيانات المنشأة، الضريبة، تصميم وترويسة الفواتير، وصلاحيات المستخدمين.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>حفظ التعديلات</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Company Identity */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
            <Building2 className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />
            <h2 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">بيانات المنشأة وترويسة الفواتير</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">اسم الشركة التجاري:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-bold focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الرقم الضريبي:</label>
              <input
                type="text"
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">رقم السجل التجاري:</label>
              <input
                type="text"
                value={commercialRecord}
                onChange={(e) => setCommercialRecord(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">رقم الهاتف الرسمي:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">العملة الافتراضية:</label>
              <input
                type="text"
                disabled
                value={currency}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#222222] bg-[#f1f5f9] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">العنوان والمقر الرئيسي للمستودعات:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>
        </div>

        {/* Printing Preferences (Section 54) */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
            <Printer className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />
            <h2 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">طريقة ونموذج طباعة الفواتير</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div
              onClick={() => setPrintPaperSize('a4')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                printPaperSize === 'a4'
                  ? 'border-[#059669] bg-emerald-50/60 dark:bg-[#1a1a1a] ring-2 ring-[#059669]/20'
                  : 'border-[#e2e8f0] dark:border-[#333333]'
              }`}
            >
              <p className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">نموذج فواتير ليزر A4 / A5 (موصى به لتجارة الجملة)</p>
              <p className="text-[#475569] dark:text-[#888888] text-[11px] mt-1">
                تنسيق رسمي كامل يحتوي على أسماء الأصناف، التعبئة، عدد الطرود، الرصيد السابق والمتبقي، وتوقيعات الاستلام.
              </p>
            </div>

            <div
              onClick={() => setPrintPaperSize('thermal80')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                printPaperSize === 'thermal80'
                  ? 'border-[#059669] bg-emerald-50/60 dark:bg-[#1a1a1a] ring-2 ring-[#059669]/20'
                  : 'border-[#e2e8f0] dark:border-[#333333]'
              }`}
            >
              <p className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">نموذج إيصال حراري 80mm (سيارات المناديب)</p>
              <p className="text-[#475569] dark:text-[#888888] text-[11px] mt-1">
                طباعة سريعة وموجزة من الطابعات المحمولة عبر البلوتوث لسيارات التوزيع الميداني.
              </p>
            </div>
          </div>
        </div>

        {/* Roles & Permissions */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
            <Shield className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />
            <h2 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">المستخدمون والأدوار الوظيفية (RBAC)</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl">
              <div>
                <p className="font-bold text-[#0f172a] dark:text-[#ededed]">المدير العام / المالك (Admin)</p>
                <p className="text-[#94a3b8] dark:text-[#666666] text-[11px]">صلاحيات كاملة على الأرباح، التكاليف، التعديل، والحذف</p>
              </div>
              <span className="font-bold text-[#059669] dark:text-[#10b981]">كامل الصلاحيات</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl">
              <div>
                <p className="font-bold text-[#0f172a] dark:text-[#ededed]">أمين المخزن (Warehouse Keeper)</p>
                <p className="text-[#94a3b8] dark:text-[#666666] text-[11px]">إذون الإضافة، الصرف، التحويل، والجرد فقط</p>
              </div>
              <span className="font-bold text-[#475569] dark:text-[#888888]">مخازن واستلام</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl">
              <div>
                <p className="font-bold text-[#0f172a] dark:text-[#ededed]">مندوب المبيعات والتوزيع (Sales Rep)</p>
                <p className="text-[#94a3b8] dark:text-[#666666] text-[11px]">فواتير البيع الميداني، التحصيل، وعرض كشف حساب العملاء لخط سيره</p>
              </div>
              <span className="font-bold text-[#475569] dark:text-[#888888]">مبيعات ميدانية</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
