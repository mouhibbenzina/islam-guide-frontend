import React, { createContext, useContext, useState } from 'react';
const LangContext = createContext();

export const translations = {
  en: {
    home:'Home', articles:'Articles', myths:'Misconceptions', contributions:'Civilization',
    pillars:'Pillars', prophets:'Prophets', hadiths:'Hadiths', events:'History',
    quran:'Quran Verses', scholars:'Scholars', population:'Growth Stats',
    community:'Community', testimonies:'Testimonies', chat:'Ask AI 🤖',
    heroBadge:'🌙 The World\'s Most Complete Islamic Platform',
    heroTitle:'Islam: A Complete Way of Life for All Humanity',
    heroSubtitle:'Explore authentic Islamic teachings through Quran verses, Hadiths, history, AI guidance, and community dialogue. Built to share the truth with the world.',
    heroBtn1:'🤖 Ask Sheikh AI', heroBtn2:'Explore Islam →',
    footerText:'نور الحق — Presenting the true light of Islam with knowledge and compassion.',
    footerSub:'Built with ❤️ to share the truth of Islam with all 8 billion humans.',
  },
  ar: {
    home:'الرئيسية', articles:'المقالات', myths:'المفاهيم الخاطئة', contributions:'الحضارة',
    pillars:'الأركان', prophets:'الأنبياء', hadiths:'الأحاديث', events:'التاريخ',
    quran:'آيات قرآنية', scholars:'العلماء', population:'إحصائيات النمو',
    community:'المجتمع', testimonies:'الشهادات', chat:'اسأل الذكاء الاصطناعي 🤖',
    heroBadge:'🌙 أشمل منصة إسلامية في العالم',
    heroTitle:'الإسلام: منهج حياة متكامل لكل البشرية',
    heroSubtitle:'استكشف التعاليم الإسلامية الأصيلة من خلال آيات القرآن والأحاديث والتاريخ وإرشادات الذكاء الاصطناعي والحوار المجتمعي.',
    heroBtn1:'🤖 اسأل الشيخ الذكي', heroBtn2:'استكشف الإسلام ←',
    footerText:'نور الحق — تقديم النور الحقيقي للإسلام بالعلم والرحمة.',
    footerSub:'بُني بـ ❤️ لمشاركة حقيقة الإسلام مع كل البشر الثمانية مليارات.',
  },
  fr: {
    home:'Accueil', articles:'Articles', myths:'Idées Reçues', contributions:'Civilisation',
    pillars:'Piliers', prophets:'Prophètes', hadiths:'Hadiths', events:'Histoire',
    quran:'Versets Coraniques', scholars:'Érudits', population:'Stats de Croissance',
    community:'Communauté', testimonies:'Témoignages', chat:'Demander à l\'IA 🤖',
    heroBadge:'🌙 La Plateforme Islamique la Plus Complète au Monde',
    heroTitle:'L\'Islam: Un Mode de Vie Complet pour Toute l\'Humanité',
    heroSubtitle:'Explorez les enseignements islamiques authentiques à travers les versets coraniques, les hadiths, l\'histoire, l\'IA et le dialogue communautaire.',
    heroBtn1:'🤖 Demander à Sheikh IA', heroBtn2:'Explorer l\'Islam →',
    footerText:'نور الحق — Présenter la vraie lumière de l\'Islam avec connaissance et compassion.',
    footerSub:'Construit avec ❤️ pour partager la vérité de l\'Islam avec les 8 milliards d\'humains.',
  }
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const isRTL = lang === 'ar';
  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LangContext.Provider>
  );
}
export function useLang() { return useContext(LangContext); }
