import type { Meta, StoryObj } from '@storybook/react'
import { SubscribeWidget } from '../../components/molecules/SubscribeWidget/SubscribeWidget'

const meta = {
  title: 'Molecules/SubscribeWidget',
  component: SubscribeWidget,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Email capture with validation and inline success confirmation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['row', 'column'] },
    variant: { control: 'select', options: ['dark', 'light'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof SubscribeWidget>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<SubscribeWidget layout="row" variant="dark" label="Stay informed" />

// HTML + CSS
<div class="cwpc-subscribe-widget">…</div>

// Vue
<SubscribeWidget layout="row" variant="dark" />

// Angular
<cwpc-subscribe-widget layout="row" variant="dark"></cwpc-subscribe-widget>`,
  language: 'tsx' as const,
}

export const RowDark: Story = {
  args: {
    layout: 'row',
    variant: 'dark',
    label: 'Stay informed',
    placeholder: 'you@organization.gov',
    buttonLabel: 'Subscribe',
  },
  parameters: { docs: { source: src } },
}

export const ColumnDark: Story = {
  args: {
    layout: 'column',
    variant: 'dark',
    label: 'Weekly wildfire brief',
    placeholder: 'Email address',
    buttonLabel: 'Sign up',
  },
}
