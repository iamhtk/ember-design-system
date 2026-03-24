import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { FigmaColorSection, TokenEntry } from '../../docs/helpers/cwpcTokenCss'
import {
  FIGMA_COLOR_SECTION_ORDER,
  buildVarMap,
  colorGroupForDocs,
  groupColorTokensIntoSubsections,
  parseCssVariables,
  resolveDisplayColor,
  sortColorTokensForDocs,
} from '../../docs/helpers/cwpcTokenCss'
import { tokensRaw } from '../../docs/helpers/cwpcTokensRaw'

const pageStyle: CSSProperties = {
  padding: 'var(--space-1000) var(--space-800)',
  fontFamily: 'var(--font-family-body)',
  color: 'var(--text-default-body)',
  background: 'var(--color-neutral-900)',
  minHeight: '100vh',
}

const ColorsPage = () => {
  const all = parseCssVariables(tokensRaw)
  const map = buildVarMap(all)
  const colorEntries = all.filter((e) => colorGroupForDocs(e.name) != null)

  const bySection = new Map<FigmaColorSection, TokenEntry[]>()
  for (const s of FIGMA_COLOR_SECTION_ORDER) bySection.set(s, [])

  for (const e of colorEntries) {
    const g = colorGroupForDocs(e.name)
    if (g) {
      bySection.get(g)!.push(e)
    }
  }

  for (const section of FIGMA_COLOR_SECTION_ORDER) {
    sortColorTokensForDocs(bySection.get(section) ?? [], section)
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
        Colors
      </h1>
      <p style={{ color: 'var(--text-default-caption)', marginBottom: 'var(--space-800)' }}>
        Color tokens from <code>cwpc-tokens.css</code>, grouped like Figma (surface, text, icons, borders).
        Swatches show resolved hex/RGB where possible.
      </p>
      {FIGMA_COLOR_SECTION_ORDER.map((section) => {
        const list = bySection.get(section) ?? []
        if (list.length === 0) return null
        const subsections = groupColorTokensIntoSubsections(list, section)
        return (
          <section key={section} style={{ marginBottom: 'var(--space-1000)' }}>
            <h2
              style={{
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-default-caption)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--letter-spacing-uppercase-wide)',
                marginBottom: 'var(--space-400)',
              }}
            >
              {section}
            </h2>
            {subsections.map((sub) => (
              <div key={`${section}-${sub.title}`} style={{ marginBottom: 'var(--space-700)' }}>
                <h3
                  style={{
                    margin: '0 0 var(--space-300)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-default-headings)',
                  }}
                >
                  {sub.title}
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 'var(--space-300)',
                  }}
                >
                  {sub.entries.map((c) => {
                    const hexOrRgb = resolveDisplayColor(c.value, map) ?? c.value
                    const swatch =
                      resolveDisplayColor(c.value, map) ??
                      (/^#[\da-fA-F]{3,8}$/i.test(c.value.trim()) ? c.value.trim() : null) ??
                      (/^rgba?\(/i.test(c.value.trim()) ? c.value.trim() : null)
                    return (
                      <div
                        key={c.name}
                        style={{
                          background: 'var(--color-neutral-450)',
                          borderRadius: 'var(--border-radius-lg)',
                          overflow: 'hidden',
                          border: 'var(--border-width-xs) solid var(--color-divider-default)',
                        }}
                      >
                        <div
                          style={{
                            height: 'var(--space-1000)',
                            background: swatch ?? 'var(--color-neutral-200)',
                          }}
                        />
                        <div style={{ padding: 'var(--space-300)' }}>
                          <div
                            style={{
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                              marginBottom: 'var(--space-100)',
                              color: 'var(--text-default-headings)',
                              wordBreak: 'break-word',
                            }}
                          >
                            {c.name.replace(/^--/, '')}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-body-xs)',
                              color: 'var(--text-default-caption)',
                              fontFamily: 'var(--font-family-code)',
                              wordBreak: 'break-all',
                            }}
                          >
                            {c.name}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-body-xs)',
                              color: 'var(--text-default-caption)',
                              fontFamily: 'var(--font-family-code)',
                              marginTop: 'var(--space-100)',
                              wordBreak: 'break-all',
                            }}
                          >
                            {hexOrRgb}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </section>
        )
      })}
    </div>
  )
}

const meta = {
  title: 'Foundation/Colors',
  component: ColorsPage,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'darker' } },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorsPage>

export default meta
type Story = StoryObj<typeof meta>
export const AllColors: Story = {}
