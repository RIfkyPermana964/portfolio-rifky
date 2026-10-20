<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    private const CATEGORIES = [
        'Web Development',
        'Mobile App',
        'System & Database',
        'Networking',
        'Desain Grafis',
        'AI & Machine Learning',
    ];

    public function index(Request $request)
    {
        $search = trim((string) $request->query('search', ''));

        $projects = Project::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%")
                        ->orWhere('summary', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'filters' => ['search' => $search],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => null,
            'categories' => $this->categories(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateProject($request);

        $validated['slug'] = Str::slug($request->title) . '-' . Str::random(5);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('projects', 'public');
        } else {
            unset($validated['thumbnail']);
        }

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Proyek baru berhasil ditambahkan!');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
            'categories' => $this->categories(),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $this->validateProject($request);

        if ($request->title !== $project->title) {
            $validated['slug'] = Str::slug($request->title) . '-' . Str::random(4);
        }

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail && Storage::disk('public')->exists($project->thumbnail)) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('projects', 'public');
        } else {
            unset($validated['thumbnail']);
        }

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

    private function validateProject(Request $request): array
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

        // Process tech stack tags from comma separated string
        $tags = array_map('trim', explode(',', (string) $request->tech_stack_input));
        $validated['tech_stack'] = array_values(array_filter($tags));
        unset($validated['tech_stack_input']);

        $validated['is_featured'] = $request->boolean('is_featured');

        return $validated;
    }

    private function categories(): array
    {
        return collect(self::CATEGORIES)
            ->merge(Project::distinct()->pluck('category'))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }
}
