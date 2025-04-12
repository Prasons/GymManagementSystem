<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Trainer;
use Illuminate\Http\Request;

class TrainerController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Trainers/Index', [
            'trainers' => Trainer::withCount('members')
                ->latest()
                ->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Trainers/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialization' => 'required|string',
            'bio' => 'nullable|string'
        ]);

        Trainer::create($validated);

        return redirect()->route('admin.trainers.index');
    }
}