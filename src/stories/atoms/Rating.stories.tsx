import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { fn } from '@storybook/test'
import { Rating } from '../../components/atoms/Rating/Rating'

const meta = {
  title: 'Atoms/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Star rating for reviews with optional interactivity and numeric readout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    max: { control: { type: 'number', min: 1, max: 10 } },
    readonly: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showValue: { control: 'boolean' },
    onChange: {
      action: 'changed',
      description: 'Called when the rating value changes (interactive mode)',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Rating value={4} max={5} readonly />

// HTML + CSS
<div class="cwpc-rating" role="group" aria-label="Rating">…</div>

// Vue
<Rating :value="4" :max="5" readonly />

// Angular
<cwpc-rating [value]="4" [max]="5" [readonly]="true"></cwpc-rating>`,
  language: 'tsx' as const,
}

export const Readonly: Story = {
  args: { value: 4, max: 5, readonly: true, size: 'md', onChange: fn() },
  parameters: { docs: { source: src } },
}

export const Interactive: Story = {
  render: function R(args) {
    const [v, setV] = useState(0)
    return (
      <Rating
        {...args}
        value={v}
        readonly={false}
        onChange={(next) => {
          args.onChange?.(next)
          setV(next)
        }}
      />
    )
  },
  args: { max: 5, size: 'md', onChange: fn() },
}

export const AllSizes: Story = {
  args: { value: 3, max: 5, readonly: true, size: 'md', onChange: fn() },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-600)' }}>
      <Rating value={3} readonly size="sm" />
      <Rating value={3} readonly size="md" />
      <Rating value={3} readonly size="lg" />
    </div>
  ),
}
