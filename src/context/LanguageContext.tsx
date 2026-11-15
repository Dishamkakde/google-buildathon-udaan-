import React, { createContext, useContext, useState } from 'react';

export type LanguageCode = 'en' | 'kn' | 'hi';

interface Translations {
  tagline: string;
  getHelpNow: string;
  reportNeed: string;
  findResources: string;
  mission: string;
  howItWorks: string;
  partnerWithUs: string;
  volunteer: string;
  voiceRequestNotice: string;
  tapToSpeak: string;
  listening: string;
  voicePlaceholder: string;
  submitRequest: string;
  noIdentificationNeeded: string;
  emergencyNotice: string;
}

const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    tagline: 'No One Should Be Left Behind.',
    getHelpNow: 'Get Help Now',
    reportNeed: 'Report a Person in Need',
    findResources: 'Find Verified Resources',
    mission: 'Our Mission',
    howItWorks: 'How It Works',
    partnerWithUs: 'Partner With Us',
    volunteer: 'Become a Volunteer',
    voiceRequestNotice: 'Speak naturally in Kannada, Hindi, or English. Our AI will understand and coordinate help.',
    tapToSpeak: 'Tap Microphone to Speak',
    listening: 'Listening... Please speak your need and location.',
    voicePlaceholder: 'Example: "I am near Majestic bus stand, I have not eaten since yesterday and need a safe place to sleep tonight."',
    submitRequest: 'Submit Assistance Request',
    noIdentificationNeeded: 'No smartphone, email, Aadhaar or identity document required for emergency help.',
    emergencyNotice: 'If this is a life-threatening medical emergency or severe physical danger, emergency teams will be alerted immediately.'
  },
  kn: {
    tagline: 'ಯಾರೂ ಅಸಹಾಯಕರಾಗಿ ಉಳಿಯಬಾರದು.',
    getHelpNow: 'ಈಗಲೇ ಸಹಾಯ ಪಡೆಯಿರಿ',
    reportNeed: 'ಸಂಕಷ್ಟದಲ್ಲಿರುವವರ ಬಗ್ಗೆ ತಿಳಿಸಿ',
    findResources: 'ದೃಢೀಕೃತ ಆಶ್ರಯ ಮತ್ತು ಆಹಾರ',
    mission: 'ನಮ್ಮ ಧ್ಯೇಯ',
    howItWorks: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    partnerWithUs: 'ಪಾಲುದಾರರಾಗಿ',
    volunteer: 'ಸ್ವಯಂಸೇವಕರಾಗಿ',
    voiceRequestNotice: 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ. ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿ ಮತ್ತು ಸ್ಥಳವನ್ನು ತಿಳಿಸಿ, ನಮ್ಮ ಎಐ ವ್ಯವಸ್ಥೆ ಸಹಾಯ ಒದಗಿಸುತ್ತದೆ.',
    tapToSpeak: 'ಮಾತನಾಡಲು ಮೈಕ್ ಒತ್ತಿರಿ',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ... ದಯವಿಟ್ಟು ನಿಮ್ಮ ಅಗತ್ಯವನ್ನು ತಿಳಿಸಿ.',
    voicePlaceholder: 'ಉದಾಹರಣೆ: "ನಾನು ಮೆಜೆಸ್ಟಿಕ್ ರೈಲ್ವೇ ನಿಲ್ದಾಣದ ಬಳಿ ಇದ್ದೇನೆ. ನಿನ್ನೆಯಿಂದ ಊಟ ಮಾಡಿಲ್ಲ, ಮಲಗಲು ಆಶ್ರಯ ಬೇಕು."',
    submitRequest: 'ಸಹಾಯಕ್ಕಾಗಿ ವಿನಂತಿಸಿ',
    noIdentificationNeeded: 'ತುರ್ತು ಸಹಾಯಕ್ಕೆ ಆಧಾರ್ ಅಥವಾ ಮೊಬೈಲ್ ಫೋನ್ ಕಡ್ಡಾಯವಲ್ಲ.',
    emergencyNotice: 'ತೀವ್ರ ಗಾಯ ಅಥವಾ ಪ್ರಾಣಾಪಾಯವಿದ್ದಲ್ಲಿ ತಕ್ಷಣವೇ ತುರ್ತು ವೈದ್ಯಕೀಯ ತಂಡಕ್ಕೆ ಸಂದೇಶ ರವಾನಿಸಲಾಗುತ್ತದೆ.'
  },
  hi: {
    tagline: 'कोई भी पीछे नहीं छूटना चाहिए।',
    getHelpNow: 'तुरंत सहायता प्राप्त करें',
    reportNeed: 'जरूरतमंद व्यक्ति की सूचना दें',
    findResources: 'सत्यापित संसाधन खोजें',
    mission: 'हमारा उद्देश्य',
    howItWorks: 'यह कैसे काम करता है',
    partnerWithUs: 'भागीदार बनें',
    volunteer: 'स्वयंसेवक बनें',
    voiceRequestNotice: 'हिंदी में बोलें। अपनी समस्या और स्थान बताएं, हमारी एआई प्रणाली तुरंत सहायता जोड़ेगी।',
    tapToSpeak: 'बोलने के लिए माइक दबाएं',
    listening: 'सुन रहे हैं... कृपया अपनी आवश्यकता और जगह बताएं।',
    voicePlaceholder: 'उदाहरण: "मैं मैजेस्टिक के पास हूँ, कल से कुछ नहीं खाया और आज रात सोने के लिए सुरक्षित जगह चाहिए।"',
    submitRequest: 'सहायता अनुरोध भेजें',
    noIdentificationNeeded: 'आपातकालीन सहायता के लिए आधार या स्मार्टफोन की कोई अनिवार्यता नहीं है।',
    emergencyNotice: 'यदि कोई गंभीर चोट या आपातकाल है, तो तत्काल चिकित्सा दल को सूचित किया जाएगा।'
  }
};

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  languageNames: { code: LanguageCode; label: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  const languageNames: { code: LanguageCode; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English' },
    { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' }
  ];

  const t = TRANSLATIONS[currentLanguage];

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: setCurrentLanguage,
        t,
        languageNames
      }}
    >
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
