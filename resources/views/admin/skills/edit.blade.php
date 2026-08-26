@extends('layouts.admin')

@section('title', 'Edit Keahlian | Admin Dashboard')
@section('page-title', 'Edit Keahlian')

@section('content')
<div class="max-w-2xl">
    <div class="mb-6 flex items-center gap-3">
        <a href="{{ route('admin.skills.index') }}" class="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">
            <i class="ri-arrow-left-line text-lg"></i>
        </a>
        <div>
            <h2 class="text-lg font-bold text-slate-100">Kembali ke Daftar</h2>
        </div>
    </div>

    <div class="glass-card p-6 sm:p-8 rounded-2xl">
        <form action="{{ route('admin.skills.update', $skill) }}" method="POST" class="space-y-5">
            @csrf
            @method('PUT')
            
            <div>
                <label for="category" class="block text-sm font-semibold text-slate-300 mb-1.5">Kategori *</label>
                <input type="text" name="category" id="category" value="{{ old('category', $skill->category) }}" required 
                       class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                @error('category')
                    <p class="text-rose-400 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="name" class="block text-sm font-semibold text-slate-300 mb-1.5">Nama Keahlian/Skill *</label>
                <input type="text" name="name" id="name" value="{{ old('name', $skill->name) }}" required 
                       class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                @error('name')
                    <p class="text-rose-400 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="pt-4 border-t border-slate-800/80">
                <button type="submit" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
                    <i class="ri-save-line"></i> Perbarui Keahlian
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
