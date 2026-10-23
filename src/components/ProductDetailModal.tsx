import React from 'react';
import { Product, Currency, Language } from '../types/trade';
import { formatCurrency, convertPrice, EXCHANGE_RATES } from '../utils/currency';
import { getT } from '../utils/translations';
import { 
  X, 
  ArrowRight, 
  Anchor, 
  ShieldCheck, 
  Check, 
  Layers, 
  Clock, 
  Box, 
  Globe2,
  FileText
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currentCurrency: Currency;
  currentLanguage: Language;
  onOpenRFQ: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currentCurrency,
  currentLanguage,
  onOpenRFQ,
}) => {
  if (!product) return null;

  const t = getT(currentLanguage);
  const formattedPrice = formatCurrency(product.priceUSD, currentCurrency);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-amber-700">
                {currentLanguage === 'en' ? product.categoryLabel : product.categoryLabelBn}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">HS Code: {product.hsCode}</span>
              <span aria-hidden="true">·</span>
              <span>Port of Chattogram Origin</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {currentLanguage === 'en' ? product.name : product.nameBn}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Product Image & Port Indicator */}
            <div className="md:col-span-5 space-y-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100 text-slate-500">
                    <Box className="w-12 h-12 text-slate-400 mb-2" />
                    <span className="text-xs font-semibold text-slate-700">{product.name}</span>
                    <span className="text-[11px] text-slate-500 mt-1">Export Ready Inspection Verified</span>
                  </div>
                )}
              </div>

              {/* Port & Logistics Anchor Callout */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <Anchor className="w-4 h-4 text-amber-700" />
                  <span>Port of Loading: Chattogram (CPA)</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Inspected and cleared via Chittagong Port Authority. Phytosanitary, Certificate of Origin (Chamber of Commerce), and Export Promotion Bureau (EPB) compliant.
                </p>
              </div>

              {/* Multi-Currency Price Matrix */}
              <div className="p-3.5 bg-slate-900 text-white rounded-xl text-xs space-y-2">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  Live Multi-Currency Price Estimates:
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div>USD: <strong className="text-white">${product.priceUSD.toFixed(2)}</strong></div>
                  <div>BDT: <strong className="text-amber-400">{formatCurrency(product.priceUSD, 'BDT')}</strong></div>
                  <div>GBP: <strong className="text-emerald-400">{formatCurrency(product.priceUSD, 'GBP')}</strong></div>
                  <div>EUR: <strong className="text-blue-400">{formatCurrency(product.priceUSD, 'EUR')}</strong></div>
                </div>
              </div>
            </div>

            {/* Right: Technical Specs & Commercial Parameters */}
            <div className="md:col-span-7 space-y-5">
              {/* Pricing & MOQ Highlight */}
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-900 font-medium block">
                    FOB Chattogram Port Price:
                  </span>
                  <div className="text-2xl font-bold text-slate-950 font-mono tabular-nums">
                    {formattedPrice}
                  </div>
                  <span className="text-xs text-slate-600">
                    {currentLanguage === 'en' ? product.unit : product.unitBn}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Min. Order (MOQ):</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {currentLanguage === 'en' ? product.moq : product.moqBn}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Lead: {product.leadTime}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                  Overview & Product Standard
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentLanguage === 'en' ? product.description : product.descriptionBn}
                </p>
              </div>

              {/* Detailed Technical Specifications Table */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  Technical Specifications
                </h4>
                <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-slate-50/50">
                        <td className="py-2.5 px-3 font-medium text-slate-500 w-1/3">HS Tariff Code</td>
                        <td className="py-2.5 px-3 text-slate-900 font-mono">{product.hsCode}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-500">Origin / Facility</td>
                        <td className="py-2.5 px-3 text-slate-900">{product.origin}</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-2.5 px-3 font-medium text-slate-500">Packaging Standard</td>
                        <td className="py-2.5 px-3 text-slate-900">{product.packaging}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-500">Supported Incoterms</td>
                        <td className="py-2.5 px-3 text-slate-900">{product.incoterms.join(' · ')}</td>
                      </tr>
                      {product.keySpecs.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50' : ''}>
                          <td className="py-2.5 px-3 font-medium text-slate-500">
                            {currentLanguage === 'en' ? spec.label : spec.labelBn}
                          </td>
                          <td className="py-2.5 px-3 text-slate-900 font-medium">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Pre-Shipment Inspection (PSI)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Export Promotion Bureau Registered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Official inquiry will be processed by UK Bangla Global Trade Chattogram desk.
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenRFQ(product);
              }}
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <span>{t.requestQuote} for this Item</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
