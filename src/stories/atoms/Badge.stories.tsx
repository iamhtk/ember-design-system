import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { Badge } from '../../components/atoms/Badge/Badge'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Badges communicate status, category, or counts at a glance. They are non-interactive labels used inline with other content. Semantic colors map to: primary #FF6701, success #65A637, warning #FFAC0D, error #FF270D, information #0D72FF (variant `info`), neutral #8D8D8D.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Badge text content' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Semantic color variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size (`sm` or `md` only — no `lg` on this component)',
    },
    dot: { control: 'boolean', description: 'Leading status dot' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { label: 'Primary', variant: 'primary' },
  parameters: {
    docs: { description: { story: 'Primary orange badge — #FF6701. Use for brand-colored labels.' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Primary')).toBeInTheDocument()
  },
}

export const Success: Story = {
  args: { label: 'Success', variant: 'success' },
  parameters: {
    docs: { description: { story: 'Success green badge — #65A637. Use for positive status.' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Success')).toBeInTheDocument()
  },
}

export const Warning: Story = {
  args: { label: 'Warning', variant: 'warning' },
  parameters: {
    docs: { description: { story: 'Warning amber badge — #FFAC0D. Use for caution states.' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Warning')).toBeInTheDocument()
  },
}

export const Error: Story = {
  args: { label: 'Error', variant: 'error' },
  parameters: {
    docs: { description: { story: 'Error red badge — #FF270D. Use for failure or critical status.' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Error')).toBeInTheDocument()
  },
}

export const Information: Story = {
  args: { label: 'Information', variant: 'info' },
  parameters: {
    docs: {
      description: { story: 'Information blue badge — #0D72FF. Use for neutral informational labels.' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Information')).toBeInTheDocument()
  },
}

export const Neutral: Story = {
  args: { label: 'Neutral', variant: 'neutral' },
  parameters: {
    docs: { description: { story: 'Neutral grey badge — #8D8D8D. Use for inactive or secondary labels.' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Neutral')).toBeInTheDocument()
  },
}

export const AllColors: Story = {
  args: { label: 'Primary', variant: 'primary' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-200)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge label="Primary" variant="primary" />
      <Badge label="Success" variant="success" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Error" variant="error" />
      <Badge label="Information" variant="info" />
      <Badge label="Neutral" variant="neutral" />
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

export const Sizes: Story = {
  args: { label: 'Medium', variant: 'primary', size: 'md' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-400)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge label="Small" variant="primary" size="sm" />
      <Badge label="Medium" variant="primary" size="md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge supports `sm` and `md` only.',
      },
    },
  },
}
