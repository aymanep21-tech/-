import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PurchaseOrder } from '../types';
import {
  Receipt,
  Plus,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  Boxes,
  Truck,
  Building2,
  Calendar,
  DollarSign,
  Download
} from 'lucide-react';

export const PurchasesView: React.FC = () => {
  const { purchaseOrders, suppliers, products, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [newOrderModal, setNewOrderModal] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id || '');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [orderQuantity, setOrderQuantity] = useState(50);
  const [unitCost, setUnitCost] = useState(300);

  const filteredOrders = purchaseOrders.filter((po) => {
    return (
      po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPurchases = purchaseOrders.reduce((acc, po) => acc + po.grandTotal, 0);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setNewOrderModal(false);
    showToast('تم إصدار أمر الشراء PO وإرساله للمورد بنجاح', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header (Section 29) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">أوامر الشراء وفواتير الموردين</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            إدارة طلبات التوريد، استلام البضائع بالمستودعات، وتحديث أرصدة وتكاليف الأصناف.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setNewOrderModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ أمر توريد / شراء جديد (PO)</span>
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">إجمالي المشتريات والتوريدات</p>
          <p className="text-2xl font-mono font-extrabold text-[#0f172a] dark:text-[#ededed] mt-1">
            {totalPurchases.toLocaleString()} ج.م
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">هذا الشهر</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">أوامر تم استلامها وفحصها</p>
          <p className="text-2xl font-mono font-extrabold text-[#059669] dark:text-[#10b981] mt-1">
            {purchaseOrders.filter((p) => p.status === 'received').length} أوامر
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">مكتملة ومضافة للمخزون</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666]">أوامر قيد الشحن والتوريد</p>
          <p className="text-2xl font-mono font-extrabold text-[#d97706] dark:text-[#f59e0b] mt-1">
            {purchaseOrders.filter((p) => p.status === 'pending').length} أوامر
          </p>
          <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">مرتقبة خلال 48 ساعة</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#94a3b8] dark:text-[#666666] absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم أمر التوريد أو اسم المورد..."
              className="w-full pr-10 pl-4 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
            />
          </div>
          <span className="text-xs text-[#94a3b8] dark:text-[#666666]">إجمالي الأوامر: {filteredOrders.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold">
                <th className="py-3 px-3">رقم الأمر (PO)</th>
                <th className="py-3 px-3">الشركة الموردة</th>
                <th className="py-3 px-3">تاريخ الطلب</th>
                <th className="py-3 px-3">المستودع المستلم</th>
                <th className="py-3 px-3 text-left">قيمة الفاتورة</th>
                <th className="py-3 px-3 text-left">المدفوع للمورد</th>
                <th className="py-3 px-3 text-left">المتبقي (آجل)</th>
                <th className="py-3 px-3 text-center">حالة الاستلام</th>
                <th className="py-3 px-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
              {filteredOrders.map((po) => (
                <tr key={po.id} className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#059669] dark:text-[#10b981]">
                    {po.poNumber}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#0f172a] dark:text-[#ededed]">
                    {po.supplierName}
                  </td>
                  <td className="py-3 px-3 font-mono text-[#94a3b8] dark:text-[#666666]">{po.date}</td>
                  <td className="py-3 px-3 text-[#475569] dark:text-[#888888]">{po.warehouse}</td>
                  <td className="py-3 px-3 text-left font-mono font-bold text-[#0f172a] dark:text-[#ededed]">
                    {po.grandTotal.toLocaleString()} ج.م
                  </td>
                  <td className="py-3 px-3 text-left font-mono font-bold text-[#059669] dark:text-[#10b981]">
                    {po.paidAmount.toLocaleString()} ج.م
                  </td>
                  <td className="py-3 px-3 text-left font-mono font-bold text-[#f43f5e]">
                    {po.remainingAmount > 0 ? `${po.remainingAmount.toLocaleString()} ج.م` : '-'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                        po.status === 'received'
                          ? 'bg-emerald-50 text-[#059669] dark:bg-[#1a1a1a] dark:text-[#10b981] border-emerald-200/60 dark:border-[#333333]'
                          : 'bg-amber-50 text-[#d97706] dark:bg-[#1a1a1a] dark:text-[#f59e0b] border-amber-200/60 dark:border-[#333333]'
                      }`}
                    >
                      {po.status === 'received' ? '✓ تم الاستلام بالمخزن' : '⏳ قيد التوريد'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => showToast(`تفاصيل أمر الشراء ${po.poNumber}`, 'info')}
                      className="p-1.5 rounded-lg text-[#94a3b8] dark:text-[#666666] hover:text-[#059669] dark:hover:text-[#10b981] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Purchase Order Modal */}
      {newOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 text-right space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />
                <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">إصدار أمر شراء وتوريد بضاعة جديد</h3>
              </div>
              <button onClick={() => setNewOrderModal(false)} className="text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الشركة الموردة:</label>
                <select
                  value={selectedSupplierId}
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.contactPerson}) - رصيد المورد: {s.balance.toLocaleString()} ج.م
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الصنف المطلوب:</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (التكلفة الحالية: {p.costPrice} ج.م)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الكمية (كرتونة):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] font-bold focus:outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">سعر الشراء المتفق عليه:</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={unitCost}
                    onChange={(e) => setUnitCost(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] font-bold focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-[#1a1a1a] border border-emerald-200/60 dark:border-[#333333] rounded-xl flex justify-between items-center text-xs">
                <span className="font-bold text-[#059669] dark:text-[#10b981]">إجمالي قيمة الفاتورة التقديرية:</span>
                <span className="font-mono font-extrabold text-sm text-[#059669] dark:text-[#10b981]">
                  {(orderQuantity * unitCost).toLocaleString()} ج.م
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewOrderModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#059669] hover:bg-[#10b981] text-white font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
                >
                  تأكيد وإصدار أمر التوريد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
