import type { Meta, StoryObj } from '@storybook/react'

const IntroductionPage = () => (
  <div style={{
    maxWidth: '800px',
    margin: '0 auto',
    padding: '48px 32px',
    fontFamily: '"Work Sans", sans-serif',
    color: '#F5F5F7',
    background: '#1B1B1F',
    minHeight: '100vh',
  }}>
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255,103,1,0.12)',
      border: '1px solid rgba(255,103,1,0.3)',
      borderRadius: '50px',
      padding: '6px 16px',
      fontSize: '12px',
      fontWeight: 700,
      color: '#FF6701',
      marginBottom: '24px',
      letterSpacing: '0.08em',
    }}>
      CWPC — CATASTROPHIC WILDFIRE PREVENTION CONSORTIUM
    </div>
    <h1 style={{ fontSize: '47.8px', fontWeight: 700, margin: '0 0 16px', lineHeight: 1.2, color: '#F5F5F7' }}>
      Prism Design System
    </h1>
    <p style={{ fontSize: '19.2px', color: '#A1A1AA', lineHeight: 1.6, marginBottom: '48px', margin: '0 0 48px' }}>
      A production-ready component library built for CWPC emergency tools.
      Every component meets WCAG AA. Every value is a token. Every decision is documented.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '48px' }}>
      {[
        { count: '17', label: 'Atoms' },
        { count: '26', label: 'Molecules' },
        { count: '20', label: 'Organisms' },
        { count: '100+', label: 'Tokens' },
      ].map(item => (
        <div key={item.label} style={{
          background: '#232329',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: '33.2px', fontWeight: 700, color: '#FF6701' }}>{item.count}</div>
          <div style={{ fontSize: '14px', color: '#A1A1AA', marginTop: '4px' }}>{item.label}</div>
        </div>
      ))}
    </div>
    <h2 style={{ fontSize: '23px', fontWeight: 700, marginBottom: '16px', color: '#F5F5F7' }}>Design Principles</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
      {[
        { num: '01', title: 'Accessibility is not optional', desc: 'Every component meets WCAG AA minimum. No exceptions.' },
        { num: '02', title: 'Tokens before everything', desc: 'No hardcoded values. Every color, spacing, and radius is a named token.' },
        { num: '03', title: 'Documentation is the product', desc: 'Every component ships with interactive controls, code in 4 languages, and accessibility notes.' },
      ].map(item => (
        <div key={item.num} style={{
          display: 'flex',
          gap: '16px',
          padding: '20px',
          background: '#232329',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.06)',
          alignItems: 'flex-start',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#FF6701', minWidth: '24px', paddingTop: '3px' }}>{item.num}</div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px', color: '#F5F5F7' }}>{item.title}</div>
            <div style={{ fontSize: '14px', color: '#A1A1AA' }}>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: '12px' }}>
      {[
        { label: 'Component Showcase', url: 'https://prism.cwpc.hrithiksanyal.com' },
        { label: 'Figma File', url: 'https://www.figma.com/design/2bE1dja5Ul5JrXGhvBgE23' },
      ].map(link => (
        <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '8px',
          background: 'rgba(255,103,1,0.1)',
          border: '1px solid rgba(255,103,1,0.25)',
          color: '#FF6701',
          fontSize: '14px',
          fontWeight: 600,
          textDecoration: 'none',
        }}>
          {link.label} ↗
        </a>
      ))}
    </div>
  </div>
)

const meta = {
  title: 'Prism Design System/Introduction',
  component: IntroductionPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'darker' },
  },
} satisfies Meta<typeof IntroductionPage>

export default meta
type Story = StoryObj<typeof meta>
export const Welcome: Story = {}
