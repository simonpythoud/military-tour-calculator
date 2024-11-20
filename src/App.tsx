import React from 'react';
import TourCalculator from './components/TourCalculator';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <TourCalculator />
        <LanguageSwitcher />
      </div>
    </LanguageProvider>
  );
};

export default App; 
