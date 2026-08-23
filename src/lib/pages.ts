import manifest from '../../content/extracted/manifest.json';

export interface PageEntry {
  url: string;
  slug: string;
  title: string;
  description: string;
  type: 'hub-custom' | 'page' | 'article';
  file: string;
  status?: string;
}

export const pages = manifest as PageEntry[];

export function getPageByPath(path: string): PageEntry | undefined {
  const normalized = path === '/' ? '/start-here' : path.replace(/\/$/, '');
  return pages.find((p) => p.url === normalized || p.url === path);
}

export function getAllRoutes(): { params: { slug: string }; props: PageEntry }[] {
  return pages.map((page) => {
    const slug = page.url.replace(/^\//, '');
    return { params: { slug }, props: page };
  });
}

export function cleanTitle(title: string): string {
  return title
    .replace(/\s*[|—–-]\s*My Foundation Repair Consultant.*$/i, '')
    .replace(/\s*[|—–-]\s*MFRC.*$/i, '')
    .trim();
}
