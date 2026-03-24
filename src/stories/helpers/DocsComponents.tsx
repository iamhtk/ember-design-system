import type { ReactNode } from 'react'

// ─── Status Badge ────────────────────────────────────────────────
type StatusType = 'stable' | 'beta' | 'deprecated' | 'new'

const statusConfig: Record<StatusType, { label: string; bg: string; color: string; border: string }> = {
  stable: { label: 'Stable', bg: 'rgba(101,166,55,0.12)', color: '#65A637', border: 'rgba(101,166,55,0.3)' },
  beta: { label: 'Beta', bg: 'rgba(255,172,13,0.12)', color: '#FFAC0D', border: 'rgba(255,172,13,0.3)' },
  deprecated: { label: 'Deprecated', bg: 'rgba(255,39,13,0.12)', color: '#FF270D', border: 'rgba(255,39,13,0.3)' },
  new: { label: 'New', bg: 'rgba(13,114,255,0.12)', color: '#0D72FF', border: 'rgba(13,114,255,0.3)' },
}

export const StatusBadge = ({ status }: { status: StatusType }) => {
  const s = statusConfig[status]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: '50px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.06em',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontFamily: '"Work Sans", sans-serif',
        textTransform: 'uppercase',
      }}
    >
      {s.label}
    </span>
  )
}

// ─── Component Header ─────────────────────────────────────────────
interface ComponentHeaderProps {
  name: string
  status: StatusType
  description: string
  version?: string
  figmaUrl?: string
}

export const ComponentHeader = ({ name, status, description, figmaUrl }: ComponentHeaderProps) => (
  <div
    style={{
      padding: '32px 0 24px',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      marginBottom: '32px',
      fontFamily: '"Work Sans", sans-serif',
      color: '#F5F5F7',
    }}
  >
    <h1
      style={{
        fontSize: '33.2px',
        fontWeight: 700,
        margin: '0 0 16px',
        lineHeight: 1.2,
        color: '#F5F5F7',
      }}
    >
      {name}
    </h1>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
      <StatusBadge status={status} />
      {figmaUrl ? (
        <a
          href={figmaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#71717A',
            textDecoration: 'none',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Figma ↗
        </a>
      ) : null}
    </div>
    <p style={{ fontSize: '16px', color: '#A1A1AA', lineHeight: 1.7, margin: 0, maxWidth: '680px' }}>
      {description}
    </p>
  </div>
)

// ─── Usage Section ────────────────────────────────────────────────
interface UsageItem {
  do: boolean
  label: string
  description: string
  children: ReactNode
}

export const UsageGrid = ({ items }: { items: UsageItem[] }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3
      style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#71717A',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: '0 0 16px',
        fontFamily: '"Work Sans", sans-serif',
      }}
    >
      Usage
    </h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: `1px solid ${item.do ? 'rgba(101,166,55,0.3)' : 'rgba(255,39,13,0.3)'}`,
          }}
        >
          <div
            style={{
              padding: '24px',
              background: '#232329',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100px',
            }}
          >
            {item.children}
          </div>
          <div
            style={{
              padding: '12px 16px',
              background: item.do ? 'rgba(101,166,55,0.08)' : 'rgba(255,39,13,0.08)',
              borderTop: `1px solid ${item.do ? 'rgba(101,166,55,0.2)' : 'rgba(255,39,13,0.2)'}`,
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: item.do ? '#65A637' : '#FF270D',
                flexShrink: 0,
                marginTop: '1px',
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              {item.do ? '✓ Do' : "✗ Don't"}
            </span>
            <span
              style={{
                fontSize: '13px',
                color: '#A1A1AA',
                lineHeight: 1.5,
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ─── Accessibility Section ────────────────────────────────────────
interface A11yItem {
  level: 'AA' | 'AAA' | 'info'
  requirement: string
  detail: string
}

export const AccessibilitySection = ({ items }: { items: A11yItem[] }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3
      style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#71717A',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: '0 0 16px',
        fontFamily: '"Work Sans", sans-serif',
      }}
    >
      Accessibility
    </h3>
    <div
      style={{
        background: '#232329',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr',
            gap: '16px',
            padding: '14px 20px',
            alignItems: 'flex-start',
            borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              background:
                item.level === 'AA'
                  ? 'rgba(13,114,255,0.15)'
                  : item.level === 'AAA'
                    ? 'rgba(101,166,55,0.15)'
                    : 'rgba(255,255,255,0.06)',
              color:
                item.level === 'AA' ? '#0D72FF' : item.level === 'AAA' ? '#65A637' : '#71717A',
              border: `1px solid ${
                item.level === 'AA'
                  ? 'rgba(13,114,255,0.3)'
                  : item.level === 'AAA'
                    ? 'rgba(101,166,55,0.3)'
                    : 'rgba(255,255,255,0.1)'
              }`,
              flexShrink: 0,
              alignSelf: 'flex-start',
              marginTop: '1px',
              fontFamily: '"Work Sans", sans-serif',
            }}
          >
            {item.level === 'info' ? 'INFO' : `WCAG ${item.level}`}
          </span>
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#F5F5F7',
                marginBottom: '2px',
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              {item.requirement}
            </div>
            <div
              style={{
                fontSize: '13px',
                color: '#A1A1AA',
                lineHeight: 1.5,
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              {item.detail}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ─── Related Components ───────────────────────────────────────────
interface RelatedComponent {
  name: string
  description: string
  path: string
}

export const RelatedComponents = ({ items }: { items: RelatedComponent[] }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3
      style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#71717A',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: '0 0 16px',
        fontFamily: '"Work Sans", sans-serif',
      }}
    >
      Related Components
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#232329',
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'default',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#F5F5F7',
              fontFamily: '"Work Sans", sans-serif',
            }}
          >
            {item.name}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: '#71717A',
              marginTop: '2px',
              fontFamily: '"Work Sans", sans-serif',
            }}
          >
            {item.description}
          </div>
          <div style={{ fontSize: '10px', color: '#FF6701', marginTop: '4px', fontFamily: 'monospace' }}>
            {item.path}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ─── Anatomy Section ─────────────────────────────────────────────
interface AnatomyItem {
  number: number
  name: string
  description: string
  required?: boolean
}

export const AnatomySection = ({ items }: { items: AnatomyItem[] }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3
      style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#71717A',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: '0 0 16px',
        fontFamily: '"Work Sans", sans-serif',
      }}
    >
      Anatomy
    </h3>
    <div
      style={{
        background: '#232329',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr auto',
            gap: '16px',
            padding: '14px 20px',
            alignItems: 'center',
            borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'rgba(255,103,1,0.15)',
              border: '1px solid rgba(255,103,1,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700,
              color: '#FF6701',
              fontFamily: '"Work Sans", sans-serif',
              flexShrink: 0,
            }}
          >
            {item.number}
          </div>
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#F5F5F7',
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              {item.name}
            </div>
            <div style={{ fontSize: '13px', color: '#A1A1AA', fontFamily: '"Work Sans", sans-serif' }}>
              {item.description}
            </div>
          </div>
          {item.required !== undefined ? (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                padding: '2px 8px',
                borderRadius: '4px',
                background: item.required ? 'rgba(255,39,13,0.1)' : 'rgba(255,255,255,0.06)',
                color: item.required ? '#FF270D' : '#71717A',
                border: `1px solid ${item.required ? 'rgba(255,39,13,0.25)' : 'rgba(255,255,255,0.1)'}`,
                fontFamily: '"Work Sans", sans-serif',
              }}
            >
              {item.required ? 'Required' : 'Optional'}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  </div>
)

// ─── Prop Table ───────────────────────────────────────────────────
interface PropRow {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export const PropTable = ({ props: rows }: { props: PropRow[] }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3
      style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#71717A',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: '0 0 16px',
        fontFamily: '"Work Sans", sans-serif',
      }}
    >
      Props
    </h3>
    <div
      style={{
        background: '#232329',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '160px 200px 120px 1fr',
          gap: '0',
          padding: '10px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        {['Name', 'Type', 'Default', 'Description'].map((h) => (
          <div
            key={h}
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontFamily: '"Work Sans", sans-serif',
            }}
          >
            {h}
          </div>
        ))}
      </div>
      {rows.map((prop, i) => (
        <div
          key={prop.name}
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 200px 120px 1fr',
            gap: '0',
            padding: '14px 20px',
            alignItems: 'flex-start',
            borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <code style={{ fontSize: '13px', color: '#FF6701', fontFamily: 'monospace' }}>{prop.name}</code>
            {prop.required ? (
              <span style={{ fontSize: '9px', color: '#FF270D', fontWeight: 700, letterSpacing: '0.06em' }}>
                REQ
              </span>
            ) : null}
          </div>
          <code style={{ fontSize: '12px', color: '#0D72FF', fontFamily: 'monospace', lineHeight: 1.5 }}>
            {prop.type}
          </code>
          <code style={{ fontSize: '12px', color: '#71717A', fontFamily: 'monospace' }}>{prop.default ?? '—'}</code>
          <div style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.5, fontFamily: '"Work Sans", sans-serif' }}>
            {prop.description}
          </div>
        </div>
      ))}
    </div>
  </div>
)
