import type { Meta, StoryObj } from '@storybook/react'
import tokensRaw from '../../tokens/cwpc-tokens.css?raw'

type TokenEntry = { name: string; value: string }

function parseCssVariables(css: string): TokenEntry[] {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g
  const out: TokenEntry[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(withoutComments)) !== null) {
    const name = m[1]
    const value = m[2].trim().replace(/\s+/g, ' ')
    if (name.startsWith('--')) {
      out.push({ name, value })
    }
  }
  return out
}

function isLikelyColorValue(value: string): boolean {
  const v = value.trim()
  if (/^#[\da-fA-F]{3,8}$/.test(v)) return true
  if (/^rgba?\(/.test(v)) return true
  if (/^color-mix\(/.test(v)) return true
  return false
}

function categorizeToken(name: string): string {
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

const GROUP_ORDER = [
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
]

function buildVarMap(entries: TokenEntry[]): Map<string, string> {
  const m = new Map<string, string>()
  for (const e of entries) {
    m.set(e.name, e.value)
  }
  return m
}

function resolveDisplayColor(
  value: string,
  map: Map<string, string>,
  depth = 0,
): string | null {
  const v = value.trim()
  if (/^#[\da-fA-F]{3,8}$/.test(v)) return v
  if (/^rgba?\(/.test(v)) return v
  const vm = /^var\(\s*([^)]+?)\s*\)$/.exec(v)
  if (vm && depth < 8) {
    const key = vm[1].trim()
    const next = map.get(key)
    if (next) return resolveDisplayColor(next, map, depth + 1)
  }
  return null
}

const pageStyle: React.CSSProperties = {
  padding: 'var(--space-1000) var(--space-800)',
  fontFamily: 'var(--font-family-body)',
  color: 'var(--text-default-body)',
  background: 'var(--color-neutral-900)',
  minHeight: '100vh',
}

const TokensPage = () => {
  const entries = parseCssVariables(tokensRaw)
  const map = buildVarMap(entries)
  const grouped = new Map<string, TokenEntry[]>()
  for (const g of GROUP_ORDER) {
    grouped.set(g, [])
  }
  for (const e of entries) {
    const g = categorizeToken(e.name)
    if (!grouped.has(g)) grouped.set(g, [])
    grouped.get(g)!.push(e)
  }

  return (
    <div style={pageStyle}>
      <h1
        style={{
          fontSize: 'var(--font-size-h3)',
          fontWeight: 'var(--font-weight-bold)',
          marginBottom: 'var(--space-200)',
          color: 'var(--text-default-headings)',
        }}
      >
        Design tokens
      </h1>
      <p style={{ color: 'var(--text-default-caption)', marginBottom: 'var(--space-800)' }}>
        All CSS custom properties from <code>cwpc-tokens.css</code>. Use{' '}
        <code style={{ color: 'var(--color-primary-default)' }}>var(--token-name)</code> in components.
      </p>
      {GROUP_ORDER.map((groupName) => {
        const list = grouped.get(groupName) ?? []
        if (list.length === 0) return null
        return (
          <section key={groupName} style={{ marginBottom: 'var(--space-1000)' }}>
            <h2
              style={{
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-default-caption)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--letter-spacing-uppercase-wide)',
                marginBottom: 'var(--space-300)',
              }}
            >
              {groupName}
            </h2>
            <div
              style={{
                background: 'var(--color-neutral-450)',
                borderRadius: 'var(--border-radius-lg)',
                overflow: 'hidden',
                border: 'var(--border-width-xs) solid var(--color-divider-default)',
              }}
            >
              {list.map((t, i) => {
                const resolved = resolveDisplayColor(t.value, map)
                const showSwatch =
                  resolved != null ||
                  (isLikelyColorValue(t.value) && !t.value.includes('var('))
                const swatchBg = resolved ?? (showSwatch ? t.value : undefined)
                return (
                  <div
                    key={t.name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: showSwatch ? '40px 1fr 1fr' : '1fr 1fr',
                      gap: 'var(--space-400)',
                      padding: 'var(--space-300) var(--space-400)',
                      borderBottom:
                        i < list.length - 1
                          ? 'var(--border-width-xs) solid var(--color-divider-subtle)'
                          : 'none',
                      alignItems: 'center',
                    }}
                  >
                    {showSwatch && swatchBg ? (
                      <div
                        title={t.value}
                        style={{
                          width: 'var(--space-1000)',
                          height: 'var(--space-1000)',
                          borderRadius: 'var(--border-radius-sm)',
                          background: swatchBg,
                          border: 'var(--border-width-xs) solid var(--color-divider-default)',
                          flexShrink: 0,
                        }}
                      />
                    ) : null}
                    <code
                      style={{
                        fontSize: 'var(--font-size-body-sm)',
                        color: 'var(--color-primary-default)',
                        wordBreak: 'break-all',
                      }}
                    >
                      {t.name}
                    </code>
                    <code
                      style={{
                        fontSize: 'var(--font-size-body-sm)',
                        color: 'var(--text-default-caption)',
                        wordBreak: 'break-word',
                      }}
                    >
                      {t.value}
                    </code>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

const meta = {
  title: 'Foundation/Tokens',
  component: TokensPage,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'darker' } },
  tags: ['autodocs'],
} satisfies Meta<typeof TokensPage>

export default meta
type Story = StoryObj<typeof meta>
export const AllTokens: Story = {}
