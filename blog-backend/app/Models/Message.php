<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class Message extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;
    public $table = 'messages';
    protected $fillable = ['sender_id', 'receiver_id', 'message'];
    protected $keyType = 'string'; // Definimos que la clave primaria es UUID (string)
    public $incrementing = false; // No usamos auto-incremento, ya que usamos UUIDs

    protected static function booted()
    {
        static::creating(function ($message) {
            $message->id = (string) Str::uuid(); // Generamos el UUID para el campo 'id'
        });
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function attachments()
    {
        return $this->hasMany(MessageAttachment::class);
    }


    public function getTimeAttribute(): string
    {
        return date(
            "d M Y, H:i:s",
            strtotime($this->attributes['created_at'])
        );
    }
}
