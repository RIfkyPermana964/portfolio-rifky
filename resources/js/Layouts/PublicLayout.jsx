import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-500 transition-colors cursor-pointer"
                    aria-label="Kembali ke atas"
                >
                    <ArrowUp className="w-5 h-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

/** Shared shell for public pages: ambient background, navbar, footer and back-to-top button. */
export default function PublicLayout({ profile, isHome = false, children }) {
    const { auth } = usePage().props;

    return (
        <MotionConfig reducedMotion="user">
            <div className="bg-[#070d0d] text-slate-100 min-h-screen flex flex-col font-sans relative">
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/15 blur-[120px]" />
                    <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] rounded-full bg-cyan-600/10 blur-[140px]" />
                    <div className="absolute bottom-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-teal-600/10 blur-[130px]" />
                </div>

                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-emerald-600 focus:text-white"
                >
                    Lewati ke konten
                </a>

                <Navbar auth={auth} profile={profile} isHome={isHome} />

                <main id="main" className="flex-grow pt-24 relative z-10">
                    {children}
                </main>

                <Footer profile={profile} isHome={isHome} />
                <BackToTop />
            </div>
        </MotionConfig>
    );
}
