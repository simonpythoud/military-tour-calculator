import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Tooltip } from 'react-leaflet';
import { FaMap, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import type { RouteSection } from '../types';
import { SECTION_COLORS } from './RouteSections';
import 'leaflet/dist/leaflet.css';

interface Props {
  sections: RouteSection[];
}

const RouteMap: React.FC<Props> = React.memo(({ sections }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (sections.length === 0) return null;

  const allPoints = sections.flatMap((s) =>
    s.points.map((p) => [p.lat, p.lon] as [number, number])
  );

  let minLat = Number.POSITIVE_INFINITY;
  let minLon = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  let maxLon = Number.NEGATIVE_INFINITY;

  for (const p of allPoints) {
    const lat = p[0];
    const lon = p[1];
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
  }

  const bounds: [[number, number], [number, number]] = [
    [minLat, minLon],
    [maxLat, maxLon],
  ];

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="w-full flex items-center justify-between text-base sm:text-lg font-semibold"
      >
        <span className="flex items-center gap-2">
          <FaMap className="text-military-green" />
          {t('gpxRouteMap')}
        </span>
        {isVisible ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isVisible && (
        <div
          className="mt-3 rounded-lg overflow-hidden border"
          style={{ height: '400px' }}
        >
          <MapContainer
            bounds={bounds}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sections.map((section, index) => {
              const positions = section.points.map(
                (p) => [p.lat, p.lon] as [number, number]
              );
              return (
                <Polyline
                  key={section.id}
                  positions={positions}
                  pathOptions={{
                    color: SECTION_COLORS[index % SECTION_COLORS.length],
                    weight: 4,
                    opacity: 0.8,
                  }}
                >
                  <Tooltip sticky>
                    {section.name} — {section.horizontalDistance} km
                  </Tooltip>
                </Polyline>
              );
            })}
          </MapContainer>
        </div>
      )}
    </div>
  );
});

export default RouteMap;
