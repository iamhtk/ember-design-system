import type { Meta, StoryObj } from '@storybook/react'
import { TabBar } from '../../components/molecules/TabBar/TabBar'

const baseTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'datasets', label: 'Datasets' },
  { id: 'reports', label: 'Reports' },
]

const meta = {
  title: 'Molecules/TabBar',
  component: TabBar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Horizontal tab list with optional badges and disabled items.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultTab: { control: 'text' },
  },
} satisfies Meta<typeof TabBar>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<TabBar tabs={tabs} defaultTab="overview" />

// HTML + CSS
<div class="cwpc-tab-bar" role="tablist">…</div>

// Vue
<TabBar :tabs="tabs" default-tab="overview" />

// Angular
<cwpc-tab-bar [tabs]="tabs" defaultTab="overview"></cwpc-tab-bar>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { tabs: baseTabs, defaultTab: 'overview' },
  parameters: { docs: { source: src } },
}

export const WithDisabled: Story = {
  args: {
    tabs: [
      { id: 'a', label: 'Overview' },
      { id: 'b', label: 'Draft', disabled: true },
      { id: 'c', label: 'Published' },
    ],
    defaultTab: 'a',
  },
}

export const WithBadge: Story = {
  args: {
    tabs: [
      { id: 'inbox', label: 'Inbox', badge: 3 },
      { id: 'sent', label: 'Sent' },
    ],
    defaultTab: 'inbox',
  },
}
