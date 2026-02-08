import type React from 'react';
import { useState } from 'react';
import TourCalculator from './components/TourCalculator';
import V2Calculator from './components/v2/V2Calculator';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

type AppVersion = 'v1' | 'v2';

const VersionTabs: React.FC<{
  version: AppVersion;
  onVersionChange: (v: AppVersion) => void;
}> = ({ version, onVersionChange }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto mb-4 px-3 sm:px-6">
      <div className="flex rounded-lg overflow-hidden border border-gray-300 w-fit">
        <button
          type="button"
          onClick={() => onVersionChange('v1')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            version === 'v1'
              ? 'bg-military-green text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          V1
        </button>
        <button
          type="button"
          onClick={() => onVersionChange('v2')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            version === 'v2'
              ? 'bg-military-green text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          V2 {t('v2_beta_tag')}
        </button>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [version, setVersion] = useState<AppVersion>('v1');

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-16">
      <VersionTabs version={version} onVersionChange={setVersion} />
      <ErrorBoundary>
        {version === 'v1' ? <TourCalculator /> : <V2Calculator />}
      </ErrorBoundary>
      <LanguageSwitcher />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
