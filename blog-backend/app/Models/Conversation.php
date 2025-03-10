<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class Conversation extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;
    public $table = 'conversations';
    protected $fillable = ['user_id1', 'user_id2', 'last_message_id'];

    protected $keyType = 'string'; // Definimos que la clave primaria es UUID (string)
    public $incrementing = false; // No usamos auto-incremento, ya que usamos UUIDs

    protected static function booted()
    {
        static::creating(function ($conversation) {
            $conversation->id = (string) Str::uuid(); // Generamos el UUID para el campo 'id'
        });
    }

    public function lastMessage()
    {
        return $this->belongsTo(Message::class, 'last_message_id');
    }

    public function user1()
    {
        return $this->belongsTo(User::class, 'user_id1');
    }

    public function user2()
    {
        return $this->belongsTo(User::class, 'user_id2');
    }
}
