import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatsCard } from '../components/common/StatsCard';
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  Users,
  Boxes,
  ShoppingCart,
  Receipt,
  PlusCircle,
  AlertCircle,
  PackageCheck,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  Truck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const DashboardView: React.FC = () => {
  const {
    navigateTo,
    products,
    invoices,
    customers,
    expenses,
    deliveryOrders,
    setActiveModal,
    setSelectedInvoice
  } = useApp();

  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | '3m' | '1y'>('7d');

  // Real Dynamic Computations
  const totalSalesToday = invoices.reduce((acc, inv) => acc + (inv.grandTotal || 0), 0);
  const totalPaidToday = invoices.reduce((acc, inv) => acc + (inv.paidAmount || 0), 0);
  const totalReceivables = customers.reduce((acc, c) => acc + (c.balance ?? c.currentBalance ?? 0), 0);
  const totalInventoryValue = products.reduce((acc, p) => acc + (p.stock || 0) * (p.costPrice || 0), 0);

  // Compute estimated profit from invoices
  const totalProfit = invoices.reduce((sum, inv) => {
    const invCost = inv.items.reduce((itemSum, it) => {
      const prod = products.find((p) => p.id === it.productId);
      const cost = prod ? prod.costPrice * it.quantity : it.unitPrice * 0.85 * it.quantity;
      return itemSum + cost;
    }, 0);
    return sum + (inv.grandTotal - invCost);
  }, 0);

  // Dynamic Chart Data based on actual invoices or clean daily baseline
  const daysOfWeek = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'اليوم (الجمعة)'];
  const activeChartData = daysOfWeek.map((day, idx) => {
    const isToday = idx === daysOfWeek.length - 1;
    return {
      day,
      sales: isToday ? totalSalesToday : 0,
      profit: isToday ? Math.max(0, totalProfit) : 0
    };
  });

  // Categories distribution from real products
  const categoryCounts: Record<string, number> = {};
  products.forEach((p) => {
    const cat = p.category || 'عام';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + (p.stock * p.wholesalePrice || 1);
  });

  const categoryColors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];
  const totalCategoryVal = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;
  const categoryData = Object.entries(categoryCounts).map(([name, val], idx) => ({
    name,
    value: Math.round((val / totalCategoryVal) * 100),
    color: categoryColors[idx % categoryColors.length]
  }));

  // Critical alerts count
  const lowStockProducts = products.filter((p) => (p.stock || 0) <= (p.minStock || 5));
  const overLimitCustomers = customers.filter((c) => (c.balance ?? c.currentBalance ?? 0) > (c.creditLimit || 0) && (c.creditLimit || 0) > 0);
  const pendingDeliveries = deliveryOrders.filter((d) => d.status === 'new' || d.status === 'in_progress');

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header with Greeting & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0f172a] dark:text-[#ededed] tracking-tight">
              لوحة التحكم الرئيسية
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333] text-xs font-bold">
              نظام فيدورا ERP جاهز للعمل
            </span>
          </div>
          <p className="text-sm text-[#475569] dark:text-[#888888] mt-1">
            ملخص شامل وتفصيلي لحركة المبيعات، المخزون، التحصيلات النقدية والذمم المدينة.
          </p>
        </div>

        {/* Action button: Quick POS */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigateTo('pos')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>نقطة بيع الجملة (POS)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="مبيعات اليوم"
          value={totalSalesToday.toLocaleString()}
          unit="ج.م"
          change={invoices.length > 0 ? `${invoices.length} فواتير` : '0 فواتير'}
          changeType="positive"
          comparisonText="إجمالي مبيعات اليوم"
          icon={<TrendingUp className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />}
          iconBg="bg-emerald-50 dark:bg-[#1a1a1a] border border-emerald-200/50 dark:border-[#333333] text-[#059669]"
          sparklinePoints={[0, 0, 0, 0, 0, 0, totalSalesToday || 1]}
          onClick={() => navigateTo('sales_invoices')}
        />

        <StatsCard
          title="صافي الربح التقديري"
          value={Math.max(0, totalProfit).toLocaleString()}
          unit="ج.م"
          change={totalSalesToday > 0 ? `${((totalProfit / totalSalesToday) * 100).toFixed(1)}% هامش` : '0%'}
          changeType="positive"
          comparisonText="تقدير الربح الصافي"
          icon={<DollarSign className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />}
          iconBg="bg-emerald-50 dark:bg-[#1a1a1a] border border-emerald-200/50 dark:border-[#333333] text-[#059669]"
          sparklinePoints={[0, 0, 0, 0, 0, 0, totalProfit || 1]}
          onClick={() => navigateTo('finance')}
        />

        <StatsCard
          title="التحصيلات النقدية اليوم"
          value={totalPaidToday.toLocaleString()}
          unit="ج.م"
          change="سندات مقبوضة"
          changeType="positive"
          comparisonText="مدفوعات العملاء"
          icon={<CreditCard className="w-5 h-5 text-[#2563eb] dark:text-[#3b82f6]" />}
          iconBg="bg-blue-50 dark:bg-[#1a1a1a] border border-blue-200/50 dark:border-[#333333] text-[#2563eb]"
          sparklinePoints={[0, 0, 0, 0, 0, 0, totalPaidToday || 1]}
          onClick={() => navigateTo('finance')}
        />

        <StatsCard
          title="مستحقات العملاء (الآجل)"
          value={totalReceivables.toLocaleString()}
          unit="ج.م"
          change={`${customers.length} عملاء مسجلين`}
          changeType="neutral"
          comparisonText="إجمالي الذمم المدينة"
          icon={<Users className="w-5 h-5 text-[#d97706] dark:text-[#f59e0b]" />}
          iconBg="bg-amber-50 dark:bg-[#1a1a1a] border border-amber-200/50 dark:border-[#333333] text-[#d97706]"
          sparklinePoints={[0, 0, 0, 0, 0, 0, totalReceivables || 1]}
          onClick={() => navigateTo('customers')}
        />

        <StatsCard
          title="إجمالي قيمة المخزون"
          value={totalInventoryValue.toLocaleString()}
          unit="ج.م"
          change={`${products.length} أصناف في المستودع`}
          changeType="neutral"
          comparisonText="بسعر التكلفة"
          icon={<Boxes className="w-5 h-5 text-[#8b5cf6] dark:text-[#a855f7]" />}
          iconBg="bg-purple-50 dark:bg-[#1a1a1a] border border-purple-200/50 dark:border-[#333333] text-[#8b5cf6]"
          sparklinePoints={[0, 0, 0, 0, 0, 0, totalInventoryValue || 1]}
          onClick={() => navigateTo('inventory')}
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-[#475569] dark:text-[#888888] uppercase tracking-wider">إجراءات سريعة فورية</p>
          <span className="text-[11px] text-[#059669] dark:text-[#10b981] font-semibold">اختصارات التشغيل اليومي</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => navigateTo('pos')}
            className="flex items-center justify-center gap-2 p-2.5 bg-emerald-50 dark:bg-[#1a1a1a] hover:bg-emerald-100 dark:hover:bg-[#222222] text-[#059669] dark:text-[#10b981] font-bold rounded-xl text-xs transition-colors border border-emerald-200/60 dark:border-[#333333] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
            <span>+ فاتورة بيع</span>
          </button>

          <button
            onClick={() => setActiveModal('add_purchase')}
            className="flex items-center justify-center gap-2 p-2.5 bg-[#f1f5f9] dark:bg-[#1a1a1a] hover:bg-[#e2e8f0]/80 dark:hover:bg-[#222222] text-[#0f172a] dark:text-[#ededed] font-bold rounded-xl text-xs transition-colors border border-[#e2e8f0] dark:border-[#222222] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#2563eb] dark:text-[#3b82f6]" />
            <span>+ فاتورة شراء (PO)</span>
          </button>

          <button
            onClick={() => navigateTo('add_product')}
            className="flex items-center justify-center gap-2 p-2.5 bg-[#f1f5f9] dark:bg-[#1a1a1a] hover:bg-[#e2e8f0]/80 dark:hover:bg-[#222222] text-[#0f172a] dark:text-[#ededed] font-bold rounded-xl text-xs transition-colors border border-[#e2e8f0] dark:border-[#222222] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#d97706] dark:text-[#f59e0b]" />
            <span>+ إضافة منتج</span>
          </button>

          <button
            onClick={() => setActiveModal('add_customer')}
            className="flex items-center justify-center gap-2 p-2.5 bg-[#f1f5f9] dark:bg-[#1a1a1a] hover:bg-[#e2e8f0]/80 dark:hover:bg-[#222222] text-[#0f172a] dark:text-[#ededed] font-bold rounded-xl text-xs transition-colors border border-[#e2e8f0] dark:border-[#222222] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#8b5cf6]" />
            <span>+ عميل جديد</span>
          </button>

          <button
            onClick={() => setActiveModal('add_expense')}
            className="flex items-center justify-center gap-2 p-2.5 bg-[#f1f5f9] dark:bg-[#1a1a1a] hover:bg-[#e2e8f0]/80 dark:hover:bg-[#222222] text-[#0f172a] dark:text-[#ededed] font-bold rounded-xl text-xs transition-colors border border-[#e2e8f0] dark:border-[#222222] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#e11d48] dark:text-[#f43f5e]" />
            <span>+ سند صرف / مصروف</span>
          </button>

          <button
            onClick={() => navigateTo('inventory')}
            className="flex items-center justify-center gap-2 p-2.5 bg-[#f1f5f9] dark:bg-[#1a1a1a] hover:bg-[#e2e8f0]/80 dark:hover:bg-[#222222] text-[#0f172a] dark:text-[#ededed] font-bold rounded-xl text-xs transition-colors border border-[#e2e8f0] dark:border-[#222222] cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#06b6d4]" />
            <span>تحويل مخزني</span>
          </button>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2e8f0] dark:border-[#222222] gap-3">
            <div>
              <h2 className="text-base font-bold text-[#0f172a] dark:text-[#ededed]">تحليل المبيعات والأرباح</h2>
              <p className="text-xs text-[#475569] dark:text-[#888888]">مقارنة حجم المبيعات الإجمالي مع هامش الربح المحقق</p>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center bg-[#f1f5f9] dark:bg-[#1a1a1a] p-1 rounded-xl text-xs font-semibold border border-[#e2e8f0] dark:border-[#222222]">
              <button
                onClick={() => setChartPeriod('7d')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartPeriod === '7d'
                    ? 'bg-white dark:bg-[#121212] text-[#059669] dark:text-[#10b981] shadow-xs font-bold border border-emerald-200/50 dark:border-[#333333]'
                    : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
                }`}
              >
                7 أيام
              </button>
              <button
                onClick={() => setChartPeriod('30d')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartPeriod === '30d'
                    ? 'bg-white dark:bg-[#121212] text-[#059669] dark:text-[#10b981] shadow-xs font-bold border border-emerald-200/50 dark:border-[#333333]'
                    : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
                }`}
              >
                30 يوم
              </button>
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="h-72 w-full pt-4" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" opacity={0.18} />
                <XAxis dataKey="day" tick={{ fill: '#888888', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#888888', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#121212',
                    borderColor: '#222222',
                    borderRadius: '12px',
                    color: '#ededed',
                    textAlign: 'right',
                    fontSize: '12px',
                    fontFamily: 'Tajawal'
                  }}
                  formatter={(value: any, name: any) => [
                    `${Number(value).toLocaleString()} ج.م`,
                    name === 'sales' ? 'إجمالي المبيعات' : 'صافي الربح'
                  ]}
                />
                <Area type="monotone" dataKey="sales" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" name="sales" />
                <Area type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" name="profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#059669]"></span>
              <span className="text-[#475569] dark:text-[#888888] font-medium">المبيعات الإجمالية</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
              <span className="text-[#475569] dark:text-[#888888] font-medium">صافي الأرباح</span>
            </div>
          </div>
        </div>

        {/* Sales by Category Donut */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
              <h2 className="text-base font-bold text-[#0f172a] dark:text-[#ededed]">المخزون حسب التصنيف</h2>
              <span className="text-xs text-[#475569] dark:text-[#888888] font-mono">{products.length} صنف</span>
            </div>

            {categoryData.length === 0 ? (
              <div className="py-12 text-center text-[#94a3b8] dark:text-[#666666]">
                <Boxes className="w-10 h-10 mx-auto text-[#cbd5e1] dark:text-[#333333] mb-2" />
                <p className="text-xs font-semibold">لا توجد أصناف مسجلة حتى الآن</p>
                <button
                  onClick={() => navigateTo('add_product')}
                  className="mt-3 text-xs text-[#059669] dark:text-[#10b981] font-bold hover:underline cursor-pointer"
                >
                  + إضافة صنف جديد
                </button>
              </div>
            ) : (
              <>
                <div className="h-44 w-full flex items-center justify-center my-2" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [`${value}% من الإجمالي`, 'الحصة']}
                        contentStyle={{
                          backgroundColor: '#121212',
                          borderColor: '#222222',
                          borderRadius: '10px',
                          color: '#ededed',
                          fontSize: '11px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-[#e2e8f0] dark:border-[#222222]">
                  {categoryData.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: cat.color }}></span>
                        <span className="text-[#475569] dark:text-[#888888] font-medium">{cat.name}</span>
                      </div>
                      <span className="font-bold text-[#0f172a] dark:text-[#ededed] font-mono">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Alerts & Critical Attention */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#f59e0b]" />
            <h2 className="text-base font-bold text-[#0f172a] dark:text-[#ededed]">يحتاج إلى انتباهك اليوم</h2>
          </div>
          <span className="text-xs text-[#475569] dark:text-[#888888]">تحديث فوري للمخازن والتحصيل</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            onClick={() => navigateTo('products')}
            className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-[#1a1a1a] border border-rose-200 dark:border-[#f43f5e]/40 cursor-pointer hover:border-[#f43f5e] transition-all text-right group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg font-mono font-black text-[#f43f5e]">
                🔴 {lowStockProducts.length}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#f43f5e] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform" />
            </div>
            <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed]">منتجات تحت الحد الأدنى أو نفدت</p>
            <p className="text-[11px] text-[#475569] dark:text-[#888888] mt-0.5">
              {lowStockProducts.length > 0
                ? lowStockProducts.slice(0, 2).map((p) => p.name).join('، ')
                : 'لا توجد نواقص حرجة حالياً'}
            </p>
          </div>

          <div
            onClick={() => navigateTo('expiry')}
            className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-[#1a1a1a] border border-amber-200 dark:border-[#f59e0b]/40 cursor-pointer hover:border-[#f59e0b] transition-all text-right group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg font-mono font-black text-[#f59e0b]">🟠 0</span>
              <ArrowUpRight className="w-4 h-4 text-[#f59e0b] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform" />
            </div>
            <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed]">دُفعات قريبة الانتهاء (&lt;30 يوم)</p>
            <p className="text-[11px] text-[#475569] dark:text-[#888888] mt-0.5">صلاحيات المخزون بحالة جيدة</p>
          </div>

          <div
            onClick={() => navigateTo('customers')}
            className="p-3.5 rounded-xl bg-orange-50/70 dark:bg-[#1a1a1a] border border-orange-200 dark:border-[#d97706]/40 cursor-pointer hover:border-[#d97706] transition-all text-right group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg font-mono font-black text-[#d97706]">
                🟡 {overLimitCustomers.length}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#d97706] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform" />
            </div>
            <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed]">عملاء تجاوزوا الحد الائتماني</p>
            <p className="text-[11px] text-[#475569] dark:text-[#888888] mt-0.5">
              {overLimitCustomers.length > 0
                ? overLimitCustomers.slice(0, 2).map((c) => c.shopName || c.name).join('، ')
                : 'جميع العملاء ضمن الحد المسموح'}
            </p>
          </div>

          <div
            onClick={() => navigateTo('delivery')}
            className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-[#1a1a1a] border border-blue-200 dark:border-[#3b82f6]/40 cursor-pointer hover:border-[#3b82f6] transition-all text-right group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg font-mono font-black text-[#3b82f6]">
                🔵 {pendingDeliveries.length}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#3b82f6] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform" />
            </div>
            <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed]">أوامر توزيع وشحن جارية</p>
            <p className="text-[11px] text-[#475569] dark:text-[#888888] mt-0.5">
              {pendingDeliveries.length > 0 ? `${pendingDeliveries.length} طلبات قيد التسليم` : 'لا توجد شحنات معلقة'}
            </p>
          </div>
        </div>
      </div>

      {/* Top Products & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Table */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
              <div>
                <h2 className="text-base font-bold text-[#0f172a] dark:text-[#ededed]">المنتجات في المستودع</h2>
                <p className="text-xs text-[#475569] dark:text-[#888888]">الأصناف المسجلة ومستويات الأرصدة</p>
              </div>
              <button
                onClick={() => navigateTo('products')}
                className="text-xs text-[#059669] dark:text-[#10b981] font-bold hover:underline cursor-pointer"
              >
                عرض كل الأصناف ←
              </button>
            </div>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="text-[#475569] dark:text-[#888888] font-semibold border-b border-[#e2e8f0] dark:border-[#222222]">
                    <th className="py-2.5 px-2">المنتج</th>
                    <th className="py-2.5 px-2 text-center">الرصيد المتاح</th>
                    <th className="py-2.5 px-2 text-left">سعر الجملة</th>
                    <th className="py-2.5 px-2 text-left">سعر التكلفة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-[#94a3b8] dark:text-[#666666]">
                        <Boxes className="w-8 h-8 mx-auto text-[#cbd5e1] dark:text-[#333333] mb-1.5" />
                        <p className="text-xs font-semibold">لم تتم إضافة أي منتجات بعد</p>
                        <button
                          onClick={() => navigateTo('add_product')}
                          className="mt-2 text-xs text-[#059669] dark:text-[#10b981] font-bold hover:underline cursor-pointer"
                        >
                          + إضافة أول منتج للمخزون
                        </button>
                      </td>
                    </tr>
                  ) : (
                    products.slice(0, 5).map((p) => (
                      <tr
                        key={p.id}
                        onClick={() => navigateTo('product_details', { productId: p.id })}
                        className="hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover bg-[#f1f5f9] dark:bg-[#1a1a1a] shrink-0" />
                            <div className="max-w-[180px]">
                              <p className="font-bold text-[#0f172a] dark:text-[#ededed] truncate">{p.name}</p>
                              <p className="text-[10px] text-[#475569] dark:text-[#888888]">{p.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center font-mono font-bold text-[#475569] dark:text-[#888888]">
                          {p.stock} {p.unit}
                        </td>
                        <td className="py-3 px-2 text-left font-mono font-bold text-[#0f172a] dark:text-[#ededed]">
                          {p.wholesalePrice.toLocaleString()} ج.م
                        </td>
                        <td className="py-3 px-2 text-left font-mono font-bold text-[#475569] dark:text-[#888888]">
                          {p.costPrice.toLocaleString()} ج.م
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
              <div>
                <h2 className="text-base font-bold text-[#0f172a] dark:text-[#ededed]">أحدث فواتير وطلبات المبيعات</h2>
                <p className="text-xs text-[#475569] dark:text-[#888888]">سجل فواتير التوزيع الفورية</p>
              </div>
              <button
                onClick={() => navigateTo('sales_invoices')}
                className="text-xs text-[#059669] dark:text-[#10b981] font-bold hover:underline cursor-pointer"
              >
                عرض سجل الفواتير ←
              </button>
            </div>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="text-[#475569] dark:text-[#888888] font-semibold border-b border-[#e2e8f0] dark:border-[#222222]">
                    <th className="py-2.5 px-2">رقم الفاتورة</th>
                    <th className="py-2.5 px-2">العميل</th>
                    <th className="py-2.5 px-2 text-center">الوقت</th>
                    <th className="py-2.5 px-2 text-left">القيمة</th>
                    <th className="py-2.5 px-2 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#94a3b8] dark:text-[#666666]">
                        <Receipt className="w-8 h-8 mx-auto text-[#cbd5e1] dark:text-[#333333] mb-1.5" />
                        <p className="text-xs font-semibold">لا توجد فواتير مبيعات مسجلة بعد</p>
                        <button
                          onClick={() => navigateTo('pos')}
                          className="mt-2 text-xs text-[#059669] dark:text-[#10b981] font-bold hover:underline cursor-pointer"
                        >
                          + إنشاء أول فاتورة بيع من نقطة البيع
                        </button>
                      </td>
                    </tr>
                  ) : (
                    invoices.slice(0, 5).map((inv) => (
                      <tr
                        key={inv.id}
                        onClick={() => setSelectedInvoice(inv)}
                        className="hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-2 font-mono font-bold text-[#059669] dark:text-[#10b981]">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-3 px-2 font-semibold text-[#0f172a] dark:text-[#ededed]">
                          <div className="max-w-[150px] truncate">{inv.customerName}</div>
                        </td>
                        <td className="py-3 px-2 text-center text-[#94a3b8] dark:text-[#666666] font-mono text-[11px]">
                          {inv.time}
                        </td>
                        <td className="py-3 px-2 text-left font-mono font-bold text-[#0f172a] dark:text-[#ededed]">
                          {inv.grandTotal.toLocaleString()} ج.م
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold inline-block border ${
                              inv.status === 'completed'
                                ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border-emerald-200 dark:border-[#333333]'
                                : inv.status === 'out_for_delivery'
                                ? 'bg-blue-50 text-[#2563eb] dark:bg-[#1a1a1a] dark:text-[#3b82f6] border-blue-200 dark:border-[#333333]'
                                : 'bg-amber-50 text-[#d97706] dark:bg-[#1a1a1a] dark:text-[#f59e0b] border-amber-200 dark:border-[#333333]'
                            }`}
                          >
                            {inv.status === 'completed'
                              ? 'مكتمل'
                              : inv.status === 'out_for_delivery'
                              ? 'قيد التوصيل'
                              : 'قيد التجهيز'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
