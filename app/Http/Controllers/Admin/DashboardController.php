<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Certificate;
use App\Models\ContactMessage;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProjects = Project::count();
        $totalCertificates = Certificate::count();
        $totalMessages = ContactMessage::count();
        $unreadMessages = ContactMessage::where('is_read', false)->count();

        $recentProjects = Project::latest()->take(5)->get();
        $recentCertificates = Certificate::latest()->take(5)->get();
        $recentMessages = ContactMessage::latest()->take(5)->get();

        return view('admin.dashboard', compact(
            'totalProjects',
            'totalCertificates',
            'totalMessages',
            'unreadMessages',
            'recentProjects',
            'recentCertificates',
            'recentMessages'
        ));
    }
}
