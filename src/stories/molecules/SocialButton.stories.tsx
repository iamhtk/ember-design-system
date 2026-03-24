import type { Meta, StoryObj } from '@storybook/react'
import { SocialButton } from '../../components/molecules/SocialButton/SocialButton'

const meta = {
  title: 'Molecules/SocialButton',
  component: SocialButton,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Icon-only link to social platforms with brand, primary, or outlined styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    platform: {
      control: 'select',
      options: [
        'facebook',
        'twitter',
        'linkedin',
        'youtube',
        'instagram',
        'tiktok',
        'share',
      ],
    },
    variant: { control: 'select', options: ['brand', 'primary', 'outlined'] },
    size: { control: 'select', options: ['xs', 'sm', 'md'] },
    href: { control: 'text' },
  },
} satisfies Meta<typeof SocialButton>

export default meta
type Story = StoryObj<typeof meta>

const src = {
  code: `// React
<SocialButton platform="linkedin" href="https://linkedin.com/company/cwpc" variant="brand" />

// HTML + CSS
<a class="cwpc-social-button" href="…" aria-label="…"></a>

// Vue
<SocialButton platform="linkedin" href="…" variant="brand" />

// Angular
<cwpc-social-button platform="linkedin" href="…" variant="brand"></cwpc-social-button>`,
  language: 'tsx' as const,
}

export const Brand: Story = {
  args: {
    platform: 'linkedin',
    href: 'https://www.linkedin.com/company/example',
    variant: 'brand',
    size: 'md',
  },
  parameters: { docs: { source: src } },
}

export const Primary: Story = {
  args: {
    platform: 'youtube',
    href: 'https://www.youtube.com/@example',
    variant: 'primary',
    size: 'md',
  },
}

export const Outlined: Story = {
  args: {
    platform: 'twitter',
    href: 'https://twitter.com/example',
    variant: 'outlined',
    size: 'md',
  },
}
