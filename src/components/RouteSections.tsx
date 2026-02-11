import type React from 'react';
import { useState } from 'react';
import {
  FaMountain,
  FaArrowUp,
  FaArrowDown,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import type { RouteSection, Terrain } from '../types';

interface Props {
  sections: RouteSection[];
  onUpdateSectionTerrain: (sectionId: string, terrain: Terrain) => void;
}

const SECTION_COLORS = [
  '#2563eb',
  '#dc2626',
  '#16a34a',
  '#d97706',
  '#7c3aed',
  '#db2777',
  '#0891b2',
  '#65a30d',
  '#ea580c',
  '#4f46e5',
  '#be123c',
  '#0d9488',
  '#ca8a04',
  '#9333ea',
  '#e11d48',
  '#059669',
  '#c2410c',
  '#6d28d9',
  '#be185d',
  '#0e7490',
];

const RouteSections: React.FC<Props> = ({
  sections,
  onUpdateSectionTerrain,
}) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  const getTerrainLabel = (terrain: Terrain): string => {
    const labels: Record<Terrain, string> = {
      FLAT: t('terrain_flat'),
      HIKING_TRAIL: t('terrain_hiking_trail'),
      DIFFICULT: t('terrain_difficult'),
      ALPINE: t('terrain_alpine'),
      TECHNICAL_ALPINE: t('terrain_technical_alpine'),
    };
    return labels[terrain];
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="w-full flex items-center justify-between text-base sm:text-lg font-semibold"
      >
        <span className="flex items-center gap-2">
          <FaMountain className="text-military-green" />
          {t('gpxRouteSections')}
        </span>
        {isVisible ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isVisible && (
        <>
          <p className="text-sm text-gray-600 mb-3 mt-3">
            {t('gpxSectionsDescription')}
          </p>
          <div className="space-y-2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor:
                    SECTION_COLORS[index % SECTION_COLORS.length],
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full inline-block flex-shrink-0"
                        style={{
                          backgroundColor:
                            SECTION_COLORS[index % SECTION_COLORS.length],
                        }}
                      />
                      {section.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      <span>{section.horizontalDistance} km</span>
                      <span className="flex items-center gap-1">
                        <FaArrowUp className="text-green-600" />
                        {section.elevationGain} m
                      </span>
                      <span className="flex items-center gap-1">
                        <FaArrowDown className="text-red-600" />
                        {section.elevationLoss} m
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <select
                      value={section.terrain}
                      onChange={(e) =>
                        onUpdateSectionTerrain(
                          section.id,
                          e.target.value as Terrain
                        )
                      }
                      className="w-full sm:w-auto p-1.5 text-sm border rounded"
                      title={getTerrainLabel(section.terrain)}
                    >
                      <option value="FLAT">{t('terrain_flat')}</option>
                      <option value="HIKING_TRAIL">
                        {t('terrain_hiking_trail')}
                      </option>
                      <option value="DIFFICULT">
                        {t('terrain_difficult')}
                      </option>
                      <option value="ALPINE">{t('terrain_alpine')}</option>
                      <option value="TECHNICAL_ALPINE">
                        {t('terrain_technical_alpine')}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-500">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>
                {t('gpxTotalDistance')}:{' '}
                {sections
                  .reduce((sum, s) => sum + s.horizontalDistance, 0)
                  .toFixed(2)}{' '}
                km
              </span>
              <span className="flex items-center gap-1">
                <FaArrowUp className="text-green-600" />
                {sections.reduce((sum, s) => sum + s.elevationGain, 0)} m
              </span>
              <span className="flex items-center gap-1">
                <FaArrowDown className="text-red-600" />
                {sections.reduce((sum, s) => sum + s.elevationLoss, 0)} m
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { SECTION_COLORS };
export default RouteSections;
