import React, { useMemo, useRef, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Check, X, Wrench } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button, Card, Combobox, ConfirmDialog, EmptyState, Input } from '@/Components/ui';

function SkillChip({ skill, categories, onDelete }) {
    const [editing, setEditing] = useState(false);
    const { data, setData, put, processing, errors, reset } = useForm({
        category: skill.category,
        name: skill.name,
    });

    const save = (e) => {
        e.preventDefault();
        put(`/admin/skills/${skill.id}`, {
            preserveScroll: true,
            onSuccess: () => setEditing(false),
        });
    };

    if (editing) {
        return (
            <form onSubmit={save} className="w-full flex flex-col sm:flex-row gap-2 p-3 rounded-xl bg-slate-900 border border-indigo-500/40">
                <Combobox
                    options={categories}
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    error={errors.category}
                    className="sm:w-56"
                    aria-label="Kategori"
                />
                <Input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    className="flex-1"
                    aria-label="Nama skill"
                    autoFocus
                />
                <div className="flex gap-1">
                    <Button type="submit" size="icon" loading={processing} aria-label="Simpan">
                        {!processing && <Check className="w-4 h-4" />}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            reset();
                            setEditing(false);
                        }}
                        aria-label="Batal"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <span className="group inline-flex items-center gap-1 pl-3 pr-1 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-sm text-slate-200 hover:border-slate-700 transition-colors">
            {skill.name}
            <button
                onClick={() => setEditing(true)}
                className="p-1 rounded-md text-slate-500 hover:text-indigo-300 hover:bg-indigo-500/10 cursor-pointer"
                aria-label={`Edit ${skill.name}`}
            >
                <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
                onClick={() => onDelete(skill)}
                className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                aria-label={`Hapus ${skill.name}`}
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </span>
    );
}

export default function SkillsIndex({ skills = [] }) {
    const nameRef = useRef(null);
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const grouped = useMemo(() => {
        return skills.reduce((acc, skill) => {
            (acc[skill.category] ||= []).push(skill);
            return acc;
        }, {});
    }, [skills]);
    const categories = Object.keys(grouped);

    const { data, setData, post, processing, errors } = useForm({
        category: categories[0] || '',
        name: '',
    });

    const add = (e) => {
        e.preventDefault();
        post('/admin/skills', {
            preserveScroll: true,
            onSuccess: () => {
                setData('name', '');
                nameRef.current?.querySelector('input')?.focus();
            },
        });
    };

    const confirmDelete = () => {
        setDeleting(true);
        router.delete(`/admin/skills/${toDelete.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleting(false);
                setToDelete(null);
            },
        });
    };

    return (
        <AdminLayout title="Keahlian" description="Teknologi dan keahlian yang tampil di bagian Keahlian pada halaman depan.">
            {/* Quick add */}
            <Card className="p-5 mb-6">
                <form onSubmit={add} className="flex flex-col md:flex-row md:items-start gap-3">
                    <Combobox
                        label="Kategori"
                        required
                        options={categories}
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        error={errors.category}
                        placeholder="mis. Networking"
                        className="md:w-64"
                    />
                    <div ref={nameRef} className="flex-1">
                        <Input
                            label="Nama skill"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="mis. MikroTik"
                        />
                    </div>
                    <Button type="submit" loading={processing} className="md:mt-[1.85rem]">
                        {!processing && <Plus className="w-4 h-4" />} Tambah
                    </Button>
                </form>
            </Card>

            {skills.length === 0 ? (
                <Card>
                    <EmptyState icon={Wrench} title="Belum ada keahlian" description="Gunakan form di atas untuk menambahkan skill pertama." />
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                        <Card key={category} className="p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="font-bold text-white">{category}</h2>
                                <span className="text-xs text-slate-500">{grouped[category].length} skill</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {grouped[category].map((skill) => (
                                    <SkillChip key={skill.id} skill={skill} categories={categories} onDelete={setToDelete} />
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <ConfirmDialog
                open={!!toDelete}
                onClose={() => !deleting && setToDelete(null)}
                onConfirm={confirmDelete}
                processing={deleting}
                title="Hapus skill ini?"
                message={toDelete && `"${toDelete.name}" akan dihapus dari kategori ${toDelete.category}.`}
            />
        </AdminLayout>
    );
}
