import type { CSSProperties } from 'react'
import {
  TOKEN_GROUP_ORDER,
  buildVarMap,
  categorizeToken,
  isLikelyColorValue,
  parseCssVariables,
  resolveDisplayColor,
} from './cwpcTokenCss'
import { tokensRaw } from './cwpcTokensRaw'
import styles from './TokenCatalog.module.css'

export function TokenCatalog() {
  const entries = parseCssVariables(tokensRaw)
  const map = buildVarMap(entries)
  const grouped = new Map<string, typeof entries>()
  for (const g of TOKEN_GROUP_ORDER) {
    grouped.set(g, [])
  }
  for (const e of entries) {
    const g = categorizeToken(e.name)
    if (!grouped.has(g)) grouped.set(g, [])
    grouped.get(g)!.push(e)
  }

  return (
    <div>
      {TOKEN_GROUP_ORDER.map((groupName) => {
        const list = grouped.get(groupName) ?? []
        if (list.length === 0) return null
        return (
          <section key={groupName} className={styles.group}>
            <h3 className={styles.groupTitle}>{groupName}</h3>
            <div className={styles.panel}>
              {list.map((t) => {
                const resolved = resolveDisplayColor(t.value, map)
                const showSwatch =
                  resolved != null || (isLikelyColorValue(t.value) && !t.value.includes('var('))
                const swatchBg = resolved ?? (showSwatch ? t.value : undefined)
                return (
                  <div
                    key={t.name}
                    className={`${styles.row} ${showSwatch ? styles.rowWithSwatch : styles.rowNoSwatch}`}
                  >
                    {showSwatch ? (
                      <div
                        className={styles.swatch}
                        style={{ background: swatchBg ?? 'transparent' } satisfies CSSProperties}
                        role="img"
                        aria-label={t.name}
                      />
                    ) : null}
                    <span className={styles.tokenName}>{t.name}</span>
                    <span className={styles.tokenValue}>{t.value}</span>
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
