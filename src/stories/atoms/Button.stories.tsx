import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { Button } from '../../components/atoms/Button/Button'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Buttons trigger actions. Use filled (default) for the primary action on a page, outlined for secondary, transparent for tertiary. Wrap in a container element to add onClick — the component is a pure display component.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
      table: { category: 'Content', defaultValue: { summary: '"Button Text"' } },
    },
    type: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'transparent'],
      description: 'Visual style — default=filled, outlined=bordered, transparent=text only',
      table: { category: 'Appearance', defaultValue: { summary: '"default"' } },
    },
    status: {
      control: { type: 'select' },
      options: ['default', 'hover', 'pressed', 'focus', 'disabled'],
      description:
        'Interaction state for visual testing. In production CSS handles hover/focus/pressed.',
      table: { category: 'State', defaultValue: { summary: '"default"' } },
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'information', 'success', 'warning', 'error'],
      table: { category: 'Appearance', defaultValue: { summary: '"primary"' } },
    },
    iconLeft: {
      control: 'boolean',
      description:
        'Show icon on the LEFT side. Uses default info icon unless iconLeft1 is provided.',
      table: { category: 'Icons', defaultValue: { summary: 'true' } },
    },
    iconRight: {
      control: 'boolean',
      description:
        'Show icon on the RIGHT side. Uses default info icon unless iconRight1 is provided.',
      table: { category: 'Icons', defaultValue: { summary: 'true' } },
    },
    iconLeft1: {
      control: false,
      description: 'Custom React node for left icon. Null = use default icon.',
      table: { category: 'Icons' },
    },
    iconRight1: {
      control: false,
      description: 'Custom React node for right icon. Null = use default icon.',
      table: { category: 'Icons' },
    },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Button Text',
    type: 'default',
    status: 'default',
    colorScheme: 'primary',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
  parameters: {
    docs: {
      source: {
        code: `// React — wrap for click handling
<div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-block' }}>
  <Button label="Button Text" type="default" status="default" iconLeft={false} iconRight={false} />
</div>

// HTML + CSS
<button class="btn btn--filled" onclick="handleClick()">Button Text</button>

// Vue
<PrismButton label="Button Text" type="default" @click="handleClick" />

// Angular
<prism-button label="Button Text" type="default" (click)="handleClick()"></prism-button>`,
        language: 'tsx',
      },
      description: {
        story: 'Default filled button for primary actions. iconLeft and iconRight are false so no icons show.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttonEl = canvas.getByText('Button Text')
    expect(buttonEl).toBeInTheDocument()
    await userEvent.hover(buttonEl)
    await userEvent.unhover(buttonEl)
  },
}

export const Outlined: Story = {
  args: {
    label: 'Learn More',
    type: 'outlined',
    status: 'default',
    colorScheme: 'primary',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: { story: 'Outlined button for secondary actions. Use alongside a primary filled button.' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttonEl = canvas.getByText('Learn More')
    expect(buttonEl).toBeInTheDocument()
  },
}

export const Transparent: Story = {
  args: {
    label: 'Cancel',
    type: 'transparent',
    status: 'default',
    colorScheme: 'primary',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Transparent button for low-emphasis tertiary actions like cancel or dismiss.',
      },
    },
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Download',
    type: 'default',
    status: 'default',
    colorScheme: 'primary',
    iconLeft: true,
    iconRight: false,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'iconLeft: true — shows the default icon on the LEFT side. iconRight: false hides the right icon.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttonEl = canvas.getByText('Download')
    expect(buttonEl).toBeInTheDocument()
  },
}

export const WithRightIcon: Story = {
  args: {
    label: 'Next Step',
    type: 'default',
    status: 'default',
    colorScheme: 'primary',
    iconLeft: false,
    iconRight: true,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'iconRight: true — shows the default icon on the RIGHT side. iconLeft: false hides the left icon.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttonEl = canvas.getByText('Next Step')
    expect(buttonEl).toBeInTheDocument()
  },
}

export const WithBothIcons: Story = {
  args: {
    label: 'Download Scorecard',
    type: 'default',
    status: 'default',
    colorScheme: 'primary',
    iconLeft: true,
    iconRight: true,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Both iconLeft and iconRight set to true — shows default icons on both sides.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Unavailable',
    type: 'default',
    status: 'disabled',
    colorScheme: 'primary',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: { story: 'Disabled state. Always explain why via tooltip or helper text nearby.' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttonEl = canvas.getByText('Unavailable')
    expect(buttonEl).toBeInTheDocument()
  },
}

export const WarningButton: Story = {
  args: {
    colorScheme: 'warning',
    type: 'default',
    label: 'Warning Action',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
}

export const WarningOutlined: Story = {
  args: {
    colorScheme: 'warning',
    type: 'outlined',
    label: 'Warning Outlined',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
}

export const WarningTransparent: Story = {
  args: {
    colorScheme: 'warning',
    type: 'transparent',
    label: 'Warning Transparent',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
}

export const ErrorButton: Story = {
  args: {
    colorScheme: 'error',
    type: 'default',
    label: 'Delete Item',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
}

export const ErrorOutlined: Story = {
  args: {
    colorScheme: 'error',
    type: 'outlined',
    label: 'Error Outlined',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
}

export const ErrorTransparent: Story = {
  args: {
    colorScheme: 'error',
    type: 'transparent',
    label: 'Error Transparent',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--space-300)',
  alignItems: 'center',
  flexWrap: 'wrap',
}

export const AllTypes: Story = {
  args: {
    label: 'Filled',
    type: 'default',
    status: 'default',
    colorScheme: 'primary',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
  render: (args) => (
    <div style={rowStyle}>
      <Button
        label="Filled"
        type="default"
        status="default"
        colorScheme="primary"
        iconLeft={false}
        iconRight={false}
        onClick={args.onClick}
      />
      <Button
        label="Outlined"
        type="outlined"
        status="default"
        colorScheme="primary"
        iconLeft={false}
        iconRight={false}
        onClick={args.onClick}
      />
      <Button
        label="Transparent"
        type="transparent"
        status="default"
        colorScheme="primary"
        iconLeft={false}
        iconRight={false}
        onClick={args.onClick}
      />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'All 3 button types side by side for visual comparison.' } },
  },
}

export const AllStates: Story = {
  args: {
    label: 'Default',
    type: 'default',
    status: 'default',
    colorScheme: 'primary',
    iconLeft: false,
    iconRight: false,
    onClick: fn(),
  },
  render: (args) => (
    <div style={rowStyle}>
      <Button
        label="Default"
        type="default"
        status="default"
        colorScheme="primary"
        iconLeft={false}
        iconRight={false}
        onClick={args.onClick}
      />
      <Button
        label="Hover"
        type="default"
        status="hover"
        colorScheme="primary"
        iconLeft={false}
        iconRight={false}
        onClick={args.onClick}
      />
      <Button
        label="Pressed"
        type="default"
        status="pressed"
        colorScheme="primary"
        iconLeft={false}
        iconRight={false}
        onClick={args.onClick}
      />
      <Button
        label="Focus"
        type="default"
        status="focus"
        colorScheme="primary"
        iconLeft={false}
        iconRight={false}
        onClick={args.onClick}
      />
      <Button
        label="Disabled"
        type="default"
        status="disabled"
        colorScheme="primary"
        iconLeft={false}
        iconRight={false}
        onClick={args.onClick}
      />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'All 5 interaction states for visual regression testing.' } },
  },
}

const demoHintStyle: React.CSSProperties = {
  color: 'var(--text-default-caption)',
  fontSize: 'var(--font-size-body-xs)',
  margin: 0,
  fontFamily: 'var(--font-family-body)',
}

function ClickableDemoContent({ onStoryClick }: { onStoryClick?: () => void }) {
  const [count, setCount] = useState(0)
  const bump = () => {
    onStoryClick?.()
    setCount((c) => c + 1)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-400)',
        alignItems: 'center',
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="Increment demo counter"
        onClick={bump}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            bump()
          }
        }}
        style={{ cursor: 'pointer', display: 'inline-block' }}
      >
        <Button
          label={`Clicked ${count} time${count !== 1 ? 's' : ''}`}
          type="default"
          status="default"
          colorScheme="primary"
          iconLeft={false}
          iconRight={false}
        />
      </div>
      <p style={demoHintStyle}>
        Wrap Button in a div with role=&quot;button&quot; and tabIndex to add click + keyboard handling
      </p>
    </div>
  )
}

export const ClickableDemo: Story = {
  args: {
    onClick: fn(),
    label: 'Clicked 0 times',
    type: 'default',
    status: 'default',
    colorScheme: 'primary',
    iconLeft: false,
    iconRight: false,
  },
  render: (args) => <ClickableDemoContent onStoryClick={args.onClick} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const wrapper = canvas.getByRole('button', { name: 'Increment demo counter' })
    expect(wrapper).toBeInTheDocument()
    await userEvent.click(wrapper)
    await userEvent.click(wrapper)
    await userEvent.click(wrapper)
    await expect(canvas.getByText('Clicked 3 times')).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Live click demo with Interactions test. The play function clicks 3 times and verifies the count updates.',
      },
    },
  },
}
