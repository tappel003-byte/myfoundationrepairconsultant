export interface ArticleGroupLink {
  href: string;
  title: string;
}

export interface ArticleGroup {
  id: string;
  label: string;
  links: ArticleGroupLink[];
}

export const EDUCATIONAL_GROUPS: ArticleGroup[] = [
  {
    id: 'behavior',
    label: 'Foundation Behavior & Settlement',
    links: [
      { href: '/all-articles/the-word-failure', title: 'The Word “Failure”' },
      { href: '/all-articles/differential-settlement-why-uneven-movement-matters-more-than-movement-itself', title: 'Differential Settlement: Why Uneven Movement Matters More Than Movement Itself' },
      { href: '/all-articles/underpinning-what-it-is-and-why-hearing-the-term-is-not-a-diagnosis', title: 'Underpinning: What It Is — and Why Hearing the Term Is Not a Diagnosis' },
      { href: '/all-articles/foundation-problem-vs-normal-settling-how-to-evaluate-what-youre-seeing', title: 'Foundation Problem vs. Normal Settling' },
      { href: '/all-articles/why-houses-continue-to-move', title: 'Why Houses Continue to Move' },
      { href: '/all-articles/foundation-failure-patterns-and-prevention', title: 'Foundation Failure Patterns and Prevention' },
      { href: '/all-articles/settlement', title: 'Settlement: What It Means — and Why Not All Settlement Is a Problem' },
    ],
  },
  {
    id: 'soils',
    label: 'Soil Behavior & Analysis',
    links: [
      { href: '/all-articles/why-soil-analysis-matters-in-understanding-structural-performance', title: 'Why Soil Analysis Matters in Understanding Structural Performance' },
      { href: '/all-articles/soil-reports-what-they-are-and-what-theyre-actually-used-for', title: 'Soil Reports: What They Are — and What They’re Actually Used For' },
      { href: '/all-articles/soil-foundation-interaction-principles', title: 'Soil-Foundation Interaction Principles' },
      { href: '/all-articles/expansivesoil', title: 'Expansive Soil: What It Is — and What It Does Not Automatically Mean for Your House' },
      { href: '/all-articles/collapsiblesoil', title: 'Collapsible Soil: What It Is — and Why the Name Causes So Much Confusion' },
    ],
  },
  {
    id: 'types',
    label: 'Foundation Types & Construction',
    links: [
      { href: '/all-articles/slab-on-grade-foundations-what-they-are-and-what-they-dont-automatically-tell-you', title: 'Slab-on-Grade Foundations: What They Are — and What They Don’t Automatically Tell You' },
      { href: '/all-articles/crawlspaces-what-they-are-and-why-they-get-blamed-for-so-many-problems', title: 'Crawlspaces: What They Are — and Why They Get Blamed for So Many Problems' },
      { href: '/all-articles/load-transfer-mechanisms-in-foundation-systems', title: 'Load Transfer Mechanisms in Foundation Systems' },
      { href: '/all-articles/foundation-design-and-engineering-requirements', title: 'Foundation Design and Engineering Requirements' },
    ],
  },
  {
    id: 'symptoms',
    label: 'Understanding Damage & Symptoms',
    links: [
      { href: '/all-articles/common-signs-a-foundation-inspection-may-be-worth-considering', title: 'Common Signs a Foundation Inspection May Be Worth Considering' },
      { href: '/all-articles/structural-damage-vs-cosmetic-damage', title: 'Structural Damage vs. Cosmetic Damage' },
      { href: '/all-articles/finish-materials-as-early-movement-indicators', title: 'Finish Materials as Early Movement Indicators' },
      { href: '/all-articles/normal-floor-deflection-vs-foundation-movement', title: 'Normal Floor Deflection vs. Foundation Movement' },
      { href: '/all-articles/how-to-document-and-monitor-floor-slope', title: 'How to Document and Monitor Floor Slope Over Time' },
      { href: '/all-articles/foundationcracks', title: 'Foundation Cracks: What They Mean — and When to Actually Worry' },
      { href: '/all-articles/structuralcracks', title: 'Structural Cracks: What the Term Really Means — and What It Often Gets Used to Imply' },
    ],
  },
  {
    id: 'methods',
    label: 'Repair Method Deep Dives',
    links: [
      { href: '/all-articles/why-torque-alone-doesnt-guarantee-capacity', title: 'Why Torque Alone Doesn’t Guarantee Capacity' },
      { href: '/all-articles/distinguishing-moisture-problems-from-bearing-capacity-deficiency', title: 'Distinguishing Moisture Problems from Bearing Capacity Deficiency' },
      { href: '/all-articles/when-monitoring-makes-more-sense-than-immediate-underpinning', title: 'When Monitoring Makes More Sense Than Immediate Underpinning' },
      { href: '/all-articles/grout-to-ground-bond-strength-in-different-soil-types', title: 'Grout-to-Ground Bond Strength in Different Soil Types' },
      { href: '/all-articles/load-testing-and-verification-methods-for-micropiles', title: 'Load Testing and Verification Methods for Micropiles' },
      { href: '/all-articles/grouting-pressure-and-quality-control', title: 'Grouting Pressure and Quality Control' },
      { href: '/all-articles/micropile-design-calculations-and-engineering-requirements', title: 'Micropile Design Calculations and Engineering Requirements' },
    ],
  },
  {
    id: 'materials',
    label: 'Material Behavior Deep Dives',
    links: [
      { href: '/all-articles/why-concrete-cracks-even-when-nothing-is-wrong', title: 'Why Concrete Cracks Even When Nothing Is Wrong' },
      { href: '/all-articles/shrinkage-curing-and-stress-relief', title: 'Shrinkage, Curing, and Stress Relief in Residential Concrete' },
      { href: '/all-articles/why-drywall-cracks-before-structural-failure', title: 'Why Drywall Cracks Before Structural Failure Occurs' },
      { href: '/all-articles/what-reinforcing-steel-actually-does', title: 'What Reinforcing Steel Actually Does — and What It Doesn’t' },
      { href: '/all-articles/truss-uplift-and-seasonal-movement', title: 'Truss Uplift and Seasonal Movement Explained' },
      { href: '/all-articles/brick-and-block-movement', title: 'Brick and Block Movement' },
      { href: '/all-articles/why-stucco-cracks-on-stable-homes', title: 'Why Stucco Cracks on Stable Homes' },
      { href: '/all-articles/seasonal-interior-cracking', title: 'Seasonal Interior Cracking' },
      { href: '/all-articles/plaster-cracking-in-older-homes', title: 'Plaster Cracking in Older Homes' },
      { href: '/all-articles/moisture-content-and-framing-shrinkage', title: 'Moisture Content and Framing Shrinkage' },
    ],
  },
  {
    id: 'climate',
    label: 'Climate & Environmental Factors',
    links: [
      { href: '/all-articles/how-climate-and-weather-affect-foundation-stability', title: 'How Climate and Weather Affect Foundation Stability' },
    ],
  },
  {
    id: 'decisions',
    label: 'Costs & Practical Decisions',
    links: [
      { href: '/all-articles/insurance-and-financing-for-foundation-repair', title: 'Insurance and Financing for Foundation Repair' },
      { href: '/all-articles/how-foundation-repair-affects-resale-and-appraisal', title: 'How Foundation Repair Affects Resale and Appraisal' },
      { href: '/all-articles/how-to-vet-a-foundation-repair-contractor', title: 'How to Vet a Foundation Repair Contractor' },
      { href: '/all-articles/understanding-foundation-repair-warranties', title: 'Understanding Foundation Repair Warranties' },
      { href: '/all-articles/what-to-monitor-after-a-foundation-repair', title: 'What to Monitor After a Foundation Repair' },
    ],
  },
];

export const INDUSTRY_GROUPS: ArticleGroup[] = [
  {
    id: 'business',
    label: 'Business Model & Economics',
    links: [
      { href: '/all-articles/if-you-show-me-the-incentive-ill-show-you-the-outcome', title: 'If You Show Me the Incentive, I’ll Show You the Outcome' },
      { href: '/all-articles/the-free-evaluation-and-the-culture-it-creates', title: 'The “Free Evaluation” — and the Culture It Creates' },
      { href: '/all-articles/symptoms-are-easy-to-see-causes-are-not', title: 'Symptoms Are Easy to See. Causes Are Not.' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales Practices & Tactics',
    links: [
      { href: '/all-articles/psychology-of-sign-today-discounts', title: 'The Psychology Behind Sign-Today Discounts in Foundation Repair' },
      { href: '/all-articles/what-is-a-sales-metric-and-why-it-doesnt-translate-to-foundation-repair', title: 'What Is a Sales Metric — and Why It Doesn’t Translate to Foundation Repair' },
    ],
  },
  {
    id: 'evaluate',
    label: 'Evaluating Contractors & Recommendations',
    links: [
      { href: '/all-articles/how-to-compare-foundation-repair-estimates', title: 'How to Compare Foundation Repair Estimates' },
      { href: '/all-articles/why-a-detailed-scope-of-work-matters-in-foundation-repair', title: 'Why a Detailed Scope of Work Matters in Foundation Repair' },
      { href: '/all-articles/managing-change-orders-in-foundation-repair', title: 'Managing Change Orders in Foundation Repair' },
    ],
  },
];

const ALL_GROUPS: ArticleGroup[] = [...EDUCATIONAL_GROUPS, ...INDUSTRY_GROUPS];

export function getRelatedArticles(url: string, limit = 4): ArticleGroupLink[] {
  const group = ALL_GROUPS.find((g) => g.links.some((l) => l.href === url));
  if (!group) return [];
  return group.links.filter((l) => l.href !== url).slice(0, limit);
}
