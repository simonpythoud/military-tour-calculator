import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';

test('renders language switcher', () => {
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
  const languageButton = screen.getByText('EN');
  expect(languageButton).toBeInTheDocument();
});
