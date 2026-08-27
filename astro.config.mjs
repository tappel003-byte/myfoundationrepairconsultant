// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.myfoundationrepairconsultant.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/preview/'),
    }),
  ],
  build: {
    format: 'directory',
  },
});
