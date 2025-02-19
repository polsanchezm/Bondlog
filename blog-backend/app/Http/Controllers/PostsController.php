<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostsResource;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;

class PostsController extends Controller
{
    function index()
    {
        $posts = Post::orderBy('is_pinned', 'desc')->orderBy('created_at', 'desc')->simplePaginate(9);

        return response()->json([
            'data' => PostsResource::collection($posts),
            'pagination' => [
                'current_page' => $posts->currentPage(),
                'next_page_url' => $posts->nextPageUrl(),
                'prev_page_url' => $posts->previousPageUrl(),
            ],
        ]);
    }

    public function show(string $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json(new PostsResource($post));
    }

    public function store(CreatePostRequest $request)
    {
        $this->authorize('create', Post::class);
        if (Auth::check()) {
            $user = Auth::user();
            try {
                $post = Post::create([
                    'title' => $request->title,
                    'subtitle' => $request->subtitle,
                    'body' => $request->body,
                    'author_id' => $user->id,
                    'author_username' => $user->username,
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

        $post->update($request->validated());

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

    public function togglePin(string $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->is_pinned = !$post->is_pinned;
        $this->authorize('pin', $post);
        $post->save();
        return response()->json(['message' => 'Post updated', 'is_pinned' => $post->is_pinned]);
    }
}
