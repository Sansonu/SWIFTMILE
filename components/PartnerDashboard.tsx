
import React from 'react';
import { InboxIcon } from './icons';

const PartnerDashboard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Carrier Partner Dashboard</h1>
      <div className="text-center py-20 bg-gray-50 rounded-lg">
        <InboxIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Feature In Development</h3>
        <p className="mt-1 text-sm text-gray-500">This dashboard will show available loads, fleet management, and revenue analytics.</p>
      </div>
    </div>
  );
};

export default PartnerDashboard;
