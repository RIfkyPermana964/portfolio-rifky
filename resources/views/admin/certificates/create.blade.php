@extends('layouts.admin')

@section('page-title', 'Tambah Sertifikat Baru')

@section('content')
<div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-white">Tambah Sertifikasi / Prestasi Baru</h1>
        <a href="{{ route('admin.certificates.index') }}" class="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <i class="ri-arrow-left-line"></i> Kembali
        </a>
    </div>

    <div class="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
        <form action="{{ route('admin.certificates.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Nama Sertifikasi / Prestasi *</label>
                <input type="text" name="title" value="{{ old('title') }}" required placeholder="Contoh: Belajar Dasar Pemrograman Web"
                       class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Penerbit (Issuer / Penyelenggara) *</label>
                    <input type="text" name="issuer" value="{{ old('issuer') }}" required placeholder="Dicoding / Udemy / Universitas / LSP"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Kategori *</label>
                    <select name="category" required class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                        <option value="Sertifikasi">Sertifikasi</option>
                        <option value="Akademik">Akademik</option>
                        <option value="Bootcamp">Bootcamp</option>
                        <option value="Penghargaan">Penghargaan / Award</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Tanggal Terbit / Kelulusan</label>
                    <input type="date" name="issue_date" value="{{ old('issue_date') }}"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Link Verifikasi Credential (Opsional)</label>
                    <input type="url" name="credential_url" value="{{ old('credential_url') }}" placeholder="https://dicoding.com/certificates/XYZ"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Keterangan / Catatan Singkat</label>
                <textarea name="description" rows="3" placeholder="Ringkasan kompetensi yang dicapai atau materi pembelajaran..."
                          class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">{{ old('description') }}</textarea>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Upload Gambar/Preview Sertifikat (Opsional, maks 3MB)</label>
                <input type="file" name="image" accept="image/*"
                       class="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500">
            </div>

            <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <a href="{{ route('admin.certificates.index') }}" class="px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700">
                    Batal
                </a>
                <button type="submit" class="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30">
                    <i class="ri-save-line mr-1"></i> Simpan Sertifikat
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
