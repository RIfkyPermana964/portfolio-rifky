<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | Portfolio Rifky Permana</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css" rel="stylesheet"/>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #090d16;
        }
        .glass-panel {
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
    </style>
</head>
<body class="antialiased min-h-screen flex items-center justify-center p-4">

    <div class="w-full max-w-md">
        <!-- Logo & Header -->
        <div class="text-center mb-8">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 mx-auto flex items-center justify-center font-extrabold text-white text-2xl shadow-xl shadow-indigo-600/30 mb-4">
                RP
            </div>
            <h1 class="text-2xl font-bold text-white">Login Admin Dashboard</h1>
            <p class="text-xs text-slate-400 mt-1">Masuk untuk mengelola proyek & sertifikasi portofolio</p>
        </div>

        <div class="glass-panel p-8 rounded-3xl shadow-2xl">
            @if(session('success'))
                <div class="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <i class="ri-checkbox-circle-fill text-base text-emerald-400"></i>
                    <span>{{ session('success') }}</span>
                </div>
            @endif

            @if($errors->any())
                <div class="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {{ $errors->first() }}
                </div>
            @endif

            <form action="{{ route('admin.login.submit') }}" method="POST" class="space-y-5">
                @csrf

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Email Admin</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                            <i class="ri-mail-line"></i>
                        </span>
                        <input type="email" name="email" value="{{ old('email', 'admin@rifkypermana.com') }}" required
                               class="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2">Password</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                            <i class="ri-lock-line"></i>
                        </span>
                        <input type="password" name="password" value="password" required
                               class="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors">
                    </div>
                    <p class="text-[11px] text-indigo-400/80 mt-1">Default password seeder: <code class="font-mono text-indigo-300">password</code></p>
                </div>

                <div class="flex items-center justify-between text-xs text-slate-400">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="remember" class="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0">
                        <span>Ingat saya</span>
                    </label>
                </div>

                <button type="submit" class="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01]">
                    <i class="ri-login-box-line mr-1"></i> Masuk Ke Dashboard
                </button>
            </form>

            <div class="mt-6 pt-6 border-t border-slate-800 text-center">
                <a href="{{ route('home') }}" class="text-xs text-slate-400 hover:text-indigo-400 transition-colors">
                    <i class="ri-arrow-left-line"></i> Kembali ke Website Utama
                </a>
            </div>
        </div>
    </div>

</body>
</html>
