import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../../components/atoms/Text/Text'
import { Card } from '../../components/organisms/Card/Card'

const meta = {
  title: 'Organisms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Dark content container with optional title, media, and footer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    titleColor: { control: 'select', options: ['primary', 'information'] },
    variant: { control: 'select', options: ['default', 'highlighted'] },
    imageSrc: { control: 'text' },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Card title="Briefing" titleColor="primary">Content</Card>

// HTML + CSS
<div class="cwpc-card">…</div>

// Vue
<Card title="Briefing">Content</Card>

// Angular
<cwpc-card title="Briefing">Content</cwpc-card>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    title: 'CWPC partner briefing',
    titleColor: 'primary',
    width: '400px',
    children: (
      <Text variant="body-md" color="default">
        Review the latest fuel-treatment milestones.
      </Text>
    ),
  },
  parameters: { docs: { source: src } },
}

export const Highlighted: Story = {
  args: {
    title: 'Priority weekend',
    titleColor: 'information',
    variant: 'highlighted',
    width: '400px',
    children: (
      <Text variant="body-sm" color="caption">
        Pre-position crews before Saturday 18:00 local.
      </Text>
    ),
  },
}

export const WithImage: Story = {
  args: {
    title: 'Field imagery',
    imageSrc: 'https://picsum.photos/id/1018/640/360',
    imageAlt: 'Forest',
    width: '400px',
    children: (
      <Text variant="body-sm" color="default">
        Aerial survey from the fuel-break corridor.
      </Text>
    ),
  },
}
