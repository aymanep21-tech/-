import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Boxes,
  Barcode,
  ArrowRight,
  TrendingUp,
  Package,
  Calendar,
  Warehouse,
  ShoppingCart,
  Receipt,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

export const ProductDetailsView: React.FC = () => {
  const {
    products,
    selectedProductId,
    navigateTo,
    addToPosCart
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'stock' | 'pricing' | 'batches' | 'sales' | 'purchases' | 'movement'>('overview');

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  if (!product) {
    return (
      <div className="p-8 text-center text-[#475569] dark:text-[#888888]">
        <p>المنتج غير موجود.</p>
        <button
          onClick={() => navigateTo('products')}
          className="mt-3 px-4 py-2 bg-[#059669] hover:bg-[#10b981] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          العودة للمنتجات
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', title: 'نظرة عامة' },
    { id: 'stock', title: 'المخزون' },
    { id: 'pricing', title: 'الأسعار والوحدات' },
    { id: 'batches', title: 'الدُفعات والصلاحية' },
    { id: 'sales', title: 'المبيعات' },
    { id: 'purchases', title: 'المشتريات' },
    { id: 'movement', title: 'سجل الحركة' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Back Button */}
      <button
        onClick={() => navigateTo('products')}
        className="flex items-center gap-1.5 text-xs font-bold text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] transition-colors cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة لقائمة المنتجات</span>
      </button>

      {/* Header Card (Section 20) */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded-2xl object-cover border border-[#e2e8f0] dark:border-[#222222] bg-[#f8f9fa] dark:bg-[#1a1a1a] shadow-xs shrink-0"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-[#0f172a] dark:text-[#ededed]">
                  {product.name}
                </h1>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                    product.status === 'in_stock'
                      ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border-emerald-200/60 dark:border-[#333333]'
                      : product.status === 'low_stock'
                      ? 'bg-amber-50 text-[#d97706] dark:bg-[#1a1a1a] dark:text-[#f59e0b] border-amber-200/60 dark:border-[#333333]'
                      : 'bg-rose-50 text-[#f43f5e] dark:bg-[#1a1a1a] dark:text-[#fb7185] border-rose-200/60 dark:border-[#333333]'
                  }`}
                >
                  {product.status === 'in_stock'
                    ? 'متوفر بالمخزن'
                    : product.status === 'low_stock'
                    ? 'مخزون منخفض'
                    : 'نفد من المخزن'}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#475569] dark:text-[#888888] flex-wrap">
                <span className="font-mono font-semibold text-[#0f172a] dark:text-[#ededed]">
                  كود: {product.code}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Barcode className="w-3.5 h-3.5 text-[#94a3b8] dark:text-[#666666]" />
                  الباركود: {product.barcode}
                </span>
                <span>•</span>
                <span>التصنيف: {product.category}</span>
                <span>•</span>
                <span>البراند: {product.brand}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => {
                addToPosCart(product);
                navigateTo('pos');
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>إصدار فاتورة بيع</span>
            </button>

            <button
              onClick={() => navigateTo('purchases')}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#f8f9fa] hover:bg-[#f1f5f9] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] text-[#0f172a] dark:text-[#ededed] font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-[#0ea5e9]" />
              <span>طلب شراء</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-t border-[#e2e8f0] dark:border-[#222222] mt-6 pt-3 overflow-x-auto text-xs font-semibold">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-2 rounded-xl transition-all shrink-0 cursor-pointer ${
                activeTab === t.id
                  ? 'bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333] font-bold'
                  : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Metrics */}
          <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">المؤشرات المالية للصنف</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-[#e2e8f0] dark:border-[#222222]">
                <span className="text-[#475569] dark:text-[#888888]">المبيعات الشهرية:</span>
                <span className="font-mono font-bold text-[#0f172a] dark:text-[#ededed]">{product.monthlySales} {product.unit}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e2e8f0] dark:border-[#222222]">
                <span className="text-[#475569] dark:text-[#888888]">إجمالي الإيرادات:</span>
                <span className="font-mono font-bold text-[#0f172a] dark:text-[#ededed]">{product.revenue.toLocaleString()} ج.م</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e2e8f0] dark:border-[#222222]">
                <span className="text-[#475569] dark:text-[#888888]">صافي الربح المحقق:</span>
                <span className="font-mono font-bold text-[#059669] dark:text-[#10b981]">+{product.profit.toLocaleString()} ج.م</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#475569] dark:text-[#888888]">هامش ربح الجملة:</span>
                <span className="font-mono font-bold text-[#059669] dark:text-[#10b981]">
                  {Math.round(((product.wholesalePrice - product.costPrice) / product.costPrice) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Description & Specs */}
          <div className="md:col-span-2 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">تفاصيل ومواصفات المنتج</h3>
            <p className="text-xs text-[#475569] dark:text-[#888888] leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl">
                <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">الموقع المخزني الافتراضي</p>
                <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed] mt-1">{product.warehouse}</p>
              </div>
              <div className="p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl">
                <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">الحد الأدنى للطلب</p>
                <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed] mt-1">{product.minStock} {product.unit}</p>
              </div>
              <div className="p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl">
                <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">سعر التكلفة (شراء)</p>
                <p className="text-xs font-bold font-mono text-[#0f172a] dark:text-[#ededed] mt-1">{product.costPrice} ج.م</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stock Tab */}
      {activeTab === 'stock' && (
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
            <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">توزيع المخزون بالمستودعات</h3>
            <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10b981]">إجمالي المخزون: {product.stock} {product.unit}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl">
              <div className="flex items-center gap-3">
                <Warehouse className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />
                <div>
                  <p className="font-bold text-[#0f172a] dark:text-[#ededed]">{product.warehouse}</p>
                  <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">المخزن الأساسي للتوزيع</p>
                </div>
              </div>
              <div className="text-left font-mono">
                <p className="font-bold text-[#0f172a] dark:text-[#ededed] text-sm">{product.stock} {product.unit}</p>
                <p className="text-[10px] text-[#059669] dark:text-[#10b981]">جاهز للصرف والتسليم</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing & Units Tab */}
      {activeTab === 'pricing' && (
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">جدول الوحدات والأسعار المتدرجة (Wholesale Tier Pricing)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-bold border-b border-[#e2e8f0] dark:border-[#222222]">
                  <th className="py-2.5 px-3">الوحدة</th>
                  <th className="py-2.5 px-3 text-center">معامل التحويل</th>
                  <th className="py-2.5 px-3 text-left">سعر الشراء (التكلفة)</th>
                  <th className="py-2.5 px-3 text-left">سعر الجملة (Wholesale)</th>
                  <th className="py-2.5 px-3 text-left">سعر نصف الجملة</th>
                  <th className="py-2.5 px-3 text-left">سعر البيع المقترح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
                {product.units.map((u, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-3 px-3 font-bold text-[#0f172a] dark:text-[#ededed]">{u.name}</td>
                    <td className="py-3 px-3 text-center font-mono text-[#475569] dark:text-[#888888]">1 {product.unit} = {u.conversionRate} {u.name}</td>
                    <td className="py-3 px-3 text-left font-mono text-[#475569] dark:text-[#888888]">{u.costPrice} ج.م</td>
                    <td className="py-3 px-3 text-left font-mono font-bold text-[#059669] dark:text-[#10b981]">{u.wholesalePrice} ج.م</td>
                    <td className="py-3 px-3 text-left font-mono text-[#0f172a] dark:text-[#ededed]">{u.halfWholesalePrice} ج.م</td>
                    <td className="py-3 px-3 text-left font-mono text-[#94a3b8] dark:text-[#666666]">{u.retailPrice} ج.م</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Batches Tab */}
      {activeTab === 'batches' && (
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">الدُفعات وتواريخ الصلاحية (Batches Tracking)</h3>
          {product.batches.length === 0 ? (
            <p className="text-xs text-[#94a3b8] dark:text-[#666666] py-6 text-center">لا توجد دُفعات مسجلة لهذا الصنف حالياً</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-bold border-b border-[#e2e8f0] dark:border-[#222222]">
                    <th className="py-2.5 px-3">رقم الباتش (Batch #)</th>
                    <th className="py-2.5 px-3">المستودع</th>
                    <th className="py-2.5 px-3 text-center">الكمية</th>
                    <th className="py-2.5 px-3 text-center">تاريخ الانتهاء</th>
                    <th className="py-2.5 px-3 text-center">الأيام المتبقية</th>
                    <th className="py-2.5 px-3 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
                  {product.batches.map((b, idx) => (
                    <tr key={idx} className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#0f172a] dark:text-[#ededed]">{b.batchNumber}</td>
                      <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">{b.warehouse}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-[#0f172a] dark:text-[#ededed]">{b.quantity} {product.unit}</td>
                      <td className="py-3 px-3 text-center font-mono text-[#475569] dark:text-[#888888]">{b.expiryDate}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold">
                        <span className={b.daysRemaining < 30 ? 'text-[#f43f5e]' : 'text-[#0f172a] dark:text-[#ededed]'}>
                          {b.daysRemaining} يوم
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            b.status === 'safe'
                              ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border-emerald-200/60 dark:border-[#333333]'
                              : b.status === 'warning'
                              ? 'bg-amber-50 text-[#d97706] dark:bg-[#1a1a1a] dark:text-[#f59e0b] border-amber-200/60 dark:border-[#333333]'
                              : 'bg-rose-50 text-[#f43f5e] dark:bg-[#1a1a1a] dark:text-[#fb7185] border-rose-200/60 dark:border-[#333333]'
                          }`}
                        >
                          {b.status === 'safe' ? '🟢 آمن' : b.status === 'warning' ? '🟡 قريب الانتهاء' : '🔴 خطر / تنبيه'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Movement & Transactions Log */}
      {(activeTab === 'movement' || activeTab === 'sales' || activeTab === 'purchases') && (
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">سجل حركة الصنف (Audit Trail)</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-[#1a1a1a] text-[#f43f5e] border border-rose-200/50 dark:border-[#333333]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#0f172a] dark:text-[#ededed]">صرف فاتورة بيع INV-2026-1089</p>
                  <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">هايبر ماركت البركة والخير • المندوب محمد سامي</p>
                </div>
              </div>
              <div className="text-left font-mono">
                <p className="font-bold text-[#f43f5e]">-20 كرتونة</p>
                <p className="text-[10px] text-[#94a3b8] dark:text-[#666666]">الرصيد بعد: 240</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-emerald-200/50 dark:border-[#333333]">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#0f172a] dark:text-[#ededed]">استلام أمر توريد شراء PO-8840</p>
                  <p className="text-[11px] text-[#94a3b8] dark:text-[#666666]">شركة صافولا للأغذية • فاتورة 48920</p>
                </div>
              </div>
              <div className="text-left font-mono">
                <p className="font-bold text-[#059669] dark:text-[#10b981]">+100 كرتونة</p>
                <p className="text-[10px] text-[#94a3b8] dark:text-[#666666]">الرصيد بعد: 260</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
