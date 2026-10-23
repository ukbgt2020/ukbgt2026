import React, { useState } from 'react';
import { Currency, Language, Product } from '../types/trade';
import { EXCHANGE_RATES, formatCurrency, convertPrice } from '../utils/currency';
import { getT } from '../utils/translations';
import { Calculator, ArrowRightLeft, DollarSign, Layers, TrendingUp, Info } from 'lucide-react';

interface CurrencyConverterProps {
  currentLanguage: Language;
  products: Product[];
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ currentLanguage, products }) => {
  const t = getT(currentLanguage);

  // Simple direct converter state
  const [baseAmount, setBaseAmount] = useState<string>('10000');
  const [sourceCurrency, setSourceCurrency] = useState<Currency>('USD');

  // Trade volume calculator state
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [orderQuantity, setOrderQuantity] = useState<string>('1000');
  const [incotermType, setIncotermType] = useState<'FOB' | 'CIF'>('FOB');

  const currencies: Currency[] = ['USD', 'BDT', 'GBP', 'EUR', 'AED', 'RMB'];

  // Convert input base amount to USD first, then to all target currencies
  const parsedAmount = parseFloat(baseAmount) || 0;
  const amountInUSD = parsedAmount / EXCHANGE_RATES[sourceCurrency].rateAgainstUSD;

  // Cargo volume calculations
  const chosenProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const qtyNumber = parseFloat(orderQuantity) || 0;
  const unitPriceUSD = chosenProduct ? chosenProduct.priceUSD : 0;
  const rawTotalUSD = unitPriceUSD * qtyNumber;
  const freightAdjustment = incotermType === 'CIF' ? 1.08 : 1.0; // 8% estimated ocean freight/insurance
  const finalCargoUSD = rawTotalUSD * freightAdjustment;

  return (
    <section id="converter" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            {currentLanguage === 'en' ? 'International Financial Settlement' : 'আন্তর্জাতিক আর্থিক হিসাব'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.converterHeading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.converterSubheading}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tool 1: Instant Multi-Currency Converter */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    Live Multi-Currency Matrix
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  Base Reference: 1 USD = ৳122.50 BDT
                </span>
              </div>

              {/* Source Input */}
              <div className="mt-6">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Enter Trading Amount & Select Source Currency:
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">
                      {EXCHANGE_RATES[sourceCurrency].symbol}
                    </span>
                    <input
                      type="number"
                      value={baseAmount}
                      onChange={(e) => setBaseAmount(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 text-lg font-bold font-mono pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  <select
                    value={sourceCurrency}
                    onChange={(e) => setSourceCurrency(e.target.value as Currency)}
                    className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg focus:outline-none cursor-pointer"
                  >
                    {currencies.map((c) => (
                      <option key={c} value={c}>
                        {c} - {EXCHANGE_RATES[c].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Currencies Output Grid */}
              <div className="mt-6">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Converted Equivalents in Real-Time:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {currencies.map((cur) => {
                    const converted = convertPrice(amountInUSD, cur);
                    const isSource = cur === sourceCurrency;

                    return (
                      <div
                        key={cur}
                        className={`p-3 rounded-xl border ${
                          isSource
                            ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400/30'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span className="font-semibold text-slate-700">{cur}</span>
                          <span className="font-mono text-[11px]">{EXCHANGE_RATES[cur].name.split(' ')[0]}</span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-slate-900 font-mono tabular-nums truncate">
                          {formatCurrency(amountInUSD, cur)}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          1 USD = {EXCHANGE_RATES[cur].rateAgainstUSD} {cur}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                Benchmark exchange rates are updated for international trade letters of credit (L/C) and wire settlements.
              </span>
            </div>
          </div>

          {/* Tool 2: Cargo & Shipment Order Value Estimator */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Cargo Volume & Container Value Estimator
                  </h3>
                </div>
                <span className="text-xs text-emerald-400 font-mono">
                  Incoterms 2020 Standard
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {/* Select Product */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Select Target Commodity:
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full bg-slate-800 text-white text-xs sm:text-sm rounded-lg border border-slate-700 px-3 py-2.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ${p.priceUSD.toFixed(2)} {p.unit}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity and Incoterm */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Order Quantity:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(e.target.value)}
                      className="w-full bg-slate-800 text-white text-sm font-mono rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Trade Term (Incoterm):
                    </label>
                    <select
                      value={incotermType}
                      onChange={(e) => setIncotermType(e.target.value as 'FOB' | 'CIF')}
                      className="w-full bg-slate-800 text-white text-sm rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="FOB">FOB Chattogram Port</option>
                      <option value="CIF">CIF Global Port (+Ocean Freight/Ins)</option>
                    </select>
                  </div>
                </div>

                {/* Result Callout */}
                <div className="mt-6 p-4 bg-slate-800/90 rounded-xl border border-slate-700 space-y-3">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    Estimated Consignment Value ({incotermType}):
                  </div>

                  <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono tabular-nums">
                    ${finalCargoUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </div>

                  {/* Multi-currency breakdown for this container */}
                  <div className="pt-3 border-t border-slate-700/80 grid grid-cols-3 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">IN BDT (৳):</span>
                      <strong className="text-white">{formatCurrency(finalCargoUSD, 'BDT')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">IN GBP (£):</span>
                      <strong className="text-white">{formatCurrency(finalCargoUSD, 'GBP')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">IN EUR (€):</span>
                      <strong className="text-white">{formatCurrency(finalCargoUSD, 'EUR')}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs text-slate-400">
              Selected: <strong className="text-white">{chosenProduct?.name}</strong> · Base FOB Unit: ${chosenProduct?.priceUSD.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
