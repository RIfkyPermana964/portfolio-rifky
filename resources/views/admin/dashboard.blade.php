@extends('layouts.admin')

@section('page-title', 'Overview Dashboard')

@section('content')

<!-- Stat Cards Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Card 1: Total Projects -->
    <div class="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
            <p class="text-xs font-semibold text-slate-400">Total Proyek</p>
            <p class="text-3xl font-extrabold text-white mt-1">{{ $totalProjects }}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl">
            <i class="ri-code-box-line"></i>
        </div>
    </div>

    <!-- Card 2: Total Certificates -->
    <div class="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
            <p class="text-xs font-semibold text-slate-400">Sertifikasi & Prestasi</p>
            <p class="text-3xl font-extrabold text-white mt-1">{{ $totalCertificates }}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl">
            <i class="ri-award-line"></i>
        </div>
    </div>

    <!-- Card 3: Total Messages -->
    <div class="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
            <p class="text-xs font-semibold text-slate-400">Pesan Masuk</p>
            <p class="text-3xl font-extrabold text-white mt-1">{{ $totalMessages }}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl">
            <i class="ri-mail-line"></i>
        </div>
    </div>

    <!-- Card 4: Quick Action -->
    <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-center">
        <p class="text-xs font-semibold text-slate-400 mb-2">Aksi Cepat</p>
        <div class="flex gap-2">
            <a href="{{ route('admin.projects.create') }}" class="flex-1 py-2 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
                + Proyek
            </a>
            <a href="{{ route('admin.certificates.create') }}" class="flex-1 py-2 text-center text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                + Sertifikat
            </a>
        </div>
    </div>
</div>

<!-- Two Columns: Recent Projects & Recent Messages -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    
    <!-- Recent Projects Table -->
    <div class="lg:col-span-7 glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div class="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 class="text-sm font-bold text-white flex items-center gap-2">
                <i class="ri-code-s-slash-line text-indigo-400"></i> Proyek Terbaru
            </h2>
            <a href="{{ route('admin.projects.index') }}" class="text-xs font-semibold text-indigo-400 hover:text-indigo-300">Lihat Semua &rarr;</a>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-900/60 text-slate-400 uppercase font-mono text-[10px]">
                    <tr>
                        <th class="px-5 py-3">Proyek</th>
                        <th class="px-5 py-3">Kategori</th>
                        <th class="px-5 py-3">Tgl Dibuat</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-slate-300">
                    @forelse($recentProjects as $proj)
                        <tr class="hover:bg-slate-800/30">
                            <td class="px-5 py-3.5 font-bold text-white">
                                <a href="{{ route('admin.projects.edit', $proj->id) }}" class="hover:text-indigo-400 transition-colors">
                                    {{ $proj->title }}
                                </a>
                            </td>
                            <td class="px-5 py-3.5">
                                <span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-indigo-300 border border-slate-700">
                                    {{ $proj->category }}
                                </span>
                            </td>
                            <td class="px-5 py-3.5 text-slate-400">
                                {{ $proj->created_at->format('d M Y') }}
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3" class="px-5 py-8 text-center text-slate-500">Belum ada data proyek.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Recent Messages / Certificates -->
    <div class="lg:col-span-5 space-y-6">
        <!-- Messages Card -->
        <div class="glass-card rounded-2xl border border-slate-800 p-5">
            <h2 class="text-sm font-bold text-white flex items-center gap-2 mb-4">
                <i class="ri-mail-send-line text-emerald-400"></i> Pesan Kontak Masuk
            </h2>

            <div class="space-y-3">
                @forelse($recentMessages as $msg)
                    <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                        <div class="flex items-center justify-between text-xs">
                            <span class="font-bold text-slate-200">{{ $msg->name }}</span>
                            <span class="text-[10px] text-slate-500">{{ $msg->created_at->diffForHumans() }}</span>
                        </div>
                        <p class="text-xs text-indigo-300 font-medium">{{ $msg->email }}</p>
                        <p class="text-xs text-slate-400 line-clamp-2 pt-1 border-t border-slate-800/80">{{ $msg->message }}</p>
                    </div>
                @empty
                    <p class="text-xs text-slate-500 text-center py-6">Belum ada pesan masuk dari pengunjung.</p>
                @endforelse
            </div>
        </div>
    </div>

</div>
@endsection
