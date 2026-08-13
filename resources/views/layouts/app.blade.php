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
            color: #f8fafc;
        }
        .flat-card {
            background-color: #0f172a;
            border: 1px solid #1e293b;
        }
        .flat-card:hover {
            border-color: #334155;
        }
        .flat-nav {
            background-color: rgba(9, 13, 22, 0.95);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid #1e293b;
        }
    </style>
</head>
<body class="antialiased bg-[#090d16] text-slate-100 min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">

    <!-- Sticky Navigation -->
    <nav x-data="{ open: false, scrolled: false }" 
         @scroll.window="scrolled = (window.pageYOffset > 20)"
         :class="scrolled ? 'flat-nav py-3 shadow-md' : 'bg-[#090d16]/90 backdrop-blur-md py-4 border-b border-slate-800/80'"
         class="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
                <!-- Brand / Logo -->
                <a href="{{ route('home') }}" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg transition-colors group-hover:bg-indigo-500">
                        RP
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-white text-base group-hover:text-indigo-400 transition-colors">Rifky Permana</span>
                        <span class="text-xs text-slate-400 font-medium">S.Kom.</span>
                    </div>
                </a>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="{{ route('home') }}#about" class="text-slate-300 hover:text-white text-sm font-medium transition-colors">Tentang Saya</a>
                    <a href="{{ route('home') }}#skills" class="text-slate-300 hover:text-white text-sm font-medium transition-colors">Keahlian</a>
                    <a href="{{ route('home') }}#projects" class="text-slate-300 hover:text-white text-sm font-medium transition-colors">Proyek</a>
                    <a href="{{ route('home') }}#certificates" class="text-slate-300 hover:text-white text-sm font-medium transition-colors">Sertifikasi</a>
                    <a href="{{ route('home') }}#contact" class="text-slate-300 hover:text-white text-sm font-medium transition-colors">Kontak</a>
                </div>

                <div class="hidden md:flex items-center gap-3">
                    <a href="{{ route('admin.login') }}" class="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5">
                        <i class="ri-lock-line text-indigo-400"></i> Admin Login
                    </a>
                    <a href="{{ route('home') }}#contact" class="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
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
            <div x-show="open" x-collapse class="md:hidden mt-3 pb-4 space-y-2 bg-slate-900 rounded-xl p-4 border border-slate-800">
                <a @click="open = false" href="{{ route('home') }}#about" class="block text-slate-300 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-800">Tentang Saya</a>
                <a @click="open = false" href="{{ route('home') }}#skills" class="block text-slate-300 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-800">Keahlian</a>
                <a @click="open = false" href="{{ route('home') }}#projects" class="block text-slate-300 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-800">Proyek</a>
                <a @click="open = false" href="{{ route('home') }}#certificates" class="block text-slate-300 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-800">Sertifikasi</a>
                <a @click="open = false" href="{{ route('home') }}#contact" class="block text-slate-300 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-800">Kontak</a>
                <div class="pt-2 border-t border-slate-800 flex flex-col gap-2">
                    <a href="{{ route('admin.login') }}" class="text-center py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-lg">Admin Login</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow pt-24">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-[#060911] border-t border-slate-800/80 py-12 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base">
                        RP
                    </div>
                    <div>
                        <p class="font-bold text-slate-200 text-sm">Rifky Permana, S.Kom.</p>
                        <p class="text-xs text-slate-400">Fresh Graduate Informatika & Web Developer</p>
                    </div>
                </div>

                <div class="flex items-center space-x-6 text-sm text-slate-400">
                    <a href="{{ route('home') }}#about" class="hover:text-indigo-400 transition-colors">Tentang</a>
                    <a href="{{ route('home') }}#projects" class="hover:text-indigo-400 transition-colors">Proyek</a>
                    <a href="{{ route('home') }}#certificates" class="hover:text-indigo-400 transition-colors">Sertifikasi</a>
                    <a href="{{ route('home') }}#contact" class="hover:text-indigo-400 transition-colors">Kontak</a>
                </div>

                <div class="flex items-center space-x-4">
                    <a href="{{ $profile->github_url ?? 'https://github.com' }}" target="_blank" class="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                        <i class="ri-github-fill text-lg"></i>
                    </a>
                    <a href="{{ $profile->linkedin_url ?? 'https://linkedin.com' }}" target="_blank" class="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                        <i class="ri-linkedin-fill text-lg"></i>
                    </a>
                    <a href="mailto:{{ $profile->email ?? 'rifkypermana.dev@gmail.com' }}" class="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                        <i class="ri-mail-fill text-lg"></i>
                    </a>
                </div>
            </div>

            <div class="mt-8 pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
                &copy; {{ date('Y') }} Rifky Permana, S.Kom. Dibuat dengan PHP Laravel & Tailwind CSS.
            </div>
        </div>
    </footer>

</body>
</html>

