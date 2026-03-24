import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from '../../components/organisms/Footer/Footer'

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'darker' },
    docs: {
      description: {
        component: 'Multi-column footer with links, social icons, and subscribe action.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Footer />

// HTML + CSS
<footer class="cwpc-footer">…</footer>

// Vue
<Footer />

// Angular
<cwpc-footer></cwpc-footer>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {},
  parameters: { docs: { source: src } },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }} />
        <Story />
      </div>
    ),
  ],
}
