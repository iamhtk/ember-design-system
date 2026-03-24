import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import {
  ToastView,
  type ToastItemData,
} from '../../components/organisms/Toast/Toast'

const meta = {
  title: 'Organisms/Toast',
  component: ToastView,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Transient toast with slide-in motion and auto-dismiss.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToastView>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<ToastView item={{ id: '1', message: 'Done' }} slideFrom="right" onDismissed={() => {}} />

// HTML + CSS
<div class="cwpc-toast" role="status">…</div>

// Vue
<ToastView :item="item" slide-from="right" />

// Angular
<cwpc-toast-view [item]="item" slideFrom="right"></cwpc-toast-view>`,
  language: 'tsx' as const,
}

function demo(variant: NonNullable<ToastItemData['variant']>, message: string) {
  return function Render() {
    const [items, setItems] = useState<ToastItemData[]>([])
    const push = () => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
      setItems((prev) => [...prev, { id, message, variant }])
    }
    return (
      <>
        <div style={{ padding: 'var(--space-800)' }}>
          <Button label="Show toast" type="default" onClick={push} />
        </div>
        <div
          style={{
            position: 'fixed',
            bottom: 'var(--space-800)',
            right: 'var(--space-800)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-300)',
            zIndex: 9999,
          }}
        >
          {items.map((item) => (
            <ToastView
              key={item.id}
              item={item}
              slideFrom="right"
              onDismissed={(rid) => setItems((xs) => xs.filter((x) => x.id !== rid))}
            />
          ))}
        </div>
      </>
    )
  }
}

const toastArgs = {
  item: { id: 'placeholder', message: 'Placeholder' },
  slideFrom: 'right' as const,
  onDismissed: () => {},
}

export const Success: Story = {
  args: toastArgs,
  parameters: { docs: { source: src } },
  render: demo('success', 'Profile saved.'),
}

export const Error: Story = {
  args: toastArgs,
  render: demo('error', 'Sync failed — try again.'),
}

export const Warning: Story = {
  args: toastArgs,
  render: demo('warning', 'Elevated risk in saved regions.'),
}

export const Info: Story = {
  args: toastArgs,
  render: demo('info', 'New methodology notes published.'),
}
