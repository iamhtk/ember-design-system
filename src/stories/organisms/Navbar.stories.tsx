import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from '../../components/organisms/Navbar/Navbar'

const items = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Scorecard', href: '/scorecard', hasDropdown: true },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Contact', href: '/contact' },
]

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'darker' },
    docs: {
      description: {
        component: 'Primary site header with logo and navigation links.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Navbar items={items} activeHref="/scorecard" />

// HTML + CSS
<header class="cwpc-navbar">…</header>

// Vue
<Navbar :items="items" active-href="/scorecard" />

// Angular
<cwpc-navbar [items]="items" activeHref="/scorecard"></cwpc-navbar>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { items, activeHref: '/scorecard' },
  parameters: { docs: { source: src } },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
}
