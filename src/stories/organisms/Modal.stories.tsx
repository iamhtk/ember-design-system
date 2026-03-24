import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import { Text } from '../../components/atoms/Text/Text'
import { Modal } from '../../components/organisms/Modal/Modal'

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Accessible dialog with backdrop, focus trap behavior, and size variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    surface: { control: 'select', options: ['dark', 'light'] },
    showCloseButton: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Modal isOpen={open} onClose={() => setOpen(false)} title="Title">
  <Text variant="body-md">Content</Text>
</Modal>

// HTML + CSS
<div class="cwpc-modal-backdrop">…</div>

// Vue
<Modal :is-open="open" @close="open = false" title="Title" />

// Angular
<cwpc-modal [isOpen]="open" (close)="open = false" title="Title"></cwpc-modal>`,
  language: 'tsx' as const,
}

function renderWithSize(size: 'sm' | 'md' | 'lg') {
  return function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button label={`Open ${size} modal`} type="default" onClick={() => setOpen(true)} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={`${size.toUpperCase()} modal`}
          size={size}
        >
          <Text variant="body-md">
            Use this pattern for confirmations, forms, and focused tasks.
          </Text>
        </Modal>
      </>
    )
  }
}

export const Small: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Small',
    children: null,
    size: 'sm',
  },
  parameters: { docs: { source: src } },
  render: renderWithSize('sm'),
}

export const Medium: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Medium',
    children: null,
    size: 'md',
  },
  render: renderWithSize('md'),
}

export const Large: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Large',
    children: null,
    size: 'lg',
  },
  render: renderWithSize('lg'),
}
