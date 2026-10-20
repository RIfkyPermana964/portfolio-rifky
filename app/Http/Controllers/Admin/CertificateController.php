<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificateController extends Controller
{
    private const CATEGORIES = ['Sertifikasi', 'Akademik', 'Bootcamp', 'Penghargaan'];

    public function index(Request $request)
    {
        $search = trim((string) $request->query('search', ''));

        $certificates = Certificate::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('issuer', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%");
                });
            })
            ->orderBy('issue_date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => $certificates,
            'filters' => ['search' => $search],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Certificates/Form', [
            'certificate' => null,
            'categories' => $this->categories(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateCertificate($request);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('certificates', 'public');
        } else {
            unset($validated['image']);
        }

        Certificate::create($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Sertifikat / Prestasi baru berhasil ditambahkan!');
    }

    public function edit(Certificate $certificate)
    {
        return Inertia::render('Admin/Certificates/Form', [
            'certificate' => $certificate,
            'categories' => $this->categories(),
        ]);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $this->validateCertificate($request);

        if ($request->hasFile('image')) {
            if ($certificate->image && Storage::disk('public')->exists($certificate->image)) {
                Storage::disk('public')->delete($certificate->image);
            }
            $validated['image'] = $request->file('image')->store('certificates', 'public');
        } else {
            unset($validated['image']);
        }

        $certificate->update($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Data sertifikat berhasil diperbarui!');
    }

    public function destroy(Certificate $certificate)
    {
        if ($certificate->image && Storage::disk('public')->exists($certificate->image)) {
            Storage::disk('public')->delete($certificate->image);
        }

        $certificate->delete();

        return redirect()->route('admin.certificates.index')->with('success', 'Sertifikat berhasil dihapus.');
    }

    private function validateCertificate(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'nullable|date',
            'credential_url' => 'nullable|url|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);
    }

    private function categories(): array
    {
        return collect(self::CATEGORIES)
            ->merge(Certificate::distinct()->pluck('category'))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }
}
