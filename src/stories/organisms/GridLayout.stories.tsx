import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../../components/atoms/Text/Text'
import { GridLayout } from '../../components/organisms/GridLayout/GridLayout'

const meta = {
  title: 'Organisms/GridLayout',
  component: GridLayout,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Responsive column grid for cards, stats, and dashboard sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: [1, 2, 3, 4] },
    gap: { control: 'select', options: ['sm', 'md', 'lg'] },
    responsive: { control: 'boolean' },
  },
} satisfies Meta<typeof GridLayout>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<GridLayout columns={3} gap="md">
  <Card />
</GridLayout>

// HTML + CSS
<div class="cwpc-grid-layout">…</div>

// Vue
<GridLayout :columns="3" gap="md" />

// Angular
<cwpc-grid-layout columns="3" gap="md"></cwpc-grid-layout>`,
  language: 'tsx' as const,
}

function cells(n: number) {
  return Array.from({ length: n }, (_, i) => (
    <div
      key={i}
      style={{
        padding: 'var(--space-600)',
        borderRadius: 'var(--border-radius-md)',
        border: 'var(--border-width-xs) solid rgba(255,255,255,0.08)',
        background: 'var(--color-dropdown-surface)',
      }}
    >
      <Text variant="body-sm" color="caption">
        Cell {i + 1}
      </Text>
    </div>
  ))
}

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 'md',
    responsive: true,
    children: cells(4),
  },
  parameters: { docs: { source: src } },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 960px)' }}>
        <Story />
      </div>
    ),
  ],
}

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: 'md',
    responsive: true,
    children: cells(6),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 960px)' }}>
        <Story />
      </div>
    ),
  ],
}

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: 'sm',
    responsive: true,
    children: cells(8),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 1100px)' }}>
        <Story />
      </div>
    ),
  ],
}
