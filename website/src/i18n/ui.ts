const modules = import.meta.glob('./locales/*.json', { eager: true });

// This function flattens a nested object into a single-level object with dot notation for keys.
function flatten(obj: Record<string, string>, prefix = ''): Record<string, string> {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        return typeof val === 'object' && val !== null ? Object.assign(acc, flatten(val, fullKey)) : { ...acc, [fullKey]: val };
    }, {} as Record<string, string>);
};

// This function normalizes the language code by removing the './locales/' prefix and '.json' suffix
// e.g: './locales/en.json' becomes 'en' and './locales/pt-BR.json' becomes 'pt_BR'.
const normalize = (code: string) => code.replace('./locales/', '').replace('.json', '').replace('-', '_');

export const languages = {
    en: 'English',
    pt: 'Português',
    pt_BR: 'Português (Brasil)',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    // it: 'Italiano',
};

export const defaultLang = 'en';

export const ui = Object.entries(modules).reduce((acc, [path, mod]) => {
    const langCode = normalize(path);
    acc[langCode] = flatten((mod as { default: Record<string, string> }).default);
    return acc;
}, {} as Record<string, Record<string, string>>);

console.debug(ui);
