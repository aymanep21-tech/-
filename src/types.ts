export type ScreenId = 
  | 'dashboard'
  | 'pos'
  | 'sales_invoices'
  | 'sales_orders'
  | 'sales_returns'
  | 'products'
  | 'product_details'
  | 'add_product'
  | 'inventory'
  | 'warehouses'
  | 'expiry'
  | 'customers'
  | 'customer_details'
  | 'customer_statement'
  | 'purchases'
  | 'suppliers'
  | 'supplier_details'
  | 'representatives'
  | 'delivery'
  | 'finance'
  | 'expenses'
  | 'reports'
  | 'smart_analytics'
  | 'users_roles'
  | 'settings'
  | 'login';

export type ProductStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type OrderStatus = 'completed' | 'processing' | 'out_for_delivery' | 'cancelled' | 'pending';
export type ExpiryStatus = 'safe' | 'warning' | 'danger';
export type PaymentMethod = 'cash' | 'credit' | 'bank_transfer' | 'cheque';

export interface ProductUnit {
  name: string; // كرتونة, عبوة, قطعة
  conversionRate: number; // e.g. 1 carton = 24 pieces
  barcode: string;
  wholesalePrice: number;
  halfWholesalePrice: number;
  retailPrice: number;
  costPrice: number;
}

export interface BatchInfo {
  batchNumber: string;
  expiryDate: string; // YYYY-MM-DD
  quantity: number;
  warehouse: string;
  status: ExpiryStatus;
  daysRemaining: number;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  nameEn?: string;
  category: string;
  brand: string;
  barcode: string;
  image: string;
  description: string;
  unit: string; // الوحدة الافتراضية e.g. كرتونة
  units: ProductUnit[];
  costPrice: number; // سعر الشراء (للوحدة الأساسية)
  wholesalePrice: number; // سعر الجملة
  halfWholesalePrice: number; // سعر نصف الجملة
  retailPrice: number; // سعر البيع للجمهور
  stock: number; // الكمية بالمخزن بالوحدة الأساسية
  minStock: number; // الحد الأدنى
  warehouse: string;
  status: ProductStatus;
  batches: BatchInfo[];
  monthlySales: number;
  revenue: number;
  profit: number;
}

export interface CartItem {
  product: Product;
  selectedUnit: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  total: number;
}

export interface InvoiceItem {
  productId: string;
  productName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  time: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  representativeId: string;
  representativeName: string;
  warehouse: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  paidAmount: number;
  remainingAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  shopName: string;
  phone: string;
  address: string;
  city?: string;
  type: string;
  representative?: string;
  assignedRep?: string;
  route?: string;
  tier?: 'A' | 'B' | 'C';
  currentBalance?: number;
  balance: number; // ديون العميل الحالية
  creditLimit: number;
  totalPurchases?: number;
  totalPaid?: number;
  lastPurchaseDate?: string;
  status?: 'active' | 'inactive' | 'blocked';
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  companyName?: string;
  contactPerson?: string;
  phone: string;
  category: string;
  balance: number; // مستحقات المورد
  totalPurchases?: number;
  totalPaid?: number;
  lastOrderDate?: string;
  status?: 'active' | 'inactive';
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  date: string;
  warehouse: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  grandTotal: number;
  paidAmount: number;
  remainingAmount: number;
  status: 'received' | 'pending' | 'cancelled';
}

export interface SalesRep {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  route: string; // خط السير
  monthlyTarget?: number;
  target: number;
  currentSales?: number;
  monthlySales: number;
  commission: number;
  collectedAmount?: number;
  achievementRate?: number; // percentage
  customersCount?: number;
  activeOrders?: number;
  vanPlate: string;
  vanInventory: {
    productId: string;
    productName: string;
    quantity: number;
    unit: string;
  }[];
}

export interface DeliveryOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  shopName: string;
  phone: string;
  address: string;
  area: string;
  amount: number;
  itemsCount: number;
  salesRep: string;
  driverName: string;
  time: string;
  estimatedDelivery: string;
  status: 'new' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'returned';
  paymentStatus: 'paid' | 'on_delivery' | 'credit';
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: PaymentMethod;
  account: string;
  recordedBy: string;
}

export interface NotificationItem {
  id: string;
  type: 'stock' | 'invoice' | 'expiry' | 'order' | 'payment';
  severity: 'danger' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
  targetScreen?: ScreenId;
  targetId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales_manager' | 'inventory_manager' | 'accountant' | 'representative';
  roleNameAr: string;
  avatar: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}
