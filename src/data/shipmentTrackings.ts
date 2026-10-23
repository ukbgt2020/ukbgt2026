import { ShipmentTracking } from '../types/trade';

export const SAMPLE_SHIPMENTS: Record<string, ShipmentTracking> = {
  'UKBGT-CTG-88219': {
    trackingNumber: 'UKBGT-CTG-88219',
    blNumber: 'BL-CTG-2026-088219',
    containerNumber: 'MEDU-882194-0',
    carrier: 'Mediterranean Shipping Company (MSC)',
    vesselName: 'MSC BENGAL VOY. 412W',
    voyageNumber: 'VOY-412W',
    originPort: 'Port of Chattogram (CPA), Bangladesh',
    destinationPort: 'Port of Felixstowe / London Gateway, United Kingdom',
    etd: '2026-10-18 14:00 GMT+6',
    eta: '2026-11-12 08:00 GMT',
    status: 'ocean_transit',
    statusLabel: 'In Ocean Transit (Bay of Bengal / Indian Ocean corridor)',
    statusLabelBn: 'সাগরে পরিবহনরত (বঙ্গোপসাগর ও ভারত মহাসাগর করিডোর)',
    cargoDescription: '1x40ft HC: Handcrafted Full-Grain Export Footwear & Leather Duffle Bags',
    totalGrossWeight: '18,450 KGS',
    containerType: '40ft High Cube Dry Van (40HC)',
    sealNumber: 'SEAL-CPA-990144',
    milestones: [
      {
        stage: 'Factory Dispatch & ICD Gate-in',
        stageBn: 'কারখানা থেকে প্রেরণ ও আইসিডি ইন',
        location: 'Inland Container Depot, Chattogram',
        date: '2026-10-14',
        time: '11:30',
        completed: true,
        details: 'Containers stuffed, sealed, and customs export declaration registered.'
      },
      {
        stage: 'Chattogram Port Authority (CPA) Customs Inspection',
        stageBn: 'চট্টগ্রাম বন্দর কাস্টমস ক্লিয়ারেন্স ও ছাড়পত্র',
        location: 'Chattogram Port Terminal, Bangladesh',
        date: '2026-10-16',
        time: '16:45',
        completed: true,
        details: 'EPB export endorsement, Chamber of Commerce COO approved, phytosanitary clearance issued.'
      },
      {
        stage: 'Feeder Vessel Loaded & Sailed',
        stageBn: 'ফিডার জাহাজে লোডিং ও চট্টগ্রাম বন্দর ত্যাগ',
        location: 'Chattogram Port Jetty berth #5',
        date: '2026-10-18',
        time: '15:20',
        completed: true,
        details: 'Container loaded onto feeder vessel bound for Colombo transshipment hub.'
      },
      {
        stage: 'Transshipment Hub Arrival & Mother Vessel Loading',
        stageBn: 'ট্রান্সশিপমেন্ট হাব ও মাদার ভেসেলে লোডিং',
        location: 'Port of Colombo South Container Terminal',
        date: '2026-10-22',
        time: '09:10',
        completed: true,
        details: 'Transferred to ultra-large container carrier MSC BENGAL VOY. 412W.'
      },
      {
        stage: 'Ocean Transit via Suez / Red Sea Corridor',
        stageBn: 'সাগরে পরিবহনরত (সুয়েজ করিডোর অভিমুখে)',
        location: 'Arabian Sea / Gulf of Aden',
        date: '2026-10-23',
        time: 'Current Position',
        completed: true,
        current: true,
        details: 'Vessel cruising at 18.4 knots. Optimal conditions, temperature monitored.'
      },
      {
        stage: 'Destination Port Arrival & UK Border Force Clearance',
        stageBn: 'যুক্তরাজ্য বন্দরে পৌঁছানো ও কাস্টমস ছাড়',
        location: 'Port of Felixstowe, UK',
        date: '2026-11-12',
        time: 'Expected 08:00',
        completed: false,
        details: 'Awaiting vessel berthing, electronic manifest submitted to HMRC.'
      },
      {
        stage: 'Final Delivery to Consignee Facility',
        stageBn: 'গ্রাহকের ওয়্যারহাউসে চূড়ান্ত ডেলিভারি',
        location: 'London Distribution Centre, UK',
        date: '2026-11-14',
        time: 'Scheduled',
        completed: false,
        details: 'Haulage booking confirmed.'
      }
    ]
  },
  'BGLU-940218-4': {
    trackingNumber: 'BGLU-940218-4',
    blNumber: 'BL-CTG-2026-094021',
    containerNumber: 'BGLU-940218-4',
    carrier: 'Hapag-Lloyd Global Liner',
    vesselName: 'EXPRESS BENGAL VOY. 2608S',
    voyageNumber: '2608S',
    originPort: 'Port of Chattogram (CPA), Bangladesh',
    destinationPort: 'Port of Hamburg / Rotterdam, Europe',
    etd: '2026-10-10 10:00 GMT+6',
    eta: '2026-11-04 16:00 CET',
    status: 'transshipment',
    statusLabel: 'Transshipment Connected at Singapore Hub',
    statusLabelBn: 'সিঙ্গাপুর ট্রান্সশিপমেন্ট হাবে সফলভাবে কানেক্টেড',
    cargoDescription: '2x20ft FCL: Export Grade Golden Tossa Jute Fiber & Spun Jute Yarn',
    totalGrossWeight: '32,180 KGS',
    containerType: '2x 20ft Standard Dry Container (20GP)',
    sealNumber: 'SEAL-CPA-884120',
    milestones: [
      {
        stage: 'Mill Packing & Hydraulic Baling',
        stageBn: 'মিলের ব্যালিং ও প্যাকিং সম্পন্ন',
        location: 'Chattogram Jute Industrial Area',
        date: '2026-10-07',
        time: '14:00',
        completed: true,
        details: '180kg hydraulic compressed jute bales checked for moisture compliance (<14%).'
      },
      {
        stage: 'CPA Chattogram Gate In & Customs Pass',
        stageBn: 'চট্টগ্রাম বন্দর গেট-ইন ও কাস্টমস পাস',
        location: 'Port of Chattogram (CPA), Bangladesh',
        date: '2026-10-09',
        time: '18:30',
        completed: true,
        details: 'Commercial invoice, certificate of origin, and phytosanitary seal verified.'
      },
      {
        stage: 'Vessel Departure Chattogram',
        stageBn: 'চট্টগ্রাম বন্দর থেকে যাত্রা শুরু',
        location: 'Chattogram Outer Anchorage',
        date: '2026-10-10',
        time: '23:15',
        completed: true,
        details: 'Departed berth on time via feeder service.'
      },
      {
        stage: 'PSA Singapore Gateway Transshipment',
        stageBn: 'সিঙ্গাপুর ট্রান্সশিপমেন্ট হাব প্রসেসিং',
        location: 'Port of Singapore (PSA Pasir Panjang)',
        date: '2026-10-21',
        time: '11:20',
        completed: true,
        current: true,
        details: 'Discharged from feeder vessel, connected to European main-haul liner.'
      },
      {
        stage: 'Arrival Port of Hamburg',
        stageBn: 'হামবুর্গ বন্দরে আগমন',
        location: 'Burchardkai Terminal, Hamburg, Germany',
        date: '2026-11-04',
        time: 'Estimated 16:00',
        completed: false,
        details: 'Awaiting terminal schedule confirmation.'
      }
    ]
  },
  'AWB-992-019284': {
    trackingNumber: 'AWB-992-019284',
    blNumber: 'AWB-992-01928471',
    containerNumber: 'ULD-AKE-44129-EK',
    carrier: 'Emirates SkyCargo / Biman Bangladesh Cargo',
    vesselName: 'Flight EK-585 / EK-001',
    voyageNumber: 'EK585',
    originPort: 'Shah Amanat International Airport (CGP), Chattogram',
    destinationPort: 'London Heathrow (LHR), United Kingdom',
    etd: '2026-10-22 09:30 GMT+6',
    eta: '2026-10-23 18:45 GMT',
    status: 'destination_customs',
    statusLabel: 'Arrived London Heathrow Cargo Hub · Processing UK Import Customs',
    statusLabelBn: 'লন্ডন হিথ্রো কার্গো টার্মিনালে পৌঁছেছে · কাস্টমস প্রক্রিয়াকরণ চলছে',
    cargoDescription: 'Air Freight: Pre-Production Buyer Approval Samples (Leather Briefcases & Luxury Towels)',
    totalGrossWeight: '420 KGS',
    containerType: 'ULD Air Cargo Pallet Unit',
    sealNumber: 'AIR-CGP-00188',
    milestones: [
      {
        stage: 'Pickup & Express Aviation Packing',
        stageBn: 'পিকআপ ও এভিয়েশন প্যাকিং',
        location: 'University Gate, Hathazari, Chattogram',
        date: '2026-10-21',
        time: '15:00',
        completed: true,
        details: 'Rapid sample batch packed with tamper-evident barcoded security bands.'
      },
      {
        stage: 'Aviation Security Screening CGP Airport',
        stageBn: 'চট্টগ্রাম শাহ আমানত বিমানবন্দর সিকিউরিটি চেক',
        location: 'Shah Amanat International Airport, Chattogram',
        date: '2026-10-21',
        time: '21:00',
        completed: true,
        details: 'Dual-view X-Ray screened and airway bill manifested.'
      },
      {
        stage: 'Air Cargo Departure from Chattogram',
        stageBn: 'বিমান কার্গো ফ্লাইট উড্ডয়ন',
        location: 'CGP Chattogram Runway',
        date: '2026-10-22',
        time: '09:30',
        completed: true,
        details: 'Departed on scheduled flight connecting via Dubai DWC hub.'
      },
      {
        stage: 'Dubai World Central Hub Transshipment',
        stageBn: 'দুবাই কার্গো হাব ট্রানজিট',
        location: 'Dubai Al Maktoum Cargo Terminal',
        date: '2026-10-22',
        time: '18:15',
        completed: true,
        details: 'Quick-ramp transfer to direct London Heathrow widebody flight.'
      },
      {
        stage: 'Arrival at London Heathrow World Cargo Centre',
        stageBn: 'লন্ডন হিথ্রো কার্গো সেন্টারে আগমন',
        location: 'Heathrow Airport (LHR), London, UK',
        date: '2026-10-23',
        time: '10:45',
        completed: true,
        current: true,
        details: 'Aircraft landed. Consignment offloaded to HMRC bonded customs warehouse.'
      },
      {
        stage: 'Courier Final Delivery to Buyer Corporate Office',
        stageBn: 'ক্রেতার কর্পোরেট অফিসে চূড়ান্ত ডেলিভারি',
        location: 'Mayfair, Central London, UK',
        date: '2026-10-24',
        time: 'Scheduled 11:00',
        completed: false,
        details: 'Direct courier courier assigned for morning priority delivery.'
      }
    ]
  }
};
