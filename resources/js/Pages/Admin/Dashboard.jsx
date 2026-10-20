import React from 'react';
import { Link } from '@inertiajs/react';
import { FolderGit2, Award, Wrench, Inbox, Plus, ArrowRight, Mail, Code2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Badge, Button, Card, EmptyState, cn, formatDate, storageUrl, timeAgo } from '@/Components/ui';

function StatCard({ label, value, icon: Icon, href, tone, note }) {
    const tones = {
        indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        violet: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    };
    return (
        <Link href={href} className="group">
            <Card className="p-5 h-full transition-colors group-hover:border-slate-700">
                <div className="flex items-start justify-between">
                    <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center', tones[tone])}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-3xl font-extrabold text-white mt-4">{value}</p>
                <p className="text-sm text-slate-400 mt-0.5">{label}</p>
                {note && <p className="text-xs text-rose-300 mt-2 font-medium">{note}</p>}
            </Card>
        </Link>
    );
}

export default function Dashboard({ stats, recentProjects = [], recentMessages = [] }) {
    return (
        <AdminLayout
            title="Dashboard"
            description="Ringkasan isi portofolio dan aktivitas terbaru."
            actions={
                <>
                    <Button href="/admin/certificates/create" variant="secondary">
                        <Plus className="w-4 h-4" /> Sertifikat
                    </Button>
                    <Button href="/admin/projects/create">
                        <Plus className="w-4 h-4" /> Proyek Baru
                    </Button>
                </>
            }
        >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard label="Proyek" value={stats.projects} icon={FolderGit2} href="/admin/projects" tone="indigo" />
                <StatCard label="Sertifikat" value={stats.certificates} icon={Award} href="/admin/certificates" tone="cyan" />
                <StatCard label="Keahlian" value={stats.skills} icon={Wrench} href="/admin/skills" tone="violet" />
                <StatCard
                    label="Pesan Masuk"
                    value={stats.messages}
                    icon={Inbox}
                    href="/admin/messages"
                    tone="emerald"
                    note={stats.unreadMessages > 0 ? `${stats.unreadMessages} belum dibaca` : null}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Recent projects */}
                <Card className="lg:col-span-3 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
                        <h2 className="font-bold text-white">Proyek Terbaru</h2>
                        <Link href="/admin/projects" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                            Lihat semua
                        </Link>
                    </div>
                    {recentProjects.length === 0 ? (
                        <EmptyState
                            icon={FolderGit2}
                            title="Belum ada proyek"
                            description="Tambahkan proyek pertama agar tampil di halaman portofolio."
                            action={
                                <Button href="/admin/projects/create" size="sm">
                                    <Plus className="w-4 h-4" /> Tambah Proyek
                                </Button>
                            }
                        />
                    ) : (
                        <ul className="divide-y divide-slate-800/80">
                            {recentProjects.map((project) => (
                                <li key={project.id}>
                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-800/30 transition-colors"
                                    >
                                        <div className="w-14 h-10 shrink-0 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center">
                                            {project.thumbnail ? (
                                                <img src={storageUrl(project.thumbnail)} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <Code2 className="w-4 h-4 text-slate-500" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-white truncate">{project.title}</p>
                                            <p className="text-xs text-slate-500">{formatDate(project.created_at)}</p>
                                        </div>
                                        <Badge className="hidden sm:inline-flex">{project.category}</Badge>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>

                {/* Recent messages */}
                <Card className="lg:col-span-2 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
                        <h2 className="font-bold text-white">Pesan Terbaru</h2>
                        <Link href="/admin/messages" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                            Buka inbox
                        </Link>
                    </div>
                    {recentMessages.length === 0 ? (
                        <EmptyState icon={Mail} title="Belum ada pesan" description="Pesan dari form kontak akan muncul di sini." />
                    ) : (
                        <ul className="divide-y divide-slate-800/80">
                            {recentMessages.map((msg) => (
                                <li key={msg.id}>
                                    <Link href="/admin/messages" className="block px-5 py-3.5 hover:bg-slate-800/30 transition-colors">
                                        <div className="flex items-center gap-2">
                                            {!msg.is_read && <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" title="Belum dibaca" />}
                                            <p className={cn('text-sm truncate flex-1', msg.is_read ? 'text-slate-300' : 'text-white font-semibold')}>
                                                {msg.name}
                                            </p>
                                            <span className="text-[11px] text-slate-500 shrink-0">{timeAgo(msg.created_at)}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                            {msg.subject ? `${msg.subject} — ` : ''}
                                            {msg.message}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}
