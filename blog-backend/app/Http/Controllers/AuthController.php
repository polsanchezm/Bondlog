<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $existingUser = User::where(column: 'email', operator: $request->email)->first();

        if ($existingUser) {
            return response()->json(data: [
                'message' => 'User already exists.',
            ], status: 400);
        }

        $user = User::create(attributes: [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make(value: $request->password),
        ]);

        Auth::login(user: $user);

        $token = $user->createToken(name: $user->name . '-AuthToken')->plainTextToken;

        $userId = Auth::user()->id;

        return response()->json(data: [
            'message' => 'User registered and logged in successfully',
            'user' => $user,
            'token' => $token,
        ], status: 201);
    }


    public function login(LoginRequest $request)
    {

        $user = User::where(column: 'email', operator: $request->email)->first();
        if (!empty($user)) {
            if (Hash::check(value: $request->password, hashedValue: $user->password)) {
                $token = $user->createToken(name: $user->name . '-AuthToken')->plainTextToken;

                return response()->json(data: [
                    'message' => 'Login successful',
                    'user' => $user,
                    'token' => $token,
                ], status: 200);
            }
            return response()->json(data: [
                'message' => 'Password didn\'t match',
            ], status: 401);
        }
        return response()->json(data: [
            'message' => 'Invalid login details',
        ], status: 404);
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(data: [
            'message' => 'User logged out',
        ], status: 200);
    }
}
