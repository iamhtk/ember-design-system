import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { DocsPage, DocsSection } from '../helpers/DocsPage'
import {
  FIGMA_COLOR_SECTION_ORDER,
  buildVarMap,
  colorGroupForDocs,
  groupColorTokensIntoSubsections,
  parseCssVariables,
  resolveDisplayColor,
  sortColorTokensForDocs,
} from '../helpers/cwpcTokenCss'
import { tokensRaw } from '../helpers/cwpcTokensRaw'
import styles from './ColorsPage.module.css'

export function ColorsPage() {
  const all = parseCssVariables(tokensRaw)
  const map = buildVarMap(all)
  const colorEntries = all.filter((e) => colorGroupForDocs(e.name) != null)

  const bySection = new Map<string, typeof colorEntries>()
  for (const s of FIGMA_COLOR_SECTION_ORDER) bySection.set(s, [])

  for (const e of colorEntries) {
    const g = colorGroupForDocs(e.name)
    if (g) bySection.get(g)!.push(e)
  }

  for (const section of FIGMA_COLOR_SECTION_ORDER) {
    sortColorTokensForDocs(bySection.get(section) ?? [], section)
  }

  return (
    <DocsPage
      category="Foundation"
      title="Colors"
      description="Color tokens from cwpc-tokens.css, grouped like Figma: surface and fills, text, icons, and borders. Pair with the full token list on the Tokens page."
      status="stable"
    >
      <DocsSection title="Related">
        <p className={styles.note}>
          For every CSS custom property (including non-color tokens), see{' '}
          <Link to="/docs/tokens" className={styles.link}>
            Tokens
          </Link>
          .
        </p>
      </DocsSection>

      {FIGMA_COLOR_SECTION_ORDER.map((section) => {
        const list = bySection.get(section) ?? []
        if (list.length === 0) return null
        const subsections = groupColorTokensIntoSubsections(list, section)
        return (
          <DocsSection key={section} title={section}>
            {subsections.map((sub) => (
              <div key={`${section}-${sub.title}`} className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>{sub.title}</h3>
                <div className={styles.grid}>
                  {sub.entries.map((c) => {
                    const hexOrRgb = resolveDisplayColor(c.value, map) ?? c.value
                    const swatch =
                      resolveDisplayColor(c.value, map) ??
                      (/^#[\da-fA-F]{3,8}$/i.test(c.value.trim()) ? c.value.trim() : null) ??
                      (/^rgba?\(/i.test(c.value.trim()) ? c.value.trim() : null)
                    return (
                      <div key={c.name} className={styles.card}>
                        <div
                          className={styles.swatchTop}
                          style={
                            {
                              background: swatch ?? 'var(--color-neutral-200)',
                            } satisfies CSSProperties
                          }
                        />
                        <div className={styles.cardBody}>
                          <div className={styles.shortName}>{c.name.replace(/^--/, '')}</div>
                          <code className={styles.code}>{c.name}</code>
                          <code className={styles.value}>{hexOrRgb}</code>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </DocsSection>
        )
      })}
    </DocsPage>
  )
}
