@extends('layouts.admin')

@section('title', 'Kelola Keahlian (Skills) | Admin Dashboard')
@section('page-title', 'Tech Stack & Keahlian')

@section('content')
<div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h2 class="text-lg font-bold text-slate-100">Daftar Keahlian</h2>
            <p class="text-sm text-slate-400">Kelola daftar teknologi dan keahlian yang Anda kuasai.</p>
        </div>
        <a href="{{ route('admin.skills.create') }}" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors">
            <i class="ri-add-line"></i> Tambah Keahlian
        </a>
    </div>

    <!-- Table -->
    <div class="glass-card rounded-2xl overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-900/50 border-b border-slate-800/80">
                        <th class="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider w-16">No</th>
                        <th class="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Kategori</th>
                        <th class="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Nama Skill</th>
                        <th class="px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/50 text-sm">
                    @forelse($skills as $skill)
                        <tr class="hover:bg-slate-800/20 transition-colors">
                            <td class="px-6 py-4 text-slate-400">{{ $loop->iteration }}</td>
                            <td class="px-6 py-4">
                                <span class="px-2.5 py-1 text-xs font-medium text-indigo-300 bg-indigo-900/30 border border-indigo-500/20 rounded-md">
                                    {{ $skill->category }}
                                </span>
                            </td>
                            <td class="px-6 py-4 font-medium text-slate-200">
                                {{ $skill->name }}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center justify-end gap-2">
                                    <a href="{{ route('admin.skills.edit', $skill) }}" class="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors" title="Edit">
                                        <i class="ri-edit-line text-lg"></i>
                                    </a>
                                    
                                    <form action="{{ route('admin.skills.destroy', $skill) }}" method="POST" class="inline-block" onsubmit="return confirm('Apakah Anda yakin ingin menghapus skill ini?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors" title="Hapus">
                                            <i class="ri-delete-bin-line text-lg"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                                <div class="flex flex-col items-center justify-center">
                                    <i class="ri-code-s-slash-line text-4xl mb-3 text-slate-600"></i>
                                    <p>Belum ada data keahlian. Silakan tambahkan skill baru.</p>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
