import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import { Text } from '../../components/atoms/Text/Text'
import { Panel } from '../../components/organisms/Panel/Panel'

const meta = {
  title: 'Organisms/Panel',
  component: Panel,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Slide-in panel for filters, details, or secondary workflows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['left', 'right'] },
    showOverlay: { control: 'boolean' },
  },
} satisfies Meta<typeof Panel>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Panel isOpen={open} onClose={() => setOpen(false)} title="Filters">
  <Text variant="body-md">Content</Text>
</Panel>

// HTML + CSS
<aside class="cwpc-panel">…</aside>

// Vue
<Panel :is-open="open" @close="open = false" />

// Angular
<cwpc-panel [isOpen]="open" (close)="open = false"></cwpc-panel>`,
  language: 'tsx' as const,
}

function renderPanel(side: 'left' | 'right') {
  return function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <div style={{ padding: 'var(--space-800)' }}>
          <Button
            label={side === 'left' ? 'Open left panel' : 'Open right panel'}
            type="default"
            onClick={() => setOpen(true)}
          />
        </div>
        <Panel
          isOpen={open}
          onClose={() => setOpen(false)}
          title={side === 'left' ? 'Left panel' : 'Right panel'}
          side={side}
        >
          <Text variant="body-md">
            Stack filters, contextual help, or nested forms inside this surface.
          </Text>
        </Panel>
      </>
    )
  }
}

export const LeftPanel: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Left',
    children: null,
    side: 'left',
  },
  parameters: { docs: { source: src } },
  render: renderPanel('left'),
}

export const RightPanel: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Right',
    children: null,
    side: 'right',
  },
  render: renderPanel('right'),
}
