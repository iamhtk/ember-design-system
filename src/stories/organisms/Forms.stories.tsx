import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { Forms } from '../../components/organisms/Forms/Forms'

const meta = {
  title: 'Organisms/Forms',
  component: Forms,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'darker' },
    docs: {
      description: {
        component: 'Card-wrapped form with inputs, optional checkboxes, and actions.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Forms>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Forms title="Sign up" fields={[…]} primaryButtonLabel="Submit" />

// HTML + CSS
<div class="cwpc-forms">…</div>

// Vue
<Forms title="Sign up" :fields="fields" />

// Angular
<cwpc-forms title="Sign up" [fields]="fields"></cwpc-forms>`,
  language: 'tsx' as const,
}

const pad = [
  (Story: () => ReactNode) => (
    <div
      style={{
        minHeight: '100vh',
        padding: 'var(--space-800)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Story />
    </div>
  ),
]

export const DownloadScorecard: Story = {
  args: {
    title: 'Download the scorecard',
    description: 'We will email a secure link to the latest workbook.',
    fields: [
      {
        label: 'Full name',
        type: 'text',
        required: true,
        hint: 'As on the agreement.',
        iconType: 'default',
      },
      { label: 'Work email', type: 'email', required: true, iconType: 'email' },
      { label: 'Organization', type: 'text' },
    ],
    checkboxLabels: ['I agree to the data use policy', 'Send quarterly updates'],
    primaryButtonLabel: 'Email me the PDF',
    secondaryButtonLabel: 'Cancel',
    footerText: 'Questions?',
    footerLinkText: 'Contact support',
  },
  parameters: { docs: { source: src } },
  decorators: pad,
}

export const Subscribe: Story = {
  args: {
    title: 'Subscribe to the digest',
    description: 'Weekly outlooks, grant windows, and training invites.',
    fields: [{ label: 'Email', type: 'email', required: true, iconType: 'email' }],
    primaryButtonLabel: 'Subscribe',
    secondaryButtonLabel: 'Maybe later',
  },
  decorators: pad,
}
