import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { Tag } from '../../components/atoms/Tag/Tag'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Tags are compact labels, optionally removable. `variant` controls semantic color: default (subtle primary), primary, success, warning, error, info, neutral.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Tag text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Visual variant',
    },
    disabled: { control: 'boolean', description: 'Disabled state' },
    onRemove: {
      action: 'removed',
      description: 'Called when the remove control is activated',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { label: 'Primary', variant: 'primary' },
  parameters: {
    docs: { description: { story: 'Primary orange tag — #FF6701. Use for brand-colored labels.' } },
  },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Primary')).toBeInTheDocument()
  },
}

export const Success: Story = {
  args: { label: 'Success', variant: 'success' },
  parameters: {
    docs: { description: { story: 'Success green tag — #65A637. Use for positive status.' } },
  },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Success')).toBeInTheDocument()
  },
}

export const Warning: Story = {
  args: { label: 'Warning', variant: 'warning' },
  parameters: {
    docs: { description: { story: 'Warning amber tag — #FFAC0D. Use for caution states.' } },
  },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Warning')).toBeInTheDocument()
  },
}

export const Error: Story = {
  args: { label: 'Error', variant: 'error' },
  parameters: {
    docs: { description: { story: 'Error red tag — #FF270D. Use for failure or critical status.' } },
  },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Error')).toBeInTheDocument()
  },
}

export const Information: Story = {
  args: { label: 'Information', variant: 'info' },
  parameters: {
    docs: {
      description: { story: 'Information blue tag — #0D72FF. Use for neutral informational labels.' },
    },
  },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Information')).toBeInTheDocument()
  },
}

export const Neutral: Story = {
  args: { label: 'Neutral', variant: 'neutral' },
  parameters: {
    docs: { description: { story: 'Neutral grey tag — #8D8D8D. Use for inactive or secondary labels.' } },
  },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Neutral')).toBeInTheDocument()
  },
}

export const Default: Story = {
  args: { label: 'Default tone', variant: 'default' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Default tone')).toBeInTheDocument()
  },
}

export const WithRemove: Story = {
  args: { label: 'Removable', variant: 'primary', onRemove: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const removeBtn = canvas.getByRole('button', { name: /remove removable/i })
    await userEvent.click(removeBtn)
    await expect(args.onRemove).toHaveBeenCalled()
  },
}

export const Disabled: Story = {
  args: { label: 'Disabled', variant: 'default', disabled: true, onRemove: fn() },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Disabled')).toBeInTheDocument()
  },
}

export const AllColors: Story = {
  args: { label: 'Primary', variant: 'primary' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-200)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Tag label="Primary" variant="primary" />
      <Tag label="Success" variant="success" />
      <Tag label="Warning" variant="warning" />
      <Tag label="Error" variant="error" />
      <Tag label="Information" variant="info" />
      <Tag label="Neutral" variant="neutral" />
    </div>
  ),
  parameters: { docs: { description: { story: 'All 6 semantic color variants side by side.' } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Primary')).toBeInTheDocument()
    expect(canvas.getByText('Success')).toBeInTheDocument()
    expect(canvas.getByText('Warning')).toBeInTheDocument()
    expect(canvas.getByText('Error')).toBeInTheDocument()
    expect(canvas.getByText('Information')).toBeInTheDocument()
    expect(canvas.getByText('Neutral')).toBeInTheDocument()
  },
}
