import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GpxUpload from './GpxUpload';
import { LanguageProvider } from '../contexts/LanguageContext';
import { toast } from 'react-toastify';
import { MAX_FILE_SIZE } from '../constants/limits';
import type React from 'react';

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock LanguageContext to provide simple translations if needed,
// but using the real provider is fine if it works without external deps.
// The real LanguageProvider imports translations synchronously so it should be fine.

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

describe('GpxUpload', () => {
  it('shows error when file is too large', () => {
    const onRouteLoaded = vi.fn();
    const onClearRoute = vi.fn();
    renderWithProviders(
      <GpxUpload
        onRouteLoaded={onRouteLoaded}
        hasRoute={false}
        onClearRoute={onClearRoute}
      />
    );

    const input = screen.getByLabelText(/Upload Route File/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // Mock a large file
    const file = new File([''], 'large.gpx', { type: 'application/gpx+xml' });
    Object.defineProperty(file, 'size', { value: MAX_FILE_SIZE + 1 });

    Object.defineProperty(input, 'files', {
      value: [file],
    });
    fireEvent.change(input);

    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/too large/i));
    expect(onRouteLoaded).not.toHaveBeenCalled();
  });

  it('shows error when file extension is invalid', () => {
    const onRouteLoaded = vi.fn();
    const onClearRoute = vi.fn();
    renderWithProviders(
      <GpxUpload
        onRouteLoaded={onRouteLoaded}
        hasRoute={false}
        onClearRoute={onClearRoute}
      />
    );

    const input = screen.getByLabelText(/Upload Route File/i) as HTMLInputElement;

    const file = new File(['content'], 'test.exe', { type: 'application/x-msdownload' });

    Object.defineProperty(input, 'files', {
      value: [file],
    });
    fireEvent.change(input);

    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/invalid file extension/i));
    expect(onRouteLoaded).not.toHaveBeenCalled();
  });
});
