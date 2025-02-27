import { defineConfig } from 'astro/config';

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
  },
});
