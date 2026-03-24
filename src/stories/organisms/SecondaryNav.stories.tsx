import type { Meta, StoryObj } from '@storybook/react'
import { SecondaryNav } from '../../components/organisms/SecondaryNav/SecondaryNav'

const items = [
  { label: 'Overview', href: '#overview' },
  { label: 'Indicators', href: '#indicators' },
  { label: 'Methodology', href: '#methodology' },
]

const meta = {
  title: 'Organisms/SecondaryNav',
  component: SecondaryNav,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'darker' },
    docs: {
      description: {
        component: 'In-page section navigation below the primary header.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SecondaryNav>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<SecondaryNav items={items} activeHref="#methodology" />

// HTML + CSS
<div class="cwpc-secondary-nav">…</div>

// Vue
<SecondaryNav :items="items" />

// Angular
<cwpc-secondary-nav [items]="items"></cwpc-secondary-nav>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { items },
  parameters: { docs: { source: src } },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithActive: Story = {
  args: { items, activeHref: '#methodology' },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
}
