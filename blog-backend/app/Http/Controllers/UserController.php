<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function index()
    {
        $user = Auth::user();
        $this->authorize('viewAny', $user);
        $users = User::all();
        return response()->json(UserResource::collection($users));
    }

    public function show()
    {
        $user = Auth::user();
        $this->authorize('view', $user);
        return response()->json(new UserResource($user));
    }

    public function update(UpdateUserRequest $request)
    {
        $user = Auth::user();
        $this->authorize('update', $user);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        $user->update($data);

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
