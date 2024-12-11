<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

        $userId = Auth::user()->id;

        return response()->json([
            'message' => 'User registered and logged in successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }


    public function login(Request $request)
    {

        $user = User::where('email', $request->email)->first();
        if (!empty($user)) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

                return response()->json([
                    'message' => 'Login successful',
                    'user' => $user,
                    'token' => $token,
                ], 200);
            }
            return response()->json([
                'message' => 'Password didn\'t match',
            ], 401);
        }
        return response()->json([
            'message' => 'Invalid login details',
        ], 404);
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'User logged out',
        ], 200);
    }
}
