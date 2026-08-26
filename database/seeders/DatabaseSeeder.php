<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Certificate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@rifkypermana.com'],
            [
                'name' => 'Rifky Permana',
                'email' => 'admin@rifkypermana.com',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Profile
        Profile::updateOrCreate(
            ['id' => 1],
            [
                'full_name' => 'Rifky Permana, S.Kom.',
                'title' => 'Fresh Graduate S1 Informatika | IT Networking | Network Operation Center',
                'bio' => 'Halo! Saya Rifky Permana, Seorang profesional di bidang IT Networking, Pernah bekerja sebagai Network Operation Center (NOC) Engineer selama 4 Tahun. Memiliki pengalaman dalam mengelola dan mengkonfigurasi perangkat jaringan seperti MikroTik, Cisco, huawei, serta menguasai tools monitoring jaringan seperti PRTG dan Zabbix (basic), The Dude server, dan topologi FTTH untuk memastikan konektivitas yang stabil dan optimal.
Telah mengikuti pelatihan Digitalent Networking Basic dari Cisco Academy serta Ujian ACA Alibaba Cloud, yang memperkuat pemahaman saya dalam infrastruktur jaringan dan komputasi cloud.',
                'email' => 'rifkypermana.dev@gmail.com',
                'whatsapp' => '6281234567890',
                'github_url' => 'https://github.com/rifkypermana',
                'linkedin_url' => 'https://linkedin.com/in/rifkypermana',
                'instagram_url' => 'https://instagram.com/rifkypermana',
            ]
        );

        // 3. Projects
        $projects = [
            [
                'title' => 'Sistem Informasi Portofolio & Management CMS',
                'slug' => 'sistem-informasi-portofolio-cms',
                'category' => 'Web Development',
                'summary' => 'Website portofolio interaktif berbasis Laravel 11 & Tailwind CSS dengan Dashboard Admin mandiri untuk mengelola prestasi dan proyek.',
                'description' => 'Aplikasi web portofolio profesional ini dirancang khusus untuk memamerkan proyek, riwayat pendidikan, dan sertifikasi. Fitur mencakup sistem otentikasi admin, upload gambar thumbnail proyek, manajemen sertifikasi, serta integrasi formulir kontak.',
                'tech_stack' => ['Laravel 11', 'Tailwind CSS', 'SQLite/MySQL', 'Alpine.js'],
                'demo_url' => 'https://portfolio-demo.com',
                'github_url' => 'https://github.com/rifkypermana/portfolio-laravel',
                'is_featured' => true,
            ],
            [
                'title' => 'E-Commerce Storefront & Payment Gateway Integrasi',
                'slug' => 'e-commerce-storefront-payment-gateway',
                'category' => 'Web Development',
                'summary' => 'Platform toko online modern lengkap dengan keranjang belanja, manajemen stok barang, serta pembayaran otomatis via Midtrans API.',
                'description' => 'Aplikasi web e-commerce yang memungkinkan pengguna menjelajahi katalog produk, melakukan checkout, dan membayar menggunakan transfer bank/qris. Sistem backend dibangun menggunakan arsitektur MVC Laravel yang terstruktur.',
                'tech_stack' => ['Laravel', 'Tailwind CSS', 'Midtrans API', 'MySQL'],
                'demo_url' => 'https://ecommerce-demo.com',
                'github_url' => 'https://github.com/rifkypermana/laravel-ecommerce',
                'is_featured' => true,
            ],
            [
                'title' => 'Sistem Manajemen Inventaris Clinic & Apotek',
                'slug' => 'sistem-manajemen-inventaris-clinic-apotek',
                'category' => 'System & Database',
                'summary' => 'Aplikasi manajemen stok obat, rekam medis sederhana, serta pencatatan transaksi masuk dan keluar berbasis peran user (RBAC).',
                'description' => 'Sistem inventaris internal untuk mengoptimalkan pendataan obat-obatan dan laporan stok harian. Dilengkapi dengan grafik statistik dan ekspor laporan dalam bentuk PDF/Excel.',
                'tech_stack' => ['PHP Laravel', 'Bootstrap / Tailwind', 'MySQL', 'Chart.js'],
                'demo_url' => null,
                'github_url' => 'https://github.com/rifkypermana/inventory-system',
                'is_featured' => true,
            ],
        ];

        foreach ($projects as $proj) {
            Project::updateOrCreate(['slug' => $proj['slug']], $proj);
        }

        // 4. Certificates
        $certificates = [
            [
                'title' => 'Sertifikasi Kompetensi S1 Teknik Informatika',
                'issuer' => 'Universitas / Lembaga Sertifikasi Profesi (LSP)',
                'issue_date' => '2025-08-01',
                'credential_url' => 'https://example.com/cert/s1-informatika',
                'category' => 'Akademik',
                'description' => 'Ijazah & Transkrip Kelulusan Sarjana Komputer (S.Kom) S1 Teknik Informatika dengan fokus utama Software Engineering dan Database Management.',
            ],
            [
                'title' => 'Belajar Membuat Aplikasi Web dengan Laravel',
                'issuer' => 'Dicoding Indonesia',
                'issue_date' => '2024-11-15',
                'credential_url' => 'https://dicoding.com/certificates/EXAMPLE123',
                'category' => 'Sertifikasi',
                'description' => 'Kelulusan kelas praktis pembuatan backend API dan arsitektur web modern menggunakan kerangka kerja PHP Laravel.',
            ],
            [
                'title' => 'Fullstack Web Development & Database Design',
                'issuer' => 'Bootcamp Digital Skills',
                'issue_date' => '2024-06-20',
                'credential_url' => 'https://example.com/cert/fullstack',
                'category' => 'Bootcamp',
                'description' => 'Sertifikat kelulusan program pelatihan intensif pengembangan web dari tingkat dasar hingga penerapan proyek nyata.',
            ],
        ];

        foreach ($certificates as $cert) {
            Certificate::updateOrCreate(['title' => $cert['title']], $cert);
        }
    }
}
