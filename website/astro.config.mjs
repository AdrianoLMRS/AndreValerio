import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// import vercel from '@astrojs/vercel';
import playformInline from '@playform/inline';
import purgecss from 'astro-purgecss';
import playformCompress from '@playform/compress';
import { loadEnv } from 'vite';
const ALIAS_URL = import.meta.url;

export default defineConfig({
    // output: 'server',
    // adapter: vercel(),
    site: 'https://andrevalerio.com',
    vite: {
        /// <reference types="vite/types/importMeta.d.ts" />
        resolve: {
            alias: {
                '@': new URL('./src', ALIAS_URL),
                '@styles': new URL('./src/styles', ALIAS_URL),
                '@layouts': new URL('./src/layouts', ALIAS_URL),
                '@components': new URL('./src/components', ALIAS_URL),
                '@pages': new URL('./src/pages', ALIAS_URL),
                '@data': new URL('./src/data', ALIAS_URL),
                '@assets': new URL('./src/assets', ALIAS_URL),
                '@hooks': new URL('./src/hooks', ALIAS_URL),
                '@utils': new URL('./src/utils', ALIAS_URL),
                '@types': new URL('./src/types', ALIAS_URL),
            },
        },
        css: {
            minify: true, // Enable CSS minification
            // transformer: 'lightningcss',
        },
        server: {
            // watch: {
            //   usePolling: true,
            // }
            hmr: true, // Disable HMR
        },
    },
    experimental: {
        responsiveImages: true,
    },
    define: {
        'process.env': loadEnv('', process.cwd())
    },
    i18n: {
        locales: ['es', 'en', 'pt-br'],
        defaultLocale: 'en',
        routing: {
            fallbackType: 'redirect',
        },
    },
    integrations: [react(), sitemap(), playformInline(), purgecss({
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

// css: {
//   minify: 'esbuild',
// },
// esbuild: {
//   minify: true,     // * Need css minify for css to run
//   legalComments: 'none',
// },