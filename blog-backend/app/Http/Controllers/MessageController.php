<?php

namespace App\Http\Controllers;

use App\Events\SocketMessage;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\MessageAttachment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MessageController extends Controller
{
    public function byUser(User $user)
    {
        $messages = Message::where("sender_id", Auth::user()->id)
            ->where("receiver_id", $user->id)
            ->orWhere("sender_id", $user->id)
            ->where("receiver_id", Auth::user()->id)
            ->latest()
            ->paginate(10);
        return response()->json([
            'selected_conversation' => $user->toConversationArray(),
            'messages' => MessageResource::collection($messages),
            // 'pagination' => [
            //     'current_page' => $posts->currentPage(),
            //     'next_page_url' => $posts->nextPageUrl(),
            //     'prev_page_url' => $posts->previousPageUrl(),
            // ],
        ]);
    }

    public function loadOlder(Message $message)
    {
        $messages = Message::where('created_at', '<', $message->created_at)
            ->where(function ($query) use ($message) {
                $query->where('sender_id', $message->sender_id)
                    ->where('receiver_id', $message->receiver_id)
                    ->orWhere('sender_id', $message->receiver_id)
                    ->where('receiver_id', $message->sender_id);
            })
            ->latest()
            ->paginate(10);
        return response()->json([
            'messages' => MessageResource::collection($messages),
        ]);
    }

    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();
        $data['sender_id'] = Auth::user()->id;
        $receiverId = $data['receiver_id'] ?? null;
        $files = $data['attachments'] ?? [];

        $message = Message::create($data);

        $attachments = [];
        if ($files) {
            foreach ($files as $file) {
                $directory =  'attachments/' . Str::random(32);
                Storage::makeDirectory($directory);

                $model = [
                    'message_id' => $message->id,
                    'name' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'path' => $file->store($directory, 'public'),
                ];
                $attachment = MessageAttachment::create($model);
                $attachments[] = $attachment;
            }
            $message->attachments = $attachments;
        }
        if ($receiverId) {
            Conversation::updateConversationWithMessage($receiverId, Auth::user()->id, $message);
        }

        SocketMessage::dispatch($message);

        return response()->json([
            'message' => new MessageResource($message),
        ]);
    }
    public function destroy(Message $message)
    {
        if ($message->sender_id !== Auth::user()->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $message->delete();

        return response()->json([
            'message' => 'Message deleted successfully'
        ], 200);
    }
}
