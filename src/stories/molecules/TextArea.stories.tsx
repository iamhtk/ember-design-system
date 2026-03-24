import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from '../../components/molecules/TextArea/TextArea'

const meta = {
  title: 'Molecules/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Multi-line text entry with optional character count and validation messaging.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: { type: 'number', min: 2, max: 12 } },
    maxLength: { control: { type: 'number' } },
    disabled: { control: 'boolean' },
    showCount: { control: 'boolean' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<TextArea label="Notes" placeholder="Details…" rows={4} />

// HTML + CSS
<div class="cwpc-textarea">…</div>

// Vue
<TextArea label="Notes" placeholder="Details…" :rows="4" />

// Angular
<cwpc-textarea label="Notes" placeholder="Details…" rows="4"></cwpc-textarea>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { label: 'Incident notes', placeholder: 'Describe conditions…', rows: 4 },
  parameters: { docs: { source: src } },
}

export const WithCount: Story = {
  args: {
    label: 'Public summary',
    rows: 3,
    maxLength: 120,
    showCount: true,
  },
}

export const Error: Story = {
  args: { label: 'Justification', error: 'Provide at least two sentences.', status: 'error', rows: 4 },
}

export const Disabled: Story = {
  args: { label: 'Locked', placeholder: 'Submitted', disabled: true, rows: 3 },
}
