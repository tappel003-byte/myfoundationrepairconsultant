export type DictTerm = {
  id: string;
  names: string[];
  def: string;
};

const DICT_ALIASES: Record<string, string> = {
  'bond-strength': 'bond-strength',
  'load-path': 'load-path',
  'load-testing': 'load-testing',
  'geotechnical-investigation': 'geotechnical-investigation',
  'soil-report': 'soil-report',
  'micropile': 'micropile',
  'helical-pier': 'helical-pier',
  'push-pier': 'push-pier',
  'underpinning': 'underpinning',
  'bearing-capacity': 'bearing-capacity',
  'settlement': 'settlement',
  'differential-settlement': 'differential-settlement',
  'native-soil': 'native-soil',
  'fill': 'fill',
  'expansive-soil': 'expansive-soil',
  'collapsible-soil': 'collapsible-soil',
  'compaction': 'compaction',
};

function toDictId(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function linkDictionaryLists(html: string, dictIds: Set<string>): string {
  return html.replace(
    /<(h2|h3)[^>]*>Related dictionary terms<\/\1>\s*<ul>([\s\S]*?)<\/ul>/gi,
    (full, _tag, list) => {
      const items = [...list.matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((m) =>
        m[1].replace(/<[^>]+>/g, '').trim()
      );
      if (!items.length) return full;
      const linked = items
        .map((item) => {
          const id = DICT_ALIASES[toDictId(item)] || toDictId(item);
          return dictIds.has(id) || DICT_ALIASES[id]
            ? `<li><a href="/foundation-repair-dictionary#${id}">${item}</a></li>`
            : `<li>${item}</li>`;
        })
        .join('');
      return `<h2>Related dictionary terms</h2><ul class="dict-term-list">${linked}</ul>`;
    }
  );
}

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
  {
    id: 'auger-cast-pile',
    names: ['auger-cast piles', 'auger-cast pile'],
    def: 'Also called a CFA pile.',
  },
  {
    id: 'active-zone',
    names: ['active zones', 'active zone'],
    def: 'The depth of soil that experiences significant moisture change—and therefore significant volume change—in response to seasonal weather and surface conditions.',
  },
  {
    id: 'aggregate',
    names: ['aggregates', 'aggregate'],
    def: 'Sand, gravel, or crushed stone used in concrete mixes or as fill material beneath slabs and footings.',
  },
  {
    id: 'allowable-bearing-pressure',
    names: ['allowable bearing pressures', 'allowable bearing pressure'],
    def: 'The amount of pressure soil is considered able to support under design conditions without excessive movement.',
  },
  {
    id: 'allowable-settlement',
    names: ['allowable settlements', 'allowable settlement'],
    def: 'The amount of foundation movement considered acceptable within design assumptions, without causing functional or structural concerns.',
  },
  {
    id: 'anchoring',
    names: ['anchoring'],
    def: 'Methods used to secure structural elements so they resist movement from soil pressure, moisture changes, or applied loads.',
  },
  {
    id: 'bearing-wall',
    names: ['bearing walls', 'bearing wall'],
    def: 'A wall that supports weight from floors, roofs, or other structural elements above it and transfers that load down to the foundation.',
  },
  {
    id: 'basement',
    names: ['basements', 'basement'],
    def: 'A portion of a home that is built partially or entirely below ground level and supported by foundation walls.',
  },
  {
    id: 'beam',
    names: ['beams', 'beam'],
    def: 'A horizontal structural element that carries loads from floors, walls, or roofs and transfers them to columns, walls, or piers below.',
  },
  {
    id: 'bedrock',
    names: ['bedrock'],
    def: 'Solid rock underlying soil and other surface materials.',
  },
  {
    id: 'bentonite',
    names: ['bentonites', 'bentonite'],
    def: 'A highly expansive clay mineral formed from volcanic ash.',
  },
  {
    id: 'bowed-wall',
    names: ['bowed walls', 'bowed wall'],
    def: 'A foundation wall that curves inward or outward rather than remaining straight.',
  },
  {
    id: 'capillary-action',
    names: ['capillary action'],
    def: 'The movement of water through small pores in soil, concrete, or masonry, often against gravity.',
  },
  {
    id: 'carbon-fiber-reinforcement',
    names: ['carbon fiber reinforcements', 'carbon fiber reinforcement'],
    def: 'A method of strengthening foundation walls by applying carbon fiber strips or fabric with high-strength epoxy.',
  },
  {
    id: 'cementitious-material',
    names: ['cementitious materials', 'cementitious material'],
    def: 'Materials that contain cement and harden when mixed with water, such as concrete, mortar, and grout.',
  },
  {
    id: 'clay-plasticity',
    names: ['clay plasticity'],
    def: 'How much a clay soil can change shape when moisture content varies.',
  },
  {
    id: 'clay-soil',
    names: ['clay soils', 'clay soil'],
    def: 'Soil composed of very fine particles that hold water and change volume as moisture levels change.',
  },
  {
    id: 'cold-joint',
    names: ['cold joints', 'cold joint'],
    def: 'A location where two separate concrete placements meet after the first has already begun to cure.',
  },
  {
    id: 'commission-model',
    names: ['commission models', 'commission model'],
    def: 'A compensation structure where a sales professional earns income only when a project is sold, typically with no base salary.',
  },
  {
    id: 'compaction',
    names: ['compaction'],
    def: 'How tightly soil particles are packed together.',
  },
  {
    id: 'concrete-shrinkage',
    names: ['concrete shrinkages', 'concrete shrinkage'],
    def: 'The natural reduction in volume that occurs as concrete cures and dries.',
  },
  {
    id: 'consolidation',
    names: ['consolidation'],
    def: 'The gradual compression of soil over time as water is squeezed out under sustained load.',
  },
  {
    id: 'cosmetic-crack',
    names: ['cosmetic cracks', 'cosmetic crack'],
    def: 'A crack that affects appearance rather than structural performance.',
  },
  {
    id: 'crawlspace',
    names: ['crawlspaces', 'crawlspace'],
    def: 'A shallow area beneath a home that separates the structure from the ground and allows access to utilities.',
  },
  {
    id: 'crawlspace-encapsulation',
    names: ['crawlspace encapsulations', 'crawlspace encapsulation'],
    def: 'The practice of sealing a crawlspace from ground moisture by covering the floor with a heavy vapor barrier and often insulating walls and vents.',
  },
  {
    id: 'drilled-pier',
    names: ['drilled piers', 'drilled pier'],
    def: 'A large-diameter hole drilled into the ground and filled with reinforced concrete, sometimes with a widened base.',
  },
  {
    id: 'driven-pile',
    names: ['driven piles', 'driven pile'],
    def: 'A precast concrete, steel, or timber pile advanced into the ground by impact or vibration rather than drilling.',
  },
  {
    id: 'deflection',
    names: ['deflections', 'deflection'],
    def: 'The amount a structural element bends or moves under load.',
  },
  {
    id: 'downdrag',
    names: ['downdrags', 'downdrag'],
    def: 'Downward forces applied to foundation elements, such as piers or piles, as surrounding soil settles relative to them.',
  },
  {
    id: 'drainage',
    names: ['drainage'],
    def: 'How surface and subsurface water moves around and away from a home.',
  },
  {
    id: 'efflorescence',
    names: ['efflorescences', 'efflorescence'],
    def: 'The white, powdery residue that can appear on concrete or masonry surfaces when moisture moves through the material and evaporates, leaving minerals behind.',
  },
  {
    id: 'erosion',
    names: ['erosions', 'erosion'],
    def: 'The gradual removal of soil due to water flow, wind, or surface runoff.',
  },
  {
    id: 'fill',
    names: ['fill'],
    def: 'Soil or other material brought in and placed to raise, level, or build up a site, rather than soil that formed there naturally.',
  },
  {
    id: 'floor-elevation-survey',
    names: ['floor elevation survey'],
    def: 'A measurement of floor height at multiple points across a structure, used to map how level the floor is and to identify areas of differential movement.',
  },
  {
    id: 'foam-jacking',
    names: ['foam jacking'],
    def: 'The common name for lifting or supporting concrete using expanding polyurethane foam, injected in controlled stages beneath a slab or footing.',
  },
  {
    id: 'footing',
    names: ['footings', 'footing'],
    def: 'The portion of a foundation that spreads the weight of the structure into the soil below.',
  },
  {
    id: 'foundation-crack',
    names: ['foundation cracks', 'foundation crack'],
    def: 'A visible separation in concrete or masonry foundation elements.',
  },
  {
    id: 'free-evaluation',
    names: ['free evaluations', 'free evaluation'],
    def: 'An inspection offered at no cost to the homeowner, typically by a foundation repair company.',
  },
  {
    id: 'freeze-thaw-cycle',
    names: ['freeze-thaw cycles', 'freeze-thaw cycle'],
    def: 'The repeated freezing and thawing of water in soil or materials.',
  },
  {
    id: 'french-drain',
    names: ['french drains', 'french drain'],
    def: 'A trench filled with gravel or rock containing a perforated pipe that redirects surface and subsurface water away from a structure.',
  },
  {
    id: 'frost-heave',
    names: ['frost heaves', 'frost heave'],
    def: 'Upward movement of soil caused by freezing moisture expanding and forming ice lenses within the ground.',
  },
  {
    id: 'grade',
    names: ['grades', 'grade'],
    def: 'The slope of the ground around a home, particularly how surface soil directs water toward or away from the foundation.',
  },
  {
    id: 'grade-beam',
    names: ['grade beams', 'grade beam'],
    def: 'A horizontal concrete element that spans between footings or piers and helps distribute loads across variable soil conditions.',
  },
  {
    id: 'ground-improvement',
    names: ['ground improvements', 'ground improvement'],
    def: 'Methods used to modify soil conditions to improve performance, such as increasing strength, reducing compressibility, or managing moisture.',
  },
  {
    id: 'hairline-crack',
    names: ['hairline cracks', 'hairline crack'],
    def: 'A very thin, narrow crack that commonly appears in concrete or masonry.',
  },
  {
    id: 'heave',
    names: ['heaves', 'heave'],
    def: 'Upward movement of soil that can lift portions of a foundation or slab.',
  },
  {
    id: 'hydrostatic-pressure',
    names: ['hydrostatic pressures', 'hydrostatic pressure'],
    def: 'The force exerted by water when it is held against a surface, such as foundation walls below grade.',
  },
  {
    id: 'helical-pier-capacity',
    names: ['helical pier capacities', 'helical pier capacity'],
    def: 'The load a helical pier is expected to carry after installation.',
  },
  {
    id: 'improper-drainage',
    names: ['improper drainage'],
    def: 'Conditions where surface or subsurface water is not directed away from a home as intended.',
  },
  {
    id: 'limited-access',
    names: ['limited access'],
    def: 'A site condition where low clearance, tight setbacks, interior placement, or nearby structures restrict which equipment can reach the work area or operate there.',
  },
  {
    id: 'lateral-pressure',
    names: ['lateral pressures', 'lateral pressure'],
    def: 'Force applied horizontally against a foundation wall, typically from soil, water, or both.',
  },
  {
    id: 'load-bearing-wall',
    names: ['load-bearing walls', 'load-bearing wall'],
    def: 'A wall that supports weight from structural elements above it and transfers that load downward to the foundation.',
  },
  {
    id: 'masonry-wall',
    names: ['masonry walls', 'masonry wall'],
    def: 'A wall constructed from individual units such as concrete block, brick, or stone, bonded together with mortar.',
  },
  {
    id: 'mat-foundation',
    names: ['mat foundations', 'mat foundation'],
    def: 'A thick, continuous concrete slab that supports an entire structure by distributing loads over a large area.',
  },
  {
    id: 'moisture-content',
    names: ['moisture content'],
    def: 'The amount of water present in soil or building materials.',
  },
  {
    id: 'monolithic-slab',
    names: ['monolithic slabs', 'monolithic slab'],
    def: 'A type of slab-on-grade foundation where the slab and thickened edges or footings are poured at the same time.',
  },
  {
    id: 'mudjacking',
    names: ['mudjacking'],
    def: 'A slab leveling technique that involves pumping a cement-based slurry beneath a settled concrete slab to raise it back to grade.',
  },
  {
    id: 'native-soil',
    names: ['native soil'],
    def: 'Soil that formed in place over time and was not imported as fill.',
  },
  {
    id: 'negative-friction',
    names: ['negative friction'],
    def: 'Downward drag on piles or piers caused by settling soil around the foundation element.',
  },
  {
    id: 'overburden',
    names: ['overburden'],
    def: 'The pressure exerted on a soil layer by the weight of the materials above it.',
  },
  {
    id: 'polyurethane-injection',
    names: ['polyurethane injection'],
    def: 'A two-component expanding resin injected into soil or beneath a slab.',
  },
  {
    id: 'passive-pressure',
    names: ['passive pressures', 'passive pressure'],
    def: 'Resistance provided by soil when it is compressed by a structure pushing against it, such as a foundation wall moving slightly into the surrounding soil.',
  },
  {
    id: 'pier',
    names: ['piers', 'pier'],
    def: 'A vertical foundation element that transfers structural loads from a building down to the soil or rock below.',
  },
  {
    id: 'pier-and-beam',
    names: ['pier and beams', 'pier and beam'],
    def: 'A foundation system where beams support the structure and transfer loads to discrete piers rather than a continuous slab.',
  },
  {
    id: 'plasticity-index',
    names: ['plasticity indexes', 'plasticity index'],
    def: 'The range of moisture content over which a soil remains moldable or plastic.',
  },
  {
    id: 'post-tension-slab',
    names: ['post-tension slabs', 'post-tension slab'],
    def: 'A concrete slab reinforced with steel tendons that are tensioned after the concrete cures.',
  },
  {
    id: 'punching-shear',
    names: ['punching shear'],
    def: 'A type of localized stress where a concentrated load pushes through a slab or footing.',
  },
  {
    id: 'reactive-soil',
    names: ['reactive soils', 'reactive soil'],
    def: 'Soil that changes volume or behavior in response to changes in moisture.',
  },
  {
    id: 'reinforcement',
    names: ['reinforcements', 'reinforcement'],
    def: 'Steel elements, such as rebar or tendons, embedded in concrete to improve strength and control cracking.',
  },
  {
    id: 'retaining-wall',
    names: ['retaining walls', 'retaining wall'],
    def: 'A structure designed to hold back soil and manage changes in ground elevation.',
  },
  {
    id: 'safety-factor',
    names: ['safety factors', 'safety factor'],
    def: 'The margin built into design that keeps real-world loads well below theoretical limits.',
  },
  {
    id: 'sales-metric',
    names: ['sales metrics', 'sales metric'],
    def: 'A measurable target used to evaluate sales performance, such as number of contracts signed, average project size, or revenue generated.',
  },
  {
    id: 'scope-of-work',
    names: ['scope of work'],
    def: 'A detailed description of what will be done during a foundation repair project.',
  },
  {
    id: 'service-load',
    names: ['service loads', 'service load'],
    def: 'The amount of weight a structure—and the piers supporting it—are expected to carry during normal, everyday conditions.',
  },
  {
    id: 'settlement',
    names: ['settlements', 'settlement'],
    def: 'Downward movement of soil or a foundation over time as loads are applied and soils compress.',
  },
  {
    id: 'settlement-monitoring',
    names: ['settlement monitoring'],
    def: 'The practice of observing and measuring movement over time rather than making conclusions based on a single observation.',
  },
  {
    id: 'shear-crack',
    names: ['shear cracks', 'shear crack'],
    def: 'A crack that forms due to forces acting parallel to a surface, often appearing as diagonal cracking.',
  },
  {
    id: 'slab-on-grade',
    names: ['slab-on-grade'],
    def: 'A foundation system where a concrete slab is poured directly on prepared soil at ground level.',
  },
  {
    id: 'soil-bearing',
    names: ['soil bearing'],
    def: 'The ability of soil to support loads from a structure without excessive movement.',
  },
  {
    id: 'soil-movement',
    names: ['soil movements', 'soil movement'],
    def: 'Changes in soil position due to moisture variation, loading, erosion, or consolidation.',
  },
  {
    id: 'structural-crack',
    names: ['structural cracks', 'structural crack'],
    def: 'A crack that affects a load-bearing element of a structure.',
  },
  {
    id: 'strip-footing',
    names: ['strip footings', 'strip footing'],
    def: 'A continuous footing that supports a wall by spreading loads along a linear area of soil.',
  },
  {
    id: 'subgrade',
    names: ['subgrades', 'subgrade'],
    def: 'The prepared soil layer beneath a slab or footing.',
  },
  {
    id: 'sump-pump',
    names: ['sump pumps', 'sump pump'],
    def: 'A mechanical device used to remove water that collects in a sump pit, typically in basements or crawlspaces.',
  },
  {
    id: 'swelling-soil',
    names: ['swelling soils', 'swelling soil'],
    def: 'Soil that increases in volume as moisture content rises.',
  },
  {
    id: 'tension-crack',
    names: ['tension cracks', 'tension crack'],
    def: 'A crack that forms when material is pulled apart by tensile forces rather than compressed.',
  },
  {
    id: 'ultimate-bearing-capacity',
    names: ['ultimate bearing capacities', 'ultimate bearing capacity'],
    def: 'The maximum load a soil can support before experiencing large-scale shear or excessive deformation.',
  },
  {
    id: 'utility-trench',
    names: ['utility trenches', 'utility trench'],
    def: 'An excavation made to install or repair utilities such as water, sewer, gas, or electrical lines.',
  },
  {
    id: 'ultimate-load',
    names: ['ultimate loads', 'ultimate load'],
    def: 'The maximum load a pier could theoretically support before experiencing significant loss of capacity.',
  },
  {
    id: 'vapor-barrier',
    names: ['vapor barriers', 'vapor barrier'],
    def: 'A material installed to slow or limit the movement of moisture vapor through soil, walls, or floors.',
  },
  {
    id: 'vertical-displacement',
    names: ['vertical displacements', 'vertical displacement'],
    def: 'Upward or downward movement of soil or structural elements relative to their original position.',
  },
  {
    id: 'void-space',
    names: ['void spaces', 'void space'],
    def: 'Empty or poorly supported areas within soil where material has been removed, compressed, or washed away.',
  },
  {
    id: 'wall-anchor',
    names: ['wall anchors', 'wall anchor'],
    def: 'A device used to stabilize bowed or leaning foundation walls by transferring lateral pressure from the wall to stable soil beyond.',
  },
  {
    id: 'wall-rotation',
    names: ['wall rotations', 'wall rotation'],
    def: 'A condition where a foundation wall tilts or pivots from its original vertical position.',
  },
  {
    id: 'water-table',
    names: ['water tables', 'water table'],
    def: 'The level below the ground surface where soil and rock are fully saturated with groundwater.',
  },
];

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

interface DictMatch {
  start: number;
  end: number;
  text: string;
  term: DictTerm;
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

    // Find every match against the ORIGINAL plain text first, then splice
    // the results in afterward. A term's own definition text can mention
    // another term by name (e.g. "bearing capacity" mentions "pier") — if we
    // instead replaced-and-rescanned in a loop, a later term could match
    // inside the tooltip text we'd just inserted for an earlier one,
    // corrupting the markup.
    const matches: DictMatch[] = [];
    for (const term of DICT_TERMS) {
      if (used.has(term.id)) continue;
      const pattern = term.names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      const re = new RegExp(`\\b(${pattern})\\b`, 'i');
      const m = re.exec(part);
      if (m) matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], term });
    }
    if (!matches.length) continue;

    matches.sort((a, b) => a.start - b.start);
    const chosen: DictMatch[] = [];
    let cursor = 0;
    for (const m of matches) {
      if (m.start < cursor) continue;
      chosen.push(m);
      used.add(m.term.id);
      cursor = m.end;
    }

    let result = '';
    let pos = 0;
    for (const m of chosen) {
      result += part.slice(pos, m.start);
      result += `<a class="dict-term" href="/foundation-repair-dictionary#${m.term.id}" data-def="${escapeAttr(m.term.def)}">${m.text}</a>`;
      pos = m.end;
    }
    result += part.slice(pos);
    parts[i] = result;
  }

  return parts.join('');
}
