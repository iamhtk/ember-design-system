import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, waitFor, within } from '@storybook/test'
import { Alert } from '../../components/organisms/Alert/Alert'

const meta = {
  title: 'Organisms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Inline alert. `variant`: success (#65A637), error (#FF270D), warning (#FFAC0D), info (#0D72FF). No primary or neutral variant.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    title: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    dismissible: { control: 'boolean' },
    onDismiss: {
      action: 'dismissed',
      description: 'Called when the user clicks the dismiss/close button',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

const narrow: Meta<typeof Alert>['decorators'] = [
  (Story) => (
    <div style={{ width: 'min(100%, 480px)' }}>
      <Story />
    </div>
  ),
]

export const Success: Story = {
  args: { variant: 'success', title: 'Saved', message: 'Your draft was updated.' },
  decorators: narrow,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Your draft was updated.')).toBeInTheDocument()
  },
}

export const Error: Story = {
  args: { variant: 'error', title: 'Upload failed', message: 'Try a smaller PDF.' },
  decorators: narrow,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Try a smaller PDF.')).toBeInTheDocument()
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Review',
    message: 'Two indicators are out of range.',
  },
  decorators: narrow,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Two indicators are out of range.')).toBeInTheDocument()
  },
}

export const Information: Story = {
  args: { variant: 'info', message: 'Maintenance scheduled tonight.' },
  decorators: narrow,
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Maintenance scheduled tonight.')).toBeInTheDocument()
  },
}

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Tip',
    message: 'Export this table as CSV from the actions menu.',
    dismissible: true,
    onDismiss: fn(),
  },
  decorators: narrow,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const closeBtn = canvas.getByRole('button', { name: /dismiss alert/i })
    await userEvent.click(closeBtn)
    await waitFor(() => expect(args.onDismiss).toHaveBeenCalled())
  },
}

export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Policy update',
    message: 'Partners must acknowledge the new data retention addendum by Friday.',
  },
  decorators: narrow,
}

export const AllVariants: Story = {
  args: { variant: 'info', message: 'Sample' },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-300)',
        width: '100%',
        maxWidth: '480px',
      }}
    >
      <Alert variant="success" title="Success" message="Operation completed." />
      <Alert variant="error" title="Error" message="Something went wrong." />
      <Alert variant="warning" title="Warning" message="Please review before continuing." />
      <Alert variant="info" title="Information" message="Here is contextual information." />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Operation completed.')).toBeInTheDocument()
  },
}
