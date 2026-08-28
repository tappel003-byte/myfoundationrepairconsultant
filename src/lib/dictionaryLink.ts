export type DictTerm = {
  id: string;
  names: string[];
  def: string;
};

export const DICT_TERMS: DictTerm[] = [
  {
    id: 'differential-settlement',
    names: ['differential settlement'],
    def: 'Uneven settlement across a foundation. The difference usually matters more than the total movement.',
  },
  {
    id: 'geotechnical-investigation',
    names: ['geotechnical investigation', 'geotechnical report'],
    def: 'A site-specific study of soil, rock, and groundwater. Visual cracks cannot replace it.',
  },
  {
    id: 'helical-pier',
    names: ['helical piers', 'helical pier'],
    def: 'A steel shaft with helix plates screwed into soil. Capacity comes from the soils the plates actually reach.',
  },
  {
    id: 'compaction-grouting',
    names: ['compaction grouting'],
    def: 'Thick grout injected to densify soil. It is a ground-improvement method, not a deep foundation.',
  },
  {
    id: 'expansive-soil',
    names: ['expansive clays', 'expansive clay', 'expansive soil'],
    def: 'Clay that swells when wet and shrinks when dry. Presence is not a diagnosis of failure.',
  },
  {
    id: 'collapsible-soil',
    names: ['collapsible soils', 'collapsible soil'],
    def: 'A dry deposit that can lose strength the first time it takes sustained wetting under load.',
  },
  {
    id: 'bearing-capacity',
    names: ['bearing capacity'],
    def: 'The load the supporting soil can safely carry. It is not a property of the pier by itself.',
  },
  {
    id: 'load-testing',
    names: ['load testing', 'load test'],
    def: 'A field procedure that applies known load and measures movement. Installation torque is not a load test.',
  },
  {
    id: 'torque-correlation',
    names: ['torque correlation'],
    def: 'An estimate of helical capacity from installation torque. Useful. Not proof of long-term performance.',
  },
  {
    id: 'underpinning',
    names: ['underpinning'],
    def: 'Adding support beneath an existing foundation. Hearing the word is not a diagnosis.',
  },
  {
    id: 'micropile',
    names: ['micropiles', 'micropile'],
    def: 'A small-diameter grouted pile. Capacity comes from grout-to-ground bond along the shaft, not from the tip.',
  },
  {
    id: 'push-pier',
    names: ['push piers', 'push pier'],
    def: 'A steel section driven to refusal. Resistance during driving is not a proven capacity.',
  },
  {
    id: 'soil-report',
    names: ['soil reports', 'soil report'],
    def: 'A document describing subsurface conditions. Many residential repairs never receive one.',
  },
  {
    id: 'caliche',
    names: ['caliche'],
    def: 'A cemented desert layer. It can stop a probe before the soil that actually governs movement is reached.',
  },
  {
    id: 'bond-strength',
    names: ['bond strength', 'grout-to-ground bond'],
    def: 'The resistance developed between grout and the surrounding ground along a micropile shaft.',
  },
  {
    id: 'load-path',
    names: ['load path'],
    def: 'The route force takes from the structure into the foundation and into the ground.',
  },
];

function escapeAttr(value: string) {
  return value.replace(/&/g, '&').replace(/"/g, '"');
}

export function linkFirstMentions(html: string): string {
  const parts = html.split(/(<[^>]+>)/);
  let inAnchor = 0;
  let inHeading = 0;
  const used = new Set<string>();

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (part.startsWith('<')) {
      if (/^<a\b/i.test(part)) inAnchor += 1;
      else if (/^<\/a\b/i.test(part)) inAnchor = Math.max(0, inAnchor - 1);
      else if (/^<h[1-3]\b/i.test(part)) inHeading += 1;
      else if (/^<\/h[1-3]\b/i.test(part)) inHeading = Math.max(0, inHeading - 1);
      continue;
    }
    if (inAnchor || inHeading || !part.trim()) continue;

    let text = part;
    for (const term of DICT_TERMS) {
      if (used.has(term.id)) continue;
      const pattern = term.names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      const re = new RegExp(`\\b(${pattern})\\b`, 'i');
      if (!re.test(text)) continue;
      used.add(term.id);
      text = text.replace(
        re,
        (match) =>
          `<a class="dict-term" href="/foundation-repair-dictionary#${term.id}" data-def="${escapeAttr(term.def)}">${match}</a>`
      );
    }
    parts[i] = text;
  }

  return parts.join('');
}
