import type { Preview } from '@storybook/react'
import '../src/tokens/cwpc-tokens.css'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1B1B1F' },
        { name: 'darker', value: '#121212' },
        { name: 'card', value: '#232329' },
        { name: 'light', value: '#F5F5F7' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Prism Design System',
          'Foundation',
          ['Colors', 'Typography', 'Spacing', 'Grid', 'Elevation', 'Background Blur', 'Tokens'],
          'Atoms',
          'Molecules',
          'Organisms',
        ],
      },
    },
    // Actions: automatically log all props starting with "on"
    actions: { argTypesRegex: '^on[A-Z].*' },
    // A11y: configure axe rules for dark backgrounds
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
