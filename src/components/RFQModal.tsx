import React, { useState, useEffect } from 'react';
import { Product, Language, Currency } from '../types/trade';
import { formatCurrency } from '../utils/currency';
import { getT } from '../utils/translations';
import { 
  X, 
  Send, 
  MessageSquare, 
  Mail, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Anchor 
} from 'lucide-react';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
  products: Product[];
  currentLanguage: Language;
  currentCurrency: Currency;
}

export const RFQModal: React.FC<RFQModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  products,
  currentLanguage,
  currentCurrency,
}) => {
  if (!isOpen) return null;

  const t = getT(currentLanguage);

  const [productId, setProductId] = useState<string>(selectedProduct?.id || products[0]?.id || '');
  const [buyerName, setBuyerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [destinationPort, setDestinationPort] = useState('Port of Felixstowe / London Gateway');
  const [targetQuantity, setTargetQuantity] = useState('1 x 20ft FCL Container');
  const [incoterm, setIncoterm] = useState('FOB Chattogram Port');
  const [paymentTerm, setPaymentTerm] = useState('Irrevocable L/C at Sight');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setProductId(selectedProduct.id);
    }
  }, [selectedProduct]);

  const currentProduct = products.find((p) => p.id === productId) || products[0];

  const generateQuoteText = () => {
    return `*UK Bangla Global Trade - Request for Quotation (RFQ)*
----------------------------------------------
*Target Commodity:* ${currentProduct?.name || 'General Commodity'}
*HS Code:* ${currentProduct?.hsCode || 'N/A'}
*Origin:* Port of Chattogram, Bangladesh
*Target Quantity:* ${targetQuantity}
*Preferred Incoterm:* ${incoterm}
*Payment Term:* ${paymentTerm}
*Destination Port:* ${destinationPort}, ${country}

*Buyer Details:*
*Name:* ${buyerName || 'Buyer'}
*Company:* ${companyName || 'N/A'}
*Email:* ${email || 'N/A'}
*WhatsApp/Phone:* ${phone || 'N/A'}

*Special Requirements / Notes:*
${notes || 'Standard export packaging and PSI inspection requested.'}
----------------------------------------------
Sent via UK Bangla Global Trade Portal (info@ukbgt.biz | +880 1688-578244)`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateQuoteText());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(generateQuoteText());
    window.open(`https://wa.me/8801688578244?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`B2B Quotation Request: ${currentProduct?.name} [${companyName || buyerName}]`);
    const body = encodeURIComponent(generateQuoteText());
    window.location.href = `mailto:info@ukbgt.biz?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-0.5">
              UK Bangla Global Trade · Chattogram Desk
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Request Proforma Quotation (RFQ)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {/* Target Product Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Select Commodity / Product Line *
              </label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ${p.priceUSD.toFixed(2)} {p.unit}
                  </option>
                ))}
              </select>
              {currentProduct && (
                <div className="mt-1 text-xs text-slate-500 flex items-center gap-2">
                  <span>Base FOB Price: <strong className="text-slate-900 font-mono">{formatCurrency(currentProduct.priceUSD, currentCurrency)}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>HS: {currentProduct.hsCode}</span>
                </div>
              )}
            </div>

            {/* Buyer Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. David Harrison"
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Global Imports Ltd."
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Corporate Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="purchasing@company.co.uk"
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  WhatsApp / Direct Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7911 123456 or +880 1..."
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Logistics & Shipment Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Buyer Country *
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Port of Discharge *
                </label>
                <input
                  type="text"
                  required
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  placeholder="Felixstowe, Hamburg, Jebel Ali..."
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Target Quantity *
                </label>
                <input
                  type="text"
                  required
                  value={targetQuantity}
                  onChange={(e) => setTargetQuantity(e.target.value)}
                  placeholder="e.g. 5,000 Pairs / 2x20ft FCL"
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Requested Incoterm
                </label>
                <select
                  value={incoterm}
                  onChange={(e) => setIncoterm(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                >
                  <option value="FOB Chattogram Port">FOB Port of Chattogram (CPA)</option>
                  <option value="CIF Destination Port">CIF Destination Port (Insurance & Freight Included)</option>
                  <option value="CFR Destination Port">CFR Destination Port (Cost and Freight)</option>
                  <option value="EXW Factory">EXW Factory / Warehouse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Preferred Payment Term
                </label>
                <select
                  value={paymentTerm}
                  onChange={(e) => setPaymentTerm(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                >
                  <option value="Irrevocable L/C at Sight">Irrevocable Letter of Credit (L/C at Sight)</option>
                  <option value="T/T Wire Transfer (30% Advance + 70% against B/L)">T/T Wire Transfer (30% Advance / 70% against B/L copy)</option>
                  <option value="Documents against Payment (DP)">Cash Against Documents (CAD / DP)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Custom Specs / Private Label / Packaging Requests
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention custom branding, sizing distribution, moisture limits, or sample approval timeline..."
                className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Official quotation generated via info@ukbgt.biz
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all"
                >
                  Generate Quotation Request
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation & Multi-channel Dispatch View */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-emerald-900">
                  Quotation Request Prepared Successfully!
                </h3>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your inquiry summary has been formatted for the UK Bangla Global Trade commercial desk in Chattogram.
                </p>
              </div>
            </div>

            {/* Formatted Proforma Text Box */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                <span>Formal Inquiry Summary:</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Copied!' : 'Copy to Clipboard'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                {generateQuoteText()}
              </pre>
            </div>

            {/* Direct Send Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via WhatsApp (+880 1688-578244)</span>
              </button>

              <button
                type="button"
                onClick={handleEmailSend}
                className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email Official Desk (info@ukbgt.biz)</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                ← Edit Inquiry Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
