import type { Meta, StoryObj } from '@storybook/react'
import { VideoPlayer } from '../../components/organisms/VideoPlayer/VideoPlayer'

const sampleSrc =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

const meta = {
  title: 'Organisms/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Custom video controls with seek, volume, mute, and fullscreen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    autoplay: { control: 'boolean' },
    loop: { control: 'boolean' },
    muted: { control: 'boolean' },
  },
} satisfies Meta<typeof VideoPlayer>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<VideoPlayer src="/media/briefing.mp4" title="Field briefing" />

// HTML + CSS
<div class="cwpc-video-player" role="region">…</div>

// Vue
<VideoPlayer src="/media/briefing.mp4" />

// Angular
<cwpc-video-player src="/media/briefing.mp4"></cwpc-video-player>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    src: sampleSrc,
    title: 'Sample briefing clip',
    muted: true,
  },
  parameters: { docs: { source: src } },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 640px)' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithPoster: Story = {
  args: {
    src: sampleSrc,
    poster:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower.jpg',
    title: 'Training video with poster frame',
    muted: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 640px)' }}>
        <Story />
      </div>
    ),
  ],
}
