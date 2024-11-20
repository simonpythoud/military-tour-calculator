import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex justify-center mt-6 gap-2">
      {['en', 'de', 'fr', 'it', 'rm'].map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang as any)}
          className={`px-3 py-1 rounded ${
            language === lang 
              ? 'bg-military-green text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 