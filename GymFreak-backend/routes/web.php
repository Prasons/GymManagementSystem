<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authenticated User Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // Members
    Route::get('/members', [MemberController::class, 'index'])->name('admin.members.index');
    Route::get('/members/create', [MemberController::class, 'create'])->name('admin.members.create');
    Route::post('/members', [MemberController::class, 'store'])->name('admin.members.store');
    Route::delete('/members/{member}', [MemberController::class, 'destroy'])->name('admin.members.destroy');
    
    // Trainers
    Route::get('/trainers', [TrainerController::class, 'index'])->name('admin.trainers.index');
    Route::get('/trainers/create', [TrainerController::class, 'create'])->name('admin.trainers.create');
    Route::post('/trainers', [TrainerController::class, 'store'])->name('admin.trainers.store');
});

require __DIR__.'/auth.php';