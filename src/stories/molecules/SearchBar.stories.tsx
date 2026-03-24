import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { SearchBar } from '../../components/molecules/SearchBar/SearchBar'

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Search field with clear control, optional loading state, and suggestions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: {
      action: 'changed',
      description: 'Called when the query text changes',
      table: { category: 'Events' },
    },
    onSearch: {
      action: 'searched',
      description: 'Called when the user submits a search',
      table: { category: 'Events' },
    },
    onClear: {
      action: 'cleared',
      description: 'Called when the clear control is used',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

const searchEvents = { onChange: fn(), onSearch: fn(), onClear: fn() }

const src = {
  code: `// React
<SearchBar placeholder="Search…" size="md" />

// HTML + CSS
<div class="cwpc-search-bar">…</div>

// Vue
<SearchBar placeholder="Search…" size="md" />

// Angular
<cwpc-search-bar placeholder="Search…" size="md"></cwpc-search-bar>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    placeholder: 'Search scorecard…',
    size: 'md',
    ...searchEvents,
  },
  parameters: { docs: { source: src } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.type(input, 'wildfire')
    expect(input).toHaveValue('wildfire')
  },
}

export const Small: Story = {
  args: { placeholder: 'Search partners…', size: 'sm', ...searchEvents },
}

export const Medium: Story = {
  args: { placeholder: 'Search scorecard…', size: 'md', ...searchEvents },
}

export const Large: Story = {
  args: { placeholder: 'Search resources…', size: 'lg', ...searchEvents },
}

export const Loading: Story = {
  args: { placeholder: 'Searching…', loading: true, size: 'md', ...searchEvents },
}

export const Disabled: Story = {
  args: { placeholder: 'Unavailable', disabled: true, size: 'md', ...searchEvents },
}
