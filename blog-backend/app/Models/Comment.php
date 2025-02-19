<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'comments';
    protected $fillable = ['content', 'post_id', 'author_id', 'author_username', 'is_pinned'];
    protected $keyType = 'string';  // UUID se almacena como string
    public $incrementing = false;

    /**
     * El modelo se inicializa.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($comment) {
            // Generar un UUID cuando se crea un nuevo comment
            $comment->id = (string) Str::uuid(); // Asignar un UUID al 'id'
        });
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id', 'id');
    }
}
