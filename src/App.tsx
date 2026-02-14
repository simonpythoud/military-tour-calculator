import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import TourCalculator from './components/TourCalculator';
import V2Calculator from './components/v2/V2Calculator';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AppVersion = 'v1' | 'v2';

const getVersionFromPath = (): AppVersion => {
  const path = window.location.pathname;
  if (path === '/v2' || path === '/v2/') return 'v2';
  return 'v1';
};

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [version, setVersion] = useState<AppVersion>(getVersionFromPath);

  const handleVersionChange = useCallback((v: AppVersion) => {
    setVersion(v);
    const newPath = v === 'v2' ? '/v2' : '/';
    window.history.pushState({}, '', newPath);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setVersion(getVersionFromPath());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-16">
      <ErrorBoundary>
        {version === 'v1' ? <TourCalculator /> : <V2Calculator />}
      </ErrorBoundary>
      <LanguageSwitcher />
      {version === 'v1' && (
        <div className="max-w-4xl mx-auto mt-8 px-3 sm:px-6 text-center">
          <button
            type="button"
            onClick={() => handleVersionChange('v2')}
            className="text-xs text-gray-400 hover:text-gray-500 transition-colors"
          >
            {t('v2_beta_tag')}
          </button>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
