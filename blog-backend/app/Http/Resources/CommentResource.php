<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'post_id' => $this->post_id,
            'author_id' => $this->author_id,
            'author_username' => $this->author_username,
            'is_pinned' => $this->is_pinned,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
