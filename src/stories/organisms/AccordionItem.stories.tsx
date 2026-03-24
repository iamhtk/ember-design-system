import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { AccordionItem } from '../../components/organisms/AccordionItem/AccordionItem'

const meta = {
  title: 'Organisms/AccordionItem',
  component: AccordionItem,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Expandable disclosure row for FAQs and scorecard sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    defaultOpen: { control: 'boolean' },
  },
} satisfies Meta<typeof AccordionItem>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<AccordionItem title="Question" body="Answer text." />

// HTML + CSS
<div class="cwpc-accordion-item">…</div>

// Vue
<AccordionItem title="Question" body="Answer." />

// Angular
<cwpc-accordion-item title="Question" body="Answer."></cwpc-accordion-item>`,
  language: 'tsx' as const,
}

const w = [
  (Story: () => ReactNode) => (
    <div style={{ width: 'min(100%, 480px)' }}>
      <Story />
    </div>
  ),
]

export const Collapsed: Story = {
  args: {
    title: 'How is the scorecard weighted?',
    body: 'Indicators combine fuels, weather exposure, and preparedness signals.',
    defaultOpen: false,
  },
  parameters: { docs: { source: src } },
  decorators: w,
}

export const Expanded: Story = {
  args: {
    title: 'Who can submit updates?',
    body: 'Authorized liaisons after onboarding.',
    defaultOpen: true,
  },
  decorators: w,
}

export const Group: Story = {
  args: {
    title: 'Group',
    body: 'Body',
  },
  render: () => (
    <div
      style={{
        width: 'min(100%, 480px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-400)',
      }}
    >
      <AccordionItem title="Data freshness" body="Most layers refresh nightly." />
      <AccordionItem title="Attribution" body="USFS, state forestry, municipal feeds." />
    </div>
  ),
}
