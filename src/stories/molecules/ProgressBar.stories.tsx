import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { ProgressBar } from '../../components/molecules/ProgressBar/ProgressBar'

const meta = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Determinate progress. `variant`: primary (#FF6701), success (#65A637), warning (#FFAC0D), error (#FF270D), info (#0D72FF).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    label: { control: 'text' },
    showValue: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'info'],
    },
    animated: { control: 'boolean' },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

const narrow: Meta<typeof ProgressBar>['decorators'] = [
  (Story) => (
    <div style={{ width: 'min(100%, 400px)' }}>
      <Story />
    </div>
  ),
]

export const Primary: Story = {
  args: { value: 60, variant: 'primary', size: 'md', showValue: true, label: 'Primary' },
  decorators: narrow,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Primary')).toBeInTheDocument()
  },
}

export const Success: Story = {
  args: { value: 80, variant: 'success', size: 'md', showValue: true, label: 'Success' },
  decorators: narrow,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Success')).toBeInTheDocument()
  },
}

export const Warning: Story = {
  args: { value: 45, variant: 'warning', size: 'md', showValue: true, label: 'Warning' },
  decorators: narrow,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Warning')).toBeInTheDocument()
  },
}

export const Error: Story = {
  args: { value: 30, variant: 'error', size: 'md', showValue: true, label: 'Error' },
  decorators: narrow,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Error')).toBeInTheDocument()
  },
}

export const Information: Story = {
  args: { value: 70, variant: 'info', size: 'md', showValue: true, label: 'Information' },
  decorators: narrow,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Information')).toBeInTheDocument()
  },
}

export const AllVariants: Story = {
  args: { value: 50, variant: 'primary', size: 'md', showValue: true },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-400)',
        width: '400px',
      }}
    >
      <ProgressBar value={60} variant="primary" showValue label="Primary" />
      <ProgressBar value={80} variant="success" showValue label="Success" />
      <ProgressBar value={45} variant="warning" showValue label="Warning" />
      <ProgressBar value={30} variant="error" showValue label="Error" />
      <ProgressBar value={70} variant="info" showValue label="Information" />
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

export const WithLabel: Story = {
  args: { value: 65, label: 'Uploading imagery', variant: 'info', size: 'md', showValue: true },
  decorators: narrow,
}

export const Animated: Story = {
  args: { value: 55, variant: 'primary', animated: true, size: 'md', showValue: true },
  decorators: narrow,
}

export const Complete: Story = {
  args: { value: 100, variant: 'success', showValue: true, label: 'Complete' },
  decorators: narrow,
}

export const Empty: Story = {
  args: { value: 0, variant: 'primary', showValue: true, label: 'Not started' },
  decorators: narrow,
}
