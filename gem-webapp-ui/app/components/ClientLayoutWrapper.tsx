'use client';

import { useEffect, useState } from 'react';
import i18n from '../../lib/i18n';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState(i18n.language || 'en');

  useEffect(() => {
    const onLangChange = (lng: string) => setLang(lng);
    i18n.on('languageChanged', onLangChange);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.className = lang === 'ar' ? 'font-ar' : 'font-en';

    return () => {
      i18n.off('languageChanged', onLangChange);
    };
  }, [lang]);

  return <>{children}</>;
}
