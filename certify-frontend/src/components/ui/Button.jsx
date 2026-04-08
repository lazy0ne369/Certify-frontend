/**
 * Button.jsx — FSAD-PS34
 * Reusable button with variants, loading state, dark mode.
 */

import { Loader2 } from 'lucide-react';

const VARIANTS = {
    primary: 'bg-[#861c1c] hover:bg-[#742020] active:bg-[#611717] text-[#fff8f1] shadow-[0_16px_34px_rgba(134,28,28,0.18)]',
    secondary: 'bg-[#e8e3cf] hover:bg-[#ddd4bf] dark:bg-[#2b1d1c] dark:hover:bg-[#372420] text-[#2b1d1c] dark:text-[#f7eee5]',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm',
    ghost: 'hover:bg-[#f0e6d8] dark:hover:bg-[#2b1d1c] text-[#6f5b50] dark:text-[#cbb7a7]',
    outline: 'border border-[#d8c8b4] dark:border-[#5b4135] hover:bg-[#fff8f1] dark:hover:bg-[#241915] text-[#432513] dark:text-[#f7eee5]',
};

const SIZES = {
    sm: 'h-8  px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-sm',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) {
    const isDisabled = disabled || loading;

    return (
        <button
            disabled={isDisabled}
            className={[
                'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-[#c06f30] focus:ring-offset-1 focus:ring-offset-transparent',
                'disabled:opacity-60 disabled:cursor-not-allowed',
                VARIANTS[variant] ?? VARIANTS.primary,
                SIZES[size] ?? SIZES.md,
                fullWidth ? 'w-full' : '',
                className,
            ].join(' ')}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}
