import { HTMLAttributes } from 'react';
import { cx } from './cx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {}

export default function Badge({ className, ...rest }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border border-white/10',
        className
      )}
      {...rest}
    />
  );
}
