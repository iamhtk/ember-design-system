// import type { Meta, StoryObj } from '@storybook/react'
// import { Icon, type IconName } from './Icon'

// const ICON_NAMES: IconName[] = [
//   'check_circle',
//   'error',
//   'warning_amber',
//   'info',
//   'info_outline',
//   'search',
//   'close',
//   'expand_more',
//   'chevron_right',
//   'visibility',
//   'visibility_off',
//   'cloud_upload',
//   'help_outline',
//   'calendar_today',
// ]

// const meta = {
//   title: 'Foundation/Icons',
//   component: Icon,
//   parameters: {
//     layout: 'centered',
//     backgrounds: { default: 'dark' },
//     docs: {
//       description: {
//         component:
//           'Material Symbols–style rounded paths as inline SVGs. Use `currentColor` (default) to inherit text color from the parent.',
//       },
//     },
//   },
//   tags: ['autodocs'],
//   argTypes: {
//     name: { control: 'select', options: ICON_NAMES },
//     size: { control: { type: 'number' } },
//     color: { control: 'text' },
//   },
// } satisfies Meta<typeof Icon>

// export default meta
// type Story = StoryObj<typeof meta>

// export const AllIcons: Story = {
//   render: () => (
//     <div
//       style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: 'var(--space-600)',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//       }}
//     >
//       {ICON_NAMES.map((name) => (
//         <div
//           key={name}
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: 'var(--space-200)',
//             width: 'var(--space-1400)',
//           }}
//         >
//           <Icon name={name} size={20} color="var(--color-primary-default)" />
//           <span
//             style={{
//               fontFamily: 'var(--font-family-body)',
//               fontSize: 'var(--font-size-body-xs)',
//               color: 'var(--text-default-caption)',
//               textAlign: 'center',
//               wordBreak: 'break-word',
//             }}
//           >
//             {name}
//           </span>
//         </div>
//       ))}
//     </div>
//   ),
// }

import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import type { IconName } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Foundation/Icons',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

const allIconNames: IconName[] = [
  'check_circle',
  'error',
  'warning_amber',
  'info',
  'info_outline',
  'search',
  'close',
  'expand_more',
  'chevron_right',
  'visibility',
  'visibility_off',
  'cloud_upload',
  'help_outline',
  'calendar_today',
];

export const AllIcons: Story = {
  args: {
    name: 'info',
    size: 24,
    color: '#FF6701',
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '24px' }}>
      {allIconNames.map((name) => (
        <div
          key={name}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <Icon name={name} size={24} color="#FF6701" />
          <span style={{ fontSize: '12px', color: '#666' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const SingleIcon: Story = {
  args: {
    name: 'info',
    size: 24,
    color: '#FF6701',
  },
};