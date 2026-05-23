import { HTMLAttributes } from 'react';
import { cx } from './cx';

type DivProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...rest }: DivProps) {
  return (
    <div
      className={cx('rounded-3xl border bg-zinc-950/50 border-white/10', className)}
      {...rest}
    />
  );
}

export function CardHeader({ className, ...rest }: DivProps) {
  return <div className={cx('p-5 border-b border-white/5', className)} {...rest} />;
}

export function CardContent({ className, ...rest }: DivProps) {
  return <div className={cx('p-5', className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: DivProps) {
  return (
    <div
      className={cx('p-5 border-t border-white/5 flex items-center gap-3', className)}
      {...rest}
    />
  );
}

export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx('text-base font-semibold', className)} {...rest} />;
}

export function CardDescription({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-xs text-zinc-400', className)} {...rest} />;
}
