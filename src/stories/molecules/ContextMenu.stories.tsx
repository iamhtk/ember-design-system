import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../components/atoms/Button/Button'
import { ContextMenu } from '../../components/molecules/ContextMenu/ContextMenu'

const meta = {
  title: 'Molecules/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Contextual menu opened via right-click or trigger activation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    },
  },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<ContextMenu trigger={<button type="button">Menu</button>} items={items} />

// HTML + CSS
<div class="cwpc-context-menu">…</div>

// Vue
<ContextMenu :trigger="trigger" :items="items" />

// Angular
<cwpc-context-menu [trigger]="trigger" [items]="items"></cwpc-context-menu>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    position: 'bottom-left',
    trigger: <Button label="Open menu" type="outlined" />,
    items: [
      { label: 'Open', onClick: () => {} },
      { label: 'Rename', onClick: () => {} },
      { label: 'Archive', onClick: () => {} },
    ],
  },
  parameters: { docs: { source: src } },
}

export const WithIcons: Story = {
  args: {
    position: 'bottom-right',
    trigger: <Button label="Row actions" type="outlined" />,
    items: [
      { label: 'View', icon: <span aria-hidden>◎</span>, onClick: () => {} },
      { label: 'Edit', icon: <span aria-hidden>✎</span>, onClick: () => {} },
    ],
  },
}

export const WithDestructive: Story = {
  args: {
    position: 'bottom-left',
    trigger: <Button label="Actions" type="outlined" />,
    items: [
      { label: 'Duplicate', onClick: () => {} },
      { divider: true },
      { label: 'Delete', destructive: true, onClick: () => {} },
    ],
  },
}
