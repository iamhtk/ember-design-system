import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { RadioButton } from '../../components/molecules/RadioButton/RadioButton'

const meta = {
  title: 'Molecules/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Single option in a radio group with optional hint text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    onChange: {
      action: 'changed',
      description: 'Called with this option’s value when selected',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<RadioButton label="Federal" value="fed" name="type" />

// HTML + CSS
<label class="cwpc-radio">…</label>

// Vue
<RadioButton label="Federal" value="fed" name="type" />

// Angular
<cwpc-radio-button label="Federal" value="fed" name="type"></cwpc-radio-button>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    label: 'Federal partner',
    value: 'federal',
    name: 'partner',
    checked: false,
    onChange: fn(),
  },
  parameters: { docs: { source: src } },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole('radio')
    await userEvent.click(radio)
    await expect(args.onChange).toHaveBeenCalledWith('federal')
  },
}

export const Selected: Story = {
  args: {
    label: 'State agency',
    value: 'state',
    name: 'partner',
    checked: true,
    onChange: fn(),
  },
}

export const Disabled: Story = {
  args: { label: 'Legacy', value: 'legacy', name: 'partner', disabled: true, onChange: fn() },
}
