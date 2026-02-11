import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GpxUpload from './GpxUpload';
import { LanguageProvider } from '../contexts/LanguageContext';
import { toast } from 'react-toastify';
import { MAX_FILE_SIZE } from '../constants/limits';
import * as gpxParser from '../utils/gpxParser';
import type React from 'react';

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock gpxParser
vi.mock('../utils/gpxParser', async () => {
  const actual = await vi.importActual('../utils/gpxParser');
  return {
    ...actual,
    parseNavigationFile: vi.fn(),
  };
});

describe('GpxUpload', () => {
  const mockOnRouteLoaded = vi.fn();
  const mockOnClearRoute = vi.fn();

  const renderComponent = (hasRoute = false) => {
    return render(
      <LanguageProvider>
        <GpxUpload
          onRouteLoaded={mockOnRouteLoaded}
          hasRoute={hasRoute}
          onClearRoute={mockOnClearRoute}
        />
      </LanguageProvider>
    );
  };

  it('shows error when file is too large', () => {
    renderComponent();

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // Mock a large file
    const file = new File([''], 'large.gpx', { type: 'application/gpx+xml' });
    Object.defineProperty(file, 'size', { value: MAX_FILE_SIZE + 1 });

    Object.defineProperty(input, 'files', {
      value: [file],
    });
    fireEvent.change(input);

    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/too large/i));
    expect(mockOnRouteLoaded).not.toHaveBeenCalled();
  });

  it('shows error when file extension is invalid', () => {
    renderComponent();

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    const file = new File(['content'], 'test.exe', { type: 'application/x-msdownload' });

    Object.defineProperty(input, 'files', {
      value: [file],
    });
    fireEvent.change(input);

    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/invalid file extension/i));
    expect(mockOnRouteLoaded).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByText('Route Import')).toBeInTheDocument();
    expect(screen.getByText('Upload Route File')).toBeInTheDocument();
    expect(screen.getByText(/or drag & drop file here/i)).toBeInTheDocument();
  });

  it('handles file upload via input', async () => {
    const mockRoute = {
      name: 'Test Route',
      points: [],
      sections: [],
      totalDistance: 10,
      totalElevationGain: 100,
      totalElevationLoss: 50,
    };

    vi.spyOn(gpxParser, 'parseNavigationFile').mockReturnValue(mockRoute);

    const { container } = renderComponent();

    const file = new File(['<gpx></gpx>'], 'test.gpx', {
      type: 'application/gpx+xml',
    });
    // Mock text() method since it might not be fully implemented in jsdom or to control the value
    file.text = vi.fn().mockResolvedValue('<gpx></gpx>');

    // Finding input by label text might fail if label contains other elements or if testing library strictness.
    // Using container.querySelector is safer for hidden inputs in this context.
    const fileInput = container.querySelector('input[type="file"]');

    if (!fileInput) throw new Error('File input not found');

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(gpxParser.parseNavigationFile).toHaveBeenCalled();
    });

    expect(mockOnRouteLoaded).toHaveBeenCalledWith(mockRoute);
  });

  it('handles drag and drop', async () => {
    const mockRoute = {
      name: 'Test Route',
      points: [],
      sections: [],
      totalDistance: 10,
      totalElevationGain: 100,
      totalElevationLoss: 50,
    };

    vi.spyOn(gpxParser, 'parseNavigationFile').mockReturnValue(mockRoute);

    renderComponent();

    // Find the drop zone (the main container)
    // We can identify it by text content or structure.
    // The closest div to the title seems safe.
    const title = screen.getByText('Route Import');
    const dropZone = title.closest('div');

    if (!dropZone) throw new Error('Drop zone not found');

    // Test Drag Over
    fireEvent.dragOver(dropZone);
    expect(dropZone.className).toContain('bg-green-50');
    expect(dropZone.className).toContain('border-dashed');

    // Test Drag Leave
    fireEvent.dragLeave(dropZone);
    expect(dropZone.className).toContain('bg-white');
    expect(dropZone.className).not.toContain('border-dashed');

    // Test Drop
    const file = new File(['<gpx></gpx>'], 'test.gpx', {
      type: 'application/gpx+xml',
    });
    file.text = vi.fn().mockResolvedValue('<gpx></gpx>');

    const dataTransfer = {
      files: [file],
      types: ['Files'],
    };

    fireEvent.drop(dropZone, { dataTransfer });

    await waitFor(() => {
      expect(gpxParser.parseNavigationFile).toHaveBeenCalled();
    });

    expect(mockOnRouteLoaded).toHaveBeenCalledWith(mockRoute);
  });
});
