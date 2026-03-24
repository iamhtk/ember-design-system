import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../components/atoms/Button/Button'
import { Tooltip } from '../../components/molecules/Tooltip/Tooltip'

const meta = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Hover- and focus-revealed hint anchored to a trigger element.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Tooltip content="Help text" position="top">
  <button type="button">Hover</button>
</Tooltip>

// HTML + CSS
<span class="cwpc-tooltip">…</span>

// Vue
<Tooltip content="Help" position="top"><button>Hover</button></Tooltip>

// Angular
<cwpc-tooltip content="Help" position="top"><button>Hover</button></cwpc-tooltip>`,
  language: 'tsx' as const,
}

export const Top: Story = {
  args: {
    content: 'Tooltip on top',
    position: 'top',
    children: <Button label="Hover or focus" type="outlined" />,
  },
  parameters: { docs: { source: src } },
}

export const Bottom: Story = {
  args: {
    content: 'Below the trigger',
    position: 'bottom',
    children: <Button label="Hover or focus" type="outlined" />,
  },
}

export const Left: Story = {
  args: {
    content: 'To the left',
    position: 'left',
    children: <Button label="Hover or focus" type="outlined" />,
  },
}

export const Right: Story = {
  args: {
    content: 'To the right',
    position: 'right',
    children: <Button label="Hover or focus" type="outlined" />,
  },
}
