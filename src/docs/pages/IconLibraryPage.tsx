import { Icon, type IconName } from '../../components/atoms/Icon/Icon'
import { DocsPage, DocsSection } from '../helpers/DocsPage'
import styles from './IconLibraryPage.module.css'

const ICON_NAMES = [
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
] as const satisfies readonly IconName[]

export function IconLibraryPage() {
  return (
    <DocsPage
      category="Foundation"
      title="Icon library"
      description="Inline SVG icons used across Prism components. Names map to Material Symbols Rounded–style paths in the Icon component."
      status="stable"
    >
      <DocsSection title="Available Icons (Material Icons Rounded)">
        <p className={styles.note}>
          Icons are inline SVGs using Material Icons Rounded style. Use the <code className={styles.code}>Icon</code>{' '}
          component with the <code className={styles.code}>name</code> prop.
        </p>
        <div className={styles.grid}>
          {ICON_NAMES.map((name) => (
            <div key={name} className={styles.cell}>
              <div className={styles.iconWrap} aria-hidden>
                <Icon name={name} size={24} color="var(--text-default-body)" />
              </div>
              <code className={styles.name}>{name}</code>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Usage">
        <pre className={styles.pre}>
          <code>{`import { Icon } from './components/atoms/Icon/Icon'

<Icon name="search" size={24} />`}</code>
        </pre>
      </DocsSection>
    </DocsPage>
  )
}
