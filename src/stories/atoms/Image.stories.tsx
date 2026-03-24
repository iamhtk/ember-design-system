import type { Meta, StoryObj } from '@storybook/react'
import { Image } from '../../components/atoms/Image/Image'

const meta = {
  title: 'Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Responsive figure with loading skeleton, error fallback, and optional caption.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: { control: 'select', options: ['1/1', '16/9', '4/3', '3/2'] },
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Image src="/hero.jpg" alt="Forest" rounded="md" width="320px" />

// HTML + CSS
<figure class="cwpc-image"><img src="/hero.jpg" alt="Forest" /></figure>

// Vue
<Image src="/hero.jpg" alt="Forest" rounded="md" />

// Angular
<cwpc-image src="/hero.jpg" alt="Forest" rounded="md"></cwpc-image>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/id/28/640/400',
    alt: 'Forest landscape',
    rounded: 'md',
    width: '320px',
  },
  parameters: { docs: { source: src } },
}

export const AspectRatios: Story = {
  args: {
    src: 'https://picsum.photos/id/15/400/400',
    alt: '',
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 'var(--space-600)',
        maxWidth: '720px',
      }}
    >
      <Image src="https://picsum.photos/id/15/400/400" alt="" aspectRatio="1/1" width="100%" />
      <Image src="https://picsum.photos/id/29/640/360" alt="" aspectRatio="16/9" width="100%" />
    </div>
  ),
}

export const Rounded: Story = {
  args: {
    src: 'https://picsum.photos/id/10/400/400',
    alt: 'Rounded',
    rounded: 'lg',
    width: '200px',
    aspectRatio: '1/1',
  },
}
