import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X, LayoutDashboard, Send, FolderGit2, Award, Wrench, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/Components/ui';

export const sections = [
    { id: 'about', label: 'Tentang', icon: User },
    { id: 'skills', label: 'Keahlian', icon: Wrench },
    { id: 'projects', label: 'Proyek', icon: FolderGit2 },
    { id: 'certificates', label: 'Sertifikasi', icon: Award },
    { id: 'contact', label: 'Kontak', icon: Send },
];

// Highlights the section currently in view (home page only).
function useActiveSection(enabled) {
    const [active, setActive] = useState(null);

    useEffect(() => {
        if (!enabled) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );
        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [enabled]);

    return active;
}

function Logo({ profile }) {
    const [imgFailed, setImgFailed] = useState(false);
    const displayName = profile?.full_name ? profile.full_name.split(',')[0].trim() : 'Rifky Permana';
    const tagline = profile?.sub_title || 'S.Kom. • Web Dev';

    return (
        <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:border-indigo-500/50">
                {imgFailed ? (
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                ) : (
                    <img src="/images/logo.png" alt="" className="w-full h-full object-contain" onError={() => setImgFailed(true)} />
                )}
            </div>
            <div className="flex flex-col leading-tight">
                <span className="font-bold text-white text-[15px] tracking-tight group-hover:text-indigo-300 transition-colors">
                    {displayName}
                </span>
                <span className="text-[11px] text-indigo-400/90 font-mono tracking-wide">{tagline}</span>
            </div>
        </Link>
    );
}

export default function Navbar({ auth, profile, isHome = false }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const active = useActiveSection(isHome);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
        const onResize = () => window.innerWidth >= 768 && setMobileOpen(false);
        document.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
        return () => {
            document.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
        };
    }, [mobileOpen]);

    // On other pages the section links point back to the home page.
    const hrefFor = (id) => (isHome ? `#${id}` : `/#${id}`);

    return (
        <header
            className={cn(
                'fixed top-0 inset-x-0 z-50 transition-all duration-300',
                scrolled || mobileOpen
                    ? 'bg-[#090d16]/90 backdrop-blur-md py-3 shadow-lg shadow-black/30 border-b border-slate-800/80'
                    : 'bg-transparent py-4 border-b border-transparent',
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4">
                    <Logo profile={profile} />

                    <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-slate-800/80" aria-label="Navigasi utama">
                        {sections.map((item) => (
                            <a
                                key={item.id}
                                href={hrefFor(item.id)}
                                aria-current={active === item.id ? 'true' : undefined}
                                className={cn(
                                    'px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors',
                                    active === item.id
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70',
                                )}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-2">
                        {auth?.user && (
                            <Link
                                href="/admin/dashboard"
                                className="px-3.5 py-2 text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 rounded-xl transition-colors flex items-center gap-1.5"
                            >
                                <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                                Dashboard
                            </Link>
                        )}
                        <a
                            href={hrefFor('contact')}
                            className="px-4 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/25 transition-all flex items-center gap-1.5"
                        >
                            <Send className="w-4 h-4" />
                            Hubungi Saya
                        </a>
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-slate-200 p-2 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer"
                        aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden"
                            aria-label="Navigasi seluler"
                        >
                            <div className="pt-4 pb-2 space-y-1">
                                {sections.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <a
                                            key={item.id}
                                            href={hrefFor(item.id)}
                                            onClick={() => setMobileOpen(false)}
                                            className={cn(
                                                'flex items-center gap-3 py-3 px-3 rounded-xl text-base font-medium transition-colors',
                                                active === item.id ? 'bg-indigo-600/15 text-white' : 'text-slate-300 hover:bg-slate-800/80',
                                            )}
                                        >
                                            <Icon className="w-5 h-5 text-indigo-400" />
                                            {item.label}
                                        </a>
                                    );
                                })}
                                {auth?.user && (
                                    <Link
                                        href="/admin/dashboard"
                                        className="flex items-center gap-3 py-3 px-3 rounded-xl text-base font-medium text-slate-300 hover:bg-slate-800/80"
                                    >
                                        <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                                        Dashboard Admin
                                    </Link>
                                )}
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
