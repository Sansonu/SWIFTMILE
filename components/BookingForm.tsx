
import React, { useState } from 'react';
import { Shipment } from '../types';
import { PlusCircleIcon } from './icons';
import AddressResolver from './AddressResolver';

interface BookingFormProps {
  onShipmentBook: (newShipment: Omit<Shipment, 'id' | 'status' | 'eta' | 'price'>) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onShipmentBook }) => {
  const [pickupAddress, setPickupAddress] = useState<Shipment['resolvedPickup']>();
  const [deliveryAddress, setDeliveryAddress] = useState<Shipment['resolvedDelivery']>();
  const [weight, setWeight] = useState('5');
  const [dimensions, setDimensions] = useState({ l: '10', w: '10', h: '10' });
  const [error, setError] = useState('');

  const handleBooking = () => {
    if (!pickupAddress || !deliveryAddress) {
      setError('Please resolve both pickup and delivery addresses.');
      return;
    }
    setError('');
    
    onShipmentBook({
      pickupAddress: pickupAddress.normalizedAddress,
      deliveryAddress: deliveryAddress.normalizedAddress,
      resolvedPickup: pickupAddress,
      resolvedDelivery: deliveryAddress,
      weightKg: parseFloat(weight),
      dimensionsCm: {
        l: parseFloat(dimensions.l),
        w: parseFloat(dimensions.w),
        h: parseFloat(dimensions.h),
      },
    });

    // Reset form could be here, but for demo purpose we keep the fields
  };

  const isBookable = pickupAddress && deliveryAddress;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Book a Shipment</h2>
      
      <AddressResolver 
        title="Pickup Address" 
        onAddressResolved={setPickupAddress}
        placeholder="e.g., e-506 street 78 uttam vihar"
        key="pickup"
      />
      
      <AddressResolver 
        title="Delivery Address" 
        onAddressResolved={setDeliveryAddress}
        placeholder="e.g., near laxmi nagar metro station"
        key="delivery"
      />

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Package Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Weight (kg)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-600">L (cm)</label>
              <input type="number" value={dimensions.l} onChange={(e) => setDimensions(d => ({...d, l: e.target.value}))} className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">W (cm)</label>
              <input type="number" value={dimensions.w} onChange={(e) => setDimensions(d => ({...d, w: e.target.value}))} className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">H (cm)</label>
              <input type="number" value={dimensions.h} onChange={(e) => setDimensions(d => ({...d, h: e.target.value}))} className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <button 
        onClick={handleBooking}
        disabled={!isBookable}
        className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${isBookable ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors`}
      >
        <PlusCircleIcon className="w-5 h-5 mr-2" />
        Confirm & Book
      </button>
    </div>
  );
};

export default BookingForm;