import React from 'react';
import { Currency, Language } from '../types/trade';
import { EXCHANGE_RATES } from '../utils/currency';
import { Globe, PlusCircle, PhoneCall, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  currentLanguage: Language;
  onLanguageChange: (l: Language) => void;
  onOpenRFQ: () => void;
  onOpenAddProduct: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  currentLanguage,
  onLanguageChange,
  onOpenRFQ,
  onOpenAddProduct,
  onNavigate,
  activeSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Utility Belt (Hotline, Currency, Language, Office) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="hidden sm:inline">Port of Chattogram, Bangladesh</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5 text-slate-200">
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
              <a href="tel:+8801688578244" className="hover:text-white transition-colors font-mono">
                +880 1688-578244
              </a>
              <span className="text-slate-600">/</span>
              <a href="tel:+8801608971790" className="hover:text-white transition-colors font-mono">
                01608971790
              </a>
            </div>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <a href="mailto:info@ukbgt.biz" className="hidden md:inline text-slate-300 hover:text-white font-mono transition-colors">
              info@ukbgt.biz
            </a>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Currency Selector */}
            <div className="flex items-center gap-1 text-slate-300">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Currency:</span>
              <div className="relative inline-block">
                <select
                  value={currentCurrency}
                  onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                  className="bg-slate-800 text-white text-xs rounded border border-slate-700 py-0.5 px-2 pr-6 appearance-none focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
                >
                  {(Object.keys(EXCHANGE_RATES) as Currency[]).map((cur) => (
                    <option key={cur} value={cur}>
                      {cur} ({EXCHANGE_RATES[cur].symbol.trim()})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Language Switch */}
            <div className="flex items-center gap-1 bg-slate-800 rounded p-0.5 border border-slate-700">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 text-xs rounded transition-colors whitespace-nowrap ${
                  currentLanguage === 'en'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('bn')}
                className={`px-2 py-0.5 text-xs rounded transition-colors whitespace-nowrap ${
                  currentLanguage === 'bn'
                    ? 'bg-amber-600 text-white font-semibold font-bn'
                    : 'text-slate-400 hover:text-white font-bn'
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Add Product Shortcut for Merchant */}
            <button
              onClick={onOpenAddProduct}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors ml-1 font-medium whitespace-nowrap"
              title="Add or update items as new shipments or stocks arrive"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones (Brand — Links — Primary CTA) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-gradient-to-b from-emerald-600 to-amber-600 rounded-xs shrink-0" />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
              UK Bangla Global Trade
            </span>
          </div>
        </button>

        {/* Zone 2: 4–5 concise single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              activeSection === 'catalog' ? 'text-amber-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            {currentLanguage === 'en' ? 'Product Catalog' : 'পণ্য সম্ভার'}
          </button>
          <button
            onClick={() => onNavigate('tracking')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              activeSection === 'tracking' ? 'text-amber-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            {currentLanguage === 'en' ? 'Live Tracking' : 'লাইভ ট্র্যাকিং'}
          </button>
          <button
            onClick={() => onNavigate('converter')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              activeSection === 'converter' ? 'text-amber-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            {currentLanguage === 'en' ? 'Currency Tool' : 'মুদ্রা রূপান্তর'}
          </button>
          <button
            onClick={() => onNavigate('trade-hub')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              activeSection === 'trade-hub' ? 'text-amber-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            {currentLanguage === 'en' ? 'Chattogram Hub' : 'চট্টগ্রাম ট্রেড হাব'}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
              activeSection === 'contact' ? 'text-amber-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            {currentLanguage === 'en' ? 'Contact' : 'যোগাযোগ'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRFQ}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            {currentLanguage === 'en' ? 'Request Quotation' : 'কোটেশন চাই'}
          </button>
        </div>
      </div>
    </header>
  );
};
