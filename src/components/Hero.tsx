import React from 'react';
import { Language } from '../types/trade';
import { getT } from '../utils/translations';
import { Anchor, ArrowUpRight, Search, PlusCircle, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  currentLanguage: Language;
  onExploreCatalog: () => void;
  onTrackShipment: () => void;
  onOpenAddProduct: () => void;
  totalProductsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  currentLanguage,
  onExploreCatalog,
  onTrackShipment,
  onOpenAddProduct,
  totalProductsCount,
}) => {
  const t = getT(currentLanguage);

  return (
    <section id="hero" className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-amber-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet metadata kicker */}
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide mb-4">
              <span className="inline-flex items-center gap-1.5">
                <Anchor className="w-3.5 h-3.5 text-amber-400" />
                Chattogram Port Authority (CPA)
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Bay of Bengal Gateway</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>UK & Global Distribution</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] text-balance">
              {currentLanguage === 'en' ? (
                <>
                  International Trade Gateway from <span className="text-amber-400">Chattogram</span> to Global Markets
                </>
              ) : (
                <>
                  <span className="text-amber-400 font-bn">চট্টগ্রাম বন্দর</span> থেকে বিশ্ববাজারে নির্ভরযোগ্য আমদানি-রপ্তানি
                </>
              )}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {currentLanguage === 'en' ? (
                <>
                  <strong className="text-white font-semibold">UK Bangla Global Trade</strong> is a specialized international trading house operating from Chattogram, Bangladesh. We import and export high-grade raw materials and manufactured commodities including <span className="text-slate-100 font-medium">Footwear, Full-Grain Leather Bags, Institutional Towels, Premium Tea, Cured Tobacco, Jute Goods & Spun Yarn, and Heavy-Duty Batteries</span>.
                </>
              ) : (
                <span className="font-bn">
                  <strong className="text-white font-semibold">ইউকে বাংলা গ্লোবাল ট্রেড</strong> চট্টগ্রাম থেকে পরিচালিত আন্তর্জাতিক ট্রেডিং প্রতিষ্ঠান। আমরা আন্তর্জাতিক মানের পাদুকা, চামড়ার ব্যাগ, হোটেল তোয়ালে, সিলোন ও সিলেট চা, তামাক পাতা, পাট ও পাটের সুতা এবং হেভি-ডিউটি ব্যাটারির বিশ্বস্ত আমদানি ও রপ্তানিকারক।
                </span>
              )}
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all rounded-lg shadow-sm whitespace-nowrap"
              >
                <span>{currentLanguage === 'en' ? 'Explore Product Lines' : 'পণ্য তালিকা দেখুন'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onTrackShipment}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 active:scale-[0.98] transition-all rounded-lg whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>{currentLanguage === 'en' ? 'Live Container Tracking' : 'লাইভ কন্টেইনার ট্র্যাকিং'}</span>
              </button>

              <button
                onClick={onOpenAddProduct}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors rounded-lg whitespace-nowrap"
                title="Add new products or stock batches"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>{currentLanguage === 'en' ? 'Add Inventory' : 'নতুন পণ্য যোগ'}</span>
              </button>
            </div>

            {/* Location & Quick Contact Indicator */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>University Gate, Hathazari Zero Point, Chattogram</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1">
                <span>Active Catalog:</span>
                <strong className="text-white font-mono">{totalProductsCount} Line Items</strong>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>FOB CPA & CIF Settlement</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Port Terminal & Shipment Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              {/* Media element with robust fallback */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden bg-slate-800">
                <img
                  src="/src/assets/images/hero_chattogram_port_1792766061641.jpg"
                  alt="Port of Chattogram Container Terminal"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Zero broken image policy fallback
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Contrast gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Overlaid Port Details */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1 font-mono">
                    <span className="text-amber-400 font-semibold">PORT OF CHATTOGRAM (CGP)</span>
                    <span className="text-slate-400">22.3275° N, 91.8155° E</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    Primary deep-water maritime terminal handling {'>'}90% of Bangladesh’s international ocean freight to the UK, Europe & Americas.
                  </p>
                </div>
              </div>

              {/* Live Trade Hub Quick Strip */}
              <div className="p-4 bg-slate-900/95 border-t border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">Next Vessel Departure:</span>
                  <span className="text-white font-medium">Direct Feeder to Colombo & Singapore</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Export Documentation:</span>
                  <span className="text-emerald-400 font-medium">EPB / Chamber Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Trust & Trade Capabilities Row (below hero split) */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">90%+</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-300">National Cargo Terminal</div>
            <div className="mt-0.5 text-xs text-slate-500">Port of Chattogram logistics access</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">6 Currencies</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-300">Multi-Currency Settlement</div>
            <div className="mt-0.5 text-xs text-slate-500">USD, GBP, BDT, EUR, AED, RMB</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">Full B2B RFQ</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-300">FOB & CIF Invoicing</div>
            <div className="mt-0.5 text-xs text-slate-500">Letter of Credit (L/C) & T/T terms</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">Live Milestones</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-300">End-to-End Tracking</div>
            <div className="mt-0.5 text-xs text-slate-500">B/L, Container & Air Freight status</div>
          </div>
        </div>
      </div>
    </section>
  );
};
