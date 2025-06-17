import type { AstroIntegration } from 'astro';
import { generateSEO } from '../i18n/gen-seo.js';
import { translateAll } from '../i18n/translate';
import { log } from './utils.ts';

export default function i18nIntegration(): AstroIntegration {
    return {
        name: 'astro-i18n-prebuild',
        hooks: {
            'astro:build:start': async () => {
                log('i18n', 'Generating SEO JSON...');
                await generateSEO()
                    .then(() => log('i18n', 'SEO JSON generated successfully!', 'success'))
                    .catch((e) => {
                        log('i18n', `Error generating SEO JSON: ${e.message}`, 'error');
                        throw e;
                    });

                log('i18n', 'Translating locales...');
                await translateAll()
                    .then(() => log('i18n', 'Locales translated successfully!', 'success'))
                    .catch((e) => {
                        log('i18n', `Error translating locales: ${e.message}`, 'error');
                        throw e;
                    });

                log('i18n', 'i18n integration completed successfully!', 'success');
            }
        }
    };
}