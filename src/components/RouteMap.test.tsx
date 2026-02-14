import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RouteMap from './RouteMap';
import { LanguageProvider } from '../contexts/LanguageContext';
import type { RouteSection } from '../types';
import type React from 'react';

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  TileLayer: () => <div>TileLayer</div>,
  Polyline: () => <div>Polyline</div>,
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('RouteMap', () => {
  it('renders without crashing for small inputs', () => {
    const sections: RouteSection[] = [
      {
        id: '1',
        name: 'Section 1',
        points: [{ lat: 0, lon: 0, ele: 0, distanceFromStart: 0 }],
        horizontalDistance: 10,
        elevationGain: 100,
        elevationLoss: 0,
        terrain: 'FLAT',
        startIndex: 0,
        endIndex: 1,
      },
    ];

    render(
      <LanguageProvider>
        <RouteMap sections={sections} />
      </LanguageProvider>
    );
  });

  it('renders without crashing for large inputs (DoS protection)', () => {
    // Create a large number of points to trigger stack overflow with spread syntax
    // 200,000 points is usually enough to exceed call stack size
    const largePoints = Array.from({ length: 200000 }, (_, i) => ({
      lat: i * 0.001,
      lon: i * 0.001,
      ele: 100,
      distanceFromStart: i,
    }));

    const sections: RouteSection[] = [
      {
        id: '1',
        name: 'Large Section',
        points: largePoints,
        horizontalDistance: 100,
        elevationGain: 1000,
        elevationLoss: 0,
        terrain: 'FLAT',
        startIndex: 0,
        endIndex: 199999,
      },
    ];

    // This should fail if the spread syntax bug exists
    expect(() => {
      render(
        <LanguageProvider>
          <RouteMap sections={sections} />
        </LanguageProvider>
      );
    }).not.toThrow();
  });
});
