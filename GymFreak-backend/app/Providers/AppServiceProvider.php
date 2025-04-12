public function boot() {
    Inertia::share([
        'user' => fn () => Auth::user() ? Auth::user() : null,
    ]);
}