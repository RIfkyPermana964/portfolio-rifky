@extends('layouts.admin')

@section('page-title', 'Edit Proyek')

@section('content')
<div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-white">Edit Proyek: {{ $project->title }}</h1>
        <a href="{{ route('admin.projects.index') }}" class="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <i class="ri-arrow-left-line"></i> Kembali
        </a>
    </div>

    <div class="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
        <form action="{{ route('admin.projects.update', $project->id) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf
            @method('PUT')

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Judul Proyek *</label>
                <input type="text" name="title" value="{{ old('title', $project->title) }}" required
                       class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Kategori Proyek *</label>
                    <select name="category" required class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                        <option value="Web Development" {{ $project->category == 'Web Development' ? 'selected' : '' }}>Web Development</option>
                        <option value="Mobile App" {{ $project->category == 'Mobile App' ? 'selected' : '' }}>Mobile App</option>
                        <option value="System & Database" {{ $project->category == 'System & Database' ? 'selected' : '' }}>System & Database</option>
                        <option value="Networking" {{ $project->category == 'Networking' ? 'selected' : '' }}>Networking</option>
                        <option value="Desain Grafis" {{ $project->category == 'Desain Grafis' ? 'selected' : '' }}>Desain Grafis</option>
                        <option value="AI & Machine Learning" {{ $project->category == 'AI & Machine Learning' ? 'selected' : '' }}>AI & Machine Learning</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Tech Stack (Dipisahkan koma)</label>
                    <input type="text" name="tech_stack_input" value="{{ old('tech_stack_input', implode(', ', $project->tech_stack ?? [])) }}"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Ringkasan Singkat (Summary) *</label>
                <textarea name="summary" rows="2" required
                          class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">{{ old('summary', $project->summary) }}</textarea>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Penjelasan Detail Proyek</label>
                <textarea name="description" rows="5"
                          class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">{{ old('description', $project->description) }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Link Live Demo (Opsional)</label>
                    <input type="url" name="demo_url" value="{{ old('demo_url', $project->demo_url) }}"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Link Repository GitHub (Opsional)</label>
                    <input type="url" name="github_url" value="{{ old('github_url', $project->github_url) }}"
                           class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2">Gambar Thumbnail Saat Ini</label>
                @if($project->thumbnail)
                    <div class="mb-3 w-40 h-24 rounded-xl overflow-hidden border border-slate-700">
                        <img src="{{ asset('storage/' . $project->thumbnail) }}" alt="{{ $project->title }}" class="w-full h-full object-cover">
                    </div>
                @endif
                <input type="file" name="thumbnail" accept="image/*"
                       class="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500">
                <span class="text-[11px] text-slate-500 mt-1 block">Biarkan kosong jika tidak ingin mengubah gambar thumbnail.</span>
            </div>

            <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <a href="{{ route('admin.projects.index') }}" class="px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700">
                    Batal
                </a>
                <button type="submit" class="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30">
                    <i class="ri-save-line mr-1"></i> Perbarui Proyek
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
