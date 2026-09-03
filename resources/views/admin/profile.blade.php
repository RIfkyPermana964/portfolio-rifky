@extends('layouts.admin')

@section('page-title', 'Pengaturan Profil & CV')

@section('content')
<div class="max-w-3xl mx-auto space-y-6">
    <div>
        <h1 class="text-xl font-bold text-white">Pengaturan Profil & Informasi Kontak</h1>
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
