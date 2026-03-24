import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '../../components/atoms/Avatar/Avatar'

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Displays a user image, initials from a name, or a fallback silhouette.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'presenter'] },
    variant: { control: 'select', options: ['circle', 'square'] },
    status: { control: 'select', options: ['online', 'offline', 'away'] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Avatar name="Alex Morgan" size="md" />

// HTML + CSS
<span class="cwpc-avatar" role="img">AM</span>

// Vue
<Avatar name="Alex Morgan" size="md" />

// Angular
<cwpc-avatar name="Alex Morgan" size="md"></cwpc-avatar>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { name: 'Alex Morgan', size: 'md', variant: 'circle' },
  parameters: { docs: { source: src } },
}

export const AllSizes: Story = {
  args: { name: 'User', size: 'md' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-400)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </div>
  ),
}

export const WithImage: Story = {
  args: {
    src: 'https://picsum.photos/id/64/200/200',
    alt: 'Portrait',
    name: 'Jamie Lee',
    size: 'lg',
  },
}

export const Square: Story = {
  args: { name: 'Org', variant: 'square', size: 'md' },
}
