import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { Loader } from '../../components/atoms/Loader/Loader'

const meta = {
  title: 'Atoms/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Spinner for indeterminate loading. `variant`: `primary`, `success`, `info`, `warning` (#FFAC0D), `error` (#FF270D).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'info', 'warning', 'error'],
    },
    label: { control: 'text', description: 'Visually hidden accessible label' },
  },
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { size: 'md', variant: 'primary', label: 'Loading' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('status')).toBeInTheDocument()
  },
}

export const Success: Story = {
  args: { size: 'md', variant: 'success', label: 'Loading' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('status')).toBeInTheDocument()
  },
}

export const Information: Story = {
  args: { size: 'md', variant: 'info', label: 'Loading' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('status')).toBeInTheDocument()
  },
}

export const WarningLoader: Story = {
  args: { size: 'md', variant: 'warning', label: 'Loading' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('status')).toBeInTheDocument()
  },
}

export const ErrorLoader: Story = {
  args: { size: 'md', variant: 'error', label: 'Loading' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('status')).toBeInTheDocument()
  },
}

export const Small: Story = {
  args: { size: 'sm', variant: 'primary' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('status')).toBeInTheDocument()
  },
}

export const Medium: Story = {
  args: { size: 'md', variant: 'primary' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('status')).toBeInTheDocument()
  },
}

export const Large: Story = {
  args: { size: 'lg', variant: 'primary' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('status')).toBeInTheDocument()
  },
}

export const AllColors: Story = {
  args: { size: 'md', variant: 'primary', label: 'Loading' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-600)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Loader variant="primary" label="Loading primary" />
      <Loader variant="success" label="Loading success" />
      <Loader variant="info" label="Loading information" />
      <Loader variant="warning" label="Loading warning" />
      <Loader variant="error" label="Loading error" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getAllByRole('status').length).toBeGreaterThanOrEqual(5)
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-600)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Loader size="sm" variant="primary" label="Small" />
      <Loader size="md" variant="primary" label="Medium" />
      <Loader size="lg" variant="primary" label="Large" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getAllByRole('status').length).toBeGreaterThanOrEqual(3)
  },
}
