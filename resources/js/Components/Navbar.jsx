import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { 
    Menu, 
    X, 
    LayoutDashboard, 
    Send, 
    FolderGit2, 
    Award, 
    Wrench, 
    User,
    Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Tentang', href: '#about', icon: User },
        { label: 'Keahlian', href: '#skills', icon: Wrench },
        { label: 'Proyek', href: '#projects', icon: FolderGit2 },
        { label: 'Sertifikasi', href: '#certificates', icon: Award },
        { label: 'Kontak', href: '#contact', icon: Send },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-[#090d16]/90 backdrop-blur-md py-3 shadow-lg shadow-black/30 border-b border-slate-800/80' 
                    : 'bg-transparent py-5 border-b border-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand / Logo */}
                    <a href="#" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                            <img 
                                src="/images/logo.png" 
                                alt="Rifky Permana Logo" 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <Sparkles className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-base tracking-tight group-hover:text-indigo-300 transition-colors">
                                Rifky Permana
                            </span>
                            <span className="text-[11px] text-indigo-400/90 font-mono tracking-wider font-medium">
                                S.Kom. &bull; Web Dev
                            </span>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800/80">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-all duration-200"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {auth?.user && (
                            <a
                                href="/admin/dashboard"
                                className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5"
                            >
                                <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                                Dashboard
                            </a>
                        )}
                        <a
                            href="#contact"
                            className="relative group px-4 py-2 text-xs font-bold text-white rounded-lg overflow-hidden shadow-md shadow-indigo-600/20 transition-all duration-300 hover:shadow-indigo-600/40"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 transition-all duration-300 group-hover:opacity-90"></span>
                            <span className="relative flex items-center gap-1.5">
                                <Send className="w-3.5 h-3.5" />
                                Hubungi Saya
                            </span>
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900/80 border border-slate-800 focus:outline-none"
                        aria-label="Toggle Navigation"
                    >
                        {mobileOpen ? <X className="w-5 h-5 text-indigo-400" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu with Framer Motion */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden mt-3 p-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl space-y-2 overflow-hidden"
                        >
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 text-slate-300 hover:text-white font-medium py-2.5 px-3 rounded-xl hover:bg-slate-800/80 transition-colors"
                                    >
                                        <Icon className="w-4 h-4 text-indigo-400" />
                                        <span className="text-sm">{item.label}</span>
                                    </a>
                                );
                            })}
                            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                                {auth?.user && (
                                    <a
                                        href="/admin/dashboard"
                                        className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl"
                                    >
                                        <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                                        Dashboard Admin
                                    </a>
                                )}
                                <a
                                    href="#contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30"
                                >
                                    <Send className="w-4 h-4" />
                                    Hubungi Saya
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
