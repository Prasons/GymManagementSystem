<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Check if user is authenticated
        if (!Auth::check()) {
            return $this->unauthorizedResponse($request, 'Please login to access this page');
        }

        // 2. Check admin status (multiple ways)
        $user = Auth::user();
        if (!$this->isAdmin($user)) {
            return $this->unauthorizedResponse($request, 'Administrator privileges required');
        }

        // 3. Optional: IP restriction
        if (!$this->isAllowedIp($request->ip())) {
            return $this->unauthorizedResponse($request, 'Access restricted from your IP');
        }

        return $next($request);
    }

    private function isAdmin($user): bool
    {
        // Check multiple possible admin indicators
        return $user->is_admin === true 
            || $user->role === 'admin'
            || $user->hasRole('administrator'); // If using role packages
    }

    private function isAllowedIp(string $ip): bool
    {
        $allowedIps = [
            '127.0.0.1',       // Localhost
            '192.168.1.*',     // Local network
            // Add your production IPs here
        ];

        foreach ($allowedIps as $allowedIp) {
            if (str_contains($allowedIp, '*')) {
                if (str_starts_with($ip, substr($allowedIp, 0, -1))) {
                    return true;
                }
            } elseif ($ip === $allowedIp) {
                return true;
            }
        }

        return false;
    }

    private function unauthorizedResponse(Request $request, string $message)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => $message], 403);
        }

        if ($request->is('admin*')) {
            return redirect()->route('login')->with('error', $message);
        }

        abort(403, $message);
    }
}