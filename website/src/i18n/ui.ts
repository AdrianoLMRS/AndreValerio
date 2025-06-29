import { type LanguageCode } from './constants';

// Translation file in .json format (generated w/ LibreTranslate), check: ./translate.js
const modules = import.meta.glob('./locales/*.json', { eager: true });

// This function flattens a nested object into a single-level object with dot notation for keys.
// e.g: { a: { b: 'c' } } becomes { 'a.b': 'c' }
function flatten(obj: Record<string, string>, prefix = ''): Record<string, string> {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        return typeof val === 'object' && val !== null ? Object.assign(acc, flatten(val, fullKey)) : { ...acc, [fullKey]: val };
    }, {} as Record<string, string>);
};

// This function normalizes the language code by removing the './locales/' prefix and '.json' suffix
// e.g: './locales/en.json' becomes 'en' and './locales/pt-BR.json' becomes 'pt-BR'.
export const normalize = (code: string): LanguageCode => code.replace('./locales/', '').replace('.json', '') as LanguageCode;

export const ui = Object.entries(modules).reduce((acc, [path, mod]) => {
    const langCode = normalize(path);
    acc[langCode] = flatten((mod as { default: Record<string, string> }).default);
    return acc;
}, {} as Record<string, Record<string, string>>);