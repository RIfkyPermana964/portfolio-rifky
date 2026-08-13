<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Certificate;
use App\Models\Profile;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $profile = Profile::first() ?? new Profile();
        $projects = Project::orderBy('created_at', 'desc')->get();
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();

        $skills = [
            'Backend & Core' => ['PHP', 'Laravel 11', 'MySQL', 'SQLite', 'RESTful API', 'OOP Architecture'],
            'Frontend & Styling' => ['Tailwind CSS', 'HTML5 & CSS3', 'JavaScript (ES6+)', 'Alpine.js', 'Blade Templates'],
            'Tools & Workflow' => ['Git & GitHub', 'Laragon', 'VS Code', 'Postman', 'Vite', 'npm'],
        ];

        return view('home', compact('profile', 'projects', 'certificates', 'skills'));
    }

    public function projectDetail($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        $profile = Profile::first();
        return view('project-detail', compact('project', 'profile'));
    }

    public function certificates()
    {
        $profile = Profile::first();
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        return view('certificates', compact('certificates', 'profile'));
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
