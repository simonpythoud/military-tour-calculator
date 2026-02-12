import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TourCalculator from './TourCalculator';
import { LanguageProvider } from '../contexts/LanguageContext';
import { MAX_HORIZONTAL_DISTANCE, MAX_VERTICAL_DISTANCE } from '../constants/limits';

// Mock child components to simplify testing
vi.mock('./GpxUpload', () => ({
  default: () => <div data-testid="gpx-upload">GpxUpload</div>,
}));
vi.mock('./PerformanceGraph', () => ({
  default: () => <div data-testid="performance-graph">PerformanceGraph</div>,
}));
vi.mock('./RouteMap', () => ({
  default: () => <div data-testid="route-map">RouteMap</div>,
}));
vi.mock('./RouteSections', () => ({
  default: () => <div data-testid="route-sections">RouteSections</div>,
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('TourCalculator Input Limits', () => {
  const renderComponent = () => {
    return render(
      <LanguageProvider>
        <TourCalculator />
      </LanguageProvider>
    );
  };

  it('limits horizontal distance input', () => {
    renderComponent();

    // Find the input by label text (using regex to match partial text)
    const input = screen.getByLabelText(/Horizontal Distance/i) as HTMLInputElement;

    // Try to enter a value larger than MAX
    fireEvent.change(input, { target: { value: String(MAX_HORIZONTAL_DISTANCE + 100) } });

    // Check if the value is clamped
    expect(Number(input.value)).toBe(MAX_HORIZONTAL_DISTANCE);

    // Try to enter a negative value
    fireEvent.change(input, { target: { value: '-10' } });
    expect(Number(input.value)).toBe(0);

    // Try a valid value
    fireEvent.change(input, { target: { value: '50' } });
    expect(Number(input.value)).toBe(50);
  });

  it('limits vertical distance input', () => {
    renderComponent();

    const input = screen.getByLabelText(/Vertical Distance/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: String(MAX_VERTICAL_DISTANCE + 1000) } });
    expect(Number(input.value)).toBe(MAX_VERTICAL_DISTANCE);

    fireEvent.change(input, { target: { value: '-100' } });
    expect(Number(input.value)).toBe(0);

    fireEvent.change(input, { target: { value: '500' } });
    expect(Number(input.value)).toBe(500);
  });
});
