<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class MessageAttachment extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;
    public $table = 'message_attachments';
    protected $fillable = ['message_id', 'name', 'path', 'mime', 'size'];

    protected $keyType = 'string'; // Definimos que la clave primaria es UUID (string)
    public $incrementing = false; // No usamos auto-incremento, ya que usamos UUIDs

    protected static function booted()
    {
        static::creating(function ($message) {
            $message->id = (string) Str::uuid(); // Generamos el UUID para el campo 'id'
        });
    }
}
