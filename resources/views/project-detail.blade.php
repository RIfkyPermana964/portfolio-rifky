@extends('layouts.app')

@section('title', $project->title . ' | Detail Proyek - Rifky Permana')

@section('content')
<div class="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <a href="{{ route('home') }}#projects" class="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
        <i class="ri-arrow-left-line"></i> Kembali ke Daftar Proyek
    </a>

    <div class="space-y-6">
        <div class="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-semibold text-indigo-300">
            {{ $project->category }}
        </div>

        <h1 class="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {{ $project->title }}
        </h1>

        <!-- Tech Stack Badges -->
        @if(!empty($project->tech_stack))
            <div class="flex flex-wrap gap-2 pt-2">
                @foreach($project->tech_stack as $tech)
                    <span class="px-3 py-1 text-xs font-mono text-slate-200 bg-slate-800 rounded-lg border border-slate-700">
                        {{ $tech }}
                    </span>
                @endforeach
            </div>
        @endif

        <!-- Action Links -->
        <div class="flex flex-wrap gap-4 pt-2 pb-6 border-b border-slate-800">
            @if($project->demo_url)
                <a href="{{ $project->demo_url }}" target="_blank" class="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5">
                    <i class="ri-external-link-line"></i> Live Demo / Uji Coba
                </a>
            @endif
            @if($project->github_url)
                <a href="{{ $project->github_url }}" target="_blank" class="px-5 py-2.5 text-xs font-bold text-slate-200 glass-card hover:bg-slate-800 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5">
                    <i class="ri-github-line text-lg"></i> Kode Sumber (GitHub)
                </a>
            @endif
        </div>

        <!-- Thumbnail Image -->
        @if($project->thumbnail)
            <div class="rounded-2xl overflow-hidden glass-panel border border-slate-800">
                <img src="{{ asset('storage/' . $project->thumbnail) }}" alt="{{ $project->title }}" class="w-full h-auto max-h-[500px] object-cover">
            </div>
        @endif

        <!-- Project Description Content -->
        <div class="glass-card p-8 rounded-2xl border border-slate-800 space-y-4 text-slate-300 leading-relaxed text-sm">
            <h2 class="text-lg font-bold text-white mb-2">Ringkasan Proyek</h2>
            <p class="text-base text-slate-200 leading-relaxed">{{ $project->summary }}</p>

            @if($project->description)
                <hr class="border-slate-800 my-6">
                <h2 class="text-lg font-bold text-white mb-2">Penjelasan Detail & Fitur Utama</h2>
                <div class="whitespace-pre-line text-slate-300">
                    {{ $project->description }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
