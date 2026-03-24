import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { List } from '../../components/molecules/List/List'

const items = [
  { label: 'Fuel break — North Ridge', description: 'In progress' },
  { label: 'Community drill — Carson Valley', description: 'Scheduled Q3' },
  { label: 'Sensor network — Tahoe', description: 'Maintenance' },
]

const meta = {
  title: 'Molecules/List',
  component: List,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Stacked rows for structured content with optional borders and interactivity.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'bordered', 'striped'] },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<List items={items} variant="default" />

// HTML + CSS
<ul class="cwpc-list">…</ul>

// Vue
<List :items="items" variant="default" />

// Angular
<cwpc-list [items]="items" variant="default"></cwpc-list>`,
  language: 'tsx' as const,
}

const dec = [
  (Story: () => ReactNode) => (
    <div style={{ width: 'min(100%, 420px)' }}>
      <Story />
    </div>
  ),
]

export const Default: Story = {
  args: { items, variant: 'default', interactive: false },
  parameters: { docs: { source: src } },
  decorators: dec,
}

export const Bordered: Story = {
  args: { items, variant: 'bordered' },
  decorators: dec,
}

export const Interactive: Story = {
  args: {
    items: items.map((it, i) => ({ ...it, active: i === 0 })),
    variant: 'bordered',
    interactive: true,
  },
  decorators: dec,
}
