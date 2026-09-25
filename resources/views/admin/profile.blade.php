@extends('layouts.admin')

@section('page-title', 'Pengaturan Profil & CV')

@section('content')
<div class="max-w-3xl mx-auto space-y-8">
    <!-- Keamanan & Kredensial Login -->
    <div class="space-y-4">
        <div>
            <h1 class="text-xl font-bold text-white flex items-center gap-2">
                <i class="ri-shield-keyhole-line text-indigo-400"></i> Keamanan & Akun Login Admin
            </h1>
            <p class="text-xs text-slate-400 mt-1">Ubah email login dan password untuk menjaga keamanan dashboard admin Anda</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Form Ganti Email / Nama Akun Login -->
            <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                    <h2 class="text-sm font-bold text-slate-200 mb-1 flex items-center gap-2">
                        <i class="ri-user-line text-indigo-400"></i> Akun Login Admin
                    </h2>
                    <p class="text-[11px] text-slate-400 mb-4">Email ini digunakan untuk masuk ke halaman login admin</p>

                    <form action="{{ route('admin.profile.account') }}" method="POST" class="space-y-4">
                        @csrf
                        @method('PUT')

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Nama Pengguna</label>
                            <input type="text" name="name" value="{{ old('name', $user->name ?? Auth::user()->name) }}" required
                                   class="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500">
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email Login Admin</label>
                            <input type="email" name="email" value="{{ old('email', $user->email ?? Auth::user()->email) }}" required
                                   class="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500">
                        </div>

                        <div class="pt-2">
                            <button type="submit" class="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-md">
                                <i class="ri-save-line mr-1"></i> Update Akun Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Form Ganti Password -->
            <div class="glass-card p-6 rounded-2xl border border-slate-800">
                <h2 class="text-sm font-bold text-slate-200 mb-1 flex items-center gap-2">
                    <i class="ri-lock-password-line text-amber-400"></i> Ganti Password
                </h2>
                <p class="text-[11px] text-slate-400 mb-4">Gunakan kombinasi minimal 8 karakter agar akun aman</p>

                <form action="{{ route('admin.profile.password') }}" method="POST" class="space-y-4">
                    @csrf
                    @method('PUT')

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Password Lama</label>
                        <input type="password" name="current_password" required placeholder="Masukkan password saat ini"
                               class="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Password Baru (min. 8 karakter)</label>
                        <input type="password" name="password" required placeholder="Password baru"
                               class="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Ulangi Password Baru</label>
                        <input type="password" name="password_confirmation" required placeholder="Ketik ulang password baru"
                               class="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500">
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="w-full py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-colors shadow-md">
                            <i class="ri-key-line mr-1"></i> Perbarui Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Profil & Informasi Kontak Publik -->
    <div class="space-y-4 pt-4 border-t border-slate-800">
        <div>
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
                <i class="ri-user-smile-line text-cyan-400"></i> Pengaturan Profil & Kontak Publik
            </h2>
            <p class="text-xs text-slate-400 mt-1">Perbarui informasi utama diri, foto profil, dan dokumen CV PDF yang dapat diunduh publik</p>
        </div>

        <div class="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
            <form action="{{ route('admin.profile.update') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Nama Lengkap & Gelar *</label>
                    <input type="text" name="full_name" value="{{ old('full_name', $profile->full_name) }}" required
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Headline / Judul Profesionial *</label>
                    <input type="text" name="title" value="{{ old('title', $profile->title) }}" required
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Bio Singkat (Pengenalan Diri) *</label>
                <textarea name="bio" rows="4" required
                          class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">{{ old('bio', $profile->bio) }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Email Publik *</label>
                    <input type="email" name="email" value="{{ old('email', $profile->email) }}" required
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Nomor WhatsApp (dengan kode negara 62...)</label>
                    <input type="text" name="whatsapp" value="{{ old('whatsapp', $profile->whatsapp) }}" placeholder="6281234567890"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">URL GitHub</label>
                    <input type="text" name="github_url" value="{{ old('github_url', $profile->github_url) }}"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">URL LinkedIn</label>
                    <input type="text" name="linkedin_url" value="{{ old('linkedin_url', $profile->linkedin_url) }}"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">URL Instagram</label>
                    <input type="text" name="instagram_url" value="{{ old('instagram_url', $profile->instagram_url) }}"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Foto Profil (Avatar)</label>
                    @if($profile->avatar)
                        <div class="mb-3 w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500">
                            <img src="{{ asset('storage/' . $profile->avatar) }}" alt="Avatar" class="w-full h-full object-cover">
                        </div>
                    @endif
                    <input type="file" name="avatar" accept="image/*"
                           class="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">File Resume / CV (Format PDF, maks 5MB)</label>
                    @if($profile->resume_path)
                        <div class="mb-3 flex items-center gap-2 text-xs text-indigo-400">
                            <i class="ri-file-pdf-fill text-xl text-rose-400"></i>
                            <a href="{{ asset('storage/' . $profile->resume_path) }}" target="_blank" class="hover:underline">
                                Lihat Dokumen CV Saat Ini &rarr;
                            </a>
                        </div>
                    @endif
                    <input type="file" name="resume_file" accept="application/pdf"
                           class="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500">
                </div>
            </div>

            <div class="pt-6 border-t border-slate-800 flex justify-end">
                <button type="submit" class="px-7 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30">
                    <i class="ri-save-line mr-1"></i> Simpan Perubahan Profil
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
