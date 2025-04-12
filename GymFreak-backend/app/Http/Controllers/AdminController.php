<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Member; // Make sure you have this model
use App\Models\GymClass; // Example additional model

class AdminController extends Controller
{
    /**
     * Show the admin dashboard
     */
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'members' => Member::with(['subscription', 'checkins'])
                             ->latest()
                             ->take(5)
                             ->get(),
            
            'stats' => [
                'total_members' => Member::count(),
                'active_classes' => GymClass::active()->count(),
                'monthly_revenue' => 0, // You'll implement this later
                'attendance_today' => 0 // You'll implement this later
            ]
        ]);
    }
}