import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Banner } from '../../components/organisms/Banner/Banner'

const meta = {
  title: 'Organisms/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'darker' },
    docs: {
      description: {
        component: 'Hero banner with optional imagery, overlay, and primary call to action.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['left', 'center'] },
    showOverlay: { control: 'boolean' },
    onCtaClick: {
      action: 'cta-clicked',
      description: 'Called when the primary CTA is activated',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Banner title="Prepare your community" subtitle="CWPC" ctaLabel="Get started" />

// HTML + CSS
<header class="cwpc-banner">…</header>

// Vue
<Banner title="Prepare your community" />

// Angular
<cwpc-banner title="Prepare your community"></cwpc-banner>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    subtitle: 'CWPC',
    title: 'Community preparation saves lives before the spark.',
    description:
      'Use Prism components to ship accessible wildfire prevention tools faster.',
    ctaLabel: 'Explore scorecard',
    ctaHref: '#',
    height: '420px',
    align: 'left',
    showOverlay: true,
    onCtaClick: fn(),
  },
  parameters: { docs: { source: src } },
}

export const CenterAligned: Story = {
  args: {
    subtitle: 'Emergency tools',
    title: 'One design system for every CWPC surface.',
    description: 'Tokens, documentation, and components aligned to WCAG AA.',
    ctaLabel: 'View components',
    ctaHref: '#',
    height: '400px',
    align: 'center',
    showOverlay: true,
    onCtaClick: fn(),
  },
}

export const NoOverlay: Story = {
  args: {
    title: 'High-contrast hero without gradient overlay',
    description: 'Use when photography already provides enough contrast.',
    ctaLabel: 'Learn more',
    ctaHref: '#',
    height: '360px',
    showOverlay: false,
    onCtaClick: fn(),
  },
}
