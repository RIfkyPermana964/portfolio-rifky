import React, { useEffect, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
    LayoutDashboard,
    FolderGit2,
    Award,
    Wrench,
    Inbox,
    UserCog,
    ExternalLink,
    LogOut,
    Menu,
    X,
    ArrowLeft,
} from 'lucide-react';
import { cn, FlashToast } from '@/Components/ui';

const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Proyek', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Sertifikat', href: '/admin/certificates', icon: Award },
    { label: 'Keahlian', href: '/admin/skills', icon: Wrench },
    { label: 'Pesan Masuk', href: '/admin/messages', icon: Inbox, badge: 'unreadMessages' },
    { label: 'Profil & Akun', href: '/admin/profile', icon: UserCog },
];

function SidebarContent({ currentUrl, unreadMessages, onNavigate }) {
    const logout = () => router.post('/admin/logout');

    return (
        <div className="flex flex-col h-full">
            <Link href="/admin/dashboard" onClick={onNavigate} className="h-16 flex items-center gap-3 px-5 border-b border-slate-800/80 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1">
                    <img src="/images/logo.png" alt="" className="w-full h-full object-contain" />
                </div>
                <div className="leading-tight">
                    <p className="font-bold text-sm text-white">Admin Panel</p>
                    <p className="text-[11px] text-slate-500">Portofolio Rifky</p>
                </div>
            </Link>

            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">Menu</p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = currentUrl.startsWith(item.href);
                    const count = item.badge === 'unreadMessages' ? unreadMessages : 0;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                                active
                                    ? 'bg-emerald-600/15 text-white border border-emerald-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent',
                            )}
                        >
                            <Icon className={cn('w-[18px] h-[18px]', active ? 'text-emerald-400' : '')} />
                            <span className="flex-1">{item.label}</span>
                            {count > 0 && (
                                <span className="min-w-5 h-5 px-1.5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                                    {count > 99 ? '99+' : count}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-slate-800/80 space-y-1 shrink-0">
                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                    <ExternalLink className="w-[18px] h-[18px]" />
                    Lihat Website
                </a>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                    <LogOut className="w-[18px] h-[18px]" />
                    Keluar
                </button>
            </div>
        </div>
    );
}

/**
 * @param {string} title       Page heading (also used for <title>)
 * @param {string} description Short helper text under the heading
 * @param {ReactNode} actions  Buttons shown on the right of the heading
 * @param {string} backHref    Optional "back" link shown above the heading
 */
export default function AdminLayout({ title, description, actions, backHref, children }) {
    const { url, props } = usePage();
    const { auth, unreadMessages = 0 } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [mobileOpen]);

    const initials = (auth?.user?.name || 'RP')
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <MotionConfig reducedMotion="user">
            <Head title={`${title} · Admin`} />

            <div className="min-h-screen bg-[#070d0d] text-slate-100">
                {/* Desktop sidebar */}
                <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-[#091211] border-r border-slate-800/80 z-30">
                    <SidebarContent currentUrl={url} unreadMessages={unreadMessages} />
                </aside>

                {/* Mobile drawer */}
                <AnimatePresence>
                    {mobileOpen && (
                        <>
                            <motion.div
                                className="lg:hidden fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileOpen(false)}
                            />
                            <motion.aside
                                className="lg:hidden fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#091211] border-r border-slate-800 z-50"
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'tween', duration: 0.22 }}
                            >
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="absolute top-4 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                                    aria-label="Tutup menu"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <SidebarContent
                                    currentUrl={url}
                                    unreadMessages={unreadMessages}
                                    onNavigate={() => setMobileOpen(false)}
                                />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                <div className="lg:pl-64 flex flex-col min-h-screen">
                    {/* Top bar */}
                    <header className="sticky top-0 z-20 h-16 bg-[#070d0d]/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <button
                                onClick={() => setMobileOpen(true)}
                                className="lg:hidden p-2 -ml-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                                aria-label="Buka menu"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <p className="text-sm text-slate-400 truncate">
                                Halo, <span className="text-slate-200 font-semibold">{auth?.user?.name || 'Admin'}</span> 👋
                            </p>
                        </div>
                        <Link
                            href="/admin/profile"
                            className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs ring-2 ring-slate-800 hover:ring-emerald-500/60 transition"
                            title="Profil & Akun"
                        >
                            {initials}
                        </Link>
                    </header>

                    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                        <div className="max-w-6xl mx-auto">
                            {backHref && (
                                <Link
                                    href={backHref}
                                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-3 transition-colors group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                    Kembali
                                </Link>
                            )}
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
                                    {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
                                </div>
                                {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
                            </div>
                            {children}
                        </div>
                    </main>
                </div>
            </div>

            <FlashToast />
        </MotionConfig>
    );
}
