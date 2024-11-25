import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Military Tour Calculator/i);
  expect(titleElement).toBeInTheDocument();
});
