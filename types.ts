
export enum UserRole {
  MSME_SHIPPER = 'MSME_SHIPPER',
  DELIVERY_AGENT = 'DELIVERY_AGENT',
  CARRIER_PARTNER = 'CARRIER_PARTNER',
  ADMIN = 'ADMIN',
}

export interface ResolvedAddress {
  normalizedAddress: string;
  latitude: number;
  longitude: number;
  confidenceScore: number;
  parsingExplanation: string;
}

export enum ShipmentStatus {
  PENDING_PICKUP = 'Pending Pickup',
  IN_TRANSIT = 'In Transit',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  EXCEPTION = 'Exception',
  PENDING_RESOLUTION = 'Pending Resolution'
}

export interface Shipment {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  resolvedPickup?: ResolvedAddress;
  resolvedDelivery?: ResolvedAddress;
  status: ShipmentStatus;
  weightKg: number;
  dimensionsCm: { l: number; w: number; h: number };
  price: number;
  eta: string;
  driver?: string;
}

export interface LearningMetric {
  month: string;
  accuracy: number;
}
