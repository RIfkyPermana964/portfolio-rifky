@extends('layouts.admin')

@section('page-title', 'Kelola Proyek')

@section('content')
<div class="space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-xl font-bold text-white">Daftar Proyek Portofolio</h1>
            <p class="text-xs text-slate-400 mt-1">Tambah, edit, dan hapus proyek aplikasi yang akan ditampilkan secara publik</p>
        </div>

        <a href="{{ route('admin.projects.create') }}" class="px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5">
            <i class="ri-add-line text-lg"></i> Tambah Proyek Baru
        </a>
    </div>

    <!-- Table Card -->
    <div class="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                        <th class="px-5 py-4">Thumbnail</th>
                        <th class="px-5 py-4">Judul Proyek</th>
                        <th class="px-5 py-4">Kategori</th>
                        <th class="px-5 py-4">Tech Stack</th>
                        <th class="px-5 py-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 text-slate-300">
                    @forelse($projects as $proj)
                        <tr class="hover:bg-slate-800/30 transition-colors">
                            <td class="px-5 py-3.5 w-20">
                                @if($proj->thumbnail)
                                    <img src="{{ asset('storage/' . $proj->thumbnail) }}" alt="{{ $proj->title }}" class="w-14 h-10 object-cover rounded-lg border border-slate-700">
                                @else
                                    <div class="w-14 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-xs">
                                        No Img
                                    </div>
                                @endif
                            </td>
                            <td class="px-5 py-3.5">
                                <p class="font-bold text-white text-sm">{{ $proj->title }}</p>
                                <p class="text-[11px] text-slate-400 line-clamp-1">{{ $proj->summary }}</p>
                            </td>
                            <td class="px-5 py-3.5">
                                <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                                    {{ $proj->category }}
                                </span>
                            </td>
                            <td class="px-5 py-3.5">
                                <div class="flex flex-wrap gap-1 max-w-xs">
                                    @if(!empty($proj->tech_stack))
                                        @foreach($proj->tech_stack as $t)
                                            <span class="px-2 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300 border border-slate-700">
                                                {{ $t }}
                                            </span>
                                        @endforeach
                                    @endif
                                </div>
                            </td>
                            <td class="px-5 py-3.5 text-center">
                                <div class="flex items-center justify-center gap-2">
                                    <a href="{{ route('admin.projects.edit', $proj->id) }}" class="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors" title="Edit Proyek">
                                        <i class="ri-edit-line text-sm"></i>
                                    </a>

                                    <form action="{{ route('admin.projects.destroy', $proj->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus proyek ini?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors" title="Hapus Proyek">
                                            <i class="ri-delete-bin-line text-sm"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="px-5 py-12 text-center text-slate-500">
                                Belum ada proyek yang dibuat. Klik "+ Tambah Proyek Baru" di atas.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($projects->hasPages())
            <div class="p-4 border-t border-slate-800">
                {{ $projects->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
