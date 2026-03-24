import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../components/atoms/Button/Button'
import { EmptyState } from '../../components/molecules/EmptyState/EmptyState'

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Placeholder when there is no data, with optional action slot.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    variant: { control: 'select', options: ['default', 'search', 'error', 'success'] },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<EmptyState title="No data" description="Try again later." />

// HTML + CSS
<div class="cwpc-empty-state">…</div>

// Vue
<EmptyState title="No data" description="Try again later." />

// Angular
<cwpc-empty-state title="No data" description="Try again later."></cwpc-empty-state>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    title: 'No briefings yet',
    description: 'When your team publishes a briefing, it will show up here.',
    variant: 'default',
  },
  parameters: { docs: { source: src } },
}

export const Search: Story = {
  args: {
    title: 'No matches',
    description: 'Try a different keyword or clear filters.',
    variant: 'search',
  },
}

export const Error: Story = {
  args: {
    title: 'We could not load this list',
    description: 'Check your connection and refresh.',
    variant: 'error',
  },
}

export const WithAction: Story = {
  args: {
    title: 'Start a new intake',
    description: 'Create a record to coordinate mutual aid.',
    variant: 'default',
  },
  render: () => (
    <EmptyState
      title="Start a new intake"
      description="Create a record to coordinate mutual aid."
      variant="default"
      action={<Button label="New intake" type="default" />}
    />
  ),
}
