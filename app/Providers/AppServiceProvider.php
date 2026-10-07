<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Fallback MIME Type Guesser jika ekstensi php_fileinfo belum aktif di server
        if (!extension_loaded('fileinfo')) {
            \Symfony\Component\Mime\MimeTypes::getDefault()->registerGuesser(new class implements \Symfony\Component\Mime\MimeTypeGuesserInterface {
                public function isGuesserSupported(): bool
                {
                    return true;
                }

                public function guessMimeType(string $path): ?string
                {
                    if (!is_file($path) || !is_readable($path)) {
                        return null;
                    }

                    // 1. Coba deteksi via GD getimagesize() jika image
                    if (function_exists('getimagesize')) {
                        $imageInfo = @getimagesize($path);
                        if (!empty($imageInfo['mime'])) {
                            return $imageInfo['mime'];
                        }
                    }

                    // 2. Coba deteksi via Magic Bytes header file
                    $handle = @fopen($path, 'rb');
                    if ($handle) {
                        $bytes = fread($handle, 32);
                        fclose($handle);

                        if (str_starts_with($bytes, "\xFF\xD8\xFF")) {
                            return 'image/jpeg';
                        }
                        if (str_starts_with($bytes, "\x89PNG\r\n\x1a\n")) {
                            return 'image/png';
                        }
                        if (str_starts_with($bytes, 'GIF87a') || str_starts_with($bytes, 'GIF89a')) {
                            return 'image/gif';
                        }
                        if (str_starts_with($bytes, 'RIFF') && str_contains($bytes, 'WEBP')) {
                            return 'image/webp';
                        }
                        if (str_starts_with($bytes, '%PDF-')) {
                            return 'application/pdf';
                        }
                    }

                    // 3. Fallback via ekstensi file
                    $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
                    return match ($ext) {
                        'jpg', 'jpeg' => 'image/jpeg',
                        'png' => 'image/png',
                        'gif' => 'image/gif',
                        'webp' => 'image/webp',
                        'svg' => 'image/svg+xml',
                        'pdf' => 'application/pdf',
                        default => null,
                    };
                }
            });
        }
    }
}
