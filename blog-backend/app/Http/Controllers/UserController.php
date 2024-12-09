<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
}
