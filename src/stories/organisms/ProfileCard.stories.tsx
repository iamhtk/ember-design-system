import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { fn } from '@storybook/test'
import { ProfileCard } from '../../components/organisms/ProfileCard/ProfileCard'

const meta = {
  title: 'Organisms/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Speaker or partner profile with avatar, media, and CTA.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    role: { control: 'text' },
    variant: { control: 'select', options: ['full', 'compact'] },
    onCtaClick: {
      action: 'cta-clicked',
      description: 'Called when the CTA button is activated',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof ProfileCard>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<ProfileCard name="Dr. Sam" role="Director" variant="full" />

// HTML + CSS
<article class="cwpc-profile-card">…</article>

// Vue
<ProfileCard name="Dr. Sam" role="Director" variant="full" />

// Angular
<cwpc-profile-card name="Dr. Sam" role="Director" variant="full"></cwpc-profile-card>`,
  language: 'tsx' as const,
}

const w = (wpx: string) => [
  (Story: () => ReactNode) => (
    <div style={{ width: `min(100%, ${wpx})` }}>
      <Story />
    </div>
  ),
]

export const Full: Story = {
  args: {
    name: 'Dr. Sam Okonkwo',
    role: 'Director, Interagency Fire Science',
    company: 'CWPC / Western States',
    location: 'Reno, NV',
    variant: 'full',
    videoThumbnailSrc: 'https://picsum.photos/id/1062/640/360',
    ctaLabel: 'View presentation slides',
    onCtaClick: fn(),
  },
  parameters: { docs: { source: src } },
  decorators: w('720px'),
}

export const Compact: Story = {
  args: {
    name: 'Jordan Lee',
    role: 'Community resilience lead',
    company: 'Truckee Meadows Fire',
    variant: 'compact',
    ctaLabel: 'Contact',
    onCtaClick: fn(),
  },
  decorators: w('480px'),
}
