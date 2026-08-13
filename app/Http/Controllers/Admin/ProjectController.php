<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->paginate(10);
        return view('admin.projects.index', compact('projects'));
    }

    public function create()
    {
        return view('admin.projects.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'summary' => 'required|string',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'tech_stack_input' => 'nullable|string',
            'demo_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'is_featured' => 'nullable|boolean',
        ]);

        $validated['slug'] = Str::slug($request->title) . '-' . Str::random(5);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail'] = $path;
        }

        // Process tech stack tags from comma separated string
        if ($request->filled('tech_stack_input')) {
            $tags = array_map('trim', explode(',', $request->tech_stack_input));
            $validated['tech_stack'] = array_values(array_filter($tags));
        } else {
            $validated['tech_stack'] = [];
        }

        $validated['is_featured'] = $request->has('is_featured');

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Proyek baru berhasil ditambahkan!');
    }

    public function edit(Project $project)
    {
        return view('admin.projects.edit', compact('project'));
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'summary' => 'required|string',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'tech_stack_input' => 'nullable|string',
            'demo_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'is_featured' => 'nullable|boolean',
        ]);

        if ($request->title !== $project->title) {
            $validated['slug'] = Str::slug($request->title) . '-' . Str::random(4);
        }

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail && Storage::disk('public')->exists($project->thumbnail)) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail'] = $path;
        }

        if ($request->filled('tech_stack_input')) {
            $tags = array_map('trim', explode(',', $request->tech_stack_input));
            $validated['tech_stack'] = array_values(array_filter($tags));
        } else {
            $validated['tech_stack'] = [];
        }

        $validated['is_featured'] = $request->has('is_featured');

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Data proyek berhasil diperbarui!');
    }

    public function destroy(Project $project)
    {
        if ($project->thumbnail && Storage::disk('public')->exists($project->thumbnail)) {
            Storage::disk('public')->delete($project->thumbnail);
        }

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil dihapus.');
    }
}
