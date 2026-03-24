import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from '../../components/molecules/Breadcrumb/Breadcrumb'

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Hierarchy trail with slash or arrow separators and current page marker.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'select', options: ['/', '>'] },
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Breadcrumb items={items} separator="/" />

// HTML + CSS
<nav class="cwpc-breadcrumb" aria-label="Breadcrumb">…</nav>

// Vue
<Breadcrumb :items="items" separator="/" />

// Angular
<cwpc-breadcrumb [items]="items" separator="/"></cwpc-breadcrumb>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    separator: '/',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Scorecard', href: '/scorecard' },
      { label: 'Instructions' },
    ],
  },
  parameters: { docs: { source: src } },
}

export const ArrowSeparator: Story = {
  args: {
    separator: '>',
    items: [
      { label: 'CWPC', href: '/' },
      { label: 'Showcase', href: '/showcase' },
      { label: 'Presentations' },
    ],
  },
}

export const SingleLevel: Story = {
  args: { separator: '/', items: [{ label: 'Dashboard' }] },
}
