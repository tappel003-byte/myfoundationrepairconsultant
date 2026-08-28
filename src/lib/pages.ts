import manifest from '../../content/extracted/manifest.json';
import fs from 'node:fs';
import path from 'node:path';

export interface PageEntry {
  url: string;
  slug: string;
  title: string;
  description: string;
  type: 'hub-custom' | 'page' | 'article';
  file: string;
  status?: string;
}

const extractDir = path.join(process.cwd(), 'content/extracted');

export const pages = (manifest as PageEntry[])
  .filter((page, index, arr) => {
    if (!fs.existsSync(path.join(extractDir, page.file))) return false;
    return arr.findIndex((p) => p.url === page.url) === index;
  })
  .map((page) => {
    const { status: _status, ...rest } = page;
    const description = rest.description?.includes('under construction')
      ? rest.title.replace(/\s+[\u2014\u2013|-]\s+My Foundation Repair Consultant.*$/i, '').trim() + '.'
      : rest.description?.includes('It all begins with an idea')
        ? rest.title.replace(/\s+[\u2014\u2013|-]\s+My Foundation Repair Consultant.*$/i, '').trim() + '.'
        : rest.description;
    return { ...rest, description };
  });

export function getPageByPath(pathName: string): PageEntry | undefined {
  const normalized = pathName === '/' ? '/start-here' : pathName.replace(/\/$/, '');
  return pages.find((p) => p.url === normalized || p.url === pathName);
}

export function getAllRoutes(): { params: { slug: string }; props: PageEntry }[] {
  return pages.map((page) => {
    const slug = page.url.replace(/^\//, '');
    return { params: { slug }, props: page };
  });
}

export function cleanTitle(title: string): string {
  return title
    .replace(/\s*[|\u2014\u2013-]\s*My Foundation Repair Consultant.*$/i, '')
    .replace(/\s*[|\u2014\u2013-]\s*MFRC.*$/i, '')
    .trim();
}
