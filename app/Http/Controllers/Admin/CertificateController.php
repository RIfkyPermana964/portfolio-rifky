<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::orderBy('issue_date', 'desc')->paginate(10);
        return view('admin.certificates.index', compact('certificates'));
    }

    public function create()
    {
        return view('admin.certificates.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'nullable|date',
            'credential_url' => 'nullable|url|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('certificates', 'public');
            $validated['image'] = $path;
        }

        Certificate::create($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Sertifikat / Prestasi baru berhasil ditambahkan!');
    }

    public function edit(Certificate $certificate)
    {
        return view('admin.certificates.edit', compact('certificate'));
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'nullable|date',
            'credential_url' => 'nullable|url|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            if ($certificate->image && Storage::disk('public')->exists($certificate->image)) {
                Storage::disk('public')->delete($certificate->image);
            }
            $path = $request->file('image')->store('certificates', 'public');
            $validated['image'] = $path;
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
}
