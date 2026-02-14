import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TourCalculator from './TourCalculator';
import { LanguageProvider } from '../contexts/LanguageContext';
import { MAX_CONSTANTS_FILE_SIZE } from '../constants/limits';
import { toast } from 'react-toastify';

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

describe('TourCalculator Constants Upload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <LanguageProvider>
        <TourCalculator />
      </LanguageProvider>
    );
  };

  it('prevents upload of files larger than limit', async () => {
    renderComponent();

    // Open settings modal using the cog icon button
    const settingsButton = screen.getByRole('button', {
      name: /Calculation Constants/i,
    });
    fireEvent.click(settingsButton);

    // Find file input by its label
    const fileInput = screen.getByLabelText(
      /Upload Constants/i
    ) as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();

    // Create a mock large file
    const largeFile = new File([''], 'large_constants.json', {
      type: 'application/json',
    });
    // Mock the size property to exceed the limit
    Object.defineProperty(largeFile, 'size', {
      value: MAX_CONSTANTS_FILE_SIZE + 1,
    });

    // Mock file.text() to ensure it's NOT called
    // We attach it to the instance because JSDOM might not have it or we want to spy on it
    largeFile.text = vi.fn().mockResolvedValue('{}');

    // Simulate upload
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Verify toast error
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringMatching(/too large/i)
      );
    });

    // Verify text() was not called (meaning parsing was skipped)
    expect(largeFile.text).not.toHaveBeenCalled();
  });

  it('allows upload of valid files within size limit', async () => {
    renderComponent();

    const settingsButton = screen.getByRole('button', {
      name: /Calculation Constants/i,
    });
    fireEvent.click(settingsButton);

    const fileInput = screen.getByLabelText(
      /Upload Constants/i
    ) as HTMLInputElement;

    const validJson = JSON.stringify({
      BASE_SPEEDS: { HORIZONTAL: 4, VERTICAL: 400 },
    });
    const validFile = new File([validJson], 'valid_constants.json', {
      type: 'application/json',
    });
    // Ensure size is within limit
    Object.defineProperty(validFile, 'size', {
      value: MAX_CONSTANTS_FILE_SIZE - 1,
    });

    // Mock text()
    validFile.text = vi.fn().mockResolvedValue(validJson);

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    // Verify text() WAS called (meaning checks passed)
    await waitFor(() => {
      expect(validFile.text).toHaveBeenCalled();
    });

    // Note: We don't check for success toast because validateConstants might fail with minimal JSON,
    // but the point is that it PASSED the size check.
  });
});
