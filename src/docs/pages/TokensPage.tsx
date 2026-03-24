import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { TokenCatalog } from '../helpers/TokenCatalog'
import { DocsPage, DocsSection } from '../helpers/DocsPage'
import styles from './TokensPage.module.css'

/** Ordered by pixel value; --space-450 is 10px per cwpc-tokens.css */
const SPACING_SCALE: { token: string; px: number }[] = [
  { token: '--space-0', px: 0 },
  { token: '--space-25', px: 1 },
  { token: '--space-50', px: 2 },
  { token: '--space-100', px: 4 },
  { token: '--space-200', px: 8 },
  { token: '--space-450', px: 10 },
  { token: '--space-300', px: 12 },
  { token: '--space-400', px: 16 },
  { token: '--space-500', px: 20 },
  { token: '--space-600', px: 24 },
  { token: '--space-700', px: 28 },
  { token: '--space-800', px: 32 },
  { token: '--space-900', px: 36 },
  { token: '--space-1000', px: 40 },
  { token: '--space-1100', px: 44 },
  { token: '--space-1200', px: 48 },
  { token: '--space-1300', px: 56 },
  { token: '--space-1400', px: 64 },
  { token: '--space-1500', px: 72 },
  { token: '--space-1600', px: 96 },
  { token: '--space-1700', px: 128 },
  { token: '--space-1800', px: 256 },
  { token: '--space-1900', px: 512 },
]

const MAX_BAR_PX = 300

const MOTION_ROWS: {
  label: string
  ms: string
  cssMs: string
  token: string
  usage: string
}[] = [
  {
    label: 'Fast',
    ms: '150ms',
    cssMs: '150ms',
    token: '--duration-link',
    usage: 'Used for hover states',
  },
  {
    label: 'Normal',
    ms: '200ms',
    cssMs: '200ms',
    token: '--duration-switch',
    usage: 'Used for toggle / switch',
  },
  {
    label: 'Slow',
    ms: '300ms',
    cssMs: '300ms',
    token: '--duration-panel-slide',
    usage: 'Used for open / close panels',
  },
  {
    label: 'Very Slow',
    ms: '600ms',
    cssMs: '600ms',
    token: '--duration-progress-bar-width',
    usage: 'Used for progress animations',
  },
]

const ELEVATION_SHADOW_ROWS: { level: string; usage: string; shadow: string; useToken?: boolean }[] = [
  {
    level: 'Elevation 1',
    usage: 'Subtle — cards at rest',
    shadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  {
    level: 'Elevation 2',
    usage: 'Low — dropdown menus',
    shadow: '0 2px 8px rgba(0,0,0,0.4)',
  },
  {
    level: 'Elevation 3',
    usage: 'Medium — popovers',
    shadow: '0 4px 16px rgba(0,0,0,0.5)',
  },
  {
    level: 'Elevation 4',
    usage: 'High — modals',
    shadow: '0 8px 24px rgba(0,0,0,0.6)',
  },
  {
    level: 'Elevation 5 (CWPC Glow)',
    usage: 'Glow — CWPC cards',
    shadow: 'var(--shadow-card-glow)',
    useToken: true,
  },
]

function MotionDemonstrations() {
  return (
    <div className={styles.motionGrid}>
      {MOTION_ROWS.map((row) => (
        <div key={row.label} className={styles.motionRow}>
          <div className={styles.motionLabelRow}>
            <span className={styles.motionLabel}>
              {row.label}: {row.ms}
            </span>
            <span className={styles.motionMeta}>{row.token}</span>
          </div>
          <p className={styles.motionUsage}>{row.usage}</p>
          <div className={styles.motionBarTrack}>
            <div
              className={styles.motionBar}
              style={{ animationDuration: row.cssMs } as CSSProperties}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function ShadowsReferenceTable() {
  return (
    <div className={styles.shadowsWrap}>
      <table className={styles.shadowsTable}>
        <thead>
          <tr>
            <th scope="col">Level</th>
            <th scope="col">Usage</th>
            <th scope="col">Preview</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {ELEVATION_SHADOW_ROWS.map((row) => (
            <tr key={row.level}>
              <td>{row.level}</td>
              <td>{row.usage}</td>
              <td className={styles.shadowSwatchCell}>
                <div
                  className={styles.shadowSwatch}
                  style={
                    {
                      boxShadow: row.useToken ? 'var(--shadow-card-glow)' : row.shadow,
                    } as CSSProperties
                  }
                />
              </td>
              <td>
                <code className={styles.shadowCode}>{row.shadow}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TokensPage() {
  return (
    <DocsPage
      category="Foundation"
      title="Tokens"
      description="CSS custom properties defined in cwpc-tokens.css — the single source of truth for CWPC components. The catalog below mirrors Storybook’s Foundation/Tokens story (parsed from the same file)."
      status="stable"
    >
      <DocsSection title="Color reference (Figma groupings)">
        <p className={styles.note}>
          For color tokens grouped as surface, text, icons, and borders, see the{' '}
          <Link to="/docs/colors" className={styles.linkToColors}>
            Colors
          </Link>{' '}
          page (same groupings as Storybook’s Foundation/Colors story).
        </p>
      </DocsSection>

      <DocsSection title="All design tokens">
        <p className={styles.note}>
          Every <code className={styles.textName}>--*</code> variable from <code className={styles.textName}>cwpc-tokens.css</code>, grouped by category.
        </p>
        <TokenCatalog />
      </DocsSection>

      <DocsSection title="Spacing scale (visual)">
        <p className={styles.note}>Bar length maps to token spacing (capped for very large steps).</p>
        {SPACING_SCALE.map((row) => {
          const barWidth = Math.min(row.px, MAX_BAR_PX)
          return (
            <div key={row.token} className={styles.spacingRow}>
              <span className={styles.spacingToken}>{row.token}</span>
              <div className={styles.spacingBarWrap}>
                <div
                  className={styles.spacingBar}
                  style={{
                    width: barWidth > 0 ? `${barWidth}px` : 'var(--border-width-xs)',
                  }}
                />
              </div>
              <span className={styles.spacingPx}>{row.px}px</span>
            </div>
          )
        })}
      </DocsSection>

      <DocsSection title="Typography scale">
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H1 (47.8px)</span>
          <p className={[styles.typographySample, styles.h1].join(' ')}>The quick brown fox</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H2 (39.8px)</span>
          <p className={[styles.typographySample, styles.h2].join(' ')}>Wildfire Prevention</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H3 (33.2px)</span>
          <p className={[styles.typographySample, styles.h3].join(' ')}>Community Resilience</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H4 (27.6px)</span>
          <p className={[styles.typographySample, styles.h4].join(' ')}>Scorecard Overview</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H5 (23px)</span>
          <p className={[styles.typographySample, styles.h5].join(' ')}>Design System</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H6 (19.2px)</span>
          <p className={[styles.typographySample, styles.h6].join(' ')}>Component Library</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-xl (20px)</span>
          <p className={[styles.typographySample, styles.bodyXl].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-lg (18px)</span>
          <p className={[styles.typographySample, styles.bodyLg].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-md (16px)</span>
          <p className={[styles.typographySample, styles.bodyMd].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-sm (14px)</span>
          <p className={[styles.typographySample, styles.bodySm].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-xs (11.1px)</span>
          <p className={[styles.typographySample, styles.body2xs].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </DocsSection>

      <DocsSection title="Font weights">
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>300 Light</span>
          <span className={[styles.weightSample, styles.w300].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>400 Regular</span>
          <span className={[styles.weightSample, styles.w400].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>500 Medium</span>
          <span className={[styles.weightSample, styles.w500].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>600 SemiBold</span>
          <span className={[styles.weightSample, styles.w600].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>700 Bold</span>
          <span className={[styles.weightSample, styles.w700].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>800 ExtraBold</span>
          <span className={[styles.weightSample, styles.w800].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>900 Black</span>
          <span className={[styles.weightSample, styles.w900].join(' ')}>Wildfire</span>
        </div>
      </DocsSection>

      <DocsSection title="Border radius">
        <div className={styles.radiusRow}>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusNone].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-none
              <br />
              0px
            </span>
          </div>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusXs].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-xs
              <br />
              1px
            </span>
          </div>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusSm].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-sm
              <br />
              2px
            </span>
          </div>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusMd].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-md
              <br />
              4px
            </span>
          </div>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusLg].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-lg
              <br />
              8px
            </span>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Motion / Transitions">
        <p className={styles.note}>
          Timing values from cwpc-tokens.css. Each bar pulses using{' '}
          <code className={styles.textName}>tokenMotionPulse</code> at the listed duration.
        </p>
        <MotionDemonstrations />
      </DocsSection>

      <DocsSection title="Shadows Reference">
        <p className={styles.note}>Five elevation levels used across the system (see also Elevation docs).</p>
        <ShadowsReferenceTable />
      </DocsSection>
    </DocsPage>
  )
}
