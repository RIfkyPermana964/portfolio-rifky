import React from 'react';
import { Link } from '@inertiajs/react';
import { Code2, Star, ArrowRight, ExternalLink, Award, Calendar } from 'lucide-react';
import { GithubIcon } from '@/Components/BrandIcons';
import { Badge, formatDate, storageUrl } from '@/Components/ui';

export function ProjectCard({ project }) {
    return (
        <article className="glow-card rounded-2xl overflow-hidden flex flex-col group relative h-full">
            <div className="relative aspect-video bg-slate-900 overflow-hidden border-b border-slate-800/80">
                {project.thumbnail ? (
                    <img
                        src={storageUrl(project.thumbnail)}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-[#0b1514] flex items-center justify-center">
                        <Code2 className="w-12 h-12 text-slate-700" />
                    </div>
                )}
                <div className="absolute top-3 left-3 flex gap-1.5">
                    {project.category && (
                        <span className="px-2.5 py-1 bg-slate-950/90 backdrop-blur-md rounded-md text-[11px] font-semibold text-emerald-300 border border-slate-800">
                            {project.category}
                        </span>
                    )}
                    {project.is_featured && (
                        <span className="px-2 py-1 bg-amber-500/90 rounded-md text-[11px] font-bold text-slate-950 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Unggulan
                        </span>
                    )}
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                    {/* Stretched link: the whole card is clickable */}
                    <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus:outline-none">
                        {project.title}
                    </Link>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">{project.summary}</p>

                {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tech_stack.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 text-[11px] font-mono text-slate-300 bg-slate-900/90 rounded border border-slate-800">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-5 py-3.5 border-t border-slate-800/80 flex items-center justify-between text-sm">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    Lihat detail <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <div className="flex items-center gap-1 relative z-10">
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            aria-label="Repository GitHub"
                            title="Repository GitHub"
                        >
                            <GithubIcon className="w-4 h-4" />
                        </a>
                    )}
                    {project.demo_url && (
                        <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            aria-label="Live demo"
                            title="Live demo"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export function CertificateCard({ cert, onOpenImage }) {
    return (
        <article className="glow-card rounded-2xl flex flex-col overflow-hidden h-full">
            {cert.image && (
                <button
                    type="button"
                    onClick={() => onOpenImage?.(cert)}
                    className="relative aspect-[16/10] bg-slate-900 border-b border-slate-800 overflow-hidden group cursor-zoom-in"
                    aria-label={`Perbesar gambar ${cert.title}`}
                >
                    <img src={storageUrl(cert.image)} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </button>
            )}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-4">
                    {!cert.image && (
                        <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <Award className="w-5 h-5" />
                        </div>
                    )}
                    {cert.category && <Badge color="slate" className="ml-auto">{cert.category}</Badge>}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{cert.title}</h3>
                <p className="text-sm font-semibold text-emerald-400 mb-3">{cert.issuer}</p>
                {cert.description && <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">{cert.description}</p>}

                <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm">
                    <span className="text-slate-400 text-xs flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {cert.issue_date ? formatDate(cert.issue_date, { month: 'long', year: 'numeric' }) : 'Terbaru'}
                    </span>
                    {cert.credential_url && (
                        <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                        >
                            Verifikasi <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
