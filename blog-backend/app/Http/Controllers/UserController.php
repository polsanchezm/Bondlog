<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function index()
    {
        return response()->json(User::all(), 200);
    }

    public function show()
    {
        return response()->json(auth()->user(), 200);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ], 200);
    }


    public function destroy()
    {
        $user = Auth::user();
        $this->authorize('delete', $user);
        if (!$user) {
            return response()->json(['message' => 'User not logged or not found'], 401);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
