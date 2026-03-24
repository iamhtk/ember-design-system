import type { Meta, StoryObj } from '@storybook/react'

const elevations = [
  { name: 'None', token: '--shadow-none', value: 'none', style: 'none', usage: 'Flat surfaces, backgrounds' },
  { name: 'Card', token: '--shadow-card', value: '0 0 10px rgba(255,255,255,0.1)', style: '0 0 10px rgba(255,255,255,0.1)', usage: 'Cards, containers, panels' },
  { name: 'Card Bordered', token: '--shadow-card-bordered', value: '0 0 10px rgba(255,255,255,0.33)', style: '0 0 10px rgba(255,255,255,0.33)', usage: 'Featured cards, highlighted containers' },
  { name: 'Dropdown', token: '--shadow-dropdown', value: '0 8px 24px rgba(0,0,0,0.6)', style: '0 8px 24px rgba(0,0,0,0.6)', usage: 'Dropdowns, context menus, tooltips' },
  { name: 'Modal', token: '--shadow-modal', value: '0 24px 48px rgba(0,0,0,0.8)', style: '0 24px 48px rgba(0,0,0,0.8)', usage: 'Modals, dialogs, panels' },
]

const ElevationPage = () => (
  <div style={{ padding: '48px 32px', fontFamily: '"Work Sans", sans-serif', color: '#F5F5F7', background: '#1B1B1F', minHeight: '100vh' }}>
    <h1 style={{ fontSize: '33.2px', fontWeight: 700, marginBottom: '8px' }}>Elevation</h1>
    <p style={{ color: '#A1A1AA', marginBottom: '48px' }}>
      Prism uses white-glow shadows on dark backgrounds to create depth. Each elevation level has a semantic token.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px', marginBottom: '48px' }}>
      {elevations.filter(e => e.name !== 'None').map(el => (
        <div key={el.token} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#232329', borderRadius: '12px', height: '80px',
            boxShadow: el.style,
            border: '1px solid rgba(255,255,255,0.04)',
          }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{el.name}</div>
            <div style={{ fontSize: '11px', color: '#FF6701', fontFamily: 'monospace', marginBottom: '4px' }}>{el.token}</div>
            <div style={{ fontSize: '11px', color: '#71717A' }}>{el.usage}</div>
          </div>
        </div>
      ))}
    </div>
    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Token Reference</h2>
    <div style={{ background: '#232329', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
      {elevations.map((el, i) => (
        <div key={el.token} style={{
          display: 'grid', gridTemplateColumns: '180px 1fr 200px',
          gap: '16px', padding: '14px 20px', alignItems: 'center',
          borderBottom: i < elevations.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
        }}>
          <div style={{ fontSize: '13px', fontFamily: 'monospace', color: '#FF6701' }}>{el.token}</div>
          <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#A1A1AA' }}>{el.value}</div>
          <div style={{ fontSize: '13px', color: '#71717A' }}>{el.usage}</div>
        </div>
      ))}
    </div>
  </div>
)

const meta = {
  title: 'Foundation/Elevation',
  component: ElevationPage,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'darker' } },
  tags: ['autodocs'],
} satisfies Meta<typeof ElevationPage>

export default meta
type Story = StoryObj<typeof meta>
export const ElevationScale: Story = {}
