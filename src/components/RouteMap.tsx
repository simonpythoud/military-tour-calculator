import React, { useState, useMemo } from 'react';
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

  // Memoize expensive calculations to prevent re-computation on every render (e.g., when toggling visibility)
  // This calculates the map bounds and prepares the polyline positions once per sections update.
  const { bounds, sectionPositions } = useMemo(() => {
    if (sections.length === 0) {
      return {
        bounds: [[0, 0], [0, 0]] as [[number, number], [number, number]],
        sectionPositions: []
      };
    }

    let minLat = Number.POSITIVE_INFINITY;
    let minLon = Number.POSITIVE_INFINITY;
    let maxLat = Number.NEGATIVE_INFINITY;
    let maxLon = Number.NEGATIVE_INFINITY;

    const computedSectionPositions = sections.map(section =>
      section.points.map(p => {
        const lat = p.lat;
        const lon = p.lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        return [lat, lon] as [number, number];
      })
    );

    const computedBounds: [[number, number], [number, number]] = [
      [minLat, minLon],
      [maxLat, maxLon],
    ];

    return { bounds: computedBounds, sectionPositions: computedSectionPositions };
  }, [sections]);

  if (sections.length === 0) return null;

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
            {sectionPositions.map((positions, index) => {
              const section = sections[index];
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
