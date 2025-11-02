
import React, { useEffect, useState } from 'react';
import { Shipment, ShipmentStatus } from '../types';
import { TruckIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, MapPinIcon } from './icons';

interface ShipmentTrackerProps {
  shipments: Shipment[];
}

const StatusIcon: React.FC<{ status: ShipmentStatus }> = ({ status }) => {
  switch (status) {
    case ShipmentStatus.PENDING_PICKUP:
      return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    case ShipmentStatus.IN_TRANSIT:
      return <TruckIcon className="w-5 h-5 text-blue-500 animate-pulse" />;
    case ShipmentStatus.OUT_FOR_DELIVERY:
      return <MapPinIcon className="w-5 h-5 text-indigo-500" />;
    case ShipmentStatus.DELIVERED:
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case ShipmentStatus.EXCEPTION:
       return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
    case ShipmentStatus.PENDING_RESOLUTION:
       return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: ShipmentStatus): string => {
    const colors: Record<ShipmentStatus, string> = {
        [ShipmentStatus.PENDING_PICKUP]: 'bg-yellow-100 text-yellow-800',
        [ShipmentStatus.IN_TRANSIT]: 'bg-blue-100 text-blue-800',
        [ShipmentStatus.OUT_FOR_DELIVERY]: 'bg-indigo-100 text-indigo-800',
        [ShipmentStatus.DELIVERED]: 'bg-green-100 text-green-800',
        [ShipmentStatus.EXCEPTION]: 'bg-red-100 text-red-800',
        [ShipmentStatus.PENDING_RESOLUTION]: 'bg-orange-100 text-orange-800',
    };
    return colors[status];
}

const ShipmentItem: React.FC<{ shipment: Shipment }> = ({ shipment }) => {
  const [currentStatus, setCurrentStatus] = useState(shipment.status);

  useEffect(() => {
    // Simulate real-time status updates for demo purposes
    if (currentStatus === ShipmentStatus.PENDING_PICKUP || currentStatus === ShipmentStatus.IN_TRANSIT) {
      const statuses = [ShipmentStatus.IN_TRANSIT, ShipmentStatus.OUT_FOR_DELIVERY, ShipmentStatus.DELIVERED];
      let currentIndex = statuses.indexOf(currentStatus) > -1 ? statuses.indexOf(currentStatus) : 0;
      
      const interval = setInterval(() => {
         if (currentIndex < statuses.length -1) {
            currentIndex++;
            setCurrentStatus(statuses[currentIndex]);
         } else {
            clearInterval(interval);
         }
      }, 15000 * Math.random() + 5000); // Update every 5-20 seconds
      
      return () => clearInterval(interval);
    }
  }, [currentStatus]);

  return (
    <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-3 sm:space-y-0">
        <div>
          <p className="font-bold text-blue-700 text-lg">{shipment.id}</p>
          <p className="text-sm text-gray-500 truncate max-w-xs" title={shipment.deliveryAddress}>
            To: {shipment.deliveryAddress}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
            <StatusIcon status={currentStatus} />
            <span>{currentStatus}</span>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">₹{shipment.price}</p>
            <p className="text-sm text-gray-500">ETA: {shipment.eta}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

const ShipmentTracker: React.FC<ShipmentTrackerProps> = ({ shipments }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Active Shipments</h2>
      {shipments.length > 0 ? (
        <ul className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {shipments.map(shipment => (
            <ShipmentItem key={shipment.id} shipment={shipment} />
          ))}
        </ul>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p>No active shipments.</p>
          <p className="text-sm">Book a new shipment to see it here.</p>
        </div>
      )}
    </div>
  );
};

export default ShipmentTracker;
