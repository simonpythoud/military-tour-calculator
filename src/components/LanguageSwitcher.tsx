import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types/Language';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex justify-center mt-6 gap-2">
      {['en', 'de', 'fr', 'it', 'rm'].map((lang) => (
        <button
          type="button"
          key={lang}
          onClick={() => setLanguage(lang as Language)}
          className={`px-3 py-1 rounded ${
            language === lang
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
