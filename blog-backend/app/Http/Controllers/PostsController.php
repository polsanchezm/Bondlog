<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostsResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    function index()
    {
        $posts = Post::all();
        return response()->json(PostsResource::collection($posts));
    }

    public function show(string $id)
    {
        $post = Post::find($id);
        return response()->json(new PostsResource($post));
    }

    public function store(CreatePostRequest $request)
    {
        $this->authorize('create', Post::class);
        if (Auth::check()) {
            $user = Auth::user();
            try {
                $user_id = $user->id;
                $user_name = $user->name;

                $post = Post::create([
                    'title' => $request->title,
                    'subtitle' => $request->subtitle,
                    'body' => $request->body,
                    'author_id' => $user_id,
                    'author_name' => $user_name,
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


    public function update(UpdatePostRequest $request, string $id)
    {
        $post = Post::find($id);

        $this->authorize('update', $post);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->update($request->all());

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

        $this->authorize('delete', $post);

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully'], 200);
    }
}
