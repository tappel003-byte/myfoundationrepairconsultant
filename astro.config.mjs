// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const hideFromSitemap = [
  '/preview/',
  '/all-articles/finish-materials-as-early-movement-indicators',
  '/all-articles/shrinkage-curing-and-stress-relief',
  '/all-articles/truss-uplift-and-seasonal-movement',
  '/all-articles/what-reinforcing-steel-actually-does',
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
