<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Certificate;
use App\Models\Profile;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $profile = Profile::first() ?? new Profile();
        $projects = Project::orderBy('created_at', 'desc')->get();
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();

        $skills = \App\Models\Skill::orderBy('category')->orderBy('name')->get()->groupBy('category');

        return Inertia::render('Home', [
            'profile' => $profile,
            'projects' => $projects,
            'certificates' => $certificates,
            'skills' => $skills,
        ]);
    }

    public function projectDetail($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        $profile = Profile::first();
        return Inertia::render('ProjectDetail', [
            'project' => $project,
            'profile' => $profile,
        ]);
    }

    public function certificates()
    {
        $profile = Profile::first();
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        return Inertia::render('Certificates', [
            'certificates' => $certificates,
            'profile' => $profile,
        ]);
    }

    public function sendContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|min:5',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Terima kasih! Pesan Anda berhasil terkirim. Saya akan segera merespons.');
    }
}
