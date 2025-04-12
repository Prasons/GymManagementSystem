<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Members/Index', [
            'members' => Member::with(['membership', 'checkins'])
                ->latest()
                ->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Members/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members',
            'membership_id' => 'required|exists:memberships,id'
        ]);

        Member::create($validated);

        return redirect()->route('admin.members.index');
    }

    public function destroy(Member $member)
    {
        $member->delete();
        return redirect()->back();
    }
}