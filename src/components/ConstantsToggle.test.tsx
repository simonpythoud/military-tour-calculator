import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConstantsToggle from './ConstantsToggle';

// Mock useLanguage
vi.mock('../contexts/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => children,
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        useCustomFactorConstants: 'Use custom constants',
        useDefaultFactorConstants: 'Use default constants',
        customConstants: 'Custom Constants',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ConstantsToggle', () => {
  const mockSetUseCustomFactorConstants = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    mockSetUseCustomFactorConstants.mockClear();
    // Simulate having custom constants available so the toggle is enabled
    window.localStorage.setItem('customConstants', '{}');
  });

  it('renders correctly', () => {
    render(
      <ConstantsToggle
        useCustomFactorConstants={false}
        setUseCustomFactorConstants={mockSetUseCustomFactorConstants}
      />
    );
    expect(screen.getByText('Use default constants')).toBeInTheDocument();
  });

  it('toggles value when clicked', () => {
    render(
      <ConstantsToggle
        useCustomFactorConstants={false}
        setUseCustomFactorConstants={mockSetUseCustomFactorConstants}
      />
    );

    const button = screen.getByRole('switch');
    fireEvent.click(button);

    expect(mockSetUseCustomFactorConstants).toHaveBeenCalledWith(true);
  });

  it('is accessible as a switch', () => {
    render(
      <ConstantsToggle
        useCustomFactorConstants={true}
        setUseCustomFactorConstants={mockSetUseCustomFactorConstants}
      />
    );

    // This should fail before the fix
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAttribute('aria-label', 'Custom Constants');
  });

  it('displays correct state text', () => {
    const { rerender } = render(
      <ConstantsToggle
        useCustomFactorConstants={false}
        setUseCustomFactorConstants={mockSetUseCustomFactorConstants}
      />
    );
    expect(screen.getByText('Use default constants')).toBeInTheDocument();

    rerender(
      <ConstantsToggle
        useCustomFactorConstants={true}
        setUseCustomFactorConstants={mockSetUseCustomFactorConstants}
      />
    );
    expect(screen.getByText('Use custom constants')).toBeInTheDocument();
  });

  it('is disabled when no custom constants exist', () => {
    window.localStorage.removeItem('customConstants');
    render(
      <ConstantsToggle
        useCustomFactorConstants={false}
        setUseCustomFactorConstants={mockSetUseCustomFactorConstants}
      />
    );

    const button = screen.getByRole('switch');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });
});
