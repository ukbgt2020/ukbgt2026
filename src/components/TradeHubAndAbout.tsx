import React from 'react';
import { Language } from '../types/trade';
import { getT } from '../utils/translations';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  Anchor, 
  ShieldCheck, 
  Globe2, 
  MessageSquare,
  Building2,
  FileCheck2,
  Award
} from 'lucide-react';

interface TradeHubAndAboutProps {
  currentLanguage: Language;
  onOpenRFQ: () => void;
}

export const TradeHubAndAbout: React.FC<TradeHubAndAboutProps> = ({ currentLanguage, onOpenRFQ }) => {
  const t = getT(currentLanguage);

  return (
    <section id="trade-hub" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            {currentLanguage === 'en' ? 'Strategic Maritime Hub' : 'কৌশলগত সামুদ্রিক বাণিজ্য হাব'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.tradeHubHeading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.tradeHubSubheading}
          </p>
        </div>

        {/* 2-Column Split: Chattogram Trade Logistics & Physical Head Office */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Maritime Gateway Advantages */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-4">
              <p>
                <strong className="text-slate-900 font-semibold">Chattogram (Chittagong)</strong> is Bangladesh’s commercial capital and the undisputed engine of its export economy. Home to the busiest seaport in the Bay of Bengal, the Port of Chattogram handles over <strong>92% of the nation’s international maritime container traffic</strong>, connecting direct feeder liners to transshipment super-hubs in Colombo, Singapore, Port Klang, and Tanjung Pelepas for onward global distribution to the United Kingdom, European Union, North America, and the Middle East.
              </p>
              <p>
                From our corporate headquarters at <strong>University Gate, Hathazari Zero Point</strong>, UK Bangla Global Trade maintains direct on-the-ground access to:
              </p>
            </div>

            {/* Logistics Infrastructure Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Anchor className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Chattogram Port Authority (CPA)</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Fast berthing, 24/7 automated customs EDI, and container freight stations (CFS) for full container (FCL) and consolidated (LCL) exports.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>CEPZ & Industrial Tanneries</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Proximity to Chittagong Export Processing Zone, leather finishing clusters, jute baling presses, and battery manufacturing belts.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <FileCheck2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Complete Export Documentation</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Chamber of Commerce Certificate of Origin, Phytosanitary certificates for tea & tobacco, BSTI certification, and commercial invoicing.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Award className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Banking & Financial Settlement</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Full compliance with Bangladesh Bank foreign exchange regulations, Letter of Credit (L/C at sight), and telegraphic wire transfers (T/T).
                </p>
              </div>
            </div>

            {/* Strategic Product Distribution Lines */}
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs">
              <span className="font-semibold text-amber-900 block mb-1">
                Core International Distribution Focus:
              </span>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                Footwear · Handcrafted Leather Bags · Combed Cotton Hotel Towels · Sylhet Valley Orthodox & CTC Tea · Virginia Cured Tobacco · Raw Golden Jute Fiber & Spun Yarn · Industrial Solar Tubular & Automotive Batteries · Bulk Raw Materials Sourcing.
              </p>
            </div>
          </div>

          {/* Right Column: Physical Office Card & Direct Lines */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
                <span>HEAD OFFICE & TRADING DESK</span>
                <span aria-hidden="true">·</span>
                <span>CHATTOGRAM, BANGLADESH</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                UK Bangla Global Trade
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Registered International Trading House & Logistics Coordinator
              </p>
            </div>

            {/* Physical Address */}
            <div className="space-y-4 text-xs pt-4 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Office Location:</span>
                  <div className="text-white font-medium text-sm mt-0.5">
                    University Gate, Hathazari Zero Point, Chattogram, Bangladesh
                  </div>
                  <span className="text-slate-400 text-[11px] block mt-0.5">
                    Postal Code 4330 · Hathazari Upazila · Chattogram District
                  </span>
                </div>
              </div>

              {/* Direct Hotlines */}
              <div className="flex items-start gap-3">
                <PhoneCall className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Direct Trading Hotlines:</span>
                  <div className="flex flex-col gap-1 mt-1 font-mono text-sm">
                    <a
                      href="tel:+8801688578244"
                      className="text-white hover:text-amber-400 transition-colors font-semibold"
                    >
                      +880 1688-578244
                    </a>
                    <a
                      href="tel:+8801608971790"
                      className="text-white hover:text-amber-400 transition-colors font-semibold"
                    >
                      +880 1608-971790
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Official Inquiries & Documentation:</span>
                  <div className="flex flex-col gap-1 mt-1 font-mono text-sm">
                    <a
                      href="mailto:info@ukbgt.biz"
                      className="text-amber-400 hover:text-white transition-colors font-semibold"
                    >
                      info@ukbgt.biz
                    </a>
                    <a
                      href="mailto:ukbgt2020@gmail.com"
                      className="text-slate-300 hover:text-white transition-colors text-xs"
                    >
                      ukbgt2020@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Trading Desk Hours:</span>
                  <div className="text-slate-200 text-xs mt-0.5">
                    Saturday – Thursday: 09:00 – 19:00 (BST / GMT+6)
                  </div>
                  <span className="text-slate-400 text-[11px]">
                    24/7 Monitoring for Active Vessel Containers & Emergency Inquiries
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: WhatsApp & RFQ */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <a
                href="https://wa.me/8801688578244?text=Hello%20UK%20Bangla%20Global%20Trade%2C%20I%20am%20interested%20in%20importing%20products%20from%20Chattogram."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition-all rounded-lg text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly on WhatsApp (+880 1688-578244)</span>
              </a>

              <button
                onClick={onOpenRFQ}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] transition-all rounded-lg text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Submit Formal Proforma RFQ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
