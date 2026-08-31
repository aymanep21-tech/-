import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Receipt, Building2, Boxes, DollarSign, Calendar, X } from 'lucide-react';
import { PurchaseOrder } from '../../types';

export const AddPurchaseModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    suppliers,
    products,
    addPurchaseOrder,
    showToast,
    navigateTo
  } = useApp();

  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id || '');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState<number | ''>(50);
  const [unitCost, setUnitCost] = useState<number | ''>(
    products[0]?.costPrice || 250
  );
  const [warehouse, setWarehouse] = useState('المخزن الرئيسي (المنطقة الصناعية)');
  const [paidAmount, setPaidAmount] = useState<number | ''>(0);
  const [status, setStatus] = useState<'received' | 'pending'>('received');

  if (activeModal !== 'add_purchase') return null;

  const currentSupplier = suppliers.find((s) => s.id === selectedSupplierId) || suppliers[0];
  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const totalCost = (Number(quantity) || 0) * (Number(unitCost) || 0);
  const remaining = Math.max(0, totalCost - (Number(paidAmount) || 0));

  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = products.find((p) => p.id === prodId);
    if (prod) {
      setUnitCost(prod.costPrice);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSupplier) {
      showToast('يرجى إضافة مورد مسجل أولاً في النظام', 'error');
      return;
    }
    if (!currentProduct) {
      showToast('يرجى إضافة منتجات إلى المخزون أولاً لتسجيل أمر التوريد', 'error');
      return;
    }
    if (!quantity || Number(quantity) <= 0) {
      showToast('يرجى تحديد كمية صحيحة للتوريد', 'error');
      return;
    }

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const newPO: Omit<PurchaseOrder, 'id' | 'poNumber'> = {
      supplierId: currentSupplier.id,
      supplierName: currentSupplier.name,
      date: dateStr,
      warehouse,
      items: [
        {
          productId: currentProduct.id,
          productName: currentProduct.name,
          quantity: Number(quantity),
          unitCost: Number(unitCost),
          totalCost
        }
      ],
      subtotal: totalCost,
      tax: 0,
      grandTotal: totalCost,
      paidAmount: Number(paidAmount) || 0,
      remainingAmount: remaining,
      status
    };

    addPurchaseOrder(newPO);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 text-right">
      <div className="w-full max-w-lg bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] flex items-center justify-center border border-transparent dark:border-[#333333]">
              <Receipt className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">تسجيل فاتورة شراء / أمر توريد جديد (PO)</h2>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] text-lg leading-none cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* If no suppliers or products */}
        {suppliers.length === 0 ? (
          <div className="p-4 bg-amber-50 dark:bg-[#1a1a1a] border border-amber-200 dark:border-[#333333] rounded-xl text-center space-y-2">
            <p className="text-xs font-bold text-[#d97706] dark:text-[#f59e0b]">لا يوجد موردون مسجلون حالياً</p>
            <p className="text-[11px] text-[#475569] dark:text-[#888888]">يجب إضافة مورد ومصنع أولاً لربط فاتورة الشراء به.</p>
            <button
              type="button"
              onClick={() => setActiveModal('add_supplier')}
              className="px-3 py-1.5 bg-[#059669] text-white font-bold rounded-lg text-xs cursor-pointer"
            >
              + إضافة مورد جديد الآن
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="p-4 bg-amber-50 dark:bg-[#1a1a1a] border border-amber-200 dark:border-[#333333] rounded-xl text-center space-y-2">
            <p className="text-xs font-bold text-[#d97706] dark:text-[#f59e0b]">لا توجد أصناف في المخزون</p>
            <p className="text-[11px] text-[#475569] dark:text-[#888888]">يجب تعريف الأصناف والمنتجات أولاً قبل تسجيل أوامر التوريد.</p>
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                navigateTo('add_product');
              }}
              className="px-3 py-1.5 bg-[#059669] text-white font-bold rounded-lg text-xs cursor-pointer"
            >
              + تعريف صنف جديد الآن
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">المورد / المصنع *</label>
                <select
                  value={selectedSupplierId || suppliers[0]?.id}
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-bold focus:outline-none focus:border-[#059669]"
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">مستودع الاستلام *</label>
                <select
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                >
                  <option value="المخزن الرئيسي (المنطقة الصناعية)">المخزن الرئيسي (المنطقة الصناعية)</option>
                  <option value="مخزن التبريد المركزي">مخزن التبريد المركزي</option>
                  <option value="مخزن الفرع والمعرض">مخزن الفرع والمعرض</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الصنف المورد *</label>
              <select
                value={selectedProductId || products[0]?.id}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-bold focus:outline-none focus:border-[#059669]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">
                  الكمية الواردة ({currentProduct?.unit || 'كرتونة'}) *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-sm font-bold text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">سعر الشراء للوحدة (ج.م) *</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={unitCost}
                  onChange={(e) => setUnitCost(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-sm font-bold text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            <div className="p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] rounded-xl flex items-center justify-between text-xs">
              <span className="text-[#475569] dark:text-[#888888] font-bold">إجمالي قيمة الفاتورة:</span>
              <span className="font-mono text-sm font-black text-[#059669] dark:text-[#10b981]">
                {totalCost.toLocaleString()} ج.م
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">المبلغ المسدد نقداً / بنكياً</label>
                <input
                  type="number"
                  min={0}
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] font-mono text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">حالة الاستلام المخزني</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'received' | 'pending')}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                >
                  <option value="received">تم الاستلام وإضافة الرصيد للمخزن</option>
                  <option value="pending">أمر قيد الشحن والتوريد</option>
                </select>
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
                حفظ أمر الشراء
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
