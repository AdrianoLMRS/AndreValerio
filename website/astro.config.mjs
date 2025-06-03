import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';
import playformInline from '@playform/inline';
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
            // * Need css minify for css to run
            minify: true,
        },
        server: {
            // watch: {
            //   usePolling: true,
            // }
            hmr: true, // Disable HMR
        },
    },
    image: {
        domains: ['https://placehold.jp'],
        remotePatterns: [{ protocol: 'https' }],
        service: passthroughImageService(),
        // experimentalLayout: 'responsive',
    },
    experimental: {
        responsiveImages: true,
    },
    define: {
        'process.env': loadEnv('', process.cwd())
    },
    // site: BASE_URL.toString(),
    // base: 'website',

    integrations: [react(), sitemap(), playformInline()],
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