import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { Switch } from '../../components/molecules/Switch/Switch'

const meta = {
  title: 'Molecules/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Toggle control for binary settings with optional hint.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: {
      action: 'changed',
      description: 'Called when the switch is toggled',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Switch label="Enable alerts" />

// HTML + CSS
<div class="cwpc-switch">…</div>

// Vue
<Switch label="Enable alerts" />

// Angular
<cwpc-switch label="Enable alerts"></cwpc-switch>`,
  language: 'tsx' as const,
}

export const Off: Story = {
  args: { label: 'Push alerts for red-flag days', checked: false, onChange: fn() },
  parameters: { docs: { source: src } },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const sw = canvas.getByRole('switch')
    expect(sw).not.toBeChecked()
    await userEvent.click(sw)
    expect(sw).toBeChecked()
    await expect(args.onChange).toHaveBeenCalledWith(true)
  },
}

export const On: Story = {
  args: { label: 'Push alerts for red-flag days', checked: true, onChange: fn() },
}

export const DisabledOff: Story = {
  args: { label: 'Unavailable in region', disabled: true, checked: false, onChange: fn() },
}

export const DisabledOn: Story = {
  args: { label: 'Managed by admin', disabled: true, checked: true, onChange: fn() },
}
