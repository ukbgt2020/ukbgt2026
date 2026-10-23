import React, { useState } from 'react';
import { Product, ProductAvailability, Language, Currency } from '../types/trade';
import { formatCurrency } from '../utils/currency';
import { X, Plus, Trash2, Upload, AlertCircle, Check, Info } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  currentLanguage: Language;
  currentCurrency: Currency;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  currentLanguage,
  currentCurrency,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [category, setCategory] = useState<Product['category']>('footwear');
  const [availability, setAvailability] = useState<ProductAvailability>('in_stock');
  const [priceUSD, setPriceUSD] = useState<string>('25.00');
  const [unit, setUnit] = useState('per Piece (FOB Chattogram)');
  const [moq, setMoq] = useState('500 Units');
  const [hsCode, setHsCode] = useState('6403.59.00');
  const [origin, setOrigin] = useState('Chattogram, Bangladesh');
  const [leadTime, setLeadTime] = useState('25-35 Days');
  const [packaging, setPackaging] = useState('5-Ply Export Master Carton');
  const [description, setDescription] = useState('');
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>(
    '/src/assets/images/product_export_footwear_1792766078827.jpg'
  );
  const [customImageURL, setCustomImageURL] = useState('');
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([
    { label: 'Export Grade', value: 'Commercial Grade A' },
    { label: 'Port of Loading', value: 'Port of Chattogram (CPA)' },
  ]);

  const presetImages = [
    { label: 'Footwear', url: '/src/assets/images/product_export_footwear_1792766078827.jpg' },
    { label: 'Leather Bags', url: '/src/assets/images/product_leather_bag_1792766063441.jpg' },
    { label: 'Golden Jute', url: '/src/assets/images/product_golden_jute_1792766078832.jpg' },
    { label: 'Tea Harvest', url: '/src/assets/images/product_premium_tea_1792766063843.jpg' },
    { label: 'Industrial Battery', url: '/src/assets/images/product_industrial_battery_1792766063599.jpg' },
  ];

  const handleAddSpec = () => {
    setSpecs([...specs, { label: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleUpdateSpec = (index: number, field: 'label' | 'value', val: string) => {
    const next = [...specs];
    next[index][field] = val;
    setSpecs(next);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomImageURL(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const numericPrice = parseFloat(priceUSD) || 10.0;

    const categoryLabels: Record<Product['category'], { en: string; bn: string }> = {
      footwear: { en: 'Footwear & Shoes', bn: 'পাদুকা ও জুতো' },
      leather: { en: 'Leather Bags & Goods', bn: 'চামড়ার ব্যাগ ও সামগ্রী' },
      towels: { en: 'Towels & Home Textiles', bn: 'তোয়ালে ও টেক্সটাইল' },
      tea: { en: 'Tea & Agro Commodities', bn: 'চা পাতা ও কৃষি পণ্য' },
      tobacco: { en: 'Tobacco & Leaves', bn: 'তামাক ও তামাক পাতা' },
      jute: { en: 'Jute Goods & Jute Yarn', bn: 'পাট ও পাটের সুতা' },
      battery: { en: 'Industrial Batteries', bn: 'শিল্প ও সোলার ব্যাটারি' },
      raw_materials: { en: 'Raw Materials & Fibers', bn: 'কাঁচামাল ও ফাইবার' },
    };

    const finalImage = customImageURL.trim() || selectedPresetImage;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      nameBn: nameBn.trim() || name.trim(),
      category,
      categoryLabel: categoryLabels[category].en,
      categoryLabelBn: categoryLabels[category].bn,
      description: description.trim() || 'High quality export commodity supplied directly from Bangladesh.',
      descriptionBn: nameBn.trim() || description.trim(),
      hsCode: hsCode.trim() || '8400.00.00',
      origin: origin.trim() || 'Chattogram, Bangladesh',
      moq: moq.trim() || '1 Container / Batch',
      moqBn: moq.trim(),
      packaging: packaging.trim() || 'Standard Seaworthy Export Packaging',
      leadTime: leadTime.trim() || '20-30 Days',
      priceUSD: numericPrice,
      unit: unit.trim(),
      unitBn: unit.trim(),
      availability,
      keySpecs: specs
        .filter((s) => s.label.trim() && s.value.trim())
        .map((s) => ({
          label: s.label.trim(),
          labelBn: s.label.trim(),
          value: s.value.trim(),
        })),
      image: finalImage,
      incoterms: ['FOB Chattogram Port', 'CIF European / UK Ports', 'CFR Global', 'EXW Factory'],
      featured: false,
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-0.5">
              UK Bangla Global Trade · Inventory Portal
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Add New Product or Commodity Batch
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Add new lines as stock batches, raw materials, or samples become ready in Chattogram.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Section 1: Basic Commodity Identification */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 pb-1 border-b border-slate-100">
              01. Basic Identification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Product / Commodity Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Export Leather Safety Boots or Grade-A CTC Tea"
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Title in Bengali (বাংলা নাম)
                </label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="যেমন: প্রিমিয়াম এক্সপোর্ট চামড়ার জুতো"
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 font-bn focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Commodity Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Product['category'])}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                >
                  <option value="footwear">Footwear (Shoes, Boots, Soles)</option>
                  <option value="leather">Leather Bags & Goods</option>
                  <option value="towels">Towels & Home Textiles</option>
                  <option value="tea">Premium Tea & Agro</option>
                  <option value="tobacco">Tobacco & Cured Leaves</option>
                  <option value="jute">Jute Goods & Jute Yarn</option>
                  <option value="battery">Industrial & Solar Batteries</option>
                  <option value="raw_materials">Raw Materials & Custom Sourcing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Inventory Availability Status *
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as ProductAvailability)}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer font-medium"
                >
                  <option value="in_stock">In Stock & Ready for Export</option>
                  <option value="sourcing_available">Available for Sourcing / Made to Order</option>
                  <option value="sampling_ready">Pre-production Sample Ready</option>
                  <option value="pipeline_upcoming">Upcoming Pipeline (Not In Hand Yet)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Commodity Description & Quality Grade
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe material composition, certifications (BSTI, ISO), export finish, and target buyer benefits..."
                className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Section 2: Pricing & Export Commercials */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 pb-1 border-b border-slate-100">
              02. Pricing & Commercial Export Terms
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Base Price (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-mono">$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={priceUSD}
                    onChange={(e) => setPriceUSD(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg pl-7 pr-3 py-2 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                {/* Live converted estimate */}
                <div className="mt-1 text-[11px] text-slate-500">
                  Approx: {formatCurrency(parseFloat(priceUSD) || 0, currentCurrency)}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Price Unit *
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. per Pair, per Metric Ton, per Piece"
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Min. Order Quantity (MOQ) *
                </label>
                <input
                  type="text"
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  placeholder="e.g. 500 Pairs, 1 FCL Container"
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  HS Code (Customs Tariff)
                </label>
                <input
                  type="text"
                  value={hsCode}
                  onChange={(e) => setHsCode(e.target.value)}
                  placeholder="e.g. 5303.10.10"
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Origin
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Lead Time
                </label>
                <input
                  type="text"
                  value={leadTime}
                  onChange={(e) => setLeadTime(e.target.value)}
                  placeholder="e.g. 20-30 Days"
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Technical Specifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                03. Key Technical Specifications
              </h3>
              <button
                type="button"
                onClick={handleAddSpec}
                className="text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Specification</span>
              </button>
            </div>

            {specs.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleUpdateSpec(idx, 'label', e.target.value)}
                  placeholder="Spec name (e.g. Moisture / Yarn Count / Voltage)"
                  className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleUpdateSpec(idx, 'value', e.target.value)}
                  placeholder="Value (e.g. Max 14% / 100% Cotton / 12V 200Ah)"
                  className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Section 4: Imagery Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 pb-1 border-b border-slate-100">
              04. Product Visual Representation
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Choose from Verified High-Fidelity Studio Assets:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {presetImages.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedPresetImage(preset.url);
                      setCustomImageURL('');
                    }}
                    className={`p-1.5 rounded-lg border text-left transition-all ${
                      selectedPresetImage === preset.url && !customImageURL
                        ? 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded overflow-hidden bg-slate-100 mb-1">
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 block truncate">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Or Upload Image from Local Device:
              </label>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Choose file...</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>
                {customImageURL && (
                  <span className="text-xs text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Custom image loaded
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Form Submit / Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all rounded-lg shadow-sm"
            >
              Save Commodity to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
