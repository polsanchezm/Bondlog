<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PostsController extends Controller
{
    function index()
    {
        return response()->json(Post::all(), 200);
    }

    public function show(string $id)
    {
        return response()->json(Post::find($id), 200);
    }

    public function store(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            try {
                $userId = $user->id;
                $userName = $user->name;

                $request->validate([
                    'title' => 'required|string|max:255',
                    'subtitle' => 'required|string|max:255',
                    'body' => 'required|string',
                ]);

                $post = Post::create([
                    'title' => $request->title,
                    'subtitle' => $request->subtitle,
                    'body' => $request->body,
                    'authorId' => $userId,
                    'authorName' => $userName,
                    'date' => date('Y-m-d')
                ]);

                return response()->json([
                    'message' => 'Post created successfully',
                    'post' => $post
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Failed to create post',
                    'error' => $e->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
    }


    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'subtitle' => 'string|max:255',
            'body' => 'string',
        ]);

        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        $post->update($validated);

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post
        ], 200);
    }

    public function destroy(string $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully'], 200);
    }
}
