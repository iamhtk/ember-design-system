import type { Meta, StoryObj } from '@storybook/react'

const typeScale = [
  { name: 'H1', size: '47.8px', weight: '700', token: '--font-size-h1', sample: 'Community Preparation Saves' },
  { name: 'H2', size: '39.8px', weight: '700', token: '--font-size-h2', sample: 'Wildfire Prevention Tools' },
  { name: 'H3', size: '33.2px', weight: '600', token: '--font-size-h3', sample: 'Design System Components' },
  { name: 'H4', size: '27.6px', weight: '600', token: '--font-size-h4', sample: 'Component Documentation' },
  { name: 'H5', size: '23px', weight: '600', token: '--font-size-h5', sample: 'Accessibility Standards' },
  { name: 'H6', size: '19.2px', weight: '600', token: '--font-size-h6', sample: 'WCAG AA Compliance' },
  { name: 'Body LG', size: '19.2px', weight: '400', token: '--font-size-body-lg', sample: 'Emergency tools must work for everyone, everywhere, under any condition.' },
  { name: 'Body MD', size: '16px', weight: '400', token: '--font-size-body-md', sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Body SM', size: '14px', weight: '400', token: '--font-size-body-sm', sample: 'Secondary information and supporting content.' },
  { name: 'Caption', size: '11px', weight: '400', token: '--font-size-caption', sample: 'Labels, captions, and metadata text.' },
]

const TypographyPage = () => (
  <div style={{ padding: '48px 32px', fontFamily: '"Work Sans", sans-serif', color: '#F5F5F7', background: '#1B1B1F', minHeight: '100vh' }}>
    <h1 style={{ fontSize: '33.2px', fontWeight: 700, marginBottom: '8px', color: '#F5F5F7' }}>Typography</h1>
    <p style={{ color: '#A1A1AA', marginBottom: '48px' }}>Prism uses Work Sans across all components with a modular type scale.</p>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {typeScale.map((type, i) => (
        <div key={type.token} style={{
          display: 'grid',
          gridTemplateColumns: '100px 1fr 220px',
          alignItems: 'center',
          gap: '24px',
          padding: '20px 0',
          borderBottom: i < typeScale.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#71717A', fontFamily: 'monospace' }}>{type.name}</div>
            <div style={{ fontSize: '11px', color: '#71717A', fontFamily: 'monospace' }}>{type.size} / {type.weight}</div>
          </div>
          <div style={{
            fontSize: type.size,
            fontWeight: Number(type.weight),
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#F5F5F7',
          }}>
            {type.sample}
          </div>
          <div style={{ fontSize: '11px', color: '#FF6701', fontFamily: 'monospace' }}>{type.token}</div>
        </div>
      ))}
    </div>
  </div>
)

const meta = {
  title: 'Foundation/Typography',
  component: TypographyPage,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'darker' } },
  tags: ['autodocs'],
} satisfies Meta<typeof TypographyPage>

export default meta
type Story = StoryObj<typeof meta>
export const TypeScale: Story = {}
