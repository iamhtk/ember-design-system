import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { NotificationBar } from '../../components/molecules/NotificationBar/NotificationBar'

const meta = {
  title: 'Molecules/NotificationBar',
  component: NotificationBar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Top announcement strip. `variant`: primary (#FF6701), success (#65A637), warning (#FFAC0D), error (#FF270D), info (#0D72FF). No neutral variant.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'info', 'error'],
    },
    dismissible: { control: 'boolean' },
    onDismiss: {
      action: 'dismissed',
      description: 'Called when the user dismisses the bar',
      table: { category: 'Events' },
    },
    action: { control: false },
    link: { control: false },
  },
} satisfies Meta<typeof NotificationBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    message: 'Maintenance Sunday 02:00–04:00 UTC — brief delays possible.',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    expect(
      within(canvasElement).getByText(/Maintenance Sunday/i),
    ).toBeInTheDocument()
  },
}

export const Success: Story = {
  args: { message: 'Your submission was received.', variant: 'success' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Your submission was received.')).toBeInTheDocument()
  },
}

export const Warning: Story = {
  args: { message: 'Elevated fire weather in Region 4.', variant: 'warning' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText(/Elevated fire weather/i)).toBeInTheDocument()
  },
}

export const Error: Story = {
  args: { message: 'Sync failed for two jurisdictions.', variant: 'error' },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Sync failed for two jurisdictions.')).toBeInTheDocument()
  },
}

export const Information: Story = {
  args: {
    message: 'Methodology v2.1 is available — review before your next submission.',
    variant: 'info',
  },
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText(/Methodology v2.1/i)).toBeInTheDocument()
  },
}

export const Dismissible: Story = {
  args: {
    message: 'New policy brief available for partner review.',
    variant: 'info',
    dismissible: true,
    onDismiss: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const closeBtn = canvas.getByRole('button', { name: /dismiss announcement/i })
    await userEvent.click(closeBtn)
    await expect(args.onDismiss).toHaveBeenCalled()
  },
}

export const AllVariants: Story = {
  args: { message: 'Sample', variant: 'primary' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <NotificationBar message="Primary — scheduled maintenance window." variant="primary" />
      <NotificationBar message="Success — profile saved." variant="success" />
      <NotificationBar message="Warning — elevated risk in Region 4." variant="warning" />
      <NotificationBar message="Error — sync failed." variant="error" />
      <NotificationBar message="Information — new docs published." variant="info" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Primary — scheduled/i)).toBeInTheDocument()
    expect(canvas.getByText(/Success — profile/i)).toBeInTheDocument()
  },
}
