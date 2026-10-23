export type Currency = 'USD' | 'BDT' | 'GBP' | 'EUR' | 'AED' | 'RMB';
export type Language = 'en' | 'bn';

export type ProductAvailability = 
  | 'in_stock'           // In Stock & Ready for Export
  | 'sourcing_available'  // Sourcing Available / Made-to-Order
  | 'sampling_ready'     // Samples Ready for Buyer Evaluation
  | 'pipeline_upcoming'; // Pipeline / Coming Soon

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  category: 'footwear' | 'leather' | 'towels' | 'tea' | 'tobacco' | 'jute' | 'battery' | 'raw_materials';
  categoryLabel: string;
  categoryLabelBn: string;
  description: string;
  descriptionBn: string;
  hsCode: string;
  origin: string;
  moq: string;
  moqBn: string;
  packaging: string;
  leadTime: string;
  priceUSD: number;
  unit: string;
  unitBn: string;
  availability: ProductAvailability;
  keySpecs: { label: string; labelBn: string; value: string }[];
  image: string;
  incoterms: string[];
  featured?: boolean;
}

export type TrackingStatus = 
  | 'booking_confirmed'
  | 'customs_chattogram'
  | 'vessel_loaded'
  | 'ocean_transit'
  | 'transshipment'
  | 'destination_customs'
  | 'out_for_delivery'
  | 'delivered';

export interface TrackingMilestone {
  stage: string;
  stageBn: string;
  location: string;
  date: string;
  time: string;
  completed: boolean;
  current?: boolean;
  details: string;
}

export interface ShipmentTracking {
  trackingNumber: string;
  blNumber: string;
  containerNumber: string;
  carrier: string;
  vesselName: string;
  voyageNumber: string;
  originPort: string;
  destinationPort: string;
  etd: string;
  eta: string;
  status: TrackingStatus;
  statusLabel: string;
  statusLabelBn: string;
  cargoDescription: string;
  totalGrossWeight: string;
  containerType: string;
  sealNumber: string;
  milestones: TrackingMilestone[];
}

export interface RFQFormState {
  buyerName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  destinationPort: string;
  productId: string;
  targetQuantity: string;
  targetIncoterm: string;
  paymentTerm: string;
  notes: string;
}
