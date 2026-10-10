import React from 'react';
import { Mail, Heart, Sparkles } from 'lucide-react';

export default function Footer({ profile }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050811] border-t border-slate-800/80 py-12 mt-20 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-indigo-600/10 blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand info */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1 shadow-sm">
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-200 text-sm tracking-tight">
                                {profile?.full_name || 'Rifky Permana, S.Kom.'}
                            </p>
                            <p className="text-xs text-slate-400">
                                Fresh Graduate Informatika &bull; Full-stack Web Developer
                            </p>
                        </div>
                    </div>

                    {/* Quick navigation */}
                    <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-medium">
                        <a href="#about" className="hover:text-indigo-400 transition-colors">Tentang</a>
                        <a href="#skills" className="hover:text-indigo-400 transition-colors">Keahlian</a>
                        <a href="#projects" className="hover:text-indigo-400 transition-colors">Proyek</a>
                        <a href="#certificates" className="hover:text-indigo-400 transition-colors">Sertifikasi</a>
                        <a href="#contact" className="hover:text-indigo-400 transition-colors">Kontak</a>
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center space-x-3">
                        <a 
                            href={profile?.github_url || 'https://github.com'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-all duration-200"
                            title="GitHub"
                        >
                            <i className="ri-github-fill text-lg"></i>
                        </a>
                        <a 
                            href={profile?.linkedin_url || 'https://linkedin.com'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-all duration-200"
                            title="LinkedIn"
                        >
                            <i className="ri-linkedin-fill text-lg"></i>
                        </a>
                        <a 
                            href={`mailto:${profile?.email || 'rifkypermana.dev@gmail.com'}`} 
                            className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-all duration-200"
                            title="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-900/90 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
                    <p>&copy; {currentYear} {profile?.full_name || 'Rifky Permana'}. Hak cipta dilindungi.</p>
                    <p className="flex items-center gap-1.5">
                        Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> menggunakan{' '}
                        <span className="text-indigo-400 font-semibold">Laravel + React (Inertia.js)</span> &amp; Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}
