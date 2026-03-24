import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { VideoCard } from '../../components/organisms/VideoCard/VideoCard'

const meta = {
  title: 'Organisms/VideoCard',
  component: VideoCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Video teaser with play control, presenter row, and optional duration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    duration: { control: 'text' },
    presenterName: { control: 'text' },
    onCtaClick: {
      action: 'cta-clicked',
      description: 'Called when the CTA control is activated',
      table: { category: 'Events' },
    },
    onPlay: {
      action: 'play',
      description: 'Called when play is triggered on the thumbnail',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof VideoCard>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<VideoCard title="Briefing" thumbnailSrc="…" videoUrl="…" />

// HTML + CSS
<article class="cwpc-video-card">…</article>

// Vue
<VideoCard title="Briefing" />

// Angular
<cwpc-video-card title="Briefing"></cwpc-video-card>`,
  language: 'tsx' as const,
}

const d: Meta<typeof VideoCard>['decorators'] = [
  (Story) => (
    <div style={{ width: 'min(100%, 420px)' }}>
      <Story />
    </div>
  ),
]

export const Default: Story = {
  args: {
    title: 'Fuel breaks that scale',
    presenterName: 'Riley Chen',
    presenterRole: 'CWPC Operations',
    thumbnailSrc: 'https://picsum.photos/id/167/640/360',
    videoUrl: 'https://example.com/video',
    ctaLabel: 'View presentation',
    onCtaClick: fn(),
    onPlay: fn(),
  },
  parameters: { docs: { source: src } },
  decorators: d,
}

export const WithDuration: Story = {
  args: {
    title: 'Evening briefing — Sierra front',
    duration: '12:04',
    presenterName: 'Alex Morgan',
    presenterRole: 'Incident analyst',
    thumbnailSrc: 'https://picsum.photos/id/180/640/360',
    videoUrl: 'https://example.com/briefing',
    onCtaClick: fn(),
    onPlay: fn(),
  },
  decorators: d,
}
