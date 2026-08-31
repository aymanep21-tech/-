import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Boxes,
  Warehouse,
  ArrowUpDown,
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  TrendingDown,
  Calendar,
  Layers,
  Search,
  Download,
  Plus
} from 'lucide-react';

export const InventoryView: React.FC = () => {
  const { products, navigateTo, showToast } = useApp();

  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  // Transfer state
  const [transferProduct, setTransferProduct] = useState(products[0]?.id || '');
  const [fromWarehouse, setFromWarehouse] = useState('المخزن الرئيسي (المنطقة الصناعية)');
  const [toWarehouse, setToWarehouse] = useState('مخزن التبريد المركزي');
  const [transferQty, setTransferQty] = useState(10);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.includes(searchQuery) || p.code.includes(searchQuery);
    const matchesWh = selectedWarehouse === 'all' || p.warehouse === selectedWarehouse;
    return matchesSearch && matchesWh;
  });

  const totalStockValue = products.reduce((acc, p) => acc + p.stock * p.costPrice, 0);
  const totalWholesaleValue = products.reduce((acc, p) => acc + p.stock * p.wholesalePrice, 0);
  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromWarehouse === toWarehouse) {
      showToast('يرجى اختيار مستودعين مختلفين لإتمام التحويل', 'error');
      return;
    }
    setTransferModalOpen(false);
    showToast(`تم تحويل ${transferQty} كرتونة بنجاح من ${fromWarehouse} إلى ${toWarehouse}`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">إدارة المخازن والمستودعات</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            متابعة أرصدة الأصناف، تقييم المخزون المالي، والتحويل بين الفروع والمستودعات.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setTransferModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>+ تحويل مخزني بين الفروع</span>
          </button>

          <button
            onClick={() => navigateTo('expiry')}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 dark:bg-[#1a1a1a] text-[#d97706] dark:text-[#f59e0b] hover:bg-amber-100 dark:hover:bg-[#222222] font-semibold rounded-xl text-xs transition-colors border border-amber-200/60 dark:border-[#333333] cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>تواريخ الصلاحية والدُفعات</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">قيمة المخزون بسعر التكلفة (Cost)</p>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333] flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-mono font-extrabold text-[#0f172a] dark:text-[#ededed]">
            {totalStockValue.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-1">إجمالي رأس المال المجمد في البضاعة</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">القيمة البيعية المتوقعة (Wholesale)</p>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-[#1a1a1a] text-[#0ea5e9] dark:text-[#38bdf8] border border-blue-200/60 dark:border-[#333333] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-mono font-extrabold text-[#059669] dark:text-[#10b981]">
            {totalWholesaleValue.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-1">هامش ربح مرتقب: {(totalWholesaleValue - totalStockValue).toLocaleString()} ج.م</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">تنبيهات نواقص المخزون</p>
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-[#1a1a1a] text-[#f43f5e] border border-rose-200/60 dark:border-[#333333] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-mono font-extrabold text-[#f43f5e]">
            {lowStockCount} أصناف
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-1">تتطلب إصدار أوامر شراء عاجلة</p>
        </div>
      </div>

      {/* Warehouses Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] flex items-center justify-center text-[#475569] dark:text-[#888888]">
              <Warehouse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">المخزن الرئيسي (المنطقة الصناعية)</h3>
              <p className="text-xs text-[#94a3b8] dark:text-[#666666]">السعة: 85% • 1,420 صنف</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-[#1a1a1a] border border-blue-200/60 dark:border-[#333333] flex items-center justify-center text-[#0ea5e9] dark:text-[#38bdf8]">
              <Warehouse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">مخزن التبريد المركزي</h3>
              <p className="text-xs text-[#94a3b8] dark:text-[#666666]">درجة الحرارة: +4°C • السعة: 60%</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-[#1a1a1a] border border-amber-200/60 dark:border-[#333333] flex items-center justify-center text-[#d97706] dark:text-[#f59e0b]">
              <Warehouse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">مخزن المنظفات والكيماويات</h3>
              <p className="text-xs text-[#94a3b8] dark:text-[#666666]">السعة: 45% • معزول تماماً</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Balances Table */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-[#e2e8f0] dark:border-[#222222] flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#94a3b8] dark:text-[#666666] absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، الكود..."
              className="w-full pr-10 pl-4 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="w-full md:w-56">
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="all">جميع المستودعات</option>
              <option value="المخزن الرئيسي (المنطقة الصناعية)">المخزن الرئيسي (المنطقة الصناعية)</option>
              <option value="مخزن التبريد المركزي">مخزن التبريد المركزي</option>
              <option value="مخزن المنظفات والكيماويات">مخزن المنظفات والكيماويات</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold">
                <th className="py-3 px-3">المنتج</th>
                <th className="py-3 px-3">الكود</th>
                <th className="py-3 px-3">المستودع الافتراضي</th>
                <th className="py-3 px-3 text-center">الرصيد الفعلي</th>
                <th className="py-3 px-3 text-center">الحد الأدنى</th>
                <th className="py-3 px-3 text-left">سعر التكلفة</th>
                <th className="py-3 px-3 text-left">قيمة المخزون (ج.م)</th>
                <th className="py-3 px-3 text-center">حالة الصنف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigateTo('product_details', { productId: p.id })}
                  className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-semibold text-[#0f172a] dark:text-[#ededed]">
                    <div className="flex items-center gap-2">
                      <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333]" />
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#94a3b8] dark:text-[#666666]">{p.code}</td>
                  <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">{p.warehouse}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-[#0f172a] dark:text-[#ededed]">
                    <span className={p.stock <= p.minStock ? 'text-[#f43f5e]' : ''}>
                      {p.stock} {p.unit}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-[#94a3b8] dark:text-[#666666]">{p.minStock} {p.unit}</td>
                  <td className="py-3 px-3 text-left font-mono text-[#94a3b8] dark:text-[#666666]">{p.costPrice.toLocaleString()} ج.م</td>
                  <td className="py-3 px-3 text-left font-mono font-bold text-[#059669] dark:text-[#10b981]">
                    {(p.stock * p.costPrice).toLocaleString()} ج.م
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                        p.status === 'in_stock'
                          ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border-emerald-200/60 dark:border-[#333333]'
                          : p.status === 'low_stock'
                          ? 'bg-amber-50 text-[#d97706] dark:bg-[#1a1a1a] dark:text-[#f59e0b] border-amber-200/60 dark:border-[#333333]'
                          : 'bg-rose-50 text-[#f43f5e] border-rose-200/60 dark:border-[#333333]'
                      }`}
                    >
                      {p.status === 'in_stock' ? 'متوفر' : p.status === 'low_stock' ? 'منخفض' : 'نفد'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Transfer Modal */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 text-right space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />
                <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">إجراء تحويل بضاعة بين المخازن</h3>
              </div>
              <button
                onClick={() => setTransferModalOpen(false)}
                className="text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteTransfer} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">اختر الصنف المراد تحويله:</label>
                <select
                  value={transferProduct}
                  onChange={(e) => setTransferProduct(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (المتوفر: {p.stock} {p.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">من مستودع:</label>
                  <select
                    value={fromWarehouse}
                    onChange={(e) => setFromWarehouse(e.target.value)}
                    className="w-full p-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] text-[11px] focus:outline-none focus:border-[#059669]"
                  >
                    <option value="المخزن الرئيسي (المنطقة الصناعية)">المخزن الرئيسي</option>
                    <option value="مخزن التبريد المركزي">مخزن التبريد</option>
                    <option value="مخزن المنظفات والكيماويات">مخزن المنظفات</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">إلى مستودع:</label>
                  <select
                    value={toWarehouse}
                    onChange={(e) => setToWarehouse(e.target.value)}
                    className="w-full p-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] text-[11px] focus:outline-none focus:border-[#059669]"
                  >
                    <option value="مخزن التبريد المركزي">مخزن التبريد</option>
                    <option value="المخزن الرئيسي (المنطقة الصناعية)">المخزن الرئيسي</option>
                    <option value="مخزن المنظفات والكيماويات">مخزن المنظفات</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الكمية المحولة (كرتونة):</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={transferQty}
                  onChange={(e) => setTransferQty(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] font-bold focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#059669] hover:bg-[#10b981] text-white font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
                >
                  تأكيد التحويل ونقل العهدة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
