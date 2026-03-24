import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../components/atoms/Button/Button'
import { Text } from '../../components/atoms/Text/Text'
import { Popover } from '../../components/molecules/Popover/Popover'

const meta = {
  title: 'Molecules/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Floating surface anchored to a trigger for lightweight overlays.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    title: { control: 'text' },
    width: { control: 'text' },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Popover trigger={<button type="button">Open</button>} position="bottom">
  Content
</Popover>

// HTML + CSS
<div class="cwpc-popover">…</div>

// Vue
<Popover :trigger="trigger" position="bottom">Content</Popover>

// Angular
<cwpc-popover [trigger]="trigger" position="bottom">Content</cwpc-popover>`,
  language: 'tsx' as const,
}

export const Top: Story = {
  args: {
    position: 'top',
    trigger: <Button label="Anchor" type="outlined" />,
    children: (
      <Text variant="body-sm" color="default">
        Help appears above the trigger.
      </Text>
    ),
  },
  parameters: { docs: { source: src } },
}

export const Bottom: Story = {
  args: {
    position: 'bottom',
    trigger: <Button label="Anchor" type="outlined" />,
    children: (
      <Text variant="body-sm" color="default">
        Content opens below.
      </Text>
    ),
  },
}

export const WithTitle: Story = {
  args: {
    position: 'bottom',
    title: 'CWPC digest',
    width: '280px',
    trigger: <Button label="Details" type="outlined" />,
    children: (
      <Text variant="body-sm" color="default">
        Weekly summaries and resource availability.
      </Text>
    ),
  },
}
