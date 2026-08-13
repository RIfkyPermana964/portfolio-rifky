@extends('layouts.app')

@section('title', 'Sertifikasi & Prestasi | Rifky Permana, S.Kom.')

@section('content')
<div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-10">
        <a href="{{ route('home') }}" class="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-4 transition-colors">
            <i class="ri-arrow-left-line"></i> Kembali ke Beranda
        </a>
        <h1 class="text-3xl font-extrabold text-white">Daftar Sertifikasi & Prestasi Akademik</h1>
        <p class="text-slate-400 text-sm mt-1">Seluruh lisensi, penghargaan, dan bukti kompetensi resmi yang dimiliki Rifky Permana.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @forelse($certificates as $cert)
            <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
                <div>
                    @if($cert->image)
                        <div class="h-44 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-800">
                            <img src="{{ asset('storage/' . $cert->image) }}" alt="{{ $cert->title }}" class="w-full h-full object-cover">
                        </div>
                    @endif

                    <div class="flex items-start justify-between gap-3 mb-3">
                        <span class="text-[11px] font-mono text-slate-400 px-2.5 py-1 bg-slate-800 rounded-full">
                            {{ $cert->category }}
                        </span>
                        <span class="text-slate-500 text-[11px]">
                            {{ $cert->issue_date ? $cert->issue_date->format('d M Y') : '' }}
                        </span>
                    </div>

                    <h3 class="text-base font-bold text-white mb-1">{{ $cert->title }}</h3>
                    <p class="text-xs font-semibold text-indigo-400 mb-3">{{ $cert->issuer }}</p>
                    
                    @if($cert->description)
                        <p class="text-xs text-slate-400 leading-relaxed mb-4">
                            {{ $cert->description }}
                        </p>
                    @endif
                </div>

                @if($cert->credential_url)
                    <div class="pt-4 border-t border-slate-800/80">
                        <a href="{{ $cert->credential_url }}" target="_blank" class="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                            Lihat Credential Resmi <i class="ri-external-link-line"></i>
                        </a>
                    </div>
                @endif
            </div>
        @empty
            <div class="col-span-full py-16 text-center text-slate-500">
                Belum ada data sertifikasi.
            </div>
        @endforelse
    </div>
</div>
@endsection
