import React from 'react';
import { Language } from '../types/trade';
import { getT } from '../utils/translations';
import { MapPin, PhoneCall, Mail, Anchor, PlusCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  currentLanguage: Language;
  onNavigate: (sectionId: string) => void;
  onOpenAddProduct: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage, onNavigate, onOpenAddProduct }) => {
  const t = getT(currentLanguage);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Wordmark & Company Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-gradient-to-b from-emerald-600 to-amber-600 rounded-xs shrink-0" />
              <span className="text-xl font-bold tracking-tight text-white">
                UK Bangla Global Trade
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Registered international trading house operating from Chattogram, Bangladesh. Specialized in sourcing, quality control, export logistics, and global distribution of premier Bangladeshi commodities and manufactured goods.
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-300">
              <Anchor className="w-4 h-4 text-amber-500" />
              <span>Direct access to Port of Chattogram (CPA)</span>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenAddProduct}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add / Manage Product Inventory</span>
              </button>
            </div>
          </div>

          {/* Col 2: Core Commodity Portfolios (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Export Portfolios
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors text-left">
                  Handcrafted Footwear & Shoes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors text-left">
                  Full-Grain Leather Bags & Briefcases
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors text-left">
                  Combed Cotton Institutional Towels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors text-left">
                  Sylhet Valley Orthodox & CTC Tea
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors text-left">
                  Flue-Cured Virginia (FCV) Tobacco Leaf
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors text-left">
                  Raw Golden Jute & Twisted Spun Yarn
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors text-left">
                  Heavy-Duty Solar Tubular & Car Batteries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Logistics & Tools (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Trade Logistics
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('tracking')} className="hover:text-white transition-colors">
                  Container Live Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('converter')} className="hover:text-white transition-colors">
                  Currency Conversion Tool
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-hub')} className="hover:text-white transition-colors">
                  Chattogram Trade Corridor
                </button>
              </li>
              <li>
                <span className="text-slate-500">Incoterms 2020 Standards</span>
              </li>
              <li>
                <span className="text-slate-500">Letter of Credit (L/C at Sight)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Physical Office & Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Chattogram Head Office
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-slate-300">
                  University Gate, Hathazari Zero Point, Chattogram, Bangladesh
                </span>
              </div>

              <div className="flex items-start gap-2 font-mono">
                <PhoneCall className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+8801688578244" className="text-slate-200 hover:text-white transition-colors">
                    +880 1688-578244
                  </a>
                  <a href="tel:+8801608971790" className="text-slate-200 hover:text-white transition-colors">
                    01608971790
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 font-mono">
                <Mail className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a href="mailto:info@ukbgt.biz" className="text-amber-400 hover:text-white transition-colors">
                    info@ukbgt.biz
                  </a>
                  <a href="mailto:ukbgt2020@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                    ukbgt2020@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} UK Bangla Global Trade. All rights reserved. Chattogram, Bangladesh.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
