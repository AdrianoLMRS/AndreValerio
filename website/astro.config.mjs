import { defineConfig } from 'astro/config';
// const BASE_URL = import.meta.env.BASE_URL

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@styles': new URL('./src/styles', import.meta.url),
      },
    },
    // * Need css minify for css to run
    css: {
      minify: true,
    },
    // site: BASE_URL.toString(),
    // base: 'website',
  },
});

// css: {
//   minify: 'esbuild',
// },
// esbuild: {
//   minify: true,     // * Need css minify for css to run
//   legalComments: 'none',
// },