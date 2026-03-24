import type { Meta, StoryObj } from '@storybook/react'
import { Blockquote } from '../../components/atoms/Blockquote/Blockquote'

const quote =
  'Community-led fuel reduction and early detection are the most effective levers before a fire becomes catastrophic.'

const meta = {
  title: 'Atoms/Blockquote',
  component: Blockquote,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Highlighted quotation with optional citation line.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cite: { control: 'text' },
    variant: { control: 'select', options: ['default', 'primary', 'success', 'info'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Blockquote>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Blockquote variant="default">Quote text</Blockquote>

// HTML + CSS
<blockquote class="cwpc-blockquote">Quote text</blockquote>

// Vue
<Blockquote variant="default">Quote text</Blockquote>

// Angular
<cwpc-blockquote variant="default">Quote text</cwpc-blockquote>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { children: quote, variant: 'default' },
  parameters: { docs: { source: src } },
}

export const Primary: Story = {
  args: { children: quote, variant: 'primary' },
}

export const Success: Story = {
  args: { children: quote, variant: 'success' },
}

export const Info: Story = {
  args: { children: quote, variant: 'info' },
}

export const WithCitation: Story = {
  args: { children: quote, cite: 'CWPC Field Brief, 2024', variant: 'default' },
}
