import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  AlertTriangle,
  Clock,
  Boxes,
  Users,
  DollarSign
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { products, customers, showToast } = useApp();

  const [activeReportTab, setActiveReportTab] = useState<'sales_profit' | 'dead_stock' | 'aging' | 'categories'>('sales_profit');

  // Sample data for charts
  const categorySalesData = [
    { name: 'زيوت ودهون', sales: 420000, profit: 54000 },
    { name: 'ألبان وأجبان', sales: 380000, profit: 48000 },
    { name: 'بقوليات وسكر', sales: 290000, profit: 32000 },
    { name: 'صلصة ومعلبات', sales: 185000, profit: 26000 },
    { name: 'منظفات وورقيات', sales: 145000, profit: 21000 }
  ];

  const agingData = [
    { range: '0 - 30 يوم (طبيعي)', amount: 245000, color: '#10b981' },
    { range: '31 - 60 يوم (مستحق)', amount: 89000, color: '#3b82f6' },
    { range: '61 - 90 يوم (متأخر)', amount: 36000, color: '#f59e0b' },
    { range: '+90 يوم (حرج/متعثر)', amount: 15600, color: '#ef4444' }
  ];

  // Slow moving / dead stock sample
  const slowMovingItems = [
    { name: 'خل أبيض نقي 1 لتر (كرتونة 12 زجاجة)', daysInStock: 78, stock: 120, capitalLocked: 18000, lastSold: 'منذ 45 يوماً' },
    { name: 'ملح طعام ناعم 500 جم (بالة 20 كيس)', daysInStock: 65, stock: 240, capitalLocked: 12000, lastSold: 'منذ 38 يوماً' },
    { name: 'حلاوة طحينية فاخرة 1 كجم', daysInStock: 92, stock: 45, capitalLocked: 9900, lastSold: 'منذ 60 يوماً' }
  ];

  const handleExportReport = () => {
    showToast('جاري تصدير التقرير المالي بصيغة Excel / PDF...', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">التقارير والتحليلات المتقدمة</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            تحليل هوامش الربحية، أعمار الديون، الأصناف الراكدة، وأداء التصنيفات التجارية.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>تصدير التقرير الحالي</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#e2e8f0] dark:border-[#222222] pb-2 text-xs font-bold flex-wrap">
        <button
          onClick={() => setActiveReportTab('sales_profit')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeReportTab === 'sales_profit' ? 'bg-[#059669] text-white shadow-xs' : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
          }`}
        >
          المبيعات وهامش الربحية
        </button>
        <button
          onClick={() => setActiveReportTab('aging')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeReportTab === 'aging' ? 'bg-[#059669] text-white shadow-xs' : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
          }`}
        >
          أعمار الديون والذمم المدينة
        </button>
        <button
          onClick={() => setActiveReportTab('dead_stock')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeReportTab === 'dead_stock' ? 'bg-[#059669] text-white shadow-xs' : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
          }`}
        >
          الرواكد وبطيئة الحركة (Dead Stock)
        </button>
      </div>

      {/* Sales & Profit Tab */}
      {activeReportTab === 'sales_profit' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs">
            <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed] mb-4">
              مقارنة المبيعات وصافي الأرباح حسب الأقسام الغذائية (ج.م)
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categorySalesData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415520" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#888888' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#888888' }} tickFormatter={(val) => `${val / 1000}k`} />
                  <Tooltip
                    formatter={(val: number) => [`${val.toLocaleString()} ج.م`, '']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', textAlign: 'right', backgroundColor: '#121212', borderColor: '#222222', color: '#ededed' }}
                  />
                  <Bar dataKey="sales" name="إجمالي المبيعات" fill="#059669" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="profit" name="هامش الربح الإجمالي" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Aging Analysis Tab (Section 49) */}
      {activeReportTab === 'aging' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {agingData.map((ag, i) => (
              <div key={i} className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
                <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">{ag.range}</p>
                <p className="text-2xl font-mono font-extrabold mt-1" style={{ color: ag.color }}>
                  {ag.amount.toLocaleString()} ج.م
                </p>
                <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">
                  نسبة: {Math.round((ag.amount / 385600) * 100)}% من السوق
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs">
            <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed] mb-2">توصيات إدارة الائتمان والتحصيل</h3>
            <p className="text-xs text-[#475569] dark:text-[#888888] leading-relaxed">
              يوجد <span className="font-bold text-[#f43f5e]">15,600 ج.م</span> ديون متجاوزة 90 يوماً لدى 2 من العملاء. يوصى بوقف صرف أي فواتير جديدة آلياً وتوجيه إنذار قانوني وتفويض مندوب التحصيل بجدولة المديونية.
            </p>
          </div>
        </div>
      )}

      {/* Dead Stock Tab (Section 48) */}
      {activeReportTab === 'dead_stock' && (
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#e2e8f0] dark:border-[#222222]">
            <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">الأصناف بطيئة الحركة وتجميد رأس المال</h3>
            <p className="text-xs text-[#94a3b8] dark:text-[#666666]">أصناف لم تسجل حركة بيع ملحوظة لأكثر من 45 يوماً</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] font-bold">
                  <th className="py-3 px-3">اسم الصنف</th>
                  <th className="py-3 px-3 text-center">أيام الركود بالمخزن</th>
                  <th className="py-3 px-3 text-center">الرصيد المكدس</th>
                  <th className="py-3 px-3 text-left">رأس المال المجمد</th>
                  <th className="py-3 px-3 text-center">آخر حركة بيع</th>
                  <th className="py-3 px-3 text-center">الإجراء المقترح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
                {slowMovingItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#0f172a] dark:text-[#ededed]">{item.name}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-[#d97706] dark:text-[#f59e0b]">{item.daysInStock} يوم</td>
                    <td className="py-3 px-3 text-center font-mono text-[#0f172a] dark:text-[#ededed]">{item.stock} كرتونة</td>
                    <td className="py-3 px-3 text-left font-mono font-extrabold text-[#f43f5e]">{item.capitalLocked.toLocaleString()} ج.م</td>
                    <td className="py-3 px-3 text-center text-[#94a3b8] dark:text-[#666666]">{item.lastSold}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => showToast('تم إنشاء حزمة بوندل ترويجية للصنف مع صنف سريع الدوران', 'success')}
                        className="px-2.5 py-1 bg-amber-50 dark:bg-[#1a1a1a] text-[#d97706] dark:text-[#f59e0b] font-bold rounded-lg text-[11px] border border-amber-200/60 dark:border-[#333333] cursor-pointer"
                      >
                        عرض بوندل ترويجي
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
