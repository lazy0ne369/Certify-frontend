import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Briefcase, Building2, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import { registerUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import PublicLayout from '../../components/layout/PublicLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const DEPARTMENTS = ['Engineering', 'Analytics', 'Infrastructure', 'Management'];

const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    designation: z.string().min(2, 'Designation is required'),
    department: z.string().min(1, 'Department is required'),
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

const selectClassName = 'w-full h-11 px-3 text-sm rounded-xl border border-[#d8c8b4] dark:border-[#5b4135] bg-[#fffaf4] dark:bg-[#221916] text-[#2b1d1c] dark:text-[#f7eee5] focus:outline-none focus:ring-2 focus:ring-[#c06f30] focus:border-[#c06f30] transition-colors';

export default function RegisterPage() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            department: '',
        },
    });

    const onSubmit = async (formData) => {
        setLoading(true);

        try {
            const result = await registerUser({
                ...formData,
                avatar: '',
            });

            login(result.user, result.token);
            toast.success(`Welcome, ${result.user.name}!`);
            navigate('/user/dashboard', { replace: true });
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
                    className="mx-auto w-full max-w-2xl"
                >
                    <div className="public-surface-strong rounded-[2rem] px-8 py-10">
                        <div className="flex flex-col items-center mb-8">
                            <div className="public-gradient mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_16px_28px_rgba(134,28,28,0.2)]">
                                <ShieldCheck className="w-7 h-7 text-white" strokeWidth={2.5} />
                            </div>
                            <div className="public-pill mb-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                New account
                            </div>
                            <h1 className="font-display text-[2.4rem] font-semibold text-[var(--public-text)] tracking-tight">
                                Create User Account
                            </h1>
                            <p className="public-muted mt-1 text-center text-sm">
                                Register as a normal user and start managing certifications from the platform.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>
                            <Input
                                label="Full Name"
                                type="text"
                                placeholder="Ashish Dohare"
                                icon={User}
                                error={errors.name?.message}
                                {...register('name')}
                            />
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
                                placeholder="Enter password"
                                icon={Lock}
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            <Input
                                label="Designation"
                                type="text"
                                placeholder="Software Engineer"
                                icon={Briefcase}
                                error={errors.designation?.message}
                                {...register('designation')}
                            />

                            <div className="md:col-span-2">
                                <label className="mb-1.5 block text-sm font-medium text-[#432513] dark:text-[#f7eee5]">
                                    Department
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a7b66] dark:text-[#b99682]" />
                                    <select
                                        {...register('department')}
                                        className={`${selectClassName} pl-10`}
                                    >
                                        <option value="" disabled>Select department</option>
                                        {DEPARTMENTS.map((department) => (
                                            <option key={department} value={department}>
                                                {department}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.department?.message && (
                                    <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>
                                )}
                            </div>

                            <div className="md:col-span-2 pt-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    loading={loading}
                                >
                                    {loading ? 'Creating account...' : 'Register'}
                                </Button>
                            </div>
                        </form>

                        <p className="public-muted mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-[#861c1c] dark:text-[#f4b34f] hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
