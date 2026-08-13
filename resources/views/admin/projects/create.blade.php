@extends('layouts.admin')

@section('page-title', 'Tambah Proyek Baru')

@section('content')
<div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-white">Tambah Proyek Portofolio Baru</h1>
        <a href="{{ route('admin.projects.index') }}" class="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <i class="ri-arrow-left-line"></i> Kembali
        </a>
    </div>

    <div class="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
        <form action="{{ route('admin.projects.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Judul Proyek *</label>
                <input type="text" name="title" value="{{ old('title') }}" required placeholder="Contoh: Sistem Informasi Kasir & Inventaris Toko"
                       class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Kategori Proyek *</label>
                    <select name="category" required class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="System & Database">System & Database</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Tech Stack (Dipisahkan koma)</label>
                    <input type="text" name="tech_stack_input" value="{{ old('tech_stack_input') }}" placeholder="Laravel, Tailwind CSS, MySQL, Alpine.js"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Ringkasan Singkat (Summary) *</label>
                <textarea name="summary" rows="2" required placeholder="Deskripsi singkat 1-2 kalimat untuk tampilan kartu..."
                          class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">{{ old('summary') }}</textarea>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Penjelasan Detail Proyek</label>
                <textarea name="description" rows="5" placeholder="Penjelasan mengenai fitur utama, latar belakang pembuatan, dan solusi teknis yang diterapkan..."
                          class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">{{ old('description') }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Link Live Demo (Opsional)</label>
                    <input type="url" name="demo_url" value="{{ old('demo_url') }}" placeholder="https://demo-proyek.com"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Link Repository GitHub (Opsional)</label>
                    <input type="url" name="github_url" value="{{ old('github_url') }}" placeholder="https://github.com/username/project"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Upload Gambar Thumbnail (JPG/PNG/WebP, maks 3MB)</label>
                <input type="file" name="thumbnail" accept="image/*"
                       class="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500">
            </div>

            <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <a href="{{ route('admin.projects.index') }}" class="px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700">
                    Batal
                </a>
                <button type="submit" class="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30">
                    <i class="ri-save-line mr-1"></i> Simpan Proyek
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
