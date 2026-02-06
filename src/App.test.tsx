import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';

describe('App', () => {
  it('renders language switcher', () => {
    render(
      <LanguageProvider>
        <App />
      </LanguageProvider>
    );
    const languageButton = screen.getByText('EN');
    expect(languageButton).toBeInTheDocument();
  });
});
