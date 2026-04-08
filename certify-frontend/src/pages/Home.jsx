import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    BadgeCheck,
    BellRing,
    ChartNoAxesCombined,
    Database,
    FileClock,
    Layers3,
    ShieldCheck,
    Sparkles,
    Users,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import PublicLayout from '../components/layout/PublicLayout';
import Button from '../components/ui/Button';

const HERO_POINTS = [
    'Shared visibility across user and admin journeys',
    'Warm, calmer surfaces instead of generic SaaS blue',
    'Real backend persistence for day-to-day certificate work',
];

const FEATURE_CARDS = [
    {
        icon: ShieldCheck,
        title: 'Secure Access Control',
        text: 'Role-aware routes keep users and admins moving through the platform without crossing wires.',
    },
    {
        icon: Database,
        title: 'Reliable Data Storage',
        text: 'Certificates, profiles, and auth state stay backed by the real backend rather than disposable demo data.',
    },
    {
        icon: BellRing,
        title: 'Renewal Visibility',
        text: 'Expiry indicators and reports keep renewal risk visible before important credentials lapse.',
    },
    {
        icon: FileClock,
        title: 'Practical Workflow',
        text: 'The public experience, auth pages, and dashboards feel connected instead of stitched together.',
    },
];

const FLOW_STEPS = [
    {
        step: '01',
        title: 'Start from a clearer public front door',
        text: 'Visitors immediately understand what the platform does, who it serves, and where to go next.',
    },
    {
        step: '02',
        title: 'Move into a guided sign-in flow',
        text: 'Login and registration keep the same warm material language, so the transition feels deliberate and simple.',
    },
    {
        step: '03',
        title: 'Operate with confidence',
        text: 'Users manage their own certifications while admins oversee the organization from a dedicated operational view.',
    },
];

const ROLE_PANELS = [
    {
        icon: BadgeCheck,
        title: 'For Professionals',
        text: 'Keep your credential portfolio organized, visible, and renewal-ready without extra clutter.',
        bullets: ['Personal dashboard', 'Certificate updates', 'Profile details'],
    },
    {
        icon: Users,
        title: 'For Admin Teams',
        text: 'See ownership, certificate health, and upcoming risk across the wider organization.',
        bullets: ['User oversight', 'Shared visibility', 'Expiry reports'],
    },
];

function SectionHeading({ eyebrow, title, text }) {
    return (
        <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[var(--public-accent)]">
                {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--public-text)]">
                {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-7 public-muted">
                {text}
            </p>
        </div>
    );
}

export default function Home() {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <PublicLayout>
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-120px] left-[10%] h-72 w-72 rounded-full bg-[#f4b34f]/22 blur-3xl dark:bg-[#861c1c]/24" />
                    <div className="absolute top-[12%] right-[-40px] h-80 w-80 rounded-full bg-[#c06f30]/18 blur-3xl dark:bg-[#f4b34f]/10" />
                    <div className="absolute bottom-[8%] left-[22%] h-64 w-64 rounded-full bg-[#eccbb6]/32 blur-3xl dark:bg-[#c06f30]/12" />
                    <div className="public-grid absolute inset-0 opacity-60 dark:opacity-25" />
                </div>

                <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-18 sm:px-6 sm:pt-18 sm:pb-24">
                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
                        <motion.div
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="public-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-sm">
                                <Sparkles className="h-4 w-4" />
                                Material-inspired UI with a warmer tone
                            </div>

                            <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.92] tracking-tight text-[var(--public-text)] sm:text-7xl lg:text-[5.4rem]">
                                Certification tracking,
                                <span className="block text-[#861c1c] dark:text-[#f4b34f]">without the raw AI look.</span>
                            </h1>

                            <p className="public-muted mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
                                Certify now opens with softer material surfaces, better hierarchy, and a spiced neutral palette so the product feels calmer, more credible, and easier to use on every screen size.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Button
                                    size="lg"
                                    variant="primary"
                                    onClick={() => navigate(isAuthenticated ? '/redirect' : '/login')}
                                    className="shadow-[0_18px_36px_rgba(134,28,28,0.22)]"
                                >
                                    {isAuthenticated ? 'Open Dashboard' : 'Enter Workspace'}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => navigate('/register')}
                                    className="bg-transparent"
                                >
                                    Create Account
                                </Button>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {HERO_POINTS.map((point) => (
                                    <div
                                        key={point}
                                        className="public-surface rounded-[1.65rem] p-4"
                                    >
                                        <p className="text-sm font-medium leading-6 text-[var(--public-text)]">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.08 }}
                            className="relative"
                        >
                            <div className="public-surface-strong overflow-hidden rounded-[2.2rem]">
                                <div className="public-gradient px-6 py-5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-[#fff4ea]/80">Spiced palette</p>
                                            <h3 className="mt-2 font-display text-[2rem] font-semibold text-white">Calm operational clarity</h3>
                                        </div>
                                        <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-white/16 backdrop-blur-sm">
                                            <Layers3 className="h-7 w-7 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5 p-6 sm:p-7">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-[1.7rem] bg-[#f8f0e4] p-4 dark:bg-[#241b17]">
                                            <p className="text-sm public-muted">Routes</p>
                                            <p className="mt-1 text-3xl font-bold text-[var(--public-text)]">2</p>
                                            <p className="mt-2 text-sm public-muted">User and admin journeys stay clearly separated.</p>
                                        </div>
                                        <div className="rounded-[1.7rem] bg-[#2b1d1c] p-4 text-[#fff7ef]">
                                            <p className="text-sm text-[#eccbb6]">Persistence</p>
                                            <p className="mt-1 text-3xl font-bold">MySQL</p>
                                            <p className="mt-2 text-sm text-[#f1ddd0]/80">Data survives reloads, refreshes, and repeat visits.</p>
                                        </div>
                                    </div>

                                    <div className="rounded-[1.9rem] border border-[var(--public-border)] bg-[rgba(255,249,241,0.55)] p-5 dark:bg-[rgba(255,255,255,0.02)]">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-[var(--public-text)]">Experience health</p>
                                                <p className="mt-1 text-sm public-muted">From public entry to renewal awareness</p>
                                            </div>
                                            <ChartNoAxesCombined className="h-5 w-5 text-[#c06f30] dark:text-[#f4b34f]" />
                                        </div>
                                        <div className="mt-5 space-y-4">
                                            {[
                                                { label: 'Entry clarity', value: '94%', fill: 'linear-gradient(90deg, #861c1c, #c06f30)' },
                                                { label: 'Dashboard readability', value: '87%', fill: 'linear-gradient(90deg, #c06f30, #f4b34f)' },
                                                { label: 'Renewal visibility', value: '79%', fill: 'linear-gradient(90deg, #2b1d1c, #861c1c)' },
                                            ].map((item) => (
                                                <div key={item.label}>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="public-muted">{item.label}</span>
                                                        <span className="font-semibold text-[var(--public-text)]">{item.value}</span>
                                                    </div>
                                                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#eadfce] dark:bg-[#332723]">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{ width: item.value, background: item.fill }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-24">
                    <SectionHeading
                        eyebrow="Why It Feels Better"
                        title="A landing page that looks designed, not generated"
                        text="The layout now leans on warm contrast, editorial typography, and restrained motion so the product feels more trustworthy and more polished without becoming visually noisy."
                    />

                    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {FEATURE_CARDS.map(({ icon: Icon, title, text }) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.35 }}
                                className="public-surface rounded-[1.8rem] p-6"
                            >
                                <div className="public-gradient-soft flex h-12 w-12 items-center justify-center rounded-2xl">
                                    <Icon className="h-6 w-6 text-[#861c1c] dark:text-[#f4b34f]" />
                                </div>
                                <h3 className="mt-5 text-xl font-bold text-[var(--public-text)]">{title}</h3>
                                <p className="mt-3 text-sm leading-7 public-muted">{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="public-section-line relative">
                    <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-24">
                        <SectionHeading
                            eyebrow="Flow"
                            title="A smoother path from arrival to action"
                            text="Instead of feeling like a default template, the public journey now explains itself clearly and carries the same design language into authentication."
                        />

                        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
                            {FLOW_STEPS.map((item) => (
                                <div
                                    key={item.step}
                                    className="public-surface rounded-[1.9rem] p-6"
                                >
                                    <p className="text-sm font-black tracking-[0.22em] uppercase text-[#861c1c] dark:text-[#f4b34f]">
                                        {item.step}
                                    </p>
                                    <h3 className="mt-4 text-2xl font-bold text-[var(--public-text)]">{item.title}</h3>
                                    <p className="mt-4 text-sm leading-7 public-muted">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-24">
                    <SectionHeading
                        eyebrow="Roles"
                        title="Designed for both individual tracking and team oversight"
                        text="The refreshed visual system still supports the practical side of the product: clear status, clear ownership, and clear next steps for the people who use it every day."
                    />

                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {ROLE_PANELS.map(({ icon: Icon, title, text, bullets }) => (
                            <div
                                key={title}
                                className="public-surface-strong rounded-[2rem] p-7"
                            >
                                <div className="public-gradient flex h-14 w-14 items-center justify-center rounded-[1.6rem] shadow-[0_16px_30px_rgba(134,28,28,0.18)]">
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-[var(--public-text)]">{title}</h3>
                                <p className="mt-3 text-base leading-7 public-muted">{text}</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {bullets.map((bullet) => (
                                        <span
                                            key={bullet}
                                            className="rounded-full bg-[#efe2d3] px-3 py-2 text-sm font-medium text-[#5c4337] dark:bg-[#2a1f1b] dark:text-[#f0dfd0]"
                                        >
                                            {bullet}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="relative mx-auto max-w-7xl px-4 pb-18 sm:px-6 sm:pb-24">
                    <div className="overflow-hidden rounded-[2.25rem] border border-[rgba(236,203,182,0.2)] bg-[linear-gradient(135deg,#2b1d1c_0%,#5a201d_42%,#c06f30_100%)] shadow-[0_28px_80px_rgba(43,29,28,0.24)]">
                        <div className="flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-14">
                            <div className="max-w-2xl">
                                <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#f1d9c6]">Ready to start</p>
                                <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                                    Give certification tracking a more polished first impression.
                                </h2>
                                <p className="mt-4 text-base leading-8 text-[#fff2e4]/88 sm:text-lg">
                                    Sign in with the seeded credentials or create a fresh user account and move into the platform through a design system that feels far more intentional.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    size="lg"
                                    variant="primary"
                                    onClick={() => navigate('/login')}
                                    className="border-none bg-white !text-[#2b1d1c] hover:bg-[#f7eee5]"
                                >
                                    Login
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => navigate('/register')}
                                    className="border-[#f1d9c6]/40 text-white hover:bg-white/10"
                                >
                                    Register User
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
