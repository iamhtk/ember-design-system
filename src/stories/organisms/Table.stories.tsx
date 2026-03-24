import type { Meta, StoryObj } from '@storybook/react'
import { Table } from '../../components/organisms/Table/Table'

const columns = [
  { key: 'name', label: 'Name', sortable: true as const },
  { key: 'organization', label: 'Organization', sortable: true as const },
  { key: 'location', label: 'Location', sortable: true as const },
  { key: 'status', label: 'Status', sortable: true as const, width: '140px' },
]

const rows = [
  {
    name: 'Jordan Lee',
    organization: 'CWPC Field Ops',
    location: 'Northern California',
    status: 'Active',
  },
  {
    name: 'Sam Rivera',
    organization: 'Community Fire Safe Council',
    location: 'Oregon Coast',
    status: 'Review',
  },
  {
    name: 'Avery Chen',
    organization: 'State Forestry Partner',
    location: 'Washington',
    status: 'Complete',
  },
  {
    name: 'Morgan Patel',
    organization: 'CWPC Analytics',
    location: 'Remote',
    status: 'Active',
  },
]

const meta = {
  title: 'Organisms/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Sortable data table for scorecard and roster views with optional striping.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Table columns={columns} rows={rows} caption="CWPC partners" />

// HTML + CSS
<div class="cwpc-table-wrapper"><table>…</table></div>

// Vue
<Table :columns="columns" :rows="rows" />

// Angular
<cwpc-table [columns]="columns" [rows]="rows"></cwpc-table>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: {
    columns,
    rows,
    caption: 'CWPC sample roster',
  },
  parameters: { docs: { source: src } },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 900px)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Striped: Story = {
  args: {
    columns,
    rows,
    striped: true,
    caption: 'Striped rows',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 900px)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Sortable: Story = {
  args: {
    columns,
    rows,
    caption: 'Click column headers to sort',
    stickyHeader: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 900px)', maxHeight: '280px', overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
}
