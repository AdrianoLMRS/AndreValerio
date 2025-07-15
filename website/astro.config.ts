import { defineConfig } from 'astro/config';
// * Astro Integrations
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import playformInline from '@playform/inline';
import purgecss from 'astro-purgecss';
import playformCompress from '@playform/compress';

// * My integrations
import YTfetchIntegration from './src/integrations/fetch-videos';

// * Config
export default defineConfig({
    site: 'https://andrevalerio.com',
    vite: {
        /// <reference types="vite/types/importMeta.d.ts" />
        resolve: {
            alias: {
                '@': String(new URL('./src', import.meta.url)),
                '@styles': String(new URL('./src/styles', import.meta.url)),
                '@layouts': String(new URL('./src/layouts', import.meta.url)),
                '@components': String(new URL('./src/components', import.meta.url)),
                '@pages': String(new URL('./src/pages', import.meta.url)),
                '@data': String(new URL('./src/data', import.meta.url)),
                '@assets': String(new URL('./src/assets', import.meta.url)),
                '@hooks': String(new URL('./src/hooks', import.meta.url)),
                '@utils': String(new URL('./src/utils', import.meta.url)),
                '@types': String(new URL('./src/types', import.meta.url)),
                '@i18n': String(new URL('./src/i18n', import.meta.url)),
            },
        },
    },
    experimental: {
        responsiveImages: true,
    },
    integrations: [YTfetchIntegration(), react(), sitemap(), playformInline(), purgecss({
        fontFace: true,
        keyframes: true,
        rejected: true,
        variables: true,
        safelist: {
            greedy: [
                /*astro*/
            ]
        }
        // safelist: ['playform-inline', 'playform-inline-iframe', 'playform-inline-iframe-container', 'playform-inline-iframe-container--loading', 'playform-inline-iframe-container--loaded', 'playform-inline-iframe-container--error'],
    }), playformCompress()],
    prefetch: {
        prefetchAll: true,
    },
});