import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { CertificateCard } from '@/Components/PortfolioCards';
import { Modal, cn, storageUrl } from '@/Components/ui';

export default function Certificates({ certificates = [], profile }) {
    const [category, setCategory] = useState('Semua');
    const [preview, setPreview] = useState(null);

    const categories = ['Semua', ...new Set(certificates.map((c) => c.category).filter(Boolean))];
    const filtered = category === 'Semua' ? certificates : certificates.filter((c) => c.category === category);

    return (
        <PublicLayout profile={profile}>
            <Head>
                <title>{`Sertifikasi & Prestasi | ${profile?.full_name || 'Rifky Permana'}`}</title>
                <meta name="description" content="Lisensi, penghargaan, dan bukti kompetensi resmi." />
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
                <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-slate-200 transition-colors">Beranda</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-300">Sertifikasi</span>
                </nav>

                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Sertifikasi &amp; Prestasi</h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                        {certificates.length} lisensi, penghargaan, dan bukti kompetensi resmi di bidang IT.
                    </p>
                </header>

                {categories.length > 2 && (
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" role="tablist">
                        {categories.map((c) => (
                            <button
                                key={c}
                                role="tab"
                                aria-selected={category === c}
                                onClick={() => setCategory(c)}
                                className={cn(
                                    'shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer',
                                    category === c
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                                        : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white',
                                )}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                )}

                {filtered.length === 0 ? (
                    <div className="py-20 text-center text-slate-500">Belum ada data sertifikasi.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((cert) => (
                            <CertificateCard key={cert.id} cert={cert} onOpenImage={setPreview} />
                        ))}
                    </div>
                )}
            </div>

            <Modal open={!!preview} onClose={() => setPreview(null)} title={preview?.title} size="xl">
                {preview && (
                    <div className="space-y-4">
                        <img src={storageUrl(preview.image)} alt={preview.title} className="w-full h-auto rounded-xl border border-slate-800" />
                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                            <span className="text-emerald-300 font-semibold">{preview.issuer}</span>
                            {preview.credential_url && (
                                <a
                                    href={preview.credential_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                                >
                                    Verifikasi kredensial <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </PublicLayout>
    );
}
