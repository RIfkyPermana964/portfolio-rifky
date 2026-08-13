<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'title',
        'bio',
        'avatar',
        'resume_path',
        'email',
        'whatsapp',
        'github_url',
        'linkedin_url',
        'instagram_url',
    ];
}
