import type { Meta, StoryObj } from '@storybook/react'
import { ErrorPage } from '../../components/organisms/ErrorPage/ErrorPage'

const meta = {
  title: 'Organisms/ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'darker' },
    docs: {
      description: {
        component: 'Full-page error state with code, message, and return action.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'select', options: ['404', '500', '403'] },
  },
} satisfies Meta<typeof ErrorPage>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<ErrorPage code="404" description="The page may have moved." />

// HTML + CSS
<section class="cwpc-error-page">…</section>

// Vue
<ErrorPage code="404" />

// Angular
<cwpc-error-page code="404"></cwpc-error-page>`,
  language: 'tsx' as const,
}

export const NotFound404: Story = {
  args: {
    code: '404',
    description: 'The scorecard or article you requested is not available.',
    ctaLabel: 'Back to home',
    ctaHref: '#',
  },
  parameters: { docs: { source: src } },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
}

export const ServerError500: Story = {
  args: {
    code: '500',
    title: 'Service unavailable',
    description: 'Our team has been notified. Retry in a few minutes.',
    ctaLabel: 'Reload',
    onCtaClick: () => window.location.reload(),
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
}

export const Forbidden403: Story = {
  args: {
    code: '403',
    description: 'You do not have permission to view this workspace.',
    ctaLabel: 'Request access',
    ctaHref: '#',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
}
