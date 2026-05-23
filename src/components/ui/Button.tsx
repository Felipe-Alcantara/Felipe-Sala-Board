import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cx } from './cx';

type Variant = 'default' | 'outline' | 'ghost' | 'secondary';
type Size = 'sm' | 'md' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  active?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-medium transition shadow-sm border';

const variants: Record<Variant, string> = {
  default: 'bg-white text-black border-white/10 hover:bg-zinc-100',
  outline: 'bg-transparent text-white border-white/20 hover:bg-white/5',
  ghost: 'bg-transparent text-white border-transparent hover:bg-white/5',
  secondary: 'bg-zinc-800 text-white border-white/10 hover:bg-zinc-700'
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3',
  md: 'h-10 px-4',
  icon: 'h-12 w-12 p-2'
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'default', size = 'md', active = false, className, ...rest },
  ref
) {
  const activeRing = active ? 'ring-2 ring-felixo-purple/60 border-felixo-purple/40' : '';
  return (
    <button
      ref={ref}
      className={cx(base, variants[variant], sizes[size], activeRing, className)}
      {...rest}
    />
  );
});

export default Button;
