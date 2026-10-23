import React, { useState, useEffect } from 'react';
import { Product, Currency, Language } from './types/trade';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ShipmentTracker } from './components/ShipmentTracker';
import { CurrencyConverter } from './components/CurrencyConverter';
import { TradeHubAndAbout } from './components/TradeHubAndAbout';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RFQModal } from './components/RFQModal';
import { AddProductModal } from './components/AddProductModal';
import { Check, Info } from 'lucide-react';

const STORAGE_KEY_PRODUCTS = 'ukbgt_products_v1';
const STORAGE_KEY_CURRENCY = 'ukbgt_currency_v1';
const STORAGE_KEY_LANGUAGE = 'ukbgt_lang_v1';

export default function App() {
  // Load products from localStorage or use initial rich catalog
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load products from local storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENCY);
      if (saved && ['USD', 'BDT', 'GBP', 'EUR', 'AED', 'RMB'].includes(saved)) {
        return saved as Currency;
      }
    } catch {}
    return 'USD';
  });

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANGUAGE);
      if (saved && (saved === 'en' || saved === 'bn')) {
        return saved as Language;
      }
    } catch {}
    return 'en';
  });

  // Modal states
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [selectedProductForRFQ, setSelectedProductForRFQ] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENCY, currentCurrency);
    } catch {}
  }, [currentCurrency]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANGUAGE, currentLanguage);
    } catch {}
  }, [currentLanguage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Commodity "${newProduct.name}" added to catalog successfully.`);
  };

  const handleOpenRFQForProduct = (product: Product) => {
    setSelectedProductForRFQ(product);
    setIsRFQOpen(true);
  };

  const handleOpenGeneralRFQ = () => {
    setSelectedProductForRFQ(products[0] || null);
    setIsRFQOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenRFQ={handleOpenGeneralRFQ}
        onOpenAddProduct={() => setIsAddProductOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          currentLanguage={currentLanguage}
          onExploreCatalog={() => handleNavigate('catalog')}
          onTrackShipment={() => handleNavigate('tracking')}
          onOpenAddProduct={() => setIsAddProductOpen(true)}
          totalProductsCount={products.length}
        />

        {/* Product Catalog Section */}
        <ProductCatalog
          products={products}
          currentCurrency={currentCurrency}
          currentLanguage={currentLanguage}
          onSelectProduct={(p) => setSelectedProductForDetail(p)}
          onOpenRFQForProduct={handleOpenRFQForProduct}
          onOpenAddProduct={() => setIsAddProductOpen(true)}
        />

        {/* Real-time Shipment Tracking Section */}
        <ShipmentTracker currentLanguage={currentLanguage} />

        {/* Integrated Currency Converter Section */}
        <CurrencyConverter currentLanguage={currentLanguage} products={products} />

        {/* Chattogram Trade Hub & Head Office Section */}
        <TradeHubAndAbout
          currentLanguage={currentLanguage}
          onOpenRFQ={handleOpenGeneralRFQ}
        />
      </main>

      {/* Global Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onNavigate={handleNavigate}
        onOpenAddProduct={() => setIsAddProductOpen(true)}
      />

      {/* Modals */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        currentCurrency={currentCurrency}
        currentLanguage={currentLanguage}
        onOpenRFQ={handleOpenRFQForProduct}
      />

      <RFQModal
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
        selectedProduct={selectedProductForRFQ}
        products={products}
        currentLanguage={currentLanguage}
        currentCurrency={currentCurrency}
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
        currentLanguage={currentLanguage}
        currentCurrency={currentCurrency}
      />
    </div>
  );
}
