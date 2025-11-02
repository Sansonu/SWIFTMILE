
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LearningMetric, ShipmentStatus } from '../types';
import { MOCK_LEARNING_DATA, MOCK_SHIPMENTS } from '../constants';
import { CheckCircleIcon, ExclamationTriangleIcon } from './icons';

const AdminDashboard: React.FC = () => {
  const [learningData, setLearningData] = useState<LearningMetric[]>(MOCK_LEARNING_DATA);
  const [shipmentStats, setShipmentStats] = useState({ resolved: 0, ambiguous: 0 });

  useEffect(() => {
    const resolved = MOCK_SHIPMENTS.filter(s => s.resolvedDelivery && s.resolvedDelivery.confidenceScore > 0.7).length;
    const ambiguous = MOCK_SHIPMENTS.length - resolved;
    setShipmentStats({ resolved, ambiguous });
  }, []);
  
  const simulateLearning = () => {
    setLearningData(prevData => {
        const lastPoint = prevData[prevData.length - 1];
        const newAccuracy = Math.min(99.5, lastPoint.accuracy + Math.random() * 1.5 + 0.5);
        const newMonth = `Month ${prevData.length + 1}`;
        return [...prevData, { month: newMonth, accuracy: parseFloat(newAccuracy.toFixed(1)) }];
    });

    setShipmentStats(prev => {
        const newAmbiguous = Math.max(0, prev.ambiguous - 5);
        const newResolved = prev.resolved + 5;
        return { resolved: newResolved, ambiguous: newAmbiguous };
    })
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin & AI Learning Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full"><CheckCircleIcon className="w-8 h-8 text-green-600"/></div>
          <div>
            <p className="text-gray-500 text-sm">Successfully Resolved</p>
            <p className="text-2xl font-bold text-gray-800">{shipmentStats.resolved}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-full"><ExclamationTriangleIcon className="w-8 h-8 text-orange-600"/></div>
          <div>
            <p className="text-gray-500 text-sm">Flagged for Review</p>
            <p className="text-2xl font-bold text-gray-800">{shipmentStats.ambiguous}</p>
          </div>
        </div>
         <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
            <button onClick={simulateLearning} className="w-full h-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Simulate 1000 Validated Deliveries
            </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">AI Address Accuracy Improvement</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={learningData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 100]} unit="%"/>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Problematic Addresses (Edge Cases for Review)</h2>
          <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                      <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Input</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Confidence</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     {MOCK_SHIPMENTS.filter(s => s.status === ShipmentStatus.PENDING_RESOLUTION).map(s => (
                        <tr key={s.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{s.pickupAddress}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">{(s.resolvedPickup.confidenceScore * 100).toFixed(0)}%</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Awaiting Driver Validation
                                </span>
                            </td>
                        </tr>
                     ))}
                  </tbody>
              </table>
          </div>
      </div>

    </div>
  );
};

export default AdminDashboard;