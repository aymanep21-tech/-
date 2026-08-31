import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  X,
  Package,
  Users,
  Building2,
  Receipt,
  ArrowRight,
  TrendingUp,
  Boxes,
  Zap,
  Sparkles
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setGlobalSearchOpen,
    products,
    customers,
    suppliers,
    invoices,
    navigateTo
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isGlobalSearchOpen) {
      setQuery('');
    }
  }, [isGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(trimmed) ||
      p.code.toLowerCase().includes(trimmed) ||
      p.barcode.includes(trimmed) ||
      p.category.toLowerCase().includes(trimmed)
  ).slice(0, 4);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(trimmed) ||
      c.shopName.toLowerCase().includes(trimmed) ||
      c.phone.includes(trimmed)
  ).slice(0, 3);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(trimmed) ||
      inv.customerName.toLowerCase().includes(trimmed)
  ).slice(0, 3);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(trimmed) ||
      s.companyName.toLowerCase().includes(trimmed)
  ).slice(0, 2);

  const hasResults =
    filteredProducts.length > 0 ||
    filteredCustomers.length > 0 ||
    filteredInvoices.length > 0 ||
    filteredSuppliers.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#222222] overflow-hidden text-right">
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#e2e8f0] dark:border-[#222222]">
          <Search className="w-5 h-5 text-[#059669] dark:text-[#10b981] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن منتج، كود، باركود، عميل، فاتورة، مورد..."
            autoFocus
            className="w-full bg-transparent text-sm md:text-base text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#94a3b8] dark:text-[#666666] hover:text-[#0f172a] dark:hover:text-[#ededed] rounded-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setGlobalSearchOpen(false)}
            className="px-2 py-1 text-xs text-[#475569] dark:text-[#888888] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] rounded-lg border border-[#e2e8f0] dark:border-[#333333] cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick shortcuts if query is empty */}
          {!trimmed && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#94a3b8] dark:text-[#666666] uppercase tracking-wider">روابط سريعة مقترحة</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    navigateTo('pos');
                    setGlobalSearchOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] hover:bg-emerald-50 dark:hover:bg-[#1a1a1a] hover:border-[#059669] text-[#0f172a] dark:text-[#ededed] hover:text-[#059669] text-xs font-medium transition-colors text-right cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
                  <span>فاتورة POS</span>
                </button>

                <button
                  onClick={() => {
                    navigateTo('products');
                    setGlobalSearchOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] hover:bg-emerald-50 dark:hover:bg-[#1a1a1a] hover:border-[#059669] text-[#0f172a] dark:text-[#ededed] hover:text-[#059669] text-xs font-medium transition-colors text-right cursor-pointer"
                >
                  <Boxes className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
                  <span>قائمة الأصناف</span>
                </button>

                <button
                  onClick={() => {
                    navigateTo('customers');
                    setGlobalSearchOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] hover:bg-emerald-50 dark:hover:bg-[#1a1a1a] hover:border-[#059669] text-[#0f172a] dark:text-[#ededed] hover:text-[#059669] text-xs font-medium transition-colors text-right cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
                  <span>دليل العملاء</span>
                </button>

                <button
                  onClick={() => {
                    navigateTo('smart_analytics');
                    setGlobalSearchOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#222222] hover:bg-emerald-50 dark:hover:bg-[#1a1a1a] hover:border-[#059669] text-[#0f172a] dark:text-[#ededed] hover:text-[#059669] text-xs font-medium transition-colors text-right cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
                  <span>تحليلات الذكاء</span>
                </button>
              </div>
            </div>
          )}

          {trimmed && !hasResults && (
            <div className="py-10 text-center text-[#94a3b8] dark:text-[#666666]">
              <p className="text-sm font-medium">لم يتم العثور على أي نتائج مطابقة لـ "{query}"</p>
              <p className="text-xs mt-1">تأكد من كتابة الاسم أو الكود أو الباركود بشكل صحيح</p>
            </div>
          )}

          {/* Products */}
          {filteredProducts.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[#94a3b8] dark:text-[#666666] mb-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#059669] dark:text-[#10b981]" />
                <span>المنتجات والأصناف ({filteredProducts.length})</span>
              </p>
              <div className="space-y-1">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigateTo('product_details', { productId: p.id });
                      setGlobalSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a] transition-colors text-right group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-[#f1f5f9] dark:bg-[#1a1a1a]" />
                      <div>
                        <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed] group-hover:text-[#059669] dark:group-hover:text-[#10b981]">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-[#475569] dark:text-[#888888]">
                          {p.code} • الباركود: {p.barcode} • المخزون: {p.stock} {p.unit}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#059669] dark:text-[#10b981] font-mono">
                      {p.wholesalePrice.toLocaleString()} ج.م
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customers */}
          {filteredCustomers.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[#94a3b8] dark:text-[#666666] mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#059669] dark:text-[#10b981]" />
                <span>العملاء والمحلات ({filteredCustomers.length})</span>
              </p>
              <div className="space-y-1">
                {filteredCustomers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigateTo('customer_details', { customerId: c.id });
                      setGlobalSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a] transition-colors text-right group cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed] group-hover:text-[#059669] dark:group-hover:text-[#10b981]">
                        {c.shopName} ({c.name})
                      </p>
                      <p className="text-[11px] text-[#475569] dark:text-[#888888]">
                        {c.phone} • {c.address}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed] font-mono">
                        {c.balance.toLocaleString()} ج.م
                      </p>
                      <p className="text-[10px] text-[#94a3b8] dark:text-[#666666]">رصيد متبقي</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Invoices */}
          {filteredInvoices.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[#94a3b8] dark:text-[#666666] mb-2 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-[#059669] dark:text-[#10b981]" />
                <span>فواتير البيع ({filteredInvoices.length})</span>
              </p>
              <div className="space-y-1">
                {filteredInvoices.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => {
                      navigateTo('sales_invoices', { invoice: inv });
                      setGlobalSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a] transition-colors text-right group cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#0f172a] dark:text-[#ededed] group-hover:text-[#059669] font-mono">
                        {inv.invoiceNumber}
                      </p>
                      <p className="text-[11px] text-[#475569] dark:text-[#888888]">
                        {inv.customerName} • {inv.date}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#0f172a] dark:text-[#ededed] font-mono">
                      {inv.grandTotal.toLocaleString()} ج.م
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#f8f9fa] dark:bg-[#121212] border-t border-[#e2e8f0] dark:border-[#222222] text-[11px] text-[#94a3b8] dark:text-[#666666] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>استخدم <kbd className="px-1 bg-white dark:bg-[#1a1a1a] rounded border border-[#e2e8f0] dark:border-[#333333]">↑</kbd> <kbd className="px-1 bg-white dark:bg-[#1a1a1a] rounded border border-[#e2e8f0] dark:border-[#333333]">↓</kbd> للتنقل</span>
            <span><kbd className="px-1 bg-white dark:bg-[#1a1a1a] rounded border border-[#e2e8f0] dark:border-[#333333]">Enter</kbd> للاختيار</span>
          </div>
          <span className="text-[#059669] dark:text-[#10b981] font-medium">WholesalePro Search Engine</span>
        </div>
      </div>
    </div>
  );
};
