
import React, { useState } from 'react';
import { MOCK_SHIPMENTS } from '../constants';
import { Shipment, ShipmentStatus } from '../types';
import { CameraIcon, CheckCircleIcon, MapPinIcon, NavigationIcon } from './icons';

const AgentView: React.FC = () => {
  const [tasks, setTasks] = useState(MOCK_SHIPMENTS.filter(s => s.status === ShipmentStatus.OUT_FOR_DELIVERY || s.status === ShipmentStatus.PENDING_RESOLUTION));
  const [activeTask, setActiveTask] = useState<Shipment | null>(tasks[0] || null);
  const [isValidating, setIsValidating] = useState(false);

  const handleValidationSubmit = () => {
      if (!activeTask) return;
      const updatedTasks = tasks.map(t => t.id === activeTask.id ? {...t, status: ShipmentStatus.OUT_FOR_DELIVERY, resolvedPickup: {...t.resolvedPickup, confidenceScore: 0.99}} : t);
      setTasks(updatedTasks);
      setActiveTask(updatedTasks.find(t => t.id === activeTask.id));
      setIsValidating(false);
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[80vh]">
      {/* Delivery Queue */}
      <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Optimized Delivery Queue</h2>
        <ul className="space-y-3 overflow-y-auto flex-grow">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              onClick={() => setActiveTask(task)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                activeTask?.id === task.id ? 'bg-blue-100 border-blue-500 border-l-4' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">{index + 1}</div>
                <div>
                  <p className="font-semibold text-gray-800">{task.id}</p>
                  <p className="text-sm text-gray-600 truncate">{task.pickupAddress}</p>
                   {task.status === ShipmentStatus.PENDING_RESOLUTION && (
                        <span className="text-xs font-bold text-orange-500">NEEDS VALIDATION</span>
                    )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Task Details */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg flex flex-col">
        {activeTask ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800">{activeTask.id}</h2>
            <p className="text-gray-500 mb-4">Pickup Details</p>

            <div className="border border-gray-200 p-4 rounded-lg mb-4 bg-gray-50">
                <p className="font-semibold">Original Address:</p>
                <p className="text-gray-700">{activeTask.pickupAddress}</p>
                <p className="font-semibold mt-2">AI Normalized:</p>
                <p className="text-gray-700">{activeTask.resolvedPickup?.normalizedAddress}</p>
            </div>
            
            <div className="flex-grow">
              {isValidating ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 space-y-4">
                  <h3 className="font-bold text-yellow-800">Address Ambiguity Resolution</h3>
                  <p className="text-sm text-yellow-700">You are at the estimated location. Please confirm the exact details.</p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes (Landmarks, access points)</label>
                    <textarea rows={2} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                  </div>
                   <button className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <CameraIcon className="w-5 h-5 mr-2" /> Take Photo Confirmation
                    </button>
                  <button onClick={handleValidationSubmit} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                    <CheckCircleIcon className="w-5 h-5 mr-2" /> Submit Validated Location
                  </button>
                </div>
              ) : (
                <div className="h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map & Navigation View (Simulated)</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t flex flex-col md:flex-row gap-3">
              <button className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                <NavigationIcon className="w-5 h-5 mr-2"/> Turn-by-Turn Navigation
              </button>
              {activeTask.status === ShipmentStatus.PENDING_RESOLUTION && !isValidating && (
                 <button onClick={() => setIsValidating(true)} className="flex-1 flex justify-center items-center py-3 px-4 border rounded-md shadow-sm text-base font-medium text-yellow-800 bg-yellow-400 hover:bg-yellow-500">
                    <MapPinIcon className="w-5 h-5 mr-2"/> Arrived, Validate Location
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Select a task to view details</div>
        )}
      </div>
    </div>
  );
};

export default AgentView;

