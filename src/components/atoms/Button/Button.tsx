import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonProps = {
  label?: string;
  type?: 'default' | 'outlined' | 'transparent';
  status?: 'default' | 'hover' | 'pressed' | 'focus' | 'disabled';
  /**
   * `true` shows the left icon slot (uses `iconLeft1` or a default info glyph).
   * `false` / omit hides it. A `ReactNode` is still supported for legacy call sites.
   */
  iconLeft?: boolean | ReactNode;
  /**
   * `true` shows the right icon slot (uses `iconRight1` or a default info glyph).
   * `false` / omit hides it. A `ReactNode` is still supported for legacy call sites.
   */
  iconRight?: boolean | ReactNode;
  iconLeft1?: ReactNode | null;
  iconRight1?: ReactNode | null;
  onClick?: () => void;
  colorScheme?: 'primary' | 'information' | 'success' | 'warning' | 'error';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

const typeClassMap = {
  default: styles.typeDefault,
  outlined: styles.typeOutlined,
  transparent: styles.typeTransparent,
} as const;

function renderIconSlot(
  flag: boolean | ReactNode | undefined,
  custom: ReactNode | null | undefined,
): ReactNode | null {
  if (flag === true) {
    const content =
      custom != null ? (
        custom
      ) : (
        <span className={styles.defaultInfoIcon} aria-hidden>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2V7h-2v2z" />
          </svg>
        </span>
      );
    return <span className={styles.iconSlot}>{content}</span>;
  }
  if (flag === false || flag === undefined) {
    return null;
  }
  return <span className={styles.iconSlot}>{flag}</span>;
}

export const Button = ({
  label,
  type: buttonType = 'default',
  status = 'default',
  iconLeft,
  iconRight,
  iconLeft1,
  iconRight1,
  onClick,
  colorScheme = 'primary',
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled === true || status === 'disabled';
  const interactive = status === 'default';
  const forceHover = status === 'hover';
  const forcePressed = status === 'pressed';
  const forceFocus = status === 'focus';

  const schemeClass =
    colorScheme === 'success'
      ? styles.schemeSuccess
      : colorScheme === 'information'
        ? styles.schemeInformation
        : colorScheme === 'warning'
          ? styles.schemeWarning
          : colorScheme === 'error'
            ? styles.schemeError
            : undefined;

  const rootClass = [
    styles.root,
    typeClassMap[buttonType],
    schemeClass,
    interactive ? styles.interactive : '',
    forceHover ? styles.forceHover : '',
    forcePressed ? styles.forcePressed : '',
    forceFocus ? styles.forceFocus : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const leftSlot = renderIconSlot(iconLeft, iconLeft1);
  const rightSlot = renderIconSlot(iconRight, iconRight1);

  return (
    <button
      type="button"
      className={rootClass}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      {...rest}
    >
      {leftSlot}
      {label != null ? <span className={styles.label}>{label}</span> : null}
      {rightSlot}
    </button>
  );
};
