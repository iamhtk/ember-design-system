import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup } from '../../components/molecules/ButtonGroup/ButtonGroup'

const items = [{ label: 'List' }, { label: 'Map' }, { label: 'Timeline' }]

const meta = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Segmented actions sharing a single selection state across items.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    connected: { control: 'boolean' },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<ButtonGroup items={items} connected />

// HTML + CSS
<div class="cwpc-button-group" role="group">…</div>

// Vue
<ButtonGroup :items="items" connected />

// Angular
<cwpc-button-group [items]="items" [connected]="true"></cwpc-button-group>`,
  language: 'tsx' as const,
}

export const Connected: Story = {
  args: { items, connected: true },
  parameters: { docs: { source: src } },
}

export const Separated: Story = {
  args: { items, connected: false },
}
