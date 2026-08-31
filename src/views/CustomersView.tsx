import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Customer } from '../types';
import {
  Users,
  UserPlus,
  Search,
  CreditCard,
  FileText,
  DollarSign,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export const CustomersView: React.FC = () => {
  const {
    customers,
    updateCustomer,
    navigateTo,
    setActiveModal,
    setSelectedCustomerId,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [overLimitOnly, setOverLimitOnly] = useState(false);

  // Collection modal state
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [collectionCustomer, setCollectionCustomer] = useState<Customer | null>(null);
  const [collectionAmount, setCollectionAmount] = useState(5000);
  const [collectionMethod, setCollectionMethod] = useState<'cash' | 'cheque' | 'bank_transfer'>('cash');
  const [collectionNotes, setCollectionNotes] = useState('');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.shopName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.phone || '').includes(searchQuery) ||
      (c.route || '').includes(searchQuery);
    const matchesTier = tierFilter === 'all' || c.tier === tierFilter;
    const balance = c.balance ?? c.currentBalance ?? 0;
    const limit = c.creditLimit || 0;
    const matchesLimit = !overLimitOnly || (balance > limit && limit > 0);
    return matchesSearch && matchesTier && matchesLimit;
  });

  const totalReceivables = customers.reduce((acc, c) => acc + (c.balance ?? c.currentBalance ?? 0), 0);
  const overLimitCount = customers.filter((c) => {
    const bal = c.balance ?? c.currentBalance ?? 0;
    const lim = c.creditLimit || 0;
    return bal > lim && lim > 0;
  }).length;

  const handleOpenCollection = (cust: Customer) => {
    const bal = cust.balance ?? cust.currentBalance ?? 0;
    setCollectionCustomer(cust);
    setCollectionAmount(bal > 0 ? bal : 1000);
    setCollectionModalOpen(true);
  };

  const handleSaveCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionCustomer) return;

    const currentBal = collectionCustomer.balance ?? collectionCustomer.currentBalance ?? 0;
    const newBal = Math.max(0, currentBal - collectionAmount);
    updateCustomer({
      ...collectionCustomer,
      balance: newBal,
      currentBalance: newBal
    });

    setCollectionModalOpen(false);
    showToast(
      `تم تسجيل سند قبض وتحصيل بقيمة ${collectionAmount.toLocaleString()} ج.م للعميل ${collectionCustomer.shopName}`,
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">دليل العملاء والذمم المدينة</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            إدارة حسابات المحلات، المطاعم، أسقف الائتمان، وسجلات التحصيل وكشوف الحساب.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveModal('add_customer')}
            className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ تسجيل عميل جديد</span>
          </button>

          <button
            onClick={() => {
              showToast('جاري تصدير كشف أرصدة العملاء والمديونيات...', 'info');
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] dark:bg-[#1a1a1a] dark:hover:bg-[#222222] text-[#0f172a] dark:text-[#ededed] font-semibold rounded-xl text-xs transition-colors border border-[#e2e8f0] dark:border-[#222222] cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
            <span>تصدير الأرصدة</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">إجمالي المديونيات في السوق</p>
          <p className="text-2xl font-mono font-extrabold text-[#0f172a] dark:text-[#ededed] mt-1">
            {totalReceivables.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">موزعة على {customers.length} عميل مسجل</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">عملاء تخطوا سقف الائتمان</p>
          <p className="text-2xl font-mono font-extrabold text-[#f43f5e] mt-1">
            {overLimitCount} عملاء
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">يتطلب إيقاف البيع الآجل لهم</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">العملاء المسجلين</p>
          <p className="text-2xl font-mono font-extrabold text-[#059669] dark:text-[#10b981] mt-1">
            {customers.length} عميل
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">محلات وسوبرماركت</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">نسبة التغطية الائتمانية</p>
          <p className="text-2xl font-mono font-extrabold text-[#0ea5e9] dark:text-[#38bdf8] mt-1">
            {customers.length > 0 ? '100%' : '0%'}
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">وفقاً لسجلات الشيكات والتحصيل</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#121212] p-3.5 rounded-2xl border border-[#e2e8f0] dark:border-[#222222] shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94a3b8] dark:text-[#666666] absolute right-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المحل، العميل، الهاتف، أو خط السير..."
            className="w-full pr-10 pl-4 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="p-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none"
          >
            <option value="all">جميع الفئات (A, B, C)</option>
            <option value="A">الفئة A (كبار العملاء)</option>
            <option value="B">الفئة B (متوسط)</option>
            <option value="C">الفئة C (محدود)</option>
          </select>

          <button
            onClick={() => setOverLimitOnly(!overLimitOnly)}
            className={`px-3 py-2 text-xs rounded-xl font-bold transition-all border cursor-pointer ${
              overLimitOnly
                ? 'bg-rose-50 border-[#f43f5e] text-[#f43f5e] dark:bg-[#1a1a1a]'
                : 'bg-[#f8f9fa] border-[#e2e8f0] dark:bg-[#1a1a1a] dark:border-[#333333] text-[#475569] dark:text-[#888888]'
            }`}
          >
            {overLimitOnly ? '✓ المتجاوزين فقط' : 'المتجاوزين فقط'}
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold">
                <th className="py-3 px-3">المتجر / العميل</th>
                <th className="py-3 px-3">النوع والتصنيف</th>
                <th className="py-3 px-3">خط السير والموقع</th>
                <th className="py-3 px-3">المندوب</th>
                <th className="py-3 px-3 text-left">سقف الائتمان</th>
                <th className="py-3 px-3 text-left">المديونية الحالية</th>
                <th className="py-3 px-3 text-center">نسبة استهلاك السقف</th>
                <th className="py-3 px-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#94a3b8] dark:text-[#666666]">
                    <Users className="w-10 h-10 mx-auto text-[#cbd5e1] dark:text-[#333333] mb-2" />
                    <p className="text-xs font-semibold">لا يوجد عملاء مسجلين حالياً</p>
                    <button
                      onClick={() => setActiveModal('add_customer')}
                      className="mt-2 text-xs text-[#059669] dark:text-[#10b981] font-bold hover:underline cursor-pointer"
                    >
                      + تسجيل أول عميل في الدليل
                    </button>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => {
                  const bal = c.balance ?? c.currentBalance ?? 0;
                  const limit = c.creditLimit || 1;
                  const ratio = Math.round((bal / limit) * 100);
                  const isOver = bal > limit && (c.creditLimit || 0) > 0;

                  return (
                    <tr key={c.id} className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                      {/* Customer & Shop */}
                      <td className="py-3 px-3">
                        <div>
                          <p className="font-bold text-[#0f172a] dark:text-[#ededed] text-sm">{c.shopName}</p>
                          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">{c.name} • {c.phone}</p>
                        </div>
                      </td>

                      {/* Type & Tier */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${
                              c.tier === 'A'
                                ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333]'
                                : c.tier === 'B'
                                ? 'bg-blue-50 text-[#0284c7] dark:bg-[#1a1a1a] dark:text-[#38bdf8] border border-blue-200/60 dark:border-[#333333]'
                                : 'bg-amber-50 text-[#d97706] dark:bg-[#1a1a1a] dark:text-[#fbbf24] border border-amber-200/60 dark:border-[#333333]'
                            }`}
                          >
                            {c.tier || 'A'}
                          </span>
                          <span className="text-[#475569] dark:text-[#888888]">{c.type || 'سوبرماركت'}</span>
                        </div>
                      </td>

                      {/* Route */}
                      <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#94a3b8] dark:text-[#666666] shrink-0" />
                          <span>{c.route || 'خط عام'}</span>
                        </div>
                      </td>

                      {/* Rep */}
                      <td className="py-3 px-3 text-[#475569] dark:text-[#888888] font-medium">
                        {c.assignedRep || 'غير محدد'}
                      </td>

                      {/* Credit limit */}
                      <td className="py-3 px-3 text-left font-mono font-semibold text-[#94a3b8] dark:text-[#666666]">
                        {(c.creditLimit || 0).toLocaleString()} ج.م
                      </td>

                      {/* Current balance */}
                      <td className="py-3 px-3 text-left font-mono font-extrabold">
                        <span className={isOver ? 'text-[#f43f5e]' : 'text-[#0f172a] dark:text-[#ededed]'}>
                          {bal.toLocaleString()} ج.م
                        </span>
                      </td>

                      {/* Ratio Bar */}
                      <td className="py-3 px-3 text-center">
                        <div className="w-24 mx-auto space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className={isOver ? 'text-[#f43f5e] font-bold' : 'text-[#94a3b8] dark:text-[#666666]'}>{ratio}%</span>
                            {isOver && <span className="text-[#f43f5e] font-bold">تجاوز!</span>}
                          </div>
                          <div className="w-full h-1.5 bg-[#f1f5f9] dark:bg-[#1a1a1a] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isOver ? 'bg-[#f43f5e]' : ratio > 80 ? 'bg-[#f59e0b]' : 'bg-[#059669]'
                              }`}
                              style={{ width: `${Math.min(100, ratio)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedCustomerId(c.id);
                              navigateTo('customer_statement');
                            }}
                            title="عرض كشف حساب العميل"
                            className="flex items-center gap-1 px-2.5 py-1 bg-[#f1f5f9] hover:bg-[#e2e8f0] dark:bg-[#1a1a1a] dark:hover:bg-[#222222] text-[#0f172a] dark:text-[#ededed] rounded-lg text-[11px] font-semibold transition-colors border border-[#e2e8f0] dark:border-[#222222] cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#0284c7]" />
                            <span>كشف حساب</span>
                          </button>

                          <button
                            onClick={() => handleOpenCollection(c)}
                            title="تسجيل دفعة نقدية / تحصيل"
                            className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] rounded-lg text-[11px] font-bold transition-colors border border-emerald-200/60 dark:border-[#333333] cursor-pointer"
                          >
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>تحصيل</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collection Modal */}
      {collectionModalOpen && collectionCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 text-right space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />
                <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">تسجيل سند قبض وتحصيل نقدية</h3>
              </div>
              <button
                onClick={() => setCollectionModalOpen(false)}
                className="text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#ededed] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCollection} className="space-y-3 text-xs">
              <div className="p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-xl space-y-1 border border-[#e2e8f0] dark:border-[#222222]">
                <p className="font-bold text-[#0f172a] dark:text-[#ededed] text-sm">{collectionCustomer.shopName}</p>
                <p className="text-[#475569] dark:text-[#888888]">المديونية الحالية المسجلة: <span className="font-mono font-bold text-[#f43f5e]">{(collectionCustomer.balance ?? collectionCustomer.currentBalance ?? 0).toLocaleString()} ج.م</span></p>
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">المبلغ المحصل (ج.م):</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={collectionAmount}
                  onChange={(e) => setCollectionAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] font-extrabold text-base focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">طريقة السداد:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCollectionMethod('cash')}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      collectionMethod === 'cash' ? 'bg-[#059669] text-white shadow-xs' : 'bg-[#f1f5f9] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] border border-[#e2e8f0] dark:border-[#333333]'
                    }`}
                  >
                    💵 نقداً
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollectionMethod('bank_transfer')}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      collectionMethod === 'bank_transfer' ? 'bg-[#059669] text-white shadow-xs' : 'bg-[#f1f5f9] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] border border-[#e2e8f0] dark:border-[#333333]'
                    }`}
                  >
                    🏦 تحويل
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollectionMethod('cheque')}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      collectionMethod === 'cheque' ? 'bg-[#059669] text-white shadow-xs' : 'bg-[#f1f5f9] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] border border-[#e2e8f0] dark:border-[#333333]'
                    }`}
                  >
                    📝 شيك
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#e2e8f0] dark:border-[#222222]">
                <button
                  type="button"
                  onClick={() => setCollectionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  حفظ السند وإصدار إيصال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
