import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Building2,
  Receipt,
  Plus,
  Calendar,
  Download,
  CheckCircle2,
  Clock,
  Printer,
  Sparkles
} from 'lucide-react';

export const FinanceView: React.FC = () => {
  const { invoices, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'treasury' | 'expenses' | 'z_report'>('treasury');
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(1500);
  const [expenseCategory, setExpenseCategory] = useState('وقود وسيارات التوزيع');

  const treasuryBalance = 145800;
  const bankBalance = 620400;
  const todayCollections = 74200;
  const todayExpenses = 4800;

  const expenses = [
    { id: 'EXP-1', title: 'سولار وبنزين سيارات التوزيع (3 سيارات)', category: 'وقود وسيارات', amount: 1850, date: '2026-08-30', paidBy: 'الخزينة الرئيسية' },
    { id: 'EXP-2', title: 'صيانة مكيفات مخزن التبريد المركزي', category: 'صيانة ومرافق', amount: 1200, date: '2026-08-30', paidBy: 'الخزينة الرئيسية' },
    { id: 'EXP-3', title: 'شراء كراتين وشريط لاصق للتغليف والتوزيع', category: 'مهمات تغليف', amount: 950, date: '2026-08-29', paidBy: 'الخزينة الرئيسية' },
    { id: 'EXP-4', title: 'رسوم تراخيص وميزان بسكول للمخازن', category: 'حكومي ورسوم', amount: 800, date: '2026-08-28', paidBy: 'البنك الأهلي' }
  ];

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    setExpenseModalOpen(false);
    showToast(`تم تسجيل قيد سند صرف بقيمة ${expenseAmount.toLocaleString()} ج.م`, 'success');
  };

  const handlePrintZReport = () => {
    showToast('جاري طباعة تقرير الإغلاق المالي اليومي (Z-Report)...', 'info');
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">المالية، الخزينة، والمصروفات</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            إدارة النقدية، أرصدة البنوك، تسجيل سندات الصرف والقبض، وتقارير الإغلاق اليومي.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setExpenseModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#f43f5e] hover:bg-[#e11d48] active:bg-[#be123c] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ تسجيل سند صرف ومصروف</span>
          </button>

          <button
            onClick={handlePrintZReport}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#1a1a1a] dark:hover:bg-[#222222] font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-transparent dark:border-[#333333]"
          >
            <Printer className="w-4 h-4 text-[#10b981]" />
            <span>تقرير الإغلاق (Z-Report)</span>
          </button>
        </div>
      </div>

      {/* KPI Balances Strip (Section 43) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">رصيد الخزينة الرئيسية (كاش)</p>
          <p className="text-2xl font-mono font-extrabold text-[#059669] dark:text-[#10b981] mt-1">
            {treasuryBalance.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">جاهز للصرف والتسوية</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">أرصدة البنوك والتحويلات</p>
          <p className="text-2xl font-mono font-extrabold text-[#0ea5e9] dark:text-[#38bdf8] mt-1">
            {bankBalance.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">البنك الأهلي + بنك مصر</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">تحصيلات اليوم النقدية</p>
          <p className="text-2xl font-mono font-extrabold text-[#0f172a] dark:text-[#ededed] mt-1">
            +{todayCollections.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#059669] dark:text-[#10b981] mt-0.5">من فواتير وعُهد المناديب</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">مصروفات وتشغيل اليوم</p>
          <p className="text-2xl font-mono font-extrabold text-[#f43f5e] mt-1">
            -{todayExpenses.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">وقود، صيانة، وعمالة</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#e2e8f0] dark:border-[#222222] pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('treasury')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'treasury' ? 'bg-[#059669] text-white shadow-xs' : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
          }`}
        >
          حركة الخزينة والتحصيلات
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'expenses' ? 'bg-[#059669] text-white shadow-xs' : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
          }`}
        >
          سجل المصروفات وسندات الصرف
        </button>
        <button
          onClick={() => setActiveTab('z_report')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'z_report' ? 'bg-[#059669] text-white shadow-xs' : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
          }`}
        >
          تقرير الإغلاق المالي واليومية (Z-Report)
        </button>
      </div>

      {/* Treasury Tab */}
      {activeTab === 'treasury' && (
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">سجل القيود والتحصيلات الأخيرة</h3>
            <span className="text-xs text-[#94a3b8] dark:text-[#666666] font-mono">آخر تحديث: قبل دقائق</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold">
                  <th className="py-3 px-3">رقم السند</th>
                  <th className="py-3 px-3">البيان</th>
                  <th className="py-3 px-3">الحساب / الخزينة</th>
                  <th className="py-3 px-3 text-left">الوارد (قبض +)</th>
                  <th className="py-3 px-3 text-left">المنصرف (صرف -)</th>
                  <th className="py-3 px-3 text-center">الوقت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
                <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#059669] dark:text-[#10b981]">REC-2026-0492</td>
                  <td className="py-3 px-3 font-semibold text-[#0f172a] dark:text-[#ededed]">تحصيل دفعة - ماركت البركة والخير</td>
                  <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">الخزينة الرئيسية</td>
                  <td className="py-3 px-3 text-left font-mono font-extrabold text-[#059669] dark:text-[#10b981]">+20,000 ج.م</td>
                  <td className="py-3 px-3 text-left font-mono text-[#94a3b8] dark:text-[#666666]">-</td>
                  <td className="py-3 px-3 text-center font-mono text-[#94a3b8] dark:text-[#666666]">11:30 ص</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#f43f5e]">EXP-2026-0819</td>
                  <td className="py-3 px-3 font-semibold text-[#0f172a] dark:text-[#ededed]">سولار وبنزين سيارات التوزيع</td>
                  <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">الخزينة الرئيسية</td>
                  <td className="py-3 px-3 text-left font-mono text-[#94a3b8] dark:text-[#666666]">-</td>
                  <td className="py-3 px-3 text-left font-mono font-extrabold text-[#f43f5e]">-1,850 ج.م</td>
                  <td className="py-3 px-3 text-center font-mono text-[#94a3b8] dark:text-[#666666]">10:15 ص</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#059669] dark:text-[#10b981]">REC-2026-0491</td>
                  <td className="py-3 px-3 font-semibold text-[#0f172a] dark:text-[#ededed]">مبيعات نقدية POS - كاشير الجملة</td>
                  <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">الخزينة الرئيسية</td>
                  <td className="py-3 px-3 text-left font-mono font-extrabold text-[#059669] dark:text-[#10b981]">+54,200 ج.م</td>
                  <td className="py-3 px-3 text-left font-mono text-[#94a3b8] dark:text-[#666666]">-</td>
                  <td className="py-3 px-3 text-center font-mono text-[#94a3b8] dark:text-[#666666]">09:45 ص</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">سجل المصروفات العمومية والتشغيلية</h3>
            <button
              onClick={() => setExpenseModalOpen(true)}
              className="px-3 py-1.5 bg-[#f43f5e] hover:bg-[#e11d48] text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
            >
              + إضافة سند صرف
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold">
                  <th className="py-3 px-3">رقم السند</th>
                  <th className="py-3 px-3">بند المصروف</th>
                  <th className="py-3 px-3">التصنيف</th>
                  <th className="py-3 px-3">وسيلة الدفع</th>
                  <th className="py-3 px-3">التاريخ</th>
                  <th className="py-3 px-3 text-left">المبلغ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#0f172a] dark:text-[#ededed]">{e.id}</td>
                    <td className="py-3 px-3 font-semibold text-[#0f172a] dark:text-[#ededed]">{e.title}</td>
                    <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">{e.category}</td>
                    <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">{e.paidBy}</td>
                    <td className="py-3 px-3 font-mono text-[#94a3b8] dark:text-[#666666]">{e.date}</td>
                    <td className="py-3 px-3 text-left font-mono font-bold text-[#f43f5e]">{e.amount.toLocaleString()} ج.م</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Z-Report Tab */}
      {activeTab === 'z_report' && (
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs space-y-6 max-w-2xl mx-auto">
          <div className="text-center pb-4 border-b border-[#e2e8f0] dark:border-[#222222] space-y-1">
            <h2 className="text-lg font-black text-[#0f172a] dark:text-[#ededed]">تقرير الإغلاق المالي واليومية (Daily Z-Report)</h2>
            <p className="text-xs text-[#94a3b8] dark:text-[#666666]">تاريخ اليوم: 2026-08-30 • المقر الرئيسي والمخازن</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-[#e2e8f0] dark:border-[#222222]">
              <span className="text-[#475569] dark:text-[#888888]">إجمالي المبيعات المحققة اليوم:</span>
              <span className="font-mono font-bold text-[#0f172a] dark:text-[#ededed]">125,480 ج.م</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#e2e8f0] dark:border-[#222222]">
              <span className="text-[#475569] dark:text-[#888888]">المبيعات النقدية المقبوضة (كاش):</span>
              <span className="font-mono font-bold text-[#059669] dark:text-[#10b981]">74,200 ج.م</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#e2e8f0] dark:border-[#222222]">
              <span className="text-[#475569] dark:text-[#888888]">المبيعات الآجلة (ذمم عملاء):</span>
              <span className="font-mono font-bold text-[#f59e0b]">51,280 ج.م</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#e2e8f0] dark:border-[#222222]">
              <span className="text-[#475569] dark:text-[#888888]">إجمالي المصروفات وسندات الصرف:</span>
              <span className="font-mono font-bold text-[#f43f5e]">-4,800 ج.م</span>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-[#0f172a] dark:border-[#333333] text-sm font-black bg-[#f8f9fa] dark:bg-[#1a1a1a] p-3 rounded-xl border border-[#e2e8f0] dark:border-[#222222]">
              <span className="text-[#0f172a] dark:text-[#ededed]">صافي النقدية المتوفرة بالخزينة لترحيلها:</span>
              <span className="font-mono text-[#059669] dark:text-[#10b981] text-base">69,400 ج.م</span>
            </div>
          </div>

          <button
            onClick={handlePrintZReport}
            className="w-full py-3 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة تقرير الإغلاق واعتماد اليومية</span>
          </button>
        </div>
      )}

      {/* Expense Modal */}
      {expenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 text-right space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
              <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">تسجيل سند صرف ومصروف جديد</h3>
              <button onClick={() => setExpenseModalOpen(false)} className="text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#ededed] cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">بيان المصروف:</label>
                <input
                  type="text"
                  required
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="مثال: وقود سيارة التوزيع ط ر ج 4892"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">المبلغ (ج.م):</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#f43f5e] font-bold text-sm focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">بند وتصنيف المصروف:</label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                >
                  <option value="وقود وسيارات التوزيع">وقود وسيارات التوزيع</option>
                  <option value="صيانة ومرافق المخازن">صيانة ومرافق المخازن</option>
                  <option value="مهمات تغليف وكراتين">مهمات تغليف وكراتين</option>
                  <option value="إكراميات وعمالة يومية">إكراميات وعمالة يومية</option>
                  <option value="مصروفات بوفيه وضيافة">مصروفات بوفيه وضيافة</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#e2e8f0] dark:border-[#222222]">
                <button
                  type="button"
                  onClick={() => setExpenseModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f43f5e] hover:bg-[#e11d48] active:bg-[#be123c] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  حفظ سند الصرف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
