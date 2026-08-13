@extends('layouts.admin')

@section('page-title', 'Kelola Sertifikasi & Prestasi')

@section('content')
<div class="space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-xl font-bold text-white">Daftar Sertifikasi & Prestasi</h1>
            <p class="text-xs text-slate-400 mt-1">Unggah dan kelola sertifikat kelulusan, bootcamp, ataulisensi profesional</p>
        </div>

        <a href="{{ route('admin.certificates.create') }}" class="px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5">
            <i class="ri-add-line text-lg"></i> Tambah Sertifikat Baru
        </a>
    </div>

    <!-- Table Card -->
    <div class="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                        <th class="px-5 py-4">Sertifikat</th>
                        <th class="px-5 py-4">Penerbit (Issuer)</th>
                        <th class="px-5 py-4">Kategori</th>
                        <th class="px-5 py-4">Tanggal Terbit</th>
                        <th class="px-5 py-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 text-slate-300">
                    @forelse($certificates as $cert)
                        <tr class="hover:bg-slate-800/30 transition-colors">
                            <td class="px-5 py-3.5">
                                <div class="flex items-center gap-3">
                                    @if($cert->image)
                                        <img src="{{ asset('storage/' . $cert->image) }}" alt="{{ $cert->title }}" class="w-12 h-10 object-cover rounded-lg border border-slate-700">
                                    @else
                                        <div class="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                            <i class="ri-award-fill text-lg"></i>
                                        </div>
                                    @endif
                                    <div>
                                        <p class="font-bold text-white text-sm">{{ $cert->title }}</p>
                                        @if($cert->credential_url)
                                            <a href="{{ $cert->credential_url }}" target="_blank" class="text-[11px] text-indigo-400 hover:underline">
                                                Link Credential &rarr;
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-3.5 font-semibold text-slate-200">
                                {{ $cert->issuer }}
                            </td>
                            <td class="px-5 py-3.5">
                                <span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-indigo-300 border border-slate-700">
                                    {{ $cert->category }}
                                </span>
                            </td>
                            <td class="px-5 py-3.5 text-slate-400">
                                {{ $cert->issue_date ? $cert->issue_date->format('d M Y') : '-' }}
                            </td>
                            <td class="px-5 py-3.5 text-center">
                                <div class="flex items-center justify-center gap-2">
                                    <a href="{{ route('admin.certificates.edit', $cert->id) }}" class="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors" title="Edit Sertifikat">
                                        <i class="ri-edit-line text-sm"></i>
                                    </a>

                                    <form action="{{ route('admin.certificates.destroy', $cert->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus sertifikat ini?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors" title="Hapus Sertifikat">
                                            <i class="ri-delete-bin-line text-sm"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="px-5 py-12 text-center text-slate-500">
                                Belum ada sertifikasi yang ditambahkan. Klik "+ Tambah Sertifikat Baru" di atas.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($certificates->hasPages())
            <div class="p-4 border-t border-slate-800">
                {{ $certificates->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
