import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { StatCard } from '../../components/molecules/StatCard/StatCard'

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'KPI card. `variant`: primary (#FF6701), success (#65A637), info (#0D72FF), warning (#FFAC0D), error (#FF270D).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'info', 'warning', 'error'],
    },
    trend: {
      control: { type: 'select' },
      options: ['up', 'down', 'neutral'],
    },
    trendValue: { control: 'text' },
    icon: { control: false },
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

const cardWrap: Meta<typeof StatCard>['decorators'] = [
  (Story) => (
    <div style={{ width: 'min(100%, 320px)' }}>
      <Story />
    </div>
  ),
]

export const Primary: Story = {
  args: { value: '5,284', label: 'Active fuel-reduction projects', variant: 'primary' },
  decorators: cardWrap,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('5,284')).toBeInTheDocument()
  },
}

export const Success: Story = {
  args: { value: '94%', label: 'Communities with updated plans', variant: 'success' },
  decorators: cardWrap,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('94%')).toBeInTheDocument()
  },
}

export const Information: Story = {
  args: { value: '42', label: 'Cross-border drills this quarter', variant: 'info' },
  decorators: cardWrap,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('42')).toBeInTheDocument()
  },
}

export const Warning: Story = {
  args: { value: '12', label: 'Jurisdictions needing data refresh', variant: 'warning' },
  decorators: cardWrap,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('12')).toBeInTheDocument()
  },
}

export const ErrorStatCard: Story = {
  args: {
    value: '3',
    label: 'Open incidents requiring escalation',
    variant: 'error',
  },
  decorators: cardWrap,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('3')).toBeInTheDocument()
  },
}

export const AllVariants: Story = {
  args: { value: '0', label: 'Sample', variant: 'primary' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 280px))',
        gap: 'var(--space-400)',
        justifyContent: 'center',
      }}
    >
      <StatCard value="5,284" label="Primary KPI" variant="primary" />
      <StatCard value="94%" label="Success KPI" variant="success" />
      <StatCard value="42" label="Information KPI" variant="info" />
      <StatCard value="12" label="Warning KPI" variant="warning" />
      <StatCard value="3" label="Error KPI" variant="error" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('5,284')).toBeInTheDocument()
  },
}
