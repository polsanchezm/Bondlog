<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;
    protected $table = 'posts';
    protected $fillable = ['title', 'subtitle', 'body', 'authorId', 'authorName', 'date'];
    protected $keyType = 'string';  // UUID se almacena como string
    public $incrementing = false;
    /**
     * El modelo se inicializa.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            // Generar un UUID cuando se crea un nuevo post
            $post->id = (string) Str::uuid(); // Asignar un UUID al 'id'
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
