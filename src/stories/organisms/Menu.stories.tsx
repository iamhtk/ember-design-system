import type { Meta, StoryObj } from '@storybook/react'
import { Menu } from '../../components/organisms/Menu/Menu'
import { MenuItem } from '../../components/organisms/Menu/MenuItem'

const meta = {
  title: 'Organisms/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'card' },
    docs: {
      description: {
        component: 'Vertical list of actions or navigation links with optional icons and badges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact'] },
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Menu>
  <MenuItem label="Dashboard" href="/" active />
  <MenuItem label="Settings" href="/settings" />
</Menu>

// HTML + CSS
<div class="cwpc-menu">…</div>

// Vue
<Menu><MenuItem label="Home" href="/" /></Menu>

// Angular
<cwpc-menu><cwpc-menu-item label="Home" href="/"></cwpc-menu-item></cwpc-menu>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuItem label="Scorecard overview" href="#overview" active />
        <MenuItem label="Indicators" href="#indicators" />
        <MenuItem label="Methodology" href="#methodology" />
        <MenuItem label="Export" href="#export" badge="New" />
      </>
    ),
  },
  parameters: { docs: { source: src } },
}

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <MenuItem label="Home" href="/" iconLeft={<span aria-hidden>⌂</span>} />
        <MenuItem
          label="Alerts"
          href="/alerts"
          iconLeft={<span aria-hidden>!</span>}
          badge={3}
        />
        <MenuItem label="Profile" href="/profile" iconLeft={<span aria-hidden>◎</span>} />
      </>
    ),
  },
}

export const Compact: Story = {
  args: {
    variant: 'compact',
    children: (
      <>
        <MenuItem label="Edit" onClick={() => {}} />
        <MenuItem label="Duplicate" onClick={() => {}} />
        <MenuItem label="Archive" disabled />
      </>
    ),
  },
}
