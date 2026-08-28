// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const hideFromSitemap = [
  '/preview/',
  '/all-articles/foundation-problem-vs-normal-settling-how-to-evaluate-what-youre-seeing-1',
];

export default defineConfig({
  site: 'https://www.myfoundationrepairconsultant.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !hideFromSitemap.some((part) => page.includes(part)),
    }),
  ],
  build: {
    format: 'directory',
  },
});
