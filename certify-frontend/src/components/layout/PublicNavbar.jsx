import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, ShieldCheck, Sun, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' },
];

function NavItems({ onNavigate }) {
    const location = useLocation();

    return NAV_LINKS.map((link) => {
        const isActive = location.pathname === link.to;

        return (
            <Link
                key={link.to}
                to={link.to}
                onClick={onNavigate}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive
                        ? 'bg-[#eccbb6]/70 text-[#861c1c] dark:bg-[#861c1c]/30 dark:text-[#f4b34f]'
                        : 'text-[var(--public-muted)] hover:text-[var(--public-text)] hover:bg-white/60 dark:hover:bg-white/6'
                }`}
            >
                {link.label}
            </Link>
        );
    });
}

export default function PublicNavbar() {
    const navigate = useNavigate();
    const { isDark, toggleTheme } = useThemeStore();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);
    const [mobileOpen, setMobileOpen] = useState(false);

    const dashboardLabel = user?.role === 'admin' ? 'Admin Panel' : 'Dashboard';

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--public-border)] bg-[rgba(251,247,239,0.78)] dark:bg-[rgba(24,19,17,0.88)] backdrop-blur-xl shadow-[0_10px_30px_rgba(43,29,28,0.06)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="h-[72px] min-h-[72px] flex items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-3 shrink-0">
                        <div className="w-11 h-11 rounded-[1.15rem] public-gradient flex items-center justify-center shadow-[0_14px_28px_rgba(134,28,28,0.2)]">
                            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.4} />
                        </div>
                        <div>
                            <p className="text-lg font-semibold tracking-tight text-[var(--public-text)]">Certify</p>
                            <p className="text-xs public-muted -mt-0.5">Warm, minimal credential operations</p>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1 rounded-full border border-[var(--public-border)] bg-[rgba(255,250,244,0.62)] dark:bg-[rgba(255,255,255,0.03)] px-2 py-1 shadow-[0_10px_22px_rgba(43,29,28,0.04)]">
                        <NavItems />
                    </nav>

                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            className="relative p-2.5 w-11 h-11 rounded-full text-[var(--public-muted)] hover:bg-white/55 dark:hover:bg-white/6 transition-colors overflow-hidden"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.span
                                        key="sun"
                                        initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <Sun className="w-5 h-5 text-[#f4b34f]" />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="moon"
                                        initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.6, rotate: -90 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <Moon className="w-5 h-5" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        <button
                            onClick={() => navigate(isAuthenticated ? '/redirect' : '/login')}
                            className="px-4 py-2.5 text-sm font-semibold rounded-full text-white bg-[#861c1c] hover:bg-[#742020] shadow-[0_16px_28px_rgba(134,28,28,0.22)] transition-colors"
                        >
                            {isAuthenticated ? dashboardLabel : 'Get Started'}
                        </button>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            className="p-2.5 rounded-full text-[var(--public-muted)] hover:bg-white/55 dark:hover:bg-white/6 transition-colors"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-[#f4b34f]" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setMobileOpen((value) => !value)}
                            aria-label="Toggle navigation"
                            className="p-2.5 rounded-full text-[var(--public-text)] hover:bg-white/55 dark:hover:bg-white/6 transition-colors"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18 }}
                            className="md:hidden pb-4"
                        >
                            <div className="rounded-3xl border border-[var(--public-border)] bg-[var(--public-surface-strong)] shadow-[0_18px_34px_rgba(43,29,28,0.12)] p-3 flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <NavItems onNavigate={() => setMobileOpen(false)} />
                                </div>
                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        navigate(isAuthenticated ? '/redirect' : '/login');
                                    }}
                                    className="mt-2 px-4 py-3 text-sm font-semibold rounded-2xl text-white bg-[#861c1c] hover:bg-[#742020] transition-colors"
                                >
                                    {isAuthenticated ? dashboardLabel : 'Get Started'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
