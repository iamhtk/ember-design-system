import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from '../../components/atoms/Divider/Divider'

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Separates sections horizontally or vertically with optional label.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    label: { control: 'text' },
    variant: { control: 'select', options: ['default', 'subtle', 'strong'] },
    spacing: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Divider orientation="horizontal" />

// HTML + CSS
<hr class="cwpc-divider" />

// Vue
<Divider orientation="horizontal" />

// Angular
<cwpc-divider orientation="horizontal"></cwpc-divider>`,
  language: 'tsx' as const,
}

export const Horizontal: Story = {
  args: { orientation: 'horizontal', variant: 'default' },
  parameters: { docs: { source: src } },
  decorators: [
    (S) => (
      <div style={{ width: 'min(100%, 360px)' }}>
        <S />
      </div>
    ),
  ],
}

export const WithLabel: Story = {
  args: { orientation: 'horizontal', label: 'Or', variant: 'default' },
  decorators: [
    (S) => (
      <div style={{ width: 'min(100%, 360px)' }}>
        <S />
      </div>
    ),
  ],
}

export const Vertical: Story = {
  args: { orientation: 'vertical', variant: 'default', spacing: 'md' },
  decorators: [
    (S) => (
      <div style={{ display: 'flex', height: '120px', alignItems: 'stretch', gap: 'var(--space-400)' }}>
        <span style={{ color: 'var(--text-default-caption)' }}>A</span>
        <S />
        <span style={{ color: 'var(--text-default-caption)' }}>B</span>
      </div>
    ),
  ],
}
