import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const PrismTheme = create({
  base: 'dark',
  brandTitle: 'Prism Design System',
  brandUrl: 'https://prism.cwpc.hrithiksanyal.com',
  brandTarget: '_blank',
  colorPrimary: '#FF6701',
  colorSecondary: '#FF6701',
  appBg: '#141416',
  appContentBg: '#1B1B1F',
  appPreviewBg: '#1B1B1F',
  appBorderColor: 'rgba(255,255,255,0.08)',
  appBorderRadius: 8,
  textColor: '#F5F5F7',
  textInverseColor: '#121212',
  textMutedColor: '#71717A',
  barTextColor: '#A1A1AA',
  barHoverColor: '#F5F5F7',
  barSelectedColor: '#FF6701',
  barBg: '#141416',
  inputBg: '#232329',
  inputBorder: 'rgba(255,255,255,0.12)',
  inputTextColor: '#F5F5F7',
  inputBorderRadius: 6,
  fontBase: '"Work Sans", sans-serif',
  fontCode: 'monospace',
})

addons.setConfig({ theme: PrismTheme })
