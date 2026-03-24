import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { Input } from '../../components/molecules/Input/Input'

const meta = {
  title: 'Molecules/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Label, field, and hint or error messaging for single-line form entry.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password'] },
    status: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'error', 'disabled'],
    },
    required: { control: 'boolean' },
    hint: { control: 'text' },
    error: { control: 'text' },
    onChange: {
      action: 'changed',
      description: 'Called when the input value changes',
      table: { category: 'Events' },
    },
    onFocus: {
      action: 'focused',
      description: 'Called when the input receives focus',
      table: { category: 'Events' },
    },
    onBlur: {
      action: 'blurred',
      description: 'Called when the input loses focus',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Input label="Name" placeholder="Jane Doe" />

// HTML + CSS
<div class="cwpc-input">…</div>

// Vue
<Input label="Name" placeholder="Jane Doe" />

// Angular
<cwpc-input label="Name" placeholder="Jane Doe"></cwpc-input>`,
  language: 'tsx' as const,
}

const fieldEvents = { onChange: fn(), onFocus: fn(), onBlur: fn() }

export const Default: Story = {
  args: {
    label: 'Organization',
    placeholder: 'CWPC Partner',
    ...fieldEvents,
  },
  parameters: { docs: { source: src } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.type(input, 'test@cwpc.org')
    expect(input).toHaveValue('test@cwpc.org')
  },
}

export const Email: Story = {
  args: { label: 'Work email', placeholder: 'you@agency.gov', type: 'email', ...fieldEvents },
}

export const Password: Story = {
  args: { label: 'Password', placeholder: '••••••••', type: 'password', ...fieldEvents },
}

export const Error: Story = {
  args: {
    label: 'Email',
    type: 'email',
    error: 'Enter a valid email address.',
    status: 'error',
    ...fieldEvents,
  },
}

export const Disabled: Story = {
  args: { label: 'Read-only', placeholder: 'Locked', status: 'disabled', ...fieldEvents },
}

export const Required: Story = {
  args: {
    label: 'Incident ID',
    required: true,
    showHintIcon: true,
    hint: 'From your intake form.',
    ...fieldEvents,
  },
}
