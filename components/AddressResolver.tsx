
import React, { useState } from 'react';
import { ResolvedAddress } from '../types';
import { resolveAddress } from '../services/geminiService';
import MapPreview from './MapPreview';
import { CheckCircleIcon, MapPinIcon, SparklesIcon, XCircleIcon } from './icons';

interface AddressResolverProps {
  title: string;
  onAddressResolved: (address: ResolvedAddress | undefined) => void;
  placeholder: string;
}

const AddressResolver: React.FC<AddressResolverProps> = ({ title, onAddressResolved, placeholder }) => {
  const [inputAddress, setInputAddress] = useState('');
  const [resolved, setResolved] = useState<ResolvedAddress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleResolve = async () => {
    if (!inputAddress.trim()) {
      setError('Address cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResolved(null);
    setIsConfirmed(false);
    onAddressResolved(undefined);

    try {
      const result = await resolveAddress(inputAddress);
      setResolved(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    if (resolved) {
      setIsConfirmed(true);
      onAddressResolved(resolved);
    }
  };
  
  const handleEdit = () => {
    setIsConfirmed(false);
    onAddressResolved(undefined);
  };
  
  const getConfidenceColor = (score: number) => {
    if (score > 0.85) return 'text-green-600 bg-green-100';
    if (score > 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };
  
  if (isConfirmed && resolved) {
    return (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
          <div className="p-3 border-2 border-green-500 bg-green-50 rounded-lg space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-green-800 flex items-center"><CheckCircleIcon className="w-5 h-5 mr-2"/> Address Confirmed</p>
                <p className="text-sm text-gray-600 mt-1">{resolved.normalizedAddress}</p>
              </div>
              <button onClick={handleEdit} className="text-sm text-blue-600 hover:underline font-medium">Edit</button>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder={placeholder}
          className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleResolve}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-wait flex items-center"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
             <SparklesIcon className="w-5 h-5 mr-2"/>
          )}
          Resolve
        </button>
      </div>

      {error && <p className="text-red-500 text-sm flex items-center"><XCircleIcon className="w-4 h-4 mr-1" />{error}</p>}
      
      {resolved && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4 transition-all duration-300 ease-in-out">
          <div className="space-y-2">
            <p className="font-semibold text-gray-800 flex items-center"><MapPinIcon className="w-5 h-5 mr-2 text-blue-500"/> AI Validated Address:</p>
            <p className="text-sm text-gray-700 bg-white p-2 rounded border">{resolved.normalizedAddress}</p>
            <p className="text-xs text-gray-500 italic">"{resolved.parsingExplanation}"</p>
            <div className={`text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-full ${getConfidenceColor(resolved.confidenceScore)}`}>
              Confidence: {(resolved.confidenceScore * 100).toFixed(0)}%
            </div>
          </div>
          <MapPreview lat={resolved.latitude} lng={resolved.longitude} />
          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
          >
            <CheckCircleIcon className="w-5 h-5 mr-2"/>
            Confirm Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressResolver;
