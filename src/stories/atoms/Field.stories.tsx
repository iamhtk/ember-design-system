import type { Meta, StoryObj } from '@storybook/react'
import { Field } from '../../components/atoms/Field/Field'

const meta = {
  title: 'Atoms/Field',
  component: Field,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Single-line input shell with status-driven hover, focus, error, and disabled styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    status: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'error', 'disabled'],
    },
    value: { control: 'text' },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Field placeholder="Type here…" status="default" />

// HTML + CSS
<div class="cwpc-field"><input /></div>

// Vue
<Field placeholder="Type here…" status="default" />

// Angular
<cwpc-field placeholder="Type here…" status="default"></cwpc-field>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { placeholder: 'Type here…', status: 'default' },
  parameters: { docs: { source: src } },
}

export const Focus: Story = {
  args: { placeholder: 'Focused', status: 'focus', value: 'CWPC' },
}

export const Error: Story = {
  args: { placeholder: 'Error', status: 'error', value: 'invalid' },
}

export const Disabled: Story = {
  args: { placeholder: 'Disabled', status: 'disabled' },
}
