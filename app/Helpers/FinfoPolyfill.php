<?php

// Polyfill untuk ekstensi PHP fileinfo jika tidak terinstall/aktif di server

if (!defined('FILEINFO_NONE')) {
    define('FILEINFO_NONE', 0);
}
if (!defined('FILEINFO_SYMLINK')) {
    define('FILEINFO_SYMLINK', 2);
}
if (!defined('FILEINFO_MIME')) {
    define('FILEINFO_MIME', 1040);
}
if (!defined('FILEINFO_MIME_TYPE')) {
    define('FILEINFO_MIME_TYPE', 16);
}
if (!defined('FILEINFO_MIME_ENCODING')) {
    define('FILEINFO_MIME_ENCODING', 1024);
}
if (!defined('FILEINFO_DEVICES')) {
    define('FILEINFO_DEVICES', 8);
}
if (!defined('FILEINFO_CONTINUE')) {
    define('FILEINFO_CONTINUE', 32);
}
if (!defined('FILEINFO_PRESERVE_ATIME')) {
    define('FILEINFO_PRESERVE_ATIME', 128);
}
if (!defined('FILEINFO_RAW')) {
    define('FILEINFO_RAW', 256);
}

if (!class_exists('finfo')) {
    class finfo
    {
        private int $flags;

        public function __construct(int $flags = FILEINFO_NONE, ?string $magic_database = null)
        {
            $this->flags = $flags;
        }

        public function file(string $filename, int $flags = FILEINFO_NONE, $context = null): string|false
        {
            if (!is_file($filename) || !is_readable($filename)) {
                return false;
            }

            // 1. Coba deteksi via GD getimagesize()
            if (function_exists('getimagesize')) {
                $imageInfo = @getimagesize($filename);
                if (!empty($imageInfo['mime'])) {
                    return $imageInfo['mime'];
                }
            }

            // 2. Coba deteksi via Magic Bytes header file
            $handle = @fopen($filename, 'rb');
            if ($handle) {
                $bytes = fread($handle, 32);
                fclose($handle);

                $mime = self::detectFromBytes($bytes);
                if ($mime) {
                    return $mime;
                }
            }

            // 3. Fallback via ekstensi file
            $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
            return self::detectFromExt($ext);
        }

        public function buffer(string $string, int $flags = FILEINFO_NONE, $context = null): string|false
        {
            $mime = self::detectFromBytes(substr($string, 0, 32));
            if ($mime) {
                return $mime;
            }

            return 'application/octet-stream';
        }

        private static function detectFromBytes(string $bytes): ?string
        {
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
            if (str_starts_with($bytes, "PK\x03\x04")) {
                return 'application/zip';
            }
            return null;
        }

        private static function detectFromExt(string $ext): string|false
        {
            return match ($ext) {
                'jpg', 'jpeg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
                'webp' => 'image/webp',
                'svg' => 'image/svg+xml',
                'pdf' => 'application/pdf',
                'zip' => 'application/zip',
                'json' => 'application/json',
                'txt' => 'text/plain',
                default => false,
            };
        }
    }
}

if (!function_exists('finfo_open')) {
    function finfo_open(int $flags = FILEINFO_NONE, ?string $magic_database = null): finfo|false
    {
        return new finfo($flags, $magic_database);
    }
}

if (!function_exists('finfo_file')) {
    function finfo_file(finfo $finfo, string $filename, int $flags = FILEINFO_NONE, $context = null): string|false
    {
        return $finfo->file($filename, $flags, $context);
    }
}

if (!function_exists('finfo_buffer')) {
    function finfo_buffer(finfo $finfo, string $string, int $flags = FILEINFO_NONE, $context = null): string|false
    {
        return $finfo->buffer($string, $flags, $context);
    }
}

if (!function_exists('finfo_close')) {
    function finfo_close(finfo $finfo): bool
    {
        return true;
    }
}
