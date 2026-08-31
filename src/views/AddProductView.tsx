import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductUnit } from '../types';
import {
  Boxes,
  ArrowRight,
  Save,
  Plus,
  Trash2,
  Barcode,
  Layers,
  DollarSign,
  Package,
  Warehouse,
  CheckCircle2
} from 'lucide-react';

export const AddProductView: React.FC = () => {
  const { addProduct, navigateTo, showToast } = useApp();

  // Basic Info
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [code, setCode] = useState(`PRD-${Math.floor(1000 + Math.random() * 9000)}`);
  const [barcode, setBarcode] = useState(`622${Math.floor(1000000000 + Math.random() * 9000000000)}`);
  const [category, setCategory] = useState('ألبان ومشروبات');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [warehouse, setWarehouse] = useState('المخزن الرئيسي (المنطقة الصناعية)');
  const [initialStock, setInitialStock] = useState(50);
  const [minStock, setMinStock] = useState(20);

  // Units & Pricing
  const [baseUnit, setBaseUnit] = useState('كرتونة');
  const [costPrice, setCostPrice] = useState(300);
  const [wholesalePrice, setWholesalePrice] = useState(340);
  const [halfWholesalePrice, setHalfWholesalePrice] = useState(355);
  const [retailPrice, setRetailPrice] = useState(380);

  // Sub units
  const [subUnitName, setSubUnitName] = useState('حبة');
  const [conversionRate, setConversionRate] = useState(12);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('يرجى كتابة اسم المنتج باللغة العربية', 'error');
      return;
    }

    const units: ProductUnit[] = [
      {
        name: baseUnit,
        conversionRate: 1,
        barcode: barcode,
        costPrice: Number(costPrice),
        wholesalePrice: Number(wholesalePrice),
        halfWholesalePrice: Number(halfWholesalePrice),
        retailPrice: Number(retailPrice)
      }
    ];

    if (subUnitName && conversionRate > 1) {
      units.push({
        name: subUnitName,
        conversionRate: Number(conversionRate),
        barcode: `${barcode}1`,
        costPrice: Number((costPrice / conversionRate).toFixed(2)),
        wholesalePrice: Number((wholesalePrice / conversionRate).toFixed(2)),
        halfWholesalePrice: Number((halfWholesalePrice / conversionRate).toFixed(2)),
        retailPrice: Number((retailPrice / conversionRate).toFixed(2))
      });
    }

    addProduct({
      code,
      name,
      nameEn,
      category,
      brand: brand || 'عام',
      barcode,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80',
      description: description || 'منتج غذائي عالي الجودة لتجارة الجملة والتوزيع.',
      unit: baseUnit,
      units,
      costPrice: Number(costPrice),
      wholesalePrice: Number(wholesalePrice),
      halfWholesalePrice: Number(halfWholesalePrice),
      retailPrice: Number(retailPrice),
      stock: Number(initialStock),
      minStock: Number(minStock),
      warehouse,
      status: Number(initialStock) === 0 ? 'out_of_stock' : Number(initialStock) <= minStock ? 'low_stock' : 'in_stock',
      batches: [
        {
          batchNumber: `BAT-2026-${Math.floor(100 + Math.random() * 900)}`,
          expiryDate: '2027-12-31',
          quantity: Number(initialStock),
          warehouse,
          status: 'safe',
          daysRemaining: 480
        }
      ],
      monthlySales: 0,
      revenue: 0,
      profit: 0
    });

    navigateTo('products');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right max-w-4xl mx-auto">
      {/* Header with back */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigateTo('products')}
            className="flex items-center gap-1 text-xs font-bold text-[#475569] dark:text-[#888888] hover:text-[#0f172a] dark:hover:text-[#ededed] transition-colors mb-2 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لقائمة المنتجات</span>
          </button>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">إضافة منتج وصنف جديد</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888]">سجل بيانات الصنف، وحدات القياس، وسياسة أسعار الجملة</p>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>حفظ المنتج في المخزون</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Basic Information (Section 21) */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
            <Package className="w-5 h-5 text-[#059669] dark:text-[#10b981]" />
            <h2 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">1. المعلومات الأساسية والباركود</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Arabic Name */}
            <div className="md:col-span-2">
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">
                اسم المنتج (عربي) <span className="text-[#f43f5e]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: شاي العروسة ناعم 250 جم (كرتونة 40 باكو)"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
              />
            </div>

            {/* English Name */}
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">اسم المنتج (إنجليزي - اختياري)</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="El Arosa Tea 250g"
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">العلامة التجارية / البراند</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="جهينة، هلا، الضحى، العروسة..."
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
              />
            </div>

            {/* SKU / Code */}
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">كود الصنف (SKU)</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-mono focus:outline-none focus:border-[#059669]"
              />
            </div>

            {/* Barcode */}
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الباركود الدولي (Barcode EAN)</label>
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-mono focus:outline-none focus:border-[#059669]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">التصنيف الرئيسي</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              >
                <option value="ألبان ومشروبات">ألبان ومشروبات</option>
                <option value="زيوت وسمن">زيوت وسمن</option>
                <option value="بقوليات وأرز">بقوليات وأرز</option>
                <option value="مشروبات وعصائر">مشروبات وعصائر</option>
                <option value="منظفات وعناية">منظفات وعناية</option>
                <option value="بسكويت وحلويات">بسكويت وحلويات</option>
              </select>
            </div>

            {/* Default Warehouse */}
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">المستودع الرئيسي الافتراضي</label>
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              >
                <option value="المخزن الرئيسي (المنطقة الصناعية)">المخزن الرئيسي (المنطقة الصناعية)</option>
                <option value="مخزن التبريد المركزي">مخزن التبريد المركزي</option>
                <option value="مخزن المنظفات والكيماويات">مخزن المنظفات والكيماويات</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الوصف والملاحظات</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="أضف أي تفاصيل خاصة بالتخزين، شروط الصلاحية أو درجات الحرارة..."
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Units & Conversion (Section 21) */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
            <Layers className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">2. الوحدات ومعاملات التحويل (Packaging Units)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الوحدة الأساسية الكبرى (للتخزين والجملة)</label>
              <select
                value={baseUnit}
                onChange={(e) => setBaseUnit(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] focus:outline-none focus:border-[#059669]"
              >
                <option value="كرتونة">كرتونة (Carton / Case)</option>
                <option value="بالة">بالة / شيكارة (Bundle / Sack)</option>
                <option value="علبة">علبة (Box)</option>
                <option value="عبوة">عبوة (Pack)</option>
                <option value="قطعة">قطعة (Piece)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الوحدة الصغرى التابعة</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={subUnitName}
                  onChange={(e) => setSubUnitName(e.target.value)}
                  placeholder="حبة / كيس / باكو"
                  className="flex-1 p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] placeholder-[#94a3b8] dark:placeholder-[#666666] focus:outline-none focus:border-[#059669]"
                />
                <div className="flex items-center gap-1 font-bold text-[#475569] dark:text-[#888888]">
                  <span>×</span>
                  <input
                    type="number"
                    min="1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="w-16 p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] text-center font-mono focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>
              <p className="text-[11px] text-[#059669] dark:text-[#10b981] mt-1 font-semibold">
                المعادلة: 1 {baseUnit} = {conversionRate} {subUnitName}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Pricing Tiers (Section 21) */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
            <DollarSign className="w-5 h-5 text-[#d97706] dark:text-[#f59e0b]" />
            <h2 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">3. هيكل الأسعار للوحدة الأساسية ({baseUnit})</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">تكلفة الشراء (Cost)</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-mono focus:outline-none focus:border-[#059669]"
                />
                <span className="absolute left-3 top-2.5 text-[#94a3b8] dark:text-[#666666] text-[11px]">ج.م</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">سعر الجملة (Wholesale)</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  value={wholesalePrice}
                  onChange={(e) => setWholesalePrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-emerald-200/60 dark:border-[#333333] bg-emerald-50 dark:bg-[#1a1a1a] text-[#059669] dark:text-[#10b981] font-bold font-mono focus:outline-none"
                />
                <span className="absolute left-3 top-2.5 text-[#059669] dark:text-[#10b981] text-[11px]">ج.م</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">سعر نصف الجملة</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={halfWholesalePrice}
                  onChange={(e) => setHalfWholesalePrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-mono focus:outline-none focus:border-[#059669]"
                />
                <span className="absolute left-3 top-2.5 text-[#94a3b8] dark:text-[#666666] text-[11px]">ج.م</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">سعر البيع المقترح للمستهلك</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={retailPrice}
                  onChange={(e) => setRetailPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-mono focus:outline-none focus:border-[#059669]"
                />
                <span className="absolute left-3 top-2.5 text-[#94a3b8] dark:text-[#666666] text-[11px]">ج.م</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Initial Stock */}
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#e2e8f0] dark:border-[#222222]">
            <Warehouse className="w-5 h-5 text-[#8b5cf6]" />
            <h2 className="text-sm font-bold text-[#0f172a] dark:text-[#ededed]">4. الرصيد الافتتاحي وحدود التنبيه</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">الرصيد الافتتاحي الأولي بالمخزن</label>
              <input
                type="number"
                min="0"
                value={initialStock}
                onChange={(e) => setInitialStock(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-mono focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0f172a] dark:text-[#ededed] mb-1">حد إعادة الطلب (الحد الأدنى للتنبيه)</label>
              <input
                type="number"
                min="0"
                value={minStock}
                onChange={(e) => setMinStock(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] bg-[#f8f9fa] dark:bg-[#1a1a1a] text-[#0f172a] dark:text-[#ededed] font-mono focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>
        </div>

        {/* Submit button bottom */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigateTo('products')}
            className="px-5 py-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#333333] text-[#475569] dark:text-[#888888] font-bold text-xs hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>حفظ المنتج في الدليل</span>
          </button>
        </div>
      </form>
    </div>
  );
};
