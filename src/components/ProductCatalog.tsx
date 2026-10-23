import React, { useState, useMemo } from 'react';
import { Product, Currency, Language, ProductAvailability } from '../types/trade';
import { formatCurrency } from '../utils/currency';
import { getT } from '../utils/translations';
import { 
  Search, 
  Plus, 
  ArrowRight, 
  SlidersHorizontal, 
  Box, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Layers,
  FileSpreadsheet
} from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  currentCurrency: Currency;
  currentLanguage: Language;
  onSelectProduct: (product: Product) => void;
  onOpenRFQForProduct: (product: Product) => void;
  onOpenAddProduct: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currentCurrency,
  currentLanguage,
  onSelectProduct,
  onOpenRFQForProduct,
  onOpenAddProduct,
}) => {
  const t = getT(currentLanguage);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'footwear', label: t.filterFootwear },
    { id: 'leather', label: t.filterLeather },
    { id: 'towels', label: t.filterTowels },
    { id: 'tea', label: t.filterTea },
    { id: 'tobacco', label: t.filterTobacco },
    { id: 'jute', label: t.filterJute },
    { id: 'battery', label: t.filterBattery },
    { id: 'raw_materials', label: t.filterRaw },
  ];

  const statusFilters = [
    { id: 'all', label: t.statusAll },
    { id: 'in_stock', label: t.statusInStock },
    { id: 'sourcing_available', label: t.statusSourcing },
    { id: 'sampling_ready', label: t.statusSampling },
    { id: 'pipeline_upcoming', label: t.statusPipeline },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Status match
      if (selectedStatus !== 'all' && item.availability !== selectedStatus) {
        return false;
      }
      // Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q) || item.nameBn.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q) || item.descriptionBn.toLowerCase().includes(q);
        const matchesHs = item.hsCode.toLowerCase().includes(q);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesHs && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, selectedStatus, searchQuery]);

  const getStatusText = (status: ProductAvailability) => {
    switch (status) {
      case 'in_stock':
        return currentLanguage === 'en' ? 'In Stock (Ready to Ship)' : 'স্টকে আছে (রপ্তানি উপযোগী)';
      case 'sourcing_available':
        return currentLanguage === 'en' ? 'Custom Sourcing / MTO' : 'সোর্সিং / অর্ডারভিত্তিক';
      case 'sampling_ready':
        return currentLanguage === 'en' ? 'Sample Ready for Evaluation' : 'নমুনা (স্যাম্পল) প্রস্তুত';
      case 'pipeline_upcoming':
        return currentLanguage === 'en' ? 'Upcoming Pipeline' : 'আসন্ন নতুন পণ্য';
      default:
        return status;
    }
  };

  const getStatusColor = (status: ProductAvailability) => {
    switch (status) {
      case 'in_stock':
        return 'text-emerald-700 font-medium';
      case 'sourcing_available':
        return 'text-blue-700 font-medium';
      case 'sampling_ready':
        return 'text-amber-700 font-medium';
      case 'pipeline_upcoming':
        return 'text-slate-600 font-medium';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <section id="catalog" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
              {currentLanguage === 'en' ? 'B2B Trade & Export Catalog' : 'রপ্তানি ও আমদানি ক্যাটালগ'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {t.catalogHeading}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              {t.catalogSubheading}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddProduct}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>{t.addNewProduct}</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLanguage === 'en' ? 'Search by commodity, HS code (e.g. 5303), specification...' : 'পণ্য, এইচএস কোড বা বিবরণ অনুসন্ধান করুন...'}
                className="w-full bg-white text-slate-900 text-sm rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Inventory Status Selector */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-300 shadow-xs">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-xs text-slate-500 whitespace-nowrap">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer pr-2"
              >
                {statusFilters.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Category Tabs (Segmented control per frontend-design) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Active Filter Metadata */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900 font-mono tabular-nums">{filteredProducts.length}</strong> of{' '}
            <span className="font-mono tabular-nums">{products.length}</span> commodities
          </div>
          <div className="flex items-center gap-2">
            <span>Prices displayed in:</span>
            <strong className="text-slate-800 font-semibold">{currentCurrency}</strong>
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const formattedPrice = formatCurrency(product.priceUSD, currentCurrency);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden hover:-translate-y-0.5 hover:shadow-md group"
                >
                  {/* Lead Image Slot (65-75% visual weight on neutral backdrop) */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      /* Styled CSS/SVG Fallback Container per Zero-Broken-Image Policy */
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500">
                        <Box className="w-10 h-10 text-slate-400 mb-2 stroke-[1.5]" />
                        <span className="text-xs font-semibold text-slate-700 line-clamp-1">{product.name}</span>
                        <span className="text-[11px] text-slate-500 mt-1">Chattogram Export Batch</span>
                      </div>
                    )}

                    {/* Quiet Top Status Tag (subtle text, strictly unboxed per zero-pill) */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs border border-slate-200/60 shadow-xs">
                      <span className={getStatusColor(product.availability)}>
                        {getStatusText(product.availability)}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-slate-950/80 text-white px-2 py-0.5 rounded text-[11px] font-mono">
                      HS {product.hsCode}
                    </div>
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet category and origin unboxed metadata with separators */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                        <span className="font-medium text-amber-800">
                          {currentLanguage === 'en' ? product.categoryLabel : product.categoryLabelBn}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{product.origin.split(',')[0]}</span>
                      </div>

                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                        {currentLanguage === 'en' ? product.name : product.nameBn}
                      </h3>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {currentLanguage === 'en' ? product.description : product.descriptionBn}
                      </p>
                    </div>

                    {/* Specifications & Price Baseline */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      {/* MOQ and Lead Time */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <div>
                          <span>MOQ: </span>
                          <strong className="text-slate-800 font-mono">
                            {currentLanguage === 'en' ? product.moq : product.moqBn}
                          </strong>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400">Lead: </span>
                          <span className="text-slate-700">{product.leadTime.split(' ')[0]} {product.leadTime.split(' ')[1]}</span>
                        </div>
                      </div>

                      {/* Tabular Price */}
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-[11px] text-slate-400 block uppercase tracking-wider">
                            FOB Chattogram Port:
                          </span>
                          <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                            {formattedPrice}
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">
                          {currentLanguage === 'en' ? product.unit : product.unitBn}
                        </span>
                      </div>

                      {/* Card Action Handlers */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-colors rounded-lg text-center"
                        >
                          {t.viewSpecs}
                        </button>
                        <button
                          onClick={() => onOpenRFQForProduct(product)}
                          className="px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-colors rounded-lg text-center flex items-center justify-center gap-1 shadow-xs"
                        >
                          <span>{t.requestQuote}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="mt-12 p-12 text-center bg-white rounded-xl border border-slate-200">
            <Box className="w-12 h-12 text-slate-400 mx-auto mb-3 stroke-[1.5]" />
            <h3 className="text-base font-semibold text-slate-900">No commodities found matching current filters</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
              Try resetting your search query or status filter, or add a newly arrived stock batch to the catalog.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={onOpenAddProduct}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
