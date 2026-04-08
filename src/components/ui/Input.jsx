/**
 * Input.jsx — FSAD-PS34
 * Reusable form input with label, error message, dark mode.
 */

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(function Input(
    { label, error, type = 'text', icon: Icon, className = '', ...props },
    ref
) {
    const [show, setShow] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (show ? 'text' : 'password') : type;

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-[#432513] dark:text-[#f7eee5]">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a7b66] dark:text-[#b99682] pointer-events-none" />
                )}
                <input
                    ref={ref}
                    type={inputType}
                    className={[
                        'w-full h-10 rounded-xl border text-sm transition-colors bg-[#fffaf4] dark:bg-[#221916]',
                        'text-[#2b1d1c] dark:text-[#f7eee5] placeholder-[#a68a79] dark:placeholder-[#8f766a]',
                        'focus:outline-none focus:ring-2 focus:ring-[#c06f30] focus:border-[#c06f30]',
                        Icon ? 'pl-9' : 'pl-3',
                        isPassword ? 'pr-10' : 'pr-3',
                        error
                            ? 'border-red-400 dark:border-red-600'
                            : 'border-[#d8c8b4] dark:border-[#5b4135]',
                        className,
                    ].join(' ')}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShow((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a7b66] dark:text-[#b99682] hover:text-[#6f5b50] dark:hover:text-[#f7eee5]"
                    >
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
            )}
        </div>
    );
});

export default Input;
