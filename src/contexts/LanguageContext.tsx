import React, { createContext, useState, useContext } from 'react';
import en from '../translations/en';
import de from '../translations/de';
import fr from '../translations/fr';
import it from '../translations/it';
import rm from '../translations/rm';

type Language = 'en' | 'de' | 'fr' | 'it' | 'rm';

const translations = { en, de, fr, it, rm };

// Add this type using the English translations as the source of truth
type TranslationKey = keyof typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 