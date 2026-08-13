@extends('layouts.app')

@section('title', $profile->full_name . ' | Fresh Graduate Informatika & Web Developer')

@section('content')

<!-- Hero Section -->
<section class="relative overflow-hidden py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Hero Text Left -->
            <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                <!-- Status Badge -->
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span class="w-2 h-2 rounded-full bg-emerald-400 -ml-4"></span>
                    <span>Tersedia untuk Pekerjaan Full-time & Remote</span>
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    Halo, Saya <span class="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">{{ $profile->full_name }}</span>
                </h1>

                <p class="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
                    {{ $profile->title }}
                </p>

                <p class="text-slate-400 text-base max-w-2xl leading-relaxed">
                    {{ $profile->bio }}
                </p>

                <!-- CTA Buttons -->
                <div class="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <a href="#projects" class="px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 flex items-center gap-2">
                        <i class="ri-folder-user-line text-lg"></i> Lihat Proyek Saya
                    </a>
                    
                    @if($profile->resume_path)
                        <a href="{{ asset('storage/' . $profile->resume_path) }}" target="_blank" class="px-7 py-3.5 text-sm font-bold text-slate-200 glass-card hover:bg-slate-800 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all flex items-center gap-2">
                            <i class="ri-file-download-line text-lg text-indigo-400"></i> Unduh CV (PDF)
                        </a>
                    @else
                        <a href="#contact" class="px-7 py-3.5 text-sm font-bold text-slate-200 glass-card hover:bg-slate-800 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all flex items-center gap-2">
                            <i class="ri-mail-line text-lg text-indigo-400"></i> Hubungi Saya
                        </a>
                    @endif
                </div>

                <!-- Quick Stats -->
                <div class="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                    <div>
                        <p class="text-2xl lg:text-3xl font-extrabold text-white">22</p>
                        <p class="text-xs text-slate-400">Tahun</p>
                    </div>
                    <div>
                        <p class="text-2xl lg:text-3xl font-extrabold text-indigo-400">S.Kom.</p>
                        <p class="text-xs text-slate-400">Fresh Graduate</p>
                    </div>
                    <div>
                        <p class="text-2xl lg:text-3xl font-extrabold text-cyan-400">{{ count($projects) }}+</p>
                        <p class="text-xs text-slate-400">Proyek Web</p>
                    </div>
                </div>
            </div>

            <!-- Hero Image Right -->
            <div class="lg:col-span-5 flex justify-center">
                <div class="relative">
                    <!-- Glow Behind Avatar -->
                    <div class="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-purple-600 opacity-40 blur-2xl animate-pulse"></div>
                    
                    <!-- Avatar Frame -->
                    <div class="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden glass-panel p-3 border border-slate-700/60 shadow-2xl">
                        @if($profile->avatar)
                            <img src="{{ asset('storage/' . $profile->avatar) }}" alt="{{ $profile->full_name }}" class="w-full h-full object-cover rounded-2xl">
                        @else
                            <div class="w-full h-full bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-indigo-500/20">
                                <div class="w-24 h-24 rounded-full bg-indigo-600/30 border-2 border-indigo-400 flex items-center justify-center mb-4">
                                    <i class="ri-user-3-line text-5xl text-indigo-300"></i>
                                </div>
                                <span class="font-bold text-slate-200 text-lg">Rifky Permana, S.Kom.</span>
                                <span class="text-xs text-indigo-400 mt-1">Fullstack Web Developer</span>
                            </div>
                        @endif
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- About Section -->
<section id="about" class="py-16 bg-slate-900/40 border-y border-slate-800/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Tentang Saya</h2>
            <p class="text-3xl font-extrabold text-white">Lulusan Baru Informatika dengan Passion di Web Development</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="glass-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all">
                <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl mb-4">
                    <i class="ri-graduation-cap-line"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-100 mb-2">Pendidikan Akademik</h3>
                <p class="text-slate-400 text-sm leading-relaxed">
                    Lulusan Sarjana Komputer (S.Kom) S1 Teknik Informatika. Memiliki pemahaman kuat mengenai Pemrograman Berorientasi Objek (OOP), Struktur Data, Basis Data Relasional, dan Rekayasa Perangkat Lunak.
                </p>
            </div>

            <div class="glass-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all">
                <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl mb-4">
                    <i class="ri-code-s-slash-line"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-100 mb-2">Pengembangan Laravel & PHP</h3>
                <p class="text-slate-400 text-sm leading-relaxed">
                    Berfokus pada pengembangan backend dan CMS menggunakan framework **PHP Laravel**, pengelolaan database MySQL/SQLite, pembuatan REST API, dan sistem otentikasi yang aman.
                </p>
            </div>

            <div class="glass-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all">
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl mb-4">
                    <i class="ri-palette-line"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-100 mb-2">Styling Modern Tailwind CSS</h3>
                <p class="text-slate-400 text-sm leading-relaxed">
                    Mampu mendesain antarmuka pengguna (UI/UX) yang bersih, elegan, responsif di HP/Laptop, serta mengimplementasikan efek visual modern dengan **Tailwind CSS**.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Skills Section -->
<section id="skills" class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Tech Stack & Keahlian</h2>
            <p class="text-3xl font-extrabold text-white">Teknologi yang Saya Kuasai</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach($skills as $category => $items)
                <div class="glass-card p-6 rounded-2xl border border-slate-800">
                    <h3 class="text-base font-bold text-indigo-300 mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
                        <i class="ri-checkbox-circle-fill text-indigo-400"></i> {{ $category }}
                    </h3>
                    <div class="flex flex-wrap gap-2.5">
                        @foreach($items as $item)
                            <span class="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 border border-slate-700/80 rounded-lg hover:border-indigo-500 transition-colors">
                                {{ $item }}
                            </span>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>

<!-- Projects Showcase -->
<section id="projects" class="py-16 bg-slate-900/40 border-y border-slate-800/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Portofolio Proyek</h2>
                <p class="text-3xl font-extrabold text-white">Hasil Karya & Aplikasi Terbaru</p>
            </div>
            <p class="text-slate-400 text-sm max-w-md">
                Kumpulan proyek aplikasi web yang telah saya bangun menggunakan Laravel, Tailwind CSS, dan database relasional.
            </p>
        </div>

        <!-- Project Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @forelse($projects as $project)
                <div class="glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1">
                    <div>
                        <!-- Thumbnail Image -->
                        <div class="relative h-48 bg-slate-800 overflow-hidden">
                            @if($project->thumbnail)
                                <img src="{{ asset('storage/' . $project->thumbnail) }}" alt="{{ $project->title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            @else
                                <div class="w-full h-full bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-6 text-center">
                                    <i class="ri-code-s-line text-5xl text-indigo-500/40"></i>
                                </div>
                            @endif
                            <div class="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-[11px] font-semibold text-indigo-300 border border-slate-700">
                                {{ $project->category }}
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                                <a href="{{ route('projects.detail', $project->slug) }}">{{ $project->title }}</a>
                            </h3>
                            <p class="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
                                {{ $project->summary }}
                            </p>

                            <!-- Tech Stack Tags -->
                            @if(!empty($project->tech_stack))
                                <div class="flex flex-wrap gap-1.5 mb-4">
                                    @foreach($project->tech_stack as $tech)
                                        <span class="px-2 py-0.5 text-[10px] font-mono text-slate-300 bg-slate-800 rounded border border-slate-700/60">
                                            {{ $tech }}
                                        </span>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    </div>

                    <!-- Card Footer Links -->
                    <div class="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <a href="{{ route('projects.detail', $project->slug) }}" class="text-indigo-400 font-semibold hover:text-indigo-300 flex items-center gap-1">
                            Detail Proyek <i class="ri-arrow-right-line"></i>
                        </a>

                        <div class="flex items-center gap-3">
                            @if($project->github_url)
                                <a href="{{ $project->github_url }}" target="_blank" class="text-slate-400 hover:text-white text-lg" title="GitHub Repository">
                                    <i class="ri-github-line"></i>
                                </a>
                            @endif
                            @if($project->demo_url)
                                <a href="{{ $project->demo_url }}" target="_blank" class="text-slate-400 hover:text-white text-lg" title="Live Demo">
                                    <i class="ri-external-link-line"></i>
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-span-full py-12 text-center text-slate-500">
                    Belum ada proyek yang ditampilkan.
                </div>
            @endforelse
        </div>
    </div>
</section>

<!-- Certifications Section -->
<section id="certificates" class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Prestasi & Sertifikasi</h2>
                <p class="text-3xl font-extrabold text-white">Lisensi & Sertifikat Digital</p>
            </div>
            <a href="{{ route('certificates.index') }}" class="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Lihat Semua Sertifikat <i class="ri-arrow-right-line"></i>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @forelse($certificates as $cert)
                <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
                    <div>
                        <div class="flex items-start justify-between gap-3 mb-4">
                            <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl">
                                <i class="ri-award-fill"></i>
                            </div>
                            <span class="text-[11px] font-mono text-slate-400 px-2.5 py-1 bg-slate-800 rounded-full">
                                {{ $cert->category }}
                            </span>
                        </div>

                        <h3 class="text-base font-bold text-white mb-1">{{ $cert->title }}</h3>
                        <p class="text-xs font-semibold text-indigo-400 mb-3">{{ $cert->issuer }}</p>
                        
                        @if($cert->description)
                            <p class="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                                {{ $cert->description }}
                            </p>
                        @endif
                    </div>

                    <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span class="text-slate-500 text-[11px]">
                            <i class="ri-calendar-line"></i> {{ $cert->issue_date ? $cert->issue_date->format('M Y') : 'Terbaru' }}
                        </span>

                        @if($cert->credential_url)
                            <a href="{{ $cert->credential_url }}" target="_blank" class="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                                Verifikasi Credential <i class="ri-external-link-line"></i>
                            </a>
                        @endif
                    </div>
                </div>
            @empty
                <div class="col-span-full py-12 text-center text-slate-500">
                    Belum ada sertifikasi yang ditambahkan.
                </div>
            @endforelse
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="py-16 bg-slate-900/40 border-t border-slate-800/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Contact Info Left -->
            <div class="lg:col-span-5 space-y-6">
                <div>
                    <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Kontak Saya</h2>
                    <p class="text-3xl font-extrabold text-white">Mari Berdiskusi & Bekerja Sama!</p>
                </div>
                <p class="text-slate-400 text-sm leading-relaxed">
                    Apakah Anda memiliki tawaran pekerjaan, proyek pembuatan website, atau sekadar ingin menyapa? Silakan hubungi saya melalui formulir ini atau kanal sosial media di bawah.
                </p>

                <div class="space-y-4 pt-4">
                    <div class="flex items-center gap-4 p-4 rounded-xl glass-card border border-slate-800">
                        <div class="w-11 h-11 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl">
                            <i class="ri-mail-line"></i>
                        </div>
                        <div>
                            <p class="text-xs text-slate-400 font-medium">Email Pribadi</p>
                            <p class="text-sm font-bold text-white">{{ $profile->email }}</p>
                        </div>
                    </div>

                    @if($profile->whatsapp)
                        <div class="flex items-center gap-4 p-4 rounded-xl glass-card border border-slate-800">
                            <div class="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
                                <i class="ri-whatsapp-line"></i>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400 font-medium">WhatsApp</p>
                                <p class="text-sm font-bold text-white">+{{ $profile->whatsapp }}</p>
                            </div>
                        </div>
                    @endif

                    <div class="flex items-center gap-4 p-4 rounded-xl glass-card border border-slate-800">
                        <div class="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                            <i class="ri-map-pin-2-line"></i>
                        </div>
                        <div>
                            <p class="text-xs text-slate-400 font-medium">Lokasi</p>
                            <p class="text-sm font-bold text-white">Indonesia (Siap Relokasi / WFH)</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Form Right -->
            <div class="lg:col-span-7">
                <div class="glass-panel p-8 rounded-3xl border border-slate-800">
                    <h3 class="text-xl font-bold text-white mb-6">Kirim Pesan Langsung</h3>

                    @if(session('success'))
                        <div class="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                            <i class="ri-checkbox-circle-fill text-emerald-400 text-xl"></i>
                            <span>{{ session('success') }}</span>
                        </div>
                    @endif

                    <form action="{{ route('contact.send') }}" method="POST" class="space-y-5">
                        @csrf
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label class="block text-xs font-semibold text-slate-300 mb-2">Nama Lengkap *</label>
                                <input type="text" name="name" required placeholder="Contoh: Budi Santoso"
                                       class="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-300 mb-2">Email Anda *</label>
                                <input type="email" name="email" required placeholder="nama@email.com"
                                       class="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-2">Subjek / Topik</label>
                            <input type="text" name="subject" placeholder="Tawaran Pekerjaan / Project Web"
                                   class="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors">
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-2">Pesan *</label>
                            <textarea name="message" rows="4" required placeholder="Tuliskan pesan atau detail penawaran proyek Anda di sini..."
                                      class="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"></textarea>
                        </div>

                        <button type="submit" class="w-full py-4 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01]">
                            <i class="ri-send-plane-fill mr-1"></i> Kirim Pesan Sekarang
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</section>

@endsection
