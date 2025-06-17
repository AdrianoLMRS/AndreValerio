import type { AstroIntegration } from 'astro';
import { generateSEO } from '../i18n/gen-seo.js';
import { translateAll } from '../i18n/translate';

export default function i18nIntegration(): AstroIntegration {
    return {
        name: 'astro-i18n-prebuild',
        hooks: {
            'astro:build:start': async () => {
                console.log('[i18n] Generating SEO JSON...');
                await generateSEO();

                console.log('[i18n] Translating locales...');
                await translateAll();
            }
        }
    };
}