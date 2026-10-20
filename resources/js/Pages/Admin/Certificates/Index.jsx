import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Award, ExternalLink, Calendar } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Badge, Button, Card, ConfirmDialog, EmptyState, Pagination, SearchBox, formatDate, storageUrl } from '@/Components/ui';

export default function CertificatesIndex({ certificates, filters }) {
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const confirmDelete = () => {
        setDeleting(true);
        router.delete(`/admin/certificates/${toDelete.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleting(false);
                setToDelete(null);
            },
        });
    };

    const items = certificates.data;

    return (
        <AdminLayout
            title="Sertifikat & Prestasi"
            description="Kelola sertifikat, lisensi, dan penghargaan."
            actions={
                <Button href="/admin/certificates/create">
                    <Plus className="w-4 h-4" /> Tambah Sertifikat
                </Button>
            }
        >
            <Card className="overflow-hidden">
                <div className="p-4 border-b border-slate-800/80">
                    <SearchBox
                        url="/admin/certificates"
                        value={filters.search}
                        placeholder="Cari judul, penerbit, atau kategori..."
                        className="sm:max-w-sm"
                    />
                </div>

                {items.length === 0 ? (
                    filters.search ? (
                        <EmptyState icon={Award} title="Tidak ditemukan" description={`Tidak ada sertifikat yang cocok dengan "${filters.search}".`} />
                    ) : (
                        <EmptyState
                            icon={Award}
                            title="Belum ada sertifikat"
                            description="Tambahkan sertifikat atau prestasi untuk memperkuat portofolio."
                            action={
                                <Button href="/admin/certificates/create">
                                    <Plus className="w-4 h-4" /> Tambah Sertifikat
                                </Button>
                            }
                        />
                    )
                ) : (
                    <ul className="divide-y divide-slate-800/60">
                        {items.map((cert) => (
                            <li key={cert.id} className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-slate-800/20 transition-colors">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <div className="w-16 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center">
                                        {cert.image ? (
                                            <img src={storageUrl(cert.image)} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <Award className="w-5 h-5 text-slate-500" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <Link
                                            href={`/admin/certificates/${cert.id}/edit`}
                                            className="font-semibold text-white hover:text-emerald-300 text-sm line-clamp-1"
                                        >
                                            {cert.title}
                                        </Link>
                                        <p className="text-xs text-emerald-300/80 truncate">{cert.issuer}</p>
                                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                            <Badge>{cert.category}</Badge>
                                            {cert.issue_date && (
                                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {formatDate(cert.issue_date)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 sm:justify-end">
                                    {cert.credential_url && (
                                        <a
                                            href={cert.credential_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                            title="Buka link kredensial"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                    <Button href={`/admin/certificates/${cert.id}/edit`} variant="ghost" size="sm">
                                        <Pencil className="w-3.5 h-3.5" /> Edit
                                    </Button>
                                    <Button variant="danger-ghost" size="sm" onClick={() => setToDelete(cert)}>
                                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <Pagination meta={certificates} />
            </Card>

            <ConfirmDialog
                open={!!toDelete}
                onClose={() => !deleting && setToDelete(null)}
                onConfirm={confirmDelete}
                processing={deleting}
                title="Hapus sertifikat ini?"
                message={toDelete && `"${toDelete.title}" akan dihapus permanen.`}
            />
        </AdminLayout>
    );
}
