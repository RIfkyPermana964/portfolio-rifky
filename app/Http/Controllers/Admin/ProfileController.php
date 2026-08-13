<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function edit()
    {
        $profile = Profile::first() ?? new Profile();
        return view('admin.profile', compact('profile'));
    }

    public function update(Request $request)
    {
        $profile = Profile::first() ?? new Profile();

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'bio' => 'required|string',
            'email' => 'required|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
            'github_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'resume_file' => 'nullable|mimes:pdf|max:5120',
        ]);

        if ($request->hasFile('avatar')) {
            if ($profile->avatar && Storage::disk('public')->exists($profile->avatar)) {
                Storage::disk('public')->delete($profile->avatar);
            }
            $path = $request->file('avatar')->store('profile', 'public');
            $validated['avatar'] = $path;
        }

        if ($request->hasFile('resume_file')) {
            if ($profile->resume_path && Storage::disk('public')->exists($profile->resume_path)) {
                Storage::disk('public')->delete($profile->resume_path);
            }
            $path = $request->file('resume_file')->store('resumes', 'public');
            $validated['resume_path'] = $path;
        }

        $profile->fill($validated)->save();

        return redirect()->route('admin.profile.edit')->with('success', 'Profil dan informasi CV berhasil diperbarui!');
    }
}
