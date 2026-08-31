import { Product, Customer, Supplier, SalesRep, Invoice, PurchaseOrder, DeliveryOrder, Expense, NotificationItem, User } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    code: 'PRD-1001',
    name: 'زيت دوار الشمس هلا 1.5 لتر (كرتونة 6 حبة)',
    nameEn: 'Hala Sunflower Oil 1.5L (Case of 6)',
    category: 'زيوت وسمن',
    brand: 'هلا (Hala)',
    barcode: '6223001234011',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&auto=format&fit=crop&q=80',
    description: 'زيت دوار شمس نقي 100% عالي الجودة مناسب للطبخ والقلي، عبوة 1.5 لتر كرتونة 6 زجاجات.',
    unit: 'كرتونة',
    units: [
      { name: 'كرتونة', conversionRate: 6, barcode: '6223001234011', costPrice: 420, wholesalePrice: 460, halfWholesalePrice: 475, retailPrice: 495 },
      { name: 'حبة', conversionRate: 1, barcode: '6223001234012', costPrice: 70, wholesalePrice: 77, halfWholesalePrice: 80, retailPrice: 85 }
    ],
    costPrice: 420,
    wholesalePrice: 460,
    halfWholesalePrice: 475,
    retailPrice: 495,
    stock: 240,
    minStock: 50,
    warehouse: 'المخزن الرئيسي (المنطقة الصناعية)',
    status: 'in_stock',
    batches: [
      { batchNumber: 'BAT-2026-081', expiryDate: '2027-06-30', quantity: 180, warehouse: 'المخزن الرئيسي', status: 'safe', daysRemaining: 304 },
      { batchNumber: 'BAT-2026-022', expiryDate: '2026-10-15', quantity: 60, warehouse: 'المخزن الرئيسي', status: 'warning', daysRemaining: 46 }
    ],
    monthlySales: 890,
    revenue: 409400,
    profit: 35600
  },
  {
    id: 'prod-2',
    code: 'PRD-1002',
    name: 'حليب جهينة كامل الدسم 1 لتر (كرتونة 12 عبوة)',
    nameEn: 'Juhayna Full Cream Milk 1L (Case of 12)',
    category: 'ألبان ومشروبات',
    brand: 'جهينة (Juhayna)',
    barcode: '6221008765432',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80',
    description: 'حليب بقري معقم كامل الدسم طويل الأجل غني بالفيتامينات.',
    unit: 'كرتونة',
    units: [
      { name: 'كرتونة', conversionRate: 12, barcode: '6221008765432', costPrice: 460, wholesalePrice: 495, halfWholesalePrice: 510, retailPrice: 540 },
      { name: 'عبوة', conversionRate: 1, barcode: '6221008765433', costPrice: 38.3, wholesalePrice: 41.5, halfWholesalePrice: 43, retailPrice: 46 }
    ],
    costPrice: 460,
    wholesalePrice: 495,
    halfWholesalePrice: 510,
    retailPrice: 540,
    stock: 28,
    minStock: 40,
    warehouse: 'مخزن التبريد المركزي',
    status: 'low_stock',
    batches: [
      { batchNumber: 'BAT-2026-119', expiryDate: '2026-09-22', quantity: 28, warehouse: 'مخزن التبريد المركزي', status: 'danger', daysRemaining: 23 }
    ],
    monthlySales: 1250,
    revenue: 618750,
    profit: 43750
  },
  {
    id: 'prod-3',
    code: 'PRD-1003',
    name: 'أرز الضحى فاخر مصري 5 كجم (بالة 4 أكياس)',
    nameEn: 'Al Doha Egyptian Rice 5kg (Bundle of 4)',
    category: 'بقوليات وأرز',
    brand: 'الضحى (Al Doha)',
    barcode: '6222009845120',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=80',
    description: 'أرز مصري منتقى ومغسول حبة عريضة درجة أولى، عبوة 5 كجم.',
    unit: 'بالة',
    units: [
      { name: 'بالة', conversionRate: 4, barcode: '6222009845120', costPrice: 680, wholesalePrice: 740, halfWholesalePrice: 760, retailPrice: 800 },
      { name: 'كيس', conversionRate: 1, barcode: '6222009845121', costPrice: 170, wholesalePrice: 185, halfWholesalePrice: 190, retailPrice: 205 }
    ],
    costPrice: 680,
    wholesalePrice: 740,
    halfWholesalePrice: 760,
    retailPrice: 800,
    stock: 310,
    minStock: 60,
    warehouse: 'المخزن الرئيسي (المنطقة الصناعية)',
    status: 'in_stock',
    batches: [
      { batchNumber: 'BAT-2026-044', expiryDate: '2027-11-15', quantity: 310, warehouse: 'المخزن الرئيسي', status: 'safe', daysRemaining: 442 }
    ],
    monthlySales: 720,
    revenue: 532800,
    profit: 43200
  },
  {
    id: 'prod-4',
    code: 'PRD-1004',
    name: 'شاي العروسة ناعم 250 جم (كرتونة 40 باكو)',
    nameEn: 'El Arosa Black Tea 250g (Case of 40)',
    category: 'مشروبات وعصائر',
    brand: 'العروسة (El Arosa)',
    barcode: '6224003322110',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=200&auto=format&fit=crop&q=80',
    description: 'شاي أسود كيني فاخر مميز ناعم الحبيبات كرتونة 40 عبوة.',
    unit: 'كرتونة',
    units: [
      { name: 'كرتونة', conversionRate: 40, barcode: '6224003322110', costPrice: 1780, wholesalePrice: 1920, halfWholesalePrice: 1960, retailPrice: 2080 },
      { name: 'باكو', conversionRate: 1, barcode: '6224003322111', costPrice: 44.5, wholesalePrice: 48, halfWholesalePrice: 49, retailPrice: 53 }
    ],
    costPrice: 1780,
    wholesalePrice: 1920,
    halfWholesalePrice: 1960,
    retailPrice: 2080,
    stock: 145,
    minStock: 30,
    warehouse: 'المخزن الرئيسي (المنطقة الصناعية)',
    status: 'in_stock',
    batches: [
      { batchNumber: 'BAT-2026-302', expiryDate: '2028-01-20', quantity: 145, warehouse: 'المخزن الرئيسي', status: 'safe', daysRemaining: 508 }
    ],
    monthlySales: 410,
    revenue: 787200,
    profit: 57400
  },
  {
    id: 'prod-5',
    code: 'PRD-1005',
    name: 'مكرونة الملكة فرن 400 جم (كرتونة 20 كيس)',
    nameEn: 'El Maleka Pasta 400g (Case of 20)',
    category: 'بقوليات وأرز',
    brand: 'الملكة (El Maleka)',
    barcode: '6221509933441',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=200&auto=format&fit=crop&q=80',
    description: 'مكرونة فرن إيطالي عالية الجودة من سميد القمح الصافي.',
    unit: 'كرتونة',
    units: [
      { name: 'كرتونة', conversionRate: 20, barcode: '6221509933441', costPrice: 210, wholesalePrice: 235, halfWholesalePrice: 245, retailPrice: 260 },
      { name: 'كيس', conversionRate: 1, barcode: '6221509933442', costPrice: 10.5, wholesalePrice: 11.75, halfWholesalePrice: 12.25, retailPrice: 13.5 }
    ],
    costPrice: 210,
    wholesalePrice: 235,
    halfWholesalePrice: 245,
    retailPrice: 260,
    stock: 520,
    minStock: 100,
    warehouse: 'المخزن الرئيسي (المنطقة الصناعية)',
    status: 'in_stock',
    batches: [
      { batchNumber: 'BAT-2026-077', expiryDate: '2027-09-10', quantity: 520, warehouse: 'المخزن الرئيسي', status: 'safe', daysRemaining: 376 }
    ],
    monthlySales: 1680,
    revenue: 394800,
    profit: 42000
  },
  {
    id: 'prod-6',
    code: 'PRD-1006',
    name: 'مسحوق أريال أوتوماتيك لافندر 4 كجم (كرتونة 4 شكاير)',
    nameEn: 'Ariel Auto Powder 4kg (Case of 4)',
    category: 'منظفات وعناية',
    brand: 'أريال (Ariel)',
    barcode: '6221102456789',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&auto=format&fit=crop&q=80',
    description: 'مسحوق غسيل أوتوماتيك بقوة التنظيف العميق وعطر اللافندر المنعش.',
    unit: 'كرتونة',
    units: [
      { name: 'كرتونة', conversionRate: 4, barcode: '6221102456789', costPrice: 880, wholesalePrice: 960, halfWholesalePrice: 990, retailPrice: 1060 },
      { name: 'شيكارة', conversionRate: 1, barcode: '6221102456790', costPrice: 220, wholesalePrice: 240, halfWholesalePrice: 248, retailPrice: 265 }
    ],
    costPrice: 880,
    wholesalePrice: 960,
    halfWholesalePrice: 990,
    retailPrice: 1060,
    stock: 82,
    minStock: 25,
    warehouse: 'مخزن المنظفات والكيماويات',
    status: 'in_stock',
    batches: [
      { batchNumber: 'BAT-2026-105', expiryDate: '2028-05-15', quantity: 82, warehouse: 'مخزن المنظفات', status: 'safe', daysRemaining: 623 }
    ],
    monthlySales: 340,
    revenue: 326400,
    profit: 27200
  },
  {
    id: 'prod-7',
    code: 'PRD-1007',
    name: 'بسكويت أوريو الأصلي 6 حبات (علبة 24 باكو)',
    nameEn: 'Oreo Original Cookies (Box of 24)',
    category: 'بسكويت وحلويات',
    brand: 'أوريو (Oreo / Mondelez)',
    barcode: '6222204561234',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&auto=format&fit=crop&q=80',
    description: 'بسكويت شوكولاتة محشو بالكريمة الغنية اللذيذة.',
    unit: 'علبة',
    units: [
      { name: 'علبة', conversionRate: 24, barcode: '6222204561234', costPrice: 185, wholesalePrice: 210, halfWholesalePrice: 220, retailPrice: 240 },
      { name: 'باكو', conversionRate: 1, barcode: '6222204561235', costPrice: 7.7, wholesalePrice: 8.75, halfWholesalePrice: 9.2, retailPrice: 10 }
    ],
    costPrice: 185,
    wholesalePrice: 210,
    halfWholesalePrice: 220,
    retailPrice: 240,
    stock: 0,
    minStock: 35,
    warehouse: 'المخزن الرئيسي (المنطقة الصناعية)',
    status: 'out_of_stock',
    batches: [],
    monthlySales: 950,
    revenue: 199500,
    profit: 23750
  },
  {
    id: 'prod-8',
    code: 'PRD-1008',
    name: 'جبنة لافاش كيري مثلثات 16 قطعة (كرتونة 36 علبة)',
    nameEn: 'La Vache Quirit Triangles 16P (Case of 36)',
    category: 'ألبان ومشروبات',
    brand: 'لافاش كيري (Bel Group)',
    barcode: '6223408877112',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&auto=format&fit=crop&q=80',
    description: 'جبنة مطبوخة مثلثات كريمية غنية بالكالسيوم والفيتامينات.',
    unit: 'كرتونة',
    units: [
      { name: 'كرتونة', conversionRate: 36, barcode: '6223408877112', costPrice: 1420, wholesalePrice: 1530, halfWholesalePrice: 1570, retailPrice: 1650 },
      { name: 'علبة', conversionRate: 1, barcode: '6223408877113', costPrice: 39.4, wholesalePrice: 42.5, halfWholesalePrice: 43.6, retailPrice: 46 }
    ],
    costPrice: 1420,
    wholesalePrice: 1530,
    halfWholesalePrice: 1570,
    retailPrice: 1650,
    stock: 75,
    minStock: 25,
    warehouse: 'مخزن التبريد المركزي',
    status: 'in_stock',
    batches: [
      { batchNumber: 'BAT-2026-089', expiryDate: '2026-10-05', quantity: 75, warehouse: 'مخزن التبريد', status: 'warning', daysRemaining: 36 }
    ],
    monthlySales: 480,
    revenue: 734400,
    profit: 52800
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'الحاج محمود الشرقاوي',
    shopName: 'سوبر ماركت النخيل الذهبي',
    phone: '01012345678',
    address: 'شارع الهرم الرئيسي، أمام بنك مصر',
    city: 'الجيزة',
    type: 'supermarket',
    representative: 'أحمد نبيل رضوان',
    currentBalance: 42500,
    balance: 42500,
    creditLimit: 75000,
    tier: 'B',
    totalPurchases: 485000,
    totalPaid: 442500,
    lastPurchaseDate: '2026-08-29',
    status: 'active',
    notes: 'عميل منتظم ملتزم بالسداد نصف الشهري'
  },
  {
    id: 'cust-2',
    name: 'عمرو عبدالفتاح الصاوي',
    shopName: 'هايبر ماركت البركة والخير',
    phone: '01123456789',
    address: 'ميدان الحصري، المحور المركزي، الحي الثاني',
    city: '6 أكتوبر',
    type: 'supermarket',
    representative: 'محمد سامي جلال',
    currentBalance: 88400,
    balance: 88400,
    creditLimit: 120000,
    tier: 'A',
    totalPurchases: 890000,
    totalPaid: 801600,
    lastPurchaseDate: '2026-08-30',
    status: 'active',
    notes: 'أكبر مشتري في قطاع الألبان والزيوت'
  },
  {
    id: 'cust-3',
    name: 'كابتن طارق السروي',
    shopName: 'سلسلة كافيهات ومطاعم رويال كراون',
    phone: '01234567890',
    address: 'شارع 9 المعادي، برج الندى',
    city: 'القاهرة',
    type: 'restaurant',
    representative: 'أحمد نبيل رضوان',
    currentBalance: 31200,
    balance: 31200,
    creditLimit: 50000,
    tier: 'B',
    totalPurchases: 320000,
    totalPaid: 288800,
    lastPurchaseDate: '2026-08-28',
    status: 'active',
    notes: 'توريد أسبوعي شاي وعصائر ومستلزمات مطاعم'
  },
  {
    id: 'cust-4',
    name: 'الأسطى خميس أبو العلا',
    shopName: 'بقالة وماركت السلامة',
    phone: '01512345678',
    address: 'شارع فيصل، محطة المساحة',
    city: 'الجيزة',
    type: 'grocery',
    representative: 'كريم عثمان فؤاد',
    currentBalance: 12800,
    balance: 12800,
    creditLimit: 25000,
    tier: 'C',
    totalPurchases: 145000,
    totalPaid: 132200,
    lastPurchaseDate: '2026-08-25',
    status: 'active'
  },
  {
    id: 'cust-5',
    name: 'المهندس شريف المنياوي',
    shopName: 'أسواق أولاد المنياوي المركزية',
    phone: '01099887766',
    address: 'شارع التحرير، الدقي',
    city: 'الجيزة',
    type: 'wholesale',
    representative: 'محمد سامي جلال',
    currentBalance: 118500,
    balance: 118500,
    creditLimit: 150000,
    tier: 'A',
    totalPurchases: 1450000,
    totalPaid: 1331500,
    lastPurchaseDate: '2026-08-30',
    status: 'active'
  },
  {
    id: 'cust-6',
    name: 'عصام رشاد الجابري',
    shopName: 'ماركت الجزيرة التخصصي',
    phone: '01155443322',
    address: 'شارع شبرا الرئيسي، بجوار محطة روض الفرج',
    city: 'القاهرة',
    type: 'grocery',
    representative: 'كريم عثمان فؤاد',
    currentBalance: 92200,
    balance: 92200,
    creditLimit: 80000,
    tier: 'B',
    totalPurchases: 290000,
    totalPaid: 197800,
    lastPurchaseDate: '2026-08-14',
    status: 'blocked',
    notes: 'تجاوز الحد الائتماني ولديه فواتير متأخرة'
  }
];

export const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'PO-2026-0881',
    supplierId: 'supp-1',
    supplierName: 'شركة جهينة للصناعات الغذائية',
    date: '2026-08-28',
    warehouse: 'مخزن التبريد المركزي',
    items: [
      { productId: 'prod-2', productName: 'حليب جهينة كامل الدسم 1 لتر', quantity: 200, unitCost: 460, totalCost: 92000 }
    ],
    subtotal: 92000,
    tax: 0,
    grandTotal: 92000,
    paidAmount: 50000,
    remainingAmount: 42000,
    status: 'received'
  },
  {
    id: 'po-2',
    poNumber: 'PO-2026-0890',
    supplierId: 'supp-2',
    supplierName: 'مجموعة صافولا للأغذية (عافية وهلا)',
    date: '2026-08-29',
    warehouse: 'المخزن الرئيسي (المنطقة الصناعية)',
    items: [
      { productId: 'prod-1', productName: 'زيت دوار الشمس هلا 1.5 لتر', quantity: 300, unitCost: 420, totalCost: 126000 }
    ],
    subtotal: 126000,
    tax: 0,
    grandTotal: 126000,
    paidAmount: 126000,
    remainingAmount: 0,
    status: 'received'
  }
];

export const initialSuppliers: Supplier[] = [
  {
    id: 'supp-1',
    name: 'شركة جهينة للصناعات الغذائية ش.م.م',
    companyName: 'جهينة جروب',
    phone: '0238356000',
    category: 'ألبان وعصائر ومشروبات',
    balance: 185000,
    totalPurchases: 1420000,
    totalPaid: 1235000,
    lastOrderDate: '2026-08-27',
    status: 'active'
  },
  {
    id: 'supp-2',
    name: 'مجموعة شركات صافولا للأغذية',
    companyName: 'صافولا مصر (عافية، هلا، الملكة)',
    phone: '0224189000',
    category: 'زيوت وسمن ومكرونة',
    balance: 240000,
    totalPurchases: 2150000,
    totalPaid: 1910000,
    lastOrderDate: '2026-08-25',
    status: 'active'
  },
  {
    id: 'supp-3',
    name: 'شركة الضحى للاستثمار والصناعات الغذائية',
    companyName: 'الضحى للمنتجات المعبأة',
    phone: '0238204500',
    category: 'أرز وبقوليات وتوابل',
    balance: 95000,
    totalPurchases: 890000,
    totalPaid: 795000,
    lastOrderDate: '2026-08-20',
    status: 'active'
  },
  {
    id: 'supp-4',
    name: 'شركة بيبسيكو وشيبسي العالمية',
    companyName: 'بيبسيكو مصر',
    phone: '0226148000',
    category: 'شيبس وسناكس ومشروبات غازية',
    balance: 130000,
    totalPurchases: 1100000,
    totalPaid: 970000,
    lastOrderDate: '2026-08-28',
    status: 'active'
  }
];

export const initialSalesReps: SalesRep[] = [
  {
    id: 'rep-1',
    name: 'أحمد نبيل رضوان',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '01011223344',
    route: 'خط الجيزة والهرم والمعادي',
    target: 450000,
    monthlyTarget: 450000,
    monthlySales: 412000,
    currentSales: 412000,
    commission: 12500,
    collectedAmount: 298000,
    achievementRate: 91.5,
    customersCount: 38,
    activeOrders: 7,
    vanPlate: 'ق هـ ر 8421',
    vanInventory: [
      { productId: 'prod-1', productName: 'زيت دوار الشمس هلا 1.5 لتر', quantity: 24, unit: 'كرتونة' },
      { productId: 'prod-4', productName: 'شاي العروسة ناعم 250 جم', quantity: 15, unit: 'كرتونة' },
      { productId: 'prod-2', productName: 'حليب جهينة كامل الدسم 1 لتر', quantity: 18, unit: 'كرتونة' }
    ]
  },
  {
    id: 'rep-2',
    name: 'محمد سامي جلال',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '01122334455',
    route: 'خط 6 أكتوبر والشيخ زايد والدقي',
    target: 550000,
    monthlyTarget: 550000,
    monthlySales: 518000,
    currentSales: 518000,
    commission: 16800,
    collectedAmount: 385000,
    achievementRate: 94.2,
    customersCount: 45,
    activeOrders: 11,
    vanPlate: 'ب ن د 3392',
    vanInventory: [
      { productId: 'prod-3', productName: 'أرز الضحى فاخر مصري 5 كجم', quantity: 30, unit: 'بالة' },
      { productId: 'prod-5', productName: 'مكرونة الملكة فرن 400 جم', quantity: 40, unit: 'كرتونة' }
    ]
  },
  {
    id: 'rep-3',
    name: 'كريم عثمان فؤاد',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '01233445566',
    route: 'خط شبرا ووسط البلد والمطرية',
    target: 380000,
    monthlyTarget: 380000,
    monthlySales: 295000,
    currentSales: 295000,
    commission: 8900,
    collectedAmount: 210000,
    achievementRate: 77.6,
    customersCount: 29,
    activeOrders: 5,
    vanPlate: 'ج م ع 5519',
    vanInventory: [
      { productId: 'prod-6', productName: 'مسحوق أريال أوتوماتيك لافندر 4 كجم', quantity: 12, unit: 'كرتونة' },
      { productId: 'prod-8', productName: 'جبنة لافاش كيري مثلثات 16 قطعة', quantity: 20, unit: 'كرتونة' }
    ]
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-1089',
    invoiceNumber: 'INV-2026-1089',
    date: '2026-08-30',
    time: '11:42 ص',
    customerId: 'cust-2',
    customerName: 'هايبر ماركت البركة والخير (عمرو الصاوي)',
    customerPhone: '01123456789',
    representativeId: 'rep-2',
    representativeName: 'محمد سامي جلال',
    warehouse: 'المخزن الرئيسي',
    items: [
      { productId: 'prod-1', productName: 'زيت دوار الشمس هلا 1.5 لتر (كرتونة 6 حبة)', unit: 'كرتونة', quantity: 20, unitPrice: 460, discount: 0, total: 9200 },
      { productId: 'prod-3', productName: 'أرز الضحى فاخر مصري 5 كجم (بالة 4 أكياس)', unit: 'بالة', quantity: 15, unitPrice: 740, discount: 200, total: 10900 },
      { productId: 'prod-5', productName: 'مكرونة الملكة فرن 400 جم (كرتونة 20 كيس)', unit: 'كرتونة', quantity: 30, unitPrice: 235, discount: 0, total: 7050 }
    ],
    subtotal: 27350,
    discount: 200,
    tax: 0,
    grandTotal: 27150,
    paidAmount: 20000,
    remainingAmount: 7150,
    paymentMethod: 'credit',
    status: 'processing',
    notes: 'يتم التسليم صباح الغد قبل 10 صباحاً'
  },
  {
    id: 'inv-1088',
    invoiceNumber: 'INV-2026-1088',
    date: '2026-08-30',
    time: '09:15 ص',
    customerId: 'cust-1',
    customerName: 'سوبر ماركت النخيل الذهبي (محمود الشرقاوي)',
    customerPhone: '01012345678',
    representativeId: 'rep-1',
    representativeName: 'أحمد نبيل رضوان',
    warehouse: 'المخزن الرئيسي',
    items: [
      { productId: 'prod-4', productName: 'شاي العروسة ناعم 250 جم (كرتونة 40 باكو)', unit: 'كرتونة', quantity: 8, unitPrice: 1920, discount: 160, total: 15200 },
      { productId: 'prod-2', productName: 'حليب جهينة كامل الدسم 1 لتر (كرتونة 12 عبوة)', unit: 'كرتونة', quantity: 12, unitPrice: 495, discount: 0, total: 5940 }
    ],
    subtotal: 21300,
    discount: 160,
    tax: 0,
    grandTotal: 21140,
    paidAmount: 21140,
    remainingAmount: 0,
    paymentMethod: 'cash',
    status: 'completed',
    notes: 'تم الدفع نقداً بالكامل للمندوب'
  },
  {
    id: 'inv-1087',
    invoiceNumber: 'INV-2026-1087',
    date: '2026-08-29',
    time: '04:30 م',
    customerId: 'cust-3',
    customerName: 'سلسلة كافيهات رويال كراون (طارق السروي)',
    customerPhone: '01234567890',
    representativeId: 'rep-1',
    representativeName: 'أحمد نبيل رضوان',
    warehouse: 'المخزن الرئيسي',
    items: [
      { productId: 'prod-4', productName: 'شاي العروسة ناعم 250 جم (كرتونة 40 باكو)', unit: 'كرتونة', quantity: 10, unitPrice: 1920, discount: 200, total: 19000 },
      { productId: 'prod-1', productName: 'زيت دوار الشمس هلا 1.5 لتر (كرتونة 6 حبة)', unit: 'كرتونة', quantity: 10, unitPrice: 460, discount: 0, total: 4600 }
    ],
    subtotal: 23800,
    discount: 200,
    tax: 0,
    grandTotal: 23600,
    paidAmount: 15000,
    remainingAmount: 8600,
    paymentMethod: 'credit',
    status: 'out_for_delivery'
  },
  {
    id: 'inv-1086',
    invoiceNumber: 'INV-2026-1086',
    date: '2026-08-29',
    time: '01:10 م',
    customerId: 'cust-5',
    customerName: 'أسواق أولاد المنياوي (شريف المنياوي)',
    customerPhone: '01099887766',
    representativeId: 'rep-2',
    representativeName: 'محمد سامي جلال',
    warehouse: 'المخزن الرئيسي',
    items: [
      { productId: 'prod-5', productName: 'مكرونة الملكة فرن 400 جم (كرتونة 20 كيس)', unit: 'كرتونة', quantity: 80, unitPrice: 235, discount: 800, total: 18000 },
      { productId: 'prod-6', productName: 'مسحوق أريال أوتوماتيك لافندر 4 كجم (كرتونة 4 شكاير)', unit: 'كرتونة', quantity: 25, unitPrice: 960, discount: 500, total: 23500 }
    ],
    subtotal: 42800,
    discount: 1300,
    tax: 0,
    grandTotal: 41500,
    paidAmount: 41500,
    remainingAmount: 0,
    paymentMethod: 'bank_transfer',
    status: 'completed'
  },
  {
    id: 'inv-1085',
    invoiceNumber: 'INV-2026-1085',
    date: '2026-08-28',
    time: '10:00 ص',
    customerId: 'cust-4',
    customerName: 'بقالة وماركت السلامة (خميس أبو العلا)',
    customerPhone: '01512345678',
    representativeId: 'rep-3',
    representativeName: 'كريم عثمان فؤاد',
    warehouse: 'المخزن الرئيسي',
    items: [
      { productId: 'prod-1', productName: 'زيت دوار الشمس هلا 1.5 لتر (كرتونة 6 حبة)', unit: 'كرتونة', quantity: 6, unitPrice: 460, discount: 0, total: 2760 },
      { productId: 'prod-3', productName: 'أرز الضحى فاخر مصري 5 كجم (بالة 4 أكياس)', unit: 'بالة', quantity: 5, unitPrice: 740, discount: 0, total: 3700 }
    ],
    subtotal: 6460,
    discount: 0,
    tax: 0,
    grandTotal: 6460,
    paidAmount: 6460,
    remainingAmount: 0,
    paymentMethod: 'cash',
    status: 'completed'
  }
];

export const initialDeliveryOrders: DeliveryOrder[] = [
  {
    id: 'del-1',
    orderNumber: 'ORD-9801',
    customerName: 'محمود الشرقاوي',
    shopName: 'سوبر ماركت النخيل الذهبي',
    phone: '01012345678',
    address: 'شارع الهرم الرئيسي، أمام بنك مصر',
    area: 'الهرم والجيزة',
    amount: 21140,
    itemsCount: 20,
    salesRep: 'أحمد نبيل رضوان',
    driverName: 'الأسطى عيد بركات (جامبو 1)',
    time: '10:30 ص',
    estimatedDelivery: '12:30 م',
    status: 'out_for_delivery',
    paymentStatus: 'paid'
  },
  {
    id: 'del-2',
    orderNumber: 'ORD-9802',
    customerName: 'عمرو عبدالفتاح الصاوي',
    shopName: 'هايبر ماركت البركة والخير',
    phone: '01123456789',
    address: 'ميدان الحصري، المحور المركزي',
    area: '6 أكتوبر',
    amount: 27150,
    itemsCount: 65,
    salesRep: 'محمد سامي جلال',
    driverName: 'رمضان فتحي (دبابة 2)',
    time: '11:50 ص',
    estimatedDelivery: '02:00 م',
    status: 'preparing',
    paymentStatus: 'credit'
  },
  {
    id: 'del-3',
    orderNumber: 'ORD-9803',
    customerName: 'طارق السروي',
    shopName: 'كافيهات ومطاعم رويال كراون',
    phone: '01234567890',
    address: 'شارع 9 المعادي، برج الندى',
    area: 'المعادي',
    amount: 23600,
    itemsCount: 20,
    salesRep: 'أحمد نبيل رضوان',
    driverName: 'الأسطى عيد بركات (جامبو 1)',
    time: '01:15 م',
    estimatedDelivery: '03:30 م',
    status: 'ready',
    paymentStatus: 'credit'
  },
  {
    id: 'del-4',
    orderNumber: 'ORD-9804',
    customerName: 'شريف المنياوي',
    shopName: 'أسواق أولاد المنياوي المركزية',
    phone: '01099887766',
    address: 'شارع التحرير، الدقي',
    area: 'الدقي والمهندسين',
    amount: 41500,
    itemsCount: 105,
    salesRep: 'محمد سامي جلال',
    driverName: 'حسين شحاتة (جامبو 2)',
    time: '08:40 ص',
    estimatedDelivery: '11:00 ص',
    status: 'delivered',
    paymentStatus: 'paid'
  },
  {
    id: 'del-5',
    orderNumber: 'ORD-9805',
    customerName: 'خميس أبو العلا',
    shopName: 'بقالة وماركت السلامة',
    phone: '01512345678',
    address: 'شارع فيصل، محطة المساحة',
    area: 'فيصل',
    amount: 6460,
    itemsCount: 11,
    salesRep: 'كريم عثمان فؤاد',
    driverName: 'رمضان فتحي (دبابة 2)',
    time: '09:10 ص',
    estimatedDelivery: '10:45 ص',
    status: 'delivered',
    paymentStatus: 'paid'
  }
];

export const initialExpenses: Expense[] = [
  { id: 'exp-1', date: '2026-08-30', category: 'وقود وصيانة سيارات', description: 'سولار لسيارات التوزيع الجامبو والدبابة (3 سيارات)', amount: 2850, paymentMethod: 'cash', account: 'الخزينة الرئيسية', recordedBy: 'أيمن عبدالرحيم' },
  { id: 'exp-2', date: '2026-08-29', category: 'مصاريف مخازن وتشغيل', description: 'شراء بالتات خشبية وشريط تغليف وتستريتش للمخزن', amount: 1400, paymentMethod: 'cash', account: 'الخزينة الرئيسية', recordedBy: 'محمود سلامة' },
  { id: 'exp-3', date: '2026-08-28', category: 'إيجارات ومرافق', description: 'فاتورة الكهرباء الشهرية لمخزن التبريد المركزي', amount: 8200, paymentMethod: 'bank_transfer', account: 'البنك الأهلي المصري', recordedBy: 'أيمن عبدالرحيم' },
  { id: 'exp-4', date: '2026-08-26', category: 'عمولات ومكافآت مناديب', description: 'حافز تحقيق التارجت الأسبوعي للمندوب محمد سامي', amount: 3500, paymentMethod: 'cash', account: 'الخزينة الرئيسية', recordedBy: 'أيمن عبدالرحيم' },
  { id: 'exp-5', date: '2026-08-24', category: 'ضيافة وبوفيه', description: 'مشروبات وضيافة العملاء والموردين بمقر الإدارة', amount: 650, paymentMethod: 'cash', account: 'الخزينة الرئيسية', recordedBy: 'محمود سلامة' }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'stock',
    severity: 'danger',
    title: 'نفاد مخزون',
    message: 'نفد مخزون بسكويت أوريو الأصلي بالكامل (0 علبة بالمخزن)',
    time: 'منذ 15 دقيقة',
    read: false,
    targetScreen: 'products',
    targetId: 'prod-7'
  },
  {
    id: 'notif-2',
    type: 'expiry',
    severity: 'danger',
    title: 'تنبيه صلاحية عاجل',
    message: 'دفعة حليب جهينة كامل الدسم (28 كرتونة) متبقي عليها 23 يوم فقط!',
    time: 'منذ ساعة',
    read: false,
    targetScreen: 'expiry',
    targetId: 'prod-2'
  },
  {
    id: 'notif-3',
    type: 'invoice',
    severity: 'warning',
    title: 'تجاوز حد ائتماني',
    message: 'العميل عصام الجابري تجاوز الحد الائتماني المسموح به (92,200 ج.م)',
    time: 'منذ ساعتين',
    read: false,
    targetScreen: 'customers',
    targetId: 'cust-6'
  },
  {
    id: 'notif-4',
    type: 'order',
    severity: 'info',
    title: 'طلب بيع جديد',
    message: 'طلب رقم INV-2026-1089 مسجل لصالح هايبر ماركت البركة بقيمة 27,150 ج.م',
    time: 'منذ 3 ساعات',
    read: true,
    targetScreen: 'sales_invoices'
  },
  {
    id: 'notif-5',
    type: 'payment',
    severity: 'success',
    title: 'تحصيل دفعة نقدية',
    message: 'تم تحصيل 20,000 ج.م من هايبر البركة بواسطة المندوب محمد سامي',
    time: 'منذ 4 ساعات',
    read: true,
    targetScreen: 'finance'
  }
];

export const initialUsers: User[] = [
  {
    id: 'usr-1',
    name: 'أيمن عبدالرحيم',
    email: 'ayman.ep21@gmail.com',
    role: 'admin',
    roleNameAr: 'مدير النظام التنفيذي',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    lastLogin: 'الآن (متصل)',
    permissions: ['all']
  },
  {
    id: 'usr-2',
    name: 'محمود سلامة السيد',
    email: 'm.salama@wholesalepro.com',
    role: 'inventory_manager',
    roleNameAr: 'مدير المخازن واللوجستيات',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    lastLogin: 'اليوم 09:30 ص',
    permissions: ['products_read', 'products_write', 'warehouses_all', 'transfers_all', 'expiry_read']
  },
  {
    id: 'usr-3',
    name: 'سارة عبدالمجيد',
    email: 'sara.m@wholesalepro.com',
    role: 'accountant',
    roleNameAr: 'رئيس قسم الحسابات',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    lastLogin: 'اليوم 10:15 ص',
    permissions: ['finance_all', 'reports_all', 'invoices_read', 'expenses_all']
  },
  {
    id: 'usr-4',
    name: 'محمد سامي جلال',
    email: 'm.samy@wholesalepro.com',
    role: 'representative',
    roleNameAr: 'مندوب مبيعات كبار العملاء',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    lastLogin: 'اليوم 11:40 ص',
    permissions: ['pos_create', 'customers_assigned', 'invoices_create']
  }
];
