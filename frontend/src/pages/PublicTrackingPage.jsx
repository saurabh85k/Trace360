import React, { useState } from 'react';
import { Search, Package, MapPin, Truck } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock Route
const routePositions = [
  [34.0522, -118.2437],
  [34.0622, -118.2537],
  [34.0722, -118.2637],
];

export default function PublicTrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingId.trim() !== '') {
      setIsTracking(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 fade-in">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Track Your Delivery</h1>
        <p className="text-[var(--text-secondary)]">Enter your Tracking ID below to view real-time package movement.</p>
        
        <form onSubmit={handleTrack} className="max-w-lg mx-auto mt-6 flex relative">
          <input 
            type="text" 
            placeholder="e.g. #TK652198"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="w-full pl-4 pr-32 py-4 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] shadow-sm"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-[var(--accent)] text-white px-6 rounded-full font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Search size={18} />
            Track
          </button>
        </form>
      </div>

      {isTracking && (
        <div className="grid lg:grid-cols-3 gap-6 fade-in">
          <div className="card lg:col-span-1 space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Shipment Status</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                  <Package size={20} />
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Dispatched</p>
                  <p className="text-sm text-[var(--text-secondary)]">Los Angeles Hub - 10:00 AM</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shrink-0 relative shadow-md shadow-blue-500/20">
                  <Truck size={20} />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">In Transit</p>
                  <p className="text-sm text-[var(--text-secondary)]">Heading towards destination</p>
                </div>
              </div>
              
              <div className="flex gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Expected Delivery</p>
                  <p className="text-sm text-[var(--text-secondary)]">Today, 4:15 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card lg:col-span-2 p-0 overflow-hidden h-[400px] lg:h-auto min-h-[400px]">
            <MapContainer 
              center={[34.0522, -118.2437]} 
              zoom={13} 
              style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[34.0522, -118.2437]}>
                <Popup>Current Location: In Transit</Popup>
              </Marker>
              <Polyline positions={routePositions} color="var(--accent)" weight={4} opacity={0.7} />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
