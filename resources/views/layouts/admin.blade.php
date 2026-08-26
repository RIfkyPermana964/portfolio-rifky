<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Dashboard | Rifky Permana Portfolio')</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- RemixIcon -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css" rel="stylesheet"/>

    <!-- Vite Assets -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #0b0f19;
            color: #f1f5f9;
        }
        .admin-sidebar {
            background-color: #0f172a;
            border-right: 1px solid rgba(255, 255, 255, 0.06);
        }
        .glass-card {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.07);
        }
    </style>
</head>
<body class="antialiased min-h-screen flex bg-slate-950 text-slate-100" x-data="{ sidebarOpen: false }">

    <!-- Sidebar -->
    <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
           class="fixed inset-y-0 left-0 z-40 w-64 admin-sidebar transition-transform duration-300 flex flex-col justify-between">
        <div>
            <!-- Sidebar Header -->
            <div class="h-20 flex items-center px-6 border-b border-slate-800/80 justify-between">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                        RP
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-slate-100 text-sm">Dashboard Admin</span>
                        <span class="text-[10px] text-indigo-400">Management Panel</span>
                    </div>
                </a>
                <button @click="sidebarOpen = false" class="md:hidden text-slate-400 hover:text-white">
                    <i class="ri-close-line text-xl"></i>
                </button>
            </div>

            <!-- Navigation Links -->
            <nav class="p-4 space-y-1.5 text-sm font-medium">
                <a href="{{ route('admin.dashboard') }}" 
                   class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all {{ request()->routeIs('admin.dashboard') ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' }}">
                    <i class="ri-dashboard-3-line text-lg"></i> Overview
                </a>

                <a href="{{ route('admin.projects.index') }}" 
                   class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all {{ request()->routeIs('admin.projects.*') ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' }}">
                    <i class="ri-code-box-line text-lg"></i> Kelola Proyek
                </a>

                <a href="{{ route('admin.certificates.index') }}" 
                   class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all {{ request()->routeIs('admin.certificates.*') ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' }}">
                    <i class="ri-award-line text-lg"></i> Kelola Sertifikasi
                </a>

                <a href="{{ route('admin.skills.index') }}" 
                   class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all {{ request()->routeIs('admin.skills.*') ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' }}">
                    <i class="ri-code-s-slash-line text-lg"></i> Kelola Keahlian
                </a>

                <a href="{{ route('admin.profile.edit') }}" 
                   class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all {{ request()->routeIs('admin.profile.*') ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' }}">
                    <i class="ri-user-settings-line text-lg"></i> Pengaturan Profil
                </a>
            </nav>
        </div>

        <!-- Sidebar Footer -->
        <div class="p-4 border-t border-slate-800/80">
            <a href="{{ route('home') }}" target="_blank" class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 mb-2 transition-colors">
                <i class="ri-external-link-line"></i> Lihat Website Publik
            </a>

            <form action="{{ route('admin.logout') }}" method="POST">
                @csrf
                <button type="submit" class="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors">
                    <i class="ri-logout-box-r-line"></i> Keluar (Logout)
                </button>
            </form>
        </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-grow md:ml-64 flex flex-col min-h-screen">
        <!-- Top Navbar -->
        <header class="h-20 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
            <div class="flex items-center gap-4">
                <button @click="sidebarOpen = !sidebarOpen" class="md:hidden text-slate-400 hover:text-white">
                    <i class="ri-menu-2-line text-2xl"></i>
                </button>
                <h1 class="text-base font-bold text-slate-200">@yield('page-title', 'Dashboard Admin')</h1>
            </div>

            <div class="flex items-center gap-3">
                <div class="flex items-center gap-3 pl-3 border-l border-slate-800">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-xs shadow-md">
                        {{ substr(Auth::user()->name ?? 'RP', 0, 2) }}
                    </div>
                    <div class="hidden sm:flex flex-col">
                        <span class="text-xs font-semibold text-slate-200">{{ Auth::user()->name ?? 'Rifky Permana' }}</span>
                        <span class="text-[10px] text-emerald-400 flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
                        </span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Body -->
        <main class="p-6 flex-grow">
            <!-- Flash Messages -->
            @if(session('success'))
                <div class="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                    <i class="ri-checkbox-circle-fill text-emerald-400 text-lg"></i>
                    <span>{{ session('success') }}</span>
                </div>
            @endif

            @if($errors->any())
                <div class="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
                    <div class="flex items-center gap-2 font-bold mb-1">
                        <i class="ri-error-warning-fill text-rose-400 text-lg"></i>
                        Terdapat kesalahan pada input formulir:
                    </div>
                    <ul class="list-disc list-inside text-xs space-y-1">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @yield('content')
        </main>
    </div>

</body>
</html>
