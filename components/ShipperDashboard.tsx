
import React, { useState, useCallback } from 'react';
import { Shipment, ShipmentStatus } from '../types';
import BookingForm from './BookingForm';
import ShipmentTracker from './ShipmentTracker';
import { MOCK_SHIPMENTS } from '../constants';

const ShipperDashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS);

  const addShipment = useCallback((newShipment: Omit<Shipment, 'id' | 'status' | 'eta' | 'price'>) => {
    const shipmentToAdd: Shipment = {
      ...newShipment,
      id: `SM${Math.floor(Math.random() * 90000) + 10000}`,
      status: ShipmentStatus.PENDING_PICKUP,
      price: Math.floor(Math.random() * (1500 - 300 + 1)) + 300, // Random price
      eta: '3 days',
      driver: 'Unassigned'
    };
    setShipments(prev => [shipmentToAdd, ...prev]);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <BookingForm onShipmentBook={addShipment} />
      </div>
      <div className="lg:col-span-2">
        <ShipmentTracker shipments={shipments} />
      </div>
    </div>
  );
};

export default ShipperDashboard;
