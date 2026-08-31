import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { InvoiceModal } from './components/common/InvoiceModal';
import { AddCustomerModal } from './components/common/AddCustomerModal';
import { AddSupplierModal } from './components/common/AddSupplierModal';
import { AddSalesRepModal } from './components/common/AddSalesRepModal';
import { AddExpenseModal } from './components/common/AddExpenseModal';
import { AddPurchaseModal } from './components/common/AddPurchaseModal';
import { ToastContainer } from './components/common/ToastContainer';

// Views
import { DashboardView } from './views/DashboardView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailsView } from './views/ProductDetailsView';
import { AddProductView } from './views/AddProductView';
import { PosView } from './views/PosView';
import { SalesInvoicesView } from './views/SalesInvoicesView';
import { InventoryView } from './views/InventoryView';
import { ExpiryBatchesView } from './views/ExpiryBatchesView';
import { CustomersView } from './views/CustomersView';
import { CustomerStatementView } from './views/CustomerStatementView';
import { PurchasesView } from './views/PurchasesView';
import { SuppliersView } from './views/SuppliersView';
import { RepresentativesView } from './views/RepresentativesView';
import { DeliveryDispatchView } from './views/DeliveryDispatchView';
import { FinanceView } from './views/FinanceView';
import { ReportsView } from './views/ReportsView';
import { SmartAnalyticsView } from './views/SmartAnalyticsView';
import { SettingsView } from './views/SettingsView';

const MainContent: React.FC = () => {
  const { currentScreen, isSidebarCollapsed } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardView />;
      case 'products':
        return <ProductsView />;
      case 'add_product':
        return <AddProductView />;
      case 'product_details':
        return <ProductDetailsView />;
      case 'pos':
        return <PosView />;
      case 'sales_invoices':
        return <SalesInvoicesView />;
      case 'inventory':
        return <InventoryView />;
      case 'expiry':
        return <ExpiryBatchesView />;
      case 'customers':
        return <CustomersView />;
      case 'customer_statement':
        return <CustomerStatementView />;
      case 'purchases':
        return <PurchasesView />;
      case 'suppliers':
        return <SuppliersView />;
      case 'representatives':
        return <RepresentativesView />;
      case 'delivery':
        return <DeliveryDispatchView />;
      case 'finance':
        return <FinanceView />;
      case 'reports':
        return <ReportsView />;
      case 'smart_analytics':
        return <SmartAnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0a0a] font-sans text-[#0f172a] dark:text-[#ededed] transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {/* TopBar */}
        <TopBar />

        {/* Dynamic Screen Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin flex flex-col justify-between">
          <div className="max-w-7xl mx-auto w-full pb-8">
            {renderScreen()}
          </div>

          {/* System Footer Bar */}
          <footer className="w-full max-w-7xl mx-auto pt-6 pb-2 border-t border-[#e2e8f0] dark:border-[#222222] flex items-center justify-between text-[11px] text-[#475569] dark:text-[#888888] select-none">
            <span>جميع الحقوق محفوظة © 2026 فيدورا ERP.</span>
            <span className="font-mono text-[#94a3b8] dark:text-[#666666]">الإصدار 2.0.1</span>
          </footer>
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <InvoiceModal />
      <AddCustomerModal />
      <AddSupplierModal />
      <AddSalesRepModal />
      <AddExpenseModal />
      <AddPurchaseModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
