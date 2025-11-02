
import React from 'react';

interface MapPreviewProps {
  lat: number;
  lng: number;
}

const MapPreview: React.FC<MapPreviewProps> = ({ lat, lng }) => {
  // Using a static map image provider for simplicity.
  // In a real app, this would be an interactive map library like Leaflet or Mapbox.
  const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+f74e4e(${lng},${lat})/${lng},${lat},13,0/400x200?access_token=pk.eyJ1IjoiZGVmYXVsdC11c2VyLXh5eiIsImEiOiJjbDRzM2Y2ZzMwMDBpM2Nyd2ZpZ3pxcGJtIn0.3tGKs73UHzAc5s222TR36w`;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-300 shadow-sm">
      <img src={imageUrl} alt={`Map view of location at ${lat}, ${lng}`} className="w-full h-auto object-cover" />
    </div>
  );
};

export default MapPreview;
