import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from '../../components/molecules/Stepper/Stepper'

const steps = [
  { label: 'Profile', description: 'Organization details' },
  { label: 'Jurisdiction', description: 'Counties and partners' },
  { label: 'Review', description: 'Confirm and submit' },
]

const meta = {
  title: 'Molecules/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Multi-step progress with horizontal or vertical layout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: { type: 'number', min: 0, max: 2 } },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<Stepper steps={steps} currentStep={0} />

// HTML + CSS
<nav class="cwpc-stepper" aria-label="Progress">…</nav>

// Vue
<Stepper :steps="steps" :current-step="0" />

// Angular
<cwpc-stepper [steps]="steps" [currentStep]="0"></cwpc-stepper>`,
  language: 'tsx' as const,
}

export const Step1: Story = {
  args: { steps, currentStep: 0, orientation: 'horizontal' },
  parameters: { docs: { source: src } },
}

export const Step2: Story = {
  args: { steps, currentStep: 1, orientation: 'horizontal' },
}

export const Step3: Story = {
  args: { steps, currentStep: 2, orientation: 'horizontal' },
}

export const AllComplete: Story = {
  args: {
    steps: steps.map((s) => ({ ...s, status: 'complete' as const })),
    currentStep: 2,
    orientation: 'horizontal',
  },
}
