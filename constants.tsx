
import { Shipment, ShipmentStatus, LearningMetric } from "./types";

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'SM74839',
    pickupAddress: 'e-506 street number 78 uttam vihar block d',
    deliveryAddress: 'B-25, Lajpat Nagar II, Near Metro Pillar 12, New Delhi',
    resolvedPickup: {
        normalizedAddress: 'E-506, Gali Number 78, Block D, Uttam Vihar, New Delhi, Delhi, 110059, India',
        latitude: 28.6200,
        longitude: 77.0600,
        confidenceScore: 0.92,
        parsingExplanation: 'Parsed block, street, and house number from common Delhi format.'
    },
    resolvedDelivery: {
        normalizedAddress: 'B-25, Lajpat Nagar II, New Delhi, Delhi 110024, India',
        latitude: 28.5678,
        longitude: 77.2426,
        confidenceScore: 0.98,
        parsingExplanation: 'Identified major locality and pillar landmark for precise location.'
    },
    status: ShipmentStatus.DELIVERED,
    weightKg: 5,
    dimensionsCm: { l: 30, w: 20, h: 15 },
    price: 450,
    eta: 'Delivered',
    driver: 'Ravi Kumar'
  },
  {
    id: 'SM82610',
    pickupAddress: 'Shop 4, opposite city hospital, mg road, bangalore',
    deliveryAddress: 'Flat 12B, Prestige Shantiniketan, Whitefield Main Road',
    resolvedPickup: {
        normalizedAddress: 'Shop 4, Mahatma Gandhi Rd, near City Hospital, Bengaluru, Karnataka 560001, India',
        latitude: 12.9740,
        longitude: 77.6075,
        confidenceScore: 0.88,
        parsingExplanation: 'Used "opposite city hospital" as a key landmark on MG Road.'
    },
     resolvedDelivery: {
        normalizedAddress: '12B, Prestige Shantiniketan, Whitefield Main Rd, Bengaluru, Karnataka 560048, India',
        latitude: 12.9900,
        longitude: 77.7200,
        confidenceScore: 0.95,
        parsingExplanation: 'Recognized major apartment complex and road for high accuracy.'
    },
    status: ShipmentStatus.IN_TRANSIT,
    weightKg: 2,
    dimensionsCm: { l: 20, w: 10, h: 5 },
    price: 320,
    eta: '2 days',
    driver: 'Sunita Rao'
  },
  {
    id: 'SM56193',
    pickupAddress: 'chawla chicken house, model town, jalandhar',
    deliveryAddress: 'c/o ram lal, near bus stand, phagwara',
     resolvedPickup: {
        normalizedAddress: 'Chawla Chicken, Model Town Rd, Model Town, Jalandhar, Punjab 144003, India',
        latitude: 31.3129,
        longitude: 75.5653,
        confidenceScore: 0.65,
        parsingExplanation: 'Identified a popular restaurant but the exact pickup point is ambiguous.'
    },
     resolvedDelivery: {
        normalizedAddress: 'Near Bus Stand, Phagwara, Punjab 144401, India',
        latitude: 31.2223,
        longitude: 75.7723,
        confidenceScore: 0.55,
        parsingExplanation: 'General area identified, but "c/o" and landmark are not specific.'
    },
    status: ShipmentStatus.PENDING_RESOLUTION,
    weightKg: 15,
    dimensionsCm: { l: 50, w: 40, h: 30 },
    price: 850,
    eta: '4 days',
    driver: 'Amit Singh'
  },
   {
    id: 'SM99021',
    pickupAddress: 'behind tech park, hinjewadi phase 2 pune',
    deliveryAddress: 'amanora park town, hadapsar, pune',
     resolvedPickup: {
        normalizedAddress: 'Hinjawadi Phase 2, behind Tech Park, Pune, Maharashtra 411057, India',
        latitude: 18.5912,
        longitude: 73.7389,
        confidenceScore: 0.91,
        parsingExplanation: 'Used "behind tech park" to narrow down the area in Hinjewadi Phase 2.'
    },
     resolvedDelivery: {
        normalizedAddress: 'Amanora Park Town, Hadapsar, Pune, Maharashtra 411028, India',
        latitude: 18.5193,
        longitude: 73.9472,
        confidenceScore: 0.99,
        parsingExplanation: 'Identified major township for precise location.'
    },
    status: ShipmentStatus.OUT_FOR_DELIVERY,
    weightKg: 8,
    dimensionsCm: { l: 40, w: 25, h: 20 },
    price: 600,
    eta: 'Today',
    driver: 'Priya Deshmukh'
  },
];


export const MOCK_LEARNING_DATA: LearningMetric[] = [
  { month: 'Jan', accuracy: 75.2 },
  { month: 'Feb', accuracy: 78.9 },
  { month: 'Mar', accuracy: 81.5 },
  { month: 'Apr', accuracy: 84.1 },
  { month: 'May', accuracy: 86.8 },
  { month: 'June', accuracy: 89.3 },
];
