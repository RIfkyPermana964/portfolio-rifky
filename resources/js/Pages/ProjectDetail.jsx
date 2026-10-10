import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { ArrowLeft, ExternalLink, Sparkles, Layers } from 'lucide-react';

export default function ProjectDetail({ project, profile }) {
    return (
        <div className="bg-[#090d16] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-indigo-600 selection:text-white relative">
            <Head>
                <title>{`${project?.title || 'Detail Proyek'} | Rifky Permana`}</title>
                <meta name="description" content={project?.summary || 'Detail proyek aplikasi web'} />
            </Head>

            {/* Ambient Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px]"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[140px]"></div>
            </div>

            <Navbar auth={null} profile={profile} />

            <main className="flex-grow pt-28 pb-16 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Back Link */}
                    <Link 
                        href="/#projects" 
                        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span>Kembali ke Daftar Proyek</span>
                    </Link>

                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Category Badge */}
                        {project.category && (
                            <div className="inline-block px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-indigo-400">
                                {project.category}
                            </div>
                        )}

                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                            {project.title}
                        </h1>

                        {/* Tech Stack Badges */}
                        {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {project.tech_stack.map((tech, idx) => (
                                    <span 
                                        key={idx}
                                        className="px-3 py-1 text-xs font-mono text-slate-200 bg-slate-900 rounded-lg border border-slate-800"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Action Links */}
                        <div className="flex flex-wrap gap-3 pt-2 pb-6 border-b border-slate-800/80">
                            {project.demo_url && (
                                <a 
                                    href={project.demo_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>Live Demo / Uji Coba</span>
                                </a>
                            )}
                            {project.github_url && (
                                <a 
                                    href={project.github_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-5 py-2.5 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2"
                                >
                                    <i className="ri-github-line text-base"></i>
                                    <span>Kode Sumber (GitHub)</span>
                                </a>
                            )}
                        </div>

                        {/* Thumbnail Image */}
                        {project.thumbnail && (
                            <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                                <img 
                                    src={`/storage/${project.thumbnail}`} 
                                    alt={project.title} 
                                    className="w-full h-auto max-h-[500px] object-cover"
                                />
                            </div>
                        )}

                        {/* Project Description Content */}
                        <div className="glow-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 text-slate-300 leading-relaxed text-sm">
                            <h2 className="text-base sm:text-lg font-bold text-white mb-2">Ringkasan Proyek</h2>
                            <p className="text-sm text-slate-200 leading-relaxed">{project.summary}</p>

                            {project.description && (
                                <>
                                    <hr className="border-slate-800/80 my-6" />
                                    <h2 className="text-base sm:text-lg font-bold text-white mb-2">Penjelasan Detail &amp; Fitur Utama</h2>
                                    <div className="whitespace-pre-line text-slate-300 text-xs sm:text-sm leading-relaxed">
                                        {project.description}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>

                </div>
            </main>

            <Footer profile={profile} />
        </div>
    );
}
