import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { MapPin } from '../../components/atoms/MapPin/MapPin'

const meta = {
  title: 'Atoms/MapPin',
  component: MapPin,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Map marker. `color` values: primary (#FF6701), success (#65A637), warning (#FFAC0D), error (#FF270D), info (#0D72FF). No neutral variant.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'success', 'error', 'info', 'warning'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    active: { control: 'boolean' },
    onClick: { control: false },
  },
} satisfies Meta<typeof MapPin>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { color: 'primary', size: 'md', label: 'Primary', onClick: fn() },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Primary')).toBeInTheDocument()
  },
}

export const Success: Story = {
  args: { color: 'success', size: 'md', label: 'Success', onClick: fn() },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Success')).toBeInTheDocument()
  },
}

export const Warning: Story = {
  args: { color: 'warning', size: 'md', label: 'Warning', onClick: fn() },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Warning')).toBeInTheDocument()
  },
}

export const Error: Story = {
  args: { color: 'error', size: 'md', label: 'Error', onClick: fn() },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Error')).toBeInTheDocument()
  },
}

export const Information: Story = {
  args: { color: 'info', size: 'md', label: 'Information', onClick: fn() },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Information')).toBeInTheDocument()
  },
}

export const Active: Story = {
  args: { color: 'primary', size: 'md', active: true, onClick: fn(), label: 'Site A' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole('button', { name: /site a/i })
    await userEvent.hover(btn)
    await userEvent.click(btn)
    await expect(args.onClick).toHaveBeenCalled()
  },
}

export const AllColors: Story = {
  args: { onClick: fn() },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-600)',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
      }}
    >
      <MapPin {...args} color="primary" size="md" label="Primary" />
      <MapPin {...args} color="success" size="md" label="Success" />
      <MapPin {...args} color="warning" size="md" label="Warning" />
      <MapPin {...args} color="error" size="md" label="Error" />
      <MapPin {...args} color="info" size="md" label="Information" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Primary')).toBeInTheDocument()
    expect(canvas.getByText('Success')).toBeInTheDocument()
    expect(canvas.getByText('Warning')).toBeInTheDocument()
    expect(canvas.getByText('Error')).toBeInTheDocument()
    expect(canvas.getByText('Information')).toBeInTheDocument()
  },
}
