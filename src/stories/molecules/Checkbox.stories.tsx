import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { Checkbox } from '../../components/molecules/Checkbox/Checkbox'

const meta = {
  title: 'Molecules/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Boolean choice with optional hint and error messaging.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    hint: { control: 'text' },
    onChange: {
      action: 'changed',
      description: 'Called when the checked state changes',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Checkbox label="I agree" />

// HTML + CSS
<div class="cwpc-checkbox">…</div>

// Vue
<Checkbox label="I agree" />

// Angular
<cwpc-checkbox label="I agree"></cwpc-checkbox>`,
  language: 'tsx' as const,
}

export const Unchecked: Story = {
  args: { label: 'I agree to the data use policy', defaultChecked: false, onChange: fn() },
  parameters: { docs: { source: src } },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const box = canvas.getByRole('checkbox')
    expect(box).not.toBeChecked()
    await userEvent.click(box)
    expect(box).toBeChecked()
    await expect(args.onChange).toHaveBeenCalledWith(true)
  },
}

export const Checked: Story = {
  args: { label: 'Subscribe to briefings', checked: true, onChange: fn() },
}

export const Disabled: Story = {
  args: { label: 'Unavailable', disabled: true, onChange: fn() },
}

export const WithHint: Story = {
  args: {
    label: 'Share anonymized telemetry',
    hint: 'Helps improve early-warning models.',
    onChange: fn(),
  },
}
