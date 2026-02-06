import type React from 'react';
import TourCalculator from './components/TourCalculator';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 py-8 pb-16">
        <ErrorBoundary>
          <TourCalculator />
        </ErrorBoundary>
        <LanguageSwitcher />
      </div>
    </LanguageProvider>
  );
};

export default App;
