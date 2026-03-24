import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '../../components/atoms/Skeleton/Skeleton'

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Placeholder shimmer for content that is still loading.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'circle', 'rectangle', 'card'] },
    animated: { control: 'boolean' },
    lines: { control: { type: 'number', min: 1, max: 5 } },
    width: { control: 'text' },
    height: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Skeleton variant="text" width="240px" />

// HTML + CSS
<span class="cwpc-skeleton"></span>

// Vue
<Skeleton variant="text" width="240px" />

// Angular
<cwpc-skeleton variant="text" width="240px"></cwpc-skeleton>`,
  language: 'tsx' as const,
}

export const Text: Story = {
  args: { variant: 'text', width: '240px', animated: true },
  parameters: { docs: { source: src } },
}

export const Circle: Story = {
  args: { variant: 'circle', width: '48px', height: '48px' },
}

export const Rectangle: Story = {
  args: { variant: 'rectangle', width: '280px', height: '120px' },
}

export const Card: Story = {
  args: { variant: 'card', width: '320px', height: '180px' },
}
