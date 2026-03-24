import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '../../components/atoms/Heading/Heading'

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Semantic heading levels with token-based type scale and color.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'default', 'info', 'success'],
    },
    weight: { control: 'select', options: ['regular', 'medium', 'semibold', 'bold'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Heading level={1}>Page title</Heading>

// HTML + CSS
<h1 class="cwpc-heading">Page title</h1>

// Vue
<Heading :level="1">Page title</Heading>

// Angular
<cwpc-heading level="1">Page title</cwpc-heading>`,
  language: 'tsx' as const,
}

export const H1: Story = {
  args: { level: 1, children: 'Page title' },
  parameters: { docs: { source: src } },
}

export const H2: Story = { args: { level: 2, children: 'Section heading' } }
export const H3: Story = { args: { level: 3, children: 'Subsection' } }
export const H4: Story = { args: { level: 4, children: 'Card title' } }
export const H5: Story = { args: { level: 5, children: 'Label heading' } }
export const H6: Story = { args: { level: 6, children: 'Minor heading' } }

export const AllColors: Story = {
  args: { level: 4, children: 'Color sample', color: 'default' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-400)', alignItems: 'flex-start' }}>
      <Heading level={4} color="primary">
        Primary
      </Heading>
      <Heading level={4} color="secondary">
        Secondary
      </Heading>
      <Heading level={4} color="tertiary">
        Tertiary
      </Heading>
      <Heading level={4} color="default">
        Default
      </Heading>
      <Heading level={4} color="info">
        Info
      </Heading>
      <Heading level={4} color="success">
        Success
      </Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All supported `color` values on Heading.',
      },
    },
  },
}
