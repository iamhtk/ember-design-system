import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../../components/atoms/Label/Label'

const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Accessible label for form controls with optional required marker and help hint.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    required: { control: 'boolean' },
    hint: { control: 'boolean' },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Label text="Email" htmlFor="email" />

// HTML + CSS
<label class="cwpc-label" for="email">Email</label>

// Vue
<Label text="Email" html-for="email" />

// Angular
<cwpc-label text="Email" htmlFor="email"></cwpc-label>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { text: 'Email address', required: false, hint: false },
  parameters: { docs: { source: src } },
}

export const Required: Story = { args: { text: 'Full name', required: true } }
export const WithHint: Story = { args: { text: 'Organization', hint: true } }
