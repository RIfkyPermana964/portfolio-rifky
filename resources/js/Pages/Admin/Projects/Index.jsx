import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, FolderGit2, Code2, Star, ExternalLink } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Badge, Button, Card, ConfirmDialog, EmptyState, Pagination, SearchBox, formatDate, storageUrl } from '@/Components/ui';

function Thumb({ project }) {
    return (
        <div className="w-16 h-11 shrink-0 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center">
            {project.thumbnail ? (
                <img src={storageUrl(project.thumbnail)} alt="" className="w-full h-full object-cover" />
            ) : (
                <Code2 className="w-4 h-4 text-slate-500" />
            )}
        </div>
    );
}

export default function ProjectsIndex({ projects, filters }) {
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const confirmDelete = () => {
        setDeleting(true);
        router.delete(`/admin/projects/${toDelete.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleting(false);
                setToDelete(null);
            },
        });
    };

    const items = projects.data;

    return (
        <AdminLayout
            title="Proyek"
            description="Kelola proyek yang tampil di halaman portofolio."
            actions={
                <Button href="/admin/projects/create">
                    <Plus className="w-4 h-4" /> Tambah Proyek
                </Button>
            }
        >
            <Card className="overflow-hidden">
                <div className="p-4 border-b border-slate-800/80">
                    <SearchBox
                        url="/admin/projects"
                        value={filters.search}
                        placeholder="Cari judul, kategori, atau ringkasan..."
                        className="sm:max-w-sm"
                    />
                </div>

                {items.length === 0 ? (
                    filters.search ? (
                        <EmptyState icon={FolderGit2} title="Tidak ditemukan" description={`Tidak ada proyek yang cocok dengan "${filters.search}".`} />
                    ) : (
                        <EmptyState
                            icon={FolderGit2}
                            title="Belum ada proyek"
                            description="Proyek yang kamu tambahkan akan tampil di halaman depan."
                            action={
                                <Button href="/admin/projects/create">
                                    <Plus className="w-4 h-4" /> Tambah Proyek Pertama
                                </Button>
                            }
                        />
                    )
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800/80">
                                    <tr>
                                        <th className="px-5 py-3 font-semibold">Proyek</th>
                                        <th className="px-5 py-3 font-semibold">Kategori</th>
                                        <th className="px-5 py-3 font-semibold">Tech Stack</th>
                                        <th className="px-5 py-3 font-semibold">Dibuat</th>
                                        <th className="px-5 py-3 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {items.map((project) => (
                                        <tr key={project.id} className="hover:bg-slate-800/25 transition-colors">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <Thumb project={project} />
                                                    <div className="min-w-0">
                                                        <Link
                                                            href={`/admin/projects/${project.id}/edit`}
                                                            className="font-semibold text-white hover:text-emerald-300 flex items-center gap-1.5"
                                                        >
                                                            {project.title}
                                                            {project.is_featured && (
                                                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" aria-label="Unggulan" />
                                                            )}
                                                        </Link>
                                                        <p className="text-xs text-slate-500 line-clamp-1 max-w-md">{project.summary}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <Badge>{project.category}</Badge>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex flex-wrap gap-1 max-w-[14rem]">
                                                    {(project.tech_stack || []).slice(0, 3).map((t) => (
                                                        <Badge key={t} color="slate">{t}</Badge>
                                                    ))}
                                                    {(project.tech_stack || []).length > 3 && (
                                                        <Badge color="slate">+{project.tech_stack.length - 3}</Badge>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">{formatDate(project.created_at)}</td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center justify-end gap-1">
                                                    <a
                                                        href={`/projects/${project.slug}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                                        title="Lihat di website"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                    <Link
                                                        href={`/admin/projects/${project.id}/edit`}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setToDelete(project)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile list */}
                        <ul className="md:hidden divide-y divide-slate-800/60">
                            {items.map((project) => (
                                <li key={project.id} className="p-4 flex gap-3">
                                    <Thumb project={project} />
                                    <div className="min-w-0 flex-1">
                                        <Link href={`/admin/projects/${project.id}/edit`} className="font-semibold text-white text-sm flex items-center gap-1.5">
                                            <span className="truncate">{project.title}</span>
                                            {project.is_featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge>{project.category}</Badge>
                                            <span className="text-xs text-slate-500">{formatDate(project.created_at)}</span>
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <Button href={`/admin/projects/${project.id}/edit`} variant="secondary" size="sm">
                                                <Pencil className="w-3.5 h-3.5" /> Edit
                                            </Button>
                                            <Button variant="danger-ghost" size="sm" onClick={() => setToDelete(project)}>
                                                <Trash2 className="w-3.5 h-3.5" /> Hapus
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <Pagination meta={projects} />
            </Card>

            <ConfirmDialog
                open={!!toDelete}
                onClose={() => !deleting && setToDelete(null)}
                onConfirm={confirmDelete}
                processing={deleting}
                title="Hapus proyek ini?"
                message={toDelete && `"${toDelete.title}" beserta gambarnya akan dihapus permanen.`}
            />
        </AdminLayout>
    );
}
