import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { fn } from '@storybook/test'
import { Pagination } from '../../components/molecules/Pagination/Pagination'

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Page navigation with previous, next, and numbered page controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 20 } },
    totalPages: { control: { type: 'number', min: 1, max: 20 } },
    onChange: {
      action: 'changed',
      description: 'Called with the new page index when navigation changes',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Pagination currentPage={2} totalPages={8} onChange={setPage} />

// HTML + CSS
<nav class="cwpc-pagination" aria-label="Pagination">…</nav>

// Vue
<Pagination :current-page="2" :total-pages="8" @change="setPage" />

// Angular
<cwpc-pagination [currentPage]="2" [totalPages]="8" (change)="setPage($event)"></cwpc-pagination>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  render: function R(args) {
    const [p, setP] = useState(args.currentPage ?? 2)
    return (
      <Pagination
        {...args}
        currentPage={p}
        onChange={(page) => {
          args.onChange?.(page)
          setP(page)
        }}
      />
    )
  },
  args: { totalPages: 8, currentPage: 2, onChange: fn() },
  parameters: { docs: { source: src } },
}

export const FirstPage: Story = {
  render: function R(args) {
    const [p, setP] = useState(1)
    return (
      <Pagination
        {...args}
        currentPage={p}
        onChange={(page) => {
          args.onChange?.(page)
          setP(page)
        }}
      />
    )
  },
  args: { totalPages: 6, currentPage: 1, onChange: fn() },
}

export const LastPage: Story = {
  render: function R(args) {
    const [p, setP] = useState(5)
    return (
      <Pagination
        {...args}
        currentPage={p}
        onChange={(page) => {
          args.onChange?.(page)
          setP(page)
        }}
      />
    )
  },
  args: { totalPages: 5, currentPage: 5, onChange: fn() },
}
