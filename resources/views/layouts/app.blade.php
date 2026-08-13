<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portofolio Resmi Rifky Permana, S.Kom. - Lulusan S1 Informatika & Web Developer. Menampilkan proyek web, sertifikasi, dan keahlian.">
    <title>@yield('title', 'Rifky Permana | Web Developer & Informatika Fresh Graduate')</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- FontAwesome / RemixIcon via CDN -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css" rel="stylesheet"/>

    <!-- Vite Assets -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #090d16;
            color: #f1f5f9;
        }
        .glow-bg {
            background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%);
        }
        .glass-panel {
            background: rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-card {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.07);
        }
        .glass-card:hover {
            border-color: rgba(99, 102, 241, 0.4);
            box-shadow: 0 0 25px rgba(99, 102, 241, 0.15);
        }
    </style>
</head>
<body class="antialiased min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white glow-bg">

    <!-- Sticky Navigation -->
    <nav x-data="{ open: false, scrolled: false }" 
         @scroll.window="scrolled = (window.pageYOffset > 20)"
         :class="scrolled ? 'glass-panel py-3 border-b border-slate-800/80 shadow-2xl' : 'bg-transparent py-5'"
         class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
                <!-- Brand / Logo -->
                <a href="{{ route('home') }}" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                        RP
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-slate-100 text-lg group-hover:text-indigo-400 transition-colors">Rifky Permana</span>
                        <span class="text-xs text-indigo-400 font-mono">S.Kom.</span>
                    </div>
                </a>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="{{ route('home') }}#about" class="text-slate-300 hover:text-indigo-400 text-sm font-medium transition-colors">Tentang Saya</a>
                    <a href="{{ route('home') }}#skills" class="text-slate-300 hover:text-indigo-400 text-sm font-medium transition-colors">Keahlian</a>
                    <a href="{{ route('home') }}#projects" class="text-slate-300 hover:text-indigo-400 text-sm font-medium transition-colors">Proyek</a>
                    <a href="{{ route('home') }}#certificates" class="text-slate-300 hover:text-indigo-400 text-sm font-medium transition-colors">Sertifikasi</a>
                    <a href="{{ route('home') }}#contact" class="text-slate-300 hover:text-indigo-400 text-sm font-medium transition-colors">Kontak</a>
                </div>

                <div class="hidden md:flex items-center gap-3">
                    <a href="{{ route('admin.login') }}" class="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white glass-card rounded-lg transition-all flex items-center gap-1.5">
                        <i class="ri-lock-line text-indigo-400"></i> Admin Login
                    </a>
                    <a href="{{ route('home') }}#contact" class="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-lg shadow-lg shadow-indigo-600/30 transition-all hover:scale-105">
                        <i class="ri-mail-send-line mr-1"></i> Hubungi Saya
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button @click="open = !open" class="md:hidden text-slate-300 hover:text-white focus:outline-none p-2">
                    <i class="ri-menu-3-line text-2xl" x-show="!open"></i>
                    <i class="ri-close-line text-2xl" x-show="open"></i>
                </button>
            </div>

            <!-- Mobile Dropdown -->
            <div x-show="open" x-collapse class="md:hidden mt-4 pb-4 space-y-3 glass-panel rounded-2xl p-4 border border-slate-800">
                <a @click="open = false" href="{{ route('home') }}#about" class="block text-slate-300 hover:text-indigo-400 font-medium py-2 px-3 rounded-lg hover:bg-slate-800/50">Tentang Saya</a>
                <a @click="open = false" href="{{ route('home') }}#skills" class="block text-slate-300 hover:text-indigo-400 font-medium py-2 px-3 rounded-lg hover:bg-slate-800/50">Keahlian</a>
                <a @click="open = false" href="{{ route('home') }}#projects" class="block text-slate-300 hover:text-indigo-400 font-medium py-2 px-3 rounded-lg hover:bg-slate-800/50">Proyek</a>
                <a @click="open = false" href="{{ route('home') }}#certificates" class="block text-slate-300 hover:text-indigo-400 font-medium py-2 px-3 rounded-lg hover:bg-slate-800/50">Sertifikasi</a>
                <a @click="open = false" href="{{ route('home') }}#contact" class="block text-slate-300 hover:text-indigo-400 font-medium py-2 px-3 rounded-lg hover:bg-slate-800/50">Kontak</a>
                <div class="pt-2 border-t border-slate-800 flex flex-col gap-2">
                    <a href="{{ route('admin.login') }}" class="text-center py-2 text-xs font-semibold text-slate-300 glass-card rounded-lg">Admin Login</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow pt-24">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-slate-950 border-t border-slate-800/80 py-12 mt-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                        RP
                    </div>
                    <div>
                        <p class="font-bold text-slate-200 text-sm">Rifky Permana, S.Kom.</p>
                        <p class="text-xs text-slate-500">Fresh Graduate Informatika & Web Developer</p>
                    </div>
                </div>

                <div class="flex items-center space-x-6 text-sm text-slate-400">
                    <a href="{{ route('home') }}#about" class="hover:text-indigo-400 transition-colors">Tentang</a>
                    <a href="{{ route('home') }}#projects" class="hover:text-indigo-400 transition-colors">Proyek</a>
                    <a href="{{ route('home') }}#certificates" class="hover:text-indigo-400 transition-colors">Sertifikasi</a>
                    <a href="{{ route('home') }}#contact" class="hover:text-indigo-400 transition-colors">Kontak</a>
                </div>

                <div class="flex items-center space-x-4">
                    <a href="{{ $profile->github_url ?? 'https://github.com' }}" target="_blank" class="w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                        <i class="ri-github-fill text-lg"></i>
                    </a>
                    <a href="{{ $profile->linkedin_url ?? 'https://linkedin.com' }}" target="_blank" class="w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                        <i class="ri-linkedin-fill text-lg"></i>
                    </a>
                    <a href="mailto:{{ $profile->email ?? 'rifkypermana.dev@gmail.com' }}" class="w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                        <i class="ri-mail-fill text-lg"></i>
                    </a>
                </div>
            </div>

            <div class="mt-8 pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
                &copy; {{ date('Y') }} Rifky Permana. Dibuat dengan PHP Laravel & Tailwind CSS. All rights reserved.
            </div>
        </div>
    </footer>

</body>
</html>
