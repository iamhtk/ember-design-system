import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DatePicker } from '../../components/molecules/DatePicker/DatePicker'

const meta = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Date field that opens a calendar popover for choosing a day.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<DatePicker label="Briefing date" placeholder="Select date" />

// HTML + CSS
<div class="cwpc-date-picker">…</div>

// Vue
<DatePicker label="Briefing date" />

// Angular
<cwpc-date-picker label="Briefing date"></cwpc-date-picker>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { label: 'Briefing date', placeholder: 'Select date' },
  parameters: { docs: { source: src } },
}

export const WithSelection: Story = {
  render: function R(args) {
    const [d, setD] = useState(() => new Date(2025, 2, 15))
    return <DatePicker {...args} value={d} onChange={setD} />
  },
  args: { label: 'Exercise window', placeholder: 'Select date' },
}

export const Disabled: Story = {
  args: { label: 'Locked period', disabled: true, placeholder: 'Select date' },
}
