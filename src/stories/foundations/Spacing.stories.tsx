import type { Meta, StoryObj } from '@storybook/react'

const spacingScale = [
  { token: '--space-100', value: '4px', px: 4 },
  { token: '--space-200', value: '8px', px: 8 },
  { token: '--space-300', value: '12px', px: 12 },
  { token: '--space-400', value: '16px', px: 16 },
  { token: '--space-500', value: '20px', px: 20 },
  { token: '--space-600', value: '24px', px: 24 },
  { token: '--space-800', value: '32px', px: 32 },
  { token: '--space-1000', value: '40px', px: 40 },
  { token: '--space-1200', value: '48px', px: 48 },
  { token: '--space-1400', value: '64px', px: 64 },
  { token: '--space-1600', value: '96px', px: 96 },
]

const SpacingPage = () => (
  <div style={{ padding: '48px 32px', fontFamily: '"Work Sans", sans-serif', color: '#F5F5F7', background: '#1B1B1F', minHeight: '100vh' }}>
    <h1 style={{ fontSize: '33.2px', fontWeight: 700, marginBottom: '8px', color: '#F5F5F7' }}>Spacing</h1>
    <p style={{ color: '#A1A1AA', marginBottom: '48px' }}>All spacing uses an 8px base grid. Always use tokens — never hardcode pixel values.</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {spacingScale.map(s => (
        <div key={s.token} style={{
          display: 'grid',
          gridTemplateColumns: '220px 80px 1fr',
          alignItems: 'center',
          gap: '16px',
          padding: '10px 0',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{ fontSize: '13px', fontFamily: 'monospace', color: '#FF6701' }}>{s.token}</div>
          <div style={{ fontSize: '13px', fontFamily: 'monospace', color: '#A1A1AA' }}>{s.value}</div>
          <div style={{ height: '24px', display: 'flex', alignItems: 'center' }}>
            <div style={{
              height: '10px',
              width: `${Math.min(s.px * 2, 400)}px`,
              background: 'linear-gradient(90deg, #FF6701, rgba(255,103,1,0.4))',
              borderRadius: '2px',
            }} />
          </div>
        </div>
      ))}
    </div>
  </div>
)

const meta = {
  title: 'Foundation/Spacing',
  component: SpacingPage,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'darker' } },
  tags: ['autodocs'],
} satisfies Meta<typeof SpacingPage>

export default meta
type Story = StoryObj<typeof meta>
export const SpacingScale: Story = {}
