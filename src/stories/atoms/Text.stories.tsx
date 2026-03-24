import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../../components/atoms/Text/Text'

const sample =
  'CWPC coordinates research and tools to reduce catastrophic wildfire risk across communities.'

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Body, caption, and label text styles with semantic color options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body-xl', 'body-lg', 'body-md', 'body-sm', 'body-xs', 'caption', 'label'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'caption',
        'placeholder',
        'primary',
        'success',
        'error',
        'warning',
        'info',
        'disabled',
      ],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Text variant="body-md">Hello world</Text>

// HTML + CSS
<p class="cwpc-text">Hello world</p>

// Vue
<Text variant="body-md">Hello world</Text>

// Angular
<cwpc-text variant="body-md">Hello world</cwpc-text>`,
  language: 'tsx' as const,
}

export const BodyXL: Story = {
  args: { variant: 'body-xl', children: sample },
  parameters: { docs: { source: src } },
}

export const BodyLG: Story = { args: { variant: 'body-lg', children: sample } }
export const BodyMD: Story = { args: { variant: 'body-md', children: sample } }
export const BodySM: Story = { args: { variant: 'body-sm', children: sample } }
export const BodyXS: Story = { args: { variant: 'body-xs', children: sample } }

export const SemanticColors: Story = {
  args: { variant: 'body-md', children: sample, color: 'default' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-300)', maxWidth: '36rem' }}>
      <Text variant="body-md" color="default">
        Default body
      </Text>
      <Text variant="body-md" color="primary">
        Primary accent
      </Text>
      <Text variant="body-md" color="success">
        Success message
      </Text>
      <Text variant="body-md" color="error">
        Error message
      </Text>
      <Text variant="body-md" color="warning">
        Warning message
      </Text>
      <Text variant="body-md" color="info">
        Informational text
      </Text>
      <Text variant="body-sm" color="caption">
        Caption tone
      </Text>
      <Text variant="body-sm" color="disabled">
        Disabled tone
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common `color` values for body text.',
      },
    },
  },
}
