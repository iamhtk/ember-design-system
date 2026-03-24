import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { FileUpload } from '../../components/molecules/FileUpload/FileUpload'

const meta = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Drag-and-drop and click-to-browse file picker with optional multi-select.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<FileUpload label="Attach report" hint="PDF up to 10 MB" />

// HTML + CSS
<div class="cwpc-file-upload">…</div>

// Vue
<FileUpload label="Attach report" />

// Angular
<cwpc-file-upload label="Attach report"></cwpc-file-upload>`,
  language: 'tsx' as const,
}

const box = [
  (Story: () => ReactNode) => (
    <div style={{ width: 'min(100%, 400px)' }}>
      <Story />
    </div>
  ),
]

export const Default: Story = {
  args: { label: 'Attach situational report', hint: 'PDF or DOCX.', multiple: false },
  parameters: { docs: { source: src } },
  decorators: box,
}

export const Multiple: Story = {
  args: { label: 'Photos', multiple: true, accept: 'image/*' },
  decorators: box,
}

export const Disabled: Story = {
  args: { label: 'Uploads locked', disabled: true },
  decorators: box,
}
