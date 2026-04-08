/**
 * Navbar.jsx — FSAD-PS34
 * Glassmorphism top bar with dark mode, notifications, user avatar dropdown.
 * < 200 lines
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Bell, ChevronDown, LogOut, User, ShieldCheck, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { useUIStore } from '../../store/uiStore';
import { cardVariants } from '../../animations/variants';
import { getInitials, avatarColor } from '../../utils/helpers';

const NOTIF_COUNT = 3;

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const { isDark, toggleTheme } = useThemeStore();
    const { toggleSidebar } = useUIStore();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const profilePath = user?.role === 'admin' ? '/admin/dashboard' : '/user/profile';
    const initials = getInitials(user?.name ?? 'U');
    const bgColor = avatarColor(user?.name ?? '');

    return (
        <header className="sticky top-0 z-40 w-full border-b border-[rgba(120,85,57,0.16)] dark:border-[rgba(236,203,182,0.08)] backdrop-blur-md bg-[rgba(251,247,239,0.72)] dark:bg-[rgba(20,16,15,0.82)] shadow-[0_10px_30px_rgba(43,29,28,0.06)]">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

                {/* Left — Hamburger (mobile) + Logo */}
                <div className="flex items-center gap-2">
                    {/* Hamburger — mobile only */}
                    <button
                        onClick={toggleSidebar}
                        aria-label="Toggle navigation menu"
                        className="lg:hidden p-2 rounded-lg text-[var(--public-muted)] hover:bg-white/60 dark:hover:bg-white/6 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Go to home">
                        <div className="w-8 h-8 rounded-lg public-gradient flex items-center justify-center shadow-[0_12px_22px_rgba(134,28,28,0.18)]">
                            <ShieldCheck className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-lg font-bold text-[var(--public-text)] tracking-tight">
                            Certify
                        </span>
                    </Link>
                </div>

                {/* Right — Controls */}
                <div className="flex items-center gap-2 sm:gap-3">

                    {/* Dark mode toggle — animated icon swap */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle dark mode"
                        className="relative p-2 w-9 h-9 rounded-lg text-[var(--public-muted)] hover:bg-white/60 dark:hover:bg-white/6 transition-colors overflow-hidden"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isDark ? (
                                <motion.span
                                    key="sun"
                                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Sun className="w-5 h-5 text-[#f4b34f]" />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="moon"
                                    initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Moon className="w-5 h-5" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Notification bell */}
                    <button
                        aria-label="Notifications"
                        className="relative p-2 rounded-lg text-[var(--public-muted)] hover:bg-white/60 dark:hover:bg-white/6 transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                        {NOTIF_COUNT > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                {NOTIF_COUNT}
                            </span>
                        )}
                    </button>

                    {/* Avatar + dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen((v) => !v)}
                            aria-expanded={dropdownOpen}
                            aria-haspopup="true"
                            aria-label="Open user menu"
                            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-white/60 dark:hover:bg-white/6 transition-colors"
                        >
                            {/* Avatar */}
                            {user?.avatar
                                ? <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                                : (
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${bgColor}`}>
                                        {initials}
                                    </span>
                                )
                            }
                            <span className="hidden sm:block text-sm font-medium text-[var(--public-text)] max-w-[120px] truncate">
                                {user?.name}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-[var(--public-muted)] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute right-0 mt-2 w-52 rounded-xl shadow-[0_20px_42px_rgba(43,29,28,0.12)] border border-[rgba(120,85,57,0.14)] dark:border-[rgba(236,203,182,0.08)] bg-[rgba(255,248,240,0.96)] dark:bg-[rgba(35,27,23,0.96)] overflow-hidden z-50"
                                >
                                    {/* User info row */}
                                    <div className="px-4 py-3 border-b border-[rgba(120,85,57,0.12)] dark:border-[rgba(236,203,182,0.08)]">
                                        <p className="text-sm font-semibold text-[var(--public-text)] truncate">{user?.name}</p>
                                        <p className="text-xs text-[var(--public-muted)] truncate">{user?.email}</p>
                                    </div>
                                    {/* Profile link */}
                                    <Link
                                        to={profilePath}
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--public-text)] hover:bg-[#f7eee5] dark:hover:bg-white/4 transition-colors"
                                    >
                                        <User className="w-4 h-4 text-[#c06f30]" />
                                        Profile
                                    </Link>
                                    {/* Logout */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </header>
    );
}
