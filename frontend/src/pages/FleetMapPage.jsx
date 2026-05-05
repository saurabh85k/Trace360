import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useAppContext } from '../context/AppContext';

// Map markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// A custom icon for agents
const agentIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function FleetMapPage() {
  const { agentLocations } = useAppContext();

  // Create some static lines for "optimized routes" visualization
  const routeLines = {
    'DRV-1001': [
      [34.0522, -118.2437],
      [34.0722, -118.2637],
      [34.0922, -118.2837]
    ]
  };

  return (
    <div className="space-y-4 fade-in h-[calc(100vh-140px)] flex flex-col">
      <div>
        <h1 className="text-[var(--text-primary)]">Live Fleet Map</h1>
        <p className="text-[var(--text-secondary)] mt-1">Real-time geographic visualization of all active fleet units and optimized routes.</p>
      </div>

      <div className="card flex-1 p-0 overflow-hidden relative border-2 border-[var(--border-color)]">
        <MapContainer 
          center={[39.8283, -98.5795]} // Center of US
          zoom={4} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {Object.entries(agentLocations).map(([id, coords]) => (
            <React.Fragment key={id}>
              <Marker position={[coords.lat, coords.lng]} icon={agentIcon}>
                <Popup>
                  <strong>Agent: {id}</strong><br />
                  Status: In Transit
                </Popup>
              </Marker>
              
              {/* Show optimized route line if exists */}
              {routeLines[id] && (
                <Polyline 
                  positions={[[coords.lat, coords.lng], ...routeLines[id]]} 
                  color="var(--accent)" 
                  weight={3} 
                  dashArray="5, 10" 
                  opacity={0.6} 
                />
              )}
            </React.Fragment>
          ))}
        </MapContainer>
        
        {/* Legend */}
        <div className="absolute bottom-6 left-6 z-[1000] bg-[var(--bg-secondary)] p-4 rounded-md shadow-md border border-[var(--border-color)]">
          <h4 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">Legend</h4>
          <div className="space-y-2 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Active Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-[var(--accent)] border-dashed border-t-2 border-[var(--accent)]"></div>
              <span>Optimized Route</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
