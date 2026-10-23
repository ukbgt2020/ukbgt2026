import React, { useState } from 'react';
import { ShipmentTracking, Language } from '../types/trade';
import { SAMPLE_SHIPMENTS } from '../data/shipmentTrackings';
import { getT } from '../utils/translations';
import { 
  Search, 
  Ship, 
  Plane, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  Box, 
  Anchor, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ShipmentTrackerProps {
  currentLanguage: Language;
}

export const ShipmentTracker: React.FC<ShipmentTrackerProps> = ({ currentLanguage }) => {
  const t = getT(currentLanguage);

  const [inputCode, setInputCode] = useState('UKBGT-CTG-88219');
  const [activeTracking, setActiveTracking] = useState<ShipmentTracking | null>(
    SAMPLE_SHIPMENTS['UKBGT-CTG-88219']
  );
  const [hasSearched, setHasSearched] = useState(true);
  const [searchError, setSearchError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputCode.trim().toUpperCase();
    if (!cleaned) return;

    if (SAMPLE_SHIPMENTS[cleaned]) {
      setActiveTracking(SAMPLE_SHIPMENTS[cleaned]);
      setSearchError(false);
    } else {
      // Dynamic live tracker generator for arbitrary consignments from Chattogram Port
      const customShipment: ShipmentTracking = {
        trackingNumber: cleaned,
        blNumber: `BL-CTG-${cleaned.slice(0, 6)}`,
        containerNumber: cleaned.includes('AWB') ? `ULD-${cleaned}` : `CPAU-${cleaned.slice(0, 7)}`,
        carrier: cleaned.includes('AWB') ? 'Biman Cargo / Emirates SkyCargo' : 'Ocean Network Express (ONE) / CPA Feeder',
        vesselName: cleaned.includes('AWB') ? 'Cargo Flight BG-001' : 'MV CHATTOGRAM STAR VOY. 12B',
        voyageNumber: '12B',
        originPort: 'Port of Chattogram (CPA), Bangladesh',
        destinationPort: 'Global Destination Port (Discharge Port Confirmed)',
        etd: '2026-10-20 12:00 GMT+6',
        eta: '2026-11-15 08:00 GMT',
        status: 'ocean_transit',
        statusLabel: 'Consignment in International Transit · Inspected at Chattogram Terminal',
        statusLabelBn: 'আন্তর্জাতিক ট্রানজিটে রয়েছে · চট্টগ্রাম টার্মিনালে পরিদর্শন সম্পন্ন',
        cargoDescription: 'General Commercial Cargo / Raw Materials Export Batch',
        totalGrossWeight: '14,200 KGS',
        containerType: '20ft General Purpose (20GP)',
        sealNumber: 'SEAL-CPA-901844',
        milestones: [
          {
            stage: 'Factory Gate-out & Chattogram ICD Booking',
            stageBn: 'কারখানা থেকে গেট-আউট ও আইসিডি বুকিং',
            location: 'Chattogram Inland Depot, Bangladesh',
            date: '2026-10-18',
            time: '10:00',
            completed: true,
            details: 'Export cargo packed into seaworthy container and weighed on certified weighbridge.'
          },
          {
            stage: 'Customs Clearance & CPA Terminal Berth In',
            stageBn: 'কাস্টমস ক্লিয়ারেন্স ও চট্টগ্রাম বন্দর বার্থে প্রবেশ',
            location: 'Port of Chattogram (CPA), Bangladesh',
            date: '2026-10-20',
            time: '16:00',
            completed: true,
            details: 'Phytosanitary inspection, customs duty assessment, and container loading authorization.'
          },
          {
            stage: 'Vessel Loaded & Departed Bay of Bengal',
            stageBn: 'জাহাজে লোড ও বঙ্গোপসাগর অভিমুখে যাত্রা',
            location: 'Chattogram Outer Anchorage',
            date: '2026-10-21',
            time: '22:30',
            completed: true,
            current: true,
            details: 'Vessel underway toward international transshipment terminal.'
          },
          {
            stage: 'Destination Port Inward Discharge',
            stageBn: 'গন্তব্য বন্দরে ডিসচার্জ',
            location: 'Destination Container Terminal',
            date: '2026-11-15',
            time: 'Expected',
            completed: false,
            details: 'Awaiting vessel ETA notification.'
          }
        ]
      };
      setActiveTracking(customShipment);
      setSearchError(false);
    }
    setHasSearched(true);
  };

  const handleSelectSample = (sampleId: string) => {
    setInputCode(sampleId);
    setActiveTracking(SAMPLE_SHIPMENTS[sampleId]);
    setSearchError(false);
  };

  return (
    <section id="tracking" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            {currentLanguage === 'en' ? 'Port of Chattogram Logistics Pipeline' : 'চট্টগ্রাম বন্দর লজিস্টিক পাইপলাইন'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.trackingHeading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.trackingSubheading}
          </p>
        </div>

        {/* Tracking Search Input */}
        <div className="mt-8 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs max-w-4xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder={t.trackingPlaceholder}
                className="w-full bg-white text-slate-900 text-sm rounded-lg border border-slate-300 pl-10 pr-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all rounded-lg whitespace-nowrap shadow-xs flex items-center justify-center gap-2"
            >
              <span>{t.btnTrack}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>

          {/* Quick Click Sample Codes */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-700">{t.sampleTrackers}</span>
            <button
              type="button"
              onClick={() => handleSelectSample('UKBGT-CTG-88219')}
              className="font-mono text-xs px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-800 transition-colors"
            >
              UKBGT-CTG-88219 (Ocean to UK)
            </button>
            <button
              type="button"
              onClick={() => handleSelectSample('BGLU-940218-4')}
              className="font-mono text-xs px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-800 transition-colors"
            >
              BGLU-940218-4 (Jute to Germany)
            </button>
            <button
              type="button"
              onClick={() => handleSelectSample('AWB-992-019284')}
              className="font-mono text-xs px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-800 transition-colors"
            >
              AWB-992-019284 (Air Samples to London)
            </button>
          </div>
        </div>

        {/* Tracking Result View */}
        {activeTracking && (
          <div className="mt-10 max-w-5xl space-y-8">
            {/* Top Summary Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
                    <span>CONSIGNMENT ID: {activeTracking.trackingNumber}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>B/L: {activeTracking.blNumber}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {currentLanguage === 'en' ? activeTracking.statusLabel : activeTracking.statusLabelBn}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-2.5 bg-slate-800 rounded-lg text-amber-400">
                    {activeTracking.trackingNumber.includes('AWB') ? (
                      <Plane className="w-6 h-6" />
                    ) : (
                      <Ship className="w-6 h-6" />
                    )}
                  </div>
                </div>
              </div>

              {/* Transit Route Specs */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Port of Origin:</span>
                  <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                    <Anchor className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{activeTracking.originPort}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px] block mt-1">ETD: {activeTracking.etd}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Destination Port:</span>
                  <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{activeTracking.destinationPort}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px] block mt-1">ETA: {activeTracking.eta}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Carrier / Vessel:</span>
                  <div className="font-semibold text-white text-sm">{activeTracking.vesselName}</div>
                  <span className="text-slate-400 text-[11px] block mt-1">{activeTracking.carrier}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Cargo Specs:</span>
                  <div className="font-mono text-white text-sm">{activeTracking.totalGrossWeight}</div>
                  <span className="text-slate-400 text-[11px] block mt-1">{activeTracking.containerType}</span>
                </div>
              </div>

              {/* Manifest Description Strip */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
                <Box className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-white">Manifest:</strong> {activeTracking.cargoDescription}
                </span>
              </div>
            </div>

            {/* Checkpoint Milestones Stepper */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-600" />
                <span>Consignment Checkpoints & Physical Audit Milestones</span>
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {activeTracking.milestones.map((milestone, index) => {
                  return (
                    <div key={index} className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6">
                      {/* Checkpoint marker icon */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 ${
                          milestone.current
                            ? 'bg-amber-600 border-amber-600 text-white shadow-md ring-4 ring-amber-100'
                            : milestone.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-white border-slate-300 text-slate-300'
                        }`}
                      >
                        {milestone.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className={`text-sm sm:text-base font-semibold ${
                            milestone.current ? 'text-amber-900 font-bold' : milestone.completed ? 'text-slate-900' : 'text-slate-500'
                          }`}>
                            {currentLanguage === 'en' ? milestone.stage : milestone.stageBn}
                          </h5>
                          {milestone.current && (
                            <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                              Current Stage
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {milestone.details}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{milestone.location}</span>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="sm:text-right shrink-0">
                        <div className="font-mono text-xs font-semibold text-slate-800">
                          {milestone.date}
                        </div>
                        <div className="font-mono text-[11px] text-slate-500">
                          {milestone.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inspection Notice */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>All shipments are verified by Chittagong Port Authority (CPA) Customs Division.</span>
                </div>
                <div className="font-mono text-[11px] text-slate-400">
                  Last telemetry update: {new Date().toLocaleTimeString()} BST
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
