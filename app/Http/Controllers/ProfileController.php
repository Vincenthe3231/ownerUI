<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Update the user's profile photo.
     */
    public function updatePhoto(Request $request)
    {
        // Debug: Log request data
        \Log::info('Profile photo upload request', [
            'has_file' => $request->hasFile('profile_photo'),
            'all_files' => $request->allFiles(),
            'all_data' => $request->all(),
        ]);

        $request->validate([
            'profile_photo' => ['required', 'image', 'mimes:jpeg,jpg,png,gif,webp', 'max:5120'], // Max 5MB
        ]);

        $user = $request->user();

        try {
            // Delete old profile photo if exists
            if ($user->profile_photo && Storage::disk('public')->exists($user->profile_photo)) {
                Storage::disk('public')->delete($user->profile_photo);
            }

            // Store the new profile photo
            $path = $request->file('profile_photo')->store('profile-photos', 'public');

            // Update user's profile_photo in database
            $user->update([
                'profile_photo' => $path,
            ]);

            // Refresh user to get updated profile_photo_url
            $user->refresh();

            // Log for debugging
            \Log::info('Profile photo updated', [
                'user_id' => $user->id,
                'profile_photo' => $user->profile_photo,
                'profile_photo_url' => $user->profile_photo_url,
            ]);

            return Redirect::route('profile.edit')->with('status', 'Profile photo updated successfully.');
        } catch (\Exception $e) {
            \Log::error('Profile photo upload error: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors([
                'profile_photo' => 'Failed to upload image: ' . $e->getMessage(),
            ]);
        }
    }
}
