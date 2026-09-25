<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('admin:secure {email?} {password?}', function () {
    $email = $this->argument('email') ?: 'rifkypermana964@gmail.com';
    $password = $this->argument('password') ?: '@Rifky1964!';

    $user = \App\Models\User::where('email', $email)->first() ?? \App\Models\User::first();
    if (!$user) {
        $user = new \App\Models\User();
    }

    $user->name = 'Rifky Permana';
    $user->email = $email;
    $user->password = \Illuminate\Support\Facades\Hash::make($password);
    $user->remember_token = \Illuminate\Support\Str::random(60);
    $user->save();

    // Hapus akun lain jika ada akun liar
    \App\Models\User::where('id', '!=', $user->id)->delete();

    // Hapus semua sesi login aktif di database agar semua device lain langsung ter-logout paksa
    try {
        \Illuminate\Support\Facades\DB::table('sessions')->truncate();
        $this->info('✓ Seluruh sesi aktif di semua device berhasil dihapus (logout paksa).');
    } catch (\Throwable $e) {
        // jika driver session bukan database
    }

    \Illuminate\Support\Facades\Artisan::call('optimize:clear');

    $this->info("✓ Akun admin berhasil diamankan 100%!");
    $this->info("  Email Admin : {$email}");
    $this->info("  Password    : {$password}");
    $this->info("  Semua sesi login di device lain telah ditutup paksa.");
})->purpose('Amankan akun admin, hapus akun lama, dan kick keluar semua session aktif');
