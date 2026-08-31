import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ScreenId,
  Product,
  Customer,
  Supplier,
  SalesRep,
  Invoice,
  PurchaseOrder,
  DeliveryOrder,
  Expense,
  NotificationItem,
  User,
  ToastMessage,
  CartItem
} from '../types';
import {
  initialProducts,
  initialCustomers,
  initialSuppliers,
  initialSalesReps,
  initialInvoices,
  initialPurchaseOrders,
  initialDeliveryOrders,
  initialExpenses,
  initialNotifications,
  initialUsers
} from '../data/mockData';

interface NavigationParams {
  productId?: string;
  customerId?: string;
  supplierId?: string;
  invoice?: Invoice;
  filterType?: string;
}

interface AppContextType {
  // Navigation
  currentScreen: ScreenId;
  navigateTo: (screen: ScreenId, params?: NavigationParams) => void;
  selectedProductId: string | null;
  selectedCustomerId: string | null;
  selectedSupplierId: string | null;
  selectedInvoice: Invoice | null;
  activeFilterType: string | null;

  // UI State
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  isGlobalSearchOpen: boolean;
  setGlobalSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  isFilterDrawerOpen: boolean;
  setFilterDrawerOpen: (open: boolean) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;

  // Data Stores
  products: Product[];
  customers: Customer[];
  suppliers: Supplier[];
  salesReps: SalesRep[];
  invoices: Invoice[];
  purchaseOrders: PurchaseOrder[];
  deliveryOrders: DeliveryOrder[];
  expenses: Expense[];
  notifications: NotificationItem[];
  users: User[];
  toasts: ToastMessage[];

  // Mutations - Products
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Mutations - Customers
  addCustomer: (customer: Customer | Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Mutations - Suppliers
  addSupplier: (supplier: Supplier | Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;

  // Mutations - Sales Reps
  addSalesRep: (rep: SalesRep | Omit<SalesRep, 'id'>) => void;
  updateSalesRep: (id: string, rep: Partial<SalesRep>) => void;
  deleteSalesRep: (id: string) => void;

  // Mutations - Purchases & Invoices
  addPurchaseOrder: (po: PurchaseOrder | Omit<PurchaseOrder, 'id' | 'poNumber'>) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'date' | 'time'>) => Invoice;
  deleteInvoice: (id: string) => void;

  // Mutations - Expenses & Deliveries
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateDeliveryStatus: (orderId: string, status: DeliveryOrder['status']) => void;
  deleteDeliveryOrder: (orderId: string) => void;

  // Notifications & Toasts
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Database Management
  clearAllData: () => void;
  loadDemoData: () => void;

  // POS State & Actions
  posCart: CartItem[];
  posCustomer: Customer | null;
  setPosCustomer: (cust: Customer | null) => void;
  selectedPosCustomer: Customer | null;
  setSelectedPosCustomer: (cust: Customer | null) => void;
  posPricingTier: 'wholesale' | 'half_wholesale' | 'retail';
  setPosPricingTier: (tier: 'wholesale' | 'half_wholesale' | 'retail') => void;
  posDiscount: number;
  setPosDiscount: (disc: number) => void;
  posPaidAmount: number;
  setPosPaidAmount: (paid: number) => void;
  addToPosCart: (product: Product, unitName?: string, quantity?: number) => void;
  updatePosCartQuantity: (productId: string, quantity: number) => void;
  updatePosCartUnit: (productId: string, unitName: string) => void;
  updateCartItemQty: (productId: string, quantity: number) => void;
  removeFromPosCart: (productId: string) => void;
  removeCartItem: (productId: string) => void;
  clearPosCart: () => void;
  createInvoiceFromPos: (paymentMethod: 'cash' | 'credit' | 'bank_transfer', repId?: string, warehouse?: string) => Invoice;

  // POS Legacy Computations
  cartSubtotal: number;
  cartDiscount: number;
  setCartDiscount: (disc: number) => void;
  cartTax: number;
  cartGrandTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to safely read from localStorage
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
    return fallback;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [activeFilterType, setActiveFilterType] = useState<string | null>(null);

  // UI States
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fedora_theme');
      if (saved) return saved === 'dark';
    }
    return false;
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [isGlobalSearchOpen, setGlobalSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Real Database Stores (Initialized clean as empty arrays unless user has already stored real data)
  const [products, setProducts] = useState<Product[]>(() => getStored('fedora_products', []));
  const [customers, setCustomers] = useState<Customer[]>(() => getStored('fedora_customers', []));
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => getStored('fedora_suppliers', []));
  const [salesReps, setSalesReps] = useState<SalesRep[]>(() => getStored('fedora_sales_reps', []));
  const [invoices, setInvoices] = useState<Invoice[]>(() => getStored('fedora_invoices', []));
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => getStored('fedora_purchase_orders', []));
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>(() => getStored('fedora_delivery_orders', []));
  const [expenses, setExpenses] = useState<Expense[]>(() => getStored('fedora_expenses', []));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getStored('fedora_notifications', []));
  const [users, setUsers] = useState<User[]>(() => getStored('fedora_users', initialUsers));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // POS State
  const [posCart, setPosCart] = useState<CartItem[]>([]);
  const [posCustomer, setPosCustomer] = useState<Customer | null>(null);
  const [posPricingTier, setPosPricingTier] = useState<'wholesale' | 'half_wholesale' | 'retail'>('wholesale');
  const [posDiscount, setPosDiscount] = useState<number>(0);
  const [posPaidAmount, setPosPaidAmount] = useState<number>(0);

  // Sync to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem('fedora_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('fedora_customers', JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('fedora_suppliers', JSON.stringify(suppliers));
    } catch (e) {
      console.error(e);
    }
  }, [suppliers]);

  useEffect(() => {
    try {
      localStorage.setItem('fedora_sales_reps', JSON.stringify(salesReps));
    } catch (e) {
      console.error(e);
    }
  }, [salesReps]);

  useEffect(() => {
    try {
      localStorage.setItem('fedora_invoices', JSON.stringify(invoices));
    } catch (e) {
      console.error(e);
    }
  }, [invoices]);

  useEffect(() => {
    try {
      localStorage.setItem('fedora_purchase_orders', JSON.stringify(purchaseOrders));
    } catch (e) {
      console.error(e);
    }
  }, [purchaseOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('fedora_delivery_orders', JSON.stringify(deliveryOrders));
    } catch (e) {
      console.error(e);
    }
  }, [deliveryOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('fedora_expenses', JSON.stringify(expenses));
    } catch (e) {
      console.error(e);
    }
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem('fedora_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  // Keyboard shortcut: Ctrl + K or Cmd + K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync Dark mode to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fedora_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fedora_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (screen: ScreenId, params?: NavigationParams) => {
    setCurrentScreen(screen);
    if (params?.productId !== undefined) setSelectedProductId(params.productId || null);
    if (params?.customerId !== undefined) setSelectedCustomerId(params.customerId || null);
    if (params?.supplierId !== undefined) setSelectedSupplierId(params.supplierId || null);
    if (params?.invoice !== undefined) setSelectedInvoice(params.invoice || null);
    if (params?.filterType !== undefined) setActiveFilterType(params.filterType || null);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Product Mutations ---
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = { ...newProdData, id };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('تمت إضافة المنتج الجديد بنجاح إلى المخزون', 'success');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('تم تحديث بيانات المنتج بنجاح', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('تم حذف المنتج من النظام', 'warning');
  };

  // --- Customer Mutations ---
  const addCustomer = (customerData: Customer | Omit<Customer, 'id'>) => {
    const id = 'id' in customerData && customerData.id ? customerData.id : `cust-${Date.now()}`;
    const newCust: Customer = {
      ...customerData,
      id,
      balance: customerData.balance ?? 0,
      currentBalance: customerData.balance ?? 0,
      totalPurchases: customerData.totalPurchases ?? 0,
      totalPaid: customerData.totalPaid ?? 0,
      lastPurchaseDate: customerData.lastPurchaseDate || 'اليوم',
      status: customerData.status || 'active'
    };
    setCustomers((prev) => [newCust, ...prev]);
    showToast(`تم تسجيل العميل (${newCust.name || newCust.shopName}) بنجاح`, 'success');
  };

  const updateCustomer = (id: string, updated: Partial<Customer>) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    showToast('تم تحديث بيانات العميل بنجاح', 'success');
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    showToast('تم حذف العميل من قاعدة البيانات', 'warning');
  };

  // --- Supplier Mutations ---
  const addSupplier = (supplierData: Supplier | Omit<Supplier, 'id'>) => {
    const id = 'id' in supplierData && supplierData.id ? supplierData.id : `supp-${Date.now()}`;
    const newSupp: Supplier = {
      ...supplierData,
      id,
      balance: supplierData.balance ?? 0,
      totalPurchases: supplierData.totalPurchases ?? 0,
      totalPaid: supplierData.totalPaid ?? 0,
      status: supplierData.status || 'active'
    };
    setSuppliers((prev) => [newSupp, ...prev]);
    showToast(`تم تسجيل المورد (${newSupp.name}) بنجاح`, 'success');
  };

  const updateSupplier = (id: string, updated: Partial<Supplier>) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
    showToast('تم تحديث بيانات المورد بنجاح', 'success');
  };

  const deleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    showToast('تم حذف المورد بنجاح', 'warning');
  };

  // --- Sales Rep Mutations ---
  const addSalesRep = (repData: SalesRep | Omit<SalesRep, 'id'>) => {
    const id = 'id' in repData && repData.id ? repData.id : `rep-${Date.now()}`;
    const newRep: SalesRep = {
      ...repData,
      id,
      monthlySales: repData.monthlySales ?? 0,
      commission: repData.commission ?? 0,
      vanInventory: repData.vanInventory || []
    };
    setSalesReps((prev) => [newRep, ...prev]);
    showToast(`تم تسجيل المندوب (${newRep.name}) بنجاح`, 'success');
  };

  const updateSalesRep = (id: string, updated: Partial<SalesRep>) => {
    setSalesReps((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
    showToast('تم تحديث بيانات المندوب بنجاح', 'success');
  };

  const deleteSalesRep = (id: string) => {
    setSalesReps((prev) => prev.filter((r) => r.id !== id));
    showToast('تم حذف المندوب من النظام', 'warning');
  };

  // --- Purchase Order Mutations ---
  const addPurchaseOrder = (poData: PurchaseOrder | Omit<PurchaseOrder, 'id' | 'poNumber'>) => {
    const id = `po-${Date.now()}`;
    const poNumber = 'poNumber' in poData && poData.poNumber ? poData.poNumber : `PO-2026-${5000 + purchaseOrders.length + 1}`;
    const newPO: PurchaseOrder = {
      ...poData,
      id,
      poNumber
    };
    setPurchaseOrders((prev) => [newPO, ...prev]);

    // If order is received, add stock and update supplier balance
    if (newPO.status === 'received') {
      newPO.items.forEach((item) => {
        setProducts((prevProds) =>
          prevProds.map((prod) => {
            if (prod.id === item.productId) {
              const newStock = prod.stock + item.quantity;
              return {
                ...prod,
                stock: newStock,
                costPrice: item.unitCost || prod.costPrice,
                status: newStock <= prod.minStock ? 'low_stock' : 'in_stock'
              };
            }
            return prod;
          })
        );
      });

      // Update supplier balance if there is remaining unpaid amount
      if (newPO.remainingAmount > 0) {
        setSuppliers((prevSupps) =>
          prevSupps.map((s) =>
            s.id === newPO.supplierId
              ? {
                  ...s,
                  balance: (s.balance || 0) + newPO.remainingAmount,
                  totalPurchases: (s.totalPurchases || 0) + newPO.grandTotal,
                  totalPaid: (s.totalPaid || 0) + newPO.paidAmount
                }
              : s
          )
        );
      }
    }

    showToast(`تم إصدار أمر الشراء ${poNumber} بنجاح`, 'success');
  };

  // --- Sales Invoices & Deductions ---
  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber' | 'date' | 'time'>): Invoice => {
    const invNum = `INV-2026-${1000 + invoices.length + 1}`;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
      invoiceNumber: invNum,
      date: dateStr,
      time: timeStr
    };

    setInvoices((prev) => [newInvoice, ...prev]);

    // Create automatic delivery order
    const newDelOrder: DeliveryOrder = {
      id: `del-${Date.now()}`,
      orderNumber: `ORD-${8800 + deliveryOrders.length + 1}`,
      customerName: invoiceData.customerName,
      shopName: invoiceData.customerName,
      phone: invoiceData.customerPhone || '01000000000',
      address: 'العنوان المسجل للعميل',
      area: 'منطقة التوزيع',
      amount: invoiceData.grandTotal,
      itemsCount: invoiceData.items.reduce((acc, i) => acc + i.quantity, 0),
      salesRep: invoiceData.representativeName || 'المبيعات المباشرة',
      driverName: 'سيارة التوزيع',
      time: timeStr,
      estimatedDelivery: 'خلال اليوم',
      status: 'new',
      paymentStatus: invoiceData.paidAmount >= invoiceData.grandTotal ? 'paid' : 'credit'
    };
    setDeliveryOrders((prev) => [newDelOrder, ...prev]);

    // Deduct stock for products
    setProducts((prev) =>
      prev.map((prod) => {
        const itemInInv = invoiceData.items.find((i) => i.productId === prod.id);
        if (itemInInv) {
          const newStock = Math.max(0, prod.stock - itemInInv.quantity);
          return {
            ...prod,
            stock: newStock,
            monthlySales: (prod.monthlySales || 0) + itemInInv.quantity,
            revenue: (prod.revenue || 0) + itemInInv.total,
            profit: (prod.profit || 0) + (itemInInv.total - itemInInv.quantity * prod.costPrice),
            status: newStock === 0 ? 'out_of_stock' : newStock <= prod.minStock ? 'low_stock' : 'in_stock'
          };
        }
        return prod;
      })
    );

    // Update customer balance if credit
    if (invoiceData.remainingAmount > 0) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === invoiceData.customerId
            ? {
                ...c,
                balance: (c.balance || c.currentBalance || 0) + invoiceData.remainingAmount,
                currentBalance: (c.currentBalance || c.balance || 0) + invoiceData.remainingAmount,
                totalPurchases: (c.totalPurchases || 0) + invoiceData.grandTotal,
                totalPaid: (c.totalPaid || 0) + invoiceData.paidAmount,
                lastPurchaseDate: dateStr
              }
            : c
        )
      );
    }

    showToast(`✓ تم حفظ فاتورة البيع ${invNum} بنجاح`, 'success');
    return newInvoice;
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    showToast('تم إلغاء / حذف الفاتورة من السجل', 'warning');
  };

  // --- Expenses & Treasury ---
  const addExpense = (expData: Omit<Expense, 'id'>) => {
    const newExp: Expense = { ...expData, id: `exp-${Date.now()}` };
    setExpenses((prev) => [newExp, ...prev]);
    showToast('تم قيد سند الصرف في الخزينة بنجاح', 'success');
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showToast('تم حذف قيد المصروف', 'warning');
  };

  // --- Delivery Orders ---
  const updateDeliveryStatus = (orderId: string, status: DeliveryOrder['status']) => {
    setDeliveryOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast('تم تحديث حالة أمر التوصيل', 'info');
  };

  const deleteDeliveryOrder = (orderId: string) => {
    setDeliveryOrders((prev) => prev.filter((d) => d.id !== orderId));
    showToast('تم حذف أمر التوصيل', 'warning');
  };

  // --- Notifications ---
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('تم تحديد جميع الإشعارات كمقروءة', 'info');
  };

  // --- Clear & Demo Data Utilities ---
  const clearAllData = () => {
    setProducts([]);
    setCustomers([]);
    setSuppliers([]);
    setSalesReps([]);
    setInvoices([]);
    setPurchaseOrders([]);
    setDeliveryOrders([]);
    setExpenses([]);
    setNotifications([]);
    setPosCart([]);
    setPosCustomer(null);
    setSelectedProductId(null);
    setSelectedCustomerId(null);
    setSelectedSupplierId(null);
    setSelectedInvoice(null);

    // Clear local storage keys
    localStorage.removeItem('fedora_products');
    localStorage.removeItem('fedora_customers');
    localStorage.removeItem('fedora_suppliers');
    localStorage.removeItem('fedora_sales_reps');
    localStorage.removeItem('fedora_invoices');
    localStorage.removeItem('fedora_purchase_orders');
    localStorage.removeItem('fedora_delivery_orders');
    localStorage.removeItem('fedora_expenses');
    localStorage.removeItem('fedora_notifications');

    showToast('تم تفريغ كافة البيانات والبدء بقاعدة بيانات نظيفة فارغة بنجاح', 'success');
  };

  const loadDemoData = () => {
    setProducts(initialProducts);
    setCustomers(initialCustomers);
    setSuppliers(initialSuppliers);
    setSalesReps(initialSalesReps);
    setInvoices(initialInvoices);
    setPurchaseOrders(initialPurchaseOrders);
    setDeliveryOrders(initialDeliveryOrders);
    setExpenses(initialExpenses);
    setNotifications(initialNotifications);
    setPosCustomer(initialCustomers[0] || null);

    showToast('تم تحميل البيانات التوضيحية التجريبية (Demo Data) بنجاح', 'success');
  };

  // --- POS Operations ---
  const addToPosCart = (product: Product, unitName?: string, quantity: number = 1) => {
    const selectedUnitName = unitName || product.unit || (product.units?.[0]?.name) || 'كرتونة';
    const unitObj = product.units?.find((u) => u.name === selectedUnitName) || product.units?.[0];
    
    let price = product.wholesalePrice;
    if (posPricingTier === 'half_wholesale') {
      price = unitObj ? unitObj.halfWholesalePrice : product.halfWholesalePrice;
    } else if (posPricingTier === 'retail') {
      price = unitObj ? unitObj.retailPrice : product.retailPrice;
    } else {
      price = unitObj ? unitObj.wholesalePrice : product.wholesalePrice;
    }

    setPosCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedUnit === selectedUnitName
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedUnit === selectedUnitName
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: (item.quantity + quantity) * item.unitPrice * (1 - item.discountPercent / 100)
              }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          selectedUnit: selectedUnitName,
          quantity,
          unitPrice: price,
          discountPercent: 0,
          total: quantity * price
        }
      ];
    });
    showToast(`أضيف للفاتورة: ${product.name}`, 'info');
  };

  const updatePosCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromPosCart(productId);
      return;
    }
    setPosCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
              total: quantity * item.unitPrice * (1 - item.discountPercent / 100)
            }
          : item
      )
    );
  };

  const updatePosCartUnit = (productId: string, unitName: string) => {
    setPosCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const unitObj = item.product.units?.find((u) => u.name === unitName);
          let newPrice = item.unitPrice;
          if (unitObj) {
            if (posPricingTier === 'half_wholesale') newPrice = unitObj.halfWholesalePrice;
            else if (posPricingTier === 'retail') newPrice = unitObj.retailPrice;
            else newPrice = unitObj.wholesalePrice;
          }
          return {
            ...item,
            selectedUnit: unitName,
            unitPrice: newPrice,
            total: item.quantity * newPrice * (1 - item.discountPercent / 100)
          };
        }
        return item;
      })
    );
  };

  const updateCartItemQty = updatePosCartQuantity;

  const removeFromPosCart = (productId: string) => {
    setPosCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const removeCartItem = removeFromPosCart;

  const clearPosCart = () => {
    setPosCart([]);
    setPosDiscount(0);
    setPosPaidAmount(0);
  };

  const createInvoiceFromPos = (
    paymentMethod: 'cash' | 'credit' | 'bank_transfer',
    repId?: string,
    warehouse?: string
  ): Invoice => {
    const subtotal = posCart.reduce((sum, item) => sum + item.total, 0);
    const grandTotal = Math.max(0, subtotal - posDiscount);
    const rep = salesReps.find((r) => r.id === repId) || salesReps[0];
    const customer = posCustomer || customers[0] || {
      id: 'cust-walkin',
      name: 'عميل نقدي مباشر',
      shopName: 'عميل نقدي',
      phone: '01000000000',
      balance: 0,
      creditLimit: 0,
      address: 'المحل',
      type: 'نقدي'
    };

    const paid = paymentMethod === 'cash' ? grandTotal : (posPaidAmount || 0);
    const remaining = Math.max(0, grandTotal - paid);

    const invoiceData: Omit<Invoice, 'id' | 'invoiceNumber' | 'date' | 'time'> = {
      customerId: customer.id,
      customerName: customer.shopName || customer.name,
      customerPhone: customer.phone,
      representativeId: rep?.id || 'rep-direct',
      representativeName: rep?.name || 'المبيعات المباشرة',
      warehouse: warehouse || 'المخزن الرئيسي (المنطقة الصناعية)',
      items: posCart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        unit: item.selectedUnit,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: (item.quantity * item.unitPrice * item.discountPercent) / 100,
        total: item.total
      })),
      subtotal,
      discount: posDiscount,
      tax: 0,
      grandTotal,
      paidAmount: paid,
      remainingAmount: remaining,
      paymentMethod,
      status: 'completed',
      notes: 'فاتورة نقطة بيع جملة'
    };

    const created = addInvoice(invoiceData);
    clearPosCart();
    setSelectedInvoice(created);
    return created;
  };

  const cartSubtotal = posCart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const cartTax = 0;
  const cartGrandTotal = Math.max(0, cartSubtotal - posDiscount + cartTax);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedProductId,
        selectedCustomerId,
        selectedSupplierId,
        selectedInvoice,
        activeFilterType,
        isDarkMode,
        toggleDarkMode,
        isSidebarCollapsed,
        toggleSidebar,
        isMobileSidebarOpen,
        setMobileSidebarOpen,
        isGlobalSearchOpen,
        setGlobalSearchOpen,
        isNotificationsOpen,
        setNotificationsOpen,
        isFilterDrawerOpen,
        setFilterDrawerOpen,
        activeModal,
        setActiveModal,
        products,
        customers,
        suppliers,
        salesReps,
        invoices,
        purchaseOrders,
        deliveryOrders,
        expenses,
        notifications,
        users,
        toasts,
        showToast,
        removeToast,
        addProduct,
        updateProduct,
        deleteProduct,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        addSalesRep,
        updateSalesRep,
        deleteSalesRep,
        addPurchaseOrder,
        addInvoice,
        deleteInvoice,
        addExpense,
        deleteExpense,
        updateDeliveryStatus,
        deleteDeliveryOrder,
        markNotificationRead,
        markAllNotificationsRead,
        clearAllData,
        loadDemoData,
        posCart,
        posCustomer,
        setPosCustomer,
        selectedPosCustomer: posCustomer,
        setSelectedPosCustomer: setPosCustomer,
        posPricingTier,
        setPosPricingTier,
        posDiscount,
        setPosDiscount,
        posPaidAmount,
        setPosPaidAmount,
        addToPosCart,
        updatePosCartQuantity,
        updatePosCartUnit,
        updateCartItemQty,
        removeFromPosCart,
        removeCartItem,
        clearPosCart,
        createInvoiceFromPos,
        cartSubtotal,
        cartDiscount: posDiscount,
        setCartDiscount: setPosDiscount,
        cartTax,
        cartGrandTotal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
