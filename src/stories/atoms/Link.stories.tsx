import type { Meta, StoryObj } from '@storybook/react'
import { Link } from '../../components/atoms/Link/Link'

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Text link with optional external target and underline behavior.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    href: { control: 'text' },
    external: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'primary'] },
    underline: { control: 'select', options: ['always', 'hover', 'never'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Link href="/scorecard">View scorecard</Link>

// HTML + CSS
<a class="cwpc-link" href="/scorecard">View scorecard</a>

// Vue
<Link href="/scorecard">View scorecard</Link>

// Angular
<cwpc-link href="/scorecard">View scorecard</cwpc-link>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { href: '/scorecard', children: 'View the wildfire scorecard' },
  parameters: { docs: { source: src } },
}

export const External: Story = {
  args: {
    href: 'https://www.cwpc.org',
    children: 'CWPC (opens in new tab)',
    external: true,
    variant: 'primary',
  },
}

export const Disabled: Story = {
  args: { href: '#', children: 'Unavailable', disabled: true },
}
