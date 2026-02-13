import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RouteMap from './RouteMap';
import { LanguageProvider } from '../contexts/LanguageContext';
import type { RouteSection, RoutePoint } from '../types';
import React from 'react';

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  MapContainer: ({ bounds, children }: any) => (
    <div data-testid="map-container" data-bounds={JSON.stringify(bounds)}>
      {children}
    </div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Polyline: ({ positions, children }: any) => (
    <div data-testid="polyline" data-positions={JSON.stringify(positions)}>
      {children}
    </div>
  ),
  Tooltip: ({ children }: any) => <div data-testid="tooltip">{children}</div>,
}));

// Mock react-icons
vi.mock('react-icons/fa', () => ({
  FaMap: () => <span data-testid="fa-map" />,
  FaChevronDown: () => <span data-testid="fa-chevron-down" />,
  FaChevronUp: () => <span data-testid="fa-chevron-up" />,
}));

describe('RouteMap', () => {
  const mockPoints: RoutePoint[] = [
    { lat: 10, lon: 10, ele: 100, distanceFromStart: 0 },
    { lat: 20, lon: 20, ele: 200, distanceFromStart: 100 },
  ];

  const mockSections: RouteSection[] = [
    {
      id: 's1',
      name: 'Section 1',
      points: mockPoints,
      horizontalDistance: 100,
      elevationGain: 100,
      elevationLoss: 0,
      terrain: 'FLAT',
      startIndex: 0,
      endIndex: 1,
    },
  ];

  const renderComponent = (sections: RouteSection[]) => {
    return render(
      <LanguageProvider>
        <RouteMap sections={sections} />
      </LanguageProvider>
    );
  };

  it('renders correctly with sections', () => {
    renderComponent(mockSections);
    // The translation likely returns "Route Map" (or whatever is in en.ts)
    // We can use a regex to be safe or just expect it to contain "Route Map" or the key if not translated
    // Looking at the error output, it rendered "Route Map"
    expect(screen.getByText(/Route Map/i)).toBeInTheDocument();

    // Map is visible by default
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();

    // Check bounds calculation
    const bounds = JSON.parse(mapContainer.getAttribute('data-bounds') || '[]');
    // Bounds are [[minLat, minLon], [maxLat, maxLon]]
    expect(bounds).toEqual([
      [10, 10],
      [20, 20],
    ]);
  });

  it('handles large number of points without crashing (stack overflow check)', () => {
    // Generate large number of points to trigger stack overflow if spread is used
    // V8 (Node/Chrome) typically has a stack limit around 65k-125k arguments for spread
    const largePoints: RoutePoint[] = [];
    const count = 200000;

    for (let i = 0; i < count; i++) {
        largePoints.push({
          lat: 45 + (i * 0.0001),
          lon: 8 + (i * 0.0001),
          ele: 100,
          distanceFromStart: i
        });
    }

    const largeSection: RouteSection = {
      id: 'large',
      name: 'Large Section',
      points: largePoints,
      horizontalDistance: 100,
      elevationGain: 1000,
      elevationLoss: 1000,
      terrain: 'FLAT',
      startIndex: 0,
      endIndex: count - 1,
    };

    // This should throw "RangeError: Maximum call stack size exceeded" if spread is used on large array
    // Or just work if optimized.
    // We expect it NOT to throw.
    expect(() => renderComponent([largeSection])).not.toThrow();
  });

  it('calculates correct bounds for large dataset', () => {
    const largePoints: RoutePoint[] = [];
    const count = 10000;

    // Min lat/lon at index 0: 45, 8
    // Max lat/lon at index 9999: 45.9999, 8.9999
    for (let i = 0; i < count; i++) {
        largePoints.push({
          lat: 45 + (i * 0.0001),
          lon: 8 + (i * 0.0001),
          ele: 100,
          distanceFromStart: i
        });
    }

    const largeSection: RouteSection = {
      id: 'large-calc',
      name: 'Large Calc Section',
      points: largePoints,
      horizontalDistance: 100,
      elevationGain: 1000,
      elevationLoss: 1000,
      terrain: 'FLAT',
      startIndex: 0,
      endIndex: count - 1,
    };

    renderComponent([largeSection]);
    const mapContainer = screen.getByTestId('map-container');
    const bounds = JSON.parse(mapContainer.getAttribute('data-bounds') || '[]');

    // Floating point precision might be an issue, so we check close enough or exact
    expect(bounds[0][0]).toBeCloseTo(45, 4);
    expect(bounds[0][1]).toBeCloseTo(8, 4);
    expect(bounds[1][0]).toBeCloseTo(45 + (9999 * 0.0001), 4);
    expect(bounds[1][1]).toBeCloseTo(8 + (9999 * 0.0001), 4);
  });
});
