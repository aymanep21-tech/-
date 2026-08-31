import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  User,
  UserPlus,
  Percent,
  CreditCard,
  Banknote,
  Building2,
  Printer,
  Save,
  Barcode,
  Boxes,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PosView: React.FC = () => {
  const {
    products,
    customers,
    salesReps,
    posCart,
    posCustomer,
    setPosCustomer,
    posPricingTier,
    setPosPricingTier,
    posDiscount,
    setPosDiscount,
    posPaidAmount,
    setPosPaidAmount,
    addToPosCart,
    updatePosCartQuantity,
    updatePosCartUnit,
    removeFromPosCart,
    clearPosCart,
    createInvoiceFromPos,
    setActiveModal,
    showToast,
    navigateTo
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit' | 'bank_transfer'>('cash');
  const [selectedRepId, setSelectedRepId] = useState(salesReps[0]?.id || '');
  const [selectedWarehouse, setSelectedWarehouse] = useState('المخزن الرئيسي (المنطقة الصناعية)');

  // Get distinct categories from real products
  const productCategories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const categories = ['all', ...productCategories];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery);
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Calculate totals
  const subtotal = posCart.reduce((acc, item) => acc + item.total, 0);
  const grandTotal = Math.max(0, subtotal - posDiscount);
  const paid = paymentMethod === 'cash' ? (posPaidAmount || grandTotal) : posPaidAmount;
  const remaining = Math.max(0, grandTotal - paid);

  const handleCheckout = (andPrint: boolean = false) => {
    if (posCart.length === 0) {
      showToast('سلة الفاتورة فارغة، يرجى إضافة أصناف للبيع أولاً', 'error');
      return;
    }

    const newInvoice = createInvoiceFromPos(paymentMethod, selectedRepId, selectedWarehouse);

    if (andPrint) {
      setTimeout(() => {
        window.print();
      }, 300);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200 text-right">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#121212] p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#222222] shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#059669] flex items-center justify-center text-white shadow-xs">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-[#0f172a] dark:text-[#ededed]">نقطة بيع وتوزيع الجملة (Wholesale POS)</h1>
            <p className="text-xs text-[#475569] dark:text-[#888888]">إصدار فواتير بيع سريعة للمحلات، المطاعم والسوبرماركت</p>
          </div>
        </div>

        {/* Pricing tier switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#475569] dark:text-[#888888]">مستوى السعر:</span>
          <div className="flex bg-[#f1f5f9] dark:bg-[#1a1a1a] p-1 rounded-xl text-xs font-semibold border border-[#e2e8f0] dark:border-[#222222]">
            <button
              onClick={() => setPosPricingTier('wholesale')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                posPricingTier === 'wholesale'
                  ? 'bg-[#059669] text-white font-bold shadow-xs'
                  : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
              }`}
            >
              سعر جملة
            </button>
            <button
              onClick={() => setPosPricingTier('half_wholesale')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                posPricingTier === 'half_wholesale'
                  ? 'bg-[#059669] text-white font-bold shadow-xs'
                  : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
              }`}
            >
              نصف جملة
            </button>
            <button
              onClick={() => setPosPricingTier('retail')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                posPricingTier === 'retail'
                  ? 'bg-[#059669] text-white font-bold shadow-xs'
                  : 'text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed]'
              }`}
            >
              قطاعي
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Cart (5 cols) & Right Products Grid (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Right Side: Product Catalog & Search */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search & Barcode scanning */}
          <div className="bg-white dark:bg-[#121212] p-3.5 rounded-2xl border border-[#e2e8f0] dark:border-[#222222] shadow-2xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#94a3b8] dark:text-[#666666] absolute right-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم، كود الصنف، أو امسح الباركود..."
                className="w-full pr-10 pl-4 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl transition-all shrink-0 font-semibold cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#059669] text-white font-bold shadow-xs'
                      : 'bg-[#f1f5f9] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] hover:bg-[#e2e8f0] dark:hover:bg-[#222222] hover:text-[#0f172a] dark:hover:text-[#ededed] border border-transparent dark:border-[#222222]'
                  }`}
                >
                  {cat === 'all' ? 'جميع الأصناف' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-0.5">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-16 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl text-center p-6 space-y-3">
                <Boxes className="w-12 h-12 mx-auto text-[#cbd5e1] dark:text-[#333333]" />
                <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">لا توجد أصناف في المستودع</h3>
                <p className="text-xs text-[#475569] dark:text-[#888888] max-w-sm mx-auto">
                  ابدأ بتسجيل أول صنف في المخزون لتتمكن من إصدار الفواتير الفورية.
                </p>
                <button
                  onClick={() => navigateTo('add_product')}
                  className="mt-2 px-4 py-2 bg-[#059669] hover:bg-[#10b981] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                >
                  + إضافة صنف جديد الآن
                </button>
              </div>
            ) : (
              filteredProducts.map((p) => {
                const activePrice =
                  posPricingTier === 'wholesale'
                    ? p.wholesalePrice
                    : posPricingTier === 'half_wholesale'
                    ? p.halfWholesalePrice
                    : p.retailPrice;

                return (
                  <div
                    key={p.id}
                    onClick={() => addToPosCart(p)}
                    className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] hover:border-[#059669] dark:hover:border-[#10b981] rounded-2xl p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative mb-2">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-24 rounded-xl object-cover bg-[#f1f5f9] dark:bg-[#1a1a1a]"
                        />
                        <span
                          className={`absolute top-1.5 right-1.5 text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                            p.stock <= p.minStock
                              ? 'bg-[#f43f5e] text-white'
                              : 'bg-[#0f172a]/80 dark:bg-black/80 text-white'
                          }`}
                        >
                          {p.stock} {p.unit}
                        </span>
                      </div>

                      <h3 className="font-bold text-xs text-[#0f172a] dark:text-[#ededed] line-clamp-2 group-hover:text-[#059669] dark:group-hover:text-[#10b981] transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-[10px] text-[#94a3b8] dark:text-[#666666] mt-0.5 font-mono">{p.code}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#e2e8f0] dark:border-[#222222]">
                      <div>
                        <p className="text-xs font-mono font-extrabold text-[#059669] dark:text-[#10b981]">
                          {activePrice.toLocaleString()} ج.م
                        </p>
                        <p className="text-[9px] text-[#94a3b8] dark:text-[#666666]">/{p.unit}</p>
                      </div>

                      <button
                        type="button"
                        className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-[#1a1a1a] border border-emerald-200/50 dark:border-[#333333] text-[#059669] dark:text-[#10b981] group-hover:bg-[#059669] group-hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Left Side: Active Invoice & Cart */}
        <div className="lg:col-span-5 bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs flex flex-col justify-between space-y-4">
          {/* Customer & Rep Selectors */}
          <div className="space-y-3 pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
            {/* Customer Picker */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#0f172a] dark:text-[#ededed]">العميل / المتجر:</label>
                <button
                  onClick={() => setActiveModal('add_customer')}
                  className="text-[11px] text-[#059669] dark:text-[#10b981] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>+ عميل جديد</span>
                </button>
              </div>

              <select
                value={posCustomer?.id || ''}
                onChange={(e) => {
                  const cust = customers.find((c) => c.id === e.target.value) || null;
                  setPosCustomer(cust);
                }}
                className="w-full p-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-medium focus:outline-none focus:border-[#059669]"
              >
                <option value="">عميل نقدي مباشر (كاش)</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.shopName} ({c.name}) - الرصيد: {(c.balance ?? c.currentBalance ?? 0).toLocaleString()} ج.م
                  </option>
                ))}
              </select>
            </div>

            {/* Rep & Warehouse Row */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[#475569] dark:text-[#888888] font-bold mb-1">المندوب:</label>
                <select
                  value={selectedRepId}
                  onChange={(e) => setSelectedRepId(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                >
                  {salesReps.length === 0 ? (
                    <option value="">المبيعات المباشرة</option>
                  ) : (
                    salesReps.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-[#475569] dark:text-[#888888] font-bold mb-1">المستودع:</label>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
                >
                  <option value="المخزن الرئيسي (المنطقة الصناعية)">المخزن الرئيسي</option>
                  <option value="مخزن التبريد المركزي">مخزن التبريد</option>
                  <option value="مخزن الفرع والمعرض">مخزن المعرض</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 min-h-[220px] max-h-[280px] overflow-y-auto space-y-2">
            {posCart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[#94a3b8] dark:text-[#666666] py-10">
                <ShoppingCart className="w-10 h-10 mb-2 stroke-1" />
                <p className="text-xs font-semibold">سلة الفاتورة فارغة</p>
                <p className="text-[11px] text-[#94a3b8] dark:text-[#666666] mt-0.5">انقر على الأصناف لإضافتها للفاتورة</p>
              </div>
            ) : (
              posCart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedUnit}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] text-xs"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="font-bold text-[#0f172a] dark:text-[#ededed] truncate">{item.product.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#475569] dark:text-[#888888]">
                      <span>{item.unitPrice.toLocaleString()} ج.م</span>
                      <span>×</span>
                      <select
                        value={item.selectedUnit}
                        onChange={(e) => updatePosCartUnit(item.product.id, e.target.value)}
                        className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#333333] rounded px-1 text-[10px] font-semibold"
                      >
                        {item.product.units?.map((u) => (
                          <option key={u.name} value={u.name}>
                            {u.name}
                          </option>
                        )) || <option value={item.product.unit}>{item.product.unit}</option>}
                      </select>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#333333] rounded-lg p-0.5">
                      <button
                        onClick={() => updatePosCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#475569] dark:text-[#888888] hover:text-[#f43f5e] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updatePosCartQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-10 text-center font-mono font-bold text-xs bg-transparent focus:outline-none text-[#0f172a] dark:text-[#ededed]"
                      />
                      <button
                        onClick={() => updatePosCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#475569] dark:text-[#888888] hover:text-[#059669] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono font-bold text-xs text-[#0f172a] dark:text-[#ededed] w-16 text-left">
                      {item.total.toLocaleString()}
                    </span>

                    <button
                      onClick={() => removeFromPosCart(item.product.id)}
                      className="text-[#94a3b8] hover:text-[#f43f5e] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals & Payment Checkout */}
          <div className="pt-3 border-t border-[#e2e8f0] dark:border-[#222222] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#475569] dark:text-[#888888]">
                <span>المجموع الفرعي:</span>
                <span className="font-mono font-bold">{subtotal.toLocaleString()} ج.م</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#475569] dark:text-[#888888]">خصم إضافي:</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    value={posDiscount || ''}
                    onChange={(e) => setPosDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="0"
                    className="w-20 p-1 text-xs text-left font-mono font-bold rounded-lg border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none"
                  />
                  <span className="text-[11px] text-[#475569] dark:text-[#888888]">ج.م</span>
                </div>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-[#0f172a] dark:text-[#ededed] pt-1.5 border-t border-[#e2e8f0] dark:border-[#222222]">
                <span>الإجمالي الصافي:</span>
                <span className="font-mono text-base text-[#059669] dark:text-[#10b981]">
                  {grandTotal.toLocaleString()} ج.م
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-[#f1f5f9] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] border border-[#e2e8f0] dark:border-[#222222]'
                }`}
              >
                <Banknote className="w-3.5 h-3.5" />
                <span>نقدي (كاش)</span>
              </button>

              <button
                onClick={() => setPaymentMethod('credit')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'credit'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-[#f1f5f9] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] border border-[#e2e8f0] dark:border-[#222222]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>آجل (ذمة)</span>
              </button>

              <button
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-[#f1f5f9] dark:bg-[#1a1a1a] text-[#475569] dark:text-[#888888] border border-[#e2e8f0] dark:border-[#222222]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>تحويل بنكي</span>
              </button>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleCheckout(false)}
                disabled={posCart.length === 0}
                className="py-2.5 px-3 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>حفظ وإصدار الفاتورة</span>
              </button>

              <button
                onClick={() => handleCheckout(true)}
                disabled={posCart.length === 0}
                className="py-2.5 px-3 bg-[#0f172a] hover:bg-[#1e293b] dark:bg-[#ededed] dark:hover:bg-[#ffffff] dark:text-[#0f172a] disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>حفظ وطباعة فورية</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
