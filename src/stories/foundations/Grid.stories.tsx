import type { Meta, StoryObj } from '@storybook/react'

const GridPage = () => (
  <div style={{ padding: '48px 32px', fontFamily: '"Work Sans", sans-serif', color: '#F5F5F7', background: '#1B1B1F', minHeight: '100vh' }}>
    <h1 style={{ fontSize: '33.2px', fontWeight: 700, marginBottom: '8px' }}>Grid</h1>
    <p style={{ color: '#A1A1AA', marginBottom: '48px' }}>
      Prism uses a 12-column grid with responsive breakpoints. All layouts are built on this system.
    </p>

    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Breakpoints</h2>
    <div style={{ background: '#232329', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '48px' }}>
      {[
        { name: 'Mobile', token: '--breakpoint-sm', value: '375px', cols: '4 columns', gutter: '16px' },
        { name: 'Tablet', token: '--breakpoint-md', value: '768px', cols: '8 columns', gutter: '24px' },
        { name: 'Desktop', token: '--breakpoint-lg', value: '1024px', cols: '12 columns', gutter: '32px' },
        { name: 'Wide', token: '--breakpoint-xl', value: '1440px', cols: '12 columns', gutter: '32px' },
      ].map((bp, i, arr) => (
        <div key={bp.name} style={{
          display: 'grid', gridTemplateColumns: '120px 240px 120px 120px 1fr',
          gap: '16px', padding: '16px 20px', alignItems: 'center',
          borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
        }}>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>{bp.name}</div>
          <div style={{ fontSize: '13px', fontFamily: 'monospace', color: '#FF6701' }}>{bp.token}</div>
          <div style={{ fontSize: '13px', fontFamily: 'monospace', color: '#A1A1AA' }}>{bp.value}</div>
          <div style={{ fontSize: '13px', color: '#A1A1AA' }}>{bp.cols}</div>
          <div style={{ fontSize: '13px', color: '#71717A' }}>Gutter: {bp.gutter}</div>
        </div>
      ))}
    </div>

    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>12-Column Grid</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px', marginBottom: '32px' }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{ background: 'rgba(255,103,1,0.15)', border: '1px solid rgba(255,103,1,0.3)', borderRadius: '4px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#FF6701', fontFamily: 'monospace' }}>{i + 1}</div>
      ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px', marginBottom: '12px' }}>
      {[
        { span: 4, label: '4 col' }, { span: 4, label: '4 col' }, { span: 4, label: '4 col' },
      ].map((item, i) => (
        <div key={i} style={{ gridColumn: `span ${item.span}`, background: 'rgba(101,166,55,0.12)', border: '1px solid rgba(101,166,55,0.3)', borderRadius: '4px', padding: '12px', fontSize: '12px', color: '#65A637', textAlign: 'center' }}>{item.label}</div>
      ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px', marginBottom: '48px' }}>
      {[
        { span: 8, label: '8 col — main content' }, { span: 4, label: '4 col — sidebar' },
      ].map((item, i) => (
        <div key={i} style={{ gridColumn: `span ${item.span}`, background: 'rgba(13,114,255,0.12)', border: '1px solid rgba(13,114,255,0.3)', borderRadius: '4px', padding: '12px', fontSize: '12px', color: '#0D72FF', textAlign: 'center' }}>{item.label}</div>
      ))}
    </div>

    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Usage</h2>
    <div style={{ background: '#232329', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <pre style={{ margin: 0, fontSize: '13px', fontFamily: 'monospace', lineHeight: 1.8, color: '#F5F5F7' }}>{`.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-800);
}

.col-4 { grid-column: span 4; }
.col-8 { grid-column: span 8; }
.col-12 { grid-column: span 12; }`}</pre>
    </div>
  </div>
)

const meta = {
  title: 'Foundation/Grid',
  component: GridPage,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'darker' } },
  tags: ['autodocs'],
} satisfies Meta<typeof GridPage>

export default meta
type Story = StoryObj<typeof meta>
export const GridSystem: Story = {}
