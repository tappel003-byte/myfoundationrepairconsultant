const LOGO =
  'https://www.myfoundationrepairconsultant.com/MFRC%20Logo.jpg';

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  faqs?: { name: string; text: string }[];
}) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': opts.faqs?.length ? ['Article', 'FAQPage'] : 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    author: { '@type': 'Organization', name: 'My Foundation Repair Consultant' },
    publisher: {
      '@type': 'Organization',
      name: 'My Foundation Repair Consultant',
      logo: { '@type': 'ImageObject', url: LOGO },
    },
  };
  if (opts.faqs?.length) {
    base.mainEntity = opts.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.name,
      acceptedAnswer: { '@type': 'Answer', text: faq.text },
    }));
  }
  return base;
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
