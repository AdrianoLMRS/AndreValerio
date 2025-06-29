export const locales = ['en', 'pt', 'pt-BR', 'es', 'fr', 'de', 'it'] as const;
export type LanguageCode = typeof locales[number];

export const languages: Record<LanguageCode, string> = {
    en: 'English',
    pt: 'Português',
    'pt-BR': 'Português (Brasil)',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
};

export const defaultLang: LanguageCode = 'en';