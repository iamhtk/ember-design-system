import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import { RegistrationModal } from '../../components/organisms/RegistrationModal/RegistrationModal'

const meta = {
  title: 'Organisms/RegistrationModal',
  component: RegistrationModal,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Light-surface modal for email capture when registration is closed.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RegistrationModal>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<RegistrationModal isOpen={open} onClose={() => setOpen(false)} />

// HTML + CSS
<div class="cwpc-registration-modal">…</div>

// Vue
<RegistrationModal :is-open="open" @close="open = false" />

// Angular
<cwpc-registration-modal [isOpen]="open" (close)="open = false"></cwpc-registration-modal>`,
  language: 'tsx' as const,
}

export const Default: Story = {
  args: { isOpen: false, onClose: () => {} },
  parameters: { docs: { source: src } },
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button label="Open registration modal" type="default" onClick={() => setOpen(true)} />
        <RegistrationModal isOpen={open} onClose={() => setOpen(false)} />
      </>
    )
  },
}
