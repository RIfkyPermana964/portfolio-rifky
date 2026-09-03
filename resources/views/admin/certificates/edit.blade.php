@extends('layouts.admin')

@section('page-title', 'Edit Sertifikat')

@section('content')
<div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-white">Edit Sertifikat: {{ $certificate->title }}</h1>
        <a href="{{ route('admin.certificates.index') }}" class="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <i class="ri-arrow-left-line"></i> Kembali
        </a>
    </div>

    <div class="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
        <form action="{{ route('admin.certificates.update', $certificate->id) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf
            @method('PUT')

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Nama Sertifikasi / Prestasi *</label>
                <input type="text" name="title" value="{{ old('title', $certificate->title) }}" required
                       class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Penerbit (Issuer / Penyelenggara) *</label>
                    <input type="text" name="issuer" value="{{ old('issuer', $certificate->issuer) }}" required
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Kategori *</label>
                    <select name="category" required class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                        <option value="Sertifikasi" {{ $certificate->category == 'Sertifikasi' ? 'selected' : '' }}>Sertifikasi</option>
                        <option value="Akademik" {{ $certificate->category == 'Akademik' ? 'selected' : '' }}>Akademik</option>
                        <option value="Bootcamp" {{ $certificate->category == 'Bootcamp' ? 'selected' : '' }}>Bootcamp</option>
                        <option value="Penghargaan" {{ $certificate->category == 'Penghargaan' ? 'selected' : '' }}>Penghargaan / Award</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Tanggal Terbit / Kelulusan</label>
                    <input type="date" name="issue_date" value="{{ old('issue_date', $certificate->issue_date ? $certificate->issue_date->format('Y-m-d') : '') }}"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Link Verifikasi Credential (Opsional)</label>
                    <input type="text" name="credential_url" value="{{ old('credential_url', $certificate->credential_url) }}"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Keterangan / Catatan Singkat</label>
                <textarea name="description" rows="3"
                          class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">{{ old('description', $certificate->description) }}</textarea>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Gambar Preview Saat Ini</label>
                @if($certificate->image)
                    <div class="mb-3 w-40 h-24 rounded-xl overflow-hidden border border-slate-700">
                        <img src="{{ asset('storage/' . $certificate->image) }}" alt="{{ $certificate->title }}" class="w-full h-full object-cover">
                    </div>
                @endif
                <input type="file" name="image" accept="image/*"
                       class="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500">
            </div>

            <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <a href="{{ route('admin.certificates.index') }}" class="px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700">
                    Batal
                </a>
                <button type="submit" class="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30">
                    <i class="ri-save-line mr-1"></i> Perbarui Sertifikat
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
