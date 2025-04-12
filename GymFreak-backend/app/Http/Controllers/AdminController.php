<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        return view('admin.dashboard', [
            'userCount' => User::count(),
            'adminCount' => User::where('is_admin', true)->count()
        ]);
    }

    public function users()
    {
        return view('admin.users.index', [
            'users' => User::latest()->paginate(10)
        ]);
    }
}