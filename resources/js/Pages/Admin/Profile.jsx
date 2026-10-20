import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Save, User, ShieldCheck, Mail, KeyRound, Eye, EyeOff } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from '@/Components/BrandIcons';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button, Card, FileUpload, ImageUpload, Input, Textarea, cn, storageUrl } from '@/Components/ui';

function PublicProfileForm({ profile }) {
    const { data, setData, post, processing, errors, isDirty, transform } = useForm({
        full_name: profile?.full_name ?? '',
        sub_title: profile?.sub_title ?? '',
        title: profile?.title ?? '',
        bio: profile?.bio ?? '',
        email: profile?.email ?? '',
        whatsapp: profile?.whatsapp ?? '',
        github_url: profile?.github_url ?? '',
        linkedin_url: profile?.linkedin_url ?? '',
        instagram_url: profile?.instagram_url ?? '',
        avatar: null,
        resume_file: null,
    });

    transform((values) => ({ ...values, _method: 'put' }));

    const submit = (e) => {
        e.preventDefault();
        post('/admin/profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setData((d) => ({ ...d, avatar: null, resume_file: null })),
        });
    };

    return (
        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card className="p-5 sm:p-6 space-y-5">
                    <h2 className="font-bold text-white">Identitas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            label="Nama lengkap & gelar"
                            required
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            error={errors.full_name}
                        />
                        <Input
                            label="Tagline navbar"
                            value={data.sub_title}
                            onChange={(e) => setData('sub_title', e.target.value)}
                            error={errors.sub_title}
                            placeholder="S.Kom. • Web Dev"
                            hint="Teks kecil di bawah nama pada navbar."
                            maxLength={100}
                        />
                    </div>
                    <Input
                        label="Headline profesional"
                        required
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        error={errors.title}
                        hint="Tampil besar di bagian hero halaman depan."
                    />
                    <Textarea
                        label="Bio"
                        required
                        rows={6}
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        error={errors.bio}
                        hint="Perkenalan singkat. Enter untuk paragraf baru."
                    />
                </Card>

                <Card className="p-5 sm:p-6 space-y-5">
                    <h2 className="font-bold text-white">Kontak & Sosial Media</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            label="Email publik"
                            type="email"
                            required
                            icon={Mail}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                        />
                        <Input
                            label="Nomor WhatsApp"
                            icon={WhatsappIcon}
                            value={data.whatsapp}
                            onChange={(e) => setData('whatsapp', e.target.value.replace(/[^\d]/g, ''))}
                            error={errors.whatsapp}
                            placeholder="6281234567890"
                            hint="Pakai kode negara tanpa + atau 0 di depan."
                            inputMode="numeric"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <Input
                            label="GitHub"
                            type="url"
                            icon={GithubIcon}
                            value={data.github_url}
                            onChange={(e) => setData('github_url', e.target.value)}
                            error={errors.github_url}
                            placeholder="https://github.com/..."
                        />
                        <Input
                            label="LinkedIn"
                            type="url"
                            icon={LinkedinIcon}
                            value={data.linkedin_url}
                            onChange={(e) => setData('linkedin_url', e.target.value)}
                            error={errors.linkedin_url}
                            placeholder="https://linkedin.com/in/..."
                        />
                        <Input
                            label="Instagram"
                            type="url"
                            icon={InstagramIcon}
                            value={data.instagram_url}
                            onChange={(e) => setData('instagram_url', e.target.value)}
                            error={errors.instagram_url}
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="p-5 sm:p-6 space-y-5">
                    <h2 className="font-bold text-white">Foto & CV</h2>
                    <ImageUpload
                        label="Foto profil"
                        aspect="aspect-square"
                        file={data.avatar}
                        currentUrl={storageUrl(profile?.avatar)}
                        onChange={(file) => setData('avatar', file)}
                        error={errors.avatar}
                    />
                    <FileUpload
                        label="CV / Resume (PDF)"
                        accept="application/pdf"
                        file={data.resume_file}
                        currentUrl={storageUrl(profile?.resume_path)}
                        currentLabel="Lihat CV saat ini"
                        onChange={(file) => setData('resume_file', file)}
                        error={errors.resume_file}
                        hint="Maks. 5MB. Muncul sebagai tombol Unduh CV."
                    />
                </Card>
                <div className="lg:sticky lg:top-24">
                    <Button type="submit" size="lg" loading={processing} className="w-full">
                        {!processing && <Save className="w-4 h-4" />} Simpan Profil
                    </Button>
                    {isDirty && !processing && (
                        <p className="text-xs text-amber-300/90 text-center mt-2">Ada perubahan yang belum disimpan</p>
                    )}
                </div>
            </div>
        </form>
    );
}

function PasswordInput(props) {
    const [show, setShow] = useState(false);
    return (
        <Input
            type={show ? 'text' : 'password'}
            icon={KeyRound}
            trailing={
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="text-slate-500 hover:text-slate-300 cursor-pointer"
                    aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            }
            {...props}
        />
    );
}

function AccountForms({ account }) {
    const accountForm = useForm({ name: account.name, email: account.email });
    const passwordForm = useForm({ current_password: '', password: '', password_confirmation: '' });

    const saveAccount = (e) => {
        e.preventDefault();
        accountForm.put('/admin/profile/account', { preserveScroll: true });
    };

    const savePassword = (e) => {
        e.preventDefault();
        passwordForm.put('/admin/profile/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
            onError: () => passwordForm.reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Card className="p-5 sm:p-6">
                <h2 className="font-bold text-white">Akun Login</h2>
                <p className="text-sm text-slate-500 mt-1 mb-5">Email ini dipakai untuk masuk ke admin panel.</p>
                <form onSubmit={saveAccount} className="space-y-5">
                    <Input
                        label="Nama"
                        required
                        icon={User}
                        value={accountForm.data.name}
                        onChange={(e) => accountForm.setData('name', e.target.value)}
                        error={accountForm.errors.name}
                    />
                    <Input
                        label="Email login"
                        type="email"
                        required
                        icon={Mail}
                        value={accountForm.data.email}
                        onChange={(e) => accountForm.setData('email', e.target.value)}
                        error={accountForm.errors.email}
                        autoComplete="username"
                    />
                    <Button type="submit" loading={accountForm.processing} disabled={!accountForm.isDirty}>
                        {!accountForm.processing && <Save className="w-4 h-4" />} Simpan Akun
                    </Button>
                </form>
            </Card>

            <Card className="p-5 sm:p-6">
                <h2 className="font-bold text-white">Ganti Password</h2>
                <p className="text-sm text-slate-500 mt-1 mb-5">Gunakan minimal 8 karakter.</p>
                <form onSubmit={savePassword} className="space-y-5">
                    <PasswordInput
                        label="Password saat ini"
                        required
                        value={passwordForm.data.current_password}
                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                        error={passwordForm.errors.current_password}
                        autoComplete="current-password"
                    />
                    <PasswordInput
                        label="Password baru"
                        required
                        minLength={8}
                        value={passwordForm.data.password}
                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                        error={passwordForm.errors.password}
                        autoComplete="new-password"
                    />
                    <PasswordInput
                        label="Ulangi password baru"
                        required
                        value={passwordForm.data.password_confirmation}
                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                        error={
                            passwordForm.data.password_confirmation &&
                            passwordForm.data.password !== passwordForm.data.password_confirmation
                                ? 'Konfirmasi password belum sama.'
                                : null
                        }
                        autoComplete="new-password"
                    />
                    <Button type="submit" variant="secondary" loading={passwordForm.processing}>
                        {!passwordForm.processing && <KeyRound className="w-4 h-4" />} Perbarui Password
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default function Profile({ profile, account }) {
    const [tab, setTab] = useState('profile');

    const tabs = [
        { key: 'profile', label: 'Profil Publik', icon: User },
        { key: 'account', label: 'Akun & Keamanan', icon: ShieldCheck },
    ];

    return (
        <AdminLayout title="Profil & Akun" description="Atur informasi yang tampil di website dan kredensial login admin.">
            <div className="inline-flex p-1 mb-6 rounded-xl bg-slate-900/80 border border-slate-800" role="tablist">
                {tabs.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        role="tab"
                        aria-selected={tab === key}
                        onClick={() => setTab(key)}
                        className={cn(
                            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer',
                            tab === key ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white',
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </button>
                ))}
            </div>

            {tab === 'profile' ? <PublicProfileForm profile={profile} /> : <AccountForms account={account} />}
        </AdminLayout>
    );
}
