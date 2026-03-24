import type { Meta, StoryObj } from '@storybook/react'
import { Code } from '../../components/atoms/Code/Code'

const meta = {
  title: 'Atoms/Code',
  component: Code,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Inline or block code formatting with optional language label and copy control.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    block: { control: 'boolean' },
    copyable: { control: 'boolean' },
    language: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Code>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Code>npm run storybook</Code>

// HTML + CSS
<code class="cwpc-code-inline">npm run storybook</code>

// Vue
<Code>npm run storybook</Code>

// Angular
<cwpc-code>npm run storybook</cwpc-code>`,
  language: 'tsx' as const,
}

export const Inline: Story = {
  args: { block: false, children: 'npm run storybook' },
  parameters: { docs: { source: src } },
}

export const Block: Story = {
  args: {
    block: true,
    language: 'bash',
    children: 'npx tsc --noEmit -p tsconfig.app.json',
  },
  decorators: [
    (S) => (
      <div style={{ width: 'min(100%, 420px)' }}>
        <S />
      </div>
    ),
  ],
}

export const Copyable: Story = {
  args: {
    block: true,
    language: 'tsx',
    copyable: true,
    children: "import { Button } from './Button'",
  },
  decorators: [
    (S) => (
      <div style={{ width: 'min(100%, 420px)' }}>
        <S />
      </div>
    ),
  ],
}
