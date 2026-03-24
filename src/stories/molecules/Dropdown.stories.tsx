import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { Dropdown } from '../../components/molecules/Dropdown/Dropdown'

const options = [
  { label: 'California', value: 'ca' },
  { label: 'Nevada', value: 'nv' },
  { label: 'Oregon', value: 'or' },
]

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Custom listbox select with optional label, hint, and error text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    onChange: {
      action: 'changed',
      description: 'Called with the selected option value',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Dropdown options={opts} label="State" placeholder="Select…" />

// HTML + CSS
<div class="cwpc-dropdown">…</div>

// Vue
<Dropdown :options="opts" label="State" />

// Angular
<cwpc-dropdown [options]="opts" label="State"></cwpc-dropdown>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { options, label: 'Jurisdiction', placeholder: 'Select a state…', onChange: fn() },
  parameters: { docs: { source: src } },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /jurisdiction/i })
    await userEvent.click(trigger)
    const ca = canvas.getByRole('option', { name: 'California' })
    await userEvent.click(ca)
    await expect(args.onChange).toHaveBeenCalledWith('ca')
  },
}

export const WithSelection: Story = {
  render: function R(args) {
    const [v, setV] = useState('nv')
    return (
      <Dropdown
        {...args}
        value={v}
        onChange={(next) => {
          args.onChange?.(next)
          setV(next)
        }}
      />
    )
  },
  args: { options, label: 'Region', placeholder: 'Select…', onChange: fn() },
}

export const Error: Story = {
  args: {
    options,
    label: 'Unit',
    error: 'Choose a region.',
    placeholder: 'Select…',
    onChange: fn(),
  },
}

export const Disabled: Story = {
  args: { options, label: 'Locked', disabled: true, placeholder: 'Nevada', onChange: fn() },
}
