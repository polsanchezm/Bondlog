<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Purifier;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $post_id)
    {
        $comments = Comment::where('post_id', $post_id)->orderBy('is_pinned', 'desc')->orderBy('created_at', 'desc')->simplePaginate(6);

        return response()->json([
            'data' => CommentResource::collection($comments),
            'pagination' => [
                'current_page' => $comments->currentPage(),
                'next_page_url' => $comments->nextPageUrl(),
                'prev_page_url' => $comments->previousPageUrl(),
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        return response()->json(new CommentResource($comment));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCommentRequest $request, string $post_id)
    {
        $this->authorize('create', Comment::class);
        $post = Post::find($post_id);
        if (Auth::check() && $post) {
            $user = Auth::user();
            try {

                $clean_content = Purifier::clean($request->input('content'));

                $comment = Comment::create([
                    'content' => $clean_content,
                    'author_id' => $user->id,
                    'post_id' => $post->id,
                    'author_username' => $user->username,
                ]);

                return response()->json([
                    'message' => 'Comment created successfully',
                    'comment' => $comment
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Failed to create comment',
                    'post' => $request,
                    'error' => $e->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $this->authorize('update', $comment);

        $clean_content = Purifier::clean($request->input('content'));

        $comment->update([
            'content' => $clean_content,
        ]);

        return response()->json([
            'message' => 'Comment updated successfully',
            'comment' => $comment
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $this->authorize('delete', $comment);

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }

    public function togglePin(string $id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }
        $comment->is_pinned = !$comment->is_pinned;
        $this->authorize('pin', $comment);
        $comment->save();
        return response()->json(['message' => 'Comment updated', 'is_pinned' => $comment->is_pinned]);
    }
}
