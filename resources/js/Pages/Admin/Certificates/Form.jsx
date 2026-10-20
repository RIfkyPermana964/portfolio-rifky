import React from 'react';
import { useForm } from '@inertiajs/react';
import { Save, Link2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button, Card, Combobox, ImageUpload, Input, Textarea, storageUrl } from '@/Components/ui';

export default function CertificateForm({ certificate, categories = [] }) {
    const isEdit = !!certificate;

    const { data, setData, post, processing, errors, transform } = useForm({
        title: certificate?.title ?? '',
        issuer: certificate?.issuer ?? '',
        category: certificate?.category ?? 'Sertifikasi',
        issue_date: certificate?.issue_date ? certificate.issue_date.slice(0, 10) : '',
        credential_url: certificate?.credential_url ?? '',
        description: certificate?.description ?? '',
        image: null,
    });

    transform((values) => ({ ...values, ...(isEdit ? { _method: 'put' } : {}) }));

    const submit = (e) => {
        e.preventDefault();
        post(isEdit ? `/admin/certificates/${certificate.id}` : '/admin/certificates', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout
            title={isEdit ? 'Edit Sertifikat' : 'Tambah Sertifikat'}
            description={isEdit ? certificate.title : 'Tambahkan sertifikat, lisensi, atau penghargaan baru.'}
            backHref="/admin/certificates"
        >
            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-5 sm:p-6 space-y-5">
                    <h2 className="font-bold text-white">Detail Sertifikat</h2>
                    <Input
                        label="Judul sertifikat / prestasi"
                        required
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        error={errors.title}
                        placeholder="Contoh: Belajar Dasar Pemrograman Web"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            label="Penerbit"
                            required
                            value={data.issuer}
                            onChange={(e) => setData('issuer', e.target.value)}
                            error={errors.issuer}
                            placeholder="Dicoding / Cisco / Universitas"
                        />
                        <Combobox
                            label="Kategori"
                            required
                            options={categories}
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            error={errors.category}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            label="Tanggal terbit"
                            type="date"
                            value={data.issue_date}
                            onChange={(e) => setData('issue_date', e.target.value)}
                            error={errors.issue_date}
                        />
                        <Input
                            label="Link verifikasi"
                            type="url"
                            icon={Link2}
                            value={data.credential_url}
                            onChange={(e) => setData('credential_url', e.target.value)}
                            error={errors.credential_url}
                            placeholder="https://..."
                        />
                    </div>
                    <Textarea
                        label="Deskripsi"
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        error={errors.description}
                        hint="Ringkasan kompetensi atau materi yang dipelajari."
                    />
                </Card>

                <div className="space-y-6">
                    <Card className="p-5 sm:p-6">
                        <ImageUpload
                            label="Gambar sertifikat"
                            aspect="aspect-[4/3]"
                            file={data.image}
                            currentUrl={storageUrl(certificate?.image)}
                            onChange={(file) => setData('image', file)}
                            error={errors.image}
                            hint={isEdit && certificate.image ? 'Biarkan jika tidak ingin mengganti gambar.' : 'Opsional.'}
                        />
                    </Card>
                    <div className="lg:sticky lg:top-24 flex flex-col gap-2">
                        <Button type="submit" size="lg" loading={processing} className="w-full">
                            {!processing && <Save className="w-4 h-4" />}
                            {isEdit ? 'Simpan Perubahan' : 'Simpan Sertifikat'}
                        </Button>
                        <Button href="/admin/certificates" variant="ghost" className="w-full">
                            Batal
                        </Button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
