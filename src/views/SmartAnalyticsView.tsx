import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Users,
  CheckCircle2,
  Brain,
  Zap,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const SmartAnalyticsView: React.FC = () => {
  const { products, customers, showToast } = useApp();

  const [simulating, setSimulating] = useState(false);

  const smartRecommendations = [
    {
      id: 'REC-1',
      title: 'إعادة طلب وشراء عاجل: زيت طعام عباد نقي',
      type: 'reorder',
      reason: 'معدل السحب اليومي 12 كرتونة. الرصيد الحالي ينفد بالكامل خلال 4.5 أيام.',
      suggestedQty: 100,
      estimatedCost: 82000,
      priority: 'high'
    },
    {
      id: 'REC-2',
      title: 'تنبيه احتمالية ركود: خل أبيض نقي 1 لتر',
      type: 'slow_moving',
      reason: 'انخفض معدل دوران الصنف بنسبة 40% مقارنة بالشهر السابق. يوصى بعمل عرض بوندل مع الزيت.',
      suggestedQty: 0,
      estimatedCost: 0,
      priority: 'medium'
    },
    {
      id: 'REC-3',
      title: 'إنذار انقطاع عميل محتمل: سوبر ماركت الفيروز',
      type: 'churn_risk',
      reason: 'توقف عن الطلب منذ 22 يوماً بينما كان يطلب أسبوعياً. رصيده الحالي 18,500 ج.م.',
      suggestedQty: 0,
      estimatedCost: 0,
      priority: 'high'
    }
  ];

  const handleRunAiAnalysis = () => {
    setSimulating(true);
    showToast('جاري تدريب نماذج التنبؤ وتحليل حركة المبيعات وتدفق المخزون...', 'info');
    setTimeout(() => {
      setSimulating(false);
      showToast('اكتمل التحليل الذكي بنجاح! تم تحديث التوصيات.', 'success');
    }, 1200);
  };

  const handleApplyReorder = (rec: any) => {
    showToast(`تم إنشاء مسودة أمر شراء تلقائي بقيمة ${rec.estimatedCost.toLocaleString()} ج.م للمورد المعتمد`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Header (Section 51) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-[#059669] dark:text-[#10b981]">
              <Brain className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-[#059669] dark:text-[#10b981]">Wholesale AI Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#ededed]">الذكاء التجاري والتنبؤ بالطلب</h1>
          <p className="text-xs text-[#475569] dark:text-[#888888]">
            تنبؤات السحب الموسمي، اقتراحات أوامر الشراء الآلية، واكتشاف مخاطر انقطاع العملاء.
          </p>
        </div>

        <button
          onClick={handleRunAiAnalysis}
          disabled={simulating}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
        >
          <Sparkles className={`w-4 h-4 ${simulating ? 'animate-spin' : ''}`} />
          <span>{simulating ? 'جاري التحليل...' : 'تحديث التحليل الذكي الآن'}</span>
        </button>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center gap-2 text-[#059669] dark:text-[#10b981] font-bold text-xs mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>توقع الطلب الأسبوع القادم</span>
          </div>
          <p className="text-xl font-extrabold text-[#0f172a] dark:text-[#ededed] mt-2">+18.5% زيادة متوقعة</p>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-1">بسبب بداية الشهر ودخول موسم الرواتب لسوبرماركت التجزئة.</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center gap-2 text-[#d97706] dark:text-[#f59e0b] font-bold text-xs mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>نقص بضاعة مرتقب قبل نفادها</span>
          </div>
          <p className="text-xl font-extrabold text-[#0f172a] dark:text-[#ededed] mt-2">3 أصناف حرجة</p>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-1">يلزم توريدها قبل يوم الخميس القادم لتفادي فوات المبيعات.</p>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center gap-2 text-[#f43f5e] font-bold text-xs mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>عملاء معرضون للتحول للمنافسين</span>
          </div>
          <p className="text-xl font-extrabold text-[#0f172a] dark:text-[#ededed] mt-2">2 عميل فئة (B)</p>
          <p className="text-xs text-[#475569] dark:text-[#888888] mt-1">تراجع تكرار طلباتهم. يوصى بزيارة المندوب المباشرة لهم.</p>
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-4">
        <h2 className="text-sm font-extrabold text-[#0f172a] dark:text-[#ededed]">توصيات الذكاء الاصطناعي التشغيلية</h2>

        {smartRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-white dark:bg-[#121212] border border-[#e2e8f0] dark:border-[#222222] rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                    rec.priority === 'high'
                      ? 'bg-rose-50 text-[#f43f5e] dark:bg-[#1a1a1a] dark:text-[#fb7185] border-rose-200/60 dark:border-[#333333]'
                      : 'bg-amber-50 text-[#d97706] dark:bg-[#1a1a1a] dark:text-[#f59e0b] border-amber-200/60 dark:border-[#333333]'
                  }`}
                >
                  {rec.priority === 'high' ? 'أولوية عاجلة' : 'أولوية متوسطة'}
                </span>
                <h3 className="font-bold text-sm text-[#0f172a] dark:text-[#ededed]">{rec.title}</h3>
              </div>

              <p className="text-xs text-[#475569] dark:text-[#888888] leading-relaxed">{rec.reason}</p>

              {rec.suggestedQty > 0 && (
                <div className="flex items-center gap-4 text-xs font-mono pt-1 text-[#475569] dark:text-[#888888]">
                  <span>الكمية المقترحة: <b className="text-[#0f172a] dark:text-[#ededed]">{rec.suggestedQty} كرتونة</b></span>
                  <span>التكلفة المتوقعة: <b className="text-[#059669] dark:text-[#10b981]">{rec.estimatedCost.toLocaleString()} ج.م</b></span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {rec.type === 'reorder' && (
                <button
                  onClick={() => handleApplyReorder(rec)}
                  className="px-4 py-2 bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                >
                  إصدار أمر الشراء المقترح (PO)
                </button>
              )}

              {rec.type === 'churn_risk' && (
                <button
                  onClick={() => showToast('تم إرسال تنبيه للمندوب المسؤول لجدولة زيارة فورية للعميل', 'success')}
                  className="px-4 py-2 bg-[#f8f9fa] hover:bg-[#f1f5f9] dark:bg-[#1a1a1a] border border-[#e2e8f0] dark:border-[#333333] text-[#0f172a] dark:text-[#ededed] font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  تكليف المندوب بزيارة العميل
                </button>
              )}

              {rec.type === 'slow_moving' && (
                <button
                  onClick={() => showToast('تم تجهيز كود الخصم الترويجي 10% على هذا الصنف', 'info')}
                  className="px-4 py-2 bg-amber-50 hover:bg-amber-100/80 dark:bg-[#1a1a1a] text-[#d97706] dark:text-[#f59e0b] font-bold rounded-xl text-xs border border-amber-200/60 dark:border-[#333333] cursor-pointer"
                >
                  تفعيل خصم التصفية
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
