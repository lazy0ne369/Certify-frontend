import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Info, Lock, Mail, ShieldCheck } from 'lucide-react';
import { loginUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import PublicLayout from '../../components/layout/PublicLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const schema = z.object({
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const cardAnim = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

function CredChip({ label, email, password, onFill }) {
    return (
        <button
            type="button"
            onClick={() => onFill(email, password)}
            className="flex w-full flex-col items-start rounded-[1rem] border border-[#e3d2bd] bg-[#fbf5ec] px-3 py-2 text-left transition-colors hover:bg-[#f4eadc] dark:border-[#4b372d] dark:bg-[#241b17] dark:hover:bg-[#2b201b]"
        >
            <span className="text-[10px] font-semibold uppercase tracking-wide text-[#861c1c] dark:text-[#f4b34f]">{label}</span>
            <span className="font-mono text-xs text-[#6f5b50] dark:text-[#e6d0bf]">{email}</span>
            <span className="font-mono text-xs text-[#a28776] dark:text-[#a28776]">pw: {password}</span>
        </button>
    );
}

export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const fillCredentials = (email, password) => {
        setValue('email', email, { shouldValidate: true });
        setValue('password', password, { shouldValidate: true });
    };

    const onSubmit = async ({ email, password }) => {
        setLoading(true);

        try {
            const result = await loginUser(email, password);
            login(result.user, result.token);
            toast.success(`Welcome back, ${result.user.name}!`);
            navigate(result.user.role?.toUpperCase() === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard', { replace: true });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PublicLayout>
            <div className="min-h-[calc(100vh-72px)] px-4 py-10">
                <motion.div
                    variants={cardAnim}
                    initial="hidden"
                    animate="visible"
                    className="mx-auto w-full max-w-md"
                >
                    <div className="public-surface-strong rounded-[2rem] px-8 py-10">
                        <div className="flex flex-col items-center mb-8">
                            <div className="public-gradient mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_16px_28px_rgba(134,28,28,0.2)]">
                                <ShieldCheck className="w-7 h-7 text-white" strokeWidth={2.5} />
                            </div>
                            <div className="public-pill mb-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                Sign in
                            </div>
                            <h1 className="font-display text-[2.4rem] font-semibold text-[var(--public-text)] tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="public-muted mt-1 text-center text-sm">
                                Login to continue managing certifications and renewal workflows.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                icon={Mail}
                                error={errors.email?.message}
                                {...register('email')}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                icon={Lock}
                                error={errors.password?.message}
                                {...register('password')}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={loading}
                                className="mt-2"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>

                        <p className="public-muted mt-4 text-center text-sm">
                            New user?{' '}
                            <Link to="/register" className="font-semibold text-[#861c1c] dark:text-[#f4b34f] hover:underline">
                                Create an account
                            </Link>
                        </p>

                        <div className="mt-6">
                            <div className="flex items-center gap-1.5 mb-2">
                                <Info className="h-3.5 w-3.5 text-[#c06f30] dark:text-[#f4b34f]" />
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#861c1c] dark:text-[#f4b34f]">
                                    Test credentials - click to fill
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <CredChip
                                    label="User"
                                    email="ashish@gmail.com"
                                    password="user123"
                                    onFill={fillCredentials}
                                />
                                <CredChip
                                    label="Admin"
                                    email="admin@gmail.com"
                                    password="admin123"
                                    onFill={fillCredentials}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
