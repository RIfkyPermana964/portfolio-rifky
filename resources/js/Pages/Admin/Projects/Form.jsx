import React from 'react';
import { useForm } from '@inertiajs/react';
import { Save, Link2 } from 'lucide-react';
import { GithubIcon } from '@/Components/BrandIcons';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button, Card, Combobox, ImageUpload, Input, TagInput, Textarea, Toggle, storageUrl } from '@/Components/ui';

export default function ProjectForm({ project, categories = [] }) {
    const isEdit = !!project;

    const { data, setData, post, processing, errors, transform } = useForm({
        title: project?.title ?? '',
        category: project?.category ?? 'Web Development',
        summary: project?.summary ?? '',
        description: project?.description ?? '',
        tech_stack: project?.tech_stack ?? [],
        demo_url: project?.demo_url ?? '',
        github_url: project?.github_url ?? '',
        is_featured: project?.is_featured ?? true,
        thumbnail: null,
    });

    transform(({ tech_stack, ...rest }) => ({
        ...rest,
        tech_stack_input: tech_stack.join(', '),
        ...(isEdit ? { _method: 'put' } : {}),
    }));

    const submit = (e) => {
        e.preventDefault();
        post(isEdit ? `/admin/projects/${project.id}` : '/admin/projects', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout
            title={isEdit ? 'Edit Proyek' : 'Tambah Proyek'}
            description={isEdit ? project.title : 'Isi detail proyek yang ingin ditampilkan di portofolio.'}
            backHref="/admin/projects"
        >
            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-5 sm:p-6 space-y-5">
                        <h2 className="font-bold text-white">Informasi Proyek</h2>
                        <Input
                            label="Judul proyek"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            placeholder="Contoh: Sistem Informasi Kasir & Inventaris Toko"
                        />
                        <Textarea
                            label="Ringkasan singkat"
                            required
                            rows={2}
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                            error={errors.summary}
                            hint="1–2 kalimat, tampil di kartu proyek halaman depan."
                            placeholder="Aplikasi untuk..."
                        />
                        <Textarea
                            label="Penjelasan detail"
                            rows={7}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            error={errors.description}
                            hint="Fitur utama, latar belakang, dan solusi teknis. Enter untuk baris baru."
                        />
                    </Card>

                    <Card className="p-5 sm:p-6 space-y-5">
                        <h2 className="font-bold text-white">Teknologi & Link</h2>
                        <TagInput
                            label="Tech stack"
                            value={data.tech_stack}
                            onChange={(tags) => setData('tech_stack', tags)}
                            error={errors.tech_stack_input}
                            placeholder="Ketik lalu tekan Enter, mis. Laravel"
                            hint="Tekan Enter atau koma untuk menambah. Klik × untuk menghapus."
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Input
                                label="Link live demo"
                                type="url"
                                icon={Link2}
                                value={data.demo_url}
                                onChange={(e) => setData('demo_url', e.target.value)}
                                error={errors.demo_url}
                                placeholder="https://..."
                            />
                            <Input
                                label="Link repository GitHub"
                                type="url"
                                icon={GithubIcon}
                                value={data.github_url}
                                onChange={(e) => setData('github_url', e.target.value)}
                                error={errors.github_url}
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="p-5 sm:p-6 space-y-5">
                        <h2 className="font-bold text-white">Tampilan</h2>
                        <ImageUpload
                            label="Thumbnail"
                            file={data.thumbnail}
                            currentUrl={storageUrl(project?.thumbnail)}
                            onChange={(file) => setData('thumbnail', file)}
                            error={errors.thumbnail}
                            hint={isEdit && project.thumbnail ? 'Biarkan jika tidak ingin mengganti gambar.' : null}
                        />
                        <Combobox
                            label="Kategori"
                            required
                            options={categories}
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            error={errors.category}
                            hint="Pilih dari daftar atau ketik kategori baru."
                        />
                        <Toggle
                            label="Proyek unggulan"
                            description="Ditampilkan paling atas dengan label Unggulan."
                            checked={data.is_featured}
                            onChange={(value) => setData('is_featured', value)}
                        />
                    </Card>

                    <div className="lg:sticky lg:top-24 flex flex-col gap-2">
                        <Button type="submit" size="lg" loading={processing} className="w-full">
                            {!processing && <Save className="w-4 h-4" />}
                            {isEdit ? 'Simpan Perubahan' : 'Simpan Proyek'}
                        </Button>
                        <Button href="/admin/projects" variant="ghost" className="w-full">
                            Batal
                        </Button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
