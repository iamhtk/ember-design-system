import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { FilterBar } from '../../components/molecules/FilterBar/FilterBar'

const filters = [
  { label: 'All hazards', value: 'all', count: 128 },
  { label: 'Wildfire', value: 'fire', count: 54 },
  { label: 'Drought', value: 'drought', count: 31 },
]

const meta = {
  title: 'Molecules/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Toggle chips for filtering datasets with multi- or single-select behavior.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiSelect: { control: 'boolean' },
    onChange: {
      action: 'changed',
      description: 'Called when the active filter set changes',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<FilterBar filters={filters} multiSelect />

// HTML + CSS
<div class="cwpc-filter-bar" role="group">…</div>

// Vue
<FilterBar :filters="filters" multi-select />

// Angular
<cwpc-filter-bar [filters]="filters" [multiSelect]="true"></cwpc-filter-bar>`,
  language: 'tsx' as const,
}

export const MultiSelect: Story = {
  args: { filters, multiSelect: true, activeFilters: ['fire', 'drought'], onChange: fn() },
  parameters: { docs: { source: src } },
}

export const SingleSelect: Story = {
  args: { filters, multiSelect: false, activeFilters: ['fire'], onChange: fn() },
}
