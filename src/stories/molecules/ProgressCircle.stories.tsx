import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { ProgressCircle } from '../../components/molecules/ProgressCircle/ProgressCircle'

const meta = {
  title: 'Molecules/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Radial progress. `variant`: primary (#FF6701), success (#65A637), warning (#FFAC0D), error (#FF270D), info (#0D72FF).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'info'],
    },
    animated: { control: 'boolean' },
    showValue: { control: 'boolean' },
  },
} satisfies Meta<typeof ProgressCircle>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { value: 60, variant: 'primary', size: 'md', showValue: true },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('progressbar')).toBeInTheDocument()
  },
}

export const Success: Story = {
  args: { value: 80, variant: 'success', size: 'md', showValue: true },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('progressbar')).toBeInTheDocument()
  },
}

export const Warning: Story = {
  args: { value: 45, variant: 'warning', size: 'md', showValue: true },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('progressbar')).toBeInTheDocument()
  },
}

export const Error: Story = {
  args: { value: 30, variant: 'error', size: 'md', showValue: true },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('progressbar')).toBeInTheDocument()
  },
}

export const Information: Story = {
  args: { value: 70, variant: 'info', size: 'md', showValue: true },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('progressbar')).toBeInTheDocument()
  },
}

export const AllColors: Story = {
  args: { value: 50, variant: 'primary', size: 'sm', showValue: true },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-600)', flexWrap: 'wrap', alignItems: 'center' }}>
      <ProgressCircle value={60} variant="primary" size="sm" />
      <ProgressCircle value={80} variant="success" size="sm" />
      <ProgressCircle value={45} variant="warning" size="sm" />
      <ProgressCircle value={30} variant="error" size="sm" />
      <ProgressCircle value={70} variant="info" size="sm" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getAllByRole('progressbar').length).toBeGreaterThanOrEqual(5)
  },
}

export const AllSizes: Story = {
  args: { value: 55, variant: 'primary', size: 'md' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-600)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <ProgressCircle value={55} variant="primary" size="sm" />
      <ProgressCircle value={55} variant="primary" size="md" />
      <ProgressCircle value={55} variant="primary" size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getAllByRole('progressbar').length).toBeGreaterThanOrEqual(3)
  },
}
