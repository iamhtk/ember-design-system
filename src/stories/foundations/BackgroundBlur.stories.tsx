import type { Meta, StoryObj } from '@storybook/react'

const blurLevels = [
  { name: 'Subtle', token: '--blur-sm', value: 'blur(4px)', usage: 'Overlays, subtle frosted glass' },
  { name: 'Medium', token: '--blur-md', value: 'blur(8px)', usage: 'Modals, drawers, popups' },
  { name: 'Strong', token: '--blur-lg', value: 'blur(16px)', usage: 'Full-screen overlays, hero sections' },
  { name: 'Intense', token: '--blur-xl', value: 'blur(24px)', usage: 'Dramatic frosted glass effects' },
]

const BackgroundBlurPage = () => (
  <div style={{ padding: '48px 32px', fontFamily: '"Work Sans", sans-serif', color: '#F5F5F7', background: '#1B1B1F', minHeight: '100vh' }}>
    <h1 style={{ fontSize: '33.2px', fontWeight: 700, marginBottom: '8px' }}>Background Blur</h1>
    <p style={{ color: '#A1A1AA', marginBottom: '48px' }}>
      Backdrop blur creates frosted glass effects. Used in modals, overlays, and layered UI elements.
    </p>

    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Blur Scale</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px', marginBottom: '48px' }}>
      {blurLevels.map(level => (
        <div key={level.token} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '160px' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(255,103,1,0.4) 0%, rgba(13,114,255,0.4) 50%, rgba(101,166,55,0.4) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: '16px',
            background: 'rgba(18,18,18,0.6)',
            backdropFilter: level.value,
            WebkitBackdropFilter: level.value,
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>{level.name}</div>
            <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#FF6701' }}>{level.token}</div>
            <div style={{ fontSize: '11px', color: '#A1A1AA' }}>{level.value}</div>
          </div>
        </div>
      ))}
    </div>

    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Usage</h2>
    <div style={{ background: '#232329', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <pre style={{ margin: 0, fontSize: '13px', fontFamily: 'monospace', lineHeight: 1.8, color: '#F5F5F7' }}>{`.modal-overlay {
  backdrop-filter: var(--blur-md);
  -webkit-backdrop-filter: var(--blur-md);
  background: rgba(18, 18, 18, 0.6);
}

.hero-glass-card {
  backdrop-filter: var(--blur-lg);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}`}</pre>
    </div>
  </div>
)

const meta = {
  title: 'Foundation/Background Blur',
  component: BackgroundBlurPage,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'darker' } },
  tags: ['autodocs'],
} satisfies Meta<typeof BackgroundBlurPage>

export default meta
type Story = StoryObj<typeof meta>
export const BlurScale: Story = {}
