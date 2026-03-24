export type TokenEntry = { name: string; value: string }

export function parseCssVariables(css: string): TokenEntry[] {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g
  const out: TokenEntry[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(withoutComments)) !== null) {
    const name = m[1]
    const value = m[2].trim().replace(/\s+/g, ' ')
    if (name.startsWith('--')) out.push({ name, value })
  }
  return out
}

export function isLikelyColorValue(value: string): boolean {
  const v = value.trim()
  if (/^#[\da-fA-F]{3,8}$/.test(v)) return true
  if (/^rgba?\(/.test(v)) return true
  if (/^color-mix\(/.test(v)) return true
  return false
}

export function categorizeToken(name: string): string {
  if (name.startsWith('--text-')) return 'Text'
  if (name.startsWith('--space-')) return 'Spacing'
  if (name.startsWith('--border-radius-')) return 'Radius'
  if (name.startsWith('--shadow-')) return 'Shadow'
  if (
    name.startsWith('--font-') ||
    name.startsWith('--line-height-') ||
    name.startsWith('--letter-spacing-')
  ) {
    return 'Fonts & typography'
  }
  if (
    name.startsWith('--border-width-') ||
    name.startsWith('--stroke-') ||
    name === '--outline-offset-focus'
  ) {
    return 'Border width & stroke'
  }
  if (name.startsWith('--color-') && name.includes('icon')) return 'Icon colors'
  if (
    name.startsWith('--color-') &&
    (name.includes('divider') || name.includes('border') || name.includes('footer-divider'))
  ) {
    return 'Border & divider colors'
  }
  if (
    name.startsWith('--color-') &&
    (name.includes('surface') || name.includes('backdrop') || name.includes('skeleton'))
  ) {
    return 'Surfaces & backgrounds'
  }
  if (
    name.startsWith('--size-') ||
    name.startsWith('--width-') ||
    name.startsWith('--margin-') ||
    name.startsWith('--padding-') ||
    name.startsWith('--offset-') ||
    name.startsWith('--threshold-') ||
    name.startsWith('--z-index-') ||
    name.startsWith('--breakpoint-') ||
    name.startsWith('--blur-') ||
    name.startsWith('--scale-')
  ) {
    return 'Scale & layout'
  }
  if (name.startsWith('--duration-')) return 'Motion'
  if (name.startsWith('--gradient-')) return 'Gradients'
  if (name.startsWith('--color-')) return 'Color palette & semantic'
  return 'Other'
}

export const TOKEN_GROUP_ORDER = [
  'Surfaces & backgrounds',
  'Text',
  'Border & divider colors',
  'Icon colors',
  'Color palette & semantic',
  'Fonts & typography',
  'Spacing',
  'Radius',
  'Shadow',
  'Border width & stroke',
  'Scale & layout',
  'Motion',
  'Gradients',
  'Other',
] as const

export function buildVarMap(entries: TokenEntry[]): Map<string, string> {
  const m = new Map<string, string>()
  for (const e of entries) m.set(e.name, e.value)
  return m
}

export function resolveDisplayColor(
  value: string,
  map: Map<string, string>,
  depth = 0,
): string | null {
  const v = value.trim()
  if (/^#[\da-fA-F]{3,8}$/.test(v)) return v
  if (/^rgba?\(/.test(v)) return v
  const vm = /^var\(\s*([^)]+?)\s*\)$/.exec(v)
  if (vm && depth < 10) {
    const key = vm[1].trim()
    const next = map.get(key)
    if (next) return resolveDisplayColor(next, map, depth + 1)
  }
  return null
}

export type FigmaColorSection = 'Surface & backgrounds' | 'Text' | 'Icon colors' | 'Borders & dividers'

export function colorGroupForDocs(name: string): FigmaColorSection | null {
  if (name.startsWith('--text-')) return 'Text'
  if (!name.startsWith('--color-')) return null
  const tail = name.slice('--color-'.length)
  if (tail.includes('divider') || tail.includes('border')) return 'Borders & dividers'
  if (tail.includes('icon')) return 'Icon colors'
  return 'Surface & backgrounds'
}

export const FIGMA_COLOR_SECTION_ORDER: FigmaColorSection[] = [
  'Surface & backgrounds',
  'Text',
  'Icon colors',
  'Borders & dividers',
]

/* -------------------------------------------------------------------------- */
/* Color-token sort order (brand scales → neutrals → semantics → components)   */
/* -------------------------------------------------------------------------- */

const TEXT_TOKEN_ORDER: string[] = [
  '--text-default-headings',
  '--text-default-body',
  '--text-default-caption',
  '--text-default-placeholder',
  '--text-on-color-headings',
  '--text-on-color-body',
  '--text-on-color-caption',
  '--text-on-color-placeholder',
  '--text-primary-default',
  '--text-primary-hover',
  '--text-disabled-default',
]

const BORDER_TOKEN_ORDER: string[] = [
  '--color-divider-subtle',
  '--color-table-row-divider',
  '--color-divider-default',
  '--color-footer-divider',
  '--color-tooltip-border',
  '--color-divider-strong',
  '--color-filter-chip-border',
  '--color-border-input-light',
]

function surfaceFamilyRank(name: string): number {
  const tests: [RegExp, number][] = [
    [/^--color-orange-/, 10],
    [/^--color-yellow-/, 20],
    [/^--color-primary-/, 30],
    [/^--color-secondary-blue-/, 40],
    [/^--color-neutral-/, 50],
    [/^--color-surface-page-/, 55],
    [/^--color-interactive-primary/, 60],
    [/^--color-interactive-secondary/, 65],
    [/^--color-success-/, 70],
    [/^--color-warning-/, 80],
    [/^--color-error-/, 90],
    [/^--color-information-/, 100],
    [/^--color-tertiary-/, 110],
    [/^--color-disabled-/, 120],
    [/^--color-banner-wildfire-/, 130],
    [/^--color-alert-surface-/, 140],
    [/^--color-backdrop-/, 150],
    [/^--color-tooltip-surface/, 160],
    [/^--color-dropdown-surface/, 170],
    [/^--color-option-/, 180],
    [/^--color-surface-progress-track|^--color-table-row-/, 190],
    [/^--color-skeleton-/, 200],
    [/^--color-code-/, 210],
    [/^--color-file-upload-/, 215],
    [/^--color-calendar-day-/, 220],
    [/^--color-rating-star-/, 225],
    [/^--color-video-play|^--color-duration-badge-/, 230],
    [/^--color-mappin-label-/, 235],
    [/^--color-image-error-/, 240],
    [/^--color-list-row-|^--color-context-menu-/, 245],
    [/^--color-sticky-bar-/, 250],
    [/^--color-modal-light-/, 260],
    [/^--color-surface-subscribe-/, 265],
    [/^--color-notification-error-/, 270],
  ]
  for (const [re, rank] of tests) {
    if (re.test(name)) return rank
  }
  return 9999
}

/** Light → dark / subtle → strong for standard hue scales */
function scaleShadeRank(name: string): number {
  const dm = /-(\d{2,4})$/.exec(name)
  if (dm) return parseInt(dm[1], 10)
  if (name.includes('-default')) return 455
  if (name.includes('-subtle')) return 310
  if (name.includes('-hover')) return 465
  if (name.includes('-active')) return 470
  if (name.includes('-focus')) return 468
  return 500
}

/** Neutrals: white → black → light gray → mid grays → dark page bg */
function neutralGreyRank(name: string): number {
  if (name.endsWith('neutral-white')) return 0
  if (name.endsWith('neutral-black')) return 1
  if (name.endsWith('neutral-925')) return 5
  const m = /neutral-(\d+)/.exec(name)
  if (m) return parseInt(m[1], 10)
  return 999
}

function pageSurfaceRank(name: string): number {
  if (name.includes('page-light')) return 1
  if (name.includes('page-dark')) return 2
  return 9
}

function interactivePrimaryRank(name: string): number {
  if (/--color-interactive-primary$/.test(name)) return 1
  if (name.includes('primary-default')) return 2
  if (name.includes('hover')) return 3
  if (name.includes('active')) return 4
  if (name.includes('subtle')) return 5
  return 9
}

function interactiveSecondaryRank(name: string): number {
  if (name.includes('hover')) return 2
  return 1
}

function simpleSemanticRank(name: string): number {
  if (name.includes('subtle')) return 1
  if (name.includes('default')) return 2
  if (/-600$/.test(name)) return 3
  if (name.includes('hover')) return 4
  return 5
}

function errorTokenRank(name: string): number {
  if (name.includes('error-default')) return 1
  if (name.includes('hover') && !name.includes('on-color')) return 2
  if (name.includes('focus')) return 3
  if (name.includes('on-color-hover')) return 5
  if (name.includes('on-color')) return 4
  return 9
}

function disabledTokenRank(name: string): number {
  if (name.includes('subtle')) return 1
  if (name.includes('surface')) return 2
  if (name.includes('default')) return 3
  if (name.includes('strong')) return 4
  if (name.includes('heavy')) return 5
  return 9
}

function alertSurfaceRank(name: string): number {
  if (name.includes('success')) return 1
  if (name.includes('error')) return 2
  if (name.includes('warning')) return 3
  if (name.includes('info')) return 4
  return 9
}

function compareSurfaceColorTokens(a: string, b: string): number {
  const ra = surfaceFamilyRank(a)
  const rb = surfaceFamilyRank(b)
  if (ra !== rb) return ra - rb

  if (ra === 50) {
    const na = neutralGreyRank(a)
    const nb = neutralGreyRank(b)
    if (na !== nb) return na - nb
    return a.localeCompare(b)
  }

  if (ra === 55) {
    const pa = pageSurfaceRank(a)
    const pb = pageSurfaceRank(b)
    if (pa !== pb) return pa - pb
    return a.localeCompare(b)
  }

  if (ra === 10 || ra === 20 || ra === 30 || ra === 40) {
    const sa = scaleShadeRank(a)
    const sb = scaleShadeRank(b)
    if (sa !== sb) return sa - sb
    return a.localeCompare(b)
  }

  if (ra === 60) {
    const ia = interactivePrimaryRank(a)
    const ib = interactivePrimaryRank(b)
    if (ia !== ib) return ia - ib
    return a.localeCompare(b)
  }

  if (ra === 65) {
    const ia = interactiveSecondaryRank(a)
    const ib = interactiveSecondaryRank(b)
    if (ia !== ib) return ia - ib
    return a.localeCompare(b)
  }

  if (ra === 70 || ra === 80 || ra === 100 || ra === 110) {
    const sa = simpleSemanticRank(a)
    const sb = simpleSemanticRank(b)
    if (sa !== sb) return sa - sb
    return a.localeCompare(b)
  }

  if (ra === 90) {
    const ea = errorTokenRank(a)
    const eb = errorTokenRank(b)
    if (ea !== eb) return ea - eb
    return a.localeCompare(b)
  }

  if (ra === 120) {
    const da = disabledTokenRank(a)
    const db = disabledTokenRank(b)
    if (da !== db) return da - db
    return a.localeCompare(b)
  }

  if (ra === 130) {
    if (a.includes('start') && !b.includes('start')) return -1
    if (!a.includes('start') && b.includes('start')) return 1
    return a.localeCompare(b)
  }

  if (ra === 140) {
    const aa = alertSurfaceRank(a)
    const ab = alertSurfaceRank(b)
    if (aa !== ab) return aa - ab
    return a.localeCompare(b)
  }

  if (ra === 245) {
    const lc = (n: string) => {
      if (n.includes('list-row')) return 1
      if (n.includes('destructive')) return 3
      if (n.includes('context-menu')) return 2
      return 9
    }
    const la = lc(a)
    const lb = lc(b)
    if (la !== lb) return la - lb
    return a.localeCompare(b)
  }

  if (ra === 180) {
    if (a.includes('hover') && b.includes('selected')) return -1
    if (a.includes('selected') && b.includes('hover')) return 1
    return a.localeCompare(b)
  }

  if (ra === 190) {
    const order = (n: string) => {
      if (n.includes('progress-track')) return 1
      if (n.includes('striped')) return 2
      if (n.includes('row-hover')) return 3
      return 9
    }
    const oa = order(a)
    const ob = order(b)
    if (oa !== ob) return oa - ob
    return a.localeCompare(b)
  }

  if (ra === 200) {
    if (a.includes('base')) return -1
    if (b.includes('base')) return 1
    return a.localeCompare(b)
  }

  if (ra === 210) {
    if (a.includes('block')) return -1
    if (b.includes('block')) return 1
    return a.localeCompare(b)
  }

  if (ra === 230) {
    const v = (n: string) => {
      if (n.includes('surface')) return 1
      if (n.includes('overlay')) return 2
      if (n.includes('duration')) return 3
      return 9
    }
    const va = v(a)
    const vb = v(b)
    if (va !== vb) return va - vb
    return a.localeCompare(b)
  }

  return a.localeCompare(b)
}

function compareTextColorTokens(a: string, b: string): number {
  const ia = TEXT_TOKEN_ORDER.indexOf(a)
  const ib = TEXT_TOKEN_ORDER.indexOf(b)
  const ua = ia === -1 ? 999 : ia
  const ub = ib === -1 ? 999 : ib
  if (ua !== ub) return ua - ub
  return a.localeCompare(b)
}

function compareIconColorTokens(a: string, b: string): number {
  return a.localeCompare(b)
}

function compareBorderColorTokens(a: string, b: string): number {
  const ia = BORDER_TOKEN_ORDER.indexOf(a)
  const ib = BORDER_TOKEN_ORDER.indexOf(b)
  const ua = ia === -1 ? 999 : ia
  const ub = ib === -1 ? 999 : ib
  if (ua !== ub) return ua - ub
  return a.localeCompare(b)
}

/** Sort tokens inside each Figma color section for color-logical display */
export function sortColorTokensForDocs(entries: TokenEntry[], section: FigmaColorSection): void {
  entries.sort((a, b) => {
    switch (section) {
      case 'Surface & backgrounds':
        return compareSurfaceColorTokens(a.name, b.name)
      case 'Text':
        return compareTextColorTokens(a.name, b.name)
      case 'Icon colors':
        return compareIconColorTokens(a.name, b.name)
      case 'Borders & dividers':
        return compareBorderColorTokens(a.name, b.name)
      default:
        return a.name.localeCompare(b.name)
    }
  })
}

type ColorSubsection = {
  title: string
  rank: number
}

function getColorSubsection(name: string, section: FigmaColorSection): ColorSubsection {
  if (section === 'Text') {
    if (name.startsWith('--text-default-')) return { title: 'Default text', rank: 10 }
    if (name.startsWith('--text-on-color-')) return { title: 'On-color text', rank: 20 }
    if (name.startsWith('--text-primary-')) return { title: 'Primary text', rank: 30 }
    if (name.startsWith('--text-disabled-')) return { title: 'Disabled text', rank: 40 }
    return { title: 'Other text tokens', rank: 999 }
  }

  if (section === 'Icon colors') {
    return { title: 'Icon tints', rank: 10 }
  }

  if (section === 'Borders & dividers') {
    if (name.includes('divider')) return { title: 'Dividers', rank: 10 }
    if (name.includes('tooltip-border') || name.includes('border-input')) {
      return { title: 'Component borders', rank: 20 }
    }
    if (name.includes('filter-chip-border')) return { title: 'Filter borders', rank: 30 }
    return { title: 'Other border tokens', rank: 999 }
  }

  // Surface & backgrounds
  if (name.startsWith('--color-orange-')) return { title: 'Brand orange scale', rank: 10 }
  if (name.startsWith('--color-yellow-')) return { title: 'Brand yellow scale', rank: 20 }
  if (name.startsWith('--color-primary-')) return { title: 'Primary alias scale', rank: 30 }
  if (name.startsWith('--color-secondary-blue-')) return { title: 'Secondary blue scale', rank: 40 }
  if (name.startsWith('--color-neutral-')) return { title: 'Neutral scale', rank: 50 }
  if (name.startsWith('--color-surface-page-')) return { title: 'Page surfaces', rank: 55 }
  if (name.startsWith('--color-interactive-primary')) return { title: 'Interactive primary', rank: 60 }
  if (name.startsWith('--color-interactive-secondary')) return { title: 'Interactive secondary', rank: 65 }
  if (name.startsWith('--color-success-')) return { title: 'Success semantic', rank: 70 }
  if (name.startsWith('--color-warning-')) return { title: 'Warning semantic', rank: 80 }
  if (name.startsWith('--color-error-')) return { title: 'Error semantic', rank: 90 }
  if (name.startsWith('--color-information-')) return { title: 'Information semantic', rank: 100 }
  if (name.startsWith('--color-tertiary-')) return { title: 'Tertiary semantic', rank: 110 }
  if (name.startsWith('--color-disabled-')) return { title: 'Disabled semantic', rank: 120 }
  if (name.startsWith('--color-banner-wildfire-')) return { title: 'Banner wildfire gradients', rank: 130 }
  if (name.startsWith('--color-alert-surface-')) return { title: 'Alert surfaces', rank: 140 }
  if (name.startsWith('--color-backdrop-')) return { title: 'Backdrops & overlays', rank: 150 }
  if (name.startsWith('--color-tooltip-surface') || name.startsWith('--color-dropdown-surface')) {
    return { title: 'Tooltip & dropdown surfaces', rank: 160 }
  }
  if (name.startsWith('--color-option-')) return { title: 'Option overlays', rank: 170 }
  if (name.startsWith('--color-surface-progress-track') || name.startsWith('--color-table-row-')) {
    return { title: 'Table & progress fills', rank: 180 }
  }
  if (name.startsWith('--color-skeleton-')) return { title: 'Skeleton fills', rank: 190 }
  if (name.startsWith('--color-code-')) return { title: 'Code block fills', rank: 200 }
  if (name.startsWith('--color-file-upload-')) return { title: 'File upload fills', rank: 210 }
  if (name.startsWith('--color-calendar-day-')) return { title: 'Calendar fills', rank: 220 }
  if (name.startsWith('--color-rating-star-')) return { title: 'Rating fills', rank: 230 }
  if (name.startsWith('--color-video-play') || name.startsWith('--color-duration-badge-')) {
    return { title: 'Video overlays', rank: 240 }
  }
  if (name.startsWith('--color-mappin-label-')) return { title: 'Map pin surfaces', rank: 250 }
  if (name.startsWith('--color-image-error-')) return { title: 'Image placeholders', rank: 260 }
  if (name.startsWith('--color-list-row-') || name.startsWith('--color-context-menu-')) {
    return { title: 'List & context menu states', rank: 270 }
  }
  if (name.startsWith('--color-sticky-bar-')) return { title: 'Sticky bar fills', rank: 280 }
  if (name.startsWith('--color-modal-light-')) return { title: 'Modal light fills', rank: 290 }
  if (name.startsWith('--color-surface-subscribe-')) return { title: 'Subscribe widget fills', rank: 300 }
  if (name.startsWith('--color-notification-error-')) return { title: 'Notification text fills', rank: 310 }
  return { title: 'Other surface tokens', rank: 999 }
}

export function groupColorTokensIntoSubsections(
  entries: TokenEntry[],
  section: FigmaColorSection,
): Array<{ title: string; entries: TokenEntry[] }> {
  const buckets = new Map<string, { rank: number; entries: TokenEntry[] }>()

  for (const token of entries) {
    const subgroup = getColorSubsection(token.name, section)
    const existing = buckets.get(subgroup.title)
    if (!existing) {
      buckets.set(subgroup.title, { rank: subgroup.rank, entries: [token] })
    } else {
      existing.entries.push(token)
    }
  }

  const ordered = Array.from(buckets.entries())
    .sort((a, b) => {
      if (a[1].rank !== b[1].rank) return a[1].rank - b[1].rank
      return a[0].localeCompare(b[0])
    })
    .map(([title, data]) => ({ title, entries: data.entries }))

  return ordered
}
