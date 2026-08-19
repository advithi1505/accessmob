import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Marker,
  Popup,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import type { AccessibilityMode } from '@/types';

interface Props {
  mode?: AccessibilityMode;
  route?: 'accessible' | 'fastest' | 'clear' | null;
  destinationId?: string | null;
  progress?: number;
  dim?: boolean;
  highContrast?: boolean;
}

const MUMBAI_CENTER: [number, number] = [19.076, 72.8777];

export default function MumbaiMap({
  route = null,
  destinationId = null,
  progress = 0,
  dim = false,
  highContrast = false,
}: Props) {
  return (
    <div
      className={`absolute inset-0 ${
        dim ? 'brightness-95' : ''
      }`}
      style={{
        zIndex: 0,
      }}
    >
      <MapContainer
        center={MUMBAI_CENTER}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
        style={{
          zIndex: 0,
        }}
      >
        {/* Real OpenStreetMap */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* =====================================================
            ACCESSIBILITY MARKERS
            ===================================================== */}

        {/* Wheelchair ramp */}
        <CircleMarker
          center={[19.075, 72.879]}
          radius={10}
          pathOptions={{
            color: '#10b981',
            fillColor: '#10b981',
            fillOpacity: 0.95,
            weight: 3,
          }}
        >
          <Popup>
            <div className="text-sm">
              <strong>♿ Accessible Ramp</strong>
              <br />
              Wheelchair-friendly access
            </div>
          </Popup>
        </CircleMarker>

        {/* Elevator */}
        <CircleMarker
          center={[19.078, 72.875]}
          radius={10}
          pathOptions={{
            color: '#4f46e5',
            fillColor: '#4f46e5',
            fillOpacity: 0.95,
            weight: 3,
          }}
        >
          <Popup>
            <div className="text-sm">
              <strong>🛗 Elevator</strong>
              <br />
              Accessible vertical access
            </div>
          </Popup>
        </CircleMarker>

        {/* Warning / accessibility issue */}
        <CircleMarker
          center={[19.077, 72.881]}
          radius={10}
          pathOptions={{
            color: '#f59e0b',
            fillColor: '#f59e0b',
            fillOpacity: 0.95,
            weight: 3,
          }}
        >
          <Popup>
            <div className="text-sm">
              <strong>⚠ Accessibility Issue</strong>
              <br />
              Possible obstruction
            </div>
          </Popup>
        </CircleMarker>

        {/* Accessible entrance */}
        <CircleMarker
          center={[19.0735, 72.8765]}
          radius={10}
          pathOptions={{
            color: '#10b981',
            fillColor: '#10b981',
            fillOpacity: 0.95,
            weight: 3,
          }}
        >
          <Popup>
            <div className="text-sm">
              <strong>🚪 Accessible Entrance</strong>
              <br />
              Step-free entrance
            </div>
          </Popup>
        </CircleMarker>

        {/* =====================================================
            DESTINATION
            ===================================================== */}

        {destinationId && (
          <Marker position={MUMBAI_CENTER}>
            <Popup>
              <div className="text-sm">
                <strong>📍 Selected Destination</strong>
                <br />
                Your selected location
              </div>
            </Popup>
          </Marker>
        )}

        {/* =====================================================
            ROUTE PLACEHOLDER
            We'll replace this with real routing later.
            ===================================================== */}

        {route && (
          <CircleMarker
            center={[19.076, 72.8777]}
            radius={7}
            pathOptions={{
              color:
                route === 'accessible'
                  ? '#10b981'
                  : route === 'fastest'
                    ? '#4f46e5'
                    : '#f59e0b',
              fillOpacity: 1,
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>
                  {route === 'accessible'
                    ? '♿ Accessible Route'
                    : route === 'fastest'
                      ? '⚡ Fastest Route'
                      : '✓ Clear Route'}
                </strong>
              </div>
            </Popup>
          </CircleMarker>
        )}

        {/* Navigation progress placeholder */}
        {progress > 0 && (
          <CircleMarker
            center={MUMBAI_CENTER}
            radius={8}
            pathOptions={{
              color: '#10b981',
              fillColor: '#10b981',
              fillOpacity: 1,
            }}
          />
        )}
      </MapContainer>

      {/* High contrast mode */}
      {highContrast && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 20,
            border: '2px solid #facc15',
          }}
        />
      )}
    </div>
  );
}