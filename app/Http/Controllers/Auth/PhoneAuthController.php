<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PhoneAuthController extends Controller
{
    /**
     * Display the OTP page.
     */
    public function showOtp(Request $request): Response
    {
        $phoneNumber = $request->session()->get('login.phone');
        
        if (!$phoneNumber) {
            return redirect()->route('login');
        }

        return Inertia::render('Auth/OTP', [
            'phoneNumber' => $phoneNumber,
        ]);
    }

    /**
     * Handle phone number submission and verify phone exists.
     */
    public function attempt(Request $request)
    {
        $request->validate([
            'countryCode' => ['required', 'string'],
            'phone' => ['required', 'string'],
        ]);

        // Combine country code and phone number
        $fullPhoneNumber = $request->countryCode . $request->phone;

        // Check if phone number exists in database
        $user = User::where('phone', $fullPhoneNumber)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'phone' => 'Phone number not found in our system.',
            ]);
        }

        // Store phone number in session for OTP page
        $request->session()->put('login.phone', $fullPhoneNumber);
        $request->session()->put('login.user_id', $user->id);

        // In a real application, you would send OTP here
        // For prototype, we'll just redirect to OTP page
        
        return redirect()->route('otp.show');
    }

    /**
     * Handle OTP verification (prototype - no actual verification)
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp_code' => ['required', 'string', 'size:6'],
        ]);

        $userId = $request->session()->get('login.user_id');
        $phoneNumber = $request->session()->get('login.phone');

        if (!$userId || !$phoneNumber) {
            return redirect()->route('login');
        }

        // Prototype: Accept any 6-digit OTP
        // In production, verify OTP against stored/cached value

        // Login the user
        $user = User::find($userId);
        
        if (!$user) {
            throw ValidationException::withMessages([
                'otp_code' => 'Session expired. Please try again.',
            ]);
        }

        auth()->login($user);
        $request->session()->regenerate();

        // Clear session data
        $request->session()->forget(['login.phone', 'login.user_id']);

        return redirect()->intended(route('home', absolute: false));
    }

    /**
     * Resend OTP (prototype - just resets timer)
     */
    public function resendOtp(Request $request)
    {
        $phoneNumber = $request->session()->get('login.phone');

        if (!$phoneNumber) {
            return redirect()->route('login');
        }

        // In production, resend OTP here
        
        return back()->with('status', 'OTP resent successfully.');
    }
}