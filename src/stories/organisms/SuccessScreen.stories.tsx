import type { Meta, StoryObj } from '@storybook/react'
import { SuccessScreen } from '../../components/organisms/SuccessScreen/SuccessScreen'

const meta = {
  title: 'Organisms/SuccessScreen',
  component: SuccessScreen,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'darker' },
    docs: {
      description: {
        component: 'Confirmation screen after successful submission or onboarding.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SuccessScreen>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<SuccessScreen title="You are registered" ctaLabel="Continue" />

// HTML + CSS
<section class="cwpc-success-screen">…</section>

// Vue
<SuccessScreen title="You are registered" />

// Angular
<cwpc-success-screen title="You are registered"></cwpc-success-screen>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    title: 'Submission received',
    description: 'We will email you when the next review window opens.',
    ctaLabel: 'Return to dashboard',
    onCtaClick: () => {},
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

export const WithSecondaryCTA: Story = {
  args: {
    title: 'Profile updated',
    description: 'Your notification preferences were saved.',
    ctaLabel: 'View profile',
    onCtaClick: () => {},
    secondaryCtaLabel: 'Download summary',
    onSecondaryCtaClick: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
}
