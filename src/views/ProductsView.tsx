import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductStatus } from '../types';
import {
  Boxes,
  Plus,
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Barcode,
  ArrowUpDown
} from 'lucide-react';

export const ProductsView: React.FC = () => {
  const { products, deleteProduct, navigateTo, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'stock' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Categories list
  const categories = ['all', 'ألبان ومشروبات', 'زيوت وسمن', 'بقوليات وأرز', 'مشروبات وعصائر', 'منظفات وعناية', 'بسكويت وحلويات'];

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.barcode.includes(searchQuery);
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesStat = selectedStatus === 'all' || p.status === selectedStatus;
      return matchesSearch && matchesCat && matchesStat;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortBy === 'stock') {
        return sortOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock;
      }
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.wholesalePrice - b.wholesalePrice : b.wholesalePrice - a.wholesalePrice;
      }
      return 0;
    });

  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] border border-emerald-200/60 dark:border-[#333333]">
            <CheckCircle2 className="w-3 h-3" />
            متوفر
          </span>
        );
      case 'low_stock':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-[#1a1a1a] text-[#d97706] dark:text-[#f59e0b] border border-amber-200/60 dark:border-[#333333]">
            <AlertTriangle className="w-3 h-3" />
            منخفض
          </span>
        );
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-[#1a1a1a] text-[#e11d48] dark:text-[#f43f5e] border border-rose-200/60 dark:border-[#333333]">
            <XCircle className="w-3 h-3" />
            نفد
          </span>
        );
    }
  };

  const handleExportExcel = () => {
    showToast('جاري تجهيز وتصدير جدول المنتجات بصيغة Excel...', 'info');
    setTimeout(() => {
      showToast('تم تصدير ملف Excel بنجاح', 'success');
    }, 1200);
  };

  const handleImportExcel = () => {
    showToast('اختر ملف Excel لاستيراد وتحديث قائمة الأصناف والباركود', 'info');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200 text-right">
      {/* Header (Section 18) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">المنتجات والأصناف</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-0.5">
            إدارة المنتجات والأسعار والمخزون ووحدات القياس والجملة.
          </p>
        </div>

        {/* Top Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigateTo('add_product')}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ إضافة منتج جديد</span>
          </button>

          <button
            onClick={handleImportExcel}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#f8f9fa] hover:bg-[#f1f5f9] dark:bg-[#1a1a1a] dark:hover:bg-[#222222] text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-[#e2e8f0] dark:border-[#333333]"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#059669] dark:text-[#10b981]" />
            <span>استيراد Excel</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#f8f9fa] hover:bg-[#f1f5f9] dark:bg-[#1a1a1a] dark:hover:bg-[#222222] text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-[#e2e8f0] dark:border-[#333333]"
          >
            <Download className="w-4 h-4 text-[#94a3b8] dark:text-[#666666]" />
            <span>تصدير</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#94a3b8] dark:text-[#666666] absolute right-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، الكود، الباركود..."
              className="w-full pr-9 pl-4 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full md:w-52">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="all">جميع التصنيفات</option>
              <option value="ألبان ومشروبات">ألبان ومشروبات</option>
              <option value="زيوت وسمن">زيوت وسمن</option>
              <option value="بقوليات وأرز">بقوليات وأرز</option>
              <option value="مشروبات وعصائر">مشروبات وعصائر</option>
              <option value="منظفات وعناية">منظفات وعناية</option>
              <option value="بسكويت وحلويات">بسكويت وحلويات</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="w-full md:w-44">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
            >
              <option value="all">جميع حالات المخزون</option>
              <option value="in_stock">متوفر</option>
              <option value="low_stock">منخفض المخزون</option>
              <option value="out_of_stock">نفد من المخزن</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Table (Section 19) */}
      <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border-b border-[#e2e8f0] dark:border-[#222222] text-[#475569] dark:text-[#888888] font-bold sticky top-0">
                <th className="py-3.5 px-3">المنتج والصورة</th>
                <th className="py-3.5 px-3">الكود</th>
                <th className="py-3.5 px-3">Barcode</th>
                <th className="py-3.5 px-3">التصنيف</th>
                <th className="py-3.5 px-3 text-center">الوحدة الأساسية</th>
                <th className="py-3.5 px-3 text-left">سعر الشراء</th>
                <th className="py-3.5 px-3 text-left">سعر الجملة</th>
                <th className="py-3.5 px-3 text-center">المخزون الحالي</th>
                <th className="py-3.5 px-3 text-center">الحالة</th>
                <th className="py-3.5 px-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#222222]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-[#94a3b8] dark:text-[#666666]">
                    <Boxes className="w-10 h-10 mx-auto text-[#cbd5e1] dark:text-[#333333] mb-2" />
                    <p className="text-sm font-medium">لا توجد منتجات مطابقة لخيارات البحث</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a]/60 transition-colors group"
                  >
                    {/* Product image & name */}
                    <td className="py-3 px-3">
                      <div
                        onClick={() => navigateTo('product_details', { productId: p.id })}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] shrink-0"
                        />
                        <div className="max-w-[220px]">
                          <p className="font-bold text-[#0f172a] dark:text-[#ededed] group-hover:text-[#059669] dark:group-hover:text-[#10b981] transition-colors">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-[#94a3b8] dark:text-[#666666] font-medium">{p.brand}</p>
                        </div>
                      </div>
                    </td>

                    {/* Code */}
                    <td className="py-3 px-3 font-mono font-semibold text-[#475569] dark:text-[#888888]">
                      {p.code}
                    </td>

                    {/* Barcode */}
                    <td className="py-3 px-3 font-mono text-[#94a3b8] dark:text-[#666666] text-[11px]">
                      <span className="inline-flex items-center gap-1 bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] px-2 py-0.5 rounded">
                        <Barcode className="w-3 h-3 text-[#94a3b8] dark:text-[#666666]" />
                        {p.barcode}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 text-[#475569] dark:text-[#888888] font-medium">
                      {p.category}
                    </td>

                    {/* Unit */}
                    <td className="py-3 px-3 text-center text-[#475569] dark:text-[#888888] font-semibold">
                      {p.unit}
                    </td>

                    {/* Cost price */}
                    <td className="py-3 px-3 text-left font-mono text-[#94a3b8] dark:text-[#666666]">
                      {p.costPrice.toLocaleString()} ج.م
                    </td>

                    {/* Wholesale price */}
                    <td className="py-3 px-3 text-left font-mono font-bold text-[#0f172a] dark:text-[#ededed]">
                      {p.wholesalePrice.toLocaleString()} ج.م
                    </td>

                    {/* Stock quantity */}
                    <td className="py-3 px-3 text-center font-mono font-bold text-[#0f172a] dark:text-[#ededed]">
                      <span className={p.stock <= p.minStock ? 'text-[#f43f5e]' : ''}>
                        {p.stock}
                      </span>
                      <span className="text-[10px] text-[#94a3b8] dark:text-[#666666] mr-1">{p.unit}</span>
                    </td>

                    {/* Status badge */}
                    <td className="py-3 px-3 text-center">
                      {getStatusBadge(p.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => navigateTo('product_details', { productId: p.id })}
                          title="عرض تفاصيل وحركة الصنف"
                          className="p-1.5 rounded-lg text-[#94a3b8] dark:text-[#666666] hover:text-[#059669] dark:hover:text-[#10b981] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigateTo('pos')}
                          title="إضافة لفاتورة بيع"
                          className="p-1.5 rounded-lg text-[#94a3b8] dark:text-[#666666] hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] hover:bg-[#f1f5f9] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          title="حذف الصنف"
                          className="p-1.5 rounded-lg text-[#94a3b8] dark:text-[#666666] hover:text-[#f43f5e] hover:bg-rose-50 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination / Summary Footer */}
        <div className="p-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] border-t border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between text-xs text-[#94a3b8] dark:text-[#666666]">
          <span>إجمالي الأصناف المعروضة: {filteredProducts.length} من {products.length}</span>
          <span className="font-mono">Wholesale Inventory Control</span>
        </div>
      </div>
    </div>
  );
};
