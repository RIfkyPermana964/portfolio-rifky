@extends('layouts.app')

@section('title', $profile->full_name . ' | Fresh Graduate Informatika & Web Developer')

@section('content')

<!-- Hero Section -->
<section class="relative py-12 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Hero Text Left -->
            <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                <!-- Status Badge -->
                <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-semibold">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Tersedia untuk Pekerjaan Full-time & Remote</span>
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    Halo, Saya <span class="text-indigo-400">{{ $profile->full_name }}</span>
                </h1>

                <p class="text-lg sm:text-xl text-slate-200 font-semibold leading-relaxed">
                    {{ $profile->title }}
                </p>

                <p class="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                    {{ $profile->bio }}
                </p>

                <!-- CTA Buttons -->
                <div class="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <a href="#projects" class="px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-2">
                        <i class="ri-folder-user-line text-lg"></i> Lihat Proyek Saya
                    </a>
                    
                    @if($profile->resume_path)
                        <a href="{{ asset('storage/' . $profile->resume_path) }}" target="_blank" class="px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-2">
                            <i class="ri-file-download-line text-lg text-indigo-400"></i> Unduh CV (PDF)
                        </a>
                    @else
                        <a href="#contact" class="px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-2">
                            <i class="ri-mail-line text-lg text-indigo-400"></i> Hubungi Saya
                        </a>
                    @endif
                </div>

                <!-- Quick Stats -->
                <div class="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                    <div>
                        <p class="text-2xl lg:text-3xl font-extrabold text-white">22</p>
                        <p class="text-xs text-slate-400 font-medium">Tahun</p>
                    </div>
                    <div>
                        <p class="text-2xl lg:text-3xl font-extrabold text-indigo-400">S.Kom.</p>
                        <p class="text-xs text-slate-400 font-medium">Fresh Graduate</p>
                    </div>
                    <div>
                        <p class="text-2xl lg:text-3xl font-extrabold text-white">{{ count($projects) }}+</p>
                        <p class="text-xs text-slate-400 font-medium">Proyek Web</p>
                    </div>
                </div>
            </div>

            <!-- Hero Image / Profile Card Right -->
            <div class="lg:col-span-5 flex justify-center">
                <div class="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl bg-slate-900 p-3 border border-slate-800 shadow-xl">
                    @if($profile->avatar)
                        <img src="{{ asset('storage/' . $profile->avatar) }}" alt="{{ $profile->full_name }}" class="w-full h-full object-cover rounded-xl">
                    @else
                        <div class="w-full h-full bg-[#0d1322] rounded-xl flex flex-col items-center justify-center p-6 text-center border border-slate-800/80">
                            <div class="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-indigo-400">
                                <i class="ri-user-3-line text-4xl"></i>
                            </div>
                            <span class="font-bold text-white text-base">{{ $profile->full_name }}</span>
                            <span class="text-xs text-indigo-400 mt-1 font-medium text-center px-4 line-clamp-2">{{ $profile->title }}</span>
                        </div>
                    @endif
                </div>
            </div>

        </div>
    </div>
</section>

<!-- About Section -->
<section id="about" class="py-16 bg-[#060911]/60 border-y border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Tentang Saya</h2>
            <p class="text-2xl sm:text-3xl font-extrabold text-white">Lulusan Baru Informatika dengan Passion di IT Networking</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flat-card p-6 rounded-xl transition-colors">
                <div class="w-11 h-11 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl mb-4">
                    <i class="ri-graduation-cap-line"></i>
                </div>
                <h3 class="text-base font-bold text-white mb-2">Pendidikan Akademik</h3>
                <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Lulusan Sarjana Komputer (S.Kom) S1 Informatika. Memiliki keahlian utama dan passion di bidang IT Networking, mencakup perancangan topologi, instalasi, serta konfigurasi perangkat jaringan. Turut dilengkapi dengan kemampuan dasar pengembangan sistem menggunakan konsep OOP pada PHP dan framework Laravel.
                </p>
            </div>

            <div class="flat-card p-6 rounded-xl transition-colors">
                <div class="w-11 h-11 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl mb-4">
                    <i class="ri-code-s-slash-line"></i>
                </div>
                <h3 class="text-base font-bold text-white mb-2">Pengembangan Laravel & PHP | Styling Modern Tailwind CSS</h3>
                <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Berfokus pada pengembangan backend dan CMS menggunakan framework PHP Laravel, pengelolaan database MySQL/SQLite, pembuatan REST API, dan sistem otentikas, Serta mendesain antarmuka pengguna (UI/UX) yang bersih, fleksibel, responsif di HP/Laptop, serta mengimplementasikan layout elegan dengan Tailwind CSS.
                </p>
            </div>

            <div class="flat-card p-6 rounded-xl transition-colors">
                <div class="w-11 h-11 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl mb-4">
                    <i class="ri-palette-line"></i>
                </div>
                <h3 class="text-base font-bold text-white mb-2">Network Administration & Monitoring</h3>
                <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Memiliki latar belakang NOC dan penyelesaian masalah (troubleshooting) jaringan. Mampu menangani infrastruktur fisik secara langsung dan memanfaatkan tools monitoring standar industri (PRTG, Zabbix) untuk memastikan operasional jaringan berjalan optimal dan stabil setiap saat.
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
            <p class="text-2xl sm:text-3xl font-extrabold text-white">Teknologi yang Saya Kuasai</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @foreach($skills as $category => $items)
                <div class="flat-card p-6 rounded-xl">
                    <h3 class="text-sm font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
                        <i class="ri-checkbox-circle-fill text-indigo-400"></i> {{ $category }}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        @foreach($items as $item)
                            <span class="px-3 py-1 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-md">
                                {{ $item->name }}
                            </span>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>

<!-- Projects Showcase -->
<section id="projects" class="py-16 bg-[#060911]/60 border-y border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Portofolio Proyek</h2>
                <p class="text-2xl sm:text-3xl font-extrabold text-white">Hasil Karya & Aplikasi Terbaru</p>
            </div>
            <p class="text-slate-400 text-xs sm:text-sm max-w-md">
                Kumpulan proyek aplikasi web yang telah saya bangun menggunakan Laravel, Tailwind CSS, dan database relasional.
            </p>
        </div>

        <!-- Project Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @forelse($projects as $project)
                <div class="flat-card rounded-xl overflow-hidden flex flex-col justify-between transition-colors">
                    <div>
                        <!-- Thumbnail Image -->
                        <div class="relative h-48 bg-slate-900 overflow-hidden border-b border-slate-800">
                            @if($project->thumbnail)
                                <img src="{{ asset('storage/' . $project->thumbnail) }}" alt="{{ $project->title }}" class="w-full h-full object-cover">
                            @else
                                <div class="w-full h-full bg-[#0d1322] flex items-center justify-center p-6 text-center">
                                    <i class="ri-code-s-line text-4xl text-slate-700"></i>
                                </div>
                            @endif
                            <div class="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/90 rounded text-[11px] font-semibold text-indigo-400 border border-slate-800">
                                {{ $project->category }}
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-5">
                            <h3 class="text-base font-bold text-white hover:text-indigo-400 transition-colors mb-2">
                                <a href="{{ route('projects.detail', $project->slug) }}">{{ $project->title }}</a>
                            </h3>
                            <p class="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
                                {{ $project->summary }}
                            </p>

                            <!-- Tech Stack Tags -->
                            @if(!empty($project->tech_stack))
                                <div class="flex flex-wrap gap-1.5 mb-2">
                                    @foreach($project->tech_stack as $tech)
                                        <span class="px-2 py-0.5 text-[10px] font-mono text-slate-300 bg-slate-900 rounded border border-slate-800">
                                            {{ $tech }}
                                        </span>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    </div>

                    <!-- Card Footer Links -->
                    <div class="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <a href="{{ route('projects.detail', $project->slug) }}" class="text-indigo-400 font-semibold hover:text-indigo-300 flex items-center gap-1">
                            Detail Proyek <i class="ri-arrow-right-line"></i>
                        </a>

                        <div class="flex items-center gap-3">
                            @if($project->github_url)
                                <a href="{{ $project->github_url }}" target="_blank" class="text-slate-400 hover:text-white text-base" title="GitHub Repository">
                                    <i class="ri-github-line"></i>
                                </a>
                            @endif
                            @if($project->demo_url)
                                <a href="{{ $project->demo_url }}" target="_blank" class="text-slate-400 hover:text-white text-base" title="Live Demo">
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
                <p class="text-2xl sm:text-3xl font-extrabold text-white">Lisensi & Sertifikat Digital</p>
            </div>
            <a href="{{ route('certificates.index') }}" class="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Lihat Semua Sertifikat <i class="ri-arrow-right-line"></i>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @forelse($certificates as $cert)
                <div class="flat-card p-6 rounded-xl flex flex-col justify-between">
                    <div>
                        <div class="flex items-start justify-between gap-3 mb-4">
                            <div class="w-9 h-9 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-lg">
                                <i class="ri-award-fill"></i>
                            </div>
                            <span class="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 bg-slate-900 rounded border border-slate-800">
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
                        <span class="text-slate-400 text-[11px]">
                            <i class="ri-calendar-line"></i> {{ $cert->issue_date ? $cert->issue_date->format('M Y') : 'Terbaru' }}
                        </span>

                        @if($cert->credential_url)
                            <a href="{{ $cert->credential_url }}" target="_blank" class="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                                Verifikasi <i class="ri-external-link-line"></i>
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
<section id="contact" class="py-16 bg-[#060911]/60 border-t border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Contact Info Left -->
            <div class="lg:col-span-5 space-y-6">
                <div>
                    <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Kontak Saya</h2>
                    <p class="text-2xl sm:text-3xl font-extrabold text-white">Mari Berdiskusi & Bekerja Sama!</p>
                </div>
                <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Apakah Anda memiliki tawaran pekerjaan, proyek pembuatan website, atau sekadar ingin menyapa? Silakan hubungi saya melalui formulir ini atau kanal di bawah.
                </p>

                <div class="space-y-3 pt-2">
                    <div class="flex items-center gap-4 p-4 rounded-xl flat-card">
                        <div class="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-lg">
                            <i class="ri-mail-line"></i>
                        </div>
                        <div>
                            <p class="text-xs text-slate-400 font-medium">Email Pribadi</p>
                            <p class="text-sm font-bold text-white">{{ $profile->email }}</p>
                        </div>
                    </div>

                    @if($profile->whatsapp)
                        <div class="flex items-center gap-4 p-4 rounded-xl flat-card">
                            <div class="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg">
                                <i class="ri-whatsapp-line"></i>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400 font-medium">WhatsApp</p>
                                <p class="text-sm font-bold text-white">+{{ $profile->whatsapp }}</p>
                            </div>
                        </div>
                    @endif

                    <div class="flex items-center gap-4 p-4 rounded-xl flat-card">
                        <div class="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-lg">
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
                <div class="flat-card p-6 sm:p-8 rounded-2xl">
                    <h3 class="text-lg font-bold text-white mb-6">Kirim Pesan Langsung</h3>

                    @if(session('success'))
                        <div class="mb-6 p-4 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
                            <i class="ri-checkbox-circle-fill text-emerald-400 text-lg"></i>
                            <span>{{ session('success') }}</span>
                        </div>
                    @endif

                    <form action="{{ route('contact.send') }}" method="POST" class="space-y-4">
                        @csrf
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-slate-300 mb-1.5">Nama Lengkap *</label>
                                <input type="text" name="name" required placeholder="Contoh: Budi Santoso"
                                       class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email Anda *</label>
                                <input type="email" name="email" required placeholder="nama@email.com"
                                       class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Subjek / Topik</label>
                            <input type="text" name="subject" placeholder="Tawaran Pekerjaan / Project Web"
                                   class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors">
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Pesan *</label>
                            <textarea name="message" rows="4" required placeholder="Tuliskan pesan atau detail penawaran proyek Anda di sini..."
                                      class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"></textarea>
                        </div>

                        <button type="submit" class="w-full py-3 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
                            <i class="ri-send-plane-fill mr-1"></i> Kirim Pesan Sekarang
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</section>

@endsection

