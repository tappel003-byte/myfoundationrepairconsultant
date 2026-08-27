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

export const pages = (manifest as PageEntry[]).map((page) => {
  const { status: _status, ...rest } = page;
  const description = rest.description?.includes('under construction')
    ? rest.title.replace(/\s+[\u2014\u2013|-]\s+My Foundation Repair Consultant.*$/i, '').trim() + '.'
    : rest.description;
  return { ...rest, description };
});

export function getPageByPath(path: string): PageEntry | undefined {
  const normalized = path === '/' ? '/start-here' : path.replace(/\/$/, '');
  return pages.find((p) => p.url === normalized || p.url === path);
}

export function getAllRoutes(): { params: { slug: string }; props: PageEntry }[] {
  const seen = new Set<string>();
  return pages
    .filter((page) => {
      if (seen.has(page.url)) return false;
      seen.add(page.url);
      return true;
    })
    .map((page) => {
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
