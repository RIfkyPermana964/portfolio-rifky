import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Layers, Calendar, Tag, ArrowRight } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { GithubIcon } from '@/Components/BrandIcons';
import { ProjectCard } from '@/Components/PortfolioCards';
import { formatDate, storageUrl } from '@/Components/ui';

export default function ProjectDetail({ project, profile, relatedProjects = [] }) {
    const hasLinks = project.demo_url || project.github_url;

    return (
        <PublicLayout profile={profile}>
            <Head>
                <title>{`${project.title} | ${profile?.full_name?.split(',')[0] || 'Rifky Permana'}`}</title>
                <meta name="description" content={project.summary} />
            </Head>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
                <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-slate-200 transition-colors">Beranda</Link>
                    <ChevronRight className="w-4 h-4" />
                    <a href="/#projects" className="hover:text-slate-200 transition-colors">Proyek</a>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-300 truncate">{project.title}</span>
                </nav>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <header className="mb-8">
                        {project.category && (
                            <span className="inline-block px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-emerald-400 mb-4">
                                {project.category}
                            </span>
                        )}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">{project.title}</h1>
                        <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-3xl leading-relaxed">{project.summary}</p>
                    </header>

                    {project.thumbnail && (
                        <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl mb-10">
                            <img src={storageUrl(project.thumbnail)} alt={project.title} className="w-full h-auto max-h-[560px] object-cover" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <article className="lg:col-span-2 glow-card p-6 sm:p-8 rounded-2xl">
                            <h2 className="text-lg font-bold text-white mb-4">Tentang Proyek</h2>
                            <div className="whitespace-pre-line text-slate-300 text-sm sm:text-base leading-relaxed">
                                {project.description || project.summary}
                            </div>
                        </article>

                        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
                            {hasLinks && (
                                <div className="glow-card p-5 rounded-2xl space-y-2">
                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full px-5 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" /> Buka Live Demo
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full px-5 py-3 text-sm font-semibold text-slate-100 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
                                        >
                                            <GithubIcon className="w-4 h-4" /> Lihat Kode di GitHub
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className="glow-card p-5 rounded-2xl space-y-4 text-sm">
                                {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                                    <div>
                                        <p className="text-slate-400 flex items-center gap-2 mb-2">
                                            <Layers className="w-4 h-4 text-emerald-400" /> Tech stack
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech_stack.map((tech) => (
                                                <span key={tech} className="px-2.5 py-1 text-xs font-mono text-slate-200 bg-slate-900 rounded-lg border border-slate-800">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {project.category && (
                                    <div>
                                        <p className="text-slate-400 flex items-center gap-2 mb-1">
                                            <Tag className="w-4 h-4 text-emerald-400" /> Kategori
                                        </p>
                                        <p className="text-slate-200 font-medium">{project.category}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-slate-400 flex items-center gap-2 mb-1">
                                        <Calendar className="w-4 h-4 text-emerald-400" /> Ditambahkan
                                    </p>
                                    <p className="text-slate-200 font-medium">{formatDate(project.created_at, { month: 'long', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </motion.div>

                {relatedProjects.length > 0 && (
                    <section className="mt-20">
                        <div className="flex items-end justify-between gap-4 mb-6">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Proyek Lainnya</h2>
                            <a href="/#projects" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                                Semua proyek <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedProjects.map((p) => (
                                <ProjectCard key={p.id} project={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </PublicLayout>
    );
}
